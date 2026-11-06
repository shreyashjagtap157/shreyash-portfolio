import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { ALL_CODES, BUILTIN, EN, RTL, baseCode, type Dict } from './languages'
import { cached, machineAvailability, machineTranslate, machineSupported } from './translator'

export type MtState = 'idle' | 'busy' | 'ok' | 'none'
interface Ctx { lang: string; setLang: (lang: string) => void; t: (key: string) => string; mt: MtState; machine: boolean }
const C = createContext<Ctx | null>(null)
export const useI18n = (): Ctx => {
  const value = useContext(C)
  if (!value) throw new Error('I18nProvider missing')
  return value
}

const stored = (): string | null => {
  try { return localStorage.getItem('lang') } catch { return null }
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<string>(() => {
    const saved = stored()
    if (saved && ALL_CODES.includes(saved)) return saved
    for (const locale of navigator.languages ?? [navigator.language]) {
      const base = baseCode(locale)
      if (BUILTIN[base]) return base
    }
    return 'en'
  })
  const [dict, setDict] = useState<Dict>(BUILTIN[lang] ?? EN)
  const [mt, setMt] = useState<MtState>('idle')
  const sequence = useRef(0)
  const userSelectedLanguage = useRef(false)

  const apply = useCallback(async (locale: string) => {
    const request = ++sequence.current
    if (BUILTIN[locale]) {
      setDict(BUILTIN[locale])
      setMt('idle')
      return
    }
    const hit = cached(locale)
    if (hit) {
      setDict(hit)
      setMt('ok')
      return
    }
    if (!machineSupported()) {
      if (request === sequence.current) { setDict(EN); setMt('none') }
      return
    }
    const availability = await machineAvailability(locale)
    if (request !== sequence.current) return
    if (availability === 'unavailable') {
      setDict(EN)
      setMt('none')
      return
    }
    setMt('busy')
    try {
      const translated = await machineTranslate(locale)
      if (request === sequence.current) { setDict(translated); setMt('ok') }
    } catch {
      if (request === sequence.current) { setDict(EN); setMt('none') }
    }
  }, [])

  useEffect(() => { void apply(lang) }, [lang, apply])
  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = RTL.has(lang) ? 'rtl' : 'ltr'
  }, [lang])
  useEffect(() => {
    if (stored()) return
    const preferred = baseCode((navigator.languages ?? [navigator.language])[0] ?? 'en')
    if (!BUILTIN[preferred] && ALL_CODES.includes(preferred)) {
      void machineAvailability(preferred).then(availability => {
        if (availability === 'available' && !userSelectedLanguage.current) {
          setLangState(current => current === 'en' && !stored() ? preferred : current)
        }
      })
    }
  }, [])

  const setLang = useCallback((locale: string) => {
    if (!ALL_CODES.includes(locale)) return
    userSelectedLanguage.current = true
    setLangState(locale)
    try { localStorage.setItem('lang', locale) } catch { /* storage may be unavailable */ }
  }, [])
  const t = useCallback((key: string) => dict[key] ?? EN[key] ?? key, [dict])
  const value = useMemo<Ctx>(() => ({ lang, setLang, t, mt, machine: !BUILTIN[lang] }), [lang, setLang, t, mt])
  return <C.Provider value={value}>{children}</C.Provider>
}

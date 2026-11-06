import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { ALL_CODES, BUILTIN, EN, RTL, baseCode, type Dict } from './languages'
import { cached, machineAvailability, machineTranslate, machineSupported } from './translator'

export type MtState = 'idle' | 'busy' | 'ok' | 'none'
interface Ctx { lang: string; setLang: (l: string) => void; t: (k: string) => string; mt: MtState; machine: boolean }
const C = createContext<Ctx | null>(null)
export const useI18n = (): Ctx => { const v = useContext(C); if (!v) throw new Error('I18nProvider missing'); return v }

const stored = (): string | null => { try { return localStorage.getItem('lang') } catch { return null } }

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<string>(() => {
    const s = stored(); if (s && ALL_CODES.includes(s)) return s
    for (const l of navigator.languages ?? [navigator.language]) { const b = baseCode(l); if (BUILTIN[b]) return b }
    return 'en'
  })
  const [dict, setDict] = useState<Dict>(BUILTIN[lang] ?? EN)
  const [mt, setMt] = useState<MtState>('idle')
  const seq = useRef(0)

  const apply = useCallback(async (l: string) => {
    const id = ++seq.current
    if (BUILTIN[l]) { setDict(BUILTIN[l]); setMt('idle'); return }
    const hit = cached(l)
    if (hit) { setDict(hit); setMt('ok'); return }
    if (!machineSupported() || (await machineAvailability(l)) === 'unavailable') { setDict(EN); setMt('none'); return }
    setMt('busy')
    try { const d = await machineTranslate(l); if (id === seq.current) { setDict(d); setMt('ok') } }
    catch { if (id === seq.current) { setDict(EN); setMt('none') } }
  }, [])

  useEffect(() => { void apply(lang) }, [lang, apply])
  useEffect(() => { document.documentElement.lang = lang; document.documentElement.dir = RTL.has(lang) ? 'rtl' : 'ltr' }, [lang])
  // First visit with a non-built-in browser language: use machine translation only if it is ready without a download.
  useEffect(() => {
    if (stored()) return
    const b = baseCode((navigator.languages ?? [navigator.language])[0] ?? 'en')
    if (!BUILTIN[b] && ALL_CODES.includes(b)) void machineAvailability(b).then(a => { if (a === 'available') setLangState(b) })
  }, [])

  const setLang = useCallback((l: string) => { setLangState(l); try { localStorage.setItem('lang', l) } catch { /* ignore */ } }, [])
  const t = useCallback((k: string) => dict[k] ?? EN[k] ?? k, [dict])
  const value = useMemo<Ctx>(() => ({ lang, setLang, t, mt, machine: !BUILTIN[lang] }), [lang, setLang, t, mt])
  return <C.Provider value={value}>{children}</C.Provider>
}

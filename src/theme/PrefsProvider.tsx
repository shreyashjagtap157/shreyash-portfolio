import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { flushSync } from 'react-dom'

export type ThemeId = 'void' | 'orbital' | 'blueprint' | 'aurora'
export type Density = 'compact' | 'comfortable' | 'spacious'
export const THEMES: { id: ThemeId; name: string }[] = [
  { id: 'void', name: 'Void' }, { id: 'orbital', name: 'Orbital' }, { id: 'blueprint', name: 'Blueprint' }, { id: 'aurora', name: 'Aurora' },
]
export const DENSITIES: Density[] = ['compact', 'comfortable', 'spacious']
const COLORS: Record<ThemeId, string> = { void: '#070b10', orbital: '#05030f', blueprint: '#f1f5fb', aurora: '#0a0d14' }

interface Ctx { theme: ThemeId; density: Density; setTheme: (t: ThemeId, o?: { x: number; y: number }) => void; setDensity: (d: Density) => void }
const C = createContext<Ctx | null>(null)
export const usePrefs = (): Ctx => { const v = useContext(C); if (!v) throw new Error('PrefsProvider missing'); return v }

const read = <T extends string>(key: string, ok: readonly T[], fallback: T): T => {
  try { const v = localStorage.getItem(key) as T | null; if (v && ok.includes(v)) return v } catch { /* ignore */ }
  return fallback
}
const write = (key: string, value: string) => { try { localStorage.setItem(key, value) } catch { /* ignore */ } }

function paint(theme: ThemeId, density: Density) {
  const root = document.documentElement
  root.dataset.theme = theme
  root.dataset.density = density
  document.querySelector('meta[name=theme-color]')?.setAttribute('content', COLORS[theme])
}

export function initPrefs() {
  paint(read('theme', THEMES.map(theme => theme.id), 'void'), read('density', DENSITIES, 'comfortable'))
}

export function PrefsProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(() => read('theme', THEMES.map(item => item.id), 'void'))
  const [density, setDensityState] = useState<Density>(() => read('density', DENSITIES, 'comfortable'))

  const setTheme = useCallback((nextTheme: ThemeId, origin?: { x: number; y: number }) => {
    if (!THEMES.some(item => item.id === nextTheme) || nextTheme === theme) return
    const commit = () => {
      flushSync(() => setThemeState(nextTheme))
      paint(nextTheme, density)
      write('theme', nextTheme)
    }
    const documentWithTransitions = document as Document & {
      startViewTransition?: (callback: () => void) => { ready: Promise<void> }
    }
    if (!documentWithTransitions.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      commit()
      return
    }

    const width = window.innerWidth
    const height = window.innerHeight
    const x = Math.max(0, Math.min(width, origin?.x ?? width / 2))
    const y = Math.max(0, Math.min(height, origin?.y ?? height / 2))
    const reach = Math.hypot(Math.max(x, width - x), Math.max(y, height - y))
    const circle = (radius: number, cx = x, cy = y) => `circle(${radius}px at ${cx}px ${cy}px)`
    const transitions: Record<ThemeId, [string, string, number]> = {
      void: ['inset(0 0 100% 0)', 'inset(0 0 0 0)', 700],
      orbital: [circle(0), circle(reach), 800],
      blueprint: ['inset(0 100% 0 0)', 'inset(0 0 0 0)', 650],
      aurora: [circle(0, width / 2, height), circle(Math.hypot(width, height), width / 2, height), 850],
    }
    const [from, to, duration] = transitions[nextTheme]
    try {
      const transition = documentWithTransitions.startViewTransition(commit)
      void transition.ready.then(() => {
        document.documentElement.animate(
          { clipPath: [from, to] },
          { duration, easing: 'cubic-bezier(.7,0,.2,1)', pseudoElement: '::view-transition-new(root)' },
        )
      }).catch(() => undefined)
    } catch {
      commit()
    }
  }, [theme, density])

  const setDensity = useCallback((nextDensity: Density) => {
    if (!DENSITIES.includes(nextDensity)) return
    setDensityState(nextDensity)
    paint(theme, nextDensity)
    write('density', nextDensity)
  }, [theme])

  const value = useMemo(() => ({ theme, density, setTheme, setDensity }), [theme, density, setTheme, setDensity])
  return <C.Provider value={value}>{children}</C.Provider>
}

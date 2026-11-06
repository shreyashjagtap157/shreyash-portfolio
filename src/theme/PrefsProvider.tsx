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
const write = (k: string, v: string) => { try { localStorage.setItem(k, v) } catch { /* ignore */ } }

function paint(theme: ThemeId, density: Density) {
  const r = document.documentElement
  r.dataset.theme = theme; r.dataset.density = density
  document.querySelector('meta[name=theme-color]')?.setAttribute('content', COLORS[theme])
}
export function initPrefs() {
  paint(read('theme', THEMES.map(t => t.id), 'void'), read('density', DENSITIES, 'comfortable'))
}

export function PrefsProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(() => read('theme', THEMES.map(t => t.id), 'void'))
  const [density, setDensityState] = useState<Density>(() => read('density', DENSITIES, 'comfortable'))

  const setTheme = useCallback((t: ThemeId, o?: { x: number; y: number }) => {
    if (t === theme) return
    const commit = () => { flushSync(() => setThemeState(t)); paint(t, density); write('theme', t) }
    const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } }
    if (!doc.startViewTransition || matchMedia('(prefers-reduced-motion:reduce)').matches) { commit(); return }
    const W = innerWidth, H = innerHeight, x = o?.x ?? W / 2, y = o?.y ?? 0
    const reach = Math.hypot(Math.max(x, W - x), Math.max(y, H - y))
    const circle = (r: number, cx = x, cy = y) => `circle(${r}px at ${cx}px ${cy}px)`
    const K: Record<ThemeId, [string, string, number]> = {
      void: ['inset(0 0 100% 0)', 'inset(0 0 0 0)', 900],
      orbital: [circle(0), circle(reach), 1000],
      blueprint: ['inset(0 100% 0 0)', 'inset(0 0 0 0)', 800],
      aurora: [circle(0, W / 2, H), circle(Math.hypot(W, H), W / 2, H), 1100],
    }
    const [from, to, ms] = K[t]
    doc.startViewTransition(commit).ready.then(() => {
      document.documentElement.animate({ clipPath: [from, to] }, { duration: ms, easing: 'cubic-bezier(.7,0,.2,1)', pseudoElement: '::view-transition-new(root)' })
    }).catch(() => undefined)
  }, [theme, density])

  const setDensity = useCallback((d: Density) => { setDensityState(d); paint(theme, d); write('density', d) }, [theme])
  const value = useMemo(() => ({ theme, density, setTheme, setDensity }), [theme, density, setTheme, setDensity])
  return <C.Provider value={value}>{children}</C.Provider>
}

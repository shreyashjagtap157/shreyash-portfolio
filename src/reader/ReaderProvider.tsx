import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type ReadingLens = 'balanced' | 'overview' | 'engineering' | 'research'

interface ReaderContextValue {
  lens: ReadingLens
  setLens: (lens: ReadingLens) => void
}

const STORAGE_KEY = 'portfolio.readerLens.v1'
const VALID_LENSES: readonly ReadingLens[] = ['balanced', 'overview', 'engineering', 'research']
const ReaderContext = createContext<ReaderContextValue | null>(null)

function readStoredLens(): ReadingLens {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored && VALID_LENSES.includes(stored as ReadingLens) ? stored as ReadingLens : 'balanced'
  } catch {
    return 'balanced'
  }
}

export function useReader(): ReaderContextValue {
  const value = useContext(ReaderContext)
  if (!value) throw new Error('ReaderProvider missing')
  return value
}

export function ReaderProvider({ children }: { children: ReactNode }) {
  const [lens, setLensState] = useState<ReadingLens>(readStoredLens)

  const setLens = useCallback((next: ReadingLens) => {
    if (!VALID_LENSES.includes(next)) return
    setLensState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // The reading preference remains functional for this page session.
    }
  }, [])

  useEffect(() => {
    document.documentElement.dataset.readerLens = lens
  }, [lens])

  const value = useMemo(() => ({ lens, setLens }), [lens, setLens])
  return <ReaderContext.Provider value={value}>{children}</ReaderContext.Provider>
}

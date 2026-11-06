import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react'

export interface Option { value: string; label: string; hint?: string }
interface Props {
  label: string
  value: string
  options: Option[]
  onChange: (value: string, origin: { x: number; y: number }) => void
  searchable?: boolean
  searchLabel?: string
}

export function Dropdown({ label, value, options, onChange, searchable, searchLabel }: Props) {
  const uid = useId()
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const [active, setActive] = useState(0)
  const root = useRef<HTMLDivElement>(null)
  const btn = useRef<HTMLButtonElement>(null)
  const list = useRef<HTMLUListElement>(null)
  const input = useRef<HTMLInputElement>(null)
  const shown = useMemo(() => {
    const s = q.trim().toLowerCase()
    return s ? options.filter(o => `${o.label} ${o.hint ?? ''} ${o.value}`.toLowerCase().includes(s)) : options
  }, [options, q])
  const current = options.find(o => o.value === value)

  useEffect(() => {
    if (!open) return
    setActive(Math.max(0, shown.findIndex(o => o.value === value)))
    ;(searchable ? input.current : list.current)?.focus()
    const away = (e: PointerEvent) => { if (!root.current?.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('pointerdown', away)
    return () => document.removeEventListener('pointerdown', away)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])
  useEffect(() => { document.getElementById(`${uid}-o${active}`)?.scrollIntoView({ block: 'nearest' }) }, [active, uid])

  const close = () => { setOpen(false); setQ(''); btn.current?.focus() }
  const choose = (i: number) => {
    const o = shown[i]; if (!o) return
    const r = btn.current!.getBoundingClientRect()
    onChange(o.value, { x: r.left + r.width / 2, y: r.top + r.height / 2 })
    close()
  }
  const key = (e: KeyboardEvent) => {
    const n = shown.length
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(a => Math.min(n - 1, a + 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(a => Math.max(0, a - 1)) }
    else if (e.key === 'Home') { e.preventDefault(); setActive(0) }
    else if (e.key === 'End') { e.preventDefault(); setActive(n - 1) }
    else if (e.key === 'Enter') { e.preventDefault(); choose(active) }
    else if (e.key === 'Escape') { e.preventDefault(); close() }
    else if (e.key === 'Tab') setOpen(false)
  }

  return (
    <div className="dd" ref={root}>
      <button ref={btn} type="button" className="dd-btn" aria-haspopup="listbox" aria-expanded={open} aria-controls={`${uid}-l`}
        onClick={() => setOpen(o => !o)}
        onKeyDown={e => { if (e.key === 'ArrowDown' && !open) { e.preventDefault(); setOpen(true) } }}>
        <span className="dd-label">{label}</span>
        <span className="dd-value" translate="no">{current?.label ?? value}</span>
        <svg className="dd-caret" viewBox="0 0 10 6" aria-hidden="true"><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
      </button>
      {open && (
        <div className="dd-pop" onKeyDown={key}>
          {searchable && (
            <input ref={input} className="dd-search" type="search" value={q} placeholder={searchLabel} aria-label={searchLabel}
              role="combobox" aria-expanded="true" aria-controls={`${uid}-l`} aria-activedescendant={`${uid}-o${active}`}
              onChange={e => { setQ(e.target.value); setActive(0) }} />
          )}
          <ul ref={list} id={`${uid}-l`} role="listbox" aria-label={label} tabIndex={-1} aria-activedescendant={`${uid}-o${active}`}>
            {shown.map((o, i) => (
              <li key={o.value} id={`${uid}-o${i}`} role="option" aria-selected={o.value === value} data-active={i === active}
                onPointerEnter={() => setActive(i)} onClick={() => choose(i)}>
                <span translate="no">{o.label}</span>{o.hint && <small>{o.hint}</small>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

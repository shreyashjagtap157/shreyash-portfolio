import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react'

export interface Option { value: string; label: string; hint?: string }
interface Props {
  label: string
  value: string
  options: Option[]
  onChange: (value: string, origin: { x: number; y: number }) => void
  searchable?: boolean
  searchLabel?: string
  noMatches: string
}

export function Dropdown({ label, value, options, onChange, searchable, searchLabel, noMatches }: Props) {
  const uid = useId()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const root = useRef<HTMLDivElement>(null)
  const button = useRef<HTMLButtonElement>(null)
  const input = useRef<HTMLInputElement>(null)
  const list = useRef<HTMLUListElement>(null)

  const shown = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase()
    return needle ? options.filter(option =>
      (option.label + ' ' + (option.hint ?? '') + ' ' + option.value).toLocaleLowerCase().includes(needle)
    ) : options
  }, [options, query])
  const current = options.find(option => option.value === value)
  const activeId = shown[active] ? uid + '-option-' + active : undefined

  useEffect(() => {
    if (!open) return
    const selected = shown.findIndex(option => option.value === value)
    setActive(selected >= 0 ? selected : 0)
    ;(searchable ? input.current : list.current)?.focus()
    const closeOutside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) {
        setOpen(false)
        setQuery('')
      }
    }
    document.addEventListener('pointerdown', closeOutside)
    return () => document.removeEventListener('pointerdown', closeOutside)
  }, [open])

  useEffect(() => {
    if (activeId) document.getElementById(activeId)?.scrollIntoView({ block: 'nearest' })
  }, [activeId])

  const close = (restoreFocus = true) => {
    setOpen(false)
    setQuery('')
    if (restoreFocus) button.current?.focus()
  }
  const choose = (index: number) => {
    const option = shown[index]
    if (!option) return
    const rect = button.current?.getBoundingClientRect()
    onChange(option.value, rect ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 } : { x: 0, y: 0 })
    close()
  }
  const handleKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') { event.preventDefault(); close(); return }
    if (event.key === 'Tab') { setOpen(false); setQuery(''); return }
    if (!shown.length) return
    if (event.key === 'ArrowDown') { event.preventDefault(); setActive(index => Math.min(shown.length - 1, index + 1)) }
    else if (event.key === 'ArrowUp') { event.preventDefault(); setActive(index => Math.max(0, index - 1)) }
    else if (event.key === 'Home') { event.preventDefault(); setActive(0) }
    else if (event.key === 'End') { event.preventDefault(); setActive(shown.length - 1) }
    else if (event.key === 'Enter') { event.preventDefault(); choose(active) }
  }

  return (
    <div className="dd" ref={root} onKeyDown={handleKey}>
      <button ref={button} type="button" className="dd-btn" aria-haspopup="listbox"
        aria-expanded={open} aria-controls={uid + '-list'}
        onClick={() => setOpen(currentOpen => !currentOpen)}
        onKeyDown={event => {
          if (event.key === 'ArrowDown' && !open) { event.preventDefault(); setOpen(true) }
        }}>
        <span className="dd-label">{label}</span>
        <span className="dd-value" translate="no">{current?.label ?? value}</span>
        <svg className="dd-caret" viewBox="0 0 10 6" aria-hidden="true">
          <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
      {open && (
        <div className="dd-pop">
          {searchable && (
            <input ref={input} className="dd-search" type="search" value={query}
              placeholder={searchLabel} aria-label={searchLabel} role="combobox"
              aria-autocomplete="list" aria-expanded="true" aria-controls={uid + '-list'}
              aria-activedescendant={activeId}
              onChange={event => { setQuery(event.target.value); setActive(0) }} />
          )}
          <ul ref={list} id={uid + '-list'} role="listbox" aria-label={label}
            tabIndex={-1} aria-activedescendant={activeId}>
            {shown.length ? shown.map((option, index) => (
              <li key={option.value} id={uid + '-option-' + index} role="option"
                aria-selected={option.value === value} data-active={index === active}
                onPointerEnter={() => setActive(index)} onClick={() => choose(index)}>
                <span translate="no">{option.label}</span>
                {option.hint && <small>{option.hint}</small>}
              </li>
            )) : <li className="dd-empty" role="presentation">{noMatches}</li>}
          </ul>
        </div>
      )}
    </div>
  )
}

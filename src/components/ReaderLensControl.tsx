import { useEffect, useId, useRef, useState } from 'react'
import { useI18n } from '../i18n/I18nProvider'
import { useReader, type ReadingLens } from '../reader/ReaderProvider'

const OPTIONS: ReadingLens[] = ['balanced', 'overview', 'engineering', 'research']

export function ReaderLensControl() {
  const { t } = useI18n()
  const { lens, setLens } = useReader()
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const menuId = useId()

  useEffect(() => {
    if (!open) return
    const closeOutside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false)
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setOpen(false)
        trigger.current?.focus()
      }
    }
    document.addEventListener('pointerdown', closeOutside)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOutside)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [open])

  const choose = (next: ReadingLens) => {
    setLens(next)
    setOpen(false)
    trigger.current?.focus()
  }

  return (
    <div className="reader-lens-control" ref={root}>
      <button
        ref={trigger}
        className="btn ghost reader-lens-trigger"
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen(value => !value)}
      >
        <span>{t('reader_label')}:</span>
        <strong>{t('reader_' + lens)}</strong>
        <span aria-hidden="true">⌄</span>
      </button>
      {open && (
        <div className="reader-lens-menu" id={menuId} role="group" aria-label={t('reader_label')}>
          <p>{t('reader_note')}</p>
          {OPTIONS.map(option => (
            <button
              key={option}
              type="button"
              aria-pressed={lens === option}
              onClick={() => choose(option)}
            >
              <span>{t('reader_' + option)}</span>
              <small>{t('reader_' + option + '_hint')}</small>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

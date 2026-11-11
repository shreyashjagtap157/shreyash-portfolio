import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import { useI18n } from '../i18n/I18nProvider'

interface ConsoleEntry {
  command?: string
  responseKey: string
}

const COMMANDS: Record<string, string> = {
  help: 'console_help',
  about: 'console_about',
  projects: 'console_projects',
  principles: 'console_principles',
  omni: 'console_omni',
  selfhost: 'console_selfhost',
  'sudo make portfolio-awesome': 'console_sudo',
}

export function PortfolioConsole() {
  const { t } = useI18n()
  const [open, setOpen] = useState(false)
  const [command, setCommand] = useState('')
  const [entries, setEntries] = useState<ConsoleEntry[]>([{ responseKey: 'console_welcome' }])
  const opener = useRef<HTMLElement | null>(null)
  const dialog = useRef<HTMLDivElement>(null)
  const input = useRef<HTMLInputElement>(null)
  const log = useRef<HTMLDivElement>(null)

  const show = () => {
    opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    setOpen(true)
  }

  const close = () => setOpen(false)

  useEffect(() => {
    const openWithShortcut = (event: KeyboardEvent) => {
      if (event.key !== '?') return
      const target = event.target
      if (target instanceof HTMLElement && (
        target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)
      )) return
      event.preventDefault()
      opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
      setOpen(true)
    }
    document.addEventListener('keydown', openWithShortcut)
    return () => document.removeEventListener('keydown', openWithShortcut)
  }, [])

  useEffect(() => {
    if (!open) return
    input.current?.focus()
    const handleDialogKeys = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        close()
        return
      }
      if (event.key !== 'Tab') return
      const focusable = dialog.current?.querySelectorAll<HTMLElement>('button, input')
      if (!focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', handleDialogKeys)
    return () => {
      document.removeEventListener('keydown', handleDialogKeys)
      if (opener.current?.isConnected) opener.current.focus()
    }
  }, [open])

  useEffect(() => {
    if (open && log.current) log.current.scrollTop = log.current.scrollHeight
  }, [entries, open])

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const normalized = command.trim().toLowerCase()
    if (!normalized) return
    const responseKey = COMMANDS[normalized] ?? 'console_unknown'
    setEntries(current => [...current, { command: normalized, responseKey }])
    setCommand('')
  }

  const handleBackdropKey = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      close()
    }
  }

  return (
    <>
      <div className="console-launcher">
        <button type="button" className="console-open" onClick={show} aria-haspopup="dialog">
          {t('console_open')}
        </button>
        <small>{t('console_hint')}</small>
      </div>
      {open && (
        <div className="console-overlay" onClick={event => {
          if (event.target === event.currentTarget) close()
        }}>
          <section
            ref={dialog}
            className="console-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="portfolio-console-title"
            onKeyDown={handleBackdropKey}
          >
            <header className="console-header">
              <div>
                <p className="console-kicker">LOCAL / READ-ONLY</p>
                <h2 id="portfolio-console-title">{t('console_title')}</h2>
              </div>
              <button type="button" className="console-close" onClick={close} aria-label={t('console_close')}>×</button>
            </header>
            <div className="console-log" ref={log} role="log" aria-live="polite" aria-relevant="additions text">
              {entries.map((entry, index) => (
                <div className="console-entry" key={index}>
                  {entry.command && <p className="console-command"><span aria-hidden="true">$ </span>{entry.command}</p>}
                  <p className="console-response">{t(entry.responseKey)}</p>
                </div>
              ))}
            </div>
            <form className="console-form" onSubmit={submit}>
              <label htmlFor="portfolio-console-input">{t('console_prompt')}</label>
              <div className="console-input-row">
                <span aria-hidden="true">$</span>
                <input
                  ref={input}
                  id="portfolio-console-input"
                  type="text"
                  value={command}
                  onChange={event => setCommand(event.target.value)}
                  maxLength={120}
                  autoComplete="off"
                  autoCapitalize="off"
                  spellCheck={false}
                />
                <button type="submit">↵</button>
              </div>
            </form>
          </section>
        </div>
      )}
    </>
  )
}

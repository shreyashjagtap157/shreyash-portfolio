import { useState, type FormEvent } from 'react'
import { useI18n } from '../i18n/I18nProvider'

interface ConsoleEntry {
  command: string
  response: string
}

const COMMANDS: Record<string, string> = {
  help: 'console_help',
  about: 'console_about',
  projects: 'console_projects',
  principles: 'console_principles',
  omni: 'console_omni',
  selfhost: 'console_selfhost',
}

export function EasterEggConsole() {
  const { t } = useI18n()
  const [command, setCommand] = useState('')
  const [entries, setEntries] = useState<ConsoleEntry[]>([])

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const normalized = command.trim().toLowerCase().slice(0, 80)
    if (!normalized) return
    const responseKey = COMMANDS[normalized] ?? 'console_unknown'
    setEntries(current => [...current.slice(-7), { command: normalized, response: t(responseKey) }])
    setCommand('')
  }

  return (
    <section className="portfolio-console" aria-labelledby="portfolio-console-title">
      <details>
        <summary id="portfolio-console-title">{t('console_title')}</summary>
        <div className="portfolio-console-body">
          <p>{t('console_intro')}</p>
          <form className="portfolio-console-form" onSubmit={submit}>
            <label htmlFor="portfolio-console-command">{t('console_command_label')}</label>
            <div className="portfolio-console-input-row">
              <span aria-hidden="true">$</span>
              <input
                id="portfolio-console-command"
                type="text"
                value={command}
                maxLength={80}
                autoComplete="off"
                spellCheck={false}
                placeholder={t('console_placeholder')}
                onChange={event => setCommand(event.target.value)}
              />
              <button type="submit">{t('console_run')}</button>
            </div>
          </form>
          <div className="portfolio-console-output" aria-live="polite" aria-relevant="additions">
            {entries.length === 0
              ? <p className="portfolio-console-empty">{t('console_help')}</p>
              : entries.map((entry, index) => (
                  <article className="portfolio-console-entry" key={index}>
                    <code>$ {entry.command}</code>
                    <p>{entry.response}</p>
                  </article>
                ))}
          </div>
        </div>
      </details>
    </section>
  )
}

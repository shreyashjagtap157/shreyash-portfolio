import { Logo } from './Logo'
import { Controls } from './Controls'
import { useEffect, useState } from 'react'
import { useI18n } from '../i18n/I18nProvider'
import { NAME } from '../data/profile'

const NAV: [string, string][] = [
  ['work', 'n_work'],
  ['case', 'n_case'],
  ['skills', 'n_skills'],
  ['activity', 'n_activity'],
  ['exp', 'n_exp'],
  ['contact', 'n_contact'],
]

export function Header() {
  const { t, mt, lang } = useI18n()
  const translatedCopyUrl = `https://translate.google.com/translate?sl=en&tl=${lang}&u=${encodeURIComponent(location.href)}`
  const [activeSection, setActiveSection] = useState<string | null>(null)

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && NAV.some(([id]) => id === entry.target.id)) setActiveSection(entry.target.id)
        })
      },
      { root: null, rootMargin: '-20% 0%', threshold: 0.2 },
    )
    NAV.forEach(([id]) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <header className="container top">
        <a className="brand" href="#top" id="top" aria-label={`${NAME}, home`}>
          <Logo /><span className="brand-name" translate="no">{NAME}</span>
        </a>
        <address className="details">
          <p className="meta"><span>{t('loc')}</span></p>
        </address>
      </header>
      <div className="toolbar">
        <div className="container toolbar-in">
          <nav aria-label={t('nav_primary')} tabIndex={0}>
            {NAV.map(([id, key]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''} aria-current={activeSection === id ? 'location' : undefined}>
                {t(key)}
              </a>
            ))}
          </nav>
          <Controls />
        </div>
        {mt !== 'idle' && (
          <div className="container notice" role="status">
            {mt === 'busy' && t('mt_busy')}
            {mt === 'ok' && t('mt_note')}
            {mt === 'none' && <>{t('mt_none')} <a href={translatedCopyUrl} target="_blank" rel="noopener noreferrer">{t('mt_open')}</a></>}
          </div>
        )}
      </div>
    </>
  )
}

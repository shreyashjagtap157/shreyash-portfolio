import { Logo } from './Logo'
import { Controls } from './Controls'
import { useEffect, useState } from 'react'
import { useI18n } from '../i18n/I18nProvider'
import { EMAIL, GITHUB, LINKEDIN, NAME, PHONE_DISPLAY, PHONE_HREF, RESUME } from '../data/profile'

const NAV: [string, string][] = [['work', 'n_work'], ['case', 'n_case'], ['skills', 'n_skills'], ['exp', 'n_exp'], ['contact', 'n_contact']]

export function Header() {
  const { t, mt, lang } = useI18n()
  const gt = `https://translate.google.com/translate?sl=en&tl=${lang}&u=${encodeURIComponent(location.href)}`

  // Active section state
  const [activeSection, setActiveSection] = useState<'work' | 'case' | 'skills' | 'exp' | 'contact' | null>(null)

  // IntersectionObserver to track visible sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target) {
            const sectionId = entry.target.id as 'work' | 'case' | 'skills' | 'exp' | 'contact'
            if (sectionId && NAV.some(([id]) => id === sectionId)) {
              setActiveSection(sectionId)
            }
          }
        })
      },
      {
        root: null,
        rootMargin: '-20% 0%',
        threshold: 0.3,
      }
    )

    // Observe all navigation-related sections
    const sectionIds = NAV.map(([id]) => id)
    sectionIds.forEach((id) => {
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
          <p className="meta"><span>{t('loc')}</span><a href={`mailto:${EMAIL}`}>{EMAIL}</a><a href={PHONE_HREF}>{PHONE_DISPLAY}</a></p>
          <p className="links">
            <a className="chip" href={LINKEDIN} target="_blank" rel="noopener noreferrer" translate="no">Shreyash Jagtap | LinkedIn</a>
            <a className="chip" href={GITHUB} target="_blank" rel="noopener noreferrer" translate="no">shreyashjagtap157 (warrite)</a>
            <a className="chip" href={RESUME} target="_blank" rel="noopener noreferrer">{t('resume')}</a>
          </p>
        </address>
      </header>
      <div className="toolbar">
        <div className="container toolbar-in">
          <nav aria-label="Primary">
            {NAV.map(([id, k]) => (
              <a
                key={id}
                href={`#${id}`}
                className={activeSection === id ? 'active' : ''}
                style={{ color: activeSection === id ? 'var(--ac)' : 'var(--mut)' }}
              >
                {t(k)}
              </a>
            ))}
          </nav>
          <Controls />
        </div>
        {mt !== 'idle' && (
          <div className="container notice" role="status">
            {mt === 'busy' && t('mt_busy')}
            {mt === 'ok' && t('mt_note')}
            {mt === 'none' && <>{t('mt_none')} <a href={gt} target="_blank" rel="noopener noreferrer">{t('mt_open')}</a></>}
          </div>
        )}
      </div>
    </>
  )
}
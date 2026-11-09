import { Logo } from './Logo'
import { Controls } from './Controls'
import { useEffect, useState } from 'react'
import { useI18n } from '../i18n/I18nProvider'
import { NAME } from '../data/profile'

const NAV: [string, string][] = [
  ['about', 'n_about'], ['work', 'n_work'], ['case', 'n_case'], ['skills', 'n_skills'],
  ['activity', 'n_activity'], ['exp', 'n_exp'], ['contact', 'n_contact'],
]

export function Header() {
  const { t, mt, lang } = useI18n()
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const translatedCopyUrl = 'https://translate.google.com/translate?sl=en&tl=' + lang + '&u=' + encodeURIComponent(window.location.href)

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting && NAV.some(([id]) => id === entry.target.id))
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62% 0px', threshold: [0, 0.15, 0.35, 0.6] })
    NAV.forEach(([id]) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <header className="container top" id="top">
        <a className="brand" href="#top" aria-label={NAME + ', home'}>
          <Logo /><span className="brand-name" translate="no">{NAME}</span>
        </a>
        <p className="header-location">{t('loc')}</p>
      </header>
      <div className="toolbar">
        <div className="container toolbar-in">
          <nav className="primary-nav" aria-label={t('nav_primary')} tabIndex={0}>
            {NAV.map(([id, key]) => (
              <a key={id} href={'#' + id} className={activeSection === id ? 'active' : ''}
                aria-current={activeSection === id ? 'location' : undefined}>{t(key)}</a>
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

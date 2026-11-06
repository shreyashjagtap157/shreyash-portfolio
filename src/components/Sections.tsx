import { Section } from './Section'
import { SKILLS } from '../data/projects'
import { RESUME, EMAIL, LINKEDIN, GITHUB, NAME, PHONE_DISPLAY, PHONE_HREF } from '../data/profile'
import { useI18n } from '../i18n/I18nProvider'

export function CaseStudy() {
  const { t } = useI18n()
  const items = [
    ['01 / ' + t('c_1h'), t('c_1')],
    ['02 / ' + t('c_2h'), t('c_2')],
    ['03 / ' + t('c_3h'), t('c_3')],
    ['04 / ' + t('c_4h'), t('c_4')],
  ]
  return (
    <Section id="case" title={t('c_h')} lead={t('c_l')}>
      <div className="split case-study">
        {items.map(([heading, copy]) => <p key={heading}><strong>{heading}</strong>{copy}</p>)}
      </div>
    </Section>
  )
}

export function Skills() {
  const { t } = useI18n()
  return (
    <Section id="skills" title={t('s_h')} lead={t('s_l')}>
      <div className="skills">
        {SKILLS.map(skill => (
          <article className="skill-group" key={skill.key}>
            <h3>{t(skill.key)}</h3>
            <div className="tags" translate="no">{skill.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div>
          </article>
        ))}
      </div>
      <p className="skills-note">{t('skills_note')}</p>
    </Section>
  )
}

export function Approach() {
  const { t } = useI18n()
  const items = [
    ['a_1h', 'a_1'],
    ['a_2h', 'a_2'],
    ['a_3h', 'a_3'],
  ] as const
  return (
    <Section id="approach" title={t('a_h')} lead={t('a_l')}>
      <div className="approach-grid">
        {items.map(([heading, copy], index) => (
          <article className="approach-card" key={heading}>
            <span className="approach-index">0{index + 1}</span>
            <h3>{t(heading)}</h3>
            <p>{t(copy)}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}

export function Experience() {
  const { t } = useI18n()
  return (
    <Section id="exp" title={t('e_h')}>
      <div className="rows">
        {['e1', 'e2', 'e3', 'e4'].map(entry => (
          <article className="row" key={entry}>
            <span className="when">{t(`${entry}k`)}</span>
            <div><b>{t(`${entry}t`)}</b><p>{t(`${entry}d`)}</p></div>
          </article>
        ))}
      </div>
    </Section>
  )
}

export function Contact() {
  const { t } = useI18n()
  return (
    <Section id="contact" title={t('ct_h')} lead={t('ct_l')}>
      <div className="contact-layout">
        <div className="contact-copy">
          <p className="contact-name">{NAME}</p>
          <p className="contact-role">{t('role')}</p>
          <div className="actions">
            <a className="btn" href={`mailto:${EMAIL}`}>{t('contact_email')}</a>
            <a className="btn ghost" href={RESUME} target="_blank" rel="noopener noreferrer">{t('ct_dl')}</a>
          </div>
        </div>
        <div className="contact-card">
          <p>{t('contact_intro')}</p>
          <a className="contact-external" href={LINKEDIN} target="_blank" rel="noopener noreferrer">Shreyash Jagtap | LinkedIn</a>
          <a className="contact-external" href={GITHUB} target="_blank" rel="noopener noreferrer">shreyashjagtap157 (warrite)</a>
          <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
        </div>
      </div>
    </Section>
  )
}

export function Footer() {
  const { t } = useI18n()
  return <footer className="container foot"><span>{t('foot')}</span><span>© {new Date().getFullYear()} {NAME}</span></footer>
}

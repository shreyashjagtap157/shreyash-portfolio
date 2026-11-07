import { useState } from 'react'
import { Section } from './Section'
import { SKILLS } from '../data/projects'
import { RESUME, EMAIL, LINKEDIN, GITHUB, NAME, PHONE_DISPLAY, PHONE_HREF } from '../data/profile'
import { useI18n } from '../i18n/I18nProvider'

export function CaseStudy() {
  const { t } = useI18n()
  const [selected, setSelected] = useState('omni')
  const cases = [
    { id: 'omni' },
    { id: 'helios' },
    { id: 'nexus' },
    { id: 'uep' },
    { id: 'kilo' },
  ] as const
  const active = cases.find(item => item.id === selected) ?? cases[0]
  const casePoints = [1, 2, 3] as const
  return (
    <Section id="case" title={t('c_h')} lead={t('c_l')}>
      <div className="case-study-selector">
        <label htmlFor="case-study-project">{t('case_select_label')}</label>
        <select id="case-study-project" value={selected} onChange={event => setSelected(event.target.value)}>
          {cases.map(item => <option value={item.id} key={item.id}>{t(`case_${item.id}_name`)}</option>)}
        </select>
      </div>
      <div className="case-study-active" aria-live="polite">
        <h3>{t(`case_${active.id}_name`)}</h3>
        <p className="case-study-intro">{t(`case_${active.id}_intro`)}</p>
        <div className="split case-study">
          {casePoints.map(index => <article key={index}>
            <strong>{t(`case_${active.id}_${index}h`)}</strong>
            <p>{t(`case_${active.id}_${index}`)}</p>
          </article>)}
        </div>
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
    ['a_4h', 'a_4'],
    ['a_5h', 'a_5'],
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
          <div className="contact-link-group"><a className="contact-external" href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn — professional profile</a><small>Career background, professional connections, and direct messaging.</small></div>
          <div className="contact-link-group"><a className="contact-external" href={GITHUB} target="_blank" rel="noopener noreferrer">GitHub — shreyashjagtap157</a><small>Source repositories, project history, code, and public contributions.</small></div>
          <div className="contact-link-group"><a href={PHONE_HREF}>Phone — {PHONE_DISPLAY}</a><small>Direct telephone contact for relevant professional conversations.</small></div>
        </div>
      </div>
    </Section>
  )
}

export function Footer() {
  const { t } = useI18n()
  return <footer className="container foot"><span>{t('foot')}</span><span>© {new Date().getFullYear()} {NAME}</span></footer>
}

import { Section } from './Section'
import { Projects } from './Projects'
import { Hero } from './Hero'
import { GitHubContributionsCalendar } from './GitHubContributionsCalendar'
import { SKILLS } from '../data/projects'
import { RESUME, EMAIL, LINKEDIN, GITHUB, NAME } from '../data/profile'
import { useI18n } from '../i18n/I18nProvider'

export function CaseStudy() {
	const { t } = useI18n()
	return <Section id="case" title={t('c_h')} lead={t('c_l')}><div className="split case-study"><p><strong>01 / Semantics</strong>{t('c_1')}</p><p><strong>02 / Evolution</strong>{t('c_2')}</p><p><strong>03 / Constraint</strong>{t('c_3')}</p><p><strong>04 / Traceability</strong>Specification, implementation, tests, and runtime behavior stay connected as the system grows.</p></div></Section>
}

export function Skills() {
	const { t } = useI18n()
	return <Section id="skills" title={t('s_h')} lead={t('s_l')}><div className="skills">{SKILLS.map(skill => <article className="skill-group" key={skill.key}><h3>{t(skill.key)}</h3><div className="tags" translate="no">{skill.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div></article>)}</div></Section>
}

export function Experience() {
	const { t } = useI18n()
	return <Section id="exp" title={t('e_h')}><div className="rows">{['e1', 'e2', 'e3', 'e4'].map(entry => <article className="row" key={entry}><span className="when">{t(`${entry}k`)}</span><div><b>{t(`${entry}t`)}</b><p>{t(`${entry}d`)}</p></div></article>)}</div></Section>
}

export function Contact() {
	const { t } = useI18n()
	return <Section id="contact" title={t('ct_h')} lead={t('ct_l')}><div className="contact-layout"><div className="contact-copy"><p className="contact-name">{NAME}</p><div className="actions"><a className="btn" href={`mailto:${EMAIL}`}>{EMAIL}</a><a className="btn ghost" href={RESUME} target="_blank" rel="noopener noreferrer">{t('ct_dl')}</a><a className="btn ghost" href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn</a><a className="btn ghost" href={GITHUB} target="_blank" rel="noopener noreferrer">GitHub</a></div></div><GitHubContributionsCalendar username="shreyashjagtap157" /></div></Section>
}

export function Footer() {
	const { t } = useI18n()
	return <footer className="container foot"><span>{t('foot')}</span><span>© {new Date().getFullYear()} {NAME}</span></footer>
}

export { Section, Projects, Hero }
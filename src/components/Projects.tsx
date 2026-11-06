import { useEffect, useState } from 'react'
import { useI18n } from '../i18n/I18nProvider'
import { PROJECTS, REPO_BASE, type Category, type Project } from '../data/projects'
import { PROJECT_DETAIL_KEYS } from '../data/projectDetails'
import { Section } from './Section'

const CATEGORY_GROUPS: { value: Category; label: string; detail: string }[] = [
  { value: 'sys', label: 'f_sys', detail: 'f_sys_detail' },
  { value: 'ai', label: 'f_ai', detail: 'f_ai_detail' },
  { value: 'plat', label: 'f_plat', detail: 'f_plat_detail' },
]

export function Projects() {
  const { t } = useI18n()
  const [filter, setFilter] = useState<'all' | Category>('all')
  const [detailId, setDetailId] = useState<string | null>(null)

  useEffect(() => {
    const readHash = () => {
      const match = window.location.hash.match(/^#project\/([a-z0-9-]+)$/)
      setDetailId(match?.[1] ?? null)
    }
    readHash()
    window.addEventListener('hashchange', readHash)
    return () => window.removeEventListener('hashchange', readHash)
  }, [])

  const selectedProject = PROJECTS.find(project => project.id === detailId)
  if (selectedProject) {
    return (
      <Section id="work" title={t('w_h')} lead={t('w_l')}>
        <a href="#work" className="btn ghost back-link">{t('b_all')}</a>
        <ProjectDetail project={selectedProject} />
      </Section>
    )
  }

  const shown = PROJECTS.filter(project => filter === 'all' || project.cat === filter)

  return (
    <Section id="work" title={t('w_h')} lead={t('w_l')}>
      <div className="category-groups" role="group" aria-label={t('filter')}>
        {CATEGORY_GROUPS.map((group, index) => {
          const count = PROJECTS.filter(project => project.cat === group.value).length
          return (
            <button
              className="category-group"
              key={group.value}
              type="button"
              aria-pressed={filter === group.value}
              onClick={() => setFilter(filter === group.value ? 'all' : group.value)}
            >
              <span className="category-number">0{index + 1}</span>
              <strong>{t(group.label)}</strong>
              <small>{t(group.detail)}</small>
              <em>{count} · {t('projects_count')}</em>
            </button>
          )
        })}
      </div>
      <div className="selected-work-toolbar">
        <span>{filter === 'all' ? t('w_all') : t(CATEGORY_GROUPS.find(group => group.value === filter)?.label ?? 'w_all')}</span>
        <button type="button" className="all-work-button" aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>
          {t('f_all')} · {PROJECTS.length}
        </button>
      </div>
      <div className="grid">
        {shown.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const { t } = useI18n()
  return (
    <article className="card project-card">
      <ProjectVisual project={project} />
      <header>
        <h3><a className="project-title" href={`#project/${project.id}`} translate="no">{project.name}</a></h3>
        <span className="tag s">{t('st_' + project.status)}</span>
      </header>
      <p className="desc">{t('p_' + project.id)}</p>
      <p className="tags" translate="no">
        {project.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}
      </p>
      <div className="project-card-links">
        <a className="repo" href={REPO_BASE + project.repo} target="_blank" rel="noopener noreferrer">{t('repo')} ↗</a>
      </div>
    </article>
  )
}

function ProjectVisual({ project }: { project: Project }) {
  const { t } = useI18n()
  const categoryNumber = project.cat === 'sys' ? '01' : project.cat === 'ai' ? '02' : '03'
  const categoryLabel = t('visual_' + project.cat)
  const mark = project.name.replace(/[^a-z0-9]/gi, '').slice(0, 2).toUpperCase()
  return (
    <div className={`project-visual visual-${project.cat}`} aria-hidden="true">
      <span className="visual-label">{categoryNumber} / {categoryLabel}</span>
      <span className="visual-symbol">{mark}</span>
      <small>{project.tags.slice(0, 3).join(' · ')}</small>
    </div>
  )
}

function ProjectDetail({ project }: { project: Project }) {
  const { t } = useI18n()
  const detailKey = PROJECT_DETAIL_KEYS[project.id]
  return (
    <article className="project-detail-card">
      <div className="project-detail-copy">
        <p className="eyebrow">{t('project_snapshot')}</p>
        <h3 translate="no">{project.name}</h3>
        <p className="desc">{t('p_' + project.id)}</p>
        {detailKey && <p className="project-detail-note">{t(detailKey)}</p>}
        <p className="project-detail-status"><strong>{t('project_status')}:</strong> {t('st_' + project.status)}</p>
        <div className="tags" translate="no">{project.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div>
        <a className="btn" href={REPO_BASE + project.repo} target="_blank" rel="noopener noreferrer">{t('repo')} ↗</a>
      </div>
      <div className="project-detail-mark" aria-hidden="true"><ProjectVisual project={project} /></div>
    </article>
  )
}

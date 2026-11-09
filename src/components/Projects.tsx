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

  useEffect(() => {
    if (!detailId || !PROJECTS.some(project => project.id === detailId)) return

    const frame = window.requestAnimationFrame(() => {
      const detail = document.getElementById('project-detail')
      if (!detail) return

      const root = document.documentElement
      const previousScrollBehavior = root.style.scrollBehavior
      root.style.scrollBehavior = 'auto'
      detail.scrollIntoView({ block: 'start', behavior: 'auto' })

      // The initial scroll makes the sticky toolbar settle at its pinned height.
      // Measure that actual height, then correct the target position below it.
      const toolbar = document.querySelector<HTMLElement>('.toolbar')
      const toolbarBottom = toolbar?.getBoundingClientRect().bottom ?? 0
      const gap = detail.getBoundingClientRect().top - toolbarBottom
      window.scrollBy(0, gap - 16)
      root.style.scrollBehavior = previousScrollBehavior
    })

    return () => window.cancelAnimationFrame(frame)
  }, [detailId])

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
  const nodes: number[][] = project.id === 'omni' ? [[35,72],[105,72],[175,72],[245,72]] :
    project.id === 'helios' ? [[140,42],[75,105],[140,105],[205,105],[140,168]] :
    project.id === 'nexus' || project.id === 'kilo' ? [[140,95],[45,45],[45,145],[235,45],[235,145]] :
    project.id === 'uep' ? [[45,45],[140,45],[235,45],[45,145],[140,145],[235,145]] :
    project.id === 'tensor' ? [[55,95],[105,55],[175,55],[225,95],[175,135],[105,135]] :
    project.id === 'iot' || project.id === 'acts' ? [[55,45],[140,35],[225,45],[75,145],[205,145]] :
    [[45,55],[140,35],[235,55],[75,145],[205,145]]
  const edges: number[][] = project.id === 'omni' ? [[0,1],[1,2],[2,3]] :
    project.id === 'tensor' ? [[0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[1,4],[2,5]] :
    nodes.slice(1).map((_, index) => [0,index+1])
  return (
    <div className={`project-visual visual-${project.cat} visual-${project.id}`} role="img" aria-label={project.name + ' conceptual architecture illustration'}>
      <span className="visual-label">{categoryNumber} / {categoryLabel}</span>
      <svg className="project-diagram" viewBox="0 0 280 190" aria-hidden="true">
        <g className="diagram-lines">{edges.map(([from,to], index) => <line key={index} x1={nodes[from][0]} y1={nodes[from][1]} x2={nodes[to][0]} y2={nodes[to][1]} />)}</g>
        {nodes.map(([x,y], index) => <g key={index} className={index === 0 ? 'diagram-node primary' : 'diagram-node'}><circle cx={x} cy={y} r={index === 0 ? 17 : 11} /><circle cx={x} cy={y} r="3" className="diagram-core" /></g>)}
        {project.id === 'omni' && <g className="diagram-captions"><text x="35" y="108">lex</text><text x="105" y="108">parse</text><text x="175" y="108">IR</text><text x="245" y="108">code</text></g>}
      </svg>
      <small>{project.tags.slice(0, 3).join(' · ')}</small>
    </div>
  )
}

function ProjectDetail({ project }: { project: Project }) {
  const { t } = useI18n()
  const detailKey = PROJECT_DETAIL_KEYS[project.id]
  return (
    <article id="project-detail" className="project-detail-card" tabIndex={-1} aria-labelledby="project-detail-title">
      <div className="project-detail-copy">
        <p className="eyebrow">{t('project_snapshot')}</p>
        <h3 id="project-detail-title" translate="no">{project.name}</h3>
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

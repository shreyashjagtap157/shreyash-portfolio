import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import { useI18n } from '../i18n/I18nProvider'
import { PROJECTS, REPO_BASE, type Category } from '../data/projects'
import { PROJECT_DETAILS } from '../data/projectDetails'
import { Section } from './Section'
import { Arch } from './ProjectDetail'

const CATEGORY_GROUPS: { value: Category; label: string; detail: string }[] = [
  { value: 'sys', label: 'Languages and systems', detail: 'Compilers, operating systems, tokenizers, and foundational tooling.' },
  { value: 'ai', label: 'AI and agents', detail: 'Agent platforms, neural research, local automation, and ML libraries.' },
  { value: 'plat', label: 'Platforms and web', detail: 'Full-stack products, APIs, workflows, and data-backed applications.' },
]

export function Projects() {
  const { t } = useI18n()
  const [f, setF] = useState<'all' | Category>('all')
  const shown = PROJECTS.filter(p => f === 'all' || p.cat === f)
  const [detailId, setDetailId] = useState<string | null>(null)

  useEffect(() => {
    const m = window.location.hash.match(/^#project\/([a-z0-9-]+)$/)
    setDetailId(m ? m[1] : null)
    const onHashChange = () => {
      const mm = window.location.hash.match(/^#project\/([a-z0-9-]+)$/)
      setDetailId(mm ? mm[1] : null)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  if (detailId) {
    return (
      <Section id="work" title={t('w_h')} lead={t('w_l')}>
        <a href="#work" className="btn ghost" style={{ marginBottom: '1rem', display: 'inline-block' }}>
          ← {t('b_all')}
        </a>
        <ProjectDetailFixed id={detailId} />
      </Section>
    )
  }
  return (
    <Section id="work" title={t('w_h')} lead={t('w_l')}>
      <div className="category-groups" role="group" aria-label={t('filter')}>
        {CATEGORY_GROUPS.map((group, index) => {
          const count = PROJECTS.filter(project => project.cat === group.value).length
          return <button className="category-group" key={group.value} type="button" aria-pressed={f === group.value} onClick={() => setF(group.value)}><span className="category-number">0{index + 1}</span><strong>{group.label}</strong><small>{group.detail}</small><em>{count} projects ↗</em></button>
        })}
      </div>
      <div className="selected-work-toolbar"><span>{f === 'all' ? 'All selected work' : CATEGORY_GROUPS.find(group => group.value === f)?.label}</span><button type="button" className="all-work-button" aria-pressed={f === 'all'} onClick={() => setF('all')}>{t('f_all')} · {PROJECTS.length}</button></div>
      <div className="grid">
        {shown.map((p, index) => (
          <a
            className="card project-card"
            key={p.id}
            href={`#project/${p.id}`}
            role="button"
            tabIndex={0}
            onKeyDown={e => { if (e.key === 'Enter') window.location.hash = `#project/${p.id}` }}
            style={{ '--project-delay': `${index * 35}ms` } as CSSProperties}
          >
            <ProjectVisual category={p.cat} name={p.name} tags={p.tags} />
            <header><h3 translate="no">{p.name}</h3><span className="tag s">{t('st_' + p.status)}</span></header>
            <p className="desc">{t('p_' + p.id)}</p>
            <p className="density-spacious-only project-detail-line">Build surface: {p.tags.join(' · ')}</p>
            <p className="tags" translate="no">{p.tags.map(x => <span className="tag" key={x}>{x}</span>)}</p>
            <a className="repo" href={REPO_BASE + p.repo} target="_blank" rel="noopener noreferrer">{t('repo')} →</a>
          </a>
        ))}
      </div>
    </Section>
  )
}

function ProjectVisual({ category, name, tags }: { category: Category; name: string; tags: string[] }) {
  if (category === 'sys') return <div className="project-visual visual-sys" aria-hidden="true"><span className="visual-label">SYSTEM / PIPELINE</span><div className="visual-flow"><b>{name}</b><i>→</i><b>IR</b><i>→</i><b>BUILD</b></div><small>SPECIFICATION · {tags[0]}</small></div>
  if (category === 'ai') return <div className="project-visual visual-ai" aria-hidden="true"><span className="visual-label">AGENT / LOOP</span><div className="visual-code"><span>01</span> observe(context)<br /><span>02</span> route(tool)<br /><span>03</span> review(output)</div><small>{tags.join(' · ')}</small></div>
  return <div className="project-visual visual-plat" aria-hidden="true"><span className="visual-label">PLATFORM / FLOW</span><div className="visual-queue"><b>INGEST</b><i /><i /><i /><b>DELIVER</b></div><small>API · DATA · WORKFLOW</small></div>
}

function ProjectDetailFixed({ id }: { id: string }) {
  const project = PROJECTS.find(item => item.id === id)
  if (!project) return null
  const detail = PROJECT_DETAILS[id] ?? createProjectDetail(project)
  const { t } = useI18n()
  return (
    <div className="split" style={{ marginTop: '2rem' }}>
      <div>
        <h2 translate="no">{project.name}</h2>
        <p className="desc">{t('p_' + id)}</p>
        <p className="when"><strong>{detail.statusNote}</strong></p>
        <div className="tags" style={{ marginTop: '1rem' }}>
          {detail.links.map(l => (
            <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer" className="repo" translate="no">
              {l.label}
            </a>
          ))}
        </div>
      </div>
      <div className="viz" style={{ minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Arch svg={detail.arch} />
      </div>
    </div>
  )
}

function createProjectDetail(project: typeof PROJECTS[number]) {
  const kind = project.cat === 'sys' ? 'language / system' : project.cat === 'ai' ? 'agent / model' : 'platform / web'
  const middle = project.tags[0] ?? 'runtime'
  const end = project.tags[1] ?? 'delivery'
  return {
    id: project.id,
    arch: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" class="arch-diagram"><defs><marker id="arr-${project.id}" markerWidth="8" markerHeight="8" refX="7" refY="3.5" orient="auto"><polygon points="0 0, 8 3.5, 0 7" fill="var(--mut)"/></marker></defs><rect x="30" y="35" w="105" h="55" rx="6" class="stage"/><text x="82" y="67" class="label">${kind}</text><path d="M135 62 L175 62" class="arrow" marker-end="url(#arr-${project.id})"/><rect x="175" y="35" w="105" h="55" rx="6" class="stage"/><text x="227" y="67" class="label">${middle}</text><path d="M280 62 L320 62" class="arrow" marker-end="url(#arr-${project.id})"/><rect x="320" y="35" w="55" h="55" rx="6" class="stage stage-final"/><text x="347" y="67" class="label">${end}</text><path d="M227 90 L227 150" class="arrow" marker-end="url(#arr-${project.id})"/><rect x="145" y="150" w="165" h="65" rx="6" class="stage"/><text x="227" y="178" class="label">${project.name}</text><text x="227" y="198" class="label">inspectable workflow</text><path d="M227 215 L227 250" class="arrow" marker-end="url(#arr-${project.id})"/><text x="227" y="275" class="label">status: ${project.status}</text></svg>`,
    description: '',
    statusNote: `${project.status[0].toUpperCase()}${project.status.slice(1)} — ${kind} project.`,
    links: [{ label: 'Repository', url: REPO_BASE + project.repo }],
  }
}

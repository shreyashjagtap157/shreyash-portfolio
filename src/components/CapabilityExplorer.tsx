import { useState } from 'react'

const CAPABILITIES = [
  { label: 'AI and agents', short: '01', icon: '◇', detail: 'Agent orchestration, RAG, MCP integrations, and local-first automation built around explicit tools and review points.', tags: ['NexusAgent', 'Kilo Code', 'MCP APIs'] },
  { label: 'Data and machine learning', short: '02', icon: '◌', detail: 'Research and production workflows for neural computation, tensor methods, PyTorch, and evaluation-driven systems.', tags: ['PyTorch', 'Tensor rings', 'Neural ODEs'] },
  { label: 'Languages and systems', short: '03', icon: '▣', detail: 'Specification-led systems work spanning compilers, tokenization, operating-system architecture, and Rust tooling.', tags: ['Omni', 'AetherOS', 'Mosaic'] },
  { label: 'Platforms and web', short: '04', icon: '⌘', detail: 'Full-stack platforms with APIs, workflows, multi-tenancy, live classrooms, grading, and reliable data boundaries.', tags: ['UEP', 'Django', 'Spring Boot'] },
]

export function CapabilityExplorer() {
  const [selected, setSelected] = useState(0)
  const capability = CAPABILITIES[selected]
  return (
    <section className="capability-explorer section" id="expertise">
      <div className="capability-heading"><div><p className="eyebrow"><span>01</span> ENGINEERING RANGE</p><h2>Systems thinking,<br /><span>from model to product.</span></h2></div><p className="lead">Explore the four areas where Shreyash builds, researches, and ships.</p></div>
      <div className="capability-body">
        <div className="capability-options" role="tablist" aria-label="Engineering capabilities">
          {CAPABILITIES.map((item, index) => <button key={item.label} type="button" role="tab" aria-selected={selected === index} onClick={() => setSelected(index)}><span>{item.short}</span><b>{item.icon}</b><strong>{item.label}</strong><em>↗</em></button>)}
        </div>
        <div className="capability-detail" role="tabpanel" aria-live="polite" key={capability.label}><p className="eyebrow">SELECTED CAPABILITY</p><h3>{capability.label}</h3><p>{capability.detail}</p><div className="tags" translate="no">{capability.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div><div className="capability-signal"><i /><i /><i /><span>Evidence → implementation → iteration</span></div></div>
      </div>
    </section>
  )
}

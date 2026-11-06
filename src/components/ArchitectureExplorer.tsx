import { useState } from 'react'

const SYSTEMS = [
  { name: 'Compiler', sources: ['Specification', 'Tokenizer', 'IR'], engine: 'Omni compiler', output: 'Self-hosted toolchain', detail: 'A governed path from language rules to a working compiler, with each stage explicit and testable.' },
  { name: 'Agents', sources: ['Context', 'Tools', 'Memory'], engine: 'NexusAgent', output: 'Reviewed action', detail: 'Local-first agents that route providers, ground decisions in context, and keep actions inspectable.' },
  { name: 'ML systems', sources: ['Data', 'Model', 'Evaluation'], engine: 'Tensor research', output: 'Measured result', detail: 'Research workflows that connect data preparation, PyTorch models, and reproducible evaluation.' },
]

export function ArchitectureExplorer() {
  const [selected, setSelected] = useState(0)
  const system = SYSTEMS[selected]
  return (
    <section className="architecture section" id="systems">
      <div className="architecture-top"><span className="mono">SYSTEM / EXPLORER</span><span className="architecture-caption">Interactive architecture</span></div>
      <div className="segmented" role="tablist" aria-label="Explore a system">
        {SYSTEMS.map((item, index) => <button type="button" role="tab" aria-selected={selected === index} key={item.name} onClick={() => setSelected(index)}>{item.name}</button>)}
      </div>
      <div className="system-map">
        <div className="system-connections" aria-hidden="true"><i /><i /><i /><b /></div>
        <div className="source-nodes">{system.sources.map((source, index) => <button type="button" className="node source-node" key={source} aria-label={source}><span>{String(index + 1).padStart(2, '0')}</span>{source}</button>)}</div>
        <button type="button" className="node engine-node" aria-label={system.engine}><span className="engine-ring">◇</span>{system.engine}</button>
        <button type="button" className="node output-node" aria-label={system.output}><span>✓</span>{system.output}</button>
      </div>
      <div className="system-readout" aria-live="polite"><span>{String(selected + 1).padStart(2, '0')}</span><p>{system.detail}</p></div>
      <div className="architecture-bottom"><span><span className="small-square" /> Evidence → implementation → review</span><span>Click a mode to inspect</span></div>
    </section>
  )
}

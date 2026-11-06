import { REPO_BASE } from '../data/projects'

export function ResearchSection() {
  const links = [
    ['Omni', 'Specification-led programming language and compiler work.', `${REPO_BASE}Omni---New`],
    ['Dynamic Neural Computing', 'Formal specification and Python runtime for dynamic neural computation graphs.', `${REPO_BASE}Dynamic-Neural-Computing`],
    ['Tensor ring decomposition', 'PyTorch implementations of tensor ring methods and experiments.', `${REPO_BASE}tensor-ring-decomposition`],
  ]
  return <section className="section research-section" id="research"><div className="section-heading"><div><p className="eyebrow"><span>07</span> RESEARCH & OPEN SOURCE</p><h2>Work that extends<br /><span>beyond the product.</span></h2></div><p className="lead">Specifications, experiments, and developer tools published through my own GitHub work.</p></div><div className="research-layout"><div className="research-papers">{links.map((link, index) => <a className="paper-card" href={link[2]} target="_blank" rel="noopener noreferrer" key={link[0]}><span className="paper-index">0{index + 1}</span><div><p className="eyebrow">GITHUB PROJECT</p><h3>{link[0]}</h3><p>{link[1]}</p><span className="text-link">Open repository ↗</span></div></a>)}</div><aside className="principles-card"><span className="eyebrow">HOW I BUILD</span><h3>Architecture.<br />Judgment.<br /><span>Ownership.</span></h3><p>A useful system needs more than a model: explicit boundaries, evidence, evaluation, and care for the last mile.</p><a href="#delivery" className="text-link">How I deliver ↗</a><div className="principle-labels"><span>01 / Ground in evidence</span><span>02 / Keep systems inspectable</span><span>03 / Own the last mile</span></div></aside></div></section>
}

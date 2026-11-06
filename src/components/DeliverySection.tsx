import { useState } from 'react'

const STEPS = [
  ['Discover', 'Find the constraint behind the request.', 'A concrete problem and acceptance criteria'],
  ['Design', 'Make behavior, boundaries, and trade-offs explicit.', 'A system shape that can be reviewed'],
  ['Build & evaluate', 'Implement the path and measure what matters.', 'Working software with evidence'],
  ['Deploy & iterate', 'Put it in the workflow and learn from use.', 'A dependable next release'],
]

export function DeliverySection() {
  const [selected, setSelected] = useState(0)
  const step = STEPS[selected]
  return <section className="section delivery-section" id="delivery"><div className="section-heading"><div><p className="eyebrow"><span>06</span> DELIVERY LOOP</p><h2>From the first conversation<br /><span>to the next release.</span></h2></div><p className="lead">I stay close to the user and the code. This is the loop behind the work.</p></div><div className="delivery-steps" role="tablist" aria-label="Explore the delivery process">{STEPS.map((item, index) => <button type="button" role="tab" aria-selected={selected === index} key={item[0]} onClick={() => setSelected(index)}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item[0]}</strong><em>↗</em></button>)}</div><div className="delivery-detail" role="tabpanel" aria-live="polite" key={step[0]}><div><p className="eyebrow">CURRENT STAGE</p><h3>{step[1]}</h3></div><div className="delivery-artifact"><p className="eyebrow">WHAT LEAVES THIS STAGE</p><p>{step[2]}</p></div></div></section>
}

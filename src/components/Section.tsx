import type { ReactNode } from 'react'
export function Section({ id, title, lead, children, center }: { id: string; title: string; lead?: string; children?: ReactNode; center?: boolean }) {
  return (
    <section id={id} className={'section' + (center ? ' center' : '')}>
      <h2>{title}</h2>
      {lead && <p className="lead">{lead}</p>}
      {children}
    </section>
  )
}

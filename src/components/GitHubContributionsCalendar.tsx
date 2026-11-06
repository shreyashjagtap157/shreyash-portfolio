import { useEffect, useState } from 'react'

interface ContributionDay {
  date: string
  count: number
  level: number
}

export interface GitHubContributionsCalendarProps {
  username: string
  className?: string
  width?: string
  height?: string
}

export function GitHubContributionsCalendar({
  username,
  className,
  width = '100%',
  height = '250',
}: GitHubContributionsCalendarProps) {
  const [days, setDays] = useState<ContributionDay[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`, { signal: controller.signal })
      .then(response => {
        if (!response.ok) throw new Error('Unable to load contributions')
        return response.json() as Promise<{ contributions?: ContributionDay[] }>
      })
      .then(data => setDays(data.contributions ?? []))
      .catch(error => {
        if (error.name !== 'AbortError') setDays([])
      })
      .finally(() => setLoading(false))
    return () => controller.abort()
  }, [username])

  const byDate = new Map(days.map(day => [day.date, day]))
  const lastDate = days.length ? new Date(`${days[days.length - 1].date}T00:00:00`) : new Date()
  const firstDate = new Date(lastDate)
  firstDate.setDate(firstDate.getDate() - 364 - lastDate.getDay())
  const cells = Array.from({ length: 53 * 7 }, (_, index) => {
    const date = new Date(firstDate)
    date.setDate(firstDate.getDate() + index)
    const key = date.toISOString().slice(0, 10)
    return byDate.get(key) ?? { date: key, count: 0, level: 0 }
  })


const OPEN_SOURCE_CONTRIBUTIONS = [
  { number: '01', title: 'Omni — specification-led compiler work', href: 'https://github.com/shreyashjagtap157/Omni---New' },
  { number: '02', title: 'NexusAgent — local-first agent platform', href: 'https://github.com/shreyashjagtap157/nexus-agent' },
  { number: '03', title: 'AetherOS — capability-based systems architecture', href: 'https://github.com/shreyashjagtap157/AetherOS' },
]

  return (
    <div className={`github-contributions-calendar ${className}`} style={{ width, minHeight: height }}>
      <div className="github-contributions-heading"><strong>GitHub activity</strong><a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer">View profile ↗</a></div>
      {loading ? <p className="github-contributions-status">Loading contributions…</p> : days.length === 0 ? <div className="github-contributions-fallback"><img src={`https://ghchart.rshah.org/22d3ee/${username}`} alt={`GitHub contribution calendar for ${username}`} /><p>Contributions are available on <a href={`https://github.com/${username}?tab=overview`} target="_blank" rel="noopener noreferrer">GitHub</a>.</p></div> : (
        <div className="github-contributions-grid" aria-label={`GitHub contribution calendar for ${username}`}>
          {cells.map(day => <span className={`contribution-cell level-${day.level}`} key={day.date} title={`${day.count} contributions on ${day.date}`} />)}
        </div>
      )}
      <div className="github-contributions-footer"><span>Less</span><i className="contribution-cell level-0" /><i className="contribution-cell level-1" /><i className="contribution-cell level-2" /><i className="contribution-cell level-3" /><i className="contribution-cell level-4" /><span>More</span></div>
      <div className="github-contributions-prs">
        <span className="github-contributions-label">Selected work on GitHub</span>
        {OPEN_SOURCE_CONTRIBUTIONS.map(pr => <a href={pr.href} target="_blank" rel="noopener noreferrer" key={pr.number}><span>{pr.number}</span><strong>{pr.title}</strong><em>Open ↗</em></a>)}
      </div>
    </div>
  )
}
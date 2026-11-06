import { useCallback, useEffect, useMemo, useState } from 'react'
import { Section } from './Section'
import { useI18n } from '../i18n/I18nProvider'

type PublicPushEvent = {
  id: string
  type: string
  created_at: string
  repo: { name: string }
  payload?: {
    ref?: string
    head?: string
    commits?: Array<{ sha: string; message: string }>
  }
}

type ActivityCache = { fetchedAt: number; events: PublicPushEvent[] }
const USERNAME = 'shreyashjagtap157'
const CACHE_KEY = 'github-public-push-events-v2'
const CACHE_TTL = 10 * 60 * 1000
const EVENTS_URL = `https://api.github.com/users/${USERNAME}/events/public?per_page=100`
const CONTRIBUTIONS_URL = `https://github.com/users/${USERNAME}/contributions`

function readCache(): ActivityCache | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const value = JSON.parse(raw) as ActivityCache
    if (!Number.isFinite(value.fetchedAt) || !Array.isArray(value.events)) return null
    const validEvents = value.events.every(event =>
      event &&
      typeof event.id === 'string' &&
      event.type === 'PushEvent' &&
      typeof event.created_at === 'string' &&
      Number.isFinite(Date.parse(event.created_at)) &&
      typeof event.repo?.name === 'string'
    )
    return validEvents ? value : null
  } catch {
    return null
  }
}

function commitUrl(event: PublicPushEvent): string | null {
  const repoName = event.repo.name
  const sha = event.payload?.commits?.at(-1)?.sha || event.payload?.head
  if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repoName) || !sha || !/^[a-f0-9]{7,40}$/i.test(sha)) return null
  return `https://github.com/${repoName}/commit/${sha}`
}

export function GitHubActivity() {
  const { t, lang } = useI18n()
  const [events, setEvents] = useState<PublicPushEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [fetchedAt, setFetchedAt] = useState<number | null>(null)
  const [contributionsAvailable, setContributionsAvailable] = useState(true)

  const load = useCallback(async (force = false, signal?: AbortSignal) => {
    const cached = readCache()
    if (!force && cached && Date.now() - cached.fetchedAt < CACHE_TTL) {
      setEvents(cached.events)
      setFetchedAt(cached.fetchedAt)
      setError(false)
      setLoading(false)
      return
    }

    setLoading(true)
    setError(false)
    try {
      const response = await fetch(EVENTS_URL, {
        headers: { Accept: 'application/vnd.github+json' },
        signal,
      })
      if (!response.ok) throw new Error(`GitHub API returned ${response.status}`)
      const payload: unknown = await response.json()
      if (!Array.isArray(payload)) throw new Error('GitHub returned an unexpected activity response')
      const publicPushes = (payload as PublicPushEvent[])
        .filter(event => event?.type === 'PushEvent' && typeof event.id === 'string' &&
          typeof event.created_at === 'string' && Number.isFinite(Date.parse(event.created_at)) &&
          typeof event.repo?.name === 'string')
        .sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at))
      const next: ActivityCache = { fetchedAt: Date.now(), events: publicPushes }
      try { localStorage.setItem(CACHE_KEY, JSON.stringify(next)) } catch { /* cache is optional */ }
      setEvents(publicPushes)
      setFetchedAt(next.fetchedAt)
      setError(false)
    } catch (cause) {
      if (cause instanceof Error && cause.name === 'AbortError') return
      if (cached) {
        setEvents(cached.events)
        setFetchedAt(cached.fetchedAt)
      }
      setError(true)
    } finally {
      if (!signal?.aborted) setLoading(false)
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    void load(false, controller.signal)
    return () => controller.abort()
  }, [load])

  const recent = events.slice(0, 6)
  const timeFormat = useMemo(() => new Intl.DateTimeFormat(lang, { dateStyle: 'medium', timeStyle: 'short' }), [lang])
  const lastUpdated = fetchedAt ? timeFormat.format(new Date(fetchedAt)) : null

  return (
    <Section id="activity" title={t('activity_h')} lead={t('activity_l')}>
      <div className="github-activity-panel">
        <div className="activity-contributions">
          <div className="activity-latest-heading">
            <h3>{t('activity_contributions')}</h3>
            <a href={`https://github.com/${USERNAME}?tab=overview`} target="_blank" rel="noopener noreferrer">{t('activity_profile')} ↗</a>
          </div>
          {contributionsAvailable ? (
            <img
              className="github-contribution-graph"
              src={CONTRIBUTIONS_URL}
              alt={t('activity_graph_alt')}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              onError={() => setContributionsAvailable(false)}
            />
          ) : (
            <p className="activity-state" role="status">{t('activity_graph_unavailable')} <a href={`https://github.com/${USERNAME}?tab=overview`} target="_blank" rel="noopener noreferrer">{t('activity_profile')}</a></p>
          )}
          <p className="activity-footnote">{t('activity_graph_scope')}</p>
        </div>

        <div className="activity-latest">
          <div className="activity-latest-heading">
            <h3>{t('activity_latest')}</h3>
            <button type="button" className="all-work-button activity-refresh" onClick={() => void load(true)} disabled={loading}>
              {loading ? t('activity_loading') : t('activity_refresh')}
            </button>
          </div>
          <p className="activity-footnote">
            {error ? t('activity_stale') : t('activity_scope')}
            {lastUpdated && <span>{t('activity_updated')} {lastUpdated}</span>}
          </p>
          {loading && recent.length === 0 ? (
            <p className="activity-state" role="status">{t('activity_loading')}</p>
          ) : recent.length === 0 ? (
            <p className="activity-state" role="status">{error ? t('activity_error') : t('activity_empty')}</p>
          ) : (
            <ol className="push-list">
              {recent.map(event => {
                const lastCommit = event.payload?.commits?.at(-1)
                const destination = commitUrl(event)
                const label = lastCommit?.message.split('\n')[0] || event.payload?.ref?.replace('refs/heads/', '') || t('activity_push')
                return (
                  <li key={event.id}>
                    <span className="push-marker" aria-hidden="true">↗</span>
                    <div className="push-copy">
                      <strong>{label}</strong>
                      <span>{event.repo.name}</span>
                    </div>
                    <time dateTime={event.created_at}>{timeFormat.format(new Date(event.created_at))}</time>
                    {destination && <a className="push-open" href={destination} target="_blank" rel="noopener noreferrer" aria-label={t('activity_open_commit')}>↗</a>}
                  </li>
                )
              })}
            </ol>
          )}
        </div>
      </div>
    </Section>
  )
}

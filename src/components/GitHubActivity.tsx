import { useCallback, useEffect, useMemo, useState } from 'react'
import { Section } from './Section'
import { useI18n } from '../i18n/I18nProvider'

type Contribution = { date: string; level: number }
type Push = { id: string; repo: string; createdAt: string; branch: string; message: string; url: string | null }
type ActivityResponse = { contributions: Contribution[]; summary: string; pushes: Push[]; updatedAt: string; partial?: boolean }

export function GitHubActivity() {
  const { t, lang } = useI18n()
  const [activity, setActivity] = useState<ActivityResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState(false)
  const dateFormat = useMemo(() => new Intl.DateTimeFormat(lang, { dateStyle: 'medium' }), [lang])
  const timeFormat = useMemo(() => new Intl.DateTimeFormat(lang, { dateStyle: 'medium', timeStyle: 'short' }), [lang])

  const load = useCallback(async (force = false, signal?: AbortSignal) => {
    if (force) setRefreshing(true)
    else setLoading(true)
    try {
      const path = force ? '/api/github/activity?refresh=1' : '/api/github/activity'
      const response = await fetch(path, { headers: { Accept: 'application/json' }, cache: 'no-store', signal })
      if (!response.ok) throw new Error('GitHub activity request failed: ' + response.status)
      const value = await response.json() as ActivityResponse
      if (!Array.isArray(value.contributions) || !Array.isArray(value.pushes)) throw new Error('Invalid GitHub activity response')
      if (!signal?.aborted) { setActivity(value); setError(Boolean(value.partial)) }
    } catch (cause) {
      if (cause instanceof Error && cause.name === 'AbortError') return
      if (!signal?.aborted) setError(true)
    } finally {
      if (!signal?.aborted) { setLoading(false); setRefreshing(false) }
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    void load(false, controller.signal)
    return () => controller.abort()
  }, [load])

  const contributions = activity?.contributions ?? []
  const pushes = activity?.pushes ?? []
  const updated = activity?.updatedAt ? timeFormat.format(new Date(activity.updatedAt)) : null

  return (
    <Section id="activity" title={t('activity_h')} lead={t('activity_l')}>
      <div className="github-activity-panel">
        <div className="activity-calendar">
          <div className="activity-heading">
            <div>
              <p className="eyebrow">{t('activity_contributions')}</p>
              <h3>{activity?.summary || (loading ? t('activity_loading') : t('activity_graph_unavailable'))}</h3>
            </div>
            <a href="https://github.com/shreyashjagtap157?tab=overview" target="_blank" rel="noopener noreferrer">{t('activity_profile')} ↗</a>
          </div>
          {contributions.length > 0 ? (
            <div className="activity-grid-scroll">
              <div className="activity-grid" role="img" aria-label={t('activity_chart_alt')}>
                {contributions.map(cell => (
                  <span key={cell.date} className={'activity-cell level-' + Math.max(0, Math.min(4, cell.level))}
                    title={dateFormat.format(new Date(cell.date + 'T12:00:00Z')) + ' · ' + t('activity_level_' + cell.level)} />
                ))}
              </div>
            </div>
          ) : <p className="activity-state" role="status">{loading ? t('activity_loading') : t('activity_graph_unavailable')}</p>}
          <div className="activity-legend">
            <span>{t('activity_less')}</span>
            {[0, 1, 2, 3, 4].map(level => <i className={'activity-cell level-' + level} key={level} />)}
            <span>{t('activity_more')}</span>
          </div>
          <p className="activity-footnote">{t('activity_graph_scope')}</p>
        </div>
        <div className="activity-latest">
          <div className="activity-heading">
            <div><p className="eyebrow">{t('activity_live_label')}</p><h3>{t('activity_latest')}</h3></div>
            <button type="button" className="all-work-button activity-refresh" onClick={() => void load(true)} disabled={refreshing}>
              {refreshing ? t('activity_loading') : t('activity_refresh')}
            </button>
          </div>
          {updated && <p className="activity-updated">{t('activity_updated')} {updated}</p>}
          {error && <p className="activity-state" role="status">{t('activity_error')}</p>}
          {!loading && pushes.length === 0 && <p className="activity-state" role="status">{t('activity_empty')}</p>}
          {pushes.length > 0 && <ol className="push-list">
            {pushes.map(push => (
              <li key={push.id}>
                <span className="push-marker" aria-hidden="true">↗</span>
                <div className="push-copy">
                  <strong>{push.message || push.branch || t('activity_push')}</strong>
                  <span>{push.repo}{push.branch ? ' · ' + push.branch : ''}</span>
                </div>
                <time dateTime={push.createdAt}>{timeFormat.format(new Date(push.createdAt))}</time>
                {push.url && <a className="push-open" href={push.url} target="_blank" rel="noopener noreferrer" aria-label={t('activity_open_commit')}>↗</a>}
              </li>
            ))}
          </ol>}
          <p className="activity-footnote">{t('activity_public_only')}</p>
        </div>
      </div>
    </Section>
  )
}

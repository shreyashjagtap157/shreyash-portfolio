import { describe, expect, it } from 'vitest'
import { parseContributions, parsePushes } from './worker'

describe('GitHub activity normalization', () => {
  it('extracts dated contribution cells and the profile summary', () => {
    const html = [
      '<h2 id="js-contribution-activity-description">12 contributions in the last year</h2>',
      '<td class="ContributionCalendar-day" data-date="2026-11-02" data-level="4"></td>',
      '<td class="ContributionCalendar-day" data-date="2026-11-01" data-level="0"></td>',
      '<td class="ContributionCalendar-day" data-date="invalid" data-level="2"></td>',
      '<td class="ContributionCalendar-day" data-date="2026-11-03"></td>',
    ].join('')
    expect(parseContributions(html)).toEqual({
      summary: '12 contributions in the last year',
      contributions: [
        { date: '2026-11-01', level: 0 },
        { date: '2026-11-02', level: 4 },
      ],
    })
  })

  it('deduplicates repeated dates and rejects levels outside GitHub calendar bounds', () => {
    const html = [
      '<td class="ContributionCalendar-day" data-date="2026-11-01" data-level="1"></td>',
      '<td class="ContributionCalendar-day" data-date="2026-11-01" data-level="3"></td>',
      '<td class="ContributionCalendar-day" data-date="2026-11-02" data-level="9"></td>',
    ].join('')
    expect(parseContributions(html).contributions).toEqual([{ date: '2026-11-01', level: 3 }])
  })

  it('keeps only valid public PushEvents and constructs validated commit links', () => {
    const pushes = parsePushes([
      {
        id: '1',
        type: 'PushEvent',
        created_at: '2026-11-06T10:00:00Z',
        repo: { name: 'owner/project' },
        payload: {
          ref: 'refs/heads/main',
          head: '0123456789abcdef0123456789abcdef01234567',
          commits: [{ sha: '0123456789abcdef0123456789abcdef01234567', message: 'A commit\nbody' }],
        },
      },
      { id: '2', type: 'IssuesEvent', created_at: '2026-11-06T11:00:00Z', repo: { name: 'owner/project' } },
      { id: '3', type: 'PushEvent', created_at: '2026-11-06T12:00:00Z', repo: { name: 'javascript:alert(1)' }, payload: {} },
      { id: '4', type: 'PushEvent', created_at: 'not-a-date', repo: { name: 'owner/project' }, payload: {} },
    ])
    expect(pushes).toHaveLength(1)
    expect(pushes[0]).toMatchObject({
      repo: 'owner/project',
      branch: 'main',
      message: 'A commit',
      url: 'https://github.com/owner/project/commit/0123456789abcdef0123456789abcdef01234567',
    })
  })

  it('returns the newest push events first and limits the activity feed to six entries', () => {
    const events = Array.from({ length: 8 }, (_, index) => ({
      id: String(index),
      type: 'PushEvent',
      created_at: new Date(Date.UTC(2026, 10, 1, index)).toISOString(),
      repo: { name: 'owner/project-' + index },
      payload: { ref: 'refs/heads/main', head: '0123456789abcdef0123456789abcdef01234567' },
    }))
    const pushes = parsePushes(events)
    expect(pushes).toHaveLength(6)
    expect(pushes[0].id).toBe('7')
    expect(pushes.at(-1)?.id).toBe('2')
  })
})

import { describe, expect, it, vi } from 'vitest'
import activityWorker, {
  isCacheFresh,
  isRefreshThrottled,
  parseAtomPushes,
  parseContributions,
  parsePushes,
  refreshRetryAfterSeconds,
  resolveActivityUpdatedAt,
} from './worker'

describe('GitHub activity normalization', () => {
  it('extracts valid dated contribution cells and the profile summary', () => {
    const html = [
      '<h2 id="js-contribution-activity-description">12 contributions in the last year</h2>',
      '<td class="ContributionCalendar-day" data-date="2026-11-02" data-level="4"></td>',
      '<td class="ContributionCalendar-day" data-date="2026-11-01" data-level="0"></td>',
      '<td class="ContributionCalendar-day" data-date="2026-02-30" data-level="2"></td>',
      '<td class="ContributionCalendar-day" data-date="invalid" data-level="2"></td>',
      '<td class="ContributionCalendar-day" data-date="2026-11-03"></td>',
      '<td class="not-a-calendar-day" data-date="2026-11-04" data-level="1"></td>',
    ].join('')
    expect(parseContributions(html)).toEqual({
      summary: '12 contributions in the last year',
      contributions: [
        { date: '2026-11-01', level: 0 },
        { date: '2026-11-02', level: 4 },
      ],
    })
  })

  it('extracts calendar days from non-table HTML elements as well as table cells', () => {
    const html = [
      '<rect class="ContributionCalendar-day" data-date="2026-11-05" data-level="2"></rect>',
      '<tool-tip class="ContributionCalendar-day" data-date="2026-11-06" data-level="4"></tool-tip>',
      '<span class="not-a-calendar-day" data-date="2026-11-07" data-level="3"></span>',
    ].join('')
    expect(parseContributions(html).contributions).toEqual([
      { date: '2026-11-05', level: 2 },
      { date: '2026-11-06', level: 4 },
    ])
  })

  it('deduplicates repeated dates and rejects levels outside GitHub calendar bounds', () => {
    const html = [
      '<td class="ContributionCalendar-day" data-date="2026-11-01" data-level="1"></td>',
      '<td class="ContributionCalendar-day" data-date="2026-11-01" data-level="3"></td>',
      '<td class="ContributionCalendar-day" data-date="2026-11-02" data-level="9"></td>',
    ].join('')
    expect(parseContributions(html).contributions).toEqual([{ date: '2026-11-01', level: 3 }])
  })

  it('keeps only safe public PushEvents and constructs validated commit links', () => {
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
      null,
      { type: 'PushEvent', created_at: '2026-11-06T13:00:00Z', repo: { name: 'owner/project' }, payload: { commits: [{ message: 4 }] } },
    ])
    expect(pushes).toHaveLength(1)
    expect(pushes[0]).toMatchObject({
      repo: 'owner/project',
      branch: 'main',
      message: 'A commit',
      url: 'https://github.com/owner/project/commit/0123456789abcdef0123456789abcdef01234567',
    })
  })

  it('returns newest valid push events first and limits the activity feed to six entries', () => {
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

  it('parses only public push entries from the GitHub user Atom timeline', () => {
    const feed = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <id>tag:github.com,2008:/shreyashjagtap157</id>
  <entry>
    <id>tag:github.com,2008:push/26621893235</id>
    <published>2026-11-09T05:24:27Z</published>
    <content type="html"><![CDATA[
      <div class="repo-push">
        <a class="branch-name" href="/owner/project/tree/feature/atom-feed">feature/atom-feed</a>
        <a href="/owner/project/commit/0123456789abcdef0123456789abcdef01234567">0123456</a>
        <blockquote>Improve public activity feed<br>More details</blockquote>
      </div>
    ]]></content>
  </entry>
  <entry>
    <id>tag:github.com,2008:pr_merged/19527366640</id>
    <published>2026-11-09T06:00:00Z</published>
    <content type="html">&lt;blockquote&gt;Merged a pull request&lt;/blockquote&gt;</content>
  </entry>
</feed>`
    expect(parseAtomPushes(feed)).toEqual([{
      id: '26621893235',
      repo: 'owner/project',
      createdAt: '2026-11-09T05:24:27Z',
      branch: 'feature/atom-feed',
      message: 'Improve public activity feed',
      url: 'https://github.com/owner/project/commit/0123456789abcdef0123456789abcdef01234567',
    }])
    expect(parseAtomPushes('<html>not an Atom feed</html>')).toEqual([])
  })

  it('skips leading blank lines and uses the first real Atom commit summary', () => {
    const feed = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <entry>
    <id>tag:github.com,2008:push/26621893235</id>
    <published>2026-11-09T05:24:27Z</published>
    <content type="html"><![CDATA[
      <a class="branch-name" href="/owner/project/tree/main">main</a>
      <blockquote>
        Fix production activity extraction
        <br>
        Additional commit details
      </blockquote>
    ]]></content>
  </entry>
</feed>`
    expect(parseAtomPushes(feed)[0]?.message).toBe('Fix production activity extraction')
  })

  it('returns an empty list for an invalid upstream event payload', () => {
    expect(parsePushes(null)).toEqual([])
    expect(parsePushes({ events: [] })).toEqual([])
    expect(parsePushes([undefined, 3, 'not-an-event'])).toEqual([])
  })
})


describe('GitHub activity cache policy', () => {
  const now = Date.parse('2026-11-06T12:00:00Z')

  it('serves fresh cache entries for five minutes', () => {
    expect(isCacheFresh('2026-11-06T11:56:00Z', now)).toBe(true)
    expect(isCacheFresh('2026-11-06T11:54:59Z', now)).toBe(false)
  })

  it('rejects malformed, future-dated, and stale cache timestamps', () => {
    expect(isCacheFresh('not-a-date', now)).toBe(false)
    expect(isCacheFresh('2026-11-06T12:01:00Z', now)).toBe(false)
    expect(isCacheFresh('2026-11-06T11:00:00Z', now)).toBe(false)
  })

  it('limits manual upstream refreshes to one per minute', () => {
    expect(isRefreshThrottled('2026-11-06T11:59:30Z', now)).toBe(true)
    expect(isRefreshThrottled('2026-11-06T11:58:59Z', now)).toBe(false)
    expect(isRefreshThrottled('not-a-date', now)).toBe(false)
  })

  it('calculates a bounded Retry-After value from the last refresh attempt', () => {
    expect(refreshRetryAfterSeconds('2026-11-06T11:59:30Z', now)).toBe(30)
    expect(refreshRetryAfterSeconds('2026-11-06T11:59:00.500Z', now)).toBe(1)
    expect(refreshRetryAfterSeconds('2026-11-06T11:59:00Z', now)).toBe(0)
    expect(refreshRetryAfterSeconds('2026-11-06T12:01:00Z', now)).toBe(0)
    expect(refreshRetryAfterSeconds('not-a-date', now)).toBe(0)
  })

  it('uses the stored attempt time when stale data is older than the cooldown', async () => {
    const oldPayload = {
      contributions: [{ date: '2026-11-01', level: 2 }],
      summary: 'Previously loaded contributions',
      pushes: [],
      updatedAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      partial: false,
      stale: false,
    }
    const values = new Map<string, string>([
      ['github-activity:v1:last-successful', JSON.stringify(oldPayload)],
      ['github-activity:v1:last-refresh-attempt', new Date(Date.now() - 30 * 1000).toISOString()],
    ])
    const kv = {
      async get(key: string) { return values.get(key) ?? null },
      async put() { throw new Error('A throttled refresh must not write another attempt') },
    }
    const originalFetch = globalThis.fetch
    let upstreamRequests = 0
    globalThis.fetch = (async () => {
      upstreamRequests += 1
      return new Response('', { status: 503 })
    }) as typeof fetch
    try {
      const response = await activityWorker.fetch(
        new Request('https://portfolio.test/api/github/activity?refresh=1'),
        { ASSETS: { fetch: async () => new Response('asset') }, ACTIVITY_KV: kv },
      )
      const body = await response.json() as typeof oldPayload
      expect(response.status).toBe(200)
      expect(body.updatedAt).toBe(oldPayload.updatedAt)
      expect(body.partial).toBe(true)
      expect(body.stale).toBe(true)
      expect(upstreamRequests).toBe(0)
    } finally {
      globalThis.fetch = originalFetch
    }
  })

  it('returns Retry-After when throttled and no last-good payload exists', async () => {
    const values = new Map<string, string>([
      ['github-activity:v1:last-refresh-attempt', new Date(Date.now() - 30 * 1000).toISOString()],
    ])
    const kv = {
      async get(key: string) { return values.get(key) ?? null },
      async put() { throw new Error('A throttled refresh must not write another attempt') },
    }
    const originalFetch = globalThis.fetch
    let upstreamRequests = 0
    globalThis.fetch = (async () => {
      upstreamRequests += 1
      return new Response('', { status: 503 })
    }) as typeof fetch
    try {
      const response = await activityWorker.fetch(
        new Request('https://portfolio.test/api/github/activity?refresh=1'),
        { ASSETS: { fetch: async () => new Response('asset') }, ACTIVITY_KV: kv },
      )
      expect(response.status).toBe(429)
      expect(response.headers.get('Retry-After')).toBe('30')
      expect(upstreamRequests).toBe(0)
    } finally {
      globalThis.fetch = originalFetch
    }
  })

  it('preserves the last successful timestamp when stale cached data is reused', () => {
    expect(resolveActivityUpdatedAt(
      '2026-11-07T12:00:00.000Z',
      '2026-11-06T08:30:00.000Z',
      true,
    )).toBe('2026-11-06T08:30:00.000Z')
  })

  it('uses the current request timestamp when no stale fallback was used', () => {
    expect(resolveActivityUpdatedAt(
      '2026-11-07T12:00:00.000Z',
      '2026-11-06T08:30:00.000Z',
      false,
    )).toBe('2026-11-07T12:00:00.000Z')
    expect(resolveActivityUpdatedAt(
      '2026-11-07T12:00:00.000Z',
      null,
      true,
    )).toBe('2026-11-07T12:00:00.000Z')
  })
})


describe('GitHub activity KV persistence', () => {
  const assetEnv = { fetch: async () => new Response('asset') }

  it('serves a fresh KV snapshot without contacting GitHub', async () => {
    const payload = {
      contributions: [{ date: '2026-11-07', level: 3 }],
      summary: 'Fresh contribution snapshot',
      pushes: [],
      updatedAt: new Date().toISOString(),
      partial: false,
      stale: false,
    }
    const values = new Map<string, string>([
      ['github-activity:v1:last-successful', JSON.stringify(payload)],
    ])
    const kv = {
      async get(key: string) { return values.get(key) ?? null },
      async put() { throw new Error('Fresh cache reads must not write') },
    }
    const originalFetch = globalThis.fetch
    let upstreamRequests = 0
    globalThis.fetch = (async () => {
      upstreamRequests += 1
      return new Response('', { status: 503 })
    }) as typeof fetch

    try {
      const response = await activityWorker.fetch(
        new Request('https://portfolio.test/api/github/activity'),
        { ASSETS: assetEnv, ACTIVITY_KV: kv },
      )
      expect(response.status).toBe(200)
      expect(await response.json()).toEqual(payload)
      expect(upstreamRequests).toBe(0)
    } finally {
      globalThis.fetch = originalFetch
    }
  })

  it('logs sanitized GitHub public-events HTTP failures and rate-limit metadata', async () => {
    const originalFetch = globalThis.fetch
    const warning = vi.spyOn(console, 'warn').mockImplementation(() => {})
    globalThis.fetch = (async (input: RequestInfo | URL) => {
      const target = String(input)
      if (target.includes('/contributions')) {
        return new Response(
          '<h2 id="js-contribution-activity-description">3 contributions in the last year</h2>' +
          '<td class="ContributionCalendar-day" data-date="2026-11-09" data-level="2"></td>',
          { status: 200, headers: { 'Content-Type': 'text/html' } },
        )
      }
      return new Response('private upstream response detail', {
        status: 403,
        headers: {
          'Retry-After': '60',
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': '1794207000',
        },
      })
    }) as typeof fetch

    try {
      const response = await activityWorker.fetch(
        new Request('https://portfolio.test/api/github/activity'),
        { ASSETS: assetEnv },
      )
      const body = await response.json() as { partial: boolean; stale: boolean; pushes: unknown[] }
      expect(response.status).toBe(200)
      expect(body.partial).toBe(true)
      expect(body.stale).toBe(false)
      expect(body.pushes).toEqual([])
      expect(warning).toHaveBeenCalledWith(
        '[portfolio-activity] GitHub upstream failure',
        expect.objectContaining({
          source: 'public-events',
          stage: 'response',
          status: 403,
          retryAfter: '60',
          rateLimitRemaining: '0',
          rateLimitReset: '1794207000',
        }),
      )
      expect(JSON.stringify(warning.mock.calls)).not.toContain('private upstream response detail')
    } finally {
      globalThis.fetch = originalFetch
      warning.mockRestore()
    }
  })

  it('logs invalid public Atom content without exposing the response body', async () => {
    const originalFetch = globalThis.fetch
    const warning = vi.spyOn(console, 'warn').mockImplementation(() => {})
    globalThis.fetch = (async (input: RequestInfo | URL) => {
      const target = String(input)
      if (target.includes('/contributions')) {
        return new Response(
          '<h2 id="js-contribution-activity-description">3 contributions in the last year</h2>' +
          '<td class="ContributionCalendar-day" data-date="2026-11-09" data-level="2"></td>',
          { status: 200, headers: { 'Content-Type': 'text/html' } },
        )
      }
      return new Response('not-an-Atom-feed private body', {
        status: 200,
        headers: { 'Content-Type': 'application/atom+xml' },
      })
    }) as typeof fetch

    try {
      const response = await activityWorker.fetch(
        new Request('https://portfolio.test/api/github/activity'),
        { ASSETS: assetEnv },
      )
      const body = await response.json() as { partial: boolean; pushes: unknown[] }
      expect(response.status).toBe(200)
      expect(body.partial).toBe(true)
      expect(body.pushes).toEqual([])
      expect(warning).toHaveBeenCalledWith(
        '[portfolio-activity] GitHub upstream failure',
        expect.objectContaining({
          source: 'public-events',
          stage: 'content',
          errorMessage: 'Expected a GitHub Atom feed response',
        }),
      )
      expect(JSON.stringify(warning.mock.calls)).not.toContain('not-an-Atom-feed private body')
    } finally {
      globalThis.fetch = originalFetch
      warning.mockRestore()
    }
  })

  it('logs rejected public-events fetches and identifies the failure stage', async () => {
    const originalFetch = globalThis.fetch
    const warning = vi.spyOn(console, 'warn').mockImplementation(() => {})
    globalThis.fetch = (async (input: RequestInfo | URL) => {
      const target = String(input)
      if (target.includes('/contributions')) {
        return new Response(
          '<h2 id="js-contribution-activity-description">3 contributions in the last year</h2>' +
          '<td class="ContributionCalendar-day" data-date="2026-11-09" data-level="2"></td>',
          { status: 200, headers: { 'Content-Type': 'text/html' } },
        )
      }
      throw new TypeError('upstream connection failed')
    }) as typeof fetch

    try {
      const response = await activityWorker.fetch(
        new Request('https://portfolio.test/api/github/activity'),
        { ASSETS: assetEnv },
      )
      const body = await response.json() as { partial: boolean; pushes: unknown[] }
      expect(response.status).toBe(200)
      expect(body.partial).toBe(true)
      expect(warning).toHaveBeenCalledWith(
        '[portfolio-activity] GitHub upstream failure',
        expect.objectContaining({
          source: 'public-events',
          stage: 'request',
          errorName: 'TypeError',
          errorMessage: 'upstream connection failed',
        }),
      )
    } finally {
      globalThis.fetch = originalFetch
      warning.mockRestore()
    }
  })

  it('uses the public user Atom feed for recent pushes and stores a complete snapshot', async () => {
    const atomFeed = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <entry>
    <id>tag:github.com,2008:push/26621893235</id>
    <published>2026-11-09T05:24:27Z</published>
    <content type="html"><![CDATA[
      <a class="branch-name" href="/owner/project/tree/main">main</a>
      <a href="/owner/project/commit/0123456789abcdef0123456789abcdef01234567">0123456</a>
      <blockquote>Atom-backed public push</blockquote>
    ]]></content>
  </entry>
</feed>`
    const values = new Map<string, string>()
    const requests: string[] = []
    const kv = {
      async get(key: string) { return values.get(key) ?? null },
      async put(key: string, value: string) { values.set(key, value) },
    }
    const originalFetch = globalThis.fetch
    globalThis.fetch = (async (input: RequestInfo | URL) => {
      const target = String(input)
      requests.push(target)
      if (target.includes('/contributions')) {
        return new Response(
          '<h2 id="js-contribution-activity-description">3 contributions in the last year</h2>' +
          '<td class="ContributionCalendar-day" data-date="2026-11-09" data-level="2"></td>',
          { status: 200, headers: { 'Content-Type': 'text/html' } },
        )
      }
      if (target === 'https://github.com/shreyashjagtap157.atom') {
        return new Response(atomFeed, { status: 200, headers: { 'Content-Type': 'application/atom+xml' } })
      }
      throw new Error('Unexpected upstream request: ' + target)
    }) as typeof fetch

    try {
      const response = await activityWorker.fetch(
        new Request('https://portfolio.test/api/github/activity'),
        { ASSETS: assetEnv, ACTIVITY_KV: kv },
      )
      const body = await response.json() as {
        partial: boolean
        pushes: { repo: string; branch: string; message: string; url: string | null }[]
      }
      expect(response.status).toBe(200)
      expect(body.partial).toBe(false)
      expect(body.pushes).toEqual([{
        id: '26621893235',
        repo: 'owner/project',
        createdAt: '2026-11-09T05:24:27Z',
        branch: 'main',
        message: 'Atom-backed public push',
        url: 'https://github.com/owner/project/commit/0123456789abcdef0123456789abcdef01234567',
      }])
      expect(requests).toContain('https://github.com/shreyashjagtap157.atom')
      expect(requests.some(request => request.includes('/events/public'))).toBe(false)
      expect(values.has('github-activity:v1:last-successful')).toBe(true)
    } finally {
      globalThis.fetch = originalFetch
    }
  })

  it('persists a fully refreshed payload with the configured retention', async () => {
    const values = new Map<string, string>()
    const writes: { key: string; value: string; expirationTtl?: number }[] = []
    const kv = {
      async get(key: string) { return values.get(key) ?? null },
      async put(key: string, value: string, options?: { expirationTtl?: number }) {
        values.set(key, value)
        writes.push({ key, value, expirationTtl: options?.expirationTtl })
      },
    }
    const originalFetch = globalThis.fetch
    globalThis.fetch = (async (input: RequestInfo | URL) => {
      const target = String(input)
      if (target.includes('/contributions')) {
        return new Response(
          '<h2 id="js-contribution-activity-description">3 contributions in the last year</h2>' +
          '<td class="ContributionCalendar-day" data-date="2026-11-07" data-level="2"></td>',
          { status: 200, headers: { 'Content-Type': 'text/html' } },
        )
      }
      return new Response(
        '<feed xmlns="http://www.w3.org/2005/Atom"><id>tag:github.com,2008:/shreyashjagtap157</id></feed>',
        { status: 200, headers: { 'Content-Type': 'application/atom+xml' } },
      )
    }) as typeof fetch

    try {
      const response = await activityWorker.fetch(
        new Request('https://portfolio.test/api/github/activity'),
        { ASSETS: assetEnv, ACTIVITY_KV: kv },
      )
      const body = await response.json() as {
        contributions: { date: string; level: number }[]
        partial: boolean
        stale: boolean
      }
      expect(response.status).toBe(200)
      expect(body.contributions).toEqual([{ date: '2026-11-07', level: 2 }])
      expect(body.partial).toBe(false)
      expect(body.stale).toBe(false)
      expect(writes).toHaveLength(1)
      expect(writes[0].key).toBe('github-activity:v1:last-successful')
      expect(writes[0].expirationTtl).toBe(6 * 60 * 60)
      expect(JSON.parse(writes[0].value).summary).toBe('3 contributions in the last year')
    } finally {
      globalThis.fetch = originalFetch
    }
  })

  it('preserves the previous KV snapshot when upstream refreshes fail', async () => {
    const previous = {
      contributions: [{ date: '2026-11-01', level: 2 }],
      summary: 'Last successful snapshot',
      pushes: [],
      updatedAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      partial: false,
      stale: false,
    }
    const values = new Map<string, string>([
      ['github-activity:v1:last-successful', JSON.stringify(previous)],
    ])
    const kv = {
      async get(key: string) { return values.get(key) ?? null },
      async put() { throw new Error('Partial or failed responses must not replace last-good data') },
    }
    const originalFetch = globalThis.fetch
    globalThis.fetch = (async () => new Response('', { status: 503 })) as typeof fetch

    try {
      const response = await activityWorker.fetch(
        new Request('https://portfolio.test/api/github/activity'),
        { ASSETS: assetEnv, ACTIVITY_KV: kv },
      )
      const body = await response.json() as typeof previous
      expect(response.status).toBe(200)
      expect(body.updatedAt).toBe(previous.updatedAt)
      expect(body.contributions).toEqual(previous.contributions)
      expect(body.partial).toBe(true)
      expect(body.stale).toBe(true)
      expect(values.get('github-activity:v1:last-successful')).toBe(JSON.stringify(previous))
    } finally {
      globalThis.fetch = originalFetch
    }
  })
})

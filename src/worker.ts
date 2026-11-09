interface AssetFetcher { fetch(request: Request): Promise<Response> }
interface ActivityKV {
  get(key: string, options?: { type: 'text'; cacheTtl?: number }): Promise<string | null>
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>
}
interface Env {
  ASSETS: AssetFetcher
  ACTIVITY_KV?: ActivityKV
}

type Contribution = { date: string; level: number }
type PushRecord = {
  id: string
  repo: string
  createdAt: string
  branch: string
  message: string
  url: string | null
}
type ActivityPayload = {
  contributions: Contribution[]
  summary: string
  pushes: PushRecord[]
  updatedAt: string
  partial: boolean
  stale: boolean
}

const USERNAME = 'shreyashjagtap157'
const FRESH_CACHE_MS = 5 * 60 * 1000
const REFRESH_COOLDOWN_MS = 60 * 1000
const CACHE_RETENTION_SECONDS = 6 * 60 * 60
const REFRESH_STATE_RETENTION_SECONDS = 60
const KV_READ_CACHE_SECONDS = 30
const ACTIVITY_PAYLOAD_KEY = 'github-activity:v1:last-successful'
const REFRESH_ATTEMPT_KEY = 'github-activity:v1:last-refresh-attempt'
const UPSTREAM_TIMEOUT_MS = 8 * 1000

function plainText(value: string): string {
  return value.replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

function attribute(tag: string, name: string): string | null {
  return tag.match(new RegExp('\\b' + name + '\\s*=\\s*"([^"]*)"', 'i'))?.[1] ?? null
}

function isCalendarDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const parsed = new Date(value + 'T00:00:00.000Z')
  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value
}

export function parseContributions(source: string) {
  const tags = source.match(/<[^>]+>/gi) ?? []
  const days = new Map<string, number>()

  for (const tag of tags) {
    const classes = (attribute(tag, 'class') ?? '').split(/\s+/)
    if (!classes.includes('ContributionCalendar-day')) continue

    const date = attribute(tag, 'data-date')
    const rawLevel = attribute(tag, 'data-level')
    const level = rawLevel === null ? Number.NaN : Number(rawLevel)

    if (date && isCalendarDate(date) &&
      Number.isInteger(level) && level >= 0 && level <= 4) {
      days.set(date, level)
    }
  }

  const heading = source.match(
    /<h2\b[^>]*id="js-contribution-activity-description"[^>]*>([\s\S]*?)<\/h2>/i,
  )
  return {
    contributions: [...days.entries()]
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([date, level]) => ({ date, level })),
    summary: heading ? plainText(heading[1]) : '',
  }
}

export function parsePushes(payload: unknown): PushRecord[] {
  if (!Array.isArray(payload)) return []
  const pushes: PushRecord[] = []

  for (const item of payload as unknown[]) {
    if (!item || typeof item !== 'object') continue
    const event = item as Record<string, unknown>
    if (event.type !== 'PushEvent') continue

    const id = typeof event.id === 'string' ? event.id : ''
    const createdAt = typeof event.created_at === 'string' ? event.created_at : ''
    const repoValue = event.repo && typeof event.repo === 'object'
      ? (event.repo as Record<string, unknown>).name
      : undefined
    const repo = typeof repoValue === 'string' ? repoValue : ''

    if (!id || !Number.isFinite(Date.parse(createdAt)) ||
      !/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repo)) continue

    const eventPayload = event.payload && typeof event.payload === 'object'
      ? event.payload as Record<string, unknown>
      : {}
    const commits = Array.isArray(eventPayload.commits) ? eventPayload.commits : []
    const lastCommit = commits.at(-1)
    const commit = lastCommit && typeof lastCommit === 'object'
      ? lastCommit as Record<string, unknown>
      : {}
    const rawSha = typeof commit.sha === 'string'
      ? commit.sha
      : typeof eventPayload.head === 'string'
        ? eventPayload.head
        : ''
    const branchRef = typeof eventPayload.ref === 'string' ? eventPayload.ref : ''
    const branch = branchRef.replace(/^refs\/heads\//, '')
    const message = typeof commit.message === 'string' ? commit.message.split('\n')[0] : ''
    const validSha = /^[a-f0-9]{7,40}$/i.test(rawSha)

    pushes.push({
      id,
      repo,
      createdAt,
      branch,
      message,
      url: validSha ? 'https://github.com/' + repo + '/commit/' + rawSha : null,
    })
  }

  return pushes
    .sort((left, right) => Date.parse(right.createdAt) - Date.parse(left.createdAt))
    .slice(0, 6)
}

export function isCacheFresh(updatedAt: string, now = Date.now()): boolean {
  const timestamp = Date.parse(updatedAt)
  return Number.isFinite(timestamp) &&
    timestamp <= now &&
    now - timestamp < FRESH_CACHE_MS
}

export function isRefreshThrottled(updatedAt: string, now = Date.now()): boolean {
  const timestamp = Date.parse(updatedAt)
  return Number.isFinite(timestamp) &&
    timestamp <= now &&
    now - timestamp < REFRESH_COOLDOWN_MS
}

export function refreshRetryAfterSeconds(attemptedAt: string, now = Date.now()): number {
  const timestamp = Date.parse(attemptedAt)
  if (!Number.isFinite(timestamp) || timestamp > now) return 0
  const remaining = REFRESH_COOLDOWN_MS - (now - timestamp)
  return remaining > 0 ? Math.ceil(remaining / 1000) : 0
}

export function resolveActivityUpdatedAt(
  requestTime: string,
  cachedUpdatedAt: string | null,
  usedStaleData: boolean,
): string {
  return usedStaleData && cachedUpdatedAt ? cachedUpdatedAt : requestTime
}

function isActivityPayload(value: unknown): value is ActivityPayload {
  if (!value || typeof value !== 'object') return false
  const payload = value as Partial<ActivityPayload>
  return Array.isArray(payload.contributions) &&
    Array.isArray(payload.pushes) &&
    typeof payload.summary === 'string' &&
    typeof payload.updatedAt === 'string' &&
    Number.isFinite(Date.parse(payload.updatedAt))
}

function jsonResponse(payload: ActivityPayload, cacheControl = 'no-store'): Response {
  return Response.json(payload, { headers: { 'Cache-Control': cacheControl } })
}

type ActivityUpstream = 'contributions' | 'public-events'
type ActivityUpstreamFailureStage = 'request' | 'response' | 'parse' | 'content'

function logUpstreamFailure(
  source: ActivityUpstream,
  stage: ActivityUpstreamFailureStage,
  details: { response?: Response; error?: unknown } = {},
): void {
  const { response, error } = details
  console.warn('[portfolio-activity] GitHub upstream failure', {
    source,
    stage,
    status: response?.status ?? null,
    retryAfter: response?.headers.get('retry-after') ?? null,
    rateLimitRemaining: response?.headers.get('x-ratelimit-remaining') ?? null,
    rateLimitReset: response?.headers.get('x-ratelimit-reset') ?? null,
    errorName: error instanceof Error ? error.name : error === undefined ? null : 'UnknownError',
    errorMessage: error instanceof Error ? error.message.slice(0, 160) : null,
  })
}

async function githubActivity(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url)
  const forceRefresh = url.searchParams.get('refresh') === '1'
  const kv = env.ACTIVITY_KV
  let cachedPayload: ActivityPayload | null = null
  let lastRefreshAttemptAt: string | null = null

  // KV is the persistent store for the last successful public activity
  // snapshot. Reads use a short edge cache; remote locations can observe
  // recent writes up to 60 seconds later because KV is eventually consistent.
  if (kv) {
    try {
      const cachedText = await kv.get(ACTIVITY_PAYLOAD_KEY, {
        type: 'text',
        cacheTtl: KV_READ_CACHE_SECONDS,
      })
      if (cachedText) {
        const candidate: unknown = JSON.parse(cachedText)
        if (isActivityPayload(candidate)) cachedPayload = candidate
      }
    } catch {
      // A KV read failure must not prevent a live upstream request.
    }

    if (forceRefresh) {
      try {
        lastRefreshAttemptAt = await kv.get(REFRESH_ATTEMPT_KEY, {
          type: 'text',
          cacheTtl: KV_READ_CACHE_SECONDS,
        })
      } catch {
        // An unavailable cooldown marker must not block a refresh.
      }
    }
  }

  if (cachedPayload && !forceRefresh && isCacheFresh(cachedPayload.updatedAt)) {
    return jsonResponse(cachedPayload)
  }

  if (forceRefresh && lastRefreshAttemptAt) {
    const retryAfter = refreshRetryAfterSeconds(lastRefreshAttemptAt)
    if (retryAfter > 0) {
      if (cachedPayload) {
        const cacheStillFresh = isCacheFresh(cachedPayload.updatedAt)
        return jsonResponse(cacheStillFresh
          ? cachedPayload
          : { ...cachedPayload, partial: true, stale: true })
      }
      return Response.json({ error: 'Manual refresh is temporarily rate-limited.' }, {
        status: 429,
        headers: {
          'Cache-Control': 'no-store',
          'Retry-After': String(retryAfter),
        },
      })
    }
  }

  // Track refresh attempts independently of updatedAt. updatedAt must mean
  // "last successful data", even when an upstream request fails.
  if (forceRefresh && kv) {
    try {
      await kv.put(REFRESH_ATTEMPT_KEY, new Date().toISOString(), {
        expirationTtl: REFRESH_STATE_RETENTION_SECONDS,
      })
    } catch {
      // Cooldown persistence is best-effort; do not fail otherwise valid data.
    }
  }

  const signal = AbortSignal.timeout(UPSTREAM_TIMEOUT_MS)
  const agent = 'shreyash-portfolio'
  const [calendarResult, eventsResult] = await Promise.allSettled([
    fetch('https://github.com/users/' + USERNAME + '/contributions', {
      headers: { 'User-Agent': agent, Accept: 'text/html' },
      signal,
    }),
    fetch('https://api.github.com/users/' + USERNAME + '/events/public?per_page=100', {
      headers: { 'User-Agent': agent, Accept: 'application/vnd.github+json' },
      signal,
    }),
  ])

  let contributions: Contribution[] = []
  let summary = ''
  let pushes: PushRecord[] = []
  let calendarOk = false
  let eventsOk = false

  if (calendarResult.status === 'rejected') {
    logUpstreamFailure('contributions', 'request', { error: calendarResult.reason })
  } else if (!calendarResult.value.ok) {
    logUpstreamFailure('contributions', 'response', { response: calendarResult.value })
  } else {
    try {
      const parsed = parseContributions(await calendarResult.value.text())
      if (parsed.contributions.length > 0) {
        contributions = parsed.contributions
        summary = parsed.summary
        calendarOk = true
      } else {
        logUpstreamFailure('contributions', 'content', {
          error: new Error('No valid contribution days were parsed from the response'),
        })
      }
    } catch (error) {
      logUpstreamFailure('contributions', 'parse', { error })
      // Fall back to the last successful cached calendar, if one exists.
    }
  }

  if (eventsResult.status === 'rejected') {
    logUpstreamFailure('public-events', 'request', { error: eventsResult.reason })
  } else if (!eventsResult.value.ok) {
    logUpstreamFailure('public-events', 'response', { response: eventsResult.value })
  } else {
    try {
      pushes = parsePushes(await eventsResult.value.json())
      eventsOk = true
    } catch (error) {
      logUpstreamFailure('public-events', 'parse', { error })
      // Fall back to the last successful cached event list, if one exists.
    }
  }

  let usedStaleData = false
  if (!calendarOk && cachedPayload) {
    contributions = cachedPayload.contributions
    summary = cachedPayload.summary
    usedStaleData = true
  }
  if (!eventsOk && cachedPayload) {
    pushes = cachedPayload.pushes
    usedStaleData = true
  }

  const partial = !calendarOk || !eventsOk
  if (partial && contributions.length === 0 && pushes.length === 0) {
    return Response.json({ error: 'GitHub activity is temporarily unavailable.' }, {
      status: 502,
      headers: { 'Cache-Control': 'no-store' },
    })
  }

  const payload: ActivityPayload = {
    contributions,
    summary,
    pushes,
    updatedAt: resolveActivityUpdatedAt(new Date().toISOString(), cachedPayload?.updatedAt ?? null, usedStaleData),
    partial,
    stale: usedStaleData,
  }

  // Store only fully refreshed results. Partial responses never overwrite the
  // last known-good snapshot.
  if (kv && !partial) {
    try {
      await kv.put(ACTIVITY_PAYLOAD_KEY, JSON.stringify(payload), {
        expirationTtl: CACHE_RETENTION_SECONDS,
      })
    } catch {
      // A valid live response remains usable if persistence is unavailable.
    }
  }

  return jsonResponse(payload)
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    if (url.pathname === '/api/github/activity') {
      if (request.method !== 'GET') {
        return new Response('Method Not Allowed', {
          status: 405,
          headers: { Allow: 'GET', 'Cache-Control': 'no-store' },
        })
      }
      return githubActivity(request, env)
    }

    return env.ASSETS.fetch(request)
  },
}

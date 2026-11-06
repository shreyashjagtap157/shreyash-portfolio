interface AssetFetcher { fetch(request: Request): Promise<Response> }
interface Env { ASSETS: AssetFetcher }
interface EdgeCache { match(request: Request): Promise<Response | undefined>; put(request: Request, response: Response): Promise<void> }
interface RuntimeCaches { default: EdgeCache }
type PushEvent = { id: string; type: string; created_at: string; repo?: { name?: string }; payload?: { ref?: string; head?: string; commits?: Array<{ sha: string; message: string }> } }
const USERNAME = 'shreyashjagtap157'
const CACHE_CONTROL = 'public, max-age=0, s-maxage=300, stale-while-revalidate=900'

function plainText(value: string): string {
  return value.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'").replace(/&#x27;/gi, "'").replace(/\s+/g, ' ').trim()
}
function attribute(tag: string, name: string): string | null {
  return tag.match(new RegExp('\\b' + name + '="([^"]*)"', 'i'))?.[1] ?? null
}
export function parseContributions(source: string) {
  const tags = source.match(/<td\b[^>]*>/gi) ?? []
  const days = new Map<string, number>()
  for (const tag of tags) {
    if (!(attribute(tag, 'class') ?? '').includes('ContributionCalendar-day')) continue
    const date = attribute(tag, 'data-date')
    const rawLevel = attribute(tag, 'data-level')
    const level = rawLevel === null ? Number.NaN : Number(rawLevel)
    if (date && /^\d{4}-\d{2}-\d{2}$/.test(date) && Number.isInteger(level) && level >= 0 && level <= 4) {
      days.set(date, level)
    }
  }
  const heading = source.match(/<h2\b[^>]*id="js-contribution-activity-description"[^>]*>([\s\S]*?)<\/h2>/i)
  return {
    contributions: [...days.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([date, level]) => ({ date, level })),
    summary: heading ? plainText(heading[1]) : '',
  }
}
export function parsePushes(payload: unknown) {
  if (!Array.isArray(payload)) return []
  return (payload as PushEvent[])
    .filter(event => event?.type === 'PushEvent' && typeof event.id === 'string' &&
      typeof event.created_at === 'string' && Number.isFinite(Date.parse(event.created_at)) &&
      /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(event.repo?.name ?? ''))
    .sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at))
    .slice(0, 6)
    .map(event => {
      const repo = event.repo!.name!
      const commit = event.payload?.commits?.at(-1)
      const sha = commit?.sha ?? event.payload?.head ?? ''
      const branch = event.payload?.ref?.replace(/^refs\/heads\//, '') ?? ''
      const validSha = /^[a-f0-9]{7,40}$/i.test(sha)
      return {
        id: event.id, repo, createdAt: event.created_at, branch,
        message: commit?.message?.split('\n')[0] ?? '',
        url: validSha ? 'https://github.com/' + repo + '/commit/' + sha : null,
      }
    })
}
async function githubActivity(request: Request): Promise<Response> {
  const url = new URL(request.url)
  const forceRefresh = url.searchParams.get('refresh') === '1'
  const cacheKey = new Request(url.origin + '/api/github/activity', { method: 'GET' })
  const edgeCache = (globalThis as unknown as { caches?: RuntimeCaches }).caches?.default
  if (edgeCache && !forceRefresh) {
    try {
      const cached = await edgeCache.match(cacheKey)
      if (cached) return cached
    } catch { /* cache failures must not affect availability */ }
  }
  const agent = 'shreyash-portfolio'
  const [calendarResult, eventsResult] = await Promise.allSettled([
    fetch('https://github.com/users/' + USERNAME + '/contributions', {
      headers: { 'User-Agent': agent, Accept: 'text/html' },
    }),
    fetch('https://api.github.com/users/' + USERNAME + '/events/public?per_page=100', {
      headers: { 'User-Agent': agent, Accept: 'application/vnd.github+json' },
    }),
  ])
  let contributions: Array<{ date: string; level: number }> = []
  let summary = ''
  let pushes: ReturnType<typeof parsePushes> = []
  let hasError = false
  if (calendarResult.status === 'fulfilled' && calendarResult.value.ok) {
    try {
      const parsed = parseContributions(await calendarResult.value.text())
      contributions = parsed.contributions
      summary = parsed.summary
      if (!contributions.length) hasError = true
    } catch { hasError = true }
  } else hasError = true
  if (eventsResult.status === 'fulfilled' && eventsResult.value.ok) {
    try { pushes = parsePushes(await eventsResult.value.json()) } catch { hasError = true }
  } else hasError = true
  if (!contributions.length && !pushes.length && hasError) {
    return Response.json({ error: 'GitHub activity is temporarily unavailable.' }, {
      status: 502, headers: { 'Cache-Control': 'no-store' },
    })
  }
  const response = Response.json({ contributions, summary, pushes, updatedAt: new Date().toISOString(), partial: hasError }, {
    headers: { 'Cache-Control': CACHE_CONTROL },
  })
  if (edgeCache) {
    try { await edgeCache.put(cacheKey, response.clone()) } catch { /* caching is optional */ }
  }
  return response
}
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    if (url.pathname === '/api/github/activity') {
      if (request.method !== 'GET') return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'GET' } })
      return githubActivity(request)
    }
    return env.ASSETS.fetch(request)
  },
}

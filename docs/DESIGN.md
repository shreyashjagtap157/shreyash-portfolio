# Portfolio design and engineering rules

## Product intent

Present Shreyash Satish Jagtap as an engineer focused on backend systems, programming-language design, systems engineering, symbolic computing, and AI-agent platforms. The interface should be technically literate, restrained, responsive, and honest about project maturity.

## Information architecture

1. Name and city-level location.
2. Sticky section navigation with horizontal scrolling and a visible scrollbar on narrow screens.
3. Theme, language, and density controls.
4. Hero with a concise engineering summary.
5. Selected work with status, tags, hash-routed detail pages, and repository links.
6. Omni case study, technical focus, and engineering approach.
7. GitHub contribution calendar and latest public pushes.
8. Experience, education, contact, and résumé.

The selected-work inventory must contain no duplicate project IDs or repository slugs. The filter buttons, project routes, theme/language/density controls, refresh action, and navigation links must all perform real actions.

## Themes and density

- Void: dark terminal/grid, JetBrains Mono, cyan accent.
- Orbital: dark celestial layout, Sora, violet/cyan accents.
- Blueprint: light drafting surface, IBM Plex Sans/Mono, navy/red accents.
- Aurora: dark layered surfaces, Manrope, teal/violet accents.

Density modes: compact, comfortable, spacious. Theme and density state are independent and persisted locally.

## Interaction and accessibility

- Semantic project articles with separate anchors and no nested interactive controls.
- Category filters update the visible project list and counts.
- Project detail uses real hash navigation so a project can be linked and browser Back/Forward works.
- Dropdowns support arrows, Home, End, Enter, Escape, click-outside, searchable filtering, safe empty states, and focus restoration.
- Horizontal navigation remains keyboard focusable, scrollable, and visibly styled.
- RTL direction is enabled for Arabic, Hebrew, Persian, and Urdu.
- Visible focus, skip link, sufficient touch targets, sensible focus order, and reduced-motion support.
- Theme transitions degrade gracefully where View Transitions are unsupported.
- No inline event handlers or dynamic HTML injection.

## Localization

English, Hindi, Marathi, German, and French are manually maintained. Every user-facing string must exist in all five locale JSON files, except personal/project names and technology labels. The locale key sets are verified by Vitest. Browser translation is optional and must degrade gracefully.

## GitHub activity architecture

The UI requests same-origin `/api/github/activity`. The Cloudflare Worker fetches GitHub's public profile contribution fragment and unauthenticated public PushEvents, extracts dated contribution levels and recent commit messages, validates/sanitizes the data, and returns normalized JSON. The public activity feed excludes private repositories.

- Store the last fully refreshed result in Cloudflare KV for up to six hours; partial or failed refreshes must never overwrite it.
- Consider activity fresh for five minutes.
- Use the last successful payload as a visibly marked stale fallback when an upstream source fails.
- Use an eight-second timeout for GitHub requests.
- Throttle manual upstream refresh to one request per minute.
- Handle partial, empty, malformed, rate-limited, and unavailable upstream responses without fabricated data.
- No client-side GitHub token or external contribution-image/chart service.

## Security and privacy

- Use a separate one-minute KV refresh-attempt marker so stale data cannot bypass manual-refresh throttling. KV is eventually consistent, so the cooldown is best-effort rather than a globally atomic lock.
- Browser JavaScript connects only to the portfolio's same origin. GitHub API and HTML requests originate from the Worker.
- Keep user preferences in browser storage only.
- Display Pune, Maharashtra, India; never a street address.
- Fonts are bundled locally.
- CSP, Referrer-Policy, X-Content-Type-Options, and Permissions-Policy are configured in `public/_headers`.
- Keep CSP restrictive; avoid inline scripts/styles, dynamic HTML injection, and unnecessary external runtime dependencies.

## Verification

CI must run typecheck, unit tests, production build, and Playwright browser tests. Cover the complete 4 themes × 3 densities × 4 viewport matrix, dropdown keyboard behavior, language switching, RTL, navigation scrolling, project filtering/routing, GitHub activity success/partial/stale/failure/refresh states, duplicate IDs, and nested interactive elements.

A Lighthouse report is evidence only for the exact deployed build, URL, device profile, and timestamp used to generate it. Do not preserve stale scores as current claims.

## Hosting

Production hosting is Cloudflare Workers Static Assets using the existing free `workers.dev` hostname. Custom domains are optional. Do not deploy this portfolio to another hosting provider.

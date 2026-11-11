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

The UI requests same-origin `/api/github/activity`. The Cloudflare Worker fetches GitHub's publicly rendered profile contribution fragment and the public user Atom timeline (`https://github.com/<username>.atom`), extracts dated contribution levels and the calendar summary, filters Atom entries to push events only, validates/sanitizes the data, and returns normalized JSON. Important privacy distinction: if the profile owner's **Private contributions** setting is enabled, GitHub's public calendar includes anonymized daily counts from private/internal repositories. The Worker stores only the calendar's dates, intensity levels, and summary; it does not fetch private repository names or private event details. The recent-push feed retains only push entries from GitHub's public user timeline; other timeline activity types are ignored. Do not describe the combined feed as strictly public-repository-only unless the profile setting is disabled. See [GitHub's profile contributions reference](https://docs.github.com/en/account-and-profile/reference/profile-contributions-reference).

- Store the last fully refreshed result in Cloudflare KV for up to six hours; partial or failed refreshes must never overwrite it.
- Consider activity fresh for five minutes.
- Use the last successful payload as a visibly marked stale fallback when an upstream source fails.
- Use an eight-second timeout for GitHub requests.
- Throttle all automatic and manual upstream refresh attempts to one request per minute per Worker KV view; do not repeatedly retry GitHub on every visitor request while the cache is stale.
- Handle partial, empty, malformed, rate-limited, and unavailable upstream responses without fabricated data.
- No client-side GitHub token or external contribution-image/chart service.

## Security and privacy

- Use a shared one-minute KV refresh-attempt marker for both automatic and manual refreshes. Read and write this marker for every upstream attempt, including failed attempts, while keeping `updatedAt` tied only to successful data. KV is eventually consistent, so the cooldown is best-effort rather than a globally atomic lock. If KV is unavailable, the Worker degrades to upstream fetching without a persistent cross-request cooldown.
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


## Audience-adaptive reading experience (approved direction — 2026-11-11)

The portfolio has a **balanced default audience**: hiring managers/recruiters, engineers, and research-oriented readers should all be able to understand the same body of work through a reading style they choose. Do not create separate websites or contradictory copies.

Introduce a persistent, user-controlled reading lens with four choices:

- **Balanced (default):** concise orientation followed by accessible technical and research depth. Nothing important is hidden.
- **Overview:** prioritize role, contribution, problem solved, project maturity, practical relevance, and résumé/contact routes. Intended to be approachable to hiring managers and recruiters without inventing business outcomes or impact metrics.
- **Engineering:** prioritize architecture, components, interfaces, implementation decisions, technologies, tests, CI, reproducibility, and known engineering limitations.
- **Research:** prioritize problem framing, assumptions, specifications, design alternatives, methods, evidence, unresolved questions, and future research.

Reading lenses may adjust emphasis, ordering, summary length and progressive disclosure. They must never change project facts, suppress maturity/qualification warnings, imply that a planned capability is implemented, or remove access to the full content. Every project must keep a common set of verified facts and provenance, with lens-specific presentation blocks layered on top.

Use an explicitly labeled accessible control; do not infer a visitor's profession or profile. Persist the choice locally (versioned preference key) only, with a clear way to return to Balanced. No account, remote profile, analytics, or audience tracking is permitted. All visible labels and instructions must be translated in the five built-in locales. The default experience must remain useful when browser storage is unavailable.

## Easter eggs and playful interactions

Small, optional discoveries are approved as part of the portfolio personality. They must be technically relevant, polished and secondary to the professional content.

Preferred direction:
- A small, accessible portfolio terminal/console with a fixed set of harmless, prewritten commands and project/engineering-themed responses. It is an interface simulation, not a real shell: it must not execute arbitrary input, access files, run commands, make network requests or expose secrets.
- Optional project-specific discoveries (for example, a small project constellation, hidden engineering-principles note, or a playful but factual Omni status response).
- An optional keyboard shortcut may complement a visible touch-accessible entry point; keyboard discovery must not be the only way to reach an easter egg.

Easter eggs must never obscure navigation, launch automatically, block the page, play surprise audio, require a particular theme, or be required to learn important facts. All dialogs need keyboard and touch operation, sensible focus management, Escape dismissal, screen-reader labels, and reduced-motion support. Easter eggs must not use trackers, hidden network calls, deceptive fake status, or fabricated project achievements. A joke command must visibly be a joke and must not resemble an actual system operation.

## Verification requirements for reading lenses and easter eggs

- Verify Balanced is the initial default and persists only as a local preference.
- Verify all four lenses on desktop and mobile, with keyboard and touch, and with storage unavailable.
- Verify lens switching does not alter the URL, project maturity, source links, factual content or browser history.
- Verify each lens is understandable and complete in English, German, French, Hindi and Marathi; locale-key parity is necessary but manual language review is still required.
- Verify technical and research details remain reachable in Overview mode, even when collapsed.
- Verify every easter egg has a visible, accessible discovery path; test keyboard shortcut behavior separately.
- Verify no arbitrary code or commands can be executed; no network/storage side effects beyond an explicitly documented local preference.
- Verify focus return, Escape behavior, reduced motion, RTL where applicable, and no viewport overflow.

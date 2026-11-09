# Local coding-agent handoff

Maintain the portfolio for **Shreyash Satish Jagtap**. Read `README.md`, `docs/DETAILS.md`, `docs/DESIGN.md`, and `docs/PROJECT_AUDIT.md` before editing.

## Working rules

- Fetch and inspect the current repository state before making changes.
- Preserve history; never force-push or rewrite remote branches.
- Keep work on a scoped branch and submit a reviewable pull request.
- Verify project descriptions against current linked repository documentation/status records.
- Preserve the distinction between concept, specification, prototype, alpha, candidate release, and production qualification.
- Helios is concept/specification only. Its intended architecture has a non-neural symbolic core; frozen foundation models are permitted only as isolated perception peripherals, with provenance-bearing outputs treated as untrusted observations. The canonical Helios repository README currently contradicts that newer direction; report this conflict rather than silently claiming it has been reconciled.
- Do not represent Omni as a self-hosted compiler. Self-hosting is a roadmap target.
- Keep Kilo fork work distinct from upstream Kilo Code functionality. The public fork README still reflects upstream documentation.
- Never publish street addresses, secrets, credentials, customer data, unsupported impact metrics, or skill proficiency rankings.
- Do not publish fiction.

## Engineering constraints

- React + TypeScript + Vite.
- Cloudflare Workers Static Assets only, on the existing free `workers.dev` hostname. No custom domain purchase is required.
- Never deploy this portfolio to Fly.io, Vercel, Netlify, GitHub Pages, or another provider.
- Serve static output through the existing Cloudflare Worker and expose `/api/github/activity` as a same-origin Worker endpoint for GitHub calendar/events.
- Store only the last fully successful normalized activity snapshot in Cloudflare KV for up to six hours; partial or failed responses must never overwrite it. Consider it fresh for five minutes and use visibly marked stale fallback data when one upstream source fails. The snapshot combines GitHub's publicly rendered contribution calendar (which may include anonymized private/internal contribution counts if the profile owner's **Private contributions** setting is enabled) with push entries filtered from GitHub's public user Atom timeline (`https://github.com/<username>.atom`). Ignore non-push Atom entries. Do not claim the combined feed is strictly public-repository-only unless that setting is disabled; never fetch private repository names or private event details.
- The browser must call only same-origin APIs; do not expose a GitHub token or fetch GitHub directly from the browser.
- Store manual refresh attempts separately in KV for a one-minute cooldown. KV is eventually consistent, so this is best-effort throttling, not a globally atomic rate limiter. If KV is unavailable, degrade to live upstream fetching without claiming stale persistence.
- All user-facing strings must exist in all five maintained locales.
- Preserve four themes, three density modes, accessible interactions, responsive behavior, and reduced-motion support.
- Keep CSP restrictive and avoid inline scripts/styles or dynamic HTML injection.
- Exclude generated build/test output from Git.

## Required verification

```bash
npm ci
npm run typecheck
npm run test:unit
npm run build
npx playwright install chromium
npm run test:e2e
```

Inspect 360, 768, 1024, and 1440px widths across all themes and density modes. Test keyboard behavior, language search, RTL layout, focus restoration, project filters/details, navigation scrolling, GitHub success/partial/stale/failure/refresh states, duplicate IDs, nested interactive elements, and true document overflow. Report exact commands and outputs; never claim an unrun test or Lighthouse score passed.

## Handoff

Separate verified facts, changes, validation evidence, unresolved blockers, and owner decisions. Update the project audit, source-of-truth docs, and changelog as decisions change.

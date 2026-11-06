# Local coding-agent handoff

Use this prompt when continuing implementation from a local checkout.

---

You are maintaining the portfolio repository for **Shreyash Satish Jagtap**. Read `README.md`, `docs/DETAILS.md`, and `docs/DESIGN.md` before making changes. They are the content and engineering source of truth.

## Working rules

- Fetch and inspect the current branch before editing. Preserve history; never force-push or reset remote history.
- Keep main stable. Work on a scoped branch and submit a reviewable pull request.
- Verify project descriptions against the linked repository README/status records. Do not assume an earlier portfolio description remains correct.
- Preserve the distinction between concept, specification, prototype, alpha, candidate release, and production qualification.
- Helios is concept/specification only. Its current design separates deterministic symbolic reasoning and explicit memory from frozen perception-only models; perception outputs are untrusted observations. No Helios runtime exists.
- Do not represent Omni as a self-hosted compiler. Self-hosting is a roadmap target.
- Keep Kilo fork work distinct from upstream Kilo functionality.
- Do not publish a street address, private operational details, credentials, customer data, or unverified metrics.
- Do not publish fiction or infer professional skill levels.

## Implementation constraints

- React + TypeScript + Vite, strict TypeScript.
- Static Cloudflare Workers Static Assets deployment on the existing free `workers.dev` hostname; no custom domain purchase is needed.
- Serve Vite static assets through Cloudflare Workers Static Assets; use a stateless Worker route at `/api/github/activity` to retrieve/parse GitHub contribution-calendar HTML and recent public PushEvents. Cache normalized activity using the Worker Cache API for five minutes per data centre; manual refresh bypasses cached data. No persistent application database, user-account backend, analytics, advertising trackers, or cookies. Browser code must call only same-origin APIs; GitHub is contacted server-side by the Worker. Never expose private activity or a personal token.
- All user-facing strings are present in all five locale files.
- Preserve the four themes and three density modes.
- Use semantic HTML, keyboard-accessible controls, reduced-motion support, responsive grid/flex, rem units, and visible focus.
- Keep the Content Security Policy restrictive. No inline scripts or inline styles. Browser `connect-src` and `img-src` should remain same-origin; GitHub requests are server-side Worker fetches.
- Generated Playwright/Lighthouse artifacts belong in ignored build output, not Git.

## Required verification

Run:

```bash
npm ci
npm run typecheck
npm run test:unit
npm run build
npx playwright install chromium
npm run test:e2e
```

Inspect the built site at 360, 768, 1024, and 1440 CSS pixels across all theme/density combinations. Check keyboard interaction, language search, RTL layout, focus behavior, horizontal navigation scrolling, GitHub activity rendering, duplicate IDs, and actual document overflow. Record exact commands and outcomes. Do not claim tests or Lighthouse scores passed without fresh output.

## Handoff

Report verified facts, implementation changes, validation evidence, unresolved blockers, and any owner decisions required. Update this prompt and the design/content documents when the product direction changes.

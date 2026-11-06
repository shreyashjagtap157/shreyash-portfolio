# Changelog

## 2026-11-06 — Portfolio quality, Cloudflare hosting, and activity refresh

### Implemented in the review branch

- Reworked project cards into semantic article/link structures with separate repository navigation and localized project notes.
- Added Helios as an explicitly concept/specification-stage project. Described frozen foundation models as isolated perception peripherals whose outputs remain untrusted observations; clearly stated no Helios runtime exists.
- Removed the duplicate earlier Omni repository from the selected-work grid; current Omni content is described as an early-stage implementation, with self-hosting a roadmap target.
- Corrected project maturity labels to avoid implying that prototypes and unreleased work are stable or production-ready.
- Replaced the invalid project-detail import with an explicit localized detail-key map.
- Replaced the incomplete events-only contribution heatmap with a same-origin Cloudflare Worker endpoint that parses dated contribution cells from GitHub's calendar HTML and returns a separate recent public PushEvent/commit list. Activity scope and limitations are stated explicitly.
- Added Cloudflare edge caching, manual cache bypass, safe validation of GitHub event records, commit SHAs, and repository destinations; the browser does not call GitHub directly.
- Made the top section menu horizontally scrollable, keyboard focusable, and visibly scrollable on narrow screens.
- Removed the old external contribution widget and obsolete architecture/explorer sections from the active page.
- Improved responsive card/tag behavior, contact layout, menu touch targets, and reduced-motion handling.
- Hardened theme changes against unsupported/rejected View Transitions API calls and prevented automatic language detection from overriding an explicit user language choice.
- Added translated activity and project labels in English, German, French, Hindi, and Marathi.
- Updated canonical, Open Graph, Twitter, robots, and sitemap URLs to the existing Cloudflare Workers URL. No paid custom domain is required.
- Configured `workers_dev: true` for the existing Cloudflare Worker and aligned the deployment output directory with Vite's `dist/`.
- Added comprehensive Playwright checks and GitHub Actions CI; removed stale snapshots, generated test reports, and an accidental temporary file.

### Validation status

GitHub Actions run [42258764088](https://github.com/shreyashjagtap157/shreyash-portfolio/actions/runs/42258764088) passed on commit `4210968c2d9ff3e4554b5fa425834fbbe72464c`: TypeScript, unit tests, production build, Chromium installation, and the full Chromium browser suite. Cloudflare production deployment and a live-site smoke test remain pending.

### Baseline issues observed

- The retained Playwright run record reported failed screenshot cases in Aurora / spacious mode at 1024px and 1440px.
- The old changelog claimed 53 passing Playwright tests despite those retained failure artifacts.
- The October 2026 Lighthouse JSON was stale and included failed accessibility audits despite reported aggregate scores.
- The earlier page relied on third-party contribution endpoints despite its privacy statement claiming no third-party runtime requests.
- The former HTML and sitemap advertised an unowned/unconfirmed custom-domain origin.


### Inventory and consistency review

- The selected-work inventory is exactly 14 unique repositories: 4 languages/systems, 5 AI/agent projects, and 5 platform/web projects.
- Removed unused `active`, `earlier`, and `built` maturity labels; remaining statuses represent the maturity categories actually used.
- Helios source README/specification still conflicts with the newer frozen-perception-only model exception. The portfolio flags this explicitly; the Helios repository remains to be reconciled.
- The public Kilo fork README still mirrors upstream Kilo documentation; experimental swarm/NIM claims are labeled as fork work and not attributed to upstream Kilo.
- The portfolio's activity/privacy documentation now matches the actual Worker-backed architecture.

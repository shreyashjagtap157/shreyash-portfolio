# Changelog

## 2026-11-06 — Portfolio quality, Cloudflare hosting, and activity refresh

### Implemented in the review branch

- Reworked project cards into semantic article/link structures with separate repository navigation and localized project notes.
- Added Helios as an explicitly concept/specification-stage project. Described frozen foundation models as isolated perception peripherals whose outputs remain untrusted observations; clearly stated no Helios runtime exists.
- Removed the duplicate earlier Omni repository from the selected-work grid; current Omni content is described as an early-stage implementation, with self-hosting a roadmap target.
- Corrected project maturity labels to avoid implying that prototypes and unreleased work are stable or production-ready.
- Replaced the invalid project-detail import with an explicit localized detail-key map.
- Replaced the incomplete events-only contribution heatmap with GitHub's official contribution-calendar image and a separately refreshed public PushEvent/commit list. Activity scope and limitations are stated explicitly.
- Added a ten-minute local cache for public push events and safe validation of cached event data and repository/commit destinations.
- Made the top section menu horizontally scrollable, keyboard focusable, and visibly scrollable on narrow screens.
- Removed the old external contribution widget and obsolete architecture/explorer sections from the active page.
- Improved responsive card/tag behavior, contact layout, menu touch targets, and reduced-motion handling.
- Hardened theme changes against unsupported/rejected View Transitions API calls and prevented automatic language detection from overriding an explicit user language choice.
- Added translated activity and project labels in English, German, French, Hindi, and Marathi.
- Updated canonical, Open Graph, Twitter, robots, and sitemap URLs to the existing Cloudflare Workers URL. No paid custom domain is required.
- Configured `workers_dev: true` for the existing Cloudflare Worker and aligned the deployment output directory with Vite's `dist/`.
- Added comprehensive Playwright checks and GitHub Actions CI; removed stale snapshots, generated test reports, and an accidental temporary file.

### Validation status

Fresh verification is being run from the review branch. No local or browser result should be treated as passed until the actual command output and Cloudflare deployment have been inspected.

### Baseline issues observed

- The retained Playwright run record reported failed screenshot cases in Aurora / spacious mode at 1024px and 1440px.
- The old changelog claimed 53 passing Playwright tests despite those retained failure artifacts.
- The October 2026 Lighthouse JSON was stale and included failed accessibility audits despite reported aggregate scores.
- The earlier page relied on third-party contribution endpoints despite its privacy statement claiming no third-party runtime requests.
- The former HTML and sitemap advertised an unowned/unconfirmed custom-domain origin.

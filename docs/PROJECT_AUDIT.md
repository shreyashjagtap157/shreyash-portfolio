# Portfolio project audit and issue ledger

**Audit date:** 2026-11-07  
**Repository:** `shreyashjagtap157/shreyash-portfolio`  
**Review branch:** `work/portfolio-about-case-studies`  
**Production target:** Cloudflare Worker `shreyash-portfolio`  
**Public hostname:** https://shreyash-portfolio.ssjagtap2016.workers.dev/

This document distinguishes verified portfolio-code findings from unresolved conflicts in the separate project repositories. It is not a claim that every project in the owner's GitHub account is included.

## 1. Selected-work inventory

The portfolio intentionally lists **14 unique repositories**:

| Category | Count | Projects |
|---|---:|---|
| Systems and languages | 4 | Omni, AetherOS, Mosaic-µ, AI-OS |
| AI and agents | 5 | Helios, NexusAgent, Kilo Code fork, Dynamic Neural Computing, Tensor Ring Decomposition |
| Platforms and web | 5 | Universal Education Platform, Decentralized IoT Network, ACTSConnect, OldAgeHome, MilkyWay |
| **Total** | **14** | 14 unique project IDs and repository slugs |

The source of truth is `src/data/projects.ts`. Unit tests assert the exact repository list, unique IDs/slugs, category totals, six allowed maturity states, and a project-detail mapping for every card.

The six maturity states currently used are `alpha`, `progress`, `spec`, `research`, `candidate`, and `prototype`. Unused `active`, `earlier`, and `built` labels are not part of the type or locale dictionaries. No card is marked simply "Built" or "Production-ready."

## 2. Personal and professional content

The portfolio uses the professional name **Shreyash Satish Jagtap**, city-level location (Pune, Maharashtra, India), the existing contact details, current internship, prior backend internship, education, and certifications recorded in `docs/DETAILS.md`.

No street address, skill proficiency scale, invented impact metric, or fiction project is shown. The selected-work list is explicitly not described as the complete GitHub inventory.

## 3. Frontend and interaction coverage

The active page renders one instance of each section: hero, projects, Omni case study, technical skills, engineering approach, GitHub activity, experience/education, and contact.

The current Playwright suite is structured as:

- 4 themes × 3 density settings × 4 viewport widths = **48 responsive-layout combinations**.
- Named interaction tests for theme/density persistence, dropdown keyboard handling, outside click, language search and RTL, reduced motion, horizontal navigation scrolling, project detail routing, category filters, duplicate IDs/nested interactive elements, and GitHub activity states.

The final total is recorded from the CI test output after the latest change, not inferred from the number of test declarations.

## 4. GitHub activity architecture

The browser talks only to same-origin `/api/github/activity`. The Cloudflare Worker fetches GitHub's public contribution HTML and unauthenticated public PushEvents, then returns normalized data.

The Worker validates calendar dates and activity levels, rejects malformed events/repository names, validates commit SHAs before producing commit links, and never exposes a personal GitHub token. Private-repository activity is not included.

Reliability controls:

- Five-minute freshness window.
- Up to six-hour TTL for the last fully successful result in Cloudflare KV; partial results never overwrite it.
- Stale fallback, visibly marked as partial, if an upstream source is unavailable.
- Eight-second timeout for GitHub upstream requests.
- A separate one-minute manual-refresh marker, independent of the last-successful-data timestamp.
- No fabricated contributions or commits if GitHub is unavailable.
- KV is eventually consistent: writes are immediately visible in the serving location but may take up to 60 seconds to appear elsewhere. The cooldown is therefore best-effort, not a globally atomic rate limit.

The feed remains limited to GitHub's public data and recent public events; it is not a full private contribution record.

## 5. Cloudflare hosting and cost model

The connected Cloudflare account already has the free `ssjagtap2016.workers.dev` subdomain. The existing `shreyash-portfolio` Worker has its `workers.dev` hostname enabled and no custom domain is attached.

Public URL: **https://shreyash-portfolio.ssjagtap2016.workers.dev/**

No domain purchase is required. A custom domain is optional. The production target is Cloudflare Workers Static Assets, with GitHub repository builds delegated to Cloudflare Workers Builds. No Fly.io, Vercel, Netlify, or GitHub Pages deployment is part of this project.

## 6. CI and regression verification

The latest verified checkpoint is GitHub Actions run [42375334373](https://github.com/shreyashjagtap157/shreyash-portfolio/actions/runs/42375334373), commit `56ac50d2ea1a9bb4e85c36c2a00361140c1a4c5a`:

- TypeScript typecheck: passed.
- Vitest: 27 tests passed in 3 files, including contribution-calendar parsing from non-table HTML elements and stale-cache timestamp preservation.
- Vite production build: passed (63 modules transformed).
- Chromium browser suite: 77 tests passed.
- Responsive coverage includes the four theme × three density × four base-viewport matrix plus desktop nav geometry checks at 1,100px, 1,200px, 1,360px and 1,440px.
- Locale-specific browser coverage checks all five supported dictionaries for project case-study content and contact-link labels/descriptions.
- Browser checks include no duplicate DOM IDs and no nested interactive anchors/buttons.

The audit-only follow-up is tracked separately from that application-code checkpoint.

## 7. Known cross-repository contradictions

| ID | Finding | Portfolio handling | Required resolution |
|---|---|---|---|
| EXT-01 | Helios README line 7 currently prohibits pretrained neural models and model-inference services. The newer intended direction allows frozen models only for perception, with all outputs treated as untrusted observations and the reasoning/memory/planning/action core remaining non-neural and symbolic. | Portfolio describes the newer intended architecture and labels Helios concept/specification only; it does not claim a runtime exists. | Owner-approved update to Helios README/master specification/compliance docs so the canonical rules agree. |
| EXT-02 | The public Kilo Code fork README still describes upstream Kilo Code rather than documenting the fork's experimental specialist-agent/NVIDIA NIM work. | Portfolio labels this as a local fork and does not attribute it to upstream or claim a release. | Update the fork README/status docs with evidence, or keep the project description at the currently conservative level. |
| EXT-03 | Miner and PromptWars-Virtual-2 are not part of the selected-work grid. | Explicitly excluded; no unsupported project inclusion. | Owner confirms whether either belongs in the professional portfolio. |
| EXT-04 | A separate professional email and headshot have not been confirmed. | Existing verified contact details and no portrait placeholder are used. | Optional owner decision; neither blocks deployment. |

## 8. Previous defects addressed

- Conflicting/duplicate Omni card removed.
- Invalid project-detail import contract corrected.
- Project maturity labels made explicit and unsupported "Built" label removed.
- GitHub activity no longer relies on a third-party chart/image host or browser-side direct GitHub calls.
- Contribution calendar and recent push feed are separate, truthful data views.
- Category filter, project detail navigation, theme/language/density menus, and refresh action are real controls.
- Horizontal top navigation is horizontally scrollable with a visible scrollbar at narrow widths.
- Mobile overflow, card/tag wrapping, focus, touch-target, RTL, and reduced-motion regressions have dedicated tests.
- Duplicate DOM IDs and invalid nested interactive elements are checked in the browser suite.
- Custom-domain canonical metadata removed in favor of the verified free Cloudflare Worker hostname.
- Stale Lighthouse claims are not carried forward.

## 9. Remaining work before closure

1. **Completed:** GitHub Actions is green for the current implementation revision. TypeScript typecheck, 33 Vitest tests, the production build, and 77 Playwright Chromium tests passed. The latest CI npm audit report contains zero advisories.
2. **Blocked by Cloudflare credentials:** repair the deleted/rolled Workers Builds API token, then confirm Cloudflare can build and deploy this repository using the existing free Worker hostname.
3. **After deployment:** verify the live page, API response, cache/refresh behavior, response headers, and browser console/network errors.
4. **Owner review:** decide project inclusion (Miner/PromptWars) and reconcile the remaining external documentation contradictions (Helios/Kilo).

No final "fully complete" claim is made until Cloudflare deployment and live smoke tests are green, and the remaining owner review decisions are closed.


## 10. About navigation, case studies, project visuals, and local development (2026-11-07)

- Added an **About** navigation anchor before Projects, targeting the hero/about statement.
- Expanded the main content container to 80rem. The desktop toolbar uses an 84rem maximum width so the navigation and controls fit together at 1,440px; intermediate widths retain a visible, keyboard-accessible horizontal scrollbar.
- Replaced project initials with conceptual SVG architecture illustrations rather than arbitrary monograms. These are explicitly conceptual visuals, not screenshots of deployed products.
- Added a project selector with distinct case studies for Omni, Helios, NexusAgent, UEP, and the Kilo fork. Each case study distinguishes verified maturity from intended architecture and roadmap work.
- Rewrote engineering approach around repository/spec inspection, explicit constraints, coherent milestones, complete verification, and evidence-based reporting.
- Added explanatory labels to LinkedIn, GitHub, and telephone contact links; their labels and descriptions are localized in all five built-in languages.
- Local development now runs the actual Cloudflare Worker with built assets (`npm run dev`), so `/api/github/activity` is served locally by Wrangler rather than failing against Vite's static dev server. `npm run dev:ui` remains available for UI-only work, with API proxying to a separately running Worker on port 8787.
- Activity UI now surfaces stale-cache state distinctly and avoids showing an empty-feed message after a network error.


## 11. Current review, verification, and Cloudflare deployment gate (2026-11-07)

- Review PR: [#2](https://github.com/shreyashjagtap157/shreyash-portfolio/pull/2), open against `main` from `work/portfolio-about-case-studies`. The branch is not merged, and no production deployment is claimed.
- Latest application-code revision: `56ac50d2ea1a9bb4e85c36c2a00361140c1a4c5a`. It includes localized LinkedIn, GitHub, and telephone contact copy, explicit browser assertions for contact labels, a parser regression for non-table contribution-day elements, and truthful timestamps when stale cached data is reused. The current PR head also includes the audit-only follow-up commit `0c3b351a44b3cdf9ba550a642148dd42752469cc`.
- GitHub Actions run [42375334373](https://github.com/shreyashjagtap157/shreyash-portfolio/actions/runs/42375334373) passed on the application-code revision:
  - TypeScript typecheck: passed.
  - Vitest: 27 tests passed across 3 files.
  - Production build: passed, 63 modules transformed.
  - Playwright Chromium: 77 tests passed, including navigation at 1,100px, 1,200px, 1,360px, and 1,440px; case-study content in English, German, French, Hindi, and Marathi; and localized contact links in all five built-in languages.
- All five built-in locale dictionaries contain 206 keys each with matching key sets, including project case studies and contact-link labels/descriptions.
- Automated review findings on desktop navigation overflow, untranslated project case studies, and untranslated contact-link copy were addressed with higher-specificity toolbar rules, a desktop-only wider toolbar container, localized dictionary entries, and regression tests. All three corresponding inline threads are resolved. The contact-link localization finding was verified by CI run #74; parser element-type coverage passed in run #79; preserving the last successful timestamp in stale-data responses passed in run #86.
- Cloudflare Worker: `shreyash-portfolio`, script tag `a934c1d629784998983f15b258830b5f`; repository connection: `shreyashjagtap157/shreyash-portfolio`, production branch: `main`.
- Production build command: `npm ci && npm run check`; deploy command: `npx wrangler deploy`.
- Latest inspected Cloudflare build `2bb5f642-3352-4acc-8990-64adeade14eb` stopped before dependency installation. Its log explicitly reports that the selected Build token was deleted or rolled.
- Production settings and trigger still reference Build token UUID `8c144870-c82c-428f-8a7a-40c180d4294c`. Cloudflare lists two Build-token records, but both reference the same underlying Cloudflare token ID; switching between those records does not establish a valid independent credential.
- Workers Builds remains connected to the expected GitHub repository and `main` branch. The Cloudflare API's Build-token creation endpoint requires a valid `build_token_secret` and `cloudflare_token_id`; the connected session cannot mint or recover those credentials from the expired token ID. No token secret was exposed, regenerated, or changed in this workflow.
- The latest live Worker deployment record is `2026-10-23T15:21:08.788883Z`. The PR has not been deployed. Its code cannot be represented as live until the token is repaired and a successful Cloudflare build/deploy is observed.
- Required owner action: in Cloudflare Dashboard, open Workers & Pages → `shreyash-portfolio` → Settings → Builds → API token. Select/create a valid API token and refresh the associated Build token. Do not paste the secret into chat or commit it to Git.
- After credential repair: trigger a Cloudflare production build from `main`; verify successful build and deployment; smoke-test the live page and `/api/github/activity`; inspect response headers, browser console, and network failures.

## 12. Review follow-up: responsive navigation and localization

- The primary navigation remains horizontally scrollable with a visible scrollbar throughout the 1,100–1,360px intermediate desktop range. The toolbar container expands to 84rem at desktop widths, making the full row fit at 1,440px; the scrollbar is hidden only at that tested width, with overflow still configured as a safety fallback.
- Omni, Helios, NexusAgent, UEP, and Kilo Code fork case-study names, introductions, headings, and narrative text, plus LinkedIn/GitHub/telephone contact labels and descriptions, are stored in all five built-in dictionaries: English, German, French, Hindi, and Marathi.
- Worker parser unit tests cover contribution-day metadata on non-table elements as well as table cells.
- Worker stale-cache fallback retains the timestamp of the last successful cached payload rather than stamping stale content with the time of the failed request. Playwright coverage verifies the desktop navigation/control boundary at intermediate widths and confirms that the full navigation row fits before hiding the scrollbar at 1,440px. Locale tests verify Omni and Helios case-study names and introductions and all contact-link labels/descriptions in the five built-in languages.
- The 80rem main content container remains unchanged; only the desktop toolbar is allowed a slightly wider 84rem container to provide sufficient room for navigation and controls.
- Project maturity, external documentation conflicts, public-only GitHub activity, and the Cloudflare deployment gate remain explicit; no production-readiness or live-deployment claim is introduced.


## 13. Storage correction for the `workers.dev` deployment target (2026-11-07)

- The PR implementation originally used `caches.default` for its six-hour stale-data store. Cloudflare documents functional Cache API operations for Workers deployed to custom domains and Pages Functions; the portfolio's configured production hostname is a `workers.dev` subdomain. The Cache API was therefore not an appropriate dependency for this deployment target.
- Created the account's first KV namespace, `shreyash-portfolio-activity`, with ID `f5b00902986840448a64aa9a7bb05ab5`, and bound it as `ACTIVITY_KV` in `wrangler.jsonc`.
- Replaced Cache API reads/writes with KV-backed persistence for the last fully successful public activity snapshot (six-hour TTL) and a separate one-minute manual-refresh attempt marker. A failed or partial upstream refresh does not overwrite the last-good payload and cannot reset its timestamp.
- Added unit coverage for Retry-After calculation, stale payload preservation during a throttled refresh, and the no-cache 429 path.
- KV is available on Workers Free but has finite quotas (currently 100,000 reads/day, 1,000 writes/day, 1 GB storage). Its eventual consistency means remote locations may not see a recent write for up to 60 seconds; this design improves availability but is not a strict globally synchronized lock. A KV quota or binding failure falls back to live upstream fetches, not fabricated/stale data.
- The code change is on PR #2 and is not deployed to production. The Workers Builds token blocker and live smoke-test requirement remain open.


## 14. Dependency security remediation and current verification (2026-11-07)

- The detailed CI npm audit report identified a transitive `undici` vulnerability chain through `miniflare` and `wrangler`: locked versions were Wrangler `4.151.3`, Miniflare `5.20261019.1-beta`, and Undici `7.29.1`. npm reported compatible fixes available.
- Applied npm's non-forced compatible lockfile remediation without changing `package.json` or introducing a major-version upgrade. The lockfile now resolves Wrangler `4.158.0`, Miniflare `5.20261104.0-beta`, and Undici `7.30.1`.
- The subsequent clean CI `npm ci` audit reported **0 vulnerabilities** (0 moderate, 0 high, 0 critical).
- Added a CI dependency-security gate that prints package, severity, affected range, advisory links, and fix availability. It fails closed if the audit report is unreadable or reports any unresolved npm advisory.
- Current implementation verification on commit `5d5b2d314dd858baaef00aa683dfe675e754ee56`:
  - TypeScript typecheck: passed.
  - Vitest: 33 tests passed across 3 files.
  - Vite production build: passed (63 modules transformed).
  - Playwright Chromium: 77 tests passed.
  - GitHub Actions push run [42387174246](https://github.com/shreyashjagtap157/shreyash-portfolio/actions/runs/42387174246): passed.
  - GitHub Actions PR run [42387179600](https://github.com/shreyashjagtap157/shreyash-portfolio/actions/runs/42387179600): passed.
- PR #2 remains open and is not deployed. The production deployment gate is still the expired/deleted Cloudflare Workers Builds token recorded in section 11; the lockfile security remediation does not change production deployment state.

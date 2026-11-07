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
- Up to six-hour retention of the last fully successful result.
- Stale fallback, visibly marked as partial, if an upstream source is unavailable.
- Eight-second timeout for GitHub upstream requests.
- One-minute manual refresh cooldown.
- No fabricated contributions or commits if GitHub is unavailable.

The feed remains limited to GitHub's public data and recent public events; it is not a full private contribution record.

## 5. Cloudflare hosting and cost model

The connected Cloudflare account already has the free `ssjagtap2016.workers.dev` subdomain. The existing `shreyash-portfolio` Worker has its `workers.dev` hostname enabled and no custom domain is attached.

Public URL: **https://shreyash-portfolio.ssjagtap2016.workers.dev/**

No domain purchase is required. A custom domain is optional. The production target is Cloudflare Workers Static Assets, with GitHub repository builds delegated to Cloudflare Workers Builds. No Fly.io, Vercel, Netlify, or GitHub Pages deployment is part of this project.

## 6. CI and regression verification

The latest previously verified checkpoint is GitHub Actions run [42258764088](https://github.com/shreyashjagtap157/shreyash-portfolio/actions/runs/42258764088), commit `4210968c2d9ff3e4554b5fa425834fbbe72464c2`:

- TypeScript typecheck: passed.
- Vitest: 19 tests passed in 3 files.
- Vite production build: passed (63 modules transformed).
- Chromium browser suite: 62 tests passed.
- Responsive test matrix: all 48 combinations passed.
- Browser checks include no duplicate DOM IDs and no nested interactive anchors/buttons.

After the checkpoint, the Worker gained stronger cache/stale handling and corresponding tests. The next CI result must supersede this checkpoint before production publication.

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

1. **Completed:** GitHub Actions is green for the latest implementation revision. TypeScript typecheck, 24 Vitest tests, the production build, and 72 Playwright Chromium tests passed. The current documentation revision has also passed the same CI workflow.
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
- Added explanatory labels to LinkedIn, GitHub, and telephone contact links.
- Local development now runs the actual Cloudflare Worker with built assets (`npm run dev`), so `/api/github/activity` is served locally by Wrangler rather than failing against Vite's static dev server. `npm run dev:ui` remains available for UI-only work, with API proxying to a separately running Worker on port 8787.
- Activity UI now surfaces stale-cache state distinctly and avoids showing an empty-feed message after a network error.


## 11. Current review, verification, and Cloudflare deployment gate (2026-11-07)

- Review PR: [#2](https://github.com/shreyashjagtap157/shreyash-portfolio/pull/2), open against `main` from `work/portfolio-about-case-studies`. The branch is not merged, and no production deployment is claimed.
- Latest implementation revision: `d702a2a77678ab68952de3e3795285226628ba5e`. A subsequent audit-only commit updated this issue ledger without changing application code.
- GitHub Actions run [42373223412](https://github.com/shreyashjagtap157/shreyash-portfolio/actions/runs/42373223412) passed on this exact revision:
  - TypeScript typecheck: passed.
  - Vitest: 24 tests passed across 3 files.
  - Production build: passed, 63 modules transformed.
  - Playwright Chromium: 72 tests passed, including navigation at 1,100px, 1,200px, 1,360px, and 1,440px, plus case-study content checks in English, German, French, Hindi, and Marathi.
- All five built-in locale dictionaries contain 200 keys each with matching key sets, including the full case-study content.
- Automated review findings on desktop navigation overflow and untranslated case-study content were addressed with higher-specificity toolbar rules, a desktop-only wider toolbar container, localized dictionary entries, and regression tests. Both original inline threads are resolved. A fresh Codex review was requested against the audit revision and was still running at the time of this update.
- Cloudflare Worker: `shreyash-portfolio`, script tag `a934c1d629784998983f15b258830b5f`; repository connection: `shreyashjagtap157/shreyash-portfolio`, production branch: `main`.
- Production build command: `npm ci && npm run check`; deploy command: `npx wrangler deploy`.
- Latest inspected Cloudflare build `2bb5f642-3352-4acc-8990-64adeade14eb` stopped before dependency installation. Its log explicitly reports that the selected Build token was deleted or rolled.
- Production settings and trigger still reference Build token UUID `8c144870-c82c-428f-8a7a-40c180d4294c`. Cloudflare lists two Build-token records, but both reference the same underlying Cloudflare token ID; switching between those records does not establish a valid independent credential.
- Workers Builds remains connected to the expected GitHub repository and `main` branch. No token secret was exposed, regenerated, or changed in this workflow.
- The latest live Worker deployment record is `2026-10-23T15:21:08.788883Z`. The PR has not been deployed. Its code cannot be represented as live until the token is repaired and a successful Cloudflare build/deploy is observed.
- Required owner action: in Cloudflare Dashboard, open Workers & Pages → `shreyash-portfolio` → Settings → Builds → API token. Select/create a valid API token and refresh the associated Build token. Do not paste the secret into chat or commit it to Git.
- After credential repair: trigger a Cloudflare production build from `main`; verify successful build and deployment; smoke-test the live page and `/api/github/activity`; inspect response headers, browser console, and network failures.

## 12. Review follow-up: responsive navigation and localization

- The primary navigation remains horizontally scrollable with a visible scrollbar throughout the 1,100–1,360px intermediate desktop range. The toolbar container expands to 84rem at desktop widths, making the full row fit at 1,440px; the scrollbar is hidden only at that tested width, with overflow still configured as a safety fallback.
- Omni, Helios, NexusAgent, UEP, and Kilo Code fork case-study names, introductions, headings, and narrative text are stored in all five built-in dictionaries: English, German, French, Hindi, and Marathi.
- Playwright coverage verifies the desktop navigation/control boundary at intermediate widths and confirms that the full navigation row fits before hiding the scrollbar at 1,440px. Locale tests verify Omni and Helios case-study names and introductions in all five built-in languages.
- The 80rem main content container remains unchanged; only the desktop toolbar is allowed a slightly wider 84rem container to provide sufficient room for navigation and controls.
- Project maturity, external documentation conflicts, public-only GitHub activity, and the Cloudflare deployment gate remain explicit; no production-readiness or live-deployment claim is introduced.

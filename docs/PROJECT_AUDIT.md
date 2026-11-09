# Portfolio project audit and issue ledger

**Audit date:** 2026-11-09  
**Repository:** `shreyashjagtap157/shreyash-portfolio`  
**Review branch:** `main`  
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

The browser talks only to same-origin `/api/github/activity`. The Cloudflare Worker fetches GitHub's public contribution HTML and public user Atom timeline (`https://github.com/<username>.atom`), retaining push entries only before returning normalized data.

The Worker validates calendar dates and activity levels, rejects malformed events/repository names, validates commit SHAs before producing commit links, and never exposes a personal GitHub token. The contribution calendar is publicly rendered by GitHub but can include anonymized daily counts from private/internal repositories when the profile owner's **Private contributions** setting is enabled. The Worker stores those dates, intensity levels, and the calendar summary; it does not fetch private repository names or private event details. The public user Atom timeline is filtered to entries whose IDs identify push events; other timeline entry types are ignored.

Reliability controls:

- Five-minute freshness window.
- Up to six-hour TTL for the last fully successful result in Cloudflare KV; partial results never overwrite it.
- Stale fallback, visibly marked as partial, if an upstream source is unavailable.
- Eight-second timeout for GitHub upstream requests.
- A shared one-minute refresh-attempt marker for automatic and manual upstream refreshes, independent of the last-successful-data timestamp. It is written before every upstream attempt, including failures; KV eventual consistency means throttling is best-effort rather than a globally atomic lock.
- No fabricated contributions or commits if GitHub is unavailable.
- KV is eventually consistent: writes are immediately visible in the serving location but may take up to 60 seconds to appear elsewhere. The cooldown is therefore best-effort, not a globally atomic rate limit.

The combined feed is sourced from a public profile surface, but is not guaranteed to be public-repository-only while **Private contributions** is enabled. The recent-push component retains only push entries from the public user Atom timeline. Disabling the profile setting is required to exclude anonymized private/internal contribution counts from the calendar. See [GitHub's profile contributions reference](https://docs.github.com/en/account-and-profile/reference/profile-contributions-reference).

## 5. Cloudflare hosting and cost model

The connected Cloudflare account already has the free `ssjagtap2016.workers.dev` subdomain. The existing `shreyash-portfolio` Worker has its `workers.dev` hostname enabled and no custom domain is attached.

Public URL: **https://shreyash-portfolio.ssjagtap2016.workers.dev/**

No domain purchase is required. A custom domain is optional. The production target is Cloudflare Workers Static Assets, with GitHub repository builds delegated to Cloudflare Workers Builds. No Fly.io, Vercel, Netlify, or GitHub Pages deployment is part of this project.

## 6. CI and regression verification

The latest verified main-branch checkpoint is commit `c32c907e6345b830f3b2e037f49629bd80dc9931`, validated by GitHub Actions run [42591387883](https://github.com/shreyashjagtap157/shreyash-portfolio/actions/runs/42591387883):

- Dependency security audit: passed with zero npm vulnerabilities.
- TypeScript typecheck: passed.
- Vitest: 42 tests passed across 3 files, including automatic-refresh cooldown, last-good snapshot preservation, and Atom commit-summary normalization regressions.
- Vite production build: passed (63 modules transformed).
- Chromium browser suite: 77 tests passed.
- Responsive coverage includes the four theme × three density × four base-viewport matrix plus desktop nav geometry checks at 1,100px, 1,200px, 1,360px and 1,440px.
- Locale-specific browser coverage checks all five supported dictionaries for project case-study content and contact-link labels/descriptions.
- Browser checks include no duplicate DOM IDs and no nested interactive anchors/buttons.

The main commit includes the merged activity reliability and audit-history changes. The portfolio repository has no open pull requests at this checkpoint.

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

## 9. Current release status and remaining owner decisions

### Completed engineering and production gates

1. **Repository and review state:** PRs [#2–#9](https://github.com/shreyashjagtap157/shreyash-portfolio/pulls) are merged through normal history-preserving merges. `main` is at `c32c907e6345b830f3b2e037f49629bd80dc9931`; there are no open pull requests.
2. **Continuous integration:** the latest main-branch run [42591387883](https://github.com/shreyashjagtap157/shreyash-portfolio/actions/runs/42591387883) passed the dependency audit (zero reported npm vulnerabilities), TypeScript check, 42 Vitest tests across three files, Vite production build, and 77 Playwright Chromium tests.
3. **Cloudflare deployment:** the Workers Build pinned to the runtime merge commit succeeded with `npm ci --include=dev && npm run check` and `npx wrangler deploy`. Worker version 24 (`733aa39d-24c4-4379-9138-025266652a0a`) is active at 100% traffic on the existing free `workers.dev` hostname.
4. **Production smoke tests:** the homepage returned HTTP 200 with the expected canonical URL, About-first navigation, and hydrated project case-study selector. The activity endpoint produced two distinct complete snapshots at `2026-11-09T09:02:34.220Z` and `2026-11-09T09:07:49.149Z`; both returned HTTP 200, `partial: false`, `stale: false`, 366 calendar days, six public pushes, and six populated commit summaries. This satisfies the two-snapshot recovery criterion documented in section 26.
5. **Activity-feed outage protection:** automatic and manual refreshes share a one-minute KV attempt marker. Last-good data remains independent of refresh attempts; failed/partial refreshes do not overwrite it. KV eventual consistency means the cooldown remains best-effort, not globally atomic.

### Remaining owner decisions (not deployment blockers)

- **Helios:** reconcile the separate repository's older prohibition on pretrained models with the newer perception-only frozen-model direction, while keeping the symbolic reasoning/memory/planning/action core explicit. The portfolio conservatively labels Helios as concept/specification stage; no runtime is claimed.
- **Kilo Code fork:** decide whether to update the fork's public README/status documentation with evidence of experimental specialist-agent/NVIDIA NIM work. The portfolio continues to distinguish the fork from upstream Kilo Code and does not imply a public release.
- **Project selection:** confirm whether Miner or PromptWars-Virtual-2 belongs in the intentionally selected 14-project portfolio. Both remain excluded pending owner confirmation.
- **Optional profile content:** a separate professional email and a headshot remain optional owner decisions. Neither is required for the deployed site.
- **Custom domain:** the existing free Cloudflare `workers.dev` hostname is working; a purchased custom domain is optional, not a release requirement.

No known production deployment gate remains open. The portfolio application and GitHub activity feed are deployed and smoke-verified. The owner decisions above concern cross-repository documentation or optional content and should not be silently resolved by changing separate projects or personal profile information.


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
- Project maturity, external documentation conflicts, the GitHub contribution-calendar privacy caveat, and the Cloudflare deployment gate remain explicit; no production-readiness or live-deployment claim is introduced.


## 13. Storage correction for the `workers.dev` deployment target (2026-11-07)

- The PR implementation originally used `caches.default` for its six-hour stale-data store. Cloudflare documents functional Cache API operations for Workers deployed to custom domains and Pages Functions; the portfolio's configured production hostname is a `workers.dev` subdomain. The Cache API was therefore not an appropriate dependency for this deployment target.
- Created the account's first KV namespace, `shreyash-portfolio-activity`, with ID `f5b00902986840448a64aa9a7bb05ab5`, and bound it as `ACTIVITY_KV` in `wrangler.jsonc`.
- Replaced Cache API reads/writes with KV-backed persistence for the last fully successful normalized activity snapshot (six-hour TTL) and a separate one-minute manual-refresh attempt marker. A failed or partial upstream refresh does not overwrite the last-good payload and cannot reset its timestamp.
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

## 15. Live revalidation after dependency-security remediation (2026-11-07)

- Revalidated the active review branch and PR #2 against the live repository. The PR remains open and unmerged; its exact head at this checkpoint is `09a61d3249d230ab62f4aa94669be280f5bea94a`.
- Both GitHub Actions runs for that exact head completed successfully: push run [42387713021](https://github.com/shreyashjagtap157/shreyash-portfolio/actions/runs/42387713021) and pull-request run [42387716952](https://github.com/shreyashjagtap157/shreyash-portfolio/actions/runs/42387716952).
- The verified checks on this revision are TypeScript typecheck, 33 Vitest tests across 3 files, Vite production build (63 modules transformed), 77 Playwright Chromium tests, and npm audit with zero reported vulnerabilities. CI now fails closed when the audit report cannot be parsed or when any advisory remains.
- Re-read the Cloudflare account's Worker, Workers Builds settings, build-token metadata, build history, and deployment history. The production Worker remains connected to `shreyashjagtap157/shreyash-portfolio` on `main`; build command is `npm ci && npm run check`, deploy command is `npx wrangler deploy`, and the production trigger still references Build-token UUID `8c144870-c82c-428f-8a7a-40c180d4294c`.
- Latest recorded Workers Build is `2bb5f642-3352-4acc-8990-64adeade14eb`, stopped with outcome `fail` on 2026-11-06. Its log explicitly states: the selected build token was deleted or rolled and cannot be used. The failure occurred before dependency installation; it is not evidence of a failing application build.
- Cloudflare lists two Build-token metadata records, but both reference the same underlying Cloudflare API-token identifier. Selecting the other record therefore does not establish an independent valid credential. Token secrets are not readable from the metadata endpoint.
- Latest production deployment remains Worker version 19, deployed at `2026-10-23T15:21:08.788883Z`. The November source changes remain undeployed; no production smoke-test pass is claimed.
- No Cloudflare token was created, rotated, deleted, or exposed during this inspection. The required owner action remains to create/select a valid, appropriately scoped Cloudflare API token in Cloudflare's dashboard and refresh the Workers Build-token association without sharing the secret in chat or Git.
- After the credential repair, run the existing production build trigger and verify the new deployment version, live page, `/api/github/activity` response, cache/refresh behavior, security headers, and browser console/network errors. Keep PR #2 open until the chosen merge and deployment sequence is explicitly completed.



## 16. Documentation architecture reconciliation (2026-11-07)

- Rechecked the current README, design rules, local-agent handoff, locale tests, project metadata, and activity Worker after the KV migration.
- Corrected README privacy language: the Worker is not described as stateless or as using only an edge cache. It serves static assets and uses Cloudflare KV for the last successful normalized GitHub-activity snapshot (up to six hours) and a separate one-minute manual-refresh marker. The snapshot is not a user profile; the contribution calendar may include anonymized private/internal daily counts if the profile owner enables that GitHub visibility setting. This qualifies the earlier overly broad statement that the cache excludes all private-repository-derived activity.
- Corrected `docs/DESIGN.md`: removed the obsolete Cache API requirement and specified Cloudflare KV, five-minute freshness, six-hour last-good retention, partial/stale fallback, separate one-minute cooldown state, and eventual-consistency limits.
- Corrected `docs/PROMPT.md`: removed the obsolete stateless-Worker description and aligned the implementation constraints with the actual KV behavior and graceful fallback when KV is unavailable.
- Corrected the changelog's cache description and added the November 7 About/case-study, activity persistence, security-gate, documentation, and deployment status update.
- Locale regression coverage already enforces identical key sets across all five maintained dictionaries. The content tests also assert the exact 14-project inventory, category totals, allowed maturity labels, per-project detail mapping, the Helios perception-only/specification caveat, and the Kilo fork/upstream distinction.
- Verification baseline immediately before the documentation reconciliation: both GitHub Actions runs for `e58b0a272c4e573940126278bd8203abc55e145e` passed (push run [42390253333](https://github.com/shreyashjagtap157/shreyash-portfolio/actions/runs/42390253333); PR run [42390256087](https://github.com/shreyashjagtap157/shreyash-portfolio/actions/runs/42390256087)). These documentation changes do not modify runtime code; final CI is required for the resulting branch head.
- PR #2 remains open and unmerged. The production Worker remains on the October 23 deployment; deployment is waiting for an owner-repaired Workers Builds credential. No credential was created, changed, or exposed in this work.


## 17. Live public deployment smoke test — 2026-11-08

### Production observations

- Fetched the public site at `https://shreyash-portfolio.ssjagtap2016.workers.dev/` using a JavaScript-capable public-page fetch. The page returned content, but it is a legacy snapshot rather than the current review-branch implementation.
- The served project grid contains both `Omni` and `Omni (earlier)`, despite the current source having exactly 14 unique repository slugs and no duplicate Omni entry.
- The served project list still uses legacy `Built` labels for Tensor Ring Decomposition, ACTSConnect, OldAgeHome, and MilkyWay. The current source deliberately permits only `alpha`, `progress`, `spec`, `research`, `candidate`, and `prototype` maturity states.
- The fetched page still exposes the older single Omni case study and legacy section structure; it does not show the current About-first navigation and selectable Omni/Helios/NexusAgent/UEP/Kilo case studies from PR #2.
- The live page metadata reports canonical and Open Graph URLs under `https://www.shreyashjagtap.com/`, while current branch `index.html` correctly sets the canonical and Open Graph URLs to the configured `workers.dev` hostname.
- The live same-origin endpoint `/api/github/activity` returned **HTTP 404** (`page_not_found`). The current source routes this path in `src/worker.ts`; therefore the currently deployed activity panel cannot obtain its intended Worker response.
- Cloudflare's deployment API still reports production Worker version 19, last deployed at `2026-10-23T15:21:08.788883Z`. The failed Workers Build from 2026-11-06 remains the only recorded build and was rejected before dependency installation because its selected Build token had been deleted or rolled.
- A read-only Cloudflare token-verification request from the connected API context also returned HTTP 401 `Invalid API Token`. The token-details endpoint could not be inspected through the current OAuth connection (HTTP 403; no matching OAuth scope). This is an additional Cloudflare-connection reauthentication limitation; it does not establish or repair the separate Workers Builds credential.
 
### Source-versus-production conclusion

- The branch source is not the cause of the observed public mismatch: current `index.html` uses the correct `workers.dev` canonical metadata, current `src/worker.ts` handles `/api/github/activity`, the selected-project tests prohibit duplicate repository slugs and unsupported maturity states, and both GitHub Actions workflows passed on commit `e49ed5b7e53f82cb49525bd1640b315fed17aba9`.
- PR #2 remains open and unmerged. The production Worker is not being represented as updated by this PR.
- Do not change DNS, switch providers, deploy from an unverified source, or bypass Cloudflare's existing deployment flow to work around the expired token.
- Required recovery sequence: reauthenticate the Cloudflare connection if API operations are needed; in Cloudflare Dashboard refresh/select a valid Workers Builds API token; run the production build from the intended production branch after the merge decision; verify a new deployed Worker version; then retest the page, canonical metadata, project grid, `/api/github/activity`, KV freshness/refresh behavior, headers, and browser console.
- No credential was generated, changed, or exposed. No production deployment, DNS change, PR merge, or custom-domain change was performed during this smoke test.


## 18. Latest exact-head CI verification — 2026-11-08

- Exact branch head: `55cecf853e3d1686930150e923a7c5427cf9c054`.
- GitHub Actions push run [42472120080](https://github.com/shreyashjagtap157/shreyash-portfolio/actions/runs/42472120080): **success**.
- GitHub Actions pull-request run [42472124575](https://github.com/shreyashjagtap157/shreyash-portfolio/actions/runs/42472124575): **success**.
- Raw job logs confirm for the push run: `npm ci` installed 173 packages and audited 174 packages; npm reported **0 vulnerabilities**; the fail-closed dependency audit step passed; TypeScript typecheck passed; Vitest reported **33 tests passed across 3 files**; Vite production build transformed **63 modules**; Playwright reported **77 passed**.
- The PR run independently repeated the same full pipeline and reported **77 passed** in Chromium.
- The commit under test contains only README and audit-ledger documentation changes; no application runtime code changed from the previously green application-code checkpoint.
- PR #2 remains open and unmerged. These CI results qualify the branch source, not the currently deployed Worker. The live smoke-test findings in section 17 remain unresolved: the public page is stale and `/api/github/activity` returns 404.
- The latest attempted fresh code/security reviews against this documentation-only head were rejected by the review service because its usage limit had been reached. The last completed code review on commit `e49ed5b7e5` reported no major issues; it is not a review of the new `55cecf8` head.


## 19. GitHub contribution-calendar privacy qualification — 2026-11-09

- Revisited the existing Codex P2 review finding on PR #2 (review comment `4502715661`), which correctly noted that GitHub's public contribution calendar can contain anonymized counts from private repositories when the profile owner enables **Private contributions**.
- Verified the current `src/worker.ts`: it fetches `https://github.com/users/<username>/contributions`, parses each calendar day's `data-date` and `data-level`, and stores the calendar summary. Separately, it fetches `/users/<username>/events/public`, which is explicitly the public-events feed.
- GitHub's [profile contributions reference](https://docs.github.com/en/account-and-profile/reference/profile-contributions-reference) states that when private contributions are publicized, people without access to those repositories can see the number of contributions made each day, but not specific details.
- Corrected README, design rules, local-agent handoff, changelog, and this audit: the calendar's daily intensity levels and summary may reflect anonymized private/internal activity; no private repository names or private event details are fetched. The recent-push feed remains based on push entries filtered from the public user Atom timeline. The visible calendar footnote now states this distinction in all five locales, with an exact-copy regression test.
- The GitHub profile's **Private contributions** visibility setting has not been inspected or changed. If strict public-repository-only output is required, the owner must disable it under GitHub profile → Contribution settings. This owner setting is not something the Worker can infer or enforce reliably.
- The Worker runtime behavior was not changed. The visible contribution-calendar footnote and its five locale values were updated, with an exact-copy regression test. GitHub Actions push run [42567471094](https://github.com/shreyashjagtap157/shreyash-portfolio/actions/runs/42567471094) and PR run [42567466482](https://github.com/shreyashjagtap157/shreyash-portfolio/actions/runs/42567466482) both passed on commit `049b046cbaa14c016b9251343cf1243561113804`: 34 Vitest tests across 3 files, TypeScript typecheck, production build (63 modules), 77 Chromium browser tests, and npm audit with 0 vulnerabilities. No GitHub profile setting, Cloudflare credential, production deployment, DNS record, or merge state was changed.


## 20. Live Cloudflare deployment recheck — 2026-11-09

- Re-fetched the public `workers.dev` root page and `/api/github/activity` using a JavaScript-capable public fetch with cache freshness set to zero.
- The root remains the same legacy page: it contains `Omni` and `Omni (earlier)`, retains the old `Built` maturity labels, presents the earlier case-study/section structure, and still shows “Loading contributions…”. The current branch continues to define the 14-project inventory without duplicate repository slugs, About-first navigation, and five selectable project case studies.
- The live canonical and Open Graph URL still point to `https://www.shreyashjagtap.com/`; the exact current branch `index.html` sets canonical and Open Graph URLs to `https://shreyash-portfolio.ssjagtap2016.workers.dev/`.
- The live `/api/github/activity` request again returned **HTTP 404** (`page_not_found`). The branch Worker still explicitly routes this path.
- This 9 November fetch independently confirms the deployment drift documented in section 17. No newer production deployment was established. The prior Cloudflare deployment API observation remains Worker version 19 from 23 October 2026, and the connected Cloudflare token verification still returns HTTP 401 `Invalid API Token`.
- No DNS, custom-domain, Cloudflare token, production deployment, or PR merge changes were made. Do not treat CI success or the PR branch as evidence that the public Worker has been updated.


## 21. Public activity source resilience — 2026-11-09

- The deployed diagnostics identified GitHub's unauthenticated REST public-events request returning HTTP 403 with `X-RateLimit-Remaining: 0`; GitHub supplied a reset timestamp. The Worker correctly marked that source partial and retained the last successful payload rather than fabricating event data.
- Replaced the REST Events request with GitHub's documented public user Atom timeline at `https://github.com/<username>.atom`. The parser retains only Atom entries whose IDs use GitHub's public push-event identifier form and ignores pull-request, review, issue, and other timeline entries.
- Contribution-calendar retrieval remains a separate public HTML request. Its privacy qualification is unchanged: GitHub may include anonymized private/internal daily counts when the profile owner's **Private contributions** setting is enabled; no private repository names or private event details are fetched.
- Added parser and Worker integration tests for valid push entries, ignored non-push entries, malformed Atom content, and successful persistence. No GitHub token was introduced.
- PR #4 was merged as `b9525b8843bfc06b822b1650ec899d62bfc0fc88`; exact-head CI passed and the Cloudflare production deployment was verified. The initial complete live snapshot returned `partial: false`, `stale: false`, and six public pushes. See section 22 for deployment evidence.

## 22. Atom activity feed production deployment — 2026-11-09

- PR [#4](https://github.com/shreyashjagtap157/shreyash-portfolio/pull/4) merged through a normal history-preserving merge. The initial production `main` commit was `b9525b8843bfc06b822b1650ec899d62bfc0fc88`; the subsequent commit-message normalization merge is `72cad2c1646e77c0997db0f1ae69223a94c57636`.
- Exact-head PR CI [42576973442](https://github.com/shreyashjagtap157/shreyash-portfolio/actions/runs/42576973442) passed: npm audit reported zero vulnerabilities; all 39 Vitest tests passed across three files; TypeScript and Vite production build passed; Playwright Chromium reported 77 passing tests.
- GitHub merge-commit CI [42577121709](https://github.com/shreyashjagtap157/shreyash-portfolio/actions/runs/42577121709) also completed successfully.
- Refreshed the Cloudflare Workers Builds production token and corrected the build command from `npm ci && npm run check` to `npm ci --include=dev && npm run check`. This is required because TypeScript, Vite, and the test tools are development dependencies while the Cloudflare build environment sets `NODE_ENV=production`.
- Cloudflare production build `dfb19ee3-28b7-485e-a76a-4f1aead4a50a` deployed Worker version 22 (`ad0d84a9-86cc-4bcf-8126-214114c6a099`), replacing the stale October deployment.
- A successful initial refresh wrote a complete snapshot: 366 contribution days, 8,047 contribution counts, six parsed public push records, `partial: false`, and `stale: false`. The root page served the current About-first portfolio and canonical metadata under the `workers.dev` hostname.
- The activity Worker no longer calls the quota-limited REST `/events/public` endpoint. It parses GitHub's public user Atom timeline and keeps only push-event entries. No GitHub token was added. The separate profile contribution-calendar privacy caveat remains unchanged.
- Cloudflare's automatic build trigger did not create builds for recent merges. Production deployments were started explicitly against exact `main` commits; continue verifying build history after each merge rather than assuming deployment occurred.

## 23. Atom push commit-message normalization and current refresh state — 2026-11-09

- Production KV inspection after the first Atom deployment confirmed a complete snapshot with 366 calendar days, six public pushes, 8,047 contribution counts, `partial: false`, and `stale: false`.
- That snapshot exposed empty commit-message fields because GitHub's Atom HTML places a leading newline inside `blockquote`; the parser had selected the blank line before trimming.
- Updated normalization to convert HTML `br` markers to line breaks, skip blank lines, and retain the first non-empty commit-summary line. Added a regression test matching the newline-prefixed GitHub markup.
- PR #6 merged as `72cad2c1646e77c0997db0f1ae69223a94c57636`. Exact-head CI [42579753513](https://github.com/shreyashjagtap157/shreyash-portfolio/actions/runs/42579753513) passed: zero npm vulnerabilities, 40 Vitest tests across three files, TypeScript, Vite build, and 77 Chromium browser tests.
- Deployed Worker version 23 (`c20ce6ad-b169-4619-9079-d49c20c67da1`) using Cloudflare build `15d841a5-f6a8-493c-8829-9309238546b3`; Wrangler reported successful deployment with both `ACTIVITY_KV` and `ASSETS` bindings.
- A post-deployment refresh at `2026-11-09T07:35:09Z` timed out for both GitHub upstream requests at the configured eight-second timeout. Sanitized Worker logs identify `TimeoutError` for both `contributions` and `public-events`; there was no REST Events 403/rate-limit warning on this refresh.
- The Worker correctly retained the last-good KV snapshot and served it as `partial: true`, `stale: true`; its `updatedAt` remains `2026-11-09T07:07:24.139Z`. That preserved snapshot still contains empty messages from before version 23, so successful post-fix message population is **not yet verified**.
- No fabricated commit messages, direct KV edits, GitHub credentials, or alternative event-source credentials were introduced. Retry upstream refresh after GitHub connectivity recovers; verify a new `partial: false`, `stale: false` snapshot and non-empty valid commit messages before closing this issue.



## 24. Shared automatic/manual activity refresh cooldown — 2026-11-09

- Cloudflare telemetry for Worker version 23 confirmed repeated GitHub upstream timeouts on both the contribution-calendar and public Atom sources. The last-good KV snapshot remained intact; the previous implementation throttled explicit `?refresh=1` requests but allowed ordinary stale-cache page requests to start another upstream attempt after each request.
- Extended the existing one-minute KV refresh-attempt marker to every upstream attempt, automatic or manual. The marker is read for every request that would otherwise refresh stale/missing data and is written before each upstream attempt, including failed attempts.
- When the cooldown is active and a cached snapshot exists, the Worker returns that last-good snapshot, marking it partial/stale when its five-minute freshness window has elapsed. Without a cached snapshot, automatic requests return HTTP 502 and `Retry-After`; manual refreshes retain HTTP 429 and `Retry-After`.
- Kept `updatedAt` tied to successful data, retained the six-hour payload TTL and eight-second upstream timeout, and left the Atom parser, calendar parser, KV payload format, and external data sources unchanged. Partial or failed refreshes still do not overwrite the last-good payload.
- Added two automatic-refresh cooldown regression tests and updated successful-persistence expectations to require both the one-minute attempt marker and the six-hour successful payload.
- KV eventual consistency means this is a best-effort per-location cooldown, not a globally atomic distributed lock. If KV is unavailable, the Worker cannot enforce a persistent cross-request cooldown.
- Implementation branch: `fix/activity-refresh-cooldown`. Pull-request CI, merge, Cloudflare build/deployment, and deployed behavior verification are pending at the time of this audit entry. The GitHub upstream availability problem remains unresolved; no fresh complete snapshot or non-empty post-fix messages are claimed.


## 25. Shared refresh cooldown release and production verification — 2026-11-09

- PR [#7](https://github.com/shreyashjagtap157/shreyash-portfolio/pull/7) merged through a normal history-preserving merge as `2253aa19f7729c91f2c50acaf2b36e8de81750ce`; the repository has no open PRs at this checkpoint.
- Exact-head PR CI [42589703396](https://github.com/shreyashjagtap157/shreyash-portfolio/actions/runs/42589703396) passed on `8c189fb85b5c3ab66509298d3afc9eb6145caf5b`; main merge-commit CI [42589935965](https://github.com/shreyashjagtap157/shreyash-portfolio/actions/runs/42589935965) passed on the merge commit. Both runs verified zero npm vulnerabilities, TypeScript, Vite production build, 42 Vitest tests across three files, and 77 Playwright Chromium tests.
- Cloudflare Workers Build `2dc004d3-3ff5-4e4e-9f93-caa9cef70c70` completed successfully against the exact main merge commit using `npm ci --include=dev && npm run check` and `npx wrangler deploy`.
- Cloudflare deployed Worker version 24, ID `733aa39d-24c4-4379-9138-025266652a0a`, at 100% traffic on 2026-11-09 09:01:26Z.
- Live homepage verification after deployment returned HTTP 200, the expected `workers.dev` canonical URL, About-first navigation, a hydrated case-study selector, and no duplicate `Omni (earlier)` project entry.
- The first post-deployment live activity endpoint read returned HTTP 200 with `partial: false`, `stale: false`, `updatedAt: 2026-11-09T09:02:34.220Z`, 366 contribution-day cells, the GitHub summary `8,086 contributions in the last year`, and six public push entries. All six push entries had non-empty commit summaries, including the previously blank summaries. This verifies the version-23 Atom normalization fix on a fresh successful fetch.
- The shared cooldown change is covered by unit tests for ordinary stale-cache throttling, no-cache automatic retry responses, marker persistence, and last-good snapshot preservation. A live failure-injection test against production was not performed; the Cloudflare KV cooldown is intentionally documented as best-effort because KV is eventually consistent.
- One fresh complete snapshot is verified. Do not mark sustained recovery until a second distinct successful refresh has independently produced a complete, current snapshot. Daily recovery monitoring was scheduled; it must not force refreshes or mutate production data.
- No Cloudflare token, DNS record, custom domain, GitHub profile privacy setting, or KV data was changed manually.


## 26. Sustained GitHub activity feed recovery — 2026-11-09

- Verified a second distinct post-version-24 refresh after the first snapshot's five-minute freshness period. The first complete snapshot timestamp was `2026-11-09T09:02:34.220Z`; the second was `2026-11-09T09:07:49.149Z`.
- Both live endpoint responses returned HTTP 200, `partial: false`, `stale: false`, 366 contribution-day cells, and six public push records. All six public push records had non-empty commit summaries on both snapshots.
- The contribution summary advanced from `8,086 contributions in the last year` to `8,093 contributions in the last year`, corroborating that the second response was a distinct successful refresh rather than another read of the first cached payload.
- This satisfies the previously defined two-consecutive-fresh-complete-snapshots recovery criterion. The Atom commit-message normalization fix and the automatic/manual refresh cooldown are verified in production at this checkpoint. This does not guarantee that future GitHub requests cannot time out; the stale fallback and cooldown remain the outage behavior.
- The temporary daily recovery automation was disabled after the stopping condition was met. No recurring monitoring remains enabled.


## 9. Professional narrative and current project-evidence refresh — 2026-11-09

- Refined the first-person introduction to emphasize the user's demonstrated method: research the problem, state assumptions and constraints, specify expected behavior, build an implementation, and verify it with evidence.
- The professional positioning now spans programming languages and compilers, systems architecture, symbolic cognitive computing, agent platforms, and backend products. It does not invent a formal architect title, proficiency rankings, impact metrics, or production achievements.
- Updated Omni's card and localized case study using the latest inspected `main` head `27c55651d8d20c4d46d1fb28a3c440770b9d4363`. At that head, Rust, Clippy, security-audit, and CodeQL workflows passed; the aggregate Omni CI pipeline and fuzz-dependency workflow failed. The compiler remains early-stage, with formal foundation sign-off, complete-language conformance, production readiness, and self-hosting unresolved.
- Identified a stale evidence statement in Omni's own README: it refers to earlier head `3902f6d...` as the full-pipeline success checkpoint, which must not be carried forward to the newer `27c5565...` head without fresh matching workflow evidence.
- AstraVCS is not included in the public project grid yet. Its live public repo says it is a handoff/documentation shell missing the Rust workspace, Python reference implementation, tests, conformance programs, normative source files, and original Git history. Its historical requirement-status figures are explicitly not independently revalidated.
- The selected-work inventory remains 14 unique projects; no placeholder or incomplete handoff repository was added just to increase the count.


## 10. PR #11 browser-suite fixture correction — 2026-11-09

- The first CI run for PR #11 passed dependency audit, TypeScript, unit tests, and production build.
- Chromium browser tests reported 72 passed and five failed. All five failures were the expected Omni case-study introduction strings in the existing locale test fixture; the rendered copy matched the updated dictionaries. No application runtime or layout regression was indicated by those failures.
- Updated the expected introduction prefixes in `tests/portfolio.spec.ts` for English, German, French, Hindi, and Marathi to match the revised localized case-study copy. The test still asserts the rendered case-study content in every supported locale.
- The browser suite must be rerun before merge; this fixture correction is not itself a passing result.

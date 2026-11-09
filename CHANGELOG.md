# Changelog

## 2026-11-06 — Portfolio engineering and content refresh

### Implemented in the review branch

- Rebuilt project cards with semantic article structure, independent repository links, category filters, and hash-routed detail pages.
- Set the selected-work inventory to exactly 14 unique repositories: 4 systems/languages, 5 AI/agents, and 5 platforms/web.
- Added Helios as a concept/specification-stage project and described the intended entirely non-neural symbolic core. Frozen foundation models remain perception-only peripherals; outputs are untrusted, provenance-bearing observations. No Helios runtime is claimed.
- Removed the duplicate legacy Omni project entry and described Omni as an early-stage specification-governed Rust compiler/toolchain; self-hosting remains a roadmap target.
- Corrected project maturity language and removed unused maturity labels so concepts, alpha work, candidates, prototypes, and active implementation are not conflated.
- Corrected the project-detail key map and validated one detail entry per selected project.
- Replaced the old contribution chart/feed behavior with a same-origin Cloudflare Worker endpoint that parses GitHub's public contribution-calendar HTML and push entries from GitHub's public user Atom timeline.
- Added validated contribution dates/levels, safe event parsing, commit SHA validation, an eight-second upstream timeout, a six-hour Cloudflare KV-backed last-good snapshot with five-minute freshness, visibly stale fallback for upstream outages, and a separate one-minute manual-refresh cooldown marker.
- Added an explicit partial/stale activity warning instead of presenting stale data as fully current.
- Made top navigation horizontally scrollable, keyboard focusable, and visibly scrollable on narrow screens.
- Improved responsive project cards, tags, contact layout, control touch targets, dropdown empty states, language-switch race handling, and reduced-motion support.
- Updated metadata, canonical/Open Graph/Twitter URLs, social preview artwork, sitemap, robots, and security headers to use the existing Cloudflare Workers URL. No custom domain is needed.
- Added locale consistency, content inventory, Worker normalization/cache-policy tests, and browser regression coverage.
- Added CI to run typecheck, unit tests, production build, and the Chromium browser suite.

### Cloudflare deployment model

- Production target: the existing `shreyash-portfolio` Cloudflare Worker with its free `workers.dev` hostname.
- The GitHub repository is connected to Cloudflare Workers Builds.
- Production builds are configured to verify/typecheck/unit-test/build and deploy through Wrangler to Cloudflare; browser acceptance remains gated by GitHub Actions CI.
- No non-Cloudflare hosting provider is used.

### Previous verified checkpoint

GitHub Actions run [42258764088](https://github.com/shreyashjagtap157/shreyash-portfolio/actions/runs/42258764088) passed on commit `4210968c2d9ff3e4554b5fa425834fbbe72464c2`: 19 unit tests, production build, and 62 Chromium browser tests across the responsive matrix and interaction checks.

The subsequent stale-cache hardening and partial-state test changes require a new CI run before publication.

## Known cross-repository contradictions and owner decisions

- **Helios specification conflict:** the public Helios README currently prohibits pretrained neural models/model inference services, while the newer intended architecture allows frozen models only for perception and treats their outputs as untrusted observations. The Helios repository's canonical README/master specification still needs an explicit owner-approved reconciliation.
- **Kilo fork documentation:** the public Kilo fork README still describes upstream Kilo Code. Portfolio language deliberately identifies the selected item as a personal fork and does not attribute experimental swarm/NVIDIA NIM changes to upstream.
- **Additional project inclusion:** Miner and PromptWars-Virtual-2 remain excluded pending owner confirmation.
- **Optional profile content:** separate professional email and headshot remain optional owner decisions.

No Lighthouse score is advertised until a fresh report exists for the final deployed Cloudflare build.


## 2026-11-07 — About, case studies, activity persistence, and documentation corrections

### Portfolio presentation and content
- Added About as the first primary navigation item and verified its target.
- Added selectable, distinct case studies for Omni, Helios, NexusAgent, Universal Education Platform, and the personal Kilo Code fork.
- Added conceptual architecture illustrations in place of project initials; they are not presented as screenshots or proof of deployed systems.
- Localized the case-study copy and LinkedIn, GitHub, and telephone contact descriptions in English, German, French, Hindi, and Marathi.
- Kept the selected-work inventory at 14 unique repositories with explicit maturity labels and no unsupported production claims.

### GitHub activity and local development
- Replaced the initial Cache API persistence approach with Cloudflare KV, appropriate to the configured `workers.dev` target.
- Store only the last fully successful normalized activity snapshot for up to six hours; use a five-minute freshness window, stale fallback on partial upstream failure, and a separate one-minute refresh-attempt marker. The profile calendar may include anonymized private/internal counts when GitHub's **Private contributions** setting is enabled; the public Atom timeline parser retains only push entries and ignores other activity types.
- Document KV's eventual-consistency boundary and avoid claiming it is a globally atomic rate limiter.
- Make `npm run dev` build the static assets and run the actual Worker locally; retain `npm run dev:ui` for UI-only Vite hot reload with a Worker proxy.

### Dependency security and documentation
- Remediated the vulnerable transitive Wrangler/Miniflare/Undici lockfile chain using compatible patch/minor resolutions; the current CI dependency audit reports zero advisories.
- Added a fail-closed dependency-audit gate in GitHub Actions.
- Reconciled README, design rules, local-agent handoff, and the issue ledger with the KV-backed activity architecture and current deployment blocker.

### Verification and publication status
- The latest CI baseline before these final documentation-only reconciliations was commit `e58b0a272c4e573940126278bd8203abc55e145e`: push run [42390253333](https://github.com/shreyashjagtap157/shreyash-portfolio/actions/runs/42390253333) and pull-request run [42390256087](https://github.com/shreyashjagtap157/shreyash-portfolio/actions/runs/42390256087) both passed, including 33 unit tests, 77 Chromium browser tests, typecheck, production build, and the zero-advisory npm audit.
- PR #2 remains open against `main`; no merge or production deployment is claimed.
- Cloudflare production deployment remains blocked by the selected Workers Builds token whose underlying API token Cloudflare reports as deleted or rolled. The separate project audit records the exact build failure and required owner action.


## 2026-11-09 — GitHub contribution-calendar privacy qualification

- Clarified the difference between a publicly rendered GitHub profile contribution calendar and GitHub's public user Atom timeline, filtered to push entries.
- Documented that the profile calendar may expose anonymized daily counts from private/internal repositories when the owner's GitHub **Private contributions** setting is enabled; the Worker stores calendar dates, levels, and summary but does not fetch private repository names or private event details.
- Recorded the owner action required for strict public-repository-only output: disable **Private contributions** under GitHub profile → Contribution settings. The setting was not inspected or changed.
- Updated the visible contribution-calendar footnote in all five locales to explain anonymized private contributions, and added a locale regression test.


## 2026-11-09 — Production deployment recheck

- Rechecked the public Cloudflare Worker root and same-origin activity API after the privacy and localization corrections. The root still serves the legacy portfolio with duplicate Omni content, legacy maturity labels, and old canonical/Open Graph metadata; `/api/github/activity` still returns HTTP 404.
- Confirmed branch source metadata and Worker route remain correct. Deployment is still blocked on Cloudflare credential recovery; no alternate hosting, DNS change, merge, or deployment was attempted.

## 2026-11-09 — Atom push feed and successful production deployment

- Replaced the unauthenticated REST public-events request with GitHub's documented public user Atom timeline; the Worker retains only push entries and ignores all other timeline activity.
- Added Atom parsing, safe repository/branch/commit extraction, failure diagnostics, and regression tests. The public contribution-calendar source and its privacy disclosure are unchanged.
- Refreshed the Cloudflare Workers Builds production token and changed the production build command to `npm ci --include=dev && npm run check`, ensuring the development toolchain is installed in Cloudflare's production build environment.
- Merged PR #4 as `b9525b8843bfc06b822b1650ec899d62bfc0fc88`. Exact-head and merge-commit CI passed; the exact-head suite reported 39 unit tests, 77 Playwright tests, typecheck/build success, and zero npm vulnerabilities.
- Deployed Cloudflare Worker version 22 (`ad0d84a9-86cc-4bcf-8126-214114c6a099`). A fresh live endpoint response returned `partial: false`, `stale: false`, and six recent public pushes.

## 2026-11-09 — Atom push commit-message normalization

- Skip leading whitespace-only lines in GitHub Atom push markup and retain the first non-empty commit summary.
- Added a regression test for GitHub's newline-prefixed `blockquote` formatting.
- Deployed Worker version 23 (`c20ce6ad-b169-4619-9079-d49c20c67da1`) from `main` commit `72cad2c1646e77c0997db0f1ae69223a94c57636`. Exact-head CI passed: 40 unit tests, 77 Playwright tests, TypeScript/build success, and zero npm advisories.
- The first post-deployment refresh timed out for both the contribution-calendar and Atom upstream requests at eight seconds. The Worker preserved the last-good KV snapshot and returned `partial: true`, `stale: true`; commit-message extraction is deployed but not yet verified against a successful post-fix refresh.


## 2026-11-09 — Shared GitHub activity refresh cooldown

- Extended the existing one-minute KV refresh-attempt marker to cover ordinary automatic refreshes as well as explicit manual refreshes. The stale-cache request path now observes the same cooldown, avoiding repeated upstream requests on each visitor request during a GitHub outage.
- Every upstream attempt records the marker before fetching, including attempts that fail. The last-successful payload and its `updatedAt` timestamp remain independent; partial or failed responses still never overwrite the last-good snapshot.
- During an active cooldown, a stale cached payload is returned with `partial: true` and `stale: true`. Without a cached payload, automatic requests return HTTP 502 and a `Retry-After` header; explicit manual refreshes return HTTP 429 and the same retry guidance.
- The cooldown remains best-effort because Cloudflare KV is eventually consistent. The eight-second upstream timeout, public Atom source, contribution-calendar source, and public-data validation rules are unchanged.
- Regression tests cover automatic cooldown handling with and without a cached payload and verify that successful refreshes persist both the attempt marker and the complete snapshot.
- PR [#7](https://github.com/shreyashjagtap157/shreyash-portfolio/pull/7) merged through a normal history-preserving merge as `2253aa19f7729c91f2c50acaf2b36e8de81750ce`. Exact-head PR CI [42589703396](https://github.com/shreyashjagtap157/shreyash-portfolio/actions/runs/42589703396) and main merge-commit CI [42589935965](https://github.com/shreyashjagtap157/shreyash-portfolio/actions/runs/42589935965) both passed: 42 Vitest tests across 3 files, TypeScript, Vite build, 77 Playwright Chromium tests, and zero npm vulnerabilities.
- Cloudflare Workers Build `2dc004d3-3ff5-4e4e-9f93-caa9cef70c70` succeeded against the exact merge commit and deployed Worker version 24 (`733aa39d-24c4-4379-9138-025266652a0a`) to 100% production traffic.
- The first post-deployment activity refresh returned HTTP 200, `partial: false`, `stale: false`, 366 contribution days, 8,086 contributions in the last year, and six public push entries with all six commit summaries populated. Snapshot timestamp: `2026-11-09T09:02:34.220Z`.
- A second distinct refresh after the five-minute freshness interval also returned HTTP 200, `partial: false`, `stale: false`, 366 contribution days, 8,093 contributions in the last year, and six of six populated public push summaries. Snapshot timestamp: `2026-11-09T09:07:49.149Z`. Two consecutive complete snapshots were therefore verified; the temporary daily recovery monitor was disabled after reaching its stopping condition.


## 2026-11-09 — Research-led professional narrative and Omni evidence refresh

- Reworked the English, German, French, Hindi, and Marathi hero copy to communicate the engineering method: investigate first, define assumptions and boundaries, specify intended behavior, implement in controlled milestones, and verify with reproducible evidence.
- Updated the role label to **Systems & Software Engineer**, a descriptive portfolio positioning rather than an asserted employment title.
- Expanded the Omni project summary and case study to cover research-led specification work, testing the specification through prototypes and implementation, and the distinction between component checks and language-wide qualification.
- Reconciled the Omni description to the latest inspected main head `27c55651d8d20c4d46d1fb28a3c440770b9d4363`: Rust, Clippy, security audit, and CodeQL passed, while the aggregate Omni CI pipeline and a fuzz-dependency workflow failed. Formal foundation sign-off, complete-language conformance, production readiness, and self-hosting remain open.
- Kept AstraVCS out of the selected work because its public repository is currently a documentation/handoff shell with its executable source and test suites not imported.
- Preserved the 14-project curated inventory and the five-locale identical-key-set requirement.
- Review branch: `content/engineering-profile-omni-refresh`. Production deployment is not claimed by this changelog entry; it is contingent on review, CI, merge, and Cloudflare Workers Builds verification.


### PR #11 validation follow-up

- The first PR CI run passed dependency audit (zero npm advisories), TypeScript, unit tests, and the production build, then reported 72 passing and five failing Chromium tests.
- All five failures were stale expected text in the existing localized Omni case-study browser-test fixtures (one per locale), not a mismatch between the rendered page and locale dictionaries.
- Updated the five fixture expectations. A full rerun is required before the change is accepted or deployed.

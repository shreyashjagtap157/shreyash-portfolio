# Changelog

## 2026-11-06 — Portfolio engineering and content refresh

### Implemented in the review branch

- Rebuilt project cards with semantic article structure, independent repository links, category filters, and hash-routed detail pages.
- Set the selected-work inventory to exactly 14 unique repositories: 4 systems/languages, 5 AI/agents, and 5 platforms/web.
- Added Helios as a concept/specification-stage project and described the intended entirely non-neural symbolic core. Frozen foundation models remain perception-only peripherals; outputs are untrusted, provenance-bearing observations. No Helios runtime is claimed.
- Removed the duplicate legacy Omni project entry and described Omni as an early-stage specification-governed Rust compiler/toolchain; self-hosting remains a roadmap target.
- Corrected project maturity language and removed unused maturity labels so concepts, alpha work, candidates, prototypes, and active implementation are not conflated.
- Corrected the project-detail key map and validated one detail entry per selected project.
- Replaced the old contribution chart/feed behavior with a same-origin Cloudflare Worker endpoint that parses GitHub's public contribution-calendar HTML and recent public PushEvents.
- Added validated contribution dates/levels, safe event parsing, commit SHA validation, an eight-second upstream timeout, a six-hour edge-retained cache with five-minute freshness, stale fallback for upstream outages, and a one-minute manual-refresh cooldown.
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

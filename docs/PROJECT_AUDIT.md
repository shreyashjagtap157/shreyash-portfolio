# Portfolio project audit and issue ledger

**Audit date:** 2026-11-06  
**Repository:** `shreyashjagtap157/shreyash-portfolio`  
**Review branch:** `work/portfolio-quality-refresh`  
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

1. Obtain a green GitHub Actions run for the latest Worker/cache hardening commit.
2. Confirm Cloudflare Workers Builds can build and deploy this repository using the existing free Worker hostname.
3. Verify the live page, API response, cache/refresh behavior, headers, and browser console after Cloudflare deployment.
4. Review the final live site with the owner and resolve project inclusion decisions (Miner/PromptWars) and external documentation contradictions (Helios/Kilo).

No final "fully complete" claim is made until the latest CI and deployed Cloudflare smoke tests are green.


## 10. About navigation, case studies, project visuals, and local development (2026-11-07)

- Added an **About** navigation anchor before Projects, targeting the hero/about statement.
- Expanded the content container to 80rem. Desktop navigation uses a wider single-row layout and hides its scrollbar; narrower layouts retain a visible horizontal scrollbar.
- Replaced project initials with conceptual SVG architecture illustrations rather than arbitrary monograms. These are explicitly conceptual visuals, not screenshots of deployed products.
- Added a project selector with distinct case studies for Omni, Helios, NexusAgent, UEP, and the Kilo fork. Each case study distinguishes verified maturity from intended architecture and roadmap work.
- Rewrote engineering approach around repository/spec inspection, explicit constraints, coherent milestones, complete verification, and evidence-based reporting.
- Added explanatory labels to LinkedIn, GitHub, and telephone contact links.
- Local development now runs the actual Cloudflare Worker with built assets (`npm run dev`), so `/api/github/activity` is served locally by Wrangler rather than failing against Vite's static dev server. `npm run dev:ui` remains available for UI-only work, with API proxying to a separately running Worker on port 8787.
- Activity UI now surfaces stale-cache state distinctly and avoids showing an empty-feed message after a network error.

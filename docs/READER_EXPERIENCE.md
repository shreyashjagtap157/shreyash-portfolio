# Reader paths and easter-egg implementation

**Status:** Implemented on `main` and deployed to Cloudflare Worker v29; desktop page-render smoke test passed; mobile/accessibility production checks and manual locale review remain open  
**Implementation date:** 11 November 2026  
**Design decision date:** 11 November 2026  
**Production target:** Existing Cloudflare Workers Static Assets deployment

## 1. Product principle

Build one truthful portfolio with multiple reading paths. Readers choose how information is organized and emphasized; the portfolio does not identify visitors, guess their job, or create different facts for different audiences.

Balanced is the default. Hiring managers and recruiters, engineers, and research-oriented readers can choose a presentation that fits their current purpose. Every reader retains access to the same projects, case studies, evidence, source links, and qualification limits.

## 2. Implemented reading lenses

| Lens | First emphasis | Content that remains available |
|---|---|---|
| Balanced (default) | Profile, selected work, technical depth | Experience, projects, case studies, skills, approach, activity, and contact |
| Overview | Experience and education, selected work, practical context | Full case studies, engineering approach, project maturity, and source links |
| Engineering | Projects, case studies, implementation activity, skills | Research approach, experience, evidence, known limitations, and contact |
| Research | Engineering approach, project context, case studies | Full project details, implementation evidence, skills, experience, and activity |

These are reading preferences, not user types or eligibility categories. A reader can be a recruiter and choose Engineering, or an engineer and choose Overview.

The selector is placed in the site header near the portfolio identity. It uses labeled buttons and an explicit selected state. The hero introduction and primary-navigation order adapt to the current selection. The selected view is saved under the versioned browser-local key `reader-view-v1`. When storage is unavailable, the selector still works for the current page session. Balanced is directly selectable as the reset action.

**No project is removed by a lens.** All 14 selected repositories, the same project maturity labels, the seven case studies, qualification caveats, and contact routes remain available. A lens changes presentation order and introductory emphasis, not truth, maturity, source links, URL, route, or browser history. The site does not infer visitor profession or send the preference to a remote service.

## 3. Shared content and truth constraints

The portfolio uses shared project records and localized presentation copy. Each project retains its identity, repository, category, maturity, description, and available case-study evidence across every lens.

The implementation must not:
- Derive unverified business outcomes, user counts, savings, benchmarks, production use, or proficiency claims.
- Present a planned capability as implemented.
- Upgrade a maturity label because a feature appears in the portfolio.
- Hide an unresolved qualification gate in Overview mode.
- Attribute fork-specific work to an upstream project.

The Kilo Code case study now reflects the public fork's committed specialist-agent and swarm implementation. It distinguishes the earlier M2-focused passing workflow from the still-unqualified M3 execution/reviewer work, and labels NVIDIA NIM routing experimental. This description is aligned across English, German, French, Hindi, and Marathi. The same source-attribution rule applies to all project case studies.

## 4. Safe portfolio console

The optional console is a native `details/summary` disclosure, not a shell or terminal session. It accepts only a fixed list of own-property command keys with prewritten local responses. Input is bounded, normalized, rendered as text, and rejected safely when it is not in the list. Unknown input cannot be evaluated or executed.

Commands:
- `help`, `about`, `projects`, `principles`, `omni`, `selfhost`
- Hidden discoveries: `sudo`, `42`, `constellation`

The console performs no shell invocation, dynamic evaluation, file access, network request, telemetry, or privileged operation. The copy explicitly identifies the panel as a harmless fixed-response toy and preserves project maturity caveats.

The disclosure is touch- and keyboard-operable. Pressing Escape while focus is inside an open console closes it and returns focus to the summary control. It does not trap focus or cover the page. Reduced-motion styling is respected.

## 5. Localization

Reader controls, helper copy, hero introductions, console commands, and responses are present in the five built-in locale dictionaries: English, German, French, Hindi, and Marathi. Automated checks enforce key parity and prevent missing reader/console strings.

**Editorial qualification remains open:** matching keys and automated browser assertions do not prove natural language quality. A final terminology and fluency review by competent speakers is still needed, particularly for compiler, runtime, specification, qualification, provenance, symbolic reasoning, perception, memory, and mixed technical terminology. Do not claim native-speaker review has occurred until it has.

## 6. Verification record

The exact implementation head `fdef8c9b9c189a652ffa354fbac5cc937efdb8df` passed GitHub Actions run [43026668267](https://github.com/shreyashjagtap157/shreyash-portfolio/actions/runs/43026668267):

- Dependency security audit passed; npm reported zero vulnerabilities.
- TypeScript check passed.
- Vitest: 45 tests passed across 3 files.
- Production build passed.
- Chromium Playwright: 93 tests passed.

The browser suite covers the four reader orders, project availability and maturity, local preference persistence and storage-unavailable fallback, five locale controls, hero and navigation changes, safe command handling, inherited-property rejection, keyboard-only operation, URL/history stability, 360-pixel touch operation, responsive layout, reduced motion, and existing portfolio behavior. Escape-key closure and focus restoration are covered in the follow-up hardening change.

The final merged main head 8afdcefa65fa882fdfa5f0854aee6cce58a96226 passed post-merge GitHub Actions run [43028148893](https://github.com/shreyashjagtap157/shreyash-portfolio/actions/runs/43028148893), including the Escape/focus-restoration regression. That exact commit was deployed by Cloudflare Workers Build bd156174-db59-4aed-a477-2892d9bf5287 as Worker v29 (47a3bb11-5080-4039-9df9-346c677dd6d0), with 100% production traffic. Cloudflare Browser Rendering then fetched the production page at a 1440×1000 viewport and returned HTTP 200, the expected title/final URL, the main content region, Balanced as the default, and all four view labels. Its immediate mobile and accessibility-tree follow-ups were rate-limited (HTTP 429), so live mobile visual/accessibility behavior was not independently verified. Keyboard, touch, Escape, and responsive interactions were covered by the successful merged-main Playwright run.

## 7. Acceptance status

| Acceptance criterion | Status | Evidence / remaining work |
|---|---|---|
| Balanced is the useful first-visit default | Pass | Default state and browser assertion |
| All four lenses switch without reload or route/history change | Pass | View and URL/history browser tests |
| Local persistence and storage-unavailable fallback | Pass | Browser tests |
| Project maturity and qualification caveats remain available | Pass | All 14 projects remain rendered; factual content unchanged |
| Overview retains a clear route to detailed evidence | Pass | Case studies and engineering/research sections remain available |
| Five locales have complete automated keys and controls | Automated pass | Manual terminology and fluency review remains open |
| Console is fixed-response and non-executing | Pass | Closed command map, source review, and negative-input tests |
| Touch, keyboard, focus, Escape, and reduced motion | Pass after hardening | Browser regression tests |
| Existing portfolio regression suite | Pass on merged `main` | Post-merge run 43028148893 passed the 94-test browser suite |
| Production deployment control-plane verification | Pass | Cloudflare Build bd156174-db59-4aed-a477-2892d9bf5287 succeeded; Worker v29 receives 100% traffic |
| Desktop production page-render smoke test | Pass | Cloudflare Browser Rendering returned HTTP 200, expected title, main region, Balanced default, and four view labels at 1440×1000 |
| Mobile/accessibility production smoke test | Pending | Follow-up Cloudflare Browser Rendering requests returned HTTP 429; verify from a normal browser |

## 8. Release sequence

1. **Completed:** the implementation and evidence PRs are merged to main.
2. **Completed:** post-merge GitHub Actions passed on exact main SHA 8afdcefa65fa882fdfa5f0854aee6cce58a96226.
3. **Completed:** the existing Cloudflare Workers Builds trigger deployed that exact commit without changing hosting, bindings, secrets, DNS, KV, or deployment configuration.
4. **Completed:** Cloudflare build bd156174-db59-4aed-a477-2892d9bf5287 succeeded; Worker v29 receives 100% production traffic. The release record contains the exact commit, version ID, and deployment timestamp.
5. **Partially completed:** the desktop production page-render smoke test confirmed HTTP 200, the Balanced default, and all four view labels. **Still open:** verify mobile rendering, the accessibility tree, locale switching, project links, activity feed, and live console command/Escape interactions from a normal browser. Cloudflare rate-limited the follow-up mobile/accessibility requests.
6. **Still open:** complete the manual locale terminology and fluency review as a separate editorial qualification item.

No production readiness, native-speaker validation, or live deployment claim should be made without its corresponding evidence.

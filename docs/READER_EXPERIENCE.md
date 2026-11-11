# Reader paths and easter-egg design

**Status:** Approved direction; implementation not yet started  
**Decision date:** 11 November 2026  
**Applies to:** Public portfolio at the existing Cloudflare Workers Static Assets deployment

## 1. Product principle

Build one truthful portfolio with multiple reading paths. Readers choose how information is organized and emphasized; the portfolio does not try to identify them, guess their job, or create separate facts for separate audiences.

The balanced presentation is the default. Hiring managers/recruiters, engineers and research-oriented readers can then select a reading lens that fits their current purpose. Every visitor retains access to the same complete evidence.

## 2. Reading lenses

| Lens | Primary reader need | First emphasis | Deeper content |
|---|---|---|---|
| Balanced (default) | Understand the person and inspect the work | Clear profile, selected work and maturity | Case studies, architecture, research and validation |
| Overview | Quickly evaluate professional relevance | Role, experience, contribution, practical context and contact | Technical explanations remain available through progressive disclosure |
| Engineering | Understand how systems are built | Architecture, interfaces, implementation and design decisions | Tests, CI evidence, code links, failure modes and limitations |
| Research | Understand why a system is designed a certain way | Problem, assumptions, constraints and specifications | Alternatives, methods, evidence, open questions and research roadmap |

These are reading preferences, not user types or eligibility categories. A reader can be a recruiter and still choose Engineering, or an engineer and still choose Overview.

## 3. Shared content model

Each project uses one factual record, then presentation blocks:

- **Identity:** project name, repository, category and canonical links.
- **Maturity:** research/specification, prototype, alpha, candidate, in-progress or qualified; use only supported states.
- **Overview:** problem, purpose, contribution and current state in plain language.
- **Engineering:** architecture, implementation, tools, interfaces, tests and operational constraints.
- **Research:** assumptions, specifications, methods, alternatives, evidence and unresolved questions.
- **Provenance:** repository revision, relevant documentation/workflow links, last verification date and reviewer confidence.

Facts and maturity are shared across all lenses. Lens-specific blocks may change order, emphasis and summary density only. Do not derive unverified business outcomes, user counts, savings, benchmarks, production use or proficiency claims.

## 4. Interaction model

- Add a clearly labeled “Reading view” control near the opening content, not another crowded toolbar menu.
- Choices: Balanced, Overview, Engineering, Research.
- Balanced is the first-visit default.
- Persist a versioned preference in local browser storage; if storage is unavailable, keep the control functional for the current page session.
- Provide a direct “Reset to Balanced” action.
- Do not infer the lens using referrer, device, browser fingerprint, IP address, external identity, or analytics.
- Switching a lens must not modify the URL, page route, GitHub data, or browser history.
- Preserve all core information and links. Overview may collapse detail panels, but must clearly disclose that more detail is available.
- Use semantic controls, visible focus, keyboard operation, touch targets and clear selected-state announcements.

## 5. Page-level presentation

### Balanced
Profile and a concise engineering statement first. Show selected work, clear maturity labels and the seven implementation-focused case studies. Technical and research sections remain present and discoverable.

### Overview
Bring experience, demonstrated contribution and concise project summaries forward. Use plain explanations of technical work. Keep project maturity and release limitations visible. Make résumé, repository and contact links easy to find. Do not invent impact metrics or overstate delivery.

### Engineering
Prioritize selected projects with implementation evidence, architecture diagrams, component boundaries, interfaces, design decisions, verification results and source links. Distinguish code present from code tested and tested from production-qualified.

### Research
Prioritize research-stage projects and the reasoning behind them. Explain problem framing, explicit assumptions, constraints, specifications, alternative designs, validation approach and unanswered questions. Clearly mark intended architecture versus implemented systems.

## 6. Easter-egg direction

Easter eggs should reward curiosity and reinforce the portfolio's engineering personality without becoming a gimmick.

### Primary concept: safe portfolio console
An optional terminal-style panel with a fixed command vocabulary, such as:
- `help` — show the available commands.
- `about` — explain the portfolio's engineering approach.
- `projects` — show a concise project index and maturity labels.
- `principles` — show the research/specification/implementation/verification principles.
- `omni` — show a factual, current, explicitly qualified Omni status.
- `selfhost` — show that self-hosting is a roadmap goal, not a completed capability.

The console must use a fixed parser and local predefined responses. It must never evaluate arbitrary text, invoke a shell, execute code, access the filesystem, call network endpoints, or expose internal/private data. Unknown input returns a safe help response.

### Secondary discoveries
Consider a small project constellation or a hidden engineering note that links related work. Every discovery should have a visible or touch-accessible path as well as any optional keyboard shortcut. Avoid a keyboard-only secret sequence.

### Safety and usability constraints
No automatic launch, audio, blocking overlays, external API calls, telemetry, deceptive status messages, or fabricated achievements. Support mobile, keyboard, screen readers, focus restoration, Escape dismissal and reduced-motion settings. Easter eggs must be optional and must never contain information necessary to understand the work.

## 7. Five-language requirements

Every visible control, helper text, status message and console response must be present in English, German, French, Hindi and Marathi. Do not treat identical key counts as proof of translation quality. Have a terminology pass for engineering terms, especially compiler, runtime, specification, qualification, symbolic reasoning, provenance, perception, and memory.

## 8. Acceptance criteria

1. Balanced is the initial default and is useful without changing any setting.
2. All four lenses can be switched without reload and without changing routes or factual project data.
3. The preference survives reload when local storage is available; the site remains usable when it is not.
4. All project maturity and qualification warnings remain visible in every lens.
5. Engineering and Research views expose detailed evidence and limitations; Overview provides a clear route to those details.
6. All five built-in locales have complete labels and helper text, with manual terminology review.
7. The console is a closed, harmless command interpreter with no arbitrary execution or network access.
8. Easter eggs are reachable by touch and keyboard, never auto-launch, and pass accessibility/reduced-motion checks.
9. Existing responsive, locale, theme, density, route, activity-feed and security tests continue to pass.
10. No production deployment occurs until the implementation PR, CI and explicit production review gates are complete.

## 9. Delivery sequence

1. Finalize the project evidence register and shared content schema.
2. Implement the reading preference state/control and the Overview/Engineering/Research presentation blocks.
3. Localize all new content and controls; add automated locale and lens tests.
4. Implement the safe portfolio console and one secondary discovery only after the reading paths pass.
5. Run full CI and browser review across viewports, themes, density modes and locales.
6. Open a focused PR for review; keep it separate from deployment.

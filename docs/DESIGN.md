# Design specification

## Goal
Futuristic, state-of-the-art, enterprise-grade single-page portfolio. Structure modelled on parthghayal.com: strong hero with an interactive-feeling technical visual, project cards, case study, skills, experience, contact. All content must be real and verifiable.

## Layout
- Top block: logo + name in large type at the left (clamp 1.9rem to 3.4rem); right-aligned details (location, email, phone, LinkedIn, GitHub, résumé). Two-column grid, stacks on screens under 56rem.
- Sticky toolbar under it: section navigation on the left, three dropdowns on the right (Theme, Language, Density). Each dropdown button shows its label plus the currently selected name.
- Hero (two columns): headline, subtitle, two buttons; right side a themed visual panel.
- Sections in order: Projects (filters + equal-height card grid), Case study (Omni pipeline + bullets), Skills (grouped tags), Experience and education, Contact.
- Everything uses grid or flex, rem units and spacing tokens. Container is `min(100% - 2*gutter, 72rem)`.

## Themes (color, type, shape; switched via `data-theme`)
| Theme | Background | Accent / accent 2 | Font | Radius | Visual |
|---|---|---|---|---|---|
| Void | #070b10 | #22d3ee / #22d3ee | JetBrains Mono | small | terminal build log, grid background |
| Orbital | #05030f | #8b7cff / #22d3ee | Sora (light) | large | pulsing agent-swarm node graph, starfield |
| Blueprint | #f1f5fb | #0d2a57 / #c2272d | IBM Plex Sans + Mono | tiny | spec to self-host flow, drafting grid (the only light theme) |
| Aurora | #0a0d14 | #14b8a6 / #a78bfa | Manrope (heavy) | xlarge | frosted glass cards over aurora gradients |

## Theme-switch animations (View Transitions API, clip-path reveal on the new theme)
- Void: top-to-bottom scan, 900 ms.
- Orbital: circle expanding from the dropdown button, 1000 ms.
- Blueprint: left-to-right wipe, 800 ms.
- Aurora: circle rising from bottom centre, 1100 ms.
Instant switch when `prefers-reduced-motion` is set or the API is unsupported.

## Density (independent of theme, via `data-density`)
| Mode | Root font | Spacing scale `--s` | Control height |
|---|---|---|---|
| Compact | 13.5px | 0.7 | 2rem |
| Comfortable (default) | 15px | 1 | 2.4rem |
| Spacious | 16.5px | 1.4 | 2.9rem |
Tokens live in `src/styles/theme.css`; spacing derives from `--s`.

## Dropdowns
Custom accessible listbox: button with `aria-haspopup`, popup `role=listbox`, arrow keys, Home/End, Enter, Escape, click-outside, scroll active option into view. The language dropdown is searchable and shows "Built-in" or "Browser translation" per language. Popup anchors to the inline end edge and flips start-aligned on mobile.

## Languages
- Built-in, hand-translated: English, Hindi, Marathi, German, French.
- Any other language in the list (about 45 more) uses the browser's on-device Translator API (Chromium) and is cached in localStorage; if unavailable, show a notice and a link to a translated copy.
- Default language: browser preference. Manual choice is remembered. RTL languages set `dir=rtl`.
- Project names, tech tags and personal names carry `translate="no"`.

## Quality bar
- WCAG 2.2 AA: contrast in all themes, visible focus, keyboard access, skip link, reduced motion.
- Security: strict CSP and headers in `public/_headers`, no inline scripts, no third-party requests, fonts self-hosted.
- Performance: static output, system-friendly font subsets, no tracking.
- Privacy: city only, phone and email assembled at runtime, no cookies.

# Prompt for your coding agent (Claude Code or similar)

Paste everything below the line into the agent, run from the project root.

---

You are continuing a portfolio website for **Shreyash Satish Jagtap**. Read `README.md`, `docs/DETAILS.md` and `docs/DESIGN.md` first; they are the source of truth for content and design.

## Current state
A working React 19 + TypeScript + Vite single-page site already exists in this folder. It has four themes (Void, Orbital, Blueprint, Aurora) with animated switching, three density modes (compact, comfortable, spacious), a header with a large name and logo at top-left and contact details top-right, a sticky toolbar with three dropdowns (Theme, Language, Density) that each show the current value, 14 projects with category filters, a case study, skills, experience, and contact. i18n has five hand-written locales plus on-device machine translation for other languages. It builds cleanly (`npm run build`). The layout has NOT been verified visually in a browser.

## Your tasks, in order
1. Run `npm install` and `npm run dev`. Open the site and check every theme x every density at widths 360, 768, 1024 and 1440 px. Fix any misalignment, overflow, overlap or inconsistent spacing. Everything must be laid out with grid or flex and rem or token units, never fixed pixel positions.
2. Verify the three dropdowns: keyboard (arrows, Home, End, Enter, Escape, Tab), screen-reader roles, click-outside, long language list with search, no clipping on mobile or in RTL (set language to Arabic or Hebrew to test).
3. Verify language switching for all five built-in locales and that unsupported languages degrade gracefully (notice plus "open a translated copy" link) when the browser has no Translator API.
4. Add Playwright screenshot tests or a script that captures each theme and density, and add Vitest unit tests for the i18n fallback logic.
5. Improve SEO and sharing: prerender the English page at build time (or inject static content into `index.html`), add an Open Graph image (1200x630) in the Void style, canonical URL once a domain exists, and `sitemap.xml`.
6. Add per-project detail for Omni, NexusAgent and UEP (architecture diagram as inline SVG, status, links). Do not invent metrics.
7. Run Lighthouse; target 95+ for Performance, Accessibility, Best Practices and SEO. Keep the CSP in `public/_headers` strict (no inline scripts).

## Rules
- Use only facts in `docs/DETAILS.md`. Never invent employers, dates, metrics, test counts, users or production claims. Label unfinished work honestly.
- Name is always "Shreyash Satish Jagtap". LinkedIn text is exactly `Shreyash Jagtap | LinkedIn`; GitHub text is exactly `shreyashjagtap157 (warrite)`.
- Never publish the street address. City level (Pune, Maharashtra, India) only.
- Do not add the Earth-Aria story or any fiction anywhere.
- No trackers, cookies, databases or server code. Everything must stay static and deployable on Cloudflare's free tier.
- Keep every user-visible string in `src/i18n/locales/*.json`; no hard-coded UI text in components (project names, tech tags and personal names excepted, and those carry `translate="no"`).
- Keep the code typed (`strict`), small components, and no new dependency unless clearly justified.

## Done means
`npm run typecheck` and `npm run build` pass, tests pass, screenshots reviewed for all 12 theme x density combinations, and a short CHANGELOG of what you changed.

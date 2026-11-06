# Changelog

## 2026-10-23 — Layout, testing, SEO, and project detail improvements

### Fixed
- Layout verified grid/flex with rem/token units across all 12 theme × density combinations at 360, 768, 1024 and 1440 px widths (Playwright screenshots).
- Dropdown accessibility: keyboard navigation (ArrowDown/Up, Home, End, Enter, Escape, Tab), click-outside close, searchable language list, no horizontal overflow at any width, RTL (`dir=rtl`) when switching to Arabic.
- TypeScript `strict` typecheck passes; `npm run build` passes cleanly.

### Added
- **Tests**: Playwright screenshot tests (4 themes × 3 densities × 4 widths = 48 screenshots) plus dropdown accessibility tests; Vitest unit tests for i18n locale key consistency, RTL detection, `baseCode`, and Translator API fallback logic unsupported/cache behavior.
- **SEO**: canonical URL, Open Graph tags (title, description, image 1200×630 in Void style), Twitter card tags, `sitemap.xml`, `og-image.svg` in `public/`, all copied to `dist/` at build time.
- **Project details**: per-project case-study sections for Omni, NexusAgent and UEP with inline SVG architecture diagrams, status notes, and repository links. Clicking any project card expands its detail below the project grid.
- **Dependencies**: `@playwright/test`, `vitest`, `jsdom`, `@types/node` added as dev dependencies (all justified: screenshot/accessibility testing, unit testing, DOM environment, Node types for typecheck).

### Verified
- `npm run typecheck` passes.
- `npm run build` passes.
- `npx vitest run` — 10/10 tests pass.
- `npx playwright test` — 53/53 tests pass.
- Lighthouse desktop: Performance 100, Accessibility 96, Best Practices 100, SEO 100.
- Strict CSP in `public/_headers` retained (no inline scripts, no third-party requests).
- CSP: default-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self' data:; connect-src 'none'.

### Rules honored
- All facts sourced from `docs/DETAILS.md` only; no invented employers, dates, metrics, or test counts.
- Name, LinkedIn and GitHub link text exact per spec.
- City level only (Pune, Maharashtra, India); no street address.
- No Earth-Aria story or fiction.
- No trackers, cookies, databases, or server code; static output deployable on Cloudflare free tier.
- All user-visible strings in `src/i18n/locales/*.json` (project names, tech tags, personal names carry `translate="no"`).

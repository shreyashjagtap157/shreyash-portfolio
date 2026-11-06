# Shreyash Satish Jagtap — Portfolio

A static, single-page engineering portfolio built with React 19, TypeScript, and Vite. It presents selected work in programming languages and systems, symbolic computing, AI/agent platforms, research, and backend/full-stack applications.

The portfolio deliberately distinguishes concepts, specifications, prototypes, alpha software, candidate releases, and production qualification. A project appearing here is not a claim that it is production-ready.

## Hosting

The project is configured for Cloudflare Workers Static Assets. The connected Cloudflare account already provides the free account subdomain `ssjagtap2016.workers.dev`, and the existing `shreyash-portfolio` Worker has its `workers.dev` hostname enabled.

Public address: **https://shreyash-portfolio.ssjagtap2016.workers.dev/**

A custom domain such as `shreyashjagtap.com` is optional, not required. This site does not depend on a paid domain.

## Requirements and local development

Use Node.js 22 (see `.nvmrc`).

```bash
npm ci
npm run dev
```

The development server is available at `http://localhost:5173`.

## Verification

```bash
npm run typecheck
npm run test:unit
npm run build
npx playwright install chromium
npm run test:e2e
```

Or run typecheck, unit tests, and production build together:

```bash
npm run check
```

The browser suite checks all four themes, all three density modes, and viewport widths of 360, 768, 1024, and 1440 CSS pixels. It also exercises theme and density switching, reduced-motion behavior, dropdown keyboard behavior, language filtering, RTL layout, horizontal navigation scrolling, duplicate IDs, project-card semantics, GitHub contribution-calendar rendering, and recent public-push rendering/failure handling. GitHub Actions runs the verification pipeline for pushes and pull requests.

## Deploy

The static output is written to `dist/`. The repository includes `wrangler.jsonc` targeting the existing Worker:

```bash
npx wrangler login
npm run deploy
```

The `workers_dev` setting keeps the free `workers.dev` hostname enabled. A purchased custom domain is not needed.

## Architecture

```
src/
  components/       Header, navigation controls, hero, project grid, activity view, sections
  data/              Profile, project metadata, localized project-note mapping
  i18n/              Five hand-maintained locales and optional browser translation
  styles/            Theme tokens, density modes, responsive layout
  theme/             Persisted theme and density preferences
public/               Static headers, résumé, logos, social preview, sitemap
tests/                Playwright browser tests
docs/                 Content source, design rules, verification notes
```

## Content maintenance

- Project metadata and repository links live in `src/data/projects.ts`.
- Project-specific maturity notes live in `src/i18n/locales/*.json`.
- All five maintained locales must have the same key set.
- Personal and project claims must be checked against the current linked repositories before publication.
- Skill proficiency levels are not displayed because no verified proficiency scale has been supplied.
- The public contact location is city-level only: Pune, Maharashtra, India. No street address is stored in the site.
- Do not add fiction, unverified deployment claims, private operational information, or unsupported metrics.

## GitHub activity

The page embeds GitHub's own contribution-calendar image and separately fetches recent public push events for commit links. The event endpoint is unauthenticated and rate-limited, so a local ten-minute cache and graceful stale/error states are used. The recent-push list is not a complete contribution total and does not expose private activity. No GitHub access token is shipped to visitors.

## Privacy and security

The site is static and has no application backend, analytics, advertising trackers, or cookies. It does not use third-party contribution-image widgets. Fonts and translations are bundled locally. Browser preferences and the public-events cache stay in local storage.

Security headers are configured in `public/_headers`. Keep the Content Security Policy restrictive and avoid inline scripts, inline styles, analytics, and unnecessary external runtime dependencies.

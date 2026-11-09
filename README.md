# Shreyash Satish Jagtap — Portfolio

A static React 19 + TypeScript engineering portfolio focused on backend systems, programming-language and systems engineering, symbolic computing, AI-agent platforms, and research.

The site distinguishes concepts, specifications, prototypes, alpha software, candidate releases, and production qualification. A project appearing here is not a claim that it is production-ready.

## Live hosting

The configured production hosting target is **Cloudflare Workers Static Assets** on the existing free `workers.dev` hostname:

**https://shreyash-portfolio.ssjagtap2016.workers.dev/**

The connected Cloudflare account already has the `ssjagtap2016.workers.dev` account subdomain, and the `shreyash-portfolio` Worker has its `workers.dev` hostname enabled. No custom domain purchase is needed. A name such as `shreyashjagtap.com` is optional.

Deployment is Cloudflare-only. The repository is connected to Cloudflare Workers Builds; builds for the production branch run the verification/build commands and deploy the same Worker. The selected Workers Builds credential was reported by Cloudflare as deleted/rolled, so current-source deployment remains blocked until a valid token is selected under the Worker’s Settings → Builds → API token. Do not configure an alternative hosting provider.

**Important: the public hostname currently serves a legacy deployment, not this repository's current source.** Live checks on 8 and 9 November 2026 confirmed the old duplicate Omni entry, legacy maturity labels, and canonical/Open Graph metadata pointing at `www.shreyashjagtap.com`, while this branch's `index.html` correctly targets the configured `workers.dev` host. The live `/api/github/activity` endpoint returned HTTP 404 on both checks. The latest recorded Cloudflare deployment remains Worker version 19 from 23 October 2026. A 9 November recheck confirmed the public hostname is still reachable but stale; do not claim the current case studies, project inventory, or activity endpoint are live until a new deployment and live smoke test succeed.

## Local development

Use Node.js 22 or newer (see `.nvmrc`). The default development command builds the assets and starts the actual Cloudflare Worker locally, so the GitHub activity endpoint works through the same Worker route used in production:

```bash
npm ci
npm run dev
```

Open the Wrangler URL printed in the terminal (normally `http://localhost:8787`). For UI-only Vite hot reload, use `npm run dev:ui` in one terminal and `npx wrangler dev --port 8787` in another; the Vite `/api` proxy forwards activity requests to that Worker.

## Verification

```bash
npm run typecheck
npm run test:unit
npm run build
npx playwright install chromium
npm run test:e2e
```

`npm run check` runs typecheck, unit tests, and the production build.

The browser suite exercises all 4 themes × 3 density modes × 4 viewport widths (360, 768, 1024, 1440 CSS pixels), plus theme persistence, dropdown keyboard/focus behavior, language search, RTL, reduced motion, horizontal navigation scrolling, About navigation, project routing/filtering, project-specific case-study switching, conceptual project diagrams, DOM duplicate/nested-interactive checks, and GitHub activity loading/partial/failure/refresh states. GitHub Actions verifies pull requests and pushes. Cloudflare Workers Builds is the production deployment path.

## Cloudflare deployment

The Worker entry point is `src/worker.ts`; Vite writes static assets to `dist/`. `wrangler.jsonc` configures the existing `shreyash-portfolio` Worker, static asset binding, SPA fallback, observation, and `workers_dev: true`.

For an explicitly requested manual deployment from an authenticated local checkout:

```bash
npm run deploy
```

Normal production deployment is managed through Cloudflare Workers Builds after the production branch is updated. Do not deploy this portfolio to Fly.io, Vercel, Netlify, GitHub Pages, or another hosting platform.

## Architecture

```
src/
  components/       Header, navigation controls, hero, project grid, activity view, sections
  data/              Profile, project metadata, localized project-note mapping
  i18n/              Five hand-maintained locales and optional browser translation
  styles/            Theme tokens, density modes, responsive layout
  theme/             Persisted theme and density preferences
  worker.ts           Cloudflare Worker API + static-asset fallback
public/               Security headers, résumé, logos, social preview, sitemap
tests/                Playwright browser tests
docs/                 Content source, engineering rules, audit and validation notes
```

## Content maintenance

- Project metadata and repository links live in `src/data/projects.ts`.
- Project-specific maturity notes live in `src/i18n/locales/*.json`, keyed through `src/data/projectDetails.ts`.
- Project case studies are selected in the Case study section; each narrative distinguishes verified repository state from architecture intent and roadmap targets.
- Project-card SVGs are conceptual diagrams, not product screenshots or claims of deployed functionality.
- English, German, French, Hindi, and Marathi dictionaries must have identical key sets.
- Skill proficiency levels are not shown because no verified proficiency scale has been supplied.
- Public location is city-level only: Pune, Maharashtra, India. No street address is stored.
- Fiction, unsupported impact metrics, private operational details, and unverified production claims are excluded.
- The selected-work grid has 14 intentionally selected repositories. It is not presented as a complete GitHub-account inventory.

## GitHub activity

The browser calls only the same-origin `/api/github/activity` endpoint. The Cloudflare Worker fetches GitHub's public contribution-calendar HTML and unauthenticated public PushEvents server-side, parses contribution dates/levels, validates push records and commit SHAs, then returns normalized JSON.

The Worker stores the last fully successful response in the bound Cloudflare KV namespace for up to six hours. Data is considered fresh for five minutes. If GitHub is temporarily unavailable, the Worker can reuse the last successful response and marks it as partial/stale in the UI. Upstream requests have an eight-second timeout. Manual refresh attempts have a separate one-minute cooldown marker, so failed refreshes do not reset the last-successful-data timestamp or bypass the cooldown. KV is eventually consistent: a recent write can take up to 60 seconds to become visible in another location, so the cooldown is best-effort rather than a globally atomic rate limiter.

The namespace is included in the Workers Free plan, subject to its published daily quotas (currently 100,000 reads and 1,000 writes per day, with 1 GB of storage). Normal portfolio traffic should be small, but usage must remain within the account's limits; a KV quota failure degrades to live upstream fetching without falsely claiming stale-data persistence.

The recent-push list comes only from GitHub's unauthenticated `public` PushEvents endpoint. The contribution calendar is GitHub's publicly rendered profile calendar; when the profile owner's **Private contributions** setting is enabled, GitHub includes anonymized daily counts from private/internal repositories. This Worker stores the calendar's dates, intensity levels, and summary, but does not fetch private repository names or private event details. Therefore, the combined feed is not strictly public-repository-only unless that setting is disabled. See [GitHub's profile contributions reference](https://docs.github.com/en/account-and-profile/reference/profile-contributions-reference). No GitHub access token is sent to or embedded in browser code.

## Privacy and security

There is no user-account backend, application profile database, analytics, advertising tracker, or tracking cookie. The Worker serves static assets and uses Cloudflare KV only for the last successful normalized GitHub-activity snapshot (up to six hours) and a separate manual-refresh cooldown marker (one minute). This cache is not a user-profile database. It stores the publicly rendered profile calendar and public PushEvents; the calendar-derived daily levels and summary may reflect anonymized private/internal contributions when the profile setting is enabled, but the Worker does not fetch private repository names or private event details. To keep the combined feed strictly public-repository-only, disable **Private contributions** under GitHub profile → Contribution settings. See [GitHub's visibility instructions](https://docs.github.com/en/account-and-profile/how-tos/contribution-settings/manage-visibility-settings-for-private-contributions-and-achievements). The browser connects only to the portfolio's own origin; GitHub is contacted server-side by the Worker. Fonts and translations are bundled locally. Theme, language, and density preferences stay in browser storage.

Security headers and the restrictive Content Security Policy are defined in `public/_headers`. Keep browser `connect-src` and `img-src` same-origin, avoid inline scripts/styles, and do not add unnecessary third-party runtime dependencies.

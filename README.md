# Shreyash Satish Jagtap — Portfolio

Single-page React + TypeScript + Vite site. Four themes, three density modes, five built-in languages plus on-device translation for others. Static output, no backend, no database.

## Setup
Requires Node 20+ (see `.nvmrc`).

```bash
npm install
npm run dev          # http://localhost:5173
npm run typecheck
npm run build        # outputs dist/
npm run preview      # serve dist/ locally
```

## Deploy to Cloudflare (free)
```bash
npx wrangler login
npm run deploy       # builds, then deploys dist/ via wrangler.jsonc
```
Or connect the Git repo in the Cloudflare dashboard (Workers & Pages) with build command `npm run build` and output directory `dist`. Security headers come from `public/_headers`.

## Layout
```
src/data/profile.ts      name, links, contact (email/phone assembled at runtime)
src/data/projects.ts     the 14 projects and the skills groups
src/i18n/locales/*.json  en, hi, mr, de, fr (all UI and project text)
src/i18n/                provider, language list, on-device translator
src/theme/               theme + density provider, animated theme switch
src/components/          Header, Controls, Dropdown, Hero, Projects, Sections
src/styles/theme.css     design tokens (themes and density)
src/styles/app.css       layout and components
public/                  _headers, résumé PDF, logos, robots.txt
tools/                   resume.py and logo.py generators (python, run from root)
docs/                    PROMPT.md, DETAILS.md, DESIGN.md
```

## Common tasks
- Add or edit a project: `src/data/projects.ts` plus a `p_<id>` key in every `locales/*.json`.
- Add a built-in language: new `locales/xx.json` (copy `en.json`), register it in `src/i18n/languages.ts`.
- Regenerate the résumé: `pip install reportlab pypdf && python tools/resume.py`.
- Regenerate the logo PNG: `pip install pillow && python tools/logo.py`.

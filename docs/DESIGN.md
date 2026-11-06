# Portfolio design and engineering rules

## Product intent

Present Shreyash Satish Jagtap as an engineer focused on backend systems, programming-language and systems engineering, symbolic computing, and AI/agent platforms. The interface should feel deliberate, technically literate, and professional without implying every research project is a finished product.

## Information architecture

1. Identity header: name and city-level location.
2. Sticky toolbar: horizontally scrollable section navigation with a visible scrollbar, plus independent Theme, Language, and Density controls.
3. Hero: engineering headline, concise summary, project/contact actions, theme-specific technical visual.
4. Selected work: filterable project cards with maturity labels, short factual descriptions, repository links, and localized project notes.
5. Omni case study: specification governance, staged roadmap, engineering challenge, and qualification status.
6. Technical focus: skills grouped by discipline; no invented proficiency ratings.
7. Engineering approach: explicit rules, inspectable reasoning/evidence, and separation of capability from readiness.
8. GitHub activity: GitHub's own contribution calendar image and a separate live list of recent public push events.
9. Experience and education.
10. Contact and résumé.

Avoid duplicate sections that repeat the same content or decorative controls that pretend to change meaningful system state.

## Themes

Themes are independent of density and selected using `data-theme`.

| Theme | Background | Accent | Typography | Character |
|---|---|---|---|---|
| Void | #070b10 | #22d3ee | JetBrains Mono | Minimal terminal and grid |
| Orbital | #05030f | #8b7cff / #22d3ee | Sora | Technical, spacious, celestial |
| Blueprint | #f1f5fb | #0d2a57 / #c2272d | IBM Plex Sans and Mono | Light drafting surface |
| Aurora | #0a0d14 | #14b8a6 / #a78bfa | Manrope | Quiet gradients and translucent surfaces |

## Density

- Compact: 13.5px root type, reduced spacing.
- Comfortable: 15px root type, default.
- Spacious: 16.5px root type, expanded spacing.

Use rem units, grid/flex, intrinsic sizing, and shared tokens. Avoid fixed positioning for content and avoid fixed-pixel typography/layout values.

## Interaction and accessibility

- Keyboard-operable navigation and controls.
- Visible focus indicator and skip link.
- Dropdown listbox semantics with keyboard navigation, click-outside, Escape, focus handling, and language filtering.
- RTL document direction for Arabic, Hebrew, Persian, and Urdu.
- Sufficient touch targets, sensible focus order, meaningful link text, no nested interactive elements, and a visible horizontal navigation scrollbar on narrow viewports.
- Reduced-motion support for transitions and animations.
- Prefer semantic HTML; use tab roles only when the complete tab interaction pattern is implemented.
- Avoid pointer-only interaction for essential content.
- All controls must cause a real state change, navigation, or clearly labeled external action.

## Localization

English, Hindi, Marathi, German, and French are manually maintained. Every user-facing string in components belongs in all five locale JSON files, except personal/project names and technology labels. Keep locale key sets identical. Extra browser translation is optional and must degrade gracefully. Never persist translated content to a remote service.

## GitHub activity and privacy

- The contribution calendar image is served by GitHub's own profile contribution endpoint; GitHub profile visibility settings determine what appears.
- The recent-activity list uses the unauthenticated GitHub public-events endpoint and shows only recent public PushEvents. It is not a complete contribution feed and does not include private repository events.
- Cache recent activity locally for ten minutes; support explicit refresh and a graceful stale/error state.
- No analytics, ad trackers, cookies, or third-party contribution-image services.
- Do not use a personal GitHub token in client code.

## Privacy and security

- Static deployment; no application backend, analytics, ad tracking, or cookies.
- Keep user preferences and the activity cache in local browser storage only.
- Display Pune, Maharashtra, India; never a street address.
- Fonts are bundled locally.
- CSP allows only the GitHub contribution image and the GitHub public-events API as third-party runtime origins.
- CSP does not permit inline scripts or inline styles.
- Do not add runtime dependencies without a clear engineering need.

## Performance and verification

- Static Vite output, deployable to Cloudflare Workers Static Assets on the free `workers.dev` hostname.
- Keep generated reports, screenshots, browser traces, and build outputs out of Git.
- CI must run typecheck, unit tests, production build, and Playwright browser tests.
- Test all four themes, all three density modes, mobile/tablet/desktop widths, dropdown keyboard behavior, language switching, RTL, navigation scrolling, public activity success/failure states, and duplicate/interactively nested DOM.
- A Lighthouse report is evidence only for the exact URL, build, device profile, and timestamp used to generate it; never preserve stale scores as current claims.
- Canonical URL, Open Graph URL, robots, and sitemap use the verified Cloudflare Worker hostname, never an assumed purchased domain.

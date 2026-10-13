# HoursMedia

Marketing website for HoursMedia — a digital studio building websites, customer
journeys and smart automation for small and growing businesses.

Built with Next.js (App Router), TypeScript, Tailwind CSS v4 and `next-intl`.

## Principles

- **Honest by default.** No invented clients, reviews, ratings, metrics or
  contact details. Anything the business has not confirmed is left blank and
  hidden, and tracked in `docs/launch-checklist.md`.
- **Trilingual.** English, Dutch and Arabic are first-class, with the same
  paths in every locale and full RTL support. No machine-translated filler.
- **Accessible and fast.** Semantic markup, a skip link, visible focus, logical
  properties for RTL, static rendering by default.

## Requirements

- Node.js 20.11 or newer
- npm 10+

> **Windows note:** `package.json` pins `@swc/core` to `1.16.0` via `overrides`.
> Newer releases ship a compressed native binary that fails to materialise its
> cache on some Windows machines (`ERR_SWC_NATIVE_CACHE`). Keep the override.

## Getting started

```bash
cp .env.example .env.local   # then fill in what you have
npm install
npm run dev                  # http://localhost:3000
```

## Scripts

| Command             | Purpose                                     |
| ------------------- | ------------------------------------------- |
| `npm run dev`       | Start the dev server                        |
| `npm run build`     | Production build (all locales prerendered)  |
| `npm run start`     | Serve the production build                  |
| `npm run lint`      | ESLint                                      |
| `npm run typecheck` | `tsc --noEmit`                              |
| `npm test`          | Unit tests (Vitest)                         |
| `npm run e2e`       | End-to-end smoke tests (Playwright)         |

Run the full gate before shipping:

```bash
npm run lint && npm run typecheck && npm test && npm run build && npm run e2e
```

## Project structure

```
src/
  app/
    [locale]/          Public pages (en / nl / ar), one layout for all
    api/leads/         Lead intake route (validation, rate limit, CRM push)
    sitemap.ts         Sitemap with hreflang alternates
    robots.ts          robots.txt
    opengraph-image.tsx  Site-wide share card
  components/          UI, nav, forms, consent, structured data
  config/              Business settings and the service registry
  content/             Long-form copy per locale (en / nl / ar) + types
  i18n/                Routing, navigation helpers, request config
  lib/                 Validation, rate limiting, CRM adapter, persistence
  messages/            UI string catalogues per locale
  proxy.ts             Locale detection (Next 16 middleware equivalent)
```

## Content and configuration

- Business facts live in `src/config/site.ts` and `src/config/services.ts`.
- Long-form copy lives in `src/content/{en,nl,ar}.ts` (typed by
  `src/content/types.ts`).
- Interface strings live in `src/messages/{en,nl,ar}.json`.

See `docs/content-guide.md` for editing rules and `docs/launch-checklist.md`
for everything to confirm before go-live.

## Integrations

- **GoHighLevel** — newsletter/lead sync is implemented and disabled until
  credentials are provided. See `docs/gohighlevel.md`.
- **Analytics** — consent-gated and off until a provider is configured.

## Deployment

Any Node host that supports Next.js works (Vercel, Docker, a VPS). Provide the
environment variables from `.env.example`. Lead persistence writes to
`.data/submissions.jsonl` on the local filesystem; on serverless hosting,
configure HighLevel (or another datastore) so leads are not lost.

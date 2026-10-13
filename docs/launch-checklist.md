# Launch checklist

The site is built to launch **without** inventing anything. This is the list of
things the business must confirm or provide. Until each is resolved, the site
either hides the item or ships a clearly-labelled draft.

## Business facts (blocking)

- [ ] **Legal entity name** → `siteConfig.legalName` (currently `null`).
- [ ] **Public contact email** → `siteConfig.contact.email` (currently `null`;
      the contact page shows "not yet available" instead of a fake address).
- [ ] **Phone number** → `siteConfig.contact.phone` (currently `null`).
- [ ] **Postal address** → `siteConfig.contact.*` (currently `null`). Required
      before structured data emits an address.
- [ ] **Social profiles** → `siteConfig.social` (currently empty).
- [ ] **Founding year** → `siteConfig.founded` (currently `null`).
- [ ] **Production URL** → `NEXT_PUBLIC_SITE_URL` in the hosting environment.

## Legal (blocking for indexing)

All three legal documents ship with `reviewed: false`. That keeps them out of
the sitemap and adds `robots: noindex`. Before launch:

- [ ] Review and complete **Privacy** (`content.legal.privacy`).
- [ ] Review and complete **Cookies** (`content.legal.cookies`).
- [ ] Review and complete **Terms** (`content.legal.terms`).
- [ ] Get legal sign-off where required, then set `reviewed: true` on each so
      they enter the sitemap and lose `noindex`.

## Content truthfulness

- [ ] Every project is labelled `concept` or `internal`; no real client is
      implied. Replace with real case studies only with written permission.
- [ ] Service `demonstration` blocks describe examples, not results.
- [ ] No ranking, revenue or performance guarantees are published.
- [ ] All seven services are genuinely offered (registry `confirmed: true`).

## Integrations

- [ ] **GoHighLevel** credentials added, or integration intentionally left off.
      See `docs/gohighlevel.md`. Until then, verify lead storage target.
- [ ] **Lead delivery**: on serverless hosting, `.data/submissions.jsonl` is not
      durable — configure HighLevel or another store.
- [ ] **Analytics**: set `NEXT_PUBLIC_ANALYTICS_DOMAIN` if wanted; it stays off
      until then.

## Quality gate

- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm test`
- [ ] `npm run build`
- [ ] `npm run e2e`
- [ ] Manual pass: keyboard-only navigation, focus visibility, screen-reader
      spot check, and the Arabic `dir="rtl"` layout.
- [ ] Submit `sitemap.xml` and verify `robots.txt` on the production domain.

## Known, intentional limitations

- The Open Graph image is Latin-only: the image renderer cannot shape Arabic
  script. Titles and descriptions remain locale-correct in the HTML.
- Lead rate limiting is in-memory (per instance). Move to a shared store before
  scaling horizontally.

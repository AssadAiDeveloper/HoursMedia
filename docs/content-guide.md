# Content guide

Everything a visitor reads is either a business fact, long-form copy, or an
interface string. Each has one home.

## 1. Business facts — `src/config/site.ts`

Name, positioning line per locale, public URL, contact details, social links,
timezone. Unknown values stay `null` and are hidden in the UI. Never put a
placeholder phone number or email here; leave it `null` until confirmed.

## 2. Service registry — `src/config/services.ts`

The single source of truth for routing, grouping and the sitemap. Each service
has an `id` (typed union), a locale-independent `slug`, a `group` and a
`confirmed` flag. Unconfirmed services are excluded from navigation, the sitemap
and the brief form by the `confirmedServices()` helper.

Adding a service means:

1. Add an `id` to the `ServiceId` union and an entry to `services`.
2. Add its `id` to the matching group in `serviceGroups`.
3. Add a `ServiceContent` entry under `services` in **all three** content files.

The unit test `src/config/services.test.ts` checks the registry stays consistent.

## 3. Long-form copy — `src/content/{en,nl,ar}.ts`

Typed by `src/content/types.ts`. Includes service pages, projects and articles.
Rules:

- The same slugs appear in every locale (tests enforce this).
- Demonstrations and concept projects must be labelled as such — use
  `kind: "concept" | "internal"` and the `demonstration` fields. Never present
  an example as a real client result.
- No placeholder markers (`TODO`, `TBD`, `lorem ipsum`). A test fails the build
  if any appear.
- Legal documents ship with `reviewed: false`, which keeps them out of the
  sitemap and adds `noindex`. Flip to `true` only after the business and, where
  needed, a lawyer have approved the text.

## 4. Interface strings — `src/messages/{en,nl,ar}.json`

Short UI copy keyed by namespace. All three files must have identical key sets
(a test enforces this). Keep keys stable; rename in every locale at once.

## Translating responsibly

- Write Arabic as native RTL copy, not a word-for-word conversion.
- Avoid letter-spacing utilities on Arabic (they break the script). The design
  tokens already account for this.
- Numbers, email addresses and URLs use `bidi-isolate` where they appear inline
  in Arabic text.

## Running the checks

```bash
npm test        # parity, placeholders, registry integrity
npm run build   # confirms every locale and page renders
```

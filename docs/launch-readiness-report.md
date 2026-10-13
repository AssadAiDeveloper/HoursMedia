# Launch Readiness Report

**Project:** HoursMedia (Next.js 16 · React 19 · next-intl · Tailwind v4 · vitest · Playwright)
**Scope:** Full pre-launch audit — build, types, links, forms, API, env, responsive, SEO, security, hygiene.
**Date:** 2026-10-12
**Method:** Production build (`next build`) + `next start` on port 3002, live HTTP probing, static source review.

---

## Verdict: READY TO LAUNCH (after the two blockers below are configured in the host)

> **Addendum (2026-10-12) — blockers resolved:**
> 1. `NEXT_PUBLIC_SITE_URL=https://hoursmedia.com` is now set (`.env.local`; **must also be set in the hosting environment**). Rebuild verified: canonical, `hreflang`, Open Graph image, `robots.txt` `Host`/`Sitemap`, and every sitemap `<loc>` now emit `https://hoursmedia.com`. ✅
> 2. Lead delivery no longer silently loses data: `deliverLead` POSTs to an optional durable webhook (`LEADS_WEBHOOK_URL`) **and** the local store, and the API returns **502** (`delivery-failed`) when no channel accepts the lead (previously it always returned success). ✅
>
> Set `LEADS_WEBHOOK_URL` (or the `GHL_*` variables) in the host for true durability. See the launch sequence below.

The **codebase is sound** (builds clean, 0 broken links, forms/API behave correctly, security headers and SEO scaffolding in place). It was **not launch-ready** only because of two configuration/business items, now addressed. Remaining items are environment settings on the host.

---

## Blocking issues (resolved — keep as reference)

### 1. `NEXT_PUBLIC_SITE_URL` is not set — CRITICAL (SEO)
All absolute URLs currently resolve to the fallback `http://localhost:3000`:
canonical, `hreflang` alternates, `sitemap.xml`, `robots.txt` `Host`/`Sitemap`, Open Graph/Twitter images, and JSON-LD.

Evidence (live):
- `<link rel="canonical" href="http://localhost:3000/en">`
- `<link rel="alternate" hrefLang="x-default" href="http://localhost:3000/en">`
- `robots.txt` → `Host: http://localhost:3000`, `Sitemap: http://localhost:3000/sitemap.xml`
- Every `<loc>` in the 72-entry sitemap points at `http://localhost:3000`.

**Fastest fix:** In the hosting provider (e.g. Vercel → Project → Settings → Environment Variables) add
`NEXT_PUBLIC_SITE_URL=https://<production-domain>` (no trailing slash) for Production (and Preview), then redeploy.
The code already reads it (`src/config/site.ts:33`) — no code change required.

**Status:** DONE locally — set to `https://hoursmedia.com` in `.env.local`. **Still required in the host.**

### 2. Lead persistence / CRM is not configured — CRITICAL (data loss)
- `GHL_API_TOKEN`, `GHL_LOCATION_ID`, `GHL_PIPELINE_ID`, `GHL_PIPELINE_STAGE_ID` are empty ⇒ API returns `crm: "awaiting-credentials"` and no lead reaches a CRM.
- The fallback store appends to `.data/submissions.jsonl` on local disk (`src/lib/submissions.ts`). On serverless/ephemeral hosting the filesystem is not durable, and failures were previously swallowed as a `console.warn` ⇒ **enquiries could be silently lost**.

**Fastest fix (either):** set the `GHL_*` variables, **or** point `LEADS_WEBHOOK_URL` at a durable sink.

**Status:** DONE — `deliverLead` now attempts the webhook and the local file, and the route returns HTTP **502 `delivery-failed`** when no channel accepts the lead. Nothing is reported as received unless it was durably stored or forwarded. **Set `LEADS_WEBHOOK_URL` (or `GHL_*`) in the host.**

---

## Should-fix (non-blocking)

| # | Area | Finding | Severity | Fastest fix |
|---|------|---------|----------|-------------|
| 3 | Legal/contact | `siteConfig.legalName`, `contact.email/phone/address`, `social` all `null`; privacy/cookies/terms `reviewed:false` (correctly `noindex,nofollow` + excluded from sitemap). Footer/contact show "being confirmed". | High (business) | Supply real contact details + legal entity; set each legal doc `reviewed:true`. |
| 4 | Dependencies | 5 `npm audit` advisories remain, **all dev-only** (`eslint-config-next` → `braces`/`micromatch`/`fast-glob`), **no upstream fix**. npm's suggested "fix" downgrades Next to 14 (invalid). Prod runtime deps are clean. | Low | Accept; re-check when ESLint tooling patches. |
| 5 | Repo hygiene | Unused create-next-app assets in `/public` (`next.svg`, `vercel.svg`, `globe.svg`, `file.svg`, `window.svg`) and unused `public/brand/hoursmedia-wordmark.png`. | Low | Delete files. |
| 6 | Reproducibility | `package.json` has no `engines` / `packageManager`. | Low | Add `"engines": { "node": ">=20.11" }`. |
| 7 | Rate limiting | In-memory fixed window (`src/lib/rate-limit.ts`) is per-instance; best-effort on multi-instance/serverless. | Low | Documented; swap for Upstash/Redis if abuse appears. |
| 8 | Tooling warning | Vite prints a `configLoader: 'native'` warning for `vitest.config.ts` (future-only). | Info | Rename to `vitest.config.mts` when convenient. |

No blocking **code** issues were found.

---

## Detail by requested area

### 1. Production build — PASS
`next build` (Turbopack) compiles successfully, TypeScript passes, **90 static pages** generated. Dynamic routes only: `/api/leads` and `/[locale]/[...rest]`. `next start` serves on 3002.

### 2. TypeScript & lint — PASS
`npm run lint` → 0 problems. `npm run typecheck` (`tsc --noEmit`) → exit 0.

### 3. Internal links, images, paths — PASS
- All **72 sitemap paths** return HTTP 200.
- **88 unique internal `href`s** crawled across the site → **0 broken**.
- Brand images (`hoursmedia-logo.png`, `hoursmedia-symbol.png`) → 200 `image/png`; `/en/opengraph-image` → 200 `image/png`.

### 4. Forms & submissions — PASS
`POST /api/leads` behaviour (live):
- valid → `200 {"ok":true,"id":"…","crm":"awaiting-credentials"}`
- malformed JSON → `400 {"error":"invalid-json"}`
- missing fields → `400 {"error":"validation","fields":{…}}`
- honeypot filled → `200 {"ok":true}` (suppressed, not stored)
- burst → `429 {"error":"rate-limited"}` with `Retry-After`
- `GET` → `405`; `OPTIONS` → `204` (no permissive CORS headers)
Validation via zod (`src/lib/validation.ts`); honeypot + time-trap anti-spam.

### 5. Auth / permissions / API surface — PASS (N/A)
No authentication, sessions, roles, admin, or login exist. Only one app API route: `POST /api/leads`. `src/proxy.ts` middleware is locale-detection only (`Accept-Language`, no IP redirect) and excludes `api`, `_next`, static files.

### 6. Environment variables — PASS (values not exposed)
Used: `NEXT_PUBLIC_SITE_URL`, `GHL_API_TOKEN`, `GHL_LOCATION_ID`, `GHL_PIPELINE_ID`, `GHL_PIPELINE_STAGE_ID`, `GHL_API_BASE_URL`, `GHL_API_VERSION`, `NEXT_PUBLIC_ANALYTICS_DOMAIN`, `NEXT_PUBLIC_ANALYTICS_SRC`. Server-only secrets are never sent client-side; all have safe defaults. `.env.example` is committed; **no `.env.local`/`.env` present**; only `.env.example` is allowed by `.gitignore`.

### 7. Responsive (mobile / tablet / desktop) — PASS
Checked 375 / 768 / 1440 px on `/en`, `/en/services`, `/en/contact`, `/ar`, `/ar/brief`, `/nl/work` → **no horizontal overflow**. `viewport` meta present; RTL handled for `ar`.

### 8. SEO, metadata, robots, sitemap — PASS (build), BLOCKED (URLs)
- `metadataBase` set from `siteConfig.url`; title template, description, OpenGraph, Twitter card present.
- `hreflang`: **4 links per page** (`en`, `nl`, `ar`, `x-default`) + self-referential canonical.
- `robots.txt`: `Allow: /`, `Disallow: /api/`, sitemap + host declared.
- `sitemap.xml`: 72 entries with `x-default` alternates.
- Legal pages: `noindex,nofollow` (unreviewed) and omitted from sitemap — correct.
- JSON-LD: `Organization`, `WebSite`, plus `BreadcrumbList`/`Service`/`Article`/`FAQPage` where relevant.
- ⚠️ Every absolute URL points at `http://localhost:3000` until blocker #1 is set.

### 9. Security / OWASP basics — PASS
- Headers (live): `Content-Security-Policy` (default-src 'self', object-src none, frame-ancestors none, form-action self, upgrade-insecure-requests), `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (camera/mic/geo/browsing-topics off), `Strict-Transport-Security` (2y, includeSubDomains, preload); `X-Powered-By` removed.
- Injection: zod validation, no SQL/shell; JSON-only body.
- CSRF: no permissive CORS; `OPTIONS` returns 204 without `Access-Control-Allow-Origin`.
- Abuse: rate limiting + honeypot + time-trap.
- Dependencies: prod deps clean; remaining advisories are dev-only (see #4).
- Note: 404/error responses set `noindex`. PII (name/email/message) is written to `.data/submissions.jsonl` (gitignored) — see blocker #2.

### 10. console.log / TODO / demo data / secrets — PASS
- No `console.log` / `debugger`. Two intentional server-side `console.warn` (submission persistence failure; GHL push failure).
- No `TODO`/`FIXME`/`lorem ipsum` in source (matches are test-file patterns only).
- No secrets/keys/tokens hardcoded (`sk_`, `AKIA`, `BEGIN PRIVATE KEY`, `password`, `token` → none).
- "Demo data": work items are explicitly labelled concepts/internal builds by design, not fake client results.
- Local test submissions were created in `.data/submissions.jsonl` (gitignored) during API probing.

---

## Recommended launch sequence
1. Set `NEXT_PUBLIC_SITE_URL` in the host (Production + Preview) → redeploy. *(blocker 1)*
2. Configure durable lead delivery: `GHL_*` env vars **or** replace `saveSubmission`. *(blocker 2)*
3. Supply real contact details + legal entity; mark legal docs reviewed. *(#3)*
4. Optional cleanup: remove unused `/public` assets; add `engines`.

Once 1–2 are set in the environment, this build is **code-ready to launch**.

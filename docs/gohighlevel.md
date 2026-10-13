# GoHighLevel integration

**Status: implemented, awaiting credentials.** The code is complete and typed,
but no live account is connected, so every call is a no-op. This is integration
as a customer of the HighLevel platform — it does not imply a partnership.

## What it does

When a visitor submits the contact or brief form, the API route
(`src/app/api/leads/route.ts`):

1. Validates the payload (`src/lib/validation.ts`).
2. Applies a honeypot and a fill-time trap; suspicious submissions are dropped
   silently.
3. Rate-limits per client (`src/lib/rate-limit.ts`).
4. Persists the submission (`src/lib/submissions.ts`).
5. Pushes to HighLevel if configured (`src/lib/ghl/client.ts`) — best effort;
   a CRM outage never fails the visitor's request.

`src/lib/ghl/client.ts` exposes the capability matrix (`ghlCapabilities`) and
`ghlStatus()` so the UI and docs can report honestly whether the CRM is live.

## Enabling it

Set these in the hosting environment (see `.env.example`):

| Variable                | Required | Purpose                                  |
| ----------------------- | -------- | ---------------------------------------- |
| `GHL_API_TOKEN`         | yes      | Private integration token                |
| `GHL_LOCATION_ID`       | yes      | Target sub-account (location)             |
| `GHL_PIPELINE_ID`       | no       | Open an opportunity on each lead          |
| `GHL_PIPELINE_STAGE_ID` | no       | Stage for new opportunities               |
| `GHL_API_BASE_URL`      | no       | Override the API base (defaults provided) |
| `GHL_API_VERSION`       | no       | API version header (default `2021-07-28`) |

With `GHL_API_TOKEN` and `GHL_LOCATION_ID` present, `ghlStatus()` returns
`"ready"` and leads are upserted as contacts, tagged by source and locale, with
the message attached as a note and (optionally) an opportunity opened.

## Capabilities

| Capability              | Implemented | Notes                                   |
| ----------------------- | ----------- | --------------------------------------- |
| `contacts.upsert`       | yes         | Create/update contact from an enquiry   |
| `tags.apply`            | yes         | Tags: `website`, source, locale         |
| `opportunities.create`  | yes         | Only when a pipeline is configured      |
| `notes.create`          | yes         | Original message attached to contact    |

## Testing without a live account

The unit tests in `src/lib/validation.test.ts` and the e2e lead-API specs in
`e2e/smoke.spec.ts` exercise the route end to end; when HighLevel is
unconfigured the CRM step reports `skipped: "awaiting-credentials"` and the
request still returns `200`.

## Before production

- Store the token as a secret; never commit it.
- Confirm the location, pipeline and stage ids with the client's account.
- Decide whether submissions should also land in a durable database when hosted
  serverless (the filesystem store is not durable there).

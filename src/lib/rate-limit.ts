/**
 * Minimal fixed-window rate limiter.
 *
 * This is intentionally in-memory: it protects a single instance against
 * accidental bursts and simple abuse. In a multi-instance or serverless
 * deployment, replace it with a shared store (e.g. Redis / Upstash) — the
 * interface below is small enough to swap without touching callers.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

const MAX_ENTRIES = 5000;

function sweep(now: number) {
  if (buckets.size <= MAX_ENTRIES) return;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
};

export function rateLimit(
  key: string,
  limit = 5,
  windowMs = 60_000,
): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, retryAfterSeconds: 0 };
  }

  bucket.count += 1;
  const allowed = bucket.count <= limit;
  return {
    allowed,
    remaining: Math.max(0, limit - bucket.count),
    retryAfterSeconds: allowed
      ? 0
      : Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
  };
}

/** Best-effort client identity from standard proxy headers. */
export function clientKey(headers: Headers): string {
  // Prefer the header a trusted edge proxy sets directly. `x-real-ip` is not
  // normally forwarded from the client, so it cannot be spoofed by the caller.
  const realIp = headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    // A client may prepend arbitrary values to `x-forwarded-for`, so the
    // left-most entry is untrusted. The right-most entry is the address the
    // closest trusted proxy observed, which the client cannot control.
    const parts = forwarded
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean);
    const last = parts[parts.length - 1];
    if (last) return last;
  }

  return "unknown";
}

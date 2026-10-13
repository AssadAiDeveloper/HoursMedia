import { describe, expect, it, vi, afterEach } from "vitest";
import { rateLimit, clientKey } from "./rate-limit";

describe("rateLimit", () => {
  afterEach(() => vi.useRealTimers());

  it("allows requests up to the limit then blocks", () => {
    const key = `test-${Math.random()}`;
    for (let i = 0; i < 3; i += 1) {
      expect(rateLimit(key, 3, 60_000).allowed).toBe(true);
    }
    const blocked = rateLimit(key, 3, 60_000);
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSeconds).toBeGreaterThan(0);
  });

  it("resets once the window elapses", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-01T00:00:00Z"));
    const key = `test-${Math.random()}`;
    expect(rateLimit(key, 1, 1_000).allowed).toBe(true);
    expect(rateLimit(key, 1, 1_000).allowed).toBe(false);
    vi.setSystemTime(new Date("2026-01-01T00:00:02Z"));
    expect(rateLimit(key, 1, 1_000).allowed).toBe(true);
  });
});

describe("clientKey", () => {
  it("uses the right-most forwarded address (closest trusted proxy)", () => {
    const headers = new Headers({ "x-forwarded-for": "203.0.113.7, 10.0.0.1" });
    expect(clientKey(headers)).toBe("10.0.0.1");
  });

  it("ignores a client-prepended spoofed address", () => {
    const headers = new Headers({
      "x-forwarded-for": "1.2.3.4, 203.0.113.7",
    });
    expect(clientKey(headers)).toBe("203.0.113.7");
  });

  it("prefers x-real-ip when present", () => {
    expect(
      clientKey(
        new Headers({
          "x-real-ip": "198.51.100.2",
          "x-forwarded-for": "203.0.113.7, 10.0.0.1",
        }),
      ),
    ).toBe("198.51.100.2");
  });

  it("falls back to unknown", () => {
    expect(clientKey(new Headers())).toBe("unknown");
  });
});

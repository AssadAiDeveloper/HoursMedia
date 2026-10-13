import { describe, expect, it, vi, afterEach } from "vitest";
import { leadSchema, isSpam, fieldErrors } from "./validation";

const base = {
  kind: "contact" as const,
  locale: "en" as const,
  name: "Jane Doe",
  email: "jane@example.com",
  message: "I would like to discuss a new website project.",
  consent: true as const,
};

describe("leadSchema", () => {
  it("accepts a minimal valid lead", () => {
    expect(leadSchema.safeParse(base).success).toBe(true);
  });

  it("rejects a missing consent flag", () => {
    expect(leadSchema.safeParse({ ...base, consent: false }).success).toBe(false);
  });

  it("rejects a malformed email", () => {
    expect(leadSchema.safeParse({ ...base, email: "nope" }).success).toBe(false);
  });

  it("rejects a too-short message", () => {
    expect(leadSchema.safeParse({ ...base, message: "hi" }).success).toBe(false);
  });

  it("rejects an unknown service id", () => {
    expect(
      leadSchema.safeParse({ ...base, service: "not-a-service" }).success,
    ).toBe(false);
  });

  it("rejects an unknown locale", () => {
    expect(leadSchema.safeParse({ ...base, locale: "de" }).success).toBe(false);
  });
});

describe("isSpam", () => {
  afterEach(() => vi.useRealTimers());

  it("flags a filled honeypot", () => {
    const lead = leadSchema.parse({ ...base, companyWebsite: "" });
    expect(isSpam({ ...lead, companyWebsite: "http://spam.example" })).toBe(true);
  });

  it("flags a submission that arrives too quickly", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-01T00:00:00Z"));
    const lead = leadSchema.parse(base);
    expect(isSpam({ ...lead, formStartedAt: Date.now() })).toBe(true);
  });

  it("passes a normal human submission", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-01T00:05:00Z"));
    const lead = leadSchema.parse(base);
    expect(isSpam({ ...lead, formStartedAt: Date.now() - 60_000 })).toBe(false);
  });
});

describe("fieldErrors", () => {
  it("maps issues to the first message per field", () => {
    const result = leadSchema.safeParse({ ...base, email: "nope", name: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      const errors = fieldErrors(result.error);
      expect(Object.keys(errors)).toContain("email");
      expect(Object.keys(errors)).toContain("name");
    }
  });
});

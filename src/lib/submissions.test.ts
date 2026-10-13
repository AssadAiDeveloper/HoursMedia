import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { LeadInput } from "./validation";

vi.mock("node:fs/promises", () => ({
  mkdir: vi.fn(async () => undefined),
  appendFile: vi.fn(async () => undefined),
}));

import { appendFile } from "node:fs/promises";
import { createSubmission, deliverLead } from "./submissions";

const appendFileMock = vi.mocked(appendFile);

const input: LeadInput = {
  kind: "contact",
  locale: "en",
  name: "Test Lead",
  email: "test@example.com",
  company: "",
  phone: "",
  message: "A reasonably long message for the test.",
  consent: true,
};

beforeEach(() => {
  vi.clearAllMocks();
  delete process.env.LEADS_WEBHOOK_URL;
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("createSubmission", () => {
  it("builds a record with an id and timestamp", () => {
    const record = createSubmission(input, "vitest");
    expect(record.id).toMatch(/[0-9a-f-]{36}/);
    expect(record.receivedAt).toBeTruthy();
    expect(record.userAgent).toBe("vitest");
    expect(record.name).toBe("Test Lead");
  });
});

describe("deliverLead", () => {
  it("reports file delivery when the webhook is not configured", async () => {
    const result = await deliverLead(createSubmission(input, null));
    expect(result.delivered).toBe(true);
    expect(result.channels).toEqual(["file"]);
    expect(appendFileMock).toHaveBeenCalledTimes(1);
  });

  it("delivers to the webhook and the file when both are configured", async () => {
    process.env.LEADS_WEBHOOK_URL = "https://example.com/hook";
    const fetchMock = vi.fn(async () => new Response(null, { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    const result = await deliverLead(createSubmission(input, null));

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(result.channels).toEqual(["webhook", "file"]);
  });

  it("still succeeds when the file fails but the webhook works", async () => {
    process.env.LEADS_WEBHOOK_URL = "https://example.com/hook";
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(null, { status: 200 })),
    );
    appendFileMock.mockRejectedValueOnce(new Error("read-only fs"));

    const result = await deliverLead(createSubmission(input, null));

    expect(result.delivered).toBe(true);
    expect(result.channels).toEqual(["webhook"]);
  });

  it("does not report success when every channel fails", async () => {
    process.env.LEADS_WEBHOOK_URL = "https://example.com/hook";
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(null, { status: 500 })),
    );
    appendFileMock.mockRejectedValueOnce(new Error("read-only fs"));

    const result = await deliverLead(createSubmission(input, null));

    expect(result.delivered).toBe(false);
    expect(result.channels).toEqual([]);
    expect(result.errors).toHaveLength(2);
  });
});

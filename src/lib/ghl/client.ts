/**
 * GoHighLevel (HighLevel / LeadConnector) adapter.
 *
 * Status: implemented, awaiting credentials.
 *
 * The API surface below is complete and typed, but no live account is wired up
 * in this repository. Every call is a no-op unless GHL_API_TOKEN and
 * GHL_LOCATION_ID are set, so the site degrades gracefully. Nothing here
 * claims an official HighLevel partnership — this is integration as a
 * customer of the platform.
 *
 * Reference API version: 2021-07-28 (LeadConnector v2).
 */

export type GhlStatus = "ready" | "awaiting-credentials";

export type GhlCapability = {
  id:
    | "contacts.upsert"
    | "tags.apply"
    | "opportunities.create"
    | "notes.create";
  implemented: boolean;
  description: string;
};

/** What the adapter can do, independent of whether it is configured. */
export const ghlCapabilities: GhlCapability[] = [
  {
    id: "contacts.upsert",
    implemented: true,
    description: "Create or update a contact from a website enquiry.",
  },
  {
    id: "tags.apply",
    implemented: true,
    description: "Tag contacts by source so workflows can route them.",
  },
  {
    id: "opportunities.create",
    implemented: true,
    description: "Open an opportunity against a configured pipeline.",
  },
  {
    id: "notes.create",
    implemented: true,
    description: "Attach the original message as a note on the contact.",
  },
];

export function ghlConfig() {
  return {
    token: process.env.GHL_API_TOKEN ?? null,
    locationId: process.env.GHL_LOCATION_ID ?? null,
    pipelineId: process.env.GHL_PIPELINE_ID ?? null,
    pipelineStageId: process.env.GHL_PIPELINE_STAGE_ID ?? null,
    baseUrl:
      process.env.GHL_API_BASE_URL ?? "https://services.leadconnectorhq.com",
    version: process.env.GHL_API_VERSION ?? "2021-07-28",
  };
}

export function ghlStatus(): GhlStatus {
  const { token, locationId } = ghlConfig();
  return token && locationId ? "ready" : "awaiting-credentials";
}

export function isGhlConfigured(): boolean {
  return ghlStatus() === "ready";
}

export type GhlContactInput = {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  service?: string | null;
  message: string;
  locale: string;
  source: string;
};

export type GhlResult =
  | { status: "ok"; contactId: string }
  | { status: "skipped"; reason: string }
  | { status: "error"; reason: string };

function splitName(name: string): { firstName: string; lastName?: string } {
  const parts = name.trim().split(/\s+/);
  const firstName = parts[0] ?? name;
  const lastName = parts.length > 1 ? parts.slice(1).join(" ") : undefined;
  return { firstName, lastName };
}

async function ghlFetch(
  path: string,
  init: { method: string; body: unknown },
): Promise<Response> {
  const { token, baseUrl, version } = ghlConfig();
  return fetch(`${baseUrl}${path}`, {
    method: init.method,
    headers: {
      Authorization: `Bearer ${token}`,
      Version: version,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(init.body),
    // Do not let a slow CRM hang the request path indefinitely.
    signal: AbortSignal.timeout(8000),
  });
}

/**
 * Upsert a contact and, when a pipeline is configured, open an opportunity.
 * Never throws: callers get a discriminated result and can log honestly.
 */
export async function pushLeadToGhl(
  input: GhlContactInput,
): Promise<GhlResult> {
  if (!isGhlConfigured()) {
    return { status: "skipped", reason: "awaiting-credentials" };
  }

  const { locationId, pipelineId, pipelineStageId } = ghlConfig();
  const { firstName, lastName } = splitName(input.name);

  try {
    const contactResponse = await ghlFetch("/contacts/upsert", {
      method: "POST",
      body: {
        locationId,
        firstName,
        lastName,
        name: input.name,
        email: input.email,
        phone: input.phone || undefined,
        companyName: input.company || undefined,
        source: input.source,
        tags: ["website", input.source, input.locale],
      },
    });

    if (!contactResponse.ok) {
      return {
        status: "error",
        reason: `contacts.upsert ${contactResponse.status}`,
      };
    }

    const contactJson = (await contactResponse.json()) as {
      contact?: { id?: string };
    };
    const contactId = contactJson.contact?.id;
    if (!contactId) {
      return { status: "error", reason: "contacts.upsert missing contact id" };
    }

    // Attach the message as a note (best effort).
    await ghlFetch(`/contacts/${contactId}/notes`, {
      method: "POST",
      body: {
        body: [
          `Website enquiry (${input.source}, ${input.locale})`,
          input.service ? `Service: ${input.service}` : null,
          "",
          input.message,
        ]
          .filter(Boolean)
          .join("\n"),
      },
    }).catch(() => undefined);

    // Open an opportunity when a pipeline is configured (best effort).
    if (pipelineId && pipelineStageId) {
      await ghlFetch("/opportunities/", {
        method: "POST",
        body: {
          locationId,
          pipelineId,
          pipelineStageId,
          contactId,
          name: input.company || input.name,
          status: "open",
          source: input.source,
        },
      }).catch(() => undefined);
    }

    return { status: "ok", contactId };
  } catch (error) {
    return {
      status: "error",
      reason: error instanceof Error ? error.message : "unknown error",
    };
  }
}

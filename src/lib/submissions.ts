import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import type { LeadInput } from "./validation";

/**
 * Lead delivery.
 *
 * A lead must reach at least one durable sink before the API reports success —
 * otherwise a submission would be silently lost on an ephemeral filesystem.
 *
 * Channels, attempted on every submission:
 *  - `LEADS_WEBHOOK_URL` — a durable external sink (Zapier / Make / Sheets /
 *    Slack / email). This is the recommended production path until HighLevel is
 *    connected.
 *  - the local NDJSON store (`.data/submissions.jsonl`) — durable on a single
 *    persistent host; best-effort on serverless / read-only filesystems.
 *
 * HighLevel (`GHL_*`) is an additional channel handled by the route. Callers
 * must treat a `delivered: false` result as a failure and surface it, never as
 * success.
 */

export type SubmissionRecord = LeadInput & {
  id: string;
  receivedAt: string;
  userAgent: string | null;
};

const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "submissions.jsonl");
const WEBHOOK_TIMEOUT_MS = 8000;

export function createSubmission(
  input: LeadInput,
  userAgent: string | null,
): SubmissionRecord {
  return {
    ...input,
    id: crypto.randomUUID(),
    receivedAt: new Date().toISOString(),
    userAgent,
  };
}

/** Append to the local NDJSON store. Throws if the filesystem is not writable. */
export async function saveSubmission(record: SubmissionRecord): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  await appendFile(DATA_FILE, `${JSON.stringify(record)}\n`, "utf8");
}

async function postToWebhook(
  url: string,
  record: SubmissionRecord,
): Promise<void> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(record),
    signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
  });
  if (!response.ok) {
    throw new Error(`webhook responded ${response.status}`);
  }
}

export type DeliveryResult = {
  /** True once at least one durable channel accepted the record. */
  delivered: boolean;
  /** Channels that succeeded. */
  channels: string[];
  /** Per-channel failure reasons (for honest server-side logging). */
  errors: string[];
};

function message(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

export async function deliverLead(
  record: SubmissionRecord,
): Promise<DeliveryResult> {
  const channels: string[] = [];
  const errors: string[] = [];

  const webhookUrl = process.env.LEADS_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await postToWebhook(webhookUrl, record);
      channels.push("webhook");
    } catch (error) {
      errors.push(`webhook: ${message(error)}`);
    }
  }

  try {
    await saveSubmission(record);
    channels.push("file");
  } catch (error) {
    errors.push(`file: ${message(error)}`);
  }

  return { delivered: channels.length > 0, channels, errors };
}

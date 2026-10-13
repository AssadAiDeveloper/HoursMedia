import { NextResponse } from "next/server";
import { leadSchema, fieldErrors, isSpam } from "@/lib/validation";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { createSubmission, deliverLead } from "@/lib/submissions";
import { pushLeadToGhl, ghlStatus } from "@/lib/ghl/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid-json" },
      { status: 400 },
    );
  }

  const parsed = leadSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "validation", fields: fieldErrors(parsed.error) },
      { status: 400 },
    );
  }

  const lead = parsed.data;

  // Rate limit per client before doing any work.
  const limit = rateLimit(`leads:${clientKey(request.headers)}`);
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, error: "rate-limited" },
      {
        status: 429,
        headers: { "Retry-After": String(limit.retryAfterSeconds) },
      },
    );
  }

  // Spam signals: respond exactly as on success so bots learn nothing, but
  // never store or forward the submission.
  if (isSpam(lead)) {
    return NextResponse.json({ ok: true });
  }

  const userAgent = request.headers.get("user-agent");
  const record = createSubmission(lead, userAgent);

  // Deliver to every configured sink. A lead counts as received only once at
  // least one durable channel accepted it, so a submission is never silently
  // lost on an ephemeral filesystem.
  const delivery = await deliverLead(record);

  const ghl = await pushLeadToGhl({
    name: lead.name,
    email: lead.email,
    phone: lead.phone || null,
    company: lead.company || null,
    service: lead.service ?? null,
    message: lead.message,
    locale: lead.locale,
    source: lead.kind,
  });

  if (!delivery.delivered && ghl.status !== "ok") {
    const reasons = [
      ...delivery.errors,
      ghl.status === "error" ? `ghl: ${ghl.reason}` : "ghl: awaiting-credentials",
    ];
    console.warn(
      `[leads] delivery failed for ${record.id}: ${reasons.join("; ")}`,
    );
    return NextResponse.json(
      { ok: false, error: "delivery-failed" },
      { status: 502 },
    );
  }

  if (ghl.status === "error") {
    console.warn(`[leads] GHL push failed for ${record.id}: ${ghl.reason}`);
  }

  return NextResponse.json({
    ok: true,
    id: record.id,
    crm: ghlStatus(),
  });
}

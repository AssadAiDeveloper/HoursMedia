import { z } from "zod";
import { services } from "@/config/services";
import { locales } from "@/i18n/routing";

const serviceIds = services.map((service) => service.id) as [
  string,
  ...string[],
];

export const leadFormKinds = ["contact", "brief"] as const;

export const leadSchema = z.object({
  kind: z.enum(leadFormKinds),
  locale: z.enum(locales),
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  budget: z.string().trim().max(80).optional().or(z.literal("")),
  service: z.enum(serviceIds).optional(),
  message: z.string().trim().min(10).max(4000),
  consent: z.literal(true),
  /** Honeypot: must stay empty. Filled values are treated as spam. */
  companyWebsite: z.string().max(200).optional(),
  /** Timestamp (ms) when the form was first rendered, for a time-trap check. */
  formStartedAt: z.number().int().optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

/** Minimum time a human plausibly needs before submitting (milliseconds). */
export const MIN_FILL_TIME_MS = 1500;

export function isSpam(input: LeadInput): boolean {
  if (input.companyWebsite && input.companyWebsite.length > 0) return true;
  if (
    typeof input.formStartedAt === "number" &&
    Date.now() - input.formStartedAt < MIN_FILL_TIME_MS
  ) {
    return true;
  }
  return false;
}

/** Field-level errors keyed by field name, for the client to display. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const result: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".");
    if (key && !result[key]) result[key] = issue.message;
  }
  return result;
}

/**
 * Central business settings.
 *
 * Anything the business has not confirmed yet is `null`. Null values are
 * hidden gracefully in the UI and flagged in the launch checklist — we never
 * publish invented contact details, addresses, ratings or social profiles.
 */

export type ContactChannel = {
  /** Display value, e.g. "hello@hoursmedia.com". */
  label: string;
  /** Value used in href, e.g. "mailto:hello@hoursmedia.com". */
  href: string;
};

export type SocialProfile = {
  id: "linkedin" | "instagram" | "facebook" | "x" | "youtube" | "tiktok";
  name: string;
  /** Null until the business confirms the profile URL; rendered as a non-link. */
  url: string | null;
};

export const siteConfig = {
  name: "HoursMedia",
  legalName: null as string | null,
  /** One-line positioning used in metadata and the footer. */
  positioning: {
    en: "Websites, customer journeys and smart automation, built around your business.",
    nl: "Websites, klantreizen en slimme automatisering, gebouwd rond uw bedrijf.",
    ar: "مواقع ومَسارات عملاء وأتمتة ذكية، مبنية حول أعمالك.",
  },
  founded: null as number | null,
  /** Public site origin. Set NEXT_PUBLIC_SITE_URL in every environment. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000")
    .trim()
    .replace(/\/+$/, ""),
  contact: {
    email: null as string | null,
    phone: null as ContactChannel | null,
    /** Used for the tel: link and structured data when present. */
    addressLine: null as string | null,
    city: null as string | null,
    region: null as string | null,
    country: null as string | null,
    postalCode: null as string | null,
    /** IANA timezone shown on the booking page. */
    timezone: "Europe/Amsterdam" as string | null,
  },
  social: [
    { id: "instagram", name: "Instagram", url: null },
    { id: "facebook", name: "Facebook", url: "https://www.facebook.com/profile.php?id=61587018392313" },
    { id: "linkedin", name: "LinkedIn", url: "https://www.linkedin.com/company/hours-media/about" },
    { id: "tiktok", name: "TikTok", url: null },
    { id: "youtube", name: "YouTube", url: null },
  ] as SocialProfile[],
  /** Google Search Console verification token. */
  searchConsoleVerification: null as string | null,
} as const;

export function hasContactEmail(): boolean {
  return Boolean(siteConfig.contact.email);
}

/** A postal address is only emitted for structured data when fully supplied. */
export function hasPostalAddress(): boolean {
  const c = siteConfig.contact;
  return Boolean(c.addressLine && c.city && c.country);
}

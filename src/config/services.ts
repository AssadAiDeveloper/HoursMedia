/**
 * The service registry is the single source of truth for service routing,
 * grouping and the sitemap. Long-form copy lives in `src/content/services.ts`
 * keyed by the same `id`, so layout code never changes when content does.
 */

export type ServiceGroupId = "presence" | "content" | "operations" | "apps";

export type ServiceId =
  | "website-design"
  | "social-media"
  | "seo"
  | "paid-advertising"
  | "youtube-management"
  | "video-design"
  | "gohighlevel-automation"
  | "reputation-management"
  | "custom-apps-ai";

export type ServiceDefinition = {
  id: ServiceId;
  /** Locale-independent slug used in /services/[service]. */
  slug: string;
  group: ServiceGroupId;
  /** Whether the business confirmed this as a real, offered service. */
  confirmed: boolean;
};

export const serviceGroups: {
  id: ServiceGroupId;
  serviceIds: ServiceId[];
}[] = [
  {
    id: "presence",
    serviceIds: ["website-design", "social-media", "seo", "paid-advertising"],
  },
  {
    id: "content",
    serviceIds: ["youtube-management", "video-design"],
  },
  {
    id: "operations",
    serviceIds: ["gohighlevel-automation", "reputation-management"],
  },
  { id: "apps", serviceIds: ["custom-apps-ai"] },
];

export const services: ServiceDefinition[] = [
  {
    id: "website-design",
    slug: "website-design",
    group: "presence",
    confirmed: true,
  },
  { id: "social-media", slug: "social-media", group: "presence", confirmed: true },
  { id: "seo", slug: "seo", group: "presence", confirmed: true },
  {
    id: "paid-advertising",
    slug: "paid-advertising",
    group: "presence",
    confirmed: true,
  },
  {
    id: "youtube-management",
    slug: "youtube-management",
    group: "content",
    confirmed: true,
  },
  {
    id: "video-design",
    slug: "video-design",
    group: "content",
    confirmed: true,
  },
  {
    id: "gohighlevel-automation",
    slug: "gohighlevel-automation",
    group: "operations",
    confirmed: true,
  },
  {
    id: "reputation-management",
    slug: "reputation-management",
    group: "operations",
    confirmed: true,
  },
  {
    id: "custom-apps-ai",
    slug: "custom-apps-ai",
    group: "apps",
    confirmed: true,
  },
];

export function confirmedServices(): ServiceDefinition[] {
  return services.filter((service) => service.confirmed);
}

export function serviceBySlug(slug: string): ServiceDefinition | undefined {
  return services.find((service) => service.slug === slug);
}

export function servicesByGroup(group: ServiceGroupId): ServiceDefinition[] {
  return services.filter((service) => service.group === group && service.confirmed);
}

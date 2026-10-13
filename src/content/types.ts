import type { ServiceGroupId, ServiceId } from "@/config/services";

export type Block =
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string };

export type ListSection = {
  heading: string;
  intro?: string;
  items: string[];
};

export type ServiceContent = {
  id: ServiceId;
  group: ServiceGroupId;
  /** Short label used in navigation and cards. */
  label: string;
  /** One-sentence promise shown under the page title. */
  tagline: string;
  meta: { title: string; description: string };
  problem: { heading: string; body: string };
  audience: ListSection;
  deliverables: ListSection;
  notIncluded: ListSection;
  approach: { heading: string; steps: { title: string; body: string }[] };
  clientInputs: ListSection;
  /** Demonstrations are explicitly labelled; never presented as client results. */
  demonstration: { heading: string; note: string; items: string[] } | null;
  faqs: { q: string; a: string }[];
  cta: { heading: string; body: string };
  related: ServiceId[];
};

export type ProjectKind = "concept" | "internal" | "client";

/** Message key (under `common`) used to label a project's kind. */
export const PROJECT_KIND_MESSAGE_KEY = {
  concept: "common.concept",
  internal: "common.internal",
  client: "common.client",
} as const satisfies Record<ProjectKind, string>;

export type ProjectContent = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  kind: ProjectKind;
  year: string;
  tags: string[];
  services: ServiceId[];
  challenge: string;
  approach: string;
  outcome: string;
  /** Describes what the visual represents when it is not a real screenshot. */
  visualNote: string;
  /** Optional real screenshot (public path); falls back to generated artwork. */
  image?: string;
  palette: "gold" | "charcoal" | "warm";
};

export type ArticleContent = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  date: string;
  readingMinutes: number;
  tags: string[];
  body: Block[];
};

export type LegalSection = { heading: string; blocks: Block[] };

export type LegalDoc = {
  title: string;
  metaDescription: string;
  updated: string;
  /** Legal drafts must be reviewed by the business before indexed publication. */
  reviewed: boolean;
  intro: string;
  sections: LegalSection[];
};

export type LocaleContent = {
  services: Record<ServiceId, ServiceContent>;
  projects: ProjectContent[];
  articles: ArticleContent[];
  legal: {
    privacy: LegalDoc;
    cookies: LegalDoc;
    terms: LegalDoc;
  };
};

import type { MetadataRoute } from "next";
import { getLocaleContent } from "@/content";
import { en } from "@/content/en";
import { confirmedServices } from "@/config/services";
import { siteConfig } from "@/config/site";
import { defaultLocale, locales } from "@/i18n/routing";

const STATIC_PATHS = [
  "",
  "/services",
  "/work",
  "/insights",
  "/about",
  "/process",
  "/contact",
  "/book",
  "/brief",
] as const;

function absolute(path: string): string {
  return `${siteConfig.url}${path}`;
}

function languagesFor(path: string): Record<string, string> {
  return {
    ...Object.fromEntries(
      locales.map((locale) => [locale, absolute(`/${locale}${path}`)]),
    ),
    "x-default": absolute(`/${defaultLocale}${path}`),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const content = getLocaleContent(defaultLocale);
  const entries: MetadataRoute.Sitemap = [];

  const dynamicPaths: string[] = [
    ...confirmedServices().map((service) => `/services/${service.id}`),
    ...en.projects.map((project) => `/work/${project.slug}`),
    ...en.articles.map((article) => `/insights/${article.slug}`),
  ];

  const legal = content.legal;
  if (legal.privacy.reviewed) dynamicPaths.push("/privacy");
  if (legal.cookies.reviewed) dynamicPaths.push("/cookies");
  if (legal.terms.reviewed) dynamicPaths.push("/terms");

  const allPaths = [...STATIC_PATHS, ...dynamicPaths];

  const articleDates = new Map(
    en.articles.map((article) => [
      `/insights/${article.slug}`,
      new Date(article.date),
    ]),
  );

  for (const locale of locales) {
    for (const path of allPaths) {
      const lastModified = articleDates.get(path);
      entries.push({
        url: absolute(`/${locale}${path}`),
        ...(lastModified ? { lastModified } : {}),
        alternates: { languages: languagesFor(path) },
      });
    }
  }

  return entries;
}

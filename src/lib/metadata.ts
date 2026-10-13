import type { Metadata } from "next";
import { defaultLocale, locales } from "@/i18n/routing";

/**
 * Builds `alternates` for a page: the canonical URL plus an `hreflang`
 * alternate for every locale.
 *
 * Pages that set `alternates` replace the layout's object wholesale, so each
 * page must emit its own language links — otherwise no `rel="alternate"`
 * tags are rendered and search engines cannot relate the translations.
 *
 * @param locale active locale, e.g. "en"
 * @param path locale-agnostic pathname, e.g. "" or "/about"
 */
export function buildAlternates(
  locale: string,
  path = "",
): Metadata["alternates"] {
  return {
    canonical: `/${locale}${path}`,
    languages: {
      ...Object.fromEntries(locales.map((l) => [l, `/${l}${path}`])),
      "x-default": `/${defaultLocale}${path}`,
    },
  };
}

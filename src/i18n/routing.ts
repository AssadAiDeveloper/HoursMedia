import { defineRouting } from "next-intl/routing";

/**
 * Locale strategy: every public page lives under a locale prefix
 * (/en/..., /nl/..., /ar/...) and shares the same pathname across locales.
 * This keeps hreflang relationships exact and the language switcher trivial
 * (swap the prefix, keep the rest of the URL).
 */
export const locales = ["en", "nl", "ar"] as const;

export type AppLocale = (typeof locales)[number];

export const defaultLocale: AppLocale = "en";

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "always",
});

export function isAppLocale(value: string): value is AppLocale {
  return (locales as readonly string[]).includes(value);
}

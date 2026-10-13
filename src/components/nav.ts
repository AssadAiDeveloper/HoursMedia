export type NavKey =
  | "services"
  | "work"
  | "process"
  | "insights"
  | "about";

/**
 * Primary navigation. `href` values are locale-independent: the locale-aware
 * `Link` from `src/i18n/navigation.ts` prefixes the active locale.
 */
export const navItems: { key: NavKey; href: string }[] = [
  { key: "services", href: "/services" },
  { key: "work", href: "/work" },
  { key: "process", href: "/process" },
  { key: "insights", href: "/insights" },
  { key: "about", href: "/about" },
];

export const localeNames: Record<string, string> = {
  en: "English",
  nl: "Nederlands",
  ar: "العربية",
};

export const localeShort: Record<string, string> = {
  en: "EN",
  nl: "NL",
  ar: "ع",
};

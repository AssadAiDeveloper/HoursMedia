import type { AppLocale } from "@/i18n/routing";
import type { LocaleContent } from "./types";
import { en } from "./en";
import { nl } from "./nl";
import { ar } from "./ar";

const contentByLocale: Record<AppLocale, LocaleContent> = {
  en,
  nl,
  ar,
};

export function getLocaleContent(locale: AppLocale): LocaleContent {
  return contentByLocale[locale];
}

export * from "./types";

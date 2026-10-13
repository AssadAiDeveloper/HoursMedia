"use client";

import { useTranslations } from "next-intl";
import { openCookieSettings } from "./consent";

/**
 * Opens the consent banner from the footer. Kept in its own module so the
 * footer stays a server component.
 */
export function CookieSettingsButton({ className }: { className?: string }) {
  const t = useTranslations("footer");
  return (
    <button type="button" onClick={openCookieSettings} className={className}>
      {t("cookieSettings")}
    </button>
  );
}

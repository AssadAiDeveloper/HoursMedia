"use client";

import { useTranslations } from "next-intl";
import { buttonClass } from "@/components/button";

/**
 * Error boundary for the locale subtree. Renders inside `[locale]/layout.tsx`,
 * so the site chrome (header, footer) and next-intl provider stay available.
 */
export default function LocaleError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("common");

  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <h1 className="text-3xl md:text-4xl">{t("errorTitle")}</h1>
      <p className="mt-4 max-w-md text-ink-muted">{t("errorBody")}</p>
      <button
        type="button"
        onClick={reset}
        className={buttonClass({ variant: "dark", size: "md", className: "mt-8" })}
      >
        {t("retry")}
      </button>
    </div>
  );
}

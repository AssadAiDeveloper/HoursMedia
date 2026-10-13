import { useTranslations } from "next-intl";

export function SkipLink() {
  const t = useTranslations("common");
  return (
    <a
      href="#main"
      className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:start-4 focus-visible:top-4 focus-visible:z-[100] focus-visible:rounded-full focus-visible:bg-charcoal focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-medium focus-visible:text-offwhite"
    >
      {t("skipToContent")}
    </a>
  );
}

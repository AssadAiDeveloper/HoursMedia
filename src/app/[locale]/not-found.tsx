import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { buttonClass } from "@/components/button";

export default async function LocaleNotFound() {
  const t = await getTranslations("notFound");

  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="eyebrow text-gold-strong">404</p>
      <h1 className="mt-4 text-3xl text-charcoal-deep md:text-4xl">
        {t("title")}
      </h1>
      <p className="mt-4 max-w-prose text-ink-muted">{t("body")}</p>
      <Link
        href="/"
        className={buttonClass({ variant: "dark", size: "md", className: "mt-8" })}
      >
        {t("cta")}
      </Link>
    </section>
  );
}

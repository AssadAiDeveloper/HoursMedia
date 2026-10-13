import type { Metadata } from "next";
import { buildAlternates } from "@/lib/metadata";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import { buttonClass } from "@/components/button";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/book">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "book.meta" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: buildAlternates(locale, "/book"),
  };
}

export default async function BookPage({ params }: PageProps<"/[locale]/book">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations();
  const timezone = siteConfig.contact.timezone;

  return (
    <>
      <PageHeader
        eyebrow={t("book.eyebrow")}
        title={t("book.title")}
        intro={t("book.intro")}
      />

      <Section>
        <div className="container-read mx-auto">
          <div className="rounded-lg border border-line bg-white p-8 md:p-12">
            <div className="blueprint flex h-40 items-center justify-center rounded-md opacity-60">
              <span className="eyebrow text-ink-muted">
                {t("book.placeholderTitle")}
              </span>
            </div>
            <h2 className="mt-8 text-2xl">{t("book.placeholderTitle")}</h2>
            <p className="mt-3 leading-relaxed text-ink-muted">
              {t("book.placeholderBody")}
            </p>
            {timezone ? (
              <p className="mt-4 text-sm text-ink-muted">
                {t("book.timezoneNote", { timezone })}
              </p>
            ) : null}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className={buttonClass({ variant: "dark", size: "md" })}
              >
                {t("cta.primary")}
              </Link>
              <Link
                href="/brief"
                className={buttonClass({ variant: "outline-strong", size: "md" })}
              >
                {t("cta.brief")}
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

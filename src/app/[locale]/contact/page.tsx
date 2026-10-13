import type { Metadata } from "next";
import { buildAlternates } from "@/lib/metadata";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getLocaleContent } from "@/content";
import { isAppLocale } from "@/i18n/routing";
import { confirmedServices } from "@/config/services";
import { hasContactEmail, siteConfig } from "@/config/site";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import { LeadForm } from "@/components/lead-form";
import { buttonClass } from "@/components/button";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact.meta" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: buildAlternates(locale, "/contact"),
  };
}

export default async function ContactPage({
  params,
}: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations();
  const content = getLocaleContent(isAppLocale(locale) ? locale : "en");
  const serviceOptions = confirmedServices().map((service) => ({
    id: service.id,
    label: content.services[service.id].label,
  }));

  return (
    <>
      <PageHeader
        eyebrow={t("contact.eyebrow")}
        title={t("contact.title")}
        intro={t("contact.intro")}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="text-2xl md:text-3xl">{t("contact.formHeading")}</h2>
            <div className="mt-8">
              <LeadForm kind="contact" serviceOptions={serviceOptions} />
            </div>
          </div>

          <aside className="lg:border-s lg:border-line lg:ps-12">
            <h2 className="text-lg font-semibold text-charcoal-deep">
              {t("contact.asideTitle")}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              {t("contact.asideBody")}
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <Link
                href="/book"
                className={buttonClass({ variant: "outline-strong", size: "md" })}
              >
                {t("cta.book")}
              </Link>
              <Link
                href="/brief"
                className={buttonClass({ variant: "outline-strong", size: "md" })}
              >
                {t("cta.brief")}
              </Link>
            </div>

            <div className="mt-8 border-t border-line pt-6 text-sm">
              {hasContactEmail() && siteConfig.contact.email ? (
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="bidi-isolate font-medium text-charcoal underline decoration-gold-strong decoration-2 underline-offset-4"
                >
                  {siteConfig.contact.email}
                </a>
              ) : (
                <p className="text-ink-muted">{t("footer.contactUnavailable")}</p>
              )}
              <p className="mt-3 text-xs text-ink-muted">
                {t("contact.responseNote")}
              </p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import { buildAlternates } from "@/lib/metadata";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getLocaleContent } from "@/content";
import { isAppLocale } from "@/i18n/routing";
import { confirmedServices } from "@/config/services";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import { LeadForm } from "@/components/lead-form";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/brief">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "brief.meta" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: buildAlternates(locale, "/brief"),
  };
}

export default async function BriefPage({
  params,
}: PageProps<"/[locale]/brief">) {
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
        eyebrow={t("brief.eyebrow")}
        title={t("brief.title")}
        intro={t("brief.intro")}
      />

      <Section>
        <div className="container-read mx-auto">
          <h2 className="text-2xl md:text-3xl">{t("brief.formHeading")}</h2>
          <p className="mt-3 text-sm text-ink-muted">{t("brief.responseNote")}</p>
          <div className="mt-8 rounded-lg border border-line bg-white p-6 md:p-10">
            <LeadForm kind="brief" serviceOptions={serviceOptions} />
          </div>
        </div>
      </Section>
    </>
  );
}

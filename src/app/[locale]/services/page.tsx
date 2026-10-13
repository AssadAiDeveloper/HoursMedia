import type { Metadata } from "next";
import { buildAlternates } from "@/lib/metadata";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getLocaleContent } from "@/content";
import { isAppLocale } from "@/i18n/routing";
import { serviceGroups } from "@/config/services";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { ServiceCard } from "@/components/cards";
import { CtaBand } from "@/components/cta-band";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/services">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "servicesPage.meta" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: buildAlternates(locale, "/services"),
  };
}

export default async function ServicesIndexPage({
  params,
}: PageProps<"/[locale]/services">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations();
  const content = getLocaleContent(isAppLocale(locale) ? locale : "en");

  return (
    <>
      <PageHeader
        eyebrow={t("servicesPage.eyebrow")}
        title={t("servicesPage.title")}
        intro={t("servicesPage.intro")}
      />

      {serviceGroups.map((group) => (
        <Section key={group.id} className="border-b border-line last:border-0">
          <p className="eyebrow-lg text-gold-strong">{t(`group.${group.id}`)}</p>
          <div className="mt-8 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {group.serviceIds.map((serviceId, index) => {
              const service = content.services[serviceId];
              return (
                <Reveal key={serviceId} delay={index * 70} className="h-full">
                  <ServiceCard
                    href={`/services/${serviceId}`}
                    id={serviceId}
                    groupLabel={t(`group.${group.id}`)}
                    label={service.label}
                    tagline={service.tagline}
                  />
                </Reveal>
              );
            })}
          </div>
        </Section>
      ))}

      <Section>
        <CtaBand
          heading={t("contact.title")}
          body={t("contact.intro")}
          primaryLabel={t("cta.primary")}
          secondaryLabel={t("cta.book")}
          secondaryHref="/book"
        />
      </Section>
    </>
  );
}

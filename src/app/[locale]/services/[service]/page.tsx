import type { Metadata } from "next";
import { buildAlternates } from "@/lib/metadata";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getLocaleContent } from "@/content";
import { isAppLocale } from "@/i18n/routing";
import { serviceBySlug, services } from "@/config/services";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import { ServiceCard } from "@/components/cards";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { structuredData } from "@/lib/structured-data";

export function generateStaticParams() {
  return services.map((service) => ({ service: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/services/[service]">): Promise<Metadata> {
  const { locale, service } = await params;
  const definition = serviceBySlug(service);
  if (!definition) return {};
  const content = getLocaleContent(isAppLocale(locale) ? locale : "en");
  const data = content.services[definition.id];
  return {
    title: data.meta.title,
    description: data.meta.description,
    alternates: buildAlternates(locale, `/services/${definition.slug}`),
  };
}

export default async function ServiceDetailPage({
  params,
}: PageProps<"/[locale]/services/[service]">) {
  const { locale, service } = await params;
  setRequestLocale(locale);

  const definition = serviceBySlug(service);
  if (!definition) notFound();

  const t = await getTranslations();
  const content = getLocaleContent(isAppLocale(locale) ? locale : "en");
  const data = content.services[definition.id];
  const related = data.related
    .map((id) => content.services[id])
    .filter((item) => item !== undefined);

  return (
    <>
      <JsonLd data={structuredData.service(data, isAppLocale(locale) ? locale : "en")} />
      {data.faqs.length > 0 ? (
        <JsonLd data={structuredData.faqPage(data.faqs)} />
      ) : null}
      <JsonLd
        data={structuredData.breadcrumbs([
          { name: t("servicePage.breadcrumbHome"), path: `/${locale}` },
          { name: t("nav.services"), path: `/${locale}/services` },
          { name: data.label, path: `/${locale}/services/${definition.slug}` },
        ])}
      />
      <PageHeader
        eyebrow={t(`group.${definition.group}`)}
        title={data.meta.title}
        intro={data.tagline}
      />

      <Section>
        <div className="container-read mx-auto">
          <h2 className="text-2xl md:text-3xl">{data.problem.heading}</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted">
            {data.problem.body}
          </p>
        </div>
      </Section>

      <Section className="border-y border-line bg-white">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <h2 className="text-xl font-semibold text-charcoal-deep">
              {data.audience.heading}
            </h2>
            {data.audience.intro ? (
              <p className="mt-2 text-ink-muted">{data.audience.intro}</p>
            ) : null}
            <ul className="mt-5 space-y-3">
              {data.audience.items.map((item) => (
                <li key={item} className="flex gap-3 text-ink">
                  <span
                    aria-hidden
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-strong"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-charcoal-deep">
              {data.deliverables.heading}
            </h2>
            <ul className="mt-5 space-y-3">
              {data.deliverables.items.map((item) => (
                <li key={item} className="flex gap-3 text-ink">
                  <span
                    aria-hidden
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-strong"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-charcoal-deep">
              {data.notIncluded.heading}
            </h2>
            <ul className="mt-5 space-y-3">
              {data.notIncluded.items.map((item) => (
                <li key={item} className="flex gap-3 text-ink-muted">
                  <span
                    aria-hidden
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-line-strong"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section>
        <div className="container-read mx-auto">
          <h2 className="text-2xl md:text-3xl">{data.approach.heading}</h2>
          <ol className="mt-8 space-y-8">
            {data.approach.steps.map((step, index) => (
              <li key={step.title} className="flex gap-5">
                <span className="font-mono text-sm text-gold-strong">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-charcoal-deep">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 leading-relaxed text-ink-muted">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section className="border-y border-line bg-white">
        <div className="container-read mx-auto">
          <h2 className="text-2xl md:text-3xl">{data.clientInputs.heading}</h2>
          <ul className="mt-6 space-y-3">
            {data.clientInputs.items.map((item) => (
              <li key={item} className="flex gap-3 text-ink">
                <span
                  aria-hidden
                  className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-strong"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {data.demonstration ? (
        <Section>
          <div className="container-read mx-auto rounded-lg border-s-2 border-gold bg-offwhite p-6 md:p-8">
            <h2 className="text-xl font-semibold text-charcoal-deep">
              {data.demonstration.heading}
            </h2>
            <p className="mt-3 leading-relaxed text-ink-muted">
              {data.demonstration.note}
            </p>
            {data.demonstration.items.length > 0 ? (
              <ul className="mt-4 space-y-2">
                {data.demonstration.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-ink-muted">
                    <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-muted" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </Section>
      ) : null}

      {data.faqs.length > 0 ? (
        <Section className="border-t border-line bg-white">
          <div className="container-read mx-auto">
            <h2 className="text-2xl md:text-3xl">{t("servicePage.faqsHeading")}</h2>
            <div className="mt-8 divide-y divide-line border-y border-line">
              {data.faqs.map((faq) => (
                <details key={faq.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-medium text-charcoal-deep">
                    {faq.q}
                    <span
                      aria-hidden
                      className="text-gold-strong transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 leading-relaxed text-ink-muted">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </Section>
      ) : null}

      {related.length > 0 ? (
        <Section>
          <h2 className="text-2xl md:text-3xl">
            {t("servicePage.relatedHeading")}
          </h2>
          <div className="mt-8 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => {
              const relatedDefinition = serviceBySlug(item.id);
              return (
                <ServiceCard
                  key={item.id}
                  href={`/services/${relatedDefinition?.slug ?? item.id}`}
                  id={item.id}
                  groupLabel={t(`group.${item.group}`)}
                  label={item.label}
                  tagline={item.tagline}
                />
              );
            })}
          </div>
        </Section>
      ) : null}

      <Section>
        <CtaBand
          heading={data.cta.heading}
          body={data.cta.body}
          primaryLabel={t("cta.primary")}
          secondaryLabel={t("cta.book")}
          secondaryHref="/book"
        />
      </Section>

      <div className="container-page pb-16">
        <Link
          href="/services"
          className="text-sm font-semibold text-charcoal underline decoration-gold-strong decoration-2 underline-offset-4 hover:text-gold-strong"
        >
          &larr; {t("common.allServices")}
        </Link>
      </div>
    </>
  );
}

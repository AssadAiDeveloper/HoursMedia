import type { Metadata } from "next";
import { buildAlternates } from "@/lib/metadata";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import { CtaBand } from "@/components/cta-band";

const VALUE_IDS = ["honesty", "craft", "ownership", "clarity"] as const;

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about.meta" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: buildAlternates(locale, "/about"),
  };
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations();
  const paragraphs = t.raw("about.story.paragraphs") as string[];

  return (
    <>
      <PageHeader
        eyebrow={t("about.eyebrow")}
        title={t("about.title")}
        intro={t("about.intro")}
      />

      <Section>
        <div className="container-read mx-auto">
          <h2 className="text-2xl md:text-3xl">{t("about.story.title")}</h2>
          <div className="mt-6 space-y-5">
            {paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-lg leading-relaxed text-ink-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Section>

      <Section className="border-y border-line bg-white">
        <h2 className="text-2xl md:text-3xl">{t("about.values.title")}</h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {VALUE_IDS.map((id) => (
            <div key={id} className="border-t-2 border-gold pt-5">
              <h3 className="text-lg font-semibold text-charcoal-deep">
                {t(`about.values.items.${id}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {t(`about.values.items.${id}.body`)}
              </p>
            </div>
          ))}
        </div>
      </Section>

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

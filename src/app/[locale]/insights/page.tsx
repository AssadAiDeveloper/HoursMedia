import type { Metadata } from "next";
import { buildAlternates } from "@/lib/metadata";
import { getTranslations, getFormatter, setRequestLocale } from "next-intl/server";
import { getLocaleContent } from "@/content";
import { isAppLocale } from "@/i18n/routing";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { ArticleCard } from "@/components/cards";
import { CtaBand } from "@/components/cta-band";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/insights">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "insightsPage.meta" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: buildAlternates(locale, "/insights"),
  };
}

export default async function InsightsIndexPage({
  params,
}: PageProps<"/[locale]/insights">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations();
  const format = await getFormatter();
  const content = getLocaleContent(isAppLocale(locale) ? locale : "en");

  return (
    <>
      <PageHeader
        eyebrow={t("insightsPage.eyebrow")}
        title={t("insightsPage.title")}
        intro={t("insightsPage.intro")}
      />

      <Section>
        <div className="grid auto-rows-fr gap-6 md:grid-cols-3">
          {content.articles.map((article, index) => (
            <Reveal key={article.id} delay={index * 80} className="h-full">
              <ArticleCard
                href={`/insights/${article.slug}`}
                title={article.title}
                summary={article.summary}
                dateLabel={format.dateTime(new Date(article.date), "long")}
                readingLabel={t("insightsPage.readingLabel", {
                  minutes: article.readingMinutes,
                })}
                tags={article.tags}
              />
            </Reveal>
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

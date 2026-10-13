import type { Metadata } from "next";
import { buildAlternates } from "@/lib/metadata";
import { notFound } from "next/navigation";
import { getTranslations, getFormatter, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getLocaleContent } from "@/content";
import { en } from "@/content/en";
import { isAppLocale } from "@/i18n/routing";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import { Blocks } from "@/components/blocks";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { structuredData } from "@/lib/structured-data";

export function generateStaticParams() {
  return en.articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/insights/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const content = getLocaleContent(isAppLocale(locale) ? locale : "en");
  const article = content.articles.find((item) => item.slug === slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.summary,
    alternates: buildAlternates(locale, `/insights/${article.slug}`),
    openGraph: {
      type: "article",
      title: article.title,
      description: article.summary,
      publishedTime: article.date,
    },
  };
}

export default async function InsightDetailPage({
  params,
}: PageProps<"/[locale]/insights/[slug]">) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const content = getLocaleContent(isAppLocale(locale) ? locale : "en");
  const article = content.articles.find((item) => item.slug === slug);
  if (!article) notFound();

  const t = await getTranslations();
  const format = await getFormatter();

  return (
    <>
      <JsonLd data={structuredData.article(article, isAppLocale(locale) ? locale : "en")} />
      <JsonLd
        data={structuredData.breadcrumbs([
          { name: t("servicePage.breadcrumbHome"), path: `/${locale}` },
          { name: t("nav.insights"), path: `/${locale}/insights` },
          { name: article.title, path: `/${locale}/insights/${article.slug}` },
        ])}
      />
      <PageHeader
        eyebrow={t("insightsPage.eyebrow")}
        title={article.title}
        intro={article.summary}
      >
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-ink-muted">
          <time dateTime={article.date}>
            {format.dateTime(new Date(article.date), "long")}
          </time>
          <span aria-hidden>&middot;</span>
          <span>
            {t("insightsPage.readingLabel", {
              minutes: article.readingMinutes,
            })}
          </span>
        </div>
        <ul className="mt-4 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-offwhite px-3 py-1 text-xs text-ink-muted"
            >
              {tag}
            </li>
          ))}
        </ul>
      </PageHeader>

      <Section>
        <article className="container-read mx-auto">
          <Blocks blocks={article.body} />
        </article>
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

      <div className="container-page pb-16">
        <Link
          href="/insights"
          className="text-sm font-semibold text-charcoal underline decoration-gold-strong decoration-2 underline-offset-4 hover:text-gold-strong"
        >
          &larr; {t("common.allArticles")}
        </Link>
      </div>
    </>
  );
}

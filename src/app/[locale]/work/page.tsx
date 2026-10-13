import type { Metadata } from "next";
import { buildAlternates } from "@/lib/metadata";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getLocaleContent, PROJECT_KIND_MESSAGE_KEY } from "@/content";
import { isAppLocale } from "@/i18n/routing";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { ProjectCard } from "@/components/cards";
import { CtaBand } from "@/components/cta-band";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/work">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "workPage.meta" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: buildAlternates(locale, "/work"),
  };
}

export default async function WorkIndexPage({
  params,
}: PageProps<"/[locale]/work">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations();
  const content = getLocaleContent(isAppLocale(locale) ? locale : "en");

  return (
    <>
      <PageHeader
        eyebrow={t("workPage.eyebrow")}
        title={t("workPage.title")}
        intro={t("workPage.intro")}
      />

      <Section>
        <div className="grid auto-rows-fr gap-6 md:grid-cols-3">
          {content.projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 80} className="h-full">
              <ProjectCard
                href={`/work/${project.slug}`}
                slug={project.slug}
                title={project.title}
                summary={project.summary}
                kindLabel={t(PROJECT_KIND_MESSAGE_KEY[project.kind])}
                tags={project.tags}
                palette={project.palette}
                image={project.image}
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

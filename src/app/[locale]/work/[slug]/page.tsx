import type { Metadata } from "next";
import { buildAlternates } from "@/lib/metadata";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getLocaleContent, PROJECT_KIND_MESSAGE_KEY } from "@/content";
import { en } from "@/content/en";
import { isAppLocale } from "@/i18n/routing";
import { serviceBySlug } from "@/config/services";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { ProjectVisual } from "@/components/visuals";
import { CtaBand } from "@/components/cta-band";

export function generateStaticParams() {
  return en.projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/work/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const content = getLocaleContent(isAppLocale(locale) ? locale : "en");
  const project = content.projects.find((item) => item.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: buildAlternates(locale, `/work/${project.slug}`),
  };
}

export default async function WorkDetailPage({
  params,
}: PageProps<"/[locale]/work/[slug]">) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const content = getLocaleContent(isAppLocale(locale) ? locale : "en");
  const project = content.projects.find((item) => item.slug === slug);
  if (!project) notFound();

  const t = await getTranslations();
  const kindLabel = t(PROJECT_KIND_MESSAGE_KEY[project.kind]);

  return (
    <>
      <PageHeader
        eyebrow={`${kindLabel} · ${project.year}`}
        title={project.title}
        intro={project.summary}
      />

      <Section>
        <Reveal>
          <ProjectVisual
            slug={project.slug}
            palette={project.palette}
            image={project.image}
            sizes="(min-width: 768px) 896px, 100vw"
            className="h-56 w-full overflow-hidden rounded-lg border border-line md:h-80"
          />
        </Reveal>
        <p className="mt-4 text-sm text-ink-muted">
          <span className="font-semibold">{t("workPage.noteLabel")}:</span>{" "}
          {project.visualNote}
        </p>
      </Section>

      <Section className="border-y border-line bg-white">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <h2 className="text-xl font-semibold text-charcoal-deep">
              {t("workPage.challengeLabel")}
            </h2>
            <p className="mt-3 leading-relaxed text-ink-muted">
              {project.challenge}
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-charcoal-deep">
              {t("workPage.approachLabel")}
            </h2>
            <p className="mt-3 leading-relaxed text-ink-muted">
              {project.approach}
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-charcoal-deep">
              {t("workPage.outcomeLabel")}
            </h2>
            <p className="mt-3 leading-relaxed text-ink-muted">
              {project.outcome}
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-muted">
              {t("workPage.servicesLabel")}
            </h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              {project.services.map((serviceId) => {
                const definition = serviceBySlug(serviceId);
                const label = content.services[serviceId]?.label ?? serviceId;
                return (
                  <li key={serviceId}>
                    <Link
                      href={`/services/${definition?.slug ?? serviceId}`}
                      className="inline-flex rounded-full border border-line-strong px-4 py-1.5 text-sm text-charcoal transition-colors hover:border-gold-strong hover:text-gold-strong"
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-muted">
              {t("workPage.noteLabel")}
            </h2>
            <p className="mt-4 leading-relaxed text-ink-muted">
              {project.visualNote}
            </p>
          </div>
        </div>
      </Section>

      <Section className="pt-0">
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
          href="/work"
          className="text-sm font-semibold text-charcoal underline decoration-gold-strong decoration-2 underline-offset-4 hover:text-gold-strong"
        >
          &larr; {t("common.allProjects")}
        </Link>
      </div>
    </>
  );
}

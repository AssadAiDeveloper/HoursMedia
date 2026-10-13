import { setRequestLocale, getTranslations, getFormatter } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getLocaleContent, PROJECT_KIND_MESSAGE_KEY } from "@/content";
import { isAppLocale } from "@/i18n/routing";
import { confirmedServices } from "@/config/services";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { ServiceCard, ProjectCard, ArticleCard } from "@/components/cards";
import { CtaBand } from "@/components/cta-band";
import { HeroVisual } from "@/components/visuals";
import { MotionToggle } from "@/components/motion-toggle";
import { buttonClass } from "@/components/button";
import { PlatformGlyph, platformIds } from "@/components/social-icons";

const STEP_IDS = ["discover", "design", "build", "launch"] as const;
const PRINCIPLE_IDS = ["honest", "clear", "partnership"] as const;

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations();
  const format = await getFormatter();
  const content = getLocaleContent(isAppLocale(locale) ? locale : "en");
  const services = confirmedServices();
  const homeServices = services.filter(
    (service) => service.id !== "reputation-management",
  );

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-charcoal-deep text-offwhite">
        <div className="glow-warm absolute inset-0 opacity-40" aria-hidden />
        <div className="blueprint absolute inset-0 opacity-[0.06]" aria-hidden />
        <div className="animate-sheen pointer-events-none absolute inset-0" aria-hidden />

        <div className="container-page relative grid gap-14 pt-20 pb-16 md:grid-cols-[1.1fr_0.9fr] md:items-center md:pt-28 md:pb-20">
          <div>
            <p
              className="eyebrow animate-fade-up text-gold"
              style={{ animationDelay: "40ms" }}
            >
              {t("home.hero.eyebrow")}
            </p>
            <h1
              className="mt-5 max-w-2xl animate-fade-up text-4xl text-offwhite md:text-6xl"
              style={{ animationDelay: "120ms" }}
            >
              {t("home.hero.title")}
            </h1>
            <p
              className="mt-6 max-w-xl animate-fade-up text-lg leading-relaxed text-offwhite/70"
              style={{ animationDelay: "200ms" }}
            >
              {t("home.hero.intro")}
            </p>
            <div
              className="mt-9 flex animate-fade-up flex-wrap gap-3"
              style={{ animationDelay: "280ms" }}
            >
              <Link
                href="/contact"
                className={buttonClass({ variant: "primary", size: "md" })}
              >
                {t("home.hero.primaryCta")}
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
                >
                  &rarr;
                </span>
              </Link>
              <Link
                href="/services"
                className={buttonClass({ variant: "outline-dark", size: "md" })}
              >
                {t("home.hero.secondaryCta")}
              </Link>
            </div>
            <MotionToggle className="mt-6" />
          </div>

          <div className="animate-fade-in" style={{ animationDelay: "160ms" }}>
            <HeroVisual />
          </div>
        </div>

        {/* Decorative keyword strip — repeats so the loop stays seamless. */}
        <div
          aria-hidden
          className="marquee relative overflow-hidden border-t border-offwhite/10 py-5"
        >
          <div className="marquee-track flex w-max items-center">
            {[0, 1, 2, 3].map((copy) => (
              <div key={copy} className="flex shrink-0 items-center gap-10 pr-10">
                {services.map((service, index) => (
                  <span
                    key={`${copy}-${service.id}`}
                    className="eyebrow flex items-center gap-10 whitespace-nowrap text-offwhite/45"
                  >
                    <PlatformGlyph
                      id={platformIds[index % platformIds.length]}
                      className="h-4 w-4 text-gold/70"
                    />
                    {content.services[service.id].label}
                    <span className="text-gold">&bull;</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-charcoal-deep to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-charcoal-deep to-transparent" />
        </div>
      </section>

      {/* Services */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow-lg text-gold-strong">{t("home.services.eyebrow")}</p>
            <h2 className="mt-3 text-3xl md:text-4xl">{t("home.services.title")}</h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted">
              {t("home.services.intro")}
            </p>
          </div>
          <Link
            href="/services"
            className="text-sm font-semibold text-charcoal underline decoration-gold-strong decoration-2 underline-offset-4 hover:text-gold-strong"
          >
            {t("common.allServices")}
          </Link>
        </div>
        <div className="mt-12 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {homeServices.map((service, index) => (
            <Reveal key={service.id} delay={index * 70} className="h-full">
              <ServiceCard
                href={`/services/${service.slug}`}
                id={service.id}
                groupLabel={t(`group.${service.group}`)}
                label={content.services[service.id].label}
                tagline={content.services[service.id].tagline}
              />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Process preview */}
      <Section className="bg-white" id="process">
        <div className="max-w-2xl">
          <p className="eyebrow-lg text-gold-strong">{t("home.process.eyebrow")}</p>
          <h2 className="mt-3 text-3xl md:text-4xl">{t("home.process.title")}</h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">
            {t("home.process.intro")}
          </p>
        </div>
        <ol className="mt-12 grid gap-8 md:grid-cols-4">
          {STEP_IDS.map((id, index) => (
            <li key={id} className="h-full">
              <Reveal delay={index * 90} className="h-full border-t border-line pt-5">
                <span className="font-mono text-sm text-gold-strong">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-charcoal-deep">
                  {t(`process.steps.${id}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {t(`process.steps.${id}.body`)}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      {/* Work */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow-lg text-gold-strong">{t("home.work.eyebrow")}</p>
            <h2 className="mt-3 text-3xl md:text-4xl">{t("home.work.title")}</h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted">
              {t("home.work.intro")}
            </p>
          </div>
          <Link
            href="/work"
            className="text-sm font-semibold text-charcoal underline decoration-gold-strong decoration-2 underline-offset-4 hover:text-gold-strong"
          >
            {t("common.allProjects")}
          </Link>
        </div>
        <div className="mt-12 grid auto-rows-fr gap-6 md:grid-cols-3">
          {content.projects.slice(0, 3).map((project, index) => (
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

      {/* Principles */}
      <Section className="bg-white">
        <div className="max-w-2xl">
          <p className="eyebrow-lg text-gold-strong">
            {t("home.principles.eyebrow")}
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl">
            {t("home.principles.title")}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">
            {t("home.principles.intro")}
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {PRINCIPLE_IDS.map((id, index) => (
            <Reveal key={id} delay={index * 90} className="h-full">
              <div className="h-full border-t-2 border-gold pt-5">
                <h3 className="text-lg font-semibold text-charcoal-deep">
                  {t(`home.principles.items.${id}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {t(`home.principles.items.${id}.body`)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Insights */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow-lg text-gold-strong">
              {t("home.insights.eyebrow")}
            </p>
            <h2 className="mt-3 text-3xl md:text-4xl">
              {t("home.insights.title")}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted">
              {t("home.insights.intro")}
            </p>
          </div>
          <Link
            href="/insights"
            className="text-sm font-semibold text-charcoal underline decoration-gold-strong decoration-2 underline-offset-4 hover:text-gold-strong"
          >
            {t("common.allArticles")}
          </Link>
        </div>
        <div className="mt-12 grid auto-rows-fr gap-6 md:grid-cols-3">
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

import type { Metadata } from "next";
import { buildAlternates } from "@/lib/metadata";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import { CtaBand } from "@/components/cta-band";

const STEP_IDS = ["discover", "design", "build", "launch"] as const;

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/process">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "process.meta" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: buildAlternates(locale, "/process"),
  };
}

export default async function ProcessPage({
  params,
}: PageProps<"/[locale]/process">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations();
  const items = t.raw("process.engagement.items") as string[];

  return (
    <>
      <PageHeader
        eyebrow={t("process.eyebrow")}
        title={t("process.title")}
        intro={t("process.intro")}
      />

      <Section>
        <ol className="grid gap-10 md:grid-cols-2">
          {STEP_IDS.map((id, index) => (
            <li key={id} className="flex gap-5">
              <span className="font-mono text-sm text-gold-strong">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="border-t border-line pt-4">
                <h2 className="text-xl font-semibold text-charcoal-deep">
                  {t(`process.steps.${id}.title`)}
                </h2>
                <p className="mt-3 leading-relaxed text-ink-muted">
                  {t(`process.steps.${id}.body`)}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="border-y border-line bg-white">
        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:items-start">
          <div>
            <h2 className="text-2xl md:text-3xl">{t("process.engagement.title")}</h2>
            <p className="mt-4 leading-relaxed text-ink-muted">
              {t("process.engagement.intro")}
            </p>
          </div>
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item} className="flex gap-3 border-s-2 border-gold ps-4">
                <span className="text-ink">{item}</span>
              </li>
            ))}
          </ul>
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

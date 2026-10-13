import { getTranslations } from "next-intl/server";
import type { LegalDoc } from "@/content";
import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import { Blocks } from "@/components/blocks";

export async function LegalPage({ doc }: { doc: LegalDoc }) {
  const t = await getTranslations();

  return (
    <>
      <PageHeader eyebrow={t("footer.legal")} title={doc.title} intro={doc.intro} />

      <Section>
        <div className="container-read mx-auto">
          {!doc.reviewed ? (
            <div
              role="note"
              className="rounded-lg border-s-2 border-gold-strong bg-offwhite p-5 text-sm"
            >
              <p className="font-semibold text-charcoal-deep">
                {t("legal.reviewedNotice")}
              </p>
            </div>
          ) : null}

          <p className="mt-6 text-sm text-ink-muted">
            {t("legal.updatedLabel")}: {doc.updated}
          </p>

          <div className="mt-12 space-y-12">
            {doc.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl text-charcoal-deep">{section.heading}</h2>
                <div className="mt-5">
                  <Blocks blocks={section.blocks} />
                </div>
              </section>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}

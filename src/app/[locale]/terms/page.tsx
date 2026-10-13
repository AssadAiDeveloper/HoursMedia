import type { Metadata } from "next";
import { buildAlternates } from "@/lib/metadata";
import { setRequestLocale } from "next-intl/server";
import { getLocaleContent } from "@/content";
import { isAppLocale } from "@/i18n/routing";
import { LegalPage } from "@/components/legal-page";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/terms">): Promise<Metadata> {
  const { locale } = await params;
  const doc = getLocaleContent(isAppLocale(locale) ? locale : "en").legal.terms;
  return {
    title: doc.title,
    description: doc.metaDescription,
    alternates: buildAlternates(locale, "/terms"),
    robots: doc.reviewed ? undefined : { index: false, follow: false },
  };
}

export default async function TermsPage({
  params,
}: PageProps<"/[locale]/terms">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const doc = getLocaleContent(isAppLocale(locale) ? locale : "en").legal.terms;
  return <LegalPage doc={doc} />;
}

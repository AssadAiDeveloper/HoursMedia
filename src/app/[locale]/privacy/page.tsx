import type { Metadata } from "next";
import { buildAlternates } from "@/lib/metadata";
import { setRequestLocale } from "next-intl/server";
import { getLocaleContent } from "@/content";
import { isAppLocale } from "@/i18n/routing";
import { LegalPage } from "@/components/legal-page";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/privacy">): Promise<Metadata> {
  const { locale } = await params;
  const doc = getLocaleContent(isAppLocale(locale) ? locale : "en").legal.privacy;
  return {
    title: doc.title,
    description: doc.metaDescription,
    alternates: buildAlternates(locale, "/privacy"),
    robots: doc.reviewed ? undefined : { index: false, follow: false },
  };
}

export default async function PrivacyPage({
  params,
}: PageProps<"/[locale]/privacy">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const doc = getLocaleContent(isAppLocale(locale) ? locale : "en").legal.privacy;
  return <LegalPage doc={doc} />;
}

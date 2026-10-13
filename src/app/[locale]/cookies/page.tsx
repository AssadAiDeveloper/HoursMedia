import type { Metadata } from "next";
import { buildAlternates } from "@/lib/metadata";
import { setRequestLocale } from "next-intl/server";
import { getLocaleContent } from "@/content";
import { isAppLocale } from "@/i18n/routing";
import { LegalPage } from "@/components/legal-page";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/cookies">): Promise<Metadata> {
  const { locale } = await params;
  const doc = getLocaleContent(isAppLocale(locale) ? locale : "en").legal.cookies;
  return {
    title: doc.title,
    description: doc.metaDescription,
    alternates: buildAlternates(locale, "/cookies"),
    robots: doc.reviewed ? undefined : { index: false, follow: false },
  };
}

export default async function CookiesPage({
  params,
}: PageProps<"/[locale]/cookies">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const doc = getLocaleContent(isAppLocale(locale) ? locale : "en").legal.cookies;
  return <LegalPage doc={doc} />;
}

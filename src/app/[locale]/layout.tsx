import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import {
  Inter,
  JetBrains_Mono,
  Newsreader,
  Noto_Sans_Arabic,
} from "next/font/google";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/config/site";
import { buildAlternates } from "@/lib/metadata";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SkipLink } from "@/components/skip-link";
import { ConsentProvider } from "@/components/consent";
import { JsonLd } from "@/components/json-ld";
import { structuredData } from "@/lib/structured-data";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-noto-arabic",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: t("title"),
      template: `%s · ${siteConfig.name}`,
    },
    description: t("description"),
    applicationName: siteConfig.name,
    alternates: buildAlternates(locale),
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: t("title"),
      description: t("description"),
      locale,
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${inter.variable} ${newsreader.variable} ${notoArabic.variable} ${jetbrains.variable} h-full`}
    >
      {/* suppressHydrationWarning: browser extensions sometimes inject
          attributes onto <body> (e.g. data-cjcrx) after SSR but before
          hydration. That mismatch is harmless; this silences it. */}
      <body
        suppressHydrationWarning
        className="flex min-h-dvh flex-col bg-offwhite text-ink"
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ConsentProvider>
            <SkipLink />
            <SiteHeader />
            <main id="main" className="flex-1">
              {children}
            </main>
            <SiteFooter />
          </ConsentProvider>
        </NextIntlClientProvider>
        <JsonLd data={structuredData.organization(locale)} />
        <JsonLd data={structuredData.webSite(locale)} />
      </body>
    </html>
  );
}

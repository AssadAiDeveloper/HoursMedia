import { siteConfig } from "@/config/site";
import type { ArticleContent, ServiceContent } from "@/content";
import type { AppLocale } from "@/i18n/routing";

type Json = Record<string, unknown>;

function absolute(path: string): string {
  return `${siteConfig.url}${path}`.replace(/\/{2,}/g, "/").replace(":/", "://");
}

function organization(locale: AppLocale): Json {
  const org: Json = {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absolute("/brand/hoursmedia-symbol.png"),
    description: siteConfig.positioning[locale],
  };
  const socialUrls = siteConfig.social
    .map((profile) => profile.url)
    .filter((url): url is string => Boolean(url));
  if (socialUrls.length > 0) {
    org.sameAs = socialUrls;
  }
  if (
    siteConfig.contact.addressLine &&
    siteConfig.contact.city &&
    siteConfig.contact.country
  ) {
    org.address = {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.addressLine,
      addressLocality: siteConfig.contact.city,
      addressRegion: siteConfig.contact.region ?? undefined,
      postalCode: siteConfig.contact.postalCode ?? undefined,
      addressCountry: siteConfig.contact.country,
    };
  }
  if (siteConfig.contact.email) {
    org.email = siteConfig.contact.email;
  }
  if (siteConfig.contact.phone) {
    org.telephone = siteConfig.contact.phone.label;
  }
  return { "@context": "https://schema.org", ...org };
}

function webSite(locale: AppLocale): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: locale,
    publisher: { "@type": "Organization", name: siteConfig.name },
  };
}

function breadcrumbs(
  items: { name: string; path: string }[],
): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  };
}

function service(
  service: ServiceContent,
  locale: AppLocale,
): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.label,
    description: service.tagline,
    serviceType: service.label,
    inLanguage: locale,
    provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    url: absolute(`/${locale}/services/${service.id}`),
  };
}

function faqPage(faqs: { q: string; a: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

function article(article: ArticleContent, locale: AppLocale): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    datePublished: article.date,
    inLanguage: locale,
    author: { "@type": "Organization", name: siteConfig.name },
    publisher: { "@type": "Organization", name: siteConfig.name },
    mainEntityOfPage: absolute(`/${locale}/insights/${article.slug}`),
  };
}

export const structuredData = {
  organization,
  webSite,
  breadcrumbs,
  service,
  faqPage,
  article,
};

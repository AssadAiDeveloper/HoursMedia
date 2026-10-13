import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getLocaleContent } from "@/content";
import { isAppLocale } from "@/i18n/routing";
import { confirmedServices, serviceGroups } from "@/config/services";
import { hasContactEmail, siteConfig } from "@/config/site";
import { CookieSettingsButton } from "./cookie-settings-button";
import { Logo } from "./logo";
import { PlatformGlyph } from "./social-icons";
import { navItems } from "./nav";

export async function SiteFooter() {
  const locale = await getLocale();
  const t = await getTranslations("footer");
  const tc = await getTranslations("nav");
  const tg = await getTranslations("group");
  const content = getLocaleContent(isAppLocale(locale) ? locale : "en");

  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-line bg-charcoal-deep text-offwhite">
      <div className="container-page grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo className="[&_img]:brightness-0 [&_img]:invert" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-offwhite/70">
            {t("tagline")}
          </p>
          <div className="mt-5 text-sm">
            {hasContactEmail() && siteConfig.contact.email ? (
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="bidi-isolate font-medium text-gold hover:underline"
              >
                {siteConfig.contact.email}
              </a>
            ) : (
              <p className="max-w-xs text-xs leading-relaxed text-offwhite/50">
                {t("contactUnavailable")}
              </p>
            )}
          </div>

          <div className="mt-6">
            <h2 className="eyebrow text-gold">{t("follow")}</h2>
            <ul className="mt-4 flex flex-wrap items-center gap-3">
              {siteConfig.social.map((profile) => (
                <li key={profile.id}>
                  {profile.url ? (
                    <a
                      href={profile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={profile.name}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-offwhite/15 text-offwhite/70 transition-colors hover:border-gold hover:text-gold"
                    >
                      <PlatformGlyph id={profile.id} className="h-4 w-4" />
                    </a>
                  ) : (
                    <span
                      aria-hidden
                      title={profile.name}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-offwhite/15 text-offwhite/40"
                    >
                      <PlatformGlyph id={profile.id} className="h-4 w-4" />
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <nav aria-label={tc("services")} className="md:col-span-4">
          <h2 className="eyebrow text-gold">{tc("services")}</h2>
          <ul className="mt-5 grid gap-6 sm:grid-cols-2">
            {serviceGroups.map((group) => (
              <li key={group.id}>
                <p className="text-xs font-semibold uppercase tracking-wider text-offwhite/50">
                  {tg(group.id)}
                </p>
                <ul className="mt-2 space-y-1.5">
                  {confirmedServices()
                    .filter((service) => service.group === group.id)
                    .map((service) => (
                      <li key={service.id}>
                        <Link
                          href={`/services/${service.slug}`}
                          className="text-sm text-offwhite/75 transition-colors hover:text-gold"
                        >
                          {content.services[service.id].label}
                        </Link>
                      </li>
                    ))}
                </ul>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-2">
          <h2 className="eyebrow text-gold">{t("explore")}</h2>
          <ul className="mt-5 space-y-2">
            {navItems.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="text-sm text-offwhite/75 transition-colors hover:text-gold"
                >
                  {tc(item.key)}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact"
                className="text-sm text-offwhite/75 transition-colors hover:text-gold"
              >
                {tc("contact")}
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h2 className="eyebrow text-gold">{t("legal")}</h2>
          <ul className="mt-5 space-y-2">
            <li>
              <Link
                href="/privacy"
                className="text-sm text-offwhite/75 transition-colors hover:text-gold"
              >
                {t("privacy")}
              </Link>
            </li>
            <li>
              <Link
                href="/cookies"
                className="text-sm text-offwhite/75 transition-colors hover:text-gold"
              >
                {t("cookies")}
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="text-sm text-offwhite/75 transition-colors hover:text-gold"
              >
                {t("terms")}
              </Link>
            </li>
            <li>
              <CookieSettingsButton className="text-sm text-offwhite/75 transition-colors hover:text-gold" />
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-offwhite/10">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-offwhite/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {siteConfig.legalName ?? siteConfig.name}. {t("rights")}
          </p>
          <p className="font-mono tracking-tight">
            {siteConfig.name.toLowerCase()} · {new URL(siteConfig.url).host}
          </p>
        </div>
      </div>
    </footer>
  );
}

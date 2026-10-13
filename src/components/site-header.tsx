"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Logo } from "./logo";
import { LanguageSwitcher } from "./language-switcher";
import { navItems } from "./nav";
import { buttonClass } from "./button";

export function SiteHeader() {
  const t = useTranslations();
  const pathname = usePathname();
  const [menu, setMenu] = useState({ open: false, path: pathname });

  // The mobile menu is tied to the path it was opened on, so navigating
  // (including via the menu itself) closes it without a synchronising effect.
  const open = menu.open && menu.path === pathname;
  const setOpen = (next: boolean) => setMenu({ open: next, path: pathname });

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenu((current) => ({ ...current, open: false }));
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-offwhite/85 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <Logo />

        <nav aria-label={t("common.menu")} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`group relative inline-flex h-9 items-center rounded-full px-3 text-sm font-medium transition-colors hover:bg-line/60 ${
                      active
                        ? "text-charcoal"
                        : "text-ink-muted hover:text-charcoal"
                    }`}
                  >
                    {t(`nav.${item.key}`)}
                    <span
                      aria-hidden
                      className={`absolute inset-x-3 bottom-1 h-px origin-center bg-gold-strong transition-transform duration-300 ${
                        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <LanguageSwitcher />
          <Link
            href="/contact"
            className={buttonClass({ variant: "dark", size: "sm" })}
          >
            {t("cta.primary")}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-charcoal transition-colors hover:bg-line lg:hidden"
        >
          <span className="sr-only">
            {open ? t("common.closeMenu") : t("common.openMenu")}
          </span>
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            {open ? (
              <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-line bg-offwhite lg:hidden"
        >
          <nav aria-label={t("common.menu")} className="container-page py-4">
            <ul className="flex flex-col">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center justify-between border-b border-line py-3 text-lg ${
                        active ? "text-charcoal" : "text-ink"
                      }`}
                    >
                      {t(`nav.${item.key}`)}
                      <span aria-hidden className="text-ink-muted">
                        &rarr;
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="mt-5 flex flex-col gap-4">
              <LanguageSwitcher />
              <Link
                href="/contact"
                className={buttonClass({
                  variant: "dark",
                  size: "md",
                  className: "w-full",
                })}
              >
                {t("cta.primary")}
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

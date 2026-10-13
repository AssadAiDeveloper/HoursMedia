"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { localeNames, localeShort } from "./nav";

function GlobeIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.6 3 2.6 15 0 18M12 3c-2.6 3-2.6 15 0 18" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={`h-3.5 w-3.5 transition-transform duration-300 ${
        open ? "rotate-180" : ""
      }`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="h-4 w-4 text-gold-strong"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function LanguageSwitcher({ className }: { className?: string }) {
  const active = useLocale() as (typeof routing.locales)[number];
  const pathname = usePathname();
  const t = useTranslations("common");

  const [open, setOpen] = useState(false);
  const [focusIndex, setFocusIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const menuId = useId();

  const close = (returnFocus = false) => {
    setOpen(false);
    if (returnFocus) buttonRef.current?.focus();
  };

  // Close on outside pointer press or Escape anywhere.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close(true);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Move focus into the menu when it opens.
  useEffect(() => {
    if (open) itemRefs.current[focusIndex]?.focus();
  }, [open, focusIndex]);

  const openWithFocus = (index: number) => {
    setFocusIndex(index);
    setOpen(true);
  };

  const onButtonKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      openWithFocus(0);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      openWithFocus(routing.locales.length - 1);
    }
  };

  const move = (delta: number) => (event: React.KeyboardEvent) => {
    event.preventDefault();
    const count = routing.locales.length;
    setFocusIndex((index) => (index + delta + count) % count);
  };

  const onMenuKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case "ArrowDown":
        move(1)(event);
        break;
      case "ArrowUp":
        move(-1)(event);
        break;
      case "Home":
        event.preventDefault();
        setFocusIndex(0);
        break;
      case "End":
        event.preventDefault();
        setFocusIndex(routing.locales.length - 1);
        break;
      case "Tab":
        close();
        break;
      default:
        break;
    }
  };

  return (
    <div ref={containerRef} className={`relative ${className ?? ""}`}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => (open ? close() : openWithFocus(0))}
        onKeyDown={onButtonKeyDown}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        aria-label={t("languageLabel")}
        className="inline-flex h-9 items-center gap-2 rounded-full border border-line bg-white/70 px-3 text-xs font-semibold text-charcoal transition-all duration-200 hover:border-line-strong hover:bg-white"
      >
        <GlobeIcon />
        <span aria-hidden>{localeShort[active]}</span>
        <ChevronIcon open={open} />
      </button>

      {open ? (
        <ul
          id={menuId}
          role="menu"
          aria-label={t("languageLabel")}
          onKeyDown={onMenuKeyDown}
          className="absolute end-0 z-50 mt-2 w-44 animate-fade-in overflow-hidden rounded-md border border-line bg-white p-1 shadow-plate"
        >
          {routing.locales.map((locale, index) => {
            const isActive = locale === active;
            return (
              <li key={locale} role="none">
                <Link
                  ref={(node) => {
                    itemRefs.current[index] = node;
                  }}
                  href={pathname}
                  locale={locale}
                  hrefLang={locale}
                  lang={locale}
                  role="menuitem"
                  aria-current={isActive ? "true" : undefined}
                  onFocus={() => setFocusIndex(index)}
                  onClick={() => close()}
                  className={`flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? "bg-offwhite font-semibold text-charcoal"
                      : "text-ink-muted hover:bg-offwhite hover:text-charcoal"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="w-6 font-mono text-[0.68rem] uppercase text-ink-muted">
                      {localeShort[locale]}
                    </span>
                    <span>{localeNames[locale]}</span>
                  </span>
                  {isActive ? <CheckIcon /> : null}
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

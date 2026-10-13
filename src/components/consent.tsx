"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import Script from "next/script";
import { useTranslations } from "next-intl";
import { buttonClass } from "./button";

export type ConsentChoices = { analytics: boolean; ads: boolean };

const STORAGE_KEY = "hoursmedia:consent:v1";
const OPEN_EVENT = "hoursmedia:cookie-settings";
const DEFAULT_CHOICES: ConsentChoices = { analytics: false, ads: false };

/**
 * Consent lives in a tiny external store so components can read it through
 * `useSyncExternalStore`. That keeps localStorage access out of render and
 * avoids hydration mismatch, which an effect-plus-setState pattern would cause.
 */
let cached: ConsentChoices | null = null;
let hydrated = false;
const listeners = new Set<() => void>();

function getSnapshot(): ConsentChoices | null {
  if (!hydrated && typeof window !== "undefined") {
    hydrated = true;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      cached = raw ? (JSON.parse(raw) as ConsentChoices) : null;
    } catch {
      cached = null;
    }
  }
  return cached;
}

function getServerSnapshot(): ConsentChoices | null {
  return null;
}

function subscribe(callback: () => void): () => void {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function persist(next: ConsentChoices) {
  cached = next;
  hydrated = true;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* storage unavailable — the choice applies to this session only */
  }
  listeners.forEach((listener) => listener());
}

function requestOpen() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function ConsentProvider({ children }: { children?: React.ReactNode }) {
  const choices = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handler = () => setSettingsOpen(true);
    window.addEventListener(OPEN_EVENT, handler);
    return () => window.removeEventListener(OPEN_EVENT, handler);
  }, []);

  const save = useCallback((next: ConsentChoices) => {
    persist(next);
    setSettingsOpen(false);
    setDismissed(true);
  }, []);

  const dismissedBanner = useCallback(() => {
    setSettingsOpen(false);
    setDismissed(true);
  }, []);

  const decided = choices !== null;
  const showBanner = settingsOpen || (!decided && !dismissed);

  return (
    <>
      {children}
      <AnalyticsGate enabled={choices?.analytics === true} />
      {showBanner ? (
        <ConsentBanner
          initial={choices ?? DEFAULT_CHOICES}
          onSave={save}
          onDismiss={dismissedBanner}
        />
      ) : null}
    </>
  );
}

export function openCookieSettings() {
  requestOpen();
}

function ConsentBanner({
  initial,
  onSave,
  onDismiss,
}: {
  initial: ConsentChoices;
  onSave: (choices: ConsentChoices) => void;
  onDismiss: () => void;
}) {
  const t = useTranslations("consent");
  const [details, setDetails] = useState(false);
  const [analytics, setAnalytics] = useState(initial.analytics);
  const [ads, setAds] = useState(initial.ads);

  const rows = [
    {
      id: "necessary",
      label: t("necessary"),
      body: t("necessaryBody"),
      checked: true,
      disabled: true,
      onChange: () => undefined,
    },
    {
      id: "analytics",
      label: t("analytics"),
      body: t("analyticsBody"),
      checked: analytics,
      disabled: false,
      onChange: () => setAnalytics((value) => !value),
    },
    {
      id: "ads",
      label: t("ads"),
      body: t("adsBody"),
      checked: ads,
      disabled: false,
      onChange: () => setAds((value) => !value),
    },
  ];

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4">
      <div
        role="dialog"
        aria-label={t("title")}
        className="mx-auto max-w-3xl rounded-lg border border-line-strong bg-white p-6 shadow-lg"
      >
        <h2 className="text-lg font-semibold text-charcoal-deep">{t("title")}</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">{t("body")}</p>

        {details ? (
          <ul className="mt-5 space-y-4">
            {rows.map((row) => (
              <li key={row.id} className="flex items-start gap-3">
                <input
                  id={`consent-${row.id}`}
                  type="checkbox"
                  checked={row.checked}
                  disabled={row.disabled}
                  onChange={row.onChange}
                  className="mt-1 h-4 w-4 shrink-0 rounded-xs border-line-strong"
                />
                <label htmlFor={`consent-${row.id}`} className="text-sm">
                  <span className="font-medium text-charcoal-deep">{row.label}</span>
                  <span className="mt-0.5 block text-ink-muted">{row.body}</span>
                </label>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-3">
          {details ? (
            <>
              <button
                type="button"
                onClick={() => onSave({ analytics, ads })}
                className={buttonClass({ variant: "dark", size: "md" })}
              >
                {t("save")}
              </button>
              <button
                type="button"
                onClick={onDismiss}
                className="inline-flex h-11 items-center justify-center px-2 text-sm font-medium text-ink-muted underline underline-offset-4 hover:text-charcoal"
              >
                {t("settings")}
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => onSave({ analytics: true, ads: true })}
                className={buttonClass({ variant: "dark", size: "md" })}
              >
                {t("accept")}
              </button>
              <button
                type="button"
                onClick={() => onSave({ analytics: false, ads: false })}
                className={buttonClass({ variant: "outline-strong", size: "md" })}
              >
                {t("reject")}
              </button>
              <button
                type="button"
                onClick={() => setDetails(true)}
                className="inline-flex h-11 items-center justify-center px-2 text-sm font-medium text-ink-muted underline underline-offset-4 hover:text-charcoal"
              >
                {t("settings")}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Loads a privacy-friendly analytics script only after consent. Renders
 * nothing when no provider is configured, so the site collects no data until
 * the business wires one up.
 */
function AnalyticsGate({ enabled }: { enabled: boolean }) {
  const domain = process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN;
  const src =
    process.env.NEXT_PUBLIC_ANALYTICS_SRC ?? "https://plausible.io/js/script.js";

  if (!enabled || !domain) return null;

  return <Script defer data-domain={domain} src={src} strategy="afterInteractive" />;
}

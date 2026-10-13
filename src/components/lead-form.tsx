"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { buttonClass } from "./button";

type ServiceOption = { id: string; label: string };

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LeadForm({
  kind,
  serviceOptions,
  defaultService,
}: {
  kind: "contact" | "brief";
  serviceOptions: ServiceOption[];
  defaultService?: string;
}) {
  const t = useTranslations("forms");
  const locale = useLocale();
  const formId = useId();
  const startedAt = useRef<number | null>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [values, setValues] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    budget: "",
    service: defaultService ?? "",
    message: "",
    consent: false,
    companyWebsite: "",
  });

  function update<K extends keyof typeof values>(
    key: K,
    value: (typeof values)[K],
  ) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function validate(): Record<string, string> {
    const next: Record<string, string> = {};
    if (values.name.trim().length < 2) next.name = t("validation.nameRequired");
    if (!EMAIL_RE.test(values.email.trim()))
      next.email = t("validation.emailInvalid");
    if (values.message.trim().length < 10)
      next.message = t("validation.messageRequired");
    if (!values.consent) next.consent = t("validation.consentRequired");
    return next;
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("submitting");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind,
          locale,
          name: values.name.trim(),
          email: values.email.trim(),
          company: values.company.trim(),
          phone: values.phone.trim(),
          budget: values.budget.trim(),
          service: values.service || undefined,
          message: values.message.trim(),
          consent: values.consent,
          companyWebsite: values.companyWebsite,
          formStartedAt: startedAt.current ?? undefined,
        }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as {
          fields?: Record<string, string>;
        } | null;
        if (data?.fields) setErrors(data.fields);
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-lg border border-line bg-offwhite p-8 text-center"
      >
        <h3 className="text-xl font-semibold text-charcoal-deep">
          {t("successTitle")}
        </h3>
        <p className="mt-3 text-ink-muted">{t("successBody")}</p>
      </div>
    );
  }

  const fieldClass =
    "mt-1.5 w-full rounded-lg border border-field-line bg-white px-3.5 py-2.5 text-ink outline-none transition-all duration-200 focus:border-charcoal";
  const labelClass = "block text-sm font-medium text-charcoal-deep";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {status === "error" ? (
        <div
          role="alert"
          className="rounded-lg border-s-2 border-gold bg-offwhite p-4 text-sm"
        >
          <p className="font-semibold text-charcoal-deep">{t("errorTitle")}</p>
          <p className="mt-1 text-ink-muted">{t("errorBody")}</p>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor={`${formId}-name`}>
            {t("name")} <span aria-hidden className="text-gold-strong">*</span>
          </label>
          <input
            id={`${formId}-name`}
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            aria-required="true"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${formId}-name-error` : undefined}
            className={fieldClass}
          />
          {errors.name ? (
            <p id={`${formId}-name-error`} className="mt-1.5 text-sm text-gold-strong">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label className={labelClass} htmlFor={`${formId}-email`}>
            {t("email")} <span aria-hidden className="text-gold-strong">*</span>
          </label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            aria-required="true"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${formId}-email-error` : undefined}
            className={fieldClass}
          />
          {errors.email ? (
            <p id={`${formId}-email-error`} className="mt-1.5 text-sm text-gold-strong">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div>
          <label className={labelClass} htmlFor={`${formId}-company`}>
            {t("company")}{" "}
            <span className="text-ink-muted">({t("budgetOptional")})</span>
          </label>
          <input
            id={`${formId}-company`}
            name="company"
            autoComplete="organization"
            value={values.company}
            onChange={(event) => update("company", event.target.value)}
            className={fieldClass}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor={`${formId}-phone`}>
            {t("phone")}{" "}
            <span className="text-ink-muted">({t("budgetOptional")})</span>
          </label>
          <input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(event) => update("phone", event.target.value)}
            className={fieldClass}
          />
        </div>
      </div>

      {kind === "brief" ? (
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor={`${formId}-service`}>
              {t("service")}
            </label>
            <select
              id={`${formId}-service`}
              name="service"
              value={values.service}
              onChange={(event) => update("service", event.target.value)}
              className={fieldClass}
            >
              <option value="">{t("selectPlaceholder")}</option>
              {serviceOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor={`${formId}-budget`}>
              {t("budget")}{" "}
              <span className="text-ink-muted">({t("budgetOptional")})</span>
            </label>
            <input
              id={`${formId}-budget`}
              name="budget"
              value={values.budget}
              onChange={(event) => update("budget", event.target.value)}
              className={fieldClass}
            />
          </div>
        </div>
      ) : null}

      <div>
        <label className={labelClass} htmlFor={`${formId}-message`}>
          {t("message")} <span aria-hidden className="text-gold-strong">*</span>
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          rows={kind === "brief" ? 7 : 5}
          value={values.message}
          onChange={(event) => update("message", event.target.value)}
          aria-required="true"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${formId}-message-error` : undefined}
          className={fieldClass}
        />
        {errors.message ? (
          <p id={`${formId}-message-error`} className="mt-1.5 text-sm text-gold-strong">
            {errors.message}
          </p>
        ) : null}
      </div>

      {/* Honeypot: hidden from users and assistive tech, tempting to bots. */}
      <div aria-hidden className="hidden">
        <label htmlFor={`${formId}-website`}>Website</label>
        <input
          id={`${formId}-website`}
          name="companyWebsite"
          tabIndex={-1}
          autoComplete="off"
          value={values.companyWebsite}
          onChange={(event) => update("companyWebsite", event.target.value)}
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          id={`${formId}-consent`}
          name="consent"
          type="checkbox"
          checked={values.consent}
          onChange={(event) => update("consent", event.target.checked)}
          aria-required="true"
          aria-invalid={Boolean(errors.consent)}
          aria-describedby={errors.consent ? `${formId}-consent-error` : undefined}
          className="mt-1 h-4 w-4 shrink-0 rounded-xs border-field-line"
        />
        <label htmlFor={`${formId}-consent`} className="text-sm text-ink-muted">
          {t("consent")}
        </label>
      </div>
      {errors.consent ? (
        <p id={`${formId}-consent-error`} className="-mt-3 text-sm text-gold-strong">
          {errors.consent}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className={buttonClass({ variant: "dark", size: "md" })}
      >
        {status === "submitting" ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}

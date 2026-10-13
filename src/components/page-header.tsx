import type { ReactNode } from "react";

/** Consistent header block for inner pages. */
export function PageHeader({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden border-b border-line bg-white">
      <div aria-hidden className="wash-warm absolute inset-0 opacity-70" />
      <div className="container-page relative py-14 md:py-20">
        <div className="max-w-3xl animate-fade-up">
          {eyebrow ? <p className="eyebrow text-gold-strong">{eyebrow}</p> : null}
          <h1
            className={`text-4xl md:text-5xl ${
              eyebrow ? "mt-4" : "mt-0"
            }`}
          >
            {title}
          </h1>
          {intro ? (
            <p className="mt-5 text-lg leading-relaxed text-ink-muted">
              {intro}
            </p>
          ) : null}
          {children}
        </div>
      </div>
    </header>
  );
}

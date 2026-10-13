import type { ReactNode } from "react";
import { Reveal } from "./reveal";

/** Standard vertical rhythm section, revealed on scroll by default. */
export function Section({
  children,
  className,
  id,
  reveal = true,
  revealDelay = 0,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  reveal?: boolean;
  revealDelay?: number;
}) {
  const content = <div className="container-page">{children}</div>;

  return (
    <section id={id} className={`py-16 md:py-24 ${className ?? ""}`}>
      {reveal ? <Reveal delay={revealDelay}>{content}</Reveal> : content}
    </section>
  );
}

/** Small uppercase label followed by a heading and optional intro. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "start",
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "start" | "center";
  as?: "h1" | "h2";
}) {
  return (
    <div
      className={
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"
      }
    >
      {eyebrow ? (
        <p className="eyebrow text-gold-strong">{eyebrow}</p>
      ) : null}
      <Tag
        className={`${
          Tag === "h1"
            ? "mt-4 text-4xl md:text-5xl"
            : "mt-3 text-3xl md:text-4xl"
        } ${eyebrow ? "" : "mt-0"}`}
      >
        {title}
      </Tag>
      {intro ? (
        <p className="mt-5 text-lg leading-relaxed text-ink-muted">{intro}</p>
      ) : null}
    </div>
  );
}

/** A labelled list of short items, used for deliverables, audiences, etc. */
export function ListSection({
  heading,
  intro,
  items,
  tone = "default",
}: {
  heading: string;
  intro?: string;
  items: string[];
  tone?: "default" | "muted";
}) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-charcoal-deep">{heading}</h2>
      {intro ? <p className="mt-2 text-ink-muted">{intro}</p> : null}
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span
              aria-hidden
              className={`mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                tone === "muted" ? "bg-line-strong" : "bg-gold-strong"
              }`}
            />
            <span className={tone === "muted" ? "text-ink-muted" : "text-ink"}>
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

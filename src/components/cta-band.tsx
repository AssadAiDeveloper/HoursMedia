import { Link } from "@/i18n/navigation";
import { buttonClass } from "./button";

export function CtaBand({
  heading,
  body,
  primaryLabel,
  primaryHref = "/contact",
  secondaryLabel,
  secondaryHref,
}: {
  heading: string;
  body: string;
  primaryLabel: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-lg bg-charcoal text-offwhite">
      <div aria-hidden className="glow-warm absolute inset-0 opacity-50" />
      <div aria-hidden className="blueprint absolute inset-0 opacity-[0.07]" />
      <div className="relative grid gap-8 p-8 md:grid-cols-[1.5fr_1fr] md:items-center md:p-12">
        <div>
          <h2 className="text-2xl text-offwhite md:text-3xl">{heading}</h2>
          <p className="mt-4 max-w-xl leading-relaxed text-offwhite/70">
            {body}
          </p>
        </div>
        <div className="flex flex-col gap-3 md:items-end">
          <Link
            href={primaryHref}
            className={buttonClass({ variant: "primary", size: "md" })}
          >
            {primaryLabel}
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
            >
              &rarr;
            </span>
          </Link>
          {secondaryLabel && secondaryHref ? (
            <Link
              href={secondaryHref}
              className={buttonClass({ variant: "outline-dark", size: "md" })}
            >
              {secondaryLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}

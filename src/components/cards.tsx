import { Link } from "@/i18n/navigation";
import type { ServiceId } from "@/config/services";
import { ProjectVisual, ServiceGlyph } from "./visuals";

export function ServiceCard({
  href,
  id,
  groupLabel,
  label,
  tagline,
}: {
  href: string;
  id: ServiceId;
  groupLabel: string;
  label: string;
  tagline: string;
}) {
  return (
    <Link
      href={href}
      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-lg border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold-strong hover:shadow-plate"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gold-soft opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40"
      />
      <div className="relative">
        <div className="flex items-center justify-between">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-line bg-offwhite text-charcoal-deep transition-colors duration-300 group-hover:border-gold-strong group-hover:text-gold-strong">
            <ServiceGlyph id={id} />
          </span>
          <p className="eyebrow text-gold-strong">{groupLabel}</p>
        </div>
        <h3 className="mt-5 text-xl font-semibold text-charcoal-deep">{label}</h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">{tagline}</p>
      </div>
      <span className="relative mt-6 inline-flex items-center gap-2 text-sm font-semibold text-charcoal transition-colors group-hover:text-gold-strong">
        <span
          aria-hidden
          className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
        >
          &rarr;
        </span>
      </span>
    </Link>
  );
}

export function ProjectCard({
  href,
  slug,
  title,
  summary,
  kindLabel,
  tags,
  palette,
  image,
}: {
  href: string;
  slug: string;
  title: string;
  summary: string;
  kindLabel: string;
  tags: string[];
  palette: string;
  image?: string;
}) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:border-gold-strong hover:shadow-plate"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden [&_img]:saturate-[.92]">
        <ProjectVisual
          slug={slug}
          palette={palette}
          image={image}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="h-full w-full transition-transform duration-500 group-hover:scale-[1.06]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal-deep/30 to-transparent"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex min-h-10 items-center gap-3">
          <span className="shrink-0 rounded-full border border-line-strong px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-ink-muted">
            {kindLabel}
          </span>
          <ul className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-ink-muted">
            {tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
        <h3 className="mt-4 text-xl font-semibold text-charcoal-deep">{title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted line-clamp-3">
          {summary}
        </p>
      </div>
    </Link>
  );
}

export function ArticleCard({
  href,
  title,
  summary,
  dateLabel,
  readingLabel,
  tags,
}: {
  href: string;
  title: string;
  summary: string;
  dateLabel: string;
  readingLabel: string;
  tags: string[];
}) {
  return (
    <Link
      href={href}
      className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold-strong hover:shadow-plate"
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gold-strong transition-transform duration-500 group-hover:scale-x-100"
      />
      <div className="flex items-center gap-3 text-xs text-ink-muted">
        <time dateTime={dateLabel}>{dateLabel}</time>
        <span aria-hidden>&middot;</span>
        <span>{readingLabel}</span>
      </div>
      <h3 className="mt-3 text-xl font-semibold text-charcoal-deep">{title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
        {summary}
      </p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full bg-offwhite px-2.5 py-0.5 text-xs text-ink-muted"
          >
            {tag}
          </li>
        ))}
      </ul>
    </Link>
  );
}

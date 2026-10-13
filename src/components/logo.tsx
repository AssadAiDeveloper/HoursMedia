import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";

/**
 * Brand rendering.
 *
 * `wordmark` is the official HoursMedia horizontal lockup (transparent PNG).
 * `symbol` is the standalone hourglass mark (1024x1024 raster).
 * These are raster PNGs, not vector, so we never scale them past their
 * natural resolution and we always pair them with a text label for a11y.
 */
export function Logo({
  variant = "wordmark",
  className,
}: {
  variant?: "wordmark" | "symbol";
  className?: string;
}) {
  const isWordmark = variant === "wordmark";

  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} home`}
      className={`inline-flex items-center ${className ?? ""}`}
    >
      {isWordmark ? (
        <Image
          src="/brand/hoursmedia-logo.png"
          alt={siteConfig.name}
          width={1043}
          height={286}
          priority
          sizes="128px"
          className="h-7 w-auto md:h-8"
        />
      ) : (
        <Image
          src="/brand/hoursmedia-symbol.png"
          alt=""
          width={1024}
          height={1024}
          priority
          sizes="128px"
          className="h-8 w-8"
        />
      )}
    </Link>
  );
}

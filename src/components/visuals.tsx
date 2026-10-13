import Image from "next/image";
import type { ReactNode } from "react";
import type { ServiceId } from "@/config/services";
import { PlatformGlyph } from "@/components/social-icons";
import type { PlatformId } from "@/components/social-icons";

/* ------------------------------------------------------------------ glyphs */

const glyphPaths: Record<ServiceId, ReactNode> = {
  "website-design": (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18" />
      <path d="M7 6.5h.01M9.5 6.5h.01" />
      <path d="M7 13h6M7 16h9" />
    </>
  ),
  "social-media": (
    <>
      <path d="M4 5h11a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H8l-4 3V5z" />
      <path d="M20 9v6a2 2 0 0 1-2 2h-1" />
      <path d="M8 9h6M8 11.5h4" />
    </>
  ),
  seo: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M16.5 16.5 21 21" />
      <path d="M8 12.5l2-2 1.8 1.8L15 9" />
    </>
  ),
  "paid-advertising": (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
    </>
  ),
  "youtube-management": (
    <>
      <rect x="2" y="5.5" width="20" height="14" rx="4" />
      <path d="M10 9.4l5 2.6-5 2.6z" />
    </>
  ),
  "video-design": (
    <>
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M3 10h18" />
      <path d="M7 3l2 3M12 3l2 3M17 3l2 3" />
    </>
  ),
  "gohighlevel-automation": (
    <>
      <circle cx="5.5" cy="6" r="2.2" />
      <circle cx="18.5" cy="6" r="2.2" />
      <circle cx="12" cy="18" r="2.2" />
      <path d="M7.6 6h8.8M6.8 7.9l3.9 8M17.2 7.9l-3.9 8" />
    </>
  ),
  "reputation-management": (
    <>
      <path d="M12 3l2.7 5.5 6.1.9-4.4 4.3 1 6-5.4-2.8L6.6 19.7l1-6-4.4-4.3 6.1-.9z" />
    </>
  ),
  "custom-apps-ai": (
    <>
      <path d="M8 8l-3 4 3 4M16 8l3 4-3 4" />
      <path d="M13.5 6l-3 12" />
      <path d="M19 3.5l.9 2 2 .9-2 .9-.9 2-.9-2-2-.9 2-.9z" />
    </>
  ),
};

export function ServiceGlyph({
  id,
  className,
}: {
  id: ServiceId;
  className?: string;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={className ?? "h-6 w-6"}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {glyphPaths[id]}
    </svg>
  );
}

/* --------------------------------------------------------------- hero mark */

/**
 * Animated brand mark: concentric rings around the hourglass, with social
 * platform glyphs orbiting slowly in two directions while staying upright.
 * Purely decorative (aria-hidden) and fully disabled under reduced motion.
 */
const orbitRingA: { id: PlatformId; left: string; top: string }[] = [
  { id: "youtube", left: "50%", top: "10%" },
  { id: "tiktok", left: "90%", top: "50%" },
  { id: "facebook", left: "50%", top: "90%" },
  { id: "x", left: "10%", top: "50%" },
];

const orbitRingB: { id: PlatformId; left: string; top: string }[] = [
  { id: "instagram", left: "82%", top: "23%" },
  { id: "linkedin", left: "82%", top: "77%" },
  { id: "whatsapp", left: "18%", top: "77%" },
];

function OrbitRing({
  dir,
  spots,
  delay,
}: {
  dir: "cw" | "ccw";
  spots: typeof orbitRingA;
  delay: number;
}) {
  // The travelling ring rotates around the mark; each icon counter-rotates at
  // the same speed and phase so the glyph itself never tilts.
  const ringClass = dir === "cw" ? "orbit-ring" : "orbit-ring-reverse";
  const counterClass = dir === "cw" ? "orbit-ring-reverse" : "orbit-ring";
  return (
    <div
      aria-hidden
      className={`absolute inset-0 ${ringClass}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {spots.map((spot) => (
        <div key={spot.id} className="absolute" style={{ left: spot.left, top: spot.top }}>
          <div className="-translate-x-1/2 -translate-y-1/2">
            <div className={counterClass} style={{ animationDelay: `${delay}s` }}>
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/25 bg-white/[0.04] text-gold backdrop-blur-sm">
                <PlatformGlyph id={spot.id} className="h-5 w-5" />
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      <div
        aria-hidden
        className="glow-warm absolute inset-0 rounded-full opacity-70 blur-2xl"
      />
      <svg
        aria-hidden
        viewBox="0 0 400 400"
        className="absolute inset-0 h-full w-full"
        fill="none"
      >
        <circle cx="200" cy="200" r="188" stroke="rgba(250,249,246,0.10)" />
        <circle
          className="animate-spin-reverse"
          style={{ transformOrigin: "200px 200px" }}
          cx="200"
          cy="200"
          r="150"
          stroke="rgba(233,180,67,0.35)"
          strokeDasharray="3 12"
          strokeLinecap="round"
        />
        <circle
          className="animate-spin-slow"
          style={{ transformOrigin: "200px 200px" }}
          cx="200"
          cy="200"
          r="112"
          stroke="rgba(250,249,246,0.14)"
          strokeDasharray="90 40"
          strokeLinecap="round"
        />
        <circle
          className="animate-pulse-dot"
          style={{ transformOrigin: "200px 200px" }}
          cx="200"
          cy="200"
          r="74"
          stroke="rgba(250,249,246,0.10)"
        />
        <circle
          className="animate-pulse-dot"
          style={{ transformOrigin: "200px 200px" }}
          cx="200"
          cy="50"
          r="5"
          fill="#e9b443"
        />
        <circle cx="350" cy="200" r="4" fill="rgba(250,249,246,0.5)" />
        <circle cx="200" cy="350" r="3.5" fill="rgba(233,180,67,0.7)" />
        <circle cx="50" cy="200" r="3.5" fill="rgba(250,249,246,0.35)" />
      </svg>

      <OrbitRing dir="cw" spots={orbitRingA} delay={0} />
      <OrbitRing dir="ccw" spots={orbitRingB} delay={-18} />

      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          src="/brand/hoursmedia-symbol.png"
          alt=""
          width={200}
          height={200}
          sizes="128px"
          className="h-28 w-28 animate-float opacity-90 [filter:brightness(0)_invert(1)] md:h-32 md:w-32"
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ project art */

const palettes = {
  gold: {
    background: "linear-gradient(135deg,#f6dfa8,#e9b443 55%,#7a5c12)",
    stroke: "rgba(21,21,21,0.32)",
    accent: "rgba(21,21,21,0.55)",
  },
  charcoal: {
    background: "linear-gradient(135deg,#3d3d3d,#242424 55%,#151515)",
    stroke: "rgba(250,249,246,0.18)",
    accent: "rgba(233,180,67,0.85)",
  },
  warm: {
    background: "linear-gradient(135deg,#e5e1d8,#f6dfa8 55%,#e9b443)",
    stroke: "rgba(122,92,18,0.28)",
    accent: "rgba(122,92,18,0.6)",
  },
} as const;

type PaletteId = keyof typeof palettes;

function hash(value: string): number {
  let result = 0;
  for (let i = 0; i < value.length; i += 1) {
    result = (result * 31 + value.charCodeAt(i)) % 100000;
  }
  return result;
}

/** Deterministic abstract artwork so every project has a distinct visual. */
export function ProjectVisual({
  slug,
  palette,
  image,
  sizes,
  className,
}: {
  slug: string;
  palette: string;
  image?: string;
  sizes?: string;
  className?: string;
}) {
  if (image) {
    return (
      <div aria-hidden className={`relative overflow-hidden ${className ?? ""}`}>
        <Image
          src={image}
          alt=""
          fill
          sizes={sizes ?? "(min-width: 1024px) 33vw, 100vw"}
          className="object-cover object-top"
        />
      </div>
    );
  }

  const theme = palettes[(palette as PaletteId) in palettes ? (palette as PaletteId) : "gold"];
  const variant = hash(slug) % 3;

  return (
    <div
      aria-hidden
      className={`relative overflow-hidden ${className ?? ""}`}
      style={{ background: theme.background }}
    >
      <svg
        viewBox="0 0 400 200"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        fill="none"
        stroke={theme.stroke}
        strokeWidth="1.5"
      >
        {variant === 0 ? (
          <>
            <path d="M-20 150 L200 40 L420 150" stroke={theme.accent} />
            <circle cx="120" cy="112" r="46" />
            <circle cx="120" cy="112" r="24" stroke={theme.accent} />
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <line key={i} x1={40 + i * 60} y1="180" x2={90 + i * 60} y2="180" />
            ))}
          </>
        ) : variant === 1 ? (
          <>
            {[0, 1, 2, 3].map((i) => (
              <rect
                key={i}
                x={40 + i * 70}
                y={70 - i * 12}
                width="46"
                height={95 + i * 12}
                rx="6"
                stroke={i === 2 ? theme.accent : theme.stroke}
              />
            ))}
            <path d="M20 40 A180 180 0 0 1 380 40" stroke={theme.accent} />
          </>
        ) : (
          <>
            {[0, 1, 2, 3, 4].map((row) =>
              [0, 1, 2, 3, 4, 5, 6, 7].map((col) => (
                <circle
                  key={`${row}-${col}`}
                  cx={40 + col * 46}
                  cy={40 + row * 30}
                  r={row === 2 && col === 3 ? 5 : 2}
                  fill={row === 2 && col === 3 ? theme.accent : theme.stroke}
                  stroke="none"
                />
              )),
            )}
            <path d="M60 160 L200 60 L340 160 Z" stroke={theme.accent} />
          </>
        )}
      </svg>
    </div>
  );
}

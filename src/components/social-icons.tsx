import type { ReactNode } from "react";

/**
 * Minimal, recognisable platform glyphs used as decorative accents (hero
 * orbit, keyword strip). They are aria-hidden and never carry a tracking link.
 */

export type PlatformId =
  | "youtube"
  | "instagram"
  | "tiktok"
  | "linkedin"
  | "facebook"
  | "whatsapp"
  | "x";

export const platformIds: PlatformId[] = [
  "youtube",
  "instagram",
  "tiktok",
  "linkedin",
  "facebook",
  "whatsapp",
  "x",
];

const platformGlyphs: Record<PlatformId, ReactNode> = {
  youtube: (
    <path
      fill="currentColor"
      d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.76C18.25 5 12 5 12 5s-6.25 0-7.84.44A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.76C5.75 19 12 19 12 19s6.25 0 7.84-.44a2.5 2.5 0 0 0 1.76-1.76A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3z"
    />
  ),
  instagram: (
    <path
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      d="M5.5 3.5h13a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2z"
    />
  ),
  tiktok: (
    <path
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      d="M13.5 4.2c.5 2.6 2.4 4.2 5.5 4.5"
    />
  ),
  linkedin: (
    <path
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      d="M5.5 3.5h13a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2z"
    />
  ),
  facebook: (
    <path
      fill="currentColor"
      d="M13.5 21v-7h2.4l.4-2.8h-2.8V9.2c0-.8.2-1.4 1.5-1.4h1.4V5.2c-.3 0-1.2-.2-2.2-.2-2 0-3.5 1.3-3.5 3.6v2.6H8.2V14h2.5v7H13.5z"
    />
  ),
  whatsapp: (
    <path
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      d="M20.4 11.7a8.4 8.4 0 0 1-8.4 8.4c-1.4 0-2.8-.3-4-1l-3.9 1.2 1.2-3.8a8.4 8.4 0 1 1 15.1-4.8z"
    />
  ),
  x: (
    <path
      fill="currentColor"
      d="M17.8 4h2.7l-6.3 7.2L21.5 20h-5.6l-4.4-5.7L6.6 20H3.9l6.8-7.7L3.5 4h5.7l4 5.2L17.8 4zm-1 14.4h1.5L7.8 5.5H6.2l10.6 12.9z"
    />
  ),
};

const fineDetails: Partial<Record<PlatformId, ReactNode>> = {
  instagram: (
    <>
      <circle
        cx="12"
        cy="12"
        r="3.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="17.1" cy="6.9" r="1" fill="currentColor" />
    </>
  ),
  tiktok: (
    <>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        d="M13.5 7.6v7.1a3.6 3.6 0 1 1-3-3.5"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        d="M13.5 11.2c.2 2 1.9 3.4 4.3 3.7"
      />
    </>
  ),
  linkedin: (
    <>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        d="M8.2 10.2V17M8.2 7.8h.01M12 17v-3.4a2.5 2.5 0 0 1 5 0V17"
      />
    </>
  ),
  whatsapp: (
    <path
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      d="M9.2 9.5c.2-.9.9-1.3 1.5-1.1.6.2.8 1 .9 1.6l-.5.8c.3 1 1.1 1.8 2.1 2.1l.8-.5c.6.1 1.4.3 1.6.9.1.5-.3 1.1-1.1 1.4-1.3.3-2.9-.5-4.4-2s-2-3-1.9-4.3z"
    />
  ),
};

export function PlatformGlyph({
  id,
  className,
}: {
  id: PlatformId;
  className?: string;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={className ?? "h-4 w-4"}
      fill="none"
    >
      {platformGlyphs[id]}
      {fineDetails[id]}
    </svg>
  );
}
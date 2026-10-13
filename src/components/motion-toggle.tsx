"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

/**
 * Visitor-facing control to pause all decorative motion on the page.
 *
 * Required by WCAG 2.2.2 (Pause, Stop, Hide) for content that moves
 * automatically for more than five seconds. Toggles a single class on <html>
 * which the stylesheet uses to set `animation-play-state: paused`.
 */
export function MotionToggle({ className }: { className?: string }) {
  const t = useTranslations("common");
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("hm-motion-paused", paused);
    return () => root.classList.remove("hm-motion-paused");
  }, [paused]);

  return (
    <button
      type="button"
      onClick={() => setPaused((value) => !value)}
      aria-pressed={paused}
      className={`inline-flex items-center gap-2 rounded-full text-xs font-medium text-offwhite/60 underline-offset-4 transition-colors hover:text-offwhite focus-visible:text-offwhite ${
        className ?? ""
      }`}
    >
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="h-3.5 w-3.5"
        fill="currentColor"
      >
        {paused ? (
          <path d="M8 5v14l11-7z" />
        ) : (
          <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
        )}
      </svg>
      {paused ? t("playMotion") : t("pauseMotion")}
    </button>
  );
}

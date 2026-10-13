"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Reveals children once they scroll into view. Content is always in the DOM
 * (so it stays crawlable and readable by assistive tech); only opacity and a
 * small offset animate. Reduced-motion visitors see everything immediately —
 * enforced both here and by a CSS fallback in globals.css.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Reduced-motion visitors are handled purely in CSS: globals.css forces
    // `.reveal-init` to be fully visible, so we only ever add the reveal class
    // from inside the (asynchronous) observer callback.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${shown ? "reveal-in" : "reveal-init"} ${className ?? ""}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

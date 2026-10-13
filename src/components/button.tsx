export type ButtonVariant =
  | "primary"
  | "dark"
  | "outline"
  | "outline-strong"
  | "outline-dark";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-gold text-charcoal-deep shadow-[0_10px_30px_-12px_rgba(233,180,67,0.8)] hover:bg-gold-soft hover:shadow-[0_16px_38px_-14px_rgba(233,180,67,0.95)]",
  dark: "bg-charcoal-deep text-offwhite shadow-[0_10px_30px_-14px_rgba(21,21,21,0.75)] hover:bg-charcoal",
  outline:
    "border border-line-strong bg-white/70 text-charcoal hover:border-gold-strong hover:bg-white",
  "outline-strong":
    "border border-charcoal text-charcoal hover:bg-charcoal hover:text-offwhite",
  "outline-dark":
    "border border-offwhite/25 text-offwhite hover:border-gold/60 hover:bg-white/5",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-sm",
  lg: "h-14 px-7 text-base",
};

/** Shared button styling. Use with any element (button, Link, anchor). */
export function buttonClass({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return `${base} ${variants[variant]} ${sizes[size]} ${className ?? ""}`.trim();
}

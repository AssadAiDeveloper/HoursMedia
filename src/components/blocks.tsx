import type { Block } from "@/content";

/** Renders the structured rich-text blocks used by articles and legal pages. */
export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "h3":
            return (
              <h3
                key={index}
                className="mt-8 text-xl font-semibold text-charcoal-deep"
              >
                {block.text}
              </h3>
            );
          case "p":
            return (
              <p key={index} className="text-ink-muted">
                {block.text}
              </p>
            );
          case "ul":
            return (
              <ul key={index} className="space-y-2">
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex gap-3 text-ink-muted">
                    <span
                      aria-hidden
                      className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-strong"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          case "quote":
            return (
              <blockquote
                key={index}
                className="border-s-2 border-gold-strong ps-5 text-lg italic text-charcoal"
              >
                {block.text}
              </blockquote>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

import type { CSSProperties } from "react";

// Word-by-word "mask" reveal. Pure markup (no JS): words slide up from behind a
// clipping line once an ancestor gains .is-visible (Reveal) or .split-play
// (hero slide). See the .split-* rules in globals.css.
export default function SplitText({
  text,
  className = "",
  delay = 0,
  step = 70,
}: {
  text: string;
  className?: string;
  delay?: number;
  step?: number;
}) {
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="split-word" aria-hidden="true">
          <span
            className="split-inner"
            style={{ "--sd": `${delay + i * step}ms` } as CSSProperties}
          >
            {word}
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}

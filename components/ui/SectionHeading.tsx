import Reveal from "@/components/ui/Reveal";
import SplitText from "@/components/ui/SplitText";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  light?: boolean;
}) {
  return (
    <Reveal
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : "text-left"}`}
    >
      {eyebrow && (
        <span
          className={`mb-3 inline-block text-xs font-semibold uppercase tracking-[0.3em] ${
            light ? "text-gold-light" : "text-gold-dark"
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-serif-display text-balance text-3xl font-bold sm:text-4xl ${
          light ? "text-white" : "text-heading"
        }`}
      >
        <SplitText text={title} />
      </h2>
      <span
        className={`heading-line ${align === "center" ? "mx-auto" : ""}`}
        aria-hidden="true"
      />
      {description && (
        <p
          className={`mt-4 text-balance text-base leading-relaxed ${
            light ? "text-white/75" : "text-body/70"
          }`}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}

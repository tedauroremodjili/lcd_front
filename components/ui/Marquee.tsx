// Infinite scrolling keyword strip. Pure CSS; pauses on hover.
export default function Marquee({ items }: { items: string[] }) {
  const row = (
    <ul className="marquee-row" aria-hidden="true">
      {items.map((item, i) => (
        <li key={i} className="flex items-center gap-10">
          <span className="font-serif-display text-3xl font-bold uppercase tracking-wide sm:text-5xl">
            {item}
          </span>
          <span className="text-gold sm:text-2xl">✦</span>
        </li>
      ))}
    </ul>
  );

  return (
    <section
      className="marquee overflow-hidden bg-navy py-6 text-white/90 sm:py-8"
      aria-label={items.join(", ")}
    >
      <div className="marquee-track">
        {row}
        {row}
      </div>
    </section>
  );
}

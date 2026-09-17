export default function Badge({
  children,
  tone = "gold",
}: {
  children: React.ReactNode;
  tone?: "gold" | "navy" | "light";
}) {
  const tones = {
    gold: "bg-gold/15 text-gold-dark",
    navy: "bg-navy text-white",
    light: "bg-white/15 text-white backdrop-blur-sm",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

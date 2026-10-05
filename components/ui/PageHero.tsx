import Link from "next/link";
import Container from "@/components/ui/Container";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";

export default function PageHero({
  eyebrow,
  title,
  description,
  breadcrumb,
  image,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumb: { label: string; href?: string }[];
  image: string;
}) {
  return (
    <section className="relative flex h-[42vh] min-h-80 items-end overflow-hidden bg-navy text-white">
      <div className="hero-slide-img is-active absolute inset-0">
        <ImagePlaceholder id={image} className="h-full w-full" priority />
      </div>
      <div className="absolute inset-0 bg-linear-to-t from-navy via-navy/75 to-navy/50" />
      <Container className="relative pb-10">
        <nav className="mb-4 flex flex-wrap items-center gap-2 text-xs text-white/60">
          {breadcrumb.map((item, i) => (
            <span key={item.label} className="flex items-center gap-2">
              {item.href ? (
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              ) : (
                <span className="text-white/90">{item.label}</span>
              )}
              {i < breadcrumb.length - 1 && <span>/</span>}
            </span>
          ))}
        </nav>
        {eyebrow && (
          <span
            style={{ "--d": "120ms" } as React.CSSProperties}
            className="hero-in mb-2 block text-xs font-semibold uppercase tracking-[0.3em] text-gold-light"
          >
            {eyebrow}
          </span>
        )}
        <h1
          style={{ "--d": "240ms" } as React.CSSProperties}
          className="hero-in font-serif-display text-balance text-3xl font-bold sm:text-5xl"
        >
          {title}
        </h1>
        {description && (
          <p
            style={{ "--d": "380ms" } as React.CSSProperties}
            className="hero-in mt-4 max-w-xl text-balance text-white/75"
          >
            {description}
          </p>
        )}
      </Container>
    </section>
  );
}

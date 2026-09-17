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
    <section className="relative flex h-[42vh] min-h-[320px] items-end overflow-hidden bg-navy text-white">
      <ImagePlaceholder id={image} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/75 to-navy/50" />
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
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.3em] text-gold-light">
            {eyebrow}
          </span>
        )}
        <h1 className="font-serif-display text-balance text-3xl font-bold sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-xl text-balance text-white/75">{description}</p>
        )}
      </Container>
    </section>
  );
}

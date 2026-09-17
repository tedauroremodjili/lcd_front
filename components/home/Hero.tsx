"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import type { HeroSlide } from "@/lib/types";

export default function Hero({ slides }: { slides: HeroSlide[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const id = setInterval(() => {
      setActive((v) => (v + 1) % slides.length);
    }, 6500);
    return () => clearInterval(id);
  }, [slides.length]);

  if (slides.length === 0) return null;

  return (
    <section className="relative h-[86vh] min-h-[560px] w-full overflow-hidden bg-navy">
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        >
          <ImagePlaceholder id={slide.image} className="h-full w-full" priority={i === 0} />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/40" />
        </div>
      ))}

      <Container className="relative flex h-full flex-col items-start justify-center text-white">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={`max-w-2xl transition-all duration-700 ${
              i === active
                ? "static opacity-100"
                : "pointer-events-none absolute opacity-0"
            }`}
          >
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.35em] text-gold-light">
              {slide.subtitle}
            </span>
            <h1 className="font-serif-display text-balance text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              {slide.title}
            </h1>
            {slide.description && (
              <p className="mt-6 max-w-lg text-balance text-base leading-relaxed text-white/80 sm:text-lg">
                {slide.description}
              </p>
            )}
            <div className="mt-9 flex flex-wrap gap-4">
              <Button href={slide.primary_button.href} variant="primary">
                {slide.primary_button.label}
              </Button>
              {slide.secondary_button && (
                <Button href={slide.secondary_button.href} variant="outline-light">
                  {slide.secondary_button.label}
                </Button>
              )}
            </div>
          </div>
        ))}
      </Container>

      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2.5">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              aria-label={`Aller au slide ${i + 1}`}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? "w-8 bg-gold" : "w-3 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

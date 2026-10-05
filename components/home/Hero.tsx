"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import Magnetic from "@/components/ui/Magnetic";
import Parallax from "@/components/ui/Parallax";
import SplitText from "@/components/ui/SplitText";
import type { HeroSlide } from "@/lib/types";

// Deterministic values (no Math.random) so server and client markup match.
const particles = Array.from({ length: 14 }, (_, i) => ({
  left: `${(i * 37 + 8) % 96}%`,
  size: `${6 + ((i * 5) % 9)}px`,
  dur: `${11 + ((i * 3) % 9)}s`,
  del: `-${(i * 2.3).toFixed(1)}s`,
  dx: `${((i % 2 ? 1 : -1) * (14 + i * 3))}px`,
}));

export default function Hero({ slides }: { slides: HeroSlide[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const id = setInterval(() => {
      setActive((v) => (v + 1) % slides.length);
    }, 6500);
    return () => clearInterval(id);
  }, [slides.length, active]);

  if (slides.length === 0) return null;

  return (
    <section className="relative h-[86vh] min-h-140 w-full overflow-hidden bg-navy">
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        >
          <Parallax mode="scroll" speed={0.22} className="absolute inset-x-0 -inset-y-[8%]">
            <div className={`hero-slide-img h-full w-full ${i === active ? "is-active" : ""}`}>
              <ImagePlaceholder id={slide.image} className="h-full w-full" priority={i === 0} />
            </div>
          </Parallax>
          <div className="absolute inset-0 bg-linear-to-t from-navy via-navy/70 to-navy/40" />
        </div>
      ))}

      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {particles.map((p, i) => (
          <span
            key={i}
            className="particle"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              "--dur": p.dur,
              "--del": p.del,
              "--dx": p.dx,
            } as React.CSSProperties}
          />
        ))}
      </div>

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
            <span
              style={{ "--d": "100ms" } as React.CSSProperties}
              className={`mb-4 inline-block text-xs font-semibold uppercase tracking-[0.35em] text-gold-light ${i === active ? "hero-in" : ""}`}
            >
              {slide.subtitle}
            </span>
            <h1
              className={`font-serif-display text-balance text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl ${i === active ? "split-play" : ""}`}
            >
              <SplitText text={slide.title} delay={220} step={90} />
            </h1>
            {slide.description && (
              <p
                style={{ "--d": "440ms" } as React.CSSProperties}
                className={`mt-6 max-w-lg text-balance text-base leading-relaxed text-white/80 sm:text-lg ${i === active ? "hero-in" : ""}`}
              >
                {slide.description}
              </p>
            )}
            <div
              style={{ "--d": "620ms" } as React.CSSProperties}
              className={`mt-9 flex flex-wrap gap-4 ${i === active ? "hero-in" : ""}`}
            >
              <Magnetic>
                <Button href={slide.primary_button.href} variant="primary">
                  {slide.primary_button.label}
                </Button>
              </Magnetic>
              {slide.secondary_button && (
                <Magnetic>
                  <Button href={slide.secondary_button.href} variant="outline-light">
                    {slide.secondary_button.label}
                  </Button>
                </Magnetic>
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
              className={`relative h-1.5 overflow-hidden rounded-full transition-all duration-500 ${
                i === active ? "w-10 bg-white/30" : "w-3 bg-white/40 hover:bg-white/70"
              }`}
            >
              {i === active && (
                <span className="hero-progress absolute inset-0 rounded-full bg-gold" />
              )}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

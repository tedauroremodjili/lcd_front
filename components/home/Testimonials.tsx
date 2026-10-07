import Image from "next/image";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import ScrollRow from "@/components/ui/ScrollRow";
import SectionHeading from "@/components/ui/SectionHeading";
import { getTexts } from "@/lib/api";
import { txt } from "@/lib/texts";
import type { Testimonial } from "@/lib/types";
import { serviceLabels } from "@/lib/utils";

export default async function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  if (testimonials.length === 0) return null;
  const texts = await getTexts();

  return (
    <section className="bg-gold-tint py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow={txt(texts, "home.testimonials_eyebrow")} title={txt(texts, "home.testimonials_title")} />
        <Reveal className="mt-14" delay={120}>
          <ScrollRow intervalMs={4200}>
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="w-[85%] shrink-0 snap-start sm:w-[60%] lg:w-[36%]"
              >
                <figure className="flex h-full flex-col rounded-2xl border border-subtle/10 bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(6,37,74,0.12)]">
                  {testimonial.rating && (
                    <div className="mb-4 flex gap-1 text-gold" aria-hidden="true">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          width="16"
                          height="16"
                          viewBox="0 0 20 20"
                          fill={i < testimonial.rating! ? "currentColor" : "none"}
                          stroke="currentColor"
                        >
                          <path
                            strokeWidth="1.2"
                            d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5Z"
                          />
                        </svg>
                      ))}
                    </div>
                  )}
                  <blockquote className="flex-1 text-sm italic leading-relaxed text-body/80">
                    “{testimonial.message}”
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-4 border-t border-subtle/10 pt-4">
                    {testimonial.photo ? (
                      <Image
                        src={testimonial.photo}
                        alt={testimonial.name}
                        width={56}
                        height={56}
                        unoptimized
                        className="h-14 w-14 shrink-0 rounded-full object-cover ring-2 ring-gold/30"
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-navy/10 text-base font-bold text-navy"
                      >
                        {testimonial.name.trim().charAt(0).toUpperCase()}
                      </span>
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-heading">{testimonial.name}</p>
                      <p className="text-xs uppercase tracking-wide text-body/50">
                        {serviceLabels[testimonial.service] ?? "Client"}
                      </p>
                    </div>
                  </figcaption>
                </figure>
              </div>
            ))}
          </ScrollRow>
        </Reveal>
      </Container>
    </section>
  );
}

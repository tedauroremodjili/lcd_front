import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Testimonial } from "@/lib/types";
import { serviceLabels } from "@/lib/utils";

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  if (testimonials.length === 0) return null;

  return (
    <section className="bg-white py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="Avis clients" title="Nos clients parlent de nous" />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.id}
              className="flex flex-col rounded-2xl border border-navy/10 bg-offwhite p-7"
            >
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
              <blockquote className="flex-1 text-sm italic leading-relaxed text-charcoal/80">
                “{testimonial.message}”
              </blockquote>
              <figcaption className="mt-5 border-t border-navy/10 pt-4">
                <p className="text-sm font-bold text-navy">{testimonial.name}</p>
                <p className="text-xs uppercase tracking-wide text-charcoal/50">
                  {serviceLabels[testimonial.service] ?? "Client"}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}

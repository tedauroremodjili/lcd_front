import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { whyChooseUs } from "@/lib/data";

const icons = [
  <path key="1" d="M4 12l6 6L20 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  <path key="2" d="M12 3l2.4 5.1L20 9l-4 3.9L17 19l-5-2.9L7 19l1-6.1L4 9l5.6-.9L12 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  <path key="3" d="M4 20V10l8-6 8 6v10M9 20v-6h6v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  <path key="4" d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />,
];

export default function WhyChooseUs() {
  return (
    <section className="bg-navy py-20 text-white sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Notre différence"
          title="Pourquoi nous choisir ?"
          description="Une entreprise multi-services pensée pour simplifier vos projets, de l'idée à la réalisation."
          light
        />
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseUs.map((item, i) => (
            <div key={item.title} className="rounded-2xl bg-white/5 p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold-light">
                <svg width="24" height="24" viewBox="0 0 24 24">
                  {icons[i]}
                </svg>
              </div>
              <h3 className="mt-5 font-serif-display text-lg font-bold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

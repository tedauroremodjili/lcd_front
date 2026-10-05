import ServiceCard from "@/components/services/ServiceCard";
import Container from "@/components/ui/Container";
import ScrollRow from "@/components/ui/ScrollRow";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Tilt from "@/components/ui/Tilt";
import { getTexts } from "@/lib/api";
import { txt } from "@/lib/texts";
import type { Service } from "@/lib/types";

export default async function ServicesGrid({ services }: { services: Service[] }) {
  const texts = await getTexts();
  return (
    <section className="bg-surface-alt py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow={txt(texts, "home.services_eyebrow")}
          title={txt(texts, "home.services_title")}
          description={txt(texts, "home.services_text")}
        />
        <Reveal className="mt-14" delay={120}>
          <ScrollRow fadeFrom="from-surface-alt">
            {services.map((service) => (
              <div
                key={service.id}
                className="w-[82%] shrink-0 snap-start sm:w-[46%] lg:w-[31%]"
              >
                <Tilt className="h-full">
                  <ServiceCard service={service} />
                </Tilt>
              </div>
            ))}
          </ScrollRow>
        </Reveal>
      </Container>
    </section>
  );
}

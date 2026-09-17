import ServiceCard from "@/components/services/ServiceCard";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Service } from "@/lib/types";

export default function ServicesGrid({ services }: { services: Service[] }) {
  return (
    <section className="bg-offwhite py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Ce que nous faisons"
          title="Nos domaines d'activité"
          description="Cinq métiers complémentaires pour accompagner vos projets du sourcing des matériaux à la pose finale."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </Container>
    </section>
  );
}

import type { Metadata } from "next";
import ServiceCard from "@/components/services/ServiceCard";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import { getServices } from "@/lib/api";

export const metadata: Metadata = {
  title: "Nos services",
  description:
    "Importation, marbrerie, ébénisterie, menuiserie et commerce général : découvrez les cinq domaines d'activité d'ENGOBO GROUP.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <PageHero
        eyebrow="Ce que nous faisons"
        title="Nos services"
        description="Cinq métiers complémentaires pour accompagner vos projets du sourcing des matériaux à la pose finale."
        breadcrumb={[{ label: "Accueil", href: "/" }, { label: "Services" }]}
        image="hero-services"
      />
      <section className="bg-white py-20 sm:py-28">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

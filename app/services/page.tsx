import Tilt from "@/components/ui/Tilt";
import Reveal from "@/components/ui/Reveal";
import type { Metadata } from "next";
import ServiceCard from "@/components/services/ServiceCard";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import { getServices, getPageBanners } from "@/lib/api";

export const metadata: Metadata = {
  title: "Nos services",
  description:
    "Importation, marbrerie, ébénisterie, menuiserie et commerce général : découvrez les cinq domaines d'activité d'ENGOBO GROUP.",
};

export default async function ServicesPage() {
  const banners = await getPageBanners();
  const services = await getServices();

  return (
    <>
      <PageHero
        eyebrow={banners.services?.eyebrow ?? ""}
        title={banners.services?.title ?? ""}
        description={banners.services?.description ?? ""}
        breadcrumb={[{ label: "Accueil", href: "/" }, { label: "Services" }]}
        image={banners.services?.image ?? ""}
      />
      <section className="bg-tint py-20 sm:py-28">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <Reveal key={service.id} delay={(i % 3) * 110} className="h-full">
                <Tilt className="h-full">
                  <ServiceCard service={service} />
                </Tilt>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

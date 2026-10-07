import type { Metadata } from "next";
import ProjectFilters from "@/components/projects/ProjectFilters";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import { getProjects, getPageBanners } from "@/lib/api";

export const metadata: Metadata = {
  title: "Nos réalisations",
  description:
    "Découvrez les chantiers réalisés par ENGOBO GROUP en marbrerie, menuiserie, ébénisterie, importation et commerce général.",
};

export default async function RealisationsPage() {
  const banners = await getPageBanners();
  const projects = await getProjects();

  return (
    <>
      <PageHero
        eyebrow={banners.realisations?.eyebrow ?? ""}
        title={banners.realisations?.title ?? ""}
        description={banners.realisations?.description ?? ""}
        breadcrumb={[{ label: "Accueil", href: "/" }, { label: "Réalisations" }]}
        image={banners.realisations?.image ?? ""}
      />
      <section className="bg-tint py-20 sm:py-24">
        <Container>
          <ProjectFilters projects={projects} />
        </Container>
      </section>
    </>
  );
}

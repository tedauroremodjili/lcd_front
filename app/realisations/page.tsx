import type { Metadata } from "next";
import ProjectFilters from "@/components/projects/ProjectFilters";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import { getProjects } from "@/lib/api";

export const metadata: Metadata = {
  title: "Nos réalisations",
  description:
    "Découvrez les chantiers réalisés par ENGOBO GROUP en marbrerie, menuiserie, ébénisterie, importation et commerce général.",
};

export default async function RealisationsPage() {
  const projects = await getProjects();

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Nos réalisations"
        description="Découvrez nos chantiers en images, classés par domaine d'activité."
        breadcrumb={[{ label: "Accueil", href: "/" }, { label: "Réalisations" }]}
        image="hero-realisations"
      />
      <section className="bg-white py-20 sm:py-24">
        <Container>
          <ProjectFilters projects={projects} />
        </Container>
      </section>
    </>
  );
}

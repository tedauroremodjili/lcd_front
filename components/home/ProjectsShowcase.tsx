import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectFilters from "@/components/projects/ProjectFilters";
import type { Project } from "@/lib/types";

export default function ProjectsShowcase({ projects }: { projects: Project[] }) {
  return (
    <section className="bg-white py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Portfolio"
          title="Nos réalisations"
          description="Un aperçu de nos chantiers récents en marbrerie, menuiserie, ébénisterie et commerce général."
        />
        <ProjectFilters projects={projects} className="mt-14" />
        <div className="mt-12 text-center">
          <Button href="/realisations" variant="ghost">
            Voir toutes les réalisations
          </Button>
        </div>
      </Container>
    </section>
  );
}

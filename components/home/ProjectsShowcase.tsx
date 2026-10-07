import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectFilters from "@/components/projects/ProjectFilters";
import { getTexts } from "@/lib/api";
import { txt } from "@/lib/texts";
import type { Project } from "@/lib/types";

export default async function ProjectsShowcase({ projects }: { projects: Project[] }) {
  const texts = await getTexts();
  return (
    <section className="bg-tint py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={txt(texts, "home.projects_eyebrow")}
            title={txt(texts, "home.projects_title")}
            description={txt(texts, "home.projects_text")}
          />
        </Reveal>
        <ProjectFilters projects={projects} className="mt-14" layout="scroll" />
        <Reveal className="mt-12 text-center">
          <Button href="/realisations" variant="ghost">
            {txt(texts, "home.projects_button")}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}

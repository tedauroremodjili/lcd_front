import Tilt from "@/components/ui/Tilt";
import Reveal from "@/components/ui/Reveal";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Gallery from "@/components/gallery/Gallery";
import ProjectCard from "@/components/projects/ProjectCard";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import { getProjectBySlug, getProjects } from "@/lib/api";
import { formatDate, serviceLabels } from "@/lib/utils";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(
  props: PageProps<"/realisations/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectDetailPage(
  props: PageProps<"/realisations/[slug]">
) {
  const { slug } = await props.params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const similar = (await getProjects({ service: project.service })).filter(
    (p) => p.id !== project.id
  );

  return (
    <>
      <PageHero
        eyebrow={serviceLabels[project.service]}
        title={project.title}
        description={project.location ? `${project.location} · ${formatDate(project.realized_at)}` : undefined}
        breadcrumb={[
          { label: "Accueil", href: "/" },
          { label: "Réalisations", href: "/realisations" },
          { label: project.title },
        ]}
        image={project.image}
      />

      <section className="bg-surface py-14 sm:py-20">
      <Container>
        <div className="grid gap-14 lg:grid-cols-2">
          <Reveal direction="left">
            <Gallery images={[project.image, ...project.gallery]} alt={project.title} />
          </Reveal>

          <Reveal direction="right" delay={150}>
            <p className="leading-relaxed text-body/70">{project.description}</p>

            <dl className="mt-8 grid grid-cols-2 gap-5 rounded-xl bg-surface-alt p-6">
              <div>
                <dt className="text-xs uppercase tracking-wide text-body/50">
                  Localisation
                </dt>
                <dd className="mt-1 font-medium text-heading">{project.location}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-body/50">
                  Date de réalisation
                </dt>
                <dd className="mt-1 font-medium text-heading">
                  {formatDate(project.realized_at)}
                </dd>
              </div>
              <div className="col-span-2">
                <dt className="text-xs uppercase tracking-wide text-body/50">
                  Matériaux utilisés
                </dt>
                <dd className="mt-1 font-medium text-heading">
                  {project.materials.join(", ")}
                </dd>
              </div>
            </dl>

            <Button href={`/devis?service=${project.service}`} variant="primary" className="mt-8 w-full">
              Demander un devis
            </Button>
          </Reveal>
        </div>
      </Container>

      {similar.length > 0 && (
        <Container className="mt-24">
          <SectionHeading eyebrow="Portfolio" title="Réalisations similaires" align="left" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similar.slice(0, 3).map((p, i) => (
              <Reveal key={p.id} delay={i * 110} className="h-full">
                <Tilt className="h-full">
                  <ProjectCard project={p} />
                </Tilt>
              </Reveal>
            ))}
          </div>
        </Container>
      )}
      </section>
    </>
  );
}

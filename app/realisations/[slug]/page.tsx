import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Gallery from "@/components/gallery/Gallery";
import ProjectCard from "@/components/projects/ProjectCard";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
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
    <section className="bg-white py-14 sm:py-20">
      <Container>
        <nav className="mb-8 flex flex-wrap gap-2 text-xs text-charcoal/50">
          <Link href="/" className="hover:text-navy">Accueil</Link>
          <span>/</span>
          <Link href="/realisations" className="hover:text-navy">Réalisations</Link>
          <span>/</span>
          <span className="text-navy">{project.title}</span>
        </nav>

        <div className="grid gap-14 lg:grid-cols-2">
          <Gallery images={[project.image, ...project.gallery]} alt={project.title} />

          <div>
            <Badge tone="gold">{serviceLabels[project.service]}</Badge>
            <h1 className="mt-4 font-serif-display text-3xl font-bold text-navy sm:text-4xl">
              {project.title}
            </h1>
            <p className="mt-6 leading-relaxed text-charcoal/70">{project.description}</p>

            <dl className="mt-8 grid grid-cols-2 gap-5 rounded-xl bg-offwhite p-6">
              <div>
                <dt className="text-xs uppercase tracking-wide text-charcoal/50">
                  Localisation
                </dt>
                <dd className="mt-1 font-medium text-navy">{project.location}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-charcoal/50">
                  Date de réalisation
                </dt>
                <dd className="mt-1 font-medium text-navy">
                  {formatDate(project.realized_at)}
                </dd>
              </div>
              <div className="col-span-2">
                <dt className="text-xs uppercase tracking-wide text-charcoal/50">
                  Matériaux utilisés
                </dt>
                <dd className="mt-1 font-medium text-navy">
                  {project.materials.join(", ")}
                </dd>
              </div>
            </dl>

            <Button href={`/devis?service=${project.service}`} variant="primary" className="mt-8 w-full">
              Demander un devis
            </Button>
          </div>
        </div>
      </Container>

      {similar.length > 0 && (
        <Container className="mt-24">
          <SectionHeading eyebrow="Portfolio" title="Réalisations similaires" align="left" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similar.slice(0, 3).map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </Container>
      )}
    </section>
  );
}

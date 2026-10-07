import Tilt from "@/components/ui/Tilt";
import Reveal from "@/components/ui/Reveal";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CtaSection from "@/components/home/CtaSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ProjectCard from "@/components/projects/ProjectCard";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import ReviewsSection from "@/components/reviews/ReviewsSection";
import { getProjects, getReviews, getServiceBySlug, getServices, getSettings } from "@/lib/api";

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata(
  props: PageProps<"/services/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: service.seo_title ?? service.name,
    description: service.seo_description ?? service.short_description,
  };
}

export default async function ServiceDetailPage(
  props: PageProps<"/services/[slug]">
) {
  const { slug } = await props.params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const [relatedProjects, settings, reviews] = await Promise.all([
    getProjects({ service: service.slug }),
    getSettings(),
    getReviews({ service: service.slug }),
  ]);

  return (
    <>
      <PageHero
        eyebrow="Service"
        title={service.name}
        breadcrumb={[
          { label: "Accueil", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.name },
        ]}
        image={service.image}
      />

      <section className="bg-tint py-20 sm:py-24">
        <Container className="grid gap-14 lg:grid-cols-[1.4fr_1fr]">
          <Reveal direction="left">
            <h2 className="font-serif-display text-2xl font-bold text-heading">
              Présentation
            </h2>
            <p className="mt-5 leading-relaxed text-body/70">
              {service.description}
            </p>

            {service.gallery.length > 0 && (
              <div className="mt-10 grid grid-cols-2 gap-4">
                {service.gallery.map((image, i) => (
                  <Reveal
                    key={image}
                    direction="wipe"
                    delay={i * 120}
                    className="group aspect-[4/3] overflow-hidden rounded-xl"
                  >
                    <ImagePlaceholder
                      id={image}
                      className="h-full w-full transition-transform duration-700 group-hover:scale-105"
                    />
                  </Reveal>
                ))}
              </div>
            )}
          </Reveal>

          <Reveal direction="right" delay={150} className="h-fit">
          <aside className="h-fit rounded-2xl bg-surface-alt p-8">
            <h3 className="font-serif-display text-lg font-bold text-heading">
              Nos prestations
            </h3>
            <ul className="mt-5 space-y-3">
              {service.prestations.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-body/75">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="mt-0.5 shrink-0 text-gold-dark"
                  >
                    <path
                      d="M4 10l4 4 8-8"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <Button href="/devis" variant="primary" className="mt-8 w-full">
              Demander un devis
            </Button>
          </aside>
          </Reveal>
        </Container>
      </section>

      {relatedProjects.length > 0 && (
        <section className="bg-gold-tint py-20 sm:py-24">
          <Container>
            <SectionHeading
              eyebrow="Portfolio"
              title="Réalisations liées"
              align="left"
            />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((project, i) => (
                <Reveal key={project.id} delay={(i % 3) * 110} className="h-full">
                  <Tilt className="h-full">
                    <ProjectCard project={project} />
                  </Tilt>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      <ReviewsSection target={{ service_slug: service.slug }} initial={reviews} />
      <WhyChooseUs />
      <CtaSection />
    </>
  );
}

import type { Metadata } from "next";
import CtaSection from "@/components/home/CtaSection";
import Container from "@/components/ui/Container";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import { settings } from "@/lib/data";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Découvrez l'histoire, la mission et les valeurs d'ENGOBO GROUP, entreprise multi-services à Pointe-Noire.",
};

const values = [
  { title: "Qualité", description: "Des matériaux sélectionnés et des finitions soignées à chaque étape." },
  { title: "Engagement", description: "Le respect des délais et des engagements pris envers nos clients." },
  { title: "Savoir-faire", description: "Des équipes formées aux techniques traditionnelles et modernes." },
  { title: "Confiance", description: "Un accompagnement transparent, du devis à la livraison." },
];

const stats = [
  { value: "5", label: "Domaines d'activité" },
  { value: "40+", label: "Réalisations livrées" },
  { value: "100%", label: "Projets sur mesure" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="ENGOBO GROUP"
        title="À propos de nous"
        description="Une entreprise multi-services au service de vos projets, de l'importation à la pose finale."
        breadcrumb={[{ label: "Accueil", href: "/" }, { label: "À propos" }]}
        image="hero-a-propos"
      />

      <section className="bg-white py-20 sm:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="order-2 lg:order-1">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-gold-dark">
              Présentation
            </span>
            <h2 className="font-serif-display text-3xl font-bold text-navy sm:text-4xl">
              Notre histoire
            </h2>
            <p className="mt-6 leading-relaxed text-charcoal/70">{settings.description}</p>
            <p className="mt-4 leading-relaxed text-charcoal/70">
              Née de la volonté de proposer une offre complète à nos clients, ENGOBO GROUP a
              réuni sous une même bannière l&apos;importation, la marbrerie, l&apos;ébénisterie,
              la menuiserie et le commerce général. Cette organisation nous permet de piloter
              chaque projet de bout en bout, avec un interlocuteur unique et une qualité
              constante.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-navy/10 pt-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif-display text-3xl font-bold text-navy">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-charcoal/60">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 aspect-[4/3] overflow-hidden rounded-2xl lg:order-2">
            <ImagePlaceholder id="about-entreprise" className="h-full w-full" />
          </div>
        </Container>
      </section>

      <section className="bg-offwhite py-20 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-8">
            <h3 className="font-serif-display text-xl font-bold text-navy">Notre mission</h3>
            <p className="mt-4 leading-relaxed text-charcoal/70">
              Accompagner particuliers et professionnels dans la réalisation de leurs projets,
              en alliant matériaux de qualité, savoir-faire artisanal et accompagnement
              personnalisé, du devis à la pose.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-8">
            <h3 className="font-serif-display text-xl font-bold text-navy">Notre vision</h3>
            <p className="mt-4 leading-relaxed text-charcoal/70">
              Devenir la référence multi-services en marbrerie, menuiserie et ébénisterie à
              Pointe-Noire, reconnue pour l&apos;exigence de ses réalisations et la satisfaction
              durable de ses clients.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Ce qui nous anime" title="Nos valeurs" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div key={value.title} className="rounded-2xl border border-navy/10 p-7">
                <h4 className="font-serif-display text-lg font-bold text-navy">
                  {value.title}
                </h4>
                <p className="mt-3 text-sm leading-relaxed text-charcoal/70">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-offwhite py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Notre équipe"
            title="Des artisans passionnés"
            description="Des ébénistes, marbriers et menuisiers expérimentés, réunis autour d'un même souci de la qualité."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {["equipe-1", "equipe-2", "equipe-3", "equipe-4"].map((id) => (
              <div key={id} className="aspect-square overflow-hidden rounded-2xl">
                <ImagePlaceholder id={id} className="h-full w-full" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}

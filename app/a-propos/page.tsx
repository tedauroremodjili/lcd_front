import CountUp from "@/components/ui/CountUp";
import SplitText from "@/components/ui/SplitText";
import Reveal from "@/components/ui/Reveal";
import type { Metadata } from "next";
import CtaSection from "@/components/home/CtaSection";
import Container from "@/components/ui/Container";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import { getAbout, getServices, getSettings, getTexts, getPageBanners } from "@/lib/api";
import { pairsOf, txt } from "@/lib/texts";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Découvrez l'histoire, la mission et les valeurs d'ENGOBO GROUP, entreprise multi-services à Pointe-Noire.",
};

const TEAM_FALLBACK_IDS = ["equipe-1", "equipe-2", "equipe-3", "equipe-4"];

function Card({
  title,
  text,
  direction,
  delay,
}: {
  title: string;
  text: string;
  direction: "left" | "right";
  delay?: number;
}) {
  return (
    <Reveal
      direction={direction}
      delay={delay}
      className="rounded-2xl bg-surface p-8 transition-shadow duration-300 hover:shadow-[0_14px_40px_rgba(6,37,74,0.12)]"
    >
      <h3 className="font-serif-display text-xl font-bold text-heading">{title}</h3>
      <p className="mt-4 leading-relaxed text-body/70">{text}</p>
    </Reveal>
  );
}

export default async function AboutPage() {
  const banners = await getPageBanners();
  const [settings, about, services, texts] = await Promise.all([
    getSettings(),
    getAbout(),
    getServices(),
    getTexts(),
  ]);

  // The number of activity domains follows the published services.
  const stats = [
    { value: String(services.length), label: txt(texts, "home.intro_stat_label") },
    ...pairsOf(texts, "about.stats").map((s) => ({ value: s.value, label: s.label })),
  ].filter((stat) => stat.value && stat.label);

  const history = txt(texts, "about.history_text");
  const mission = txt(texts, "about.mission_text");
  const vision = txt(texts, "about.vision_text");
  const savoirFaire = txt(texts, "about.savoir_faire_text");
  const values = pairsOf(texts, "about.values").map((v) => ({ title: v.title, description: v.description }));
  const teamPhotos = about.team_photos.length ? about.team_photos : TEAM_FALLBACK_IDS;

  return (
    <>
      <PageHero
        eyebrow={txt(texts, "about.hero_eyebrow")}
        title={txt(texts, "about.hero_title")}
        description={txt(texts, "about.hero_description")}
        breadcrumb={[{ label: "Accueil", href: "/" }, { label: "À propos" }]}
        image={banners["a-propos"]?.image ?? ""}
      />

      <section className="bg-tint py-20 sm:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal direction="left" className="order-2 lg:order-1">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-gold-dark">
              Présentation
            </span>
            <h2 className="font-serif-display text-3xl font-bold text-heading sm:text-4xl">
              <SplitText text={txt(texts, "about.history_title")} />
            </h2>
            <p className="mt-6 leading-relaxed text-body/70">{history || settings.description}</p>
            {txt(texts, "about.history_extra") && (
              <p className="mt-4 leading-relaxed text-body/70">{txt(texts, "about.history_extra")}</p>
            )}

            {stats.length > 0 && (
              <div
                className="mt-10 grid gap-6 border-t border-subtle/10 pt-8"
                style={{ gridTemplateColumns: `repeat(${Math.min(stats.length, 3)}, minmax(0, 1fr))` }}
              >
                {stats.map((stat) => {
                  const number = parseInt(stat.value, 10);
                  return (
                    <div key={stat.label}>
                      <p className="font-serif-display text-3xl font-bold text-heading">
                        {Number.isNaN(number) ? (
                          stat.value
                        ) : (
                          <CountUp to={number} suffix={stat.value.replace(/[0-9]/g, "")} />
                        )}
                      </p>
                      <p className="mt-1 text-xs text-body/60">{stat.label}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </Reveal>

          <Reveal
            direction="wipe"
            className="group order-1 aspect-[4/3] overflow-hidden rounded-2xl lg:order-2"
          >
            <ImagePlaceholder
              id={about.history_image || settings.about_image}
              className="h-full w-full transition-transform duration-700 group-hover:scale-105"
            />
          </Reveal>
        </Container>
      </section>

      {(mission || vision) && (
        <section className="bg-gold-tint py-20 sm:py-24">
          <Container className="grid gap-10 lg:grid-cols-2">
            {mission && (
              <Card title={txt(texts, "about.mission_title")} text={mission} direction="left" />
            )}
            {vision && (
              <Card title={txt(texts, "about.vision_title")} text={vision} direction="right" delay={120} />
            )}
          </Container>
        </section>
      )}

      {savoirFaire && (
        <section className="bg-tint py-20 sm:py-24">
          <Container>
            <SectionHeading eyebrow="Notre expertise" title={txt(texts, "about.savoir_faire_title")} />
            <p className="mx-auto mt-10 max-w-3xl text-center leading-relaxed text-body/70">{savoirFaire}</p>
          </Container>
        </section>
      )}

      {values.length > 0 && (
        <section className="bg-tint py-20 sm:py-24">
          <Container>
            <SectionHeading eyebrow="Ce qui nous anime" title="Nos valeurs" />
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value, i) => (
                <Reveal
                  key={value.title}
                  delay={i * 110}
                  direction="zoom"
                  className="rounded-2xl border border-subtle/10 p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-[0_14px_40px_rgba(6,37,74,0.12)]"
                >
                  <h4 className="font-serif-display text-lg font-bold text-heading">{value.title}</h4>
                  <p className="mt-3 text-sm leading-relaxed text-body/70">{value.description}</p>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="bg-gold-tint py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow={txt(texts, "about.team_eyebrow")}
            title={txt(texts, "about.team_title")}
            description={txt(texts, "about.team_description")}
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamPhotos.map((photo, i) => (
              <Reveal
                key={photo}
                direction="wipe"
                delay={(i % 4) * 140}
                className="group aspect-square overflow-hidden rounded-2xl"
              >
                <ImagePlaceholder
                  id={photo}
                  className="h-full w-full transition-transform duration-700 group-hover:scale-110"
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}

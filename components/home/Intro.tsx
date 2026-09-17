import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import { settings } from "@/lib/data";

export default function Intro() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
          <ImagePlaceholder id="intro-atelier" className="h-full w-full" />
          <div className="absolute -bottom-6 -right-6 hidden rounded-xl bg-navy px-7 py-5 text-white shadow-xl sm:block">
            <p className="font-serif-display text-3xl font-bold text-gold-light">5</p>
            <p className="text-xs uppercase tracking-wide text-white/70">
              Domaines d&apos;activité
            </p>
          </div>
        </div>

        <div>
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-gold-dark">
            Qui sommes-nous
          </span>
          <h2 className="font-serif-display text-balance text-3xl font-bold text-navy sm:text-4xl">
            ENGOBO GROUP, un savoir-faire au service de vos projets
          </h2>
          <p className="mt-6 text-balance leading-relaxed text-charcoal/70">
            {settings.description}
          </p>
          <p className="mt-4 leading-relaxed text-charcoal/70">
            De l&apos;importation de matériaux à la pose finale, nos équipes
            interviennent à chaque étape pour garantir des réalisations durables,
            esthétiques et conformes à vos attentes.
          </p>
          <Button href="/a-propos" variant="ghost" className="mt-8">
            En savoir plus
          </Button>
        </div>
      </Container>
    </section>
  );
}

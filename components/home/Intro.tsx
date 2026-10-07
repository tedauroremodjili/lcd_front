import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import CountUp from "@/components/ui/CountUp";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import Parallax from "@/components/ui/Parallax";
import Reveal from "@/components/ui/Reveal";
import { getTexts } from "@/lib/api";
import { txt } from "@/lib/texts";
import type { CompanySettings } from "@/lib/types";

export default async function Intro({
  settings,
  serviceCount,
}: {
  settings: CompanySettings;
  serviceCount: number;
}) {
  const texts = await getTexts();

  return (
    <section className="bg-tint py-20 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="relative">
          <Reveal
            direction="wipe"
            className="group relative aspect-4/3 w-full overflow-hidden rounded-2xl"
          >
            <Parallax speed={0.08} className="absolute inset-x-0 -inset-y-[7%]">
              <ImagePlaceholder
                id={settings.intro_image}
                className="h-full w-full transition-transform duration-700 group-hover:scale-105"
              />
            </Parallax>
          </Reveal>
          <Reveal
            direction="zoom"
            delay={700}
            className="absolute -bottom-6 -right-6 hidden rounded-xl bg-navy px-7 py-5 text-white shadow-xl sm:block"
          >
            <CountUp
              to={serviceCount}
              className="font-serif-display block text-3xl font-bold text-gold-light"
            />
            <p className="text-xs uppercase tracking-wide text-white/70">
              {txt(texts, "home.intro_stat_label")}
            </p>
          </Reveal>
        </div>

        <Reveal direction="right" delay={150}>
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-gold-dark">
            {txt(texts, "home.intro_eyebrow")}
          </span>
          <h2 className="font-serif-display text-balance text-3xl font-bold text-heading sm:text-4xl">
            {txt(texts, "home.intro_title")}
          </h2>
          <p className="mt-6 text-balance leading-relaxed text-body/70">
            {settings.description}
          </p>
          <p className="mt-4 leading-relaxed text-body/70">{txt(texts, "home.intro_text")}</p>
          <Button href="/a-propos" variant="ghost" className="mt-8">
            {txt(texts, "home.intro_more")}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}

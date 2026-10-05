import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import Magnetic from "@/components/ui/Magnetic";
import Parallax from "@/components/ui/Parallax";
import Reveal from "@/components/ui/Reveal";
import SplitText from "@/components/ui/SplitText";
import { getTexts } from "@/lib/api";
import { txt } from "@/lib/texts";

export default async function CtaSection({ image = "" }: { image?: string }) {
  const texts = await getTexts();
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <Parallax speed={0.12} className="absolute inset-x-0 -inset-y-[12%]">
        <ImagePlaceholder id={image} className="h-full w-full" />
      </Parallax>
      <div className="absolute inset-0 bg-navy/85" />
      <div className="animate-float-slow pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-gold/20 blur-3xl" />
      <div className="animate-float-slow pointer-events-none absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-navy-light/50 blur-3xl [animation-delay:-3s]" />
      <Container className="relative text-center text-white">
        <Reveal>
          <h2 className="font-serif-display text-balance text-3xl font-bold sm:text-4xl">
            <SplitText text={txt(texts, "cta.title")} />
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="mx-auto mt-4 max-w-xl text-balance text-white/80">
            {txt(texts, "cta.text")}
          </p>
        </Reveal>
        <Reveal delay={280} direction="zoom" className="mt-9">
          <Magnetic>
            <Button href="/devis" variant="primary">
              {txt(texts, "cta.button")}
            </Button>
          </Magnetic>
        </Reveal>
      </Container>
    </section>
  );
}

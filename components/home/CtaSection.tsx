import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Magnetic from "@/components/ui/Magnetic";
import Reveal from "@/components/ui/Reveal";
import SplitText from "@/components/ui/SplitText";
import { getTexts } from "@/lib/api";
import { txt } from "@/lib/texts";

// Navy call-to-action band with a gold button.
export default async function CtaSection() {
  const texts = await getTexts();
  return (
    <section className="bg-navy py-20 sm:py-28">
      <Container className="text-center text-white">
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

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";

export default function CtaSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <ImagePlaceholder id="cta-projet" className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-navy/85" />
      <Container className="relative text-center text-white">
        <h2 className="font-serif-display text-balance text-3xl font-bold sm:text-4xl">
          Vous avez un projet ?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-balance text-white/80">
          Parlez-nous de votre projet et recevez un devis personnalisé de notre équipe.
        </p>
        <div className="mt-9">
          <Button href="/devis" variant="primary">
            Demander un devis
          </Button>
        </div>
      </Container>
    </section>
  );
}

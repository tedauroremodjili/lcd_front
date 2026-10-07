import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center bg-tint py-20">
      <Container className="text-center">
        <p className="font-serif-display text-7xl font-bold text-gold">404</p>
        <h1 className="mt-4 font-serif-display text-2xl font-bold text-heading">
          Page introuvable
        </h1>
        <p className="mx-auto mt-3 max-w-md text-body/70">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <div className="mt-8">
          <Button href="/" variant="primary">
            Retour à l&apos;accueil
          </Button>
        </div>
      </Container>
    </section>
  );
}

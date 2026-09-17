import ProductCard from "@/components/products/ProductCard";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Product } from "@/lib/types";

export default function ProductsShowcase({ products }: { products: Product[] }) {
  return (
    <section className="bg-offwhite py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Catalogue"
          title="Nos produits"
          description="Une sélection de matériaux et de mobilier disponibles à la vente ou sur devis."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button href="/produits" variant="ghost">
            Voir tout le catalogue
          </Button>
        </div>
      </Container>
    </section>
  );
}

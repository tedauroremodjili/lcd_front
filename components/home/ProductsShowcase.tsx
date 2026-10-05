import ProductCard from "@/components/products/ProductCard";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import ScrollRow from "@/components/ui/ScrollRow";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Tilt from "@/components/ui/Tilt";
import { getTexts } from "@/lib/api";
import { txt } from "@/lib/texts";
import type { Product } from "@/lib/types";

export default async function ProductsShowcase({ products }: { products: Product[] }) {
  const texts = await getTexts();
  return (
    <section className="bg-surface-alt py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow={txt(texts, "home.products_eyebrow")}
          title={txt(texts, "home.products_title")}
          description={txt(texts, "home.products_text")}
        />
        <Reveal className="mt-14" delay={120}>
          <ScrollRow fadeFrom="from-surface-alt">
            {products.map((product) => (
              <div
                key={product.id}
                className="w-[70%] shrink-0 snap-start sm:w-[36%] lg:w-[23%]"
              >
                <Tilt className="h-full">
                  <ProductCard product={product} />
                </Tilt>
              </div>
            ))}
          </ScrollRow>
        </Reveal>
        <Reveal className="mt-12 text-center" delay={200}>
          <Button href="/produits" variant="ghost">
            {txt(texts, "home.products_button")}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}

import type { Metadata } from "next";
import ProductCatalog from "@/components/products/ProductCatalog";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import { getProductCategories, getProducts } from "@/lib/api";

export const metadata: Metadata = {
  title: "Nos produits",
  description:
    "Marbre, granit, bois, mobilier, matériaux et produits importés : découvrez le catalogue ENGOBO GROUP.",
};

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getProductCategories(),
  ]);

  return (
    <>
      <PageHero
        eyebrow="Catalogue"
        title="Nos produits"
        description="Une sélection de matériaux et de mobilier disponibles à la vente ou sur devis."
        breadcrumb={[{ label: "Accueil", href: "/" }, { label: "Produits" }]}
        image="hero-produits"
      />
      <section className="bg-white py-20 sm:py-24">
        <Container>
          <ProductCatalog products={products} categories={categories} />
        </Container>
      </section>
    </>
  );
}

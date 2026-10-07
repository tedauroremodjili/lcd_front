import type { Metadata } from "next";
import ProductCatalog from "@/components/products/ProductCatalog";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import { getProductCategories, getProducts, getPageBanners } from "@/lib/api";

export const metadata: Metadata = {
  title: "Nos produits",
  description:
    "Marbre, granit, bois, mobilier, matériaux et produits importés : découvrez le catalogue ENGOBO GROUP.",
};

export default async function ProductsPage() {
  const banners = await getPageBanners();
  const [products, categories] = await Promise.all([
    getProducts(),
    getProductCategories(),
  ]);

  return (
    <>
      <PageHero
        eyebrow={banners.produits?.eyebrow ?? ""}
        title={banners.produits?.title ?? ""}
        description={banners.produits?.description ?? ""}
        breadcrumb={[{ label: "Accueil", href: "/" }, { label: "Produits" }]}
        image={banners.produits?.image ?? ""}
      />
      <section className="bg-tint py-20 sm:py-24">
        <Container>
          <ProductCatalog products={products} categories={categories} />
        </Container>
      </section>
    </>
  );
}

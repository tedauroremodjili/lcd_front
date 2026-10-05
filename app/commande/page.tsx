import type { Metadata } from "next";
import Link from "next/link";
import OrderForm from "@/components/forms/OrderForm";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import { getPageBanners, getProductBySlug } from "@/lib/api";

export const metadata: Metadata = {
  title: "Passer une commande",
  description: "Commandez un produit ENGOBO GROUP en ligne. Notre équipe confirme la disponibilité et la livraison.",
};

export default async function OrderPage(props: PageProps<"/commande">) {
  const searchParams = await props.searchParams;
  const slug = typeof searchParams.produit === "string" ? searchParams.produit : undefined;
  const [product, banners] = await Promise.all([
    slug ? getProductBySlug(slug) : Promise.resolve(undefined),
    getPageBanners(),
  ]);

  return (
    <>
      <PageHero
        eyebrow="Commande"
        title="Passer une commande"
        description="Renseignez vos coordonnées : notre équipe confirme la disponibilité et la livraison."
        breadcrumb={[{ label: "Accueil", href: "/" }, { label: "Produits", href: "/produits" }, { label: "Commande" }]}
        image={banners.produits?.image ?? ""}
      />
      <section className="bg-surface py-20 sm:py-24">
        <Container className="max-w-3xl">
          {product ? (
            <OrderForm productId={product.id} productName={product.name} maxStock={product.stock_quantity} />
          ) : (
            <p className="text-center text-sm text-body/70">
              Choisissez d&apos;abord un produit dans le <Link href="/produits" className="font-semibold text-heading underline">catalogue</Link>.
            </p>
          )}
        </Container>
      </section>
    </>
  );
}

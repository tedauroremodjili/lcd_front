import Tilt from "@/components/ui/Tilt";
import Reveal from "@/components/ui/Reveal";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Gallery from "@/components/gallery/Gallery";
import ProductCard from "@/components/products/ProductCard";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/layout/Header";
import ReviewsSection from "@/components/reviews/ReviewsSection";
import { getProductBySlug, getProducts, getReviews, getSettings } from "@/lib/api";
import { formatPrice, whatsappLink } from "@/lib/utils";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata(
  props: PageProps<"/produits/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);
  if (!product) return {};

  return {
    title: product.name,
    description: product.description,
  };
}

const availabilityLabels = {
  in_stock: "En stock",
  on_order: "Sur commande",
  unavailable: "Indisponible",
} as const;

export default async function ProductDetailPage(
  props: PageProps<"/produits/[slug]">
) {
  const { slug } = await props.params;
  const [product, settings] = await Promise.all([
    getProductBySlug(slug),
    getSettings(),
  ]);
  if (!product) notFound();

  const [similar, reviews] = await Promise.all([
    getProducts({ category: product.category.slug }).then((list) =>
      list.filter((p) => p.id !== product.id)
    ),
    getReviews({ product: product.slug }),
  ]);

  return (
    <>
      <PageHero
        eyebrow={product.category.name}
        title={product.name}
        description={`Référence : ${product.reference}`}
        breadcrumb={[
          { label: "Accueil", href: "/" },
          { label: "Produits", href: "/produits" },
          { label: product.name },
        ]}
        image={product.image}
      />

      <section className="bg-surface py-14 sm:py-20">
      <Container>

        <div className="grid gap-14 lg:grid-cols-2">
          <Reveal direction="left">
            <Gallery images={[product.image, ...product.gallery]} alt={product.name} />
          </Reveal>

          <Reveal direction="right" delay={150}>
            <p className="mt-6 leading-relaxed text-body/70">{product.description}</p>

            {product.characteristics.length > 0 && (
              <dl className="mt-8 space-y-3 rounded-xl bg-surface-alt p-6">
                {product.characteristics.map((c) => (
                  <div key={c.label} className="flex justify-between gap-4 text-sm">
                    <dt className="text-body/50">{c.label}</dt>
                    <dd className="font-medium text-heading">{c.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            <div className="mt-8 flex items-center justify-between rounded-xl border border-subtle/10 px-6 py-5">
              <div>
                <p className="text-xs uppercase tracking-wide text-body/50">Prix</p>
                <p className="text-xl font-bold text-heading">
                  {product.price_type === "on_quote"
                    ? "Sur devis"
                    : formatPrice(product.price!)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-wide text-body/50">
                  Disponibilité
                </p>
                <p className="text-sm font-semibold text-heading">
                  {product.stock_quantity !== undefined ? (product.stock_quantity > 0 ? `${product.stock_quantity} en stock` : "Rupture de stock") : availabilityLabels[product.availability]}
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={`/commande?produit=${product.slug}`} variant="primary" className="flex-1">
                Commander
              </Button>
              <Button href={`/devis?produit=${product.slug}`} variant="ghost" className="flex-1">
                Demander un devis
              </Button>
              <Button
                href={whatsappLink(
                  settings.whatsapp,
                  `Bonjour ENGOBO GROUP, je suis intéressé par le produit ${product.name}.`
                )}
                variant="secondary"
                className="flex-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>

      {similar.length > 0 && (
        <Container className="mt-24">
          <SectionHeading eyebrow="Catalogue" title="Produits similaires" align="left" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {similar.slice(0, 4).map((p, i) => (
              <Reveal key={p.id} delay={i * 100} className="h-full">
                <Tilt className="h-full">
                  <ProductCard product={p} />
                </Tilt>
              </Reveal>
            ))}
          </div>
        </Container>
      )}
    </section>
    <ReviewsSection target={{ product_slug: product.slug }} initial={reviews} />
    </>
  );
}

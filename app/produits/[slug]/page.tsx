import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Gallery from "@/components/gallery/Gallery";
import ProductCard from "@/components/products/ProductCard";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/layout/Header";
import { getProductBySlug, getProducts, getSettings } from "@/lib/api";
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

  const similar = (
    await getProducts({ category: product.category.slug })
  ).filter((p) => p.id !== product.id);

  return (
    <section className="bg-white py-14 sm:py-20">
      <Container>
        <nav className="mb-8 flex flex-wrap gap-2 text-xs text-charcoal/50">
          <Link href="/" className="hover:text-navy">Accueil</Link>
          <span>/</span>
          <Link href="/produits" className="hover:text-navy">Produits</Link>
          <span>/</span>
          <span className="text-navy">{product.name}</span>
        </nav>

        <div className="grid gap-14 lg:grid-cols-2">
          <Gallery images={[product.image, ...product.gallery]} alt={product.name} />

          <div>
            <Badge tone="gold">{product.category.name}</Badge>
            <h1 className="mt-4 font-serif-display text-3xl font-bold text-navy sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-2 text-sm font-medium text-charcoal/50">
              Référence : {product.reference}
            </p>

            <p className="mt-6 leading-relaxed text-charcoal/70">{product.description}</p>

            {product.characteristics.length > 0 && (
              <dl className="mt-8 space-y-3 rounded-xl bg-offwhite p-6">
                {product.characteristics.map((c) => (
                  <div key={c.label} className="flex justify-between gap-4 text-sm">
                    <dt className="text-charcoal/50">{c.label}</dt>
                    <dd className="font-medium text-navy">{c.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            <div className="mt-8 flex items-center justify-between rounded-xl border border-navy/10 px-6 py-5">
              <div>
                <p className="text-xs uppercase tracking-wide text-charcoal/50">Prix</p>
                <p className="text-xl font-bold text-navy">
                  {product.price_type === "on_quote"
                    ? "Sur devis"
                    : formatPrice(product.price!)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-wide text-charcoal/50">
                  Disponibilité
                </p>
                <p className="text-sm font-semibold text-navy">
                  {availabilityLabels[product.availability]}
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={`/devis?produit=${product.slug}`} variant="primary" className="flex-1">
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
          </div>
        </div>
      </Container>

      {similar.length > 0 && (
        <Container className="mt-24">
          <SectionHeading eyebrow="Catalogue" title="Produits similaires" align="left" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {similar.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </Container>
      )}
    </section>
  );
}

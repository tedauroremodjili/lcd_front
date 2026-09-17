import Link from "next/link";
import Badge from "@/components/ui/Badge";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

const availabilityLabels: Record<Product["availability"], string> = {
  in_stock: "En stock",
  on_order: "Sur commande",
  unavailable: "Indisponible",
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/produits/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_2px_20px_rgba(6,37,74,0.08)] transition-shadow hover:shadow-[0_8px_30px_rgba(6,37,74,0.15)]"
    >
      <div className="relative aspect-square overflow-hidden">
        <ImagePlaceholder
          id={product.image}
          className="h-full w-full transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3">
          <Badge tone="light">{product.category.name}</Badge>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-charcoal/40">
          Réf. {product.reference}
        </p>
        <h3 className="mt-1 font-serif-display text-base font-bold text-navy">
          {product.name}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-charcoal/70">
          {product.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm font-bold text-navy">
            {product.price_type === "on_quote" ? "Sur devis" : formatPrice(product.price!)}
          </span>
          <span className="text-xs font-medium text-charcoal/50">
            {availabilityLabels[product.availability]}
          </span>
        </div>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gold-dark">
          Voir le produit
        </span>
      </div>
    </Link>
  );
}

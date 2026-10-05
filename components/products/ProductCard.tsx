import Link from "next/link";
import Badge from "@/components/ui/Badge";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import LikeButton from "@/components/products/LikeButton";
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
      className="group flex flex-col overflow-hidden rounded-2xl bg-surface shadow-[0_2px_20px_rgba(6,37,74,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_14px_40px_rgba(6,37,74,0.18)]"
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
        <p className="text-xs font-semibold uppercase tracking-wide text-body/40">
          Réf. {product.reference}
        </p>
        <h3 className="mt-1 font-serif-display text-base font-bold text-heading">
          {product.name}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-body/70">
          {product.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm font-bold text-heading">
            {product.price_type === "on_quote" ? "Sur devis" : formatPrice(product.price!)}
          </span>
          <span className="text-xs font-medium text-body/50">
            {availabilityLabels[product.availability]}
          </span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gold-dark">
            Voir le produit
          </span>
          <LikeButton slug={product.slug} initialCount={product.likes_count ?? 0} />
        </div>
      </div>
    </Link>
  );
}

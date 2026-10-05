"use client";

import Tilt from "@/components/ui/Tilt";

import Reveal from "@/components/ui/Reveal";

import { useMemo, useState } from "react";
import ProductCard from "@/components/products/ProductCard";
import type { Product, ProductCategory } from "@/lib/types";

export default function ProductCatalog({
  products,
  categories,
}: {
  products: Product[];
  categories: ProductCategory[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list = products;
    if (category) list = list.filter((p) => p.category.slug === category);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.reference.toLowerCase().includes(q) ||
          p.category.name.toLowerCase().includes(q)
      );
    }
    return list;
  }, [products, category, query]);

  return (
    <div>
      <Reveal className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <svg
            width="18"
            height="18"
            viewBox="0 0 20 20"
            fill="none"
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-body/40"
          >
            <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.6" />
            <path d="m17 17-3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un produit..."
            className="w-full rounded-full border border-subtle/15 bg-surface py-3 pl-11 pr-4 text-sm text-heading placeholder:text-body/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
          />
        </div>

        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          <button
            onClick={() => setCategory(null)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              category === null ? "bg-navy text-white" : "bg-surface-alt text-heading hover:bg-navy/10"
            }`}
          >
            Toutes
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setCategory(cat.slug)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                category === cat.slug
                  ? "bg-navy text-white"
                  : "bg-surface-alt text-heading hover:bg-navy/10"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </Reveal>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-sm text-body/60">
          Aucun produit ne correspond à votre recherche.
        </p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((product, i) => (
            <Reveal key={product.id} delay={(i % 4) * 90} className="h-full">
              <Tilt className="h-full">
                <ProductCard product={product} />
              </Tilt>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}

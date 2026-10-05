"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import ArticleCard from "@/components/articles/ArticleCard";
import Badge from "@/components/ui/Badge";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import Reveal from "@/components/ui/Reveal";
import Tilt from "@/components/ui/Tilt";
import type { Article, ArticleCategory } from "@/lib/types";
import { formatDate } from "@/lib/utils";

const PAGE_SIZE = 6;

function normalize(text: string) {
  return text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

export default function ArticleFilters({ articles }: { articles: Article[] }) {
  const [active, setActive] = useState<string>("tous");
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);

  // Categories are derived from the published articles, so a category created
  // in the back-office appears here as soon as it holds an article.
  const categories = useMemo(() => {
    const map = new Map<string, ArticleCategory>();
    for (const a of articles) if (a.category) map.set(a.category.slug, a.category);
    return [...map.values()];
  }, [articles]);

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    return articles.filter(
      (a) =>
        (active === "tous" || a.category?.slug === active) &&
        (!q || normalize(`${a.title} ${a.excerpt} ${a.content}`).includes(q))
    );
  }, [articles, active, query]);

  // The most recent article is highlighted only on the unfiltered view.
  const showFeatured = active === "tous" && !query.trim() && filtered.length > 1;
  const [featured, ...rest] = filtered;
  const list = showFeatured ? rest : filtered;
  const shown = list.slice(0, visible);

  const select = (slug: string) => {
    setActive(slug);
    setVisible(PAGE_SIZE);
  };

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="no-scrollbar flex gap-3 overflow-x-auto pb-2">
          {[{ slug: "tous", name: "Tous" }, ...categories].map((c) => (
            <button
              key={c.slug}
              onClick={() => select(c.slug)}
              className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                active === c.slug ? "bg-navy text-white" : "bg-surface text-heading hover:bg-navy/10"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setVisible(PAGE_SIZE);
          }}
          placeholder="Rechercher un article…"
          aria-label="Rechercher un article"
          className="w-full rounded-full border border-navy/15 bg-surface px-5 py-2.5 text-sm text-heading outline-none transition-colors placeholder:text-body/40 focus:border-navy sm:w-72"
        />
      </div>

      {showFeatured && featured && (
        <Reveal className="mt-10">
          <Link
            href={`/actualites/${featured.slug}`}
            className="group grid overflow-hidden rounded-2xl bg-surface shadow-[0_2px_20px_rgba(6,37,74,0.08)] transition-shadow duration-300 hover:shadow-[0_14px_40px_rgba(6,37,74,0.18)] lg:grid-cols-2"
          >
            <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-80">
              <ImagePlaceholder
                id={featured.image}
                className="h-full w-full transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-10">
              <div className="flex flex-wrap items-center gap-3">
                <Badge tone="gold">À la une</Badge>
                {featured.category && <Badge tone="light">{featured.category.name}</Badge>}
              </div>
              <h2 className="mt-4 font-serif-display text-2xl font-bold text-heading sm:text-3xl">
                {featured.title}
              </h2>
              <p className="mt-2 text-xs font-medium uppercase tracking-wide text-body/40">
                {formatDate(featured.published_at)} — {featured.author}
              </p>
              <p className="mt-4 line-clamp-3 leading-relaxed text-body/70">{featured.excerpt}</p>
              <span className="mt-6 text-sm font-semibold text-heading group-hover:underline">
                Lire l&apos;article →
              </span>
            </div>
          </Link>
        </Reveal>
      )}

      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-sm text-body/60">
          Aucun article ne correspond à votre recherche.
        </p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((article, i) => (
            <Reveal key={article.id} delay={(i % 3) * 110} className="h-full">
              <Tilt className="h-full">
                <ArticleCard article={article} />
              </Tilt>
            </Reveal>
          ))}
        </div>
      )}

      {list.length > visible && (
        <div className="mt-12 text-center">
          <button
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="rounded-full bg-navy px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-dark"
          >
            Voir plus d&apos;articles ({list.length - visible})
          </button>
        </div>
      )}
    </div>
  );
}

import Link from "next/link";
import Badge from "@/components/ui/Badge";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import type { Article } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/actualites/${article.slug}`}
      className="group block overflow-hidden rounded-2xl bg-surface shadow-[0_2px_20px_rgba(6,37,74,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_14px_40px_rgba(6,37,74,0.18)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <ImagePlaceholder
          id={article.image}
          className="h-full w-full transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4">
          {article.category && <Badge tone="light">{article.category.name}</Badge>}
        </div>
      </div>
      <div className="p-6">
        <p className="text-xs font-medium uppercase tracking-wide text-body/40">
          {formatDate(article.published_at)}
        </p>
        <h3 className="mt-2 font-serif-display text-lg font-bold text-heading">
          {article.title}
        </h3>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-body/70">
          {article.excerpt}
        </p>
      </div>
    </Link>
  );
}

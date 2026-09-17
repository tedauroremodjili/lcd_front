import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleCard from "@/components/articles/ArticleCard";
import Badge from "@/components/ui/Badge";
import Container from "@/components/ui/Container";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import SectionHeading from "@/components/ui/SectionHeading";
import { getArticleBySlug, getArticles } from "@/lib/api";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata(
  props: PageProps<"/actualites/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function ArticleDetailPage(
  props: PageProps<"/actualites/[slug]">
) {
  const { slug } = await props.params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const others = (await getArticles()).filter((a) => a.id !== article.id).slice(0, 3);

  return (
    <article className="bg-white py-14 sm:py-20">
      <Container className="max-w-3xl">
        <nav className="mb-8 flex flex-wrap gap-2 text-xs text-charcoal/50">
          <Link href="/" className="hover:text-navy">Accueil</Link>
          <span>/</span>
          <Link href="/actualites" className="hover:text-navy">Actualités</Link>
          <span>/</span>
          <span className="text-navy">{article.title}</span>
        </nav>

        <Badge tone="gold">{article.category.name}</Badge>
        <h1 className="mt-4 font-serif-display text-3xl font-bold text-navy sm:text-4xl">
          {article.title}
        </h1>
        <p className="mt-3 text-sm text-charcoal/50">
          {formatDate(article.published_at)} — Par {article.author}
        </p>

        <div className="mt-8 aspect-video overflow-hidden rounded-2xl">
          <ImagePlaceholder id={article.image} className="h-full w-full" />
        </div>

        <div className="mt-10 space-y-5 leading-relaxed text-charcoal/75">
          <p>{article.content}</p>
        </div>
      </Container>

      {others.length > 0 && (
        <Container className="mt-24 max-w-6xl">
          <SectionHeading eyebrow="À lire aussi" title="Autres actualités" align="left" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </Container>
      )}
    </article>
  );
}

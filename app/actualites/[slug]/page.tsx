import Tilt from "@/components/ui/Tilt";
import Reveal from "@/components/ui/Reveal";
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
    <article className="bg-surface py-14 sm:py-20">
      <Container className="max-w-3xl">
        <nav className="mb-8 flex flex-wrap gap-2 text-xs text-body/50">
          <Link href="/" className="hover:text-heading">Accueil</Link>
          <span>/</span>
          <Link href="/actualites" className="hover:text-heading">Actualités</Link>
          <span>/</span>
          <span className="text-heading">{article.title}</span>
        </nav>

        {article.category && <Badge tone="gold">{article.category.name}</Badge>}
        <h1 className="mt-4 font-serif-display text-3xl font-bold text-heading sm:text-4xl">
          {article.title}
        </h1>
        <p className="mt-3 text-sm text-body/50">
          {formatDate(article.published_at)} — Par {article.author}
        </p>

        <Reveal direction="wipe" className="mt-8 aspect-video overflow-hidden rounded-2xl">
          <ImagePlaceholder id={article.image} className="h-full w-full" />
        </Reveal>

        <Reveal className="mt-10 space-y-5 leading-relaxed text-body/75" delay={120}>
          {article.content
            .split(/\r?\n/)
            .filter((p) => p.trim())
            .map((p, i) => (
              <p key={i}>{p}</p>
            ))}
        </Reveal>
      </Container>

      {others.length > 0 && (
        <Container className="mt-24 max-w-6xl">
          <SectionHeading eyebrow="À lire aussi" title="Autres actualités" align="left" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((a, i) => (
              <Reveal key={a.id} delay={i * 110} className="h-full">
                <Tilt className="h-full">
                  <ArticleCard article={a} />
                </Tilt>
              </Reveal>
            ))}
          </div>
        </Container>
      )}
    </article>
  );
}

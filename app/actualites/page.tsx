import type { Metadata } from "next";
import ArticleCard from "@/components/articles/ArticleCard";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import { getArticles } from "@/lib/api";

export const metadata: Metadata = {
  title: "Actualités",
  description:
    "Nouvelles réalisations, nouveaux produits, conseils et actualités d'ENGOBO GROUP.",
};

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <>
      <PageHero
        eyebrow="Le journal"
        title="Actualités"
        description="Nouvelles réalisations, nouveaux produits et conseils de nos équipes."
        breadcrumb={[{ label: "Accueil", href: "/" }, { label: "Actualités" }]}
        image="hero-actualites"
      />
      <section className="bg-white py-20 sm:py-24">
        <Container>
          {articles.length === 0 ? (
            <p className="text-center text-sm text-charcoal/60">
              Aucun article publié pour le moment.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}

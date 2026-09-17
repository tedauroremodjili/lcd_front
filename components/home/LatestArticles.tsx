import ArticleCard from "@/components/articles/ArticleCard";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Article } from "@/lib/types";

export default function LatestArticles({ articles }: { articles: Article[] }) {
  if (articles.length === 0) return null;

  return (
    <section className="bg-offwhite py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Le journal"
          title="Nos actualités"
          description="Nouvelles réalisations, nouveaux produits et conseils de nos équipes."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button href="/actualites" variant="ghost">
            Voir toutes les actualités
          </Button>
        </div>
      </Container>
    </section>
  );
}

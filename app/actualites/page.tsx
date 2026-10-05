import type { Metadata } from "next";
import ArticleFilters from "@/components/articles/ArticleFilters";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import { getArticles, getPageBanners } from "@/lib/api";

export const metadata: Metadata = {
  title: "Actualités",
  description:
    "Nouvelles réalisations, nouveaux produits, conseils et actualités d'ENGOBO GROUP.",
};

export default async function ArticlesPage() {
  const banners = await getPageBanners();
  const articles = await getArticles();

  return (
    <>
      <PageHero
        eyebrow={banners.actualites?.eyebrow ?? ""}
        title={banners.actualites?.title ?? ""}
        description={banners.actualites?.description ?? ""}
        breadcrumb={[{ label: "Accueil", href: "/" }, { label: "Actualités" }]}
        image={banners.actualites?.image ?? ""}
      />
      <section className="bg-surface py-20 sm:py-24">
        <Container>
          {articles.length === 0 ? (
            <p className="text-center text-sm text-body/60">
              Aucun article publié pour le moment.
            </p>
          ) : (
            <ArticleFilters articles={articles} />
          )}
        </Container>
      </section>
    </>
  );
}

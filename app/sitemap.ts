import type { MetadataRoute } from "next";
import { getArticles, getProducts, getProjects, getServices } from "@/lib/api";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.engobogroup.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, products, projects, articles] = await Promise.all([
    getServices(),
    getProducts(),
    getProjects(),
    getArticles(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/a-propos",
    "/services",
    "/realisations",
    "/produits",
    "/devis",
    "/contact",
    "/actualites",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${baseUrl}/produits/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${baseUrl}/realisations/${p.slug}`,
    lastModified: new Date(p.realized_at),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${baseUrl}/actualites/${a.slug}`,
    lastModified: new Date(a.published_at),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...productRoutes,
    ...projectRoutes,
    ...articleRoutes,
  ];
}

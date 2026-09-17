// Single entry point the UI uses to read content.
//
// Today every function resolves the mock data from lib/data.ts. Once the
// Laravel API described in the cahier des charges (§41-42) is live, swap the
// body of each function for a `fetch(`${API_URL}/...`)` call — the return
// types (lib/types.ts) already match the Laravel resource shape, so no
// component needs to change.

import {
  articles,
  heroSlides,
  productCategories,
  products,
  projects,
  services,
  settings,
  testimonials,
} from "./data";
import type {
  Article,
  ContactMessagePayload,
  HeroSlide,
  Product,
  Project,
  QuoteRequestPayload,
  Service,
  ServiceSlug,
  Testimonial,
} from "./types";

// export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getSettings() {
  return settings;
}

export async function getHeroSlides(): Promise<HeroSlide[]> {
  return heroSlides
    .filter((s) => s.status === "published")
    .sort((a, b) => a.sort_order - b.sort_order);
}

export async function getServices(): Promise<Service[]> {
  return services
    .filter((s) => s.status === "published")
    .sort((a, b) => a.sort_order - b.sort_order);
}

export async function getServiceBySlug(slug: string): Promise<Service | undefined> {
  return services.find((s) => s.slug === slug && s.status === "published");
}

export async function getProducts(params?: {
  category?: string;
  query?: string;
  featured?: boolean;
}): Promise<Product[]> {
  let list = products.filter((p) => p.status === "published");

  if (params?.category) {
    list = list.filter((p) => p.category.slug === params.category);
  }

  if (params?.featured) {
    list = list.filter((p) => p.featured);
  }

  if (params?.query) {
    const q = params.query.trim().toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.reference.toLowerCase().includes(q) ||
        p.category.name.toLowerCase().includes(q)
    );
  }

  return list;
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return products.find((p) => p.slug === slug && p.status === "published");
}

export async function getProductCategories() {
  return productCategories;
}

export async function getProjects(params?: {
  service?: ServiceSlug;
  featured?: boolean;
}): Promise<Project[]> {
  let list = projects.filter((p) => p.status === "published");

  if (params?.service) {
    list = list.filter((p) => p.service === params.service);
  }

  if (params?.featured) {
    list = list.filter((p) => p.featured);
  }

  return list;
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  return projects.find((p) => p.slug === slug && p.status === "published");
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return testimonials.filter((t) => t.status === "approved");
}

export async function getArticles(): Promise<Article[]> {
  return articles
    .filter((a) => a.status === "published")
    .sort(
      (a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
    );
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  return articles.find((a) => a.slug === slug && a.status === "published");
}

// Mutations below simulate the future POST /api/quotes and POST /api/contact
// endpoints. They resolve after a short delay and always succeed, since there
// is no backend yet — replace with real fetch() calls once Laravel is wired
// up (see cahier des charges §19, §41).

export async function submitQuoteRequest(payload: QuoteRequestPayload) {
  await new Promise((resolve) => setTimeout(resolve, 600));
  console.log("[mock] POST /api/quotes", payload);
  return { success: true };
}

export async function submitContactMessage(payload: ContactMessagePayload) {
  await new Promise((resolve) => setTimeout(resolve, 600));
  console.log("[mock] POST /api/contact", payload);
  return { success: true };
}

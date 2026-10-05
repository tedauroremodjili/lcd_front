// Single entry point the UI uses to read and write content. Every function
// calls the Laravel REST API (cahier des charges §41). The public API already
// returns the exact shapes declared in lib/types.ts, so no mapping is needed.
//
// The back-office is the only source of content: when the API is unreachable
// the site renders empty (no built-in texts, settings or stock photos).

import { buildTexts, type Texts } from "./texts";
import type {
  AboutContent,
  ReviewsPayload,
  WeatherInfo,
  Article,
  CompanySettings,
  ChatbotConfig,
  ContactMessagePayload,
  HeroSlide,
  Product,
  ProductCategory,
  Project,
  QuoteRequestPayload,
  Service,
  ServiceSlug,
  Testimonial,
} from "./types";

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

const isLoopback = (host: string) => host === "localhost" || host === "127.0.0.1";

// Browser-side base URL. When the site is opened from another device (a phone
// on the same Wi-Fi) "localhost" would point at that device, so calls go through
// the Next.js rewrite (/laravel-api -> Laravel) instead. No effect in production.
export function apiBase(): string {
  if (
    typeof window !== "undefined" &&
    isLoopback(new URL(API_URL).hostname) &&
    !isLoopback(window.location.hostname)
  ) {
    return "/laravel-api";
  }
  return API_URL;
}

type Params = Record<string, string | boolean | undefined>;

// Never cached: every render asks the API, so back-office edits show instantly
// and nothing is served once the back-end is stopped.
async function request<T>(path: string, params?: Params): Promise<T | null> {
  const url = new URL(
    `${apiBase()}${path}`,
    typeof window !== "undefined" ? window.location.origin : undefined
  );
  for (const [key, value] of Object.entries(params ?? {})) {
    if (value !== undefined && value !== false && value !== "") {
      url.searchParams.set(key, value === true ? "1" : value);
    }
  }

  try {
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { data: T };
    return json.data;
  } catch (error) {
    console.error(`[api] GET ${path} failed`, error);
    return null;
  }
}

export async function getChatbotConfig(): Promise<ChatbotConfig | null> {
  return request<ChatbotConfig>("/chatbot");
}

/** Live data for the chat widget (browser). Each part is null if the API call failed. */
export async function getChatbotLiveData() {
  const [config, settings, services] = await Promise.all([
    request<ChatbotConfig>("/chatbot"),
    request<CompanySettings>("/settings"),
    request<Service[]>("/services"),
  ]);
  return { config, settings, services };
}

/** Every editable section text; all empty when the API is unreachable. */
export interface PageBanner {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
}

/** Hero banners of the inner pages, keyed by page (services, produits, ...). */
export async function getPageBanners(): Promise<Record<string, PageBanner>> {
  return (await request<Record<string, PageBanner>>("/page-banners")) ?? {};
}

export async function getTexts(): Promise<Texts> {
  return buildTexts(await request<Record<string, unknown>>("/site-texts"));
}

// Blank shapes returned when the API is unreachable, so components still
// render (empty) instead of crashing.
const emptySettings: CompanySettings = {
  name: "",
  tagline: "",
  logo: "",
  intro_image: "",
  about_image: "",
  cta_image: "",
  contact_image: "",
  contact_intro: "",
  description: "",
  address: "",
  city: "",
  phone_1: "",
  whatsapp: "",
  email: "",
  hours_weekdays: "",
  hours_weekend: "",
};

const emptyAbout: AboutContent = {
  hero_eyebrow: "",
  hero_title: "",
  hero_description: "",
  hero_image: "",
  history_title: "",
  history_text: "",
  history_extra: "",
  history_image: "",
  mission_title: "",
  mission_text: "",
  vision_title: "",
  vision_text: "",
  savoir_faire_title: "",
  savoir_faire_text: "",
  values: [],
  stats: [],
  team_eyebrow: "",
  team_title: "",
  team_description: "",
  team_photos: [],
};

export async function getSettings(): Promise<CompanySettings> {
  return (await request<CompanySettings>("/settings")) ?? emptySettings;
}

export async function getWeather(): Promise<WeatherInfo | null> {
  return (await request<WeatherInfo | null>("/weather")) ?? null;
}

export async function getAbout(): Promise<AboutContent> {
  return (await request<AboutContent>("/about")) ?? emptyAbout;
}

export async function getHeroSlides(): Promise<HeroSlide[]> {
  return (await request<HeroSlide[]>("/hero-slides")) ?? [];
}

export async function getServices(): Promise<Service[]> {
  return (await request<Service[]>("/services")) ?? [];
}

export async function getServiceBySlug(slug: string): Promise<Service | undefined> {
  return (await request<Service>(`/services/${slug}`)) ?? undefined;
}

export async function toggleProductLike(
  slug: string,
  visitorId: string
): Promise<{ liked: boolean; likes_count: number }> {
  const res = await fetch(`${apiBase()}/products/${slug}/like`, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({ visitor_id: visitorId }),
  });
  if (!res.ok) throw new Error("Impossible d'enregistrer votre j'aime.");
  const json = (await res.json()) as { data: { liked: boolean; likes_count: number } };
  return json.data;
}

export async function getProducts(params?: {
  category?: string;
  query?: string;
  featured?: boolean;
}): Promise<Product[]> {
  return (await request<Product[]>("/products", params)) ?? [];
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return (await request<Product>(`/products/${slug}`)) ?? undefined;
}

export async function getProductCategories(): Promise<ProductCategory[]> {
  return (await request<ProductCategory[]>("/categories")) ?? [];
}

export async function getProjects(params?: {
  service?: ServiceSlug;
  featured?: boolean;
}): Promise<Project[]> {
  return (await request<Project[]>("/projects", params)) ?? [];
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  return (await request<Project>(`/projects/${slug}`)) ?? undefined;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return (await request<Testimonial[]>("/testimonials")) ?? [];
}

export async function getArticles(): Promise<Article[]> {
  return (await request<Article[]>("/articles")) ?? [];
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  return (await request<Article>(`/articles/${slug}`)) ?? undefined;
}

// ---------------------------------------------------------------------------
// Mutations (called from client components)
// ---------------------------------------------------------------------------

async function post(path: string, body: FormData | object) {
  const isForm = body instanceof FormData;
  const res = await fetch(`${apiBase()}${path}`, {
    method: "POST",
    headers: isForm
      ? { Accept: "application/json" }
      : { Accept: "application/json", "Content-Type": "application/json" },
    body: isForm ? body : JSON.stringify(body),
  });

  const json = await res.json().catch(() => ({}));

  if (!res.ok) {
    const firstError = json.errors ? Object.values<string[]>(json.errors)[0]?.[0] : undefined;
    throw new Error(firstError ?? json.message ?? "Une erreur est survenue. Veuillez réessayer.");
  }

  return { success: true as const, data: json.data as { reference: string; total: number } | undefined };
}

export async function submitQuoteRequest(payload: QuoteRequestPayload) {
  const { attachments, ...fields } = payload;
  const form = new FormData();

  for (const [key, value] of Object.entries(fields)) {
    if (value !== undefined && value !== "") form.append(key, String(value));
  }
  for (const file of attachments ?? []) {
    if (file.size > 0) form.append("attachments[]", file);
  }

  return post("/quotes", form);
}

export interface OrderPayload {
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  customer_address?: string;
  notes?: string;
  items: { product_id: number; quantity: number }[];
}

export async function submitOrder(payload: OrderPayload) {
  return post("/orders", payload);
}

export async function submitContactMessage(payload: ContactMessagePayload) {
  return post("/contact", payload);
}

// No newsletter table exists in the back-office data model (§43), so this
// stays a local no-op until one is specified.
export async function getReviews(target: { service?: string; product?: string }): Promise<ReviewsPayload> {
  return (
    (await request<ReviewsPayload>("/reviews", target)) ?? { reviews: [], average: null, count: 0 }
  );
}

export type ReviewInput = {
  name: string;
  email?: string;
  rating: number;
  comment: string;
  service_slug?: string;
  product_slug?: string;
};

export async function submitReview(payload: ReviewInput) {
  return post("/reviews", payload);
}

export async function submitNewsletterSignup(email: string) {
  console.log("[newsletter] signup", { email });
  return { success: true };
}

// Types mirror the shape of the future Laravel REST API responses
// (see cahier des charges §41-44) so the mock data in lib/data.ts can be
// swapped for real `fetch()` calls in lib/api.ts without touching any
// component.

export type ServiceSlug =
  | "importation"
  | "marbrerie"
  | "ebenisterie"
  | "menuiserie"
  | "commerce-general";

export interface Service {
  id: number;
  name: string;
  slug: ServiceSlug;
  short_description: string;
  description: string;
  prestations: string[];
  image: string;
  gallery: string[];
  sort_order: number;
  status: "published" | "draft";
  seo_title?: string;
  seo_description?: string;
}

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  stock_quantity?: number;
  reference: string;
  category: ProductCategory;
  description: string;
  characteristics: { label: string; value: string }[];
  price: number | null;
  price_type: "fixed" | "on_quote";
  availability: "in_stock" | "on_order" | "unavailable";
  image: string;
  gallery: string[];
  featured: boolean;
  status: "published" | "draft";
  likes_count?: number;
  reviews_count?: number;
  rating_average?: number | null;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  service: ServiceSlug;
  description: string;
  location: string;
  realized_at: string;
  materials: string[];
  image: string;
  gallery: string[];
  featured: boolean;
  status: "published" | "draft";
}

export interface Testimonial {
  id: number;
  name: string;
  photo?: string;
  service: ServiceSlug | "general";
  message: string;
  rating?: number;
  status: "approved" | "pending";
}

export interface ArticleCategory {
  id: number;
  name: string;
  slug: string;
}

export interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  category: ArticleCategory;
  published_at: string;
  status: "draft" | "published" | "archived";
}

export interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  description?: string;
  image: string;
  image_mobile?: string;
  primary_button: { label: string; href: string };
  secondary_button?: { label: string; href: string };
  sort_order: number;
  status: "published" | "draft";
}

export interface AboutValue {
  title: string;
  description: string;
}

export interface AboutStat {
  value: string;
  label: string;
}

export interface WeatherCity {
  city: string;
  temperature: number;
  code: number;
  condition: string;
}

export interface WeatherInfo {
  country: string;
  cities: WeatherCity[];
}

export interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface ReviewsPayload {
  reviews: Review[];
  average: number | null;
  count: number;
}

export interface AboutContent {
  hero_eyebrow: string;
  hero_title: string;
  hero_description: string;
  hero_image: string;
  history_title: string;
  history_text: string;
  history_extra: string;
  history_image: string;
  mission_title: string;
  mission_text: string;
  vision_title: string;
  vision_text: string;
  savoir_faire_title: string;
  savoir_faire_text: string;
  values: AboutValue[];
  stats: AboutStat[];
  team_eyebrow: string;
  team_title: string;
  team_description: string;
  team_photos: string[];
}

export interface CompanySettings {
  name: string;
  tagline: string;
  logo: string;
  intro_image: string;
  about_image: string;
  cta_image: string;
  contact_image: string;
  contact_intro: string;
  description: string;
  address: string;
  city: string;
  phone_1: string;
  phone_2?: string;
  whatsapp: string;
  email: string;
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  hours_weekdays: string;
  hours_weekend: string;
  google_maps_embed?: string;
}

export type QuoteServiceOption =
  | "importation"
  | "marbrerie"
  | "ebenisterie"
  | "menuiserie"
  | "commerce-general"
  | "autre";

export interface QuoteRequestPayload {
  full_name: string;
  phone: string;
  email?: string;
  company?: string;
  service: QuoteServiceOption;
  project_type?: string;
  description: string;
  budget?: string;
  desired_date?: string;
  attachments?: File[];
}

export interface ContactMessagePayload {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

// Chatbot content managed in the back-office (GET /api/chatbot).
export interface ChatbotButton {
  label: string;
  message?: string;
  url?: string;
}

export interface ChatbotConfig {
  welcome: { id: number; text: string; buttons: ChatbotButton[]; page: string | null }[];
  quick_replies: { id: number; label: string; message?: string; url?: string; page?: string | null }[];
  nudges: { id: number; text: string; page: string | null }[];
  fallback: { text: string; buttons: ChatbotButton[] } | null;
  faq: { id: number; title: string; keywords: string[]; answer: string; buttons: ChatbotButton[] }[];
}

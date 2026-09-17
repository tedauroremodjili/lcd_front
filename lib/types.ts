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

export interface CompanySettings {
  name: string;
  tagline: string;
  logo: string;
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
}

export interface ContactMessagePayload {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

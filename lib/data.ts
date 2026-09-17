// Mock data standing in for the future Laravel API responses.
// Every shape here matches lib/types.ts exactly, which in turn mirrors the
// Laravel resources described in the cahier des charges (§29-38, §43).
// When the backend is ready, only lib/api.ts needs to change.

import type {
  Article,
  CompanySettings,
  HeroSlide,
  Product,
  Project,
  Service,
  Testimonial,
} from "./types";

export const settings: CompanySettings = {
  name: "ENGOBO GROUP",
  tagline: "L'excellence au service de vos projets.",
  logo: "/logo.svg",
  description:
    "ENGOBO GROUP est une entreprise multi-services spécialisée dans l'importation, la marbrerie, l'ébénisterie, la menuiserie et le commerce général. Nous réalisons vos projets sur mesure, du concept à la pose, avec un souci constant de qualité et de finition.",
  address: "Centre-ville",
  city: "Pointe-Noire, RDC",
  phone_1: "056594973",
  phone_2: "069570485",
  whatsapp: "243056594973",
  email: "contact@engobogroup.com",
  facebook: "https://facebook.com",
  instagram: "https://instagram.com",
  hours_weekdays: "Lun – Sam : 8h - 18h",
  hours_weekend: "Dimanche : Fermé",
};

export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: "ENGOBO GROUP",
    subtitle: "L'excellence au service de vos projets.",
    description:
      "Importation • Marbrerie • Ébénisterie • Menuiserie • Commerce général",
    image: "hero-marbrerie",
    primary_button: { label: "Découvrir nos services", href: "/services" },
    secondary_button: { label: "Demander un devis", href: "/devis" },
    sort_order: 1,
    status: "published",
  },
  {
    id: 2,
    title: "Marbrerie & Granit",
    subtitle: "Des matières nobles, une finition parfaite.",
    description:
      "Plans de travail, escaliers, revêtements et monuments taillés avec précision.",
    image: "hero-granit",
    primary_button: { label: "Voir la marbrerie", href: "/services/marbrerie" },
    secondary_button: { label: "Demander un devis", href: "/devis" },
    sort_order: 2,
    status: "published",
  },
  {
    id: 3,
    title: "Menuiserie sur mesure",
    subtitle: "Portes, fenêtres, cuisines et dressings.",
    description: "Des ouvrages conçus et posés selon vos besoins exacts.",
    image: "hero-menuiserie",
    primary_button: { label: "Voir la menuiserie", href: "/services/menuiserie" },
    secondary_button: { label: "Demander un devis", href: "/devis" },
    sort_order: 3,
    status: "published",
  },
];

export const services: Service[] = [
  {
    id: 1,
    name: "Importation",
    slug: "importation",
    short_description:
      "Importation de matériaux, mobilier et produits sélectionnés pour la qualité de leur fabrication.",
    description:
      "ENGOBO GROUP importe une sélection rigoureuse de matériaux de construction, de mobilier et de produits destinés au commerce général. Nous travaillons avec des fournisseurs fiables pour garantir une qualité constante, des délais maîtrisés et des prix compétitifs sur l'ensemble de nos gammes.",
    prestations: [
      "Approvisionnement en matériaux de construction",
      "Import de mobilier et articles de décoration",
      "Sourcing de produits sur demande",
      "Gestion logistique et douanière",
      "Distribution en gros et au détail",
    ],
    image: "service-importation",
    gallery: ["gallery-importation-1", "gallery-importation-2"],
    sort_order: 1,
    status: "published",
    seo_title: "Importation à Pointe-Noire | ENGOBO GROUP",
    seo_description:
      "Découvrez les services d'importation de matériaux et de produits d'ENGOBO GROUP à Pointe-Noire.",
  },
  {
    id: 2,
    name: "Marbrerie",
    slug: "marbrerie",
    short_description:
      "Marbre, granit et pierre naturelle taillés sur mesure pour vos intérieurs et extérieurs.",
    description:
      "Notre atelier de marbrerie transforme le marbre, le granit et la pierre naturelle en ouvrages durables et élégants. De la conception à la pose, chaque pièce est façonnée avec précision pour révéler la beauté naturelle de la matière.",
    prestations: [
      "Plans de travail sur mesure",
      "Escaliers en marbre et granit",
      "Revêtements muraux et sols",
      "Monuments et ouvrages funéraires",
      "Pierres tombales sur demande",
    ],
    image: "service-marbrerie",
    gallery: ["gallery-marbrerie-1", "gallery-marbrerie-2", "gallery-marbrerie-3"],
    sort_order: 2,
    status: "published",
    seo_title: "Marbrerie à Pointe-Noire | ENGOBO GROUP",
    seo_description:
      "Découvrez les services de marbrerie et les réalisations d'ENGOBO GROUP : marbre, granit et pierre naturelle sur mesure.",
  },
  {
    id: 3,
    name: "Ébénisterie",
    slug: "ebenisterie",
    short_description:
      "Mobilier sur mesure façonné avec des essences de bois nobles et un savoir-faire artisanal.",
    description:
      "Notre atelier d'ébénisterie conçoit et fabrique du mobilier sur mesure : tables, armoires, bureaux et pièces de décoration. Chaque meuble est pensé pour s'intégrer parfaitement à votre intérieur, dans le respect des techniques traditionnelles.",
    prestations: [
      "Mobilier sur mesure",
      "Tables et armoires",
      "Bureaux et rangements",
      "Objets de décoration en bois",
      "Restauration de mobilier",
    ],
    image: "service-ebenisterie",
    gallery: ["gallery-ebenisterie-1", "gallery-ebenisterie-2"],
    sort_order: 3,
    status: "published",
    seo_title: "Ébénisterie à Pointe-Noire | ENGOBO GROUP",
    seo_description:
      "Mobilier et pièces sur mesure façonnés par les ébénistes d'ENGOBO GROUP.",
  },
  {
    id: 4,
    name: "Menuiserie",
    slug: "menuiserie",
    short_description:
      "Portes, fenêtres, cuisines et dressings conçus et posés sur mesure.",
    description:
      "ENGOBO GROUP conçoit, fabrique et pose des ouvrages de menuiserie sur mesure : portes, fenêtres, cuisines, dressings et placards. Nous accompagnons chaque projet de la prise de mesure à l'installation finale.",
    prestations: [
      "Portes et fenêtres sur mesure",
      "Cuisines équipées",
      "Dressings et placards",
      "Meubles fonctionnels",
      "Ouvrages sur mesure",
    ],
    image: "service-menuiserie",
    gallery: ["gallery-menuiserie-1", "gallery-menuiserie-2"],
    sort_order: 4,
    status: "published",
    seo_title: "Menuiserie à Pointe-Noire | ENGOBO GROUP",
    seo_description:
      "Découvrez les services de menuiserie sur mesure d'ENGOBO GROUP : portes, fenêtres, cuisines et dressings.",
  },
  {
    id: 5,
    name: "Commerce général",
    slug: "commerce-general",
    short_description:
      "Une large gamme de produits et matériaux disponibles pour particuliers et professionnels.",
    description:
      "En complément de nos ateliers spécialisés, ENGOBO GROUP propose une activité de commerce général couvrant une large gamme de produits et matériaux, destinée aussi bien aux particuliers qu'aux professionnels du bâtiment.",
    prestations: [
      "Vente de matériaux de construction",
      "Distribution de produits divers",
      "Approvisionnement pour professionnels",
      "Conseil et devis personnalisés",
    ],
    image: "service-commerce",
    gallery: ["gallery-commerce-1", "gallery-commerce-2"],
    sort_order: 5,
    status: "published",
    seo_title: "Commerce général à Pointe-Noire | ENGOBO GROUP",
    seo_description:
      "ENGOBO GROUP, votre partenaire pour l'achat de matériaux et produits divers à Pointe-Noire.",
  },
];

export const productCategories = [
  { id: 1, name: "Marbre", slug: "marbre" },
  { id: 2, name: "Granit", slug: "granit" },
  { id: 3, name: "Bois", slug: "bois" },
  { id: 4, name: "Mobilier", slug: "mobilier" },
  { id: 5, name: "Matériaux", slug: "materiaux" },
  { id: 6, name: "Produits importés", slug: "produits-importes" },
  { id: 7, name: "Commerce général", slug: "commerce-general" },
];

export const products: Product[] = [
  {
    id: 1,
    name: "Plan de travail en marbre blanc",
    slug: "plan-de-travail-marbre-blanc",
    reference: "MB-001",
    category: productCategories[0],
    description:
      "Plan de travail taillé dans un marbre blanc veiné, poli miroir. Idéal pour cuisines et salles de bains haut de gamme. Découpe sur mesure selon vos dimensions.",
    characteristics: [
      { label: "Matériau", value: "Marbre blanc" },
      { label: "Finition", value: "Poli miroir" },
      { label: "Épaisseur", value: "2 à 3 cm" },
      { label: "Découpe", value: "Sur mesure" },
    ],
    price: null,
    price_type: "on_quote",
    availability: "on_order",
    image: "product-marbre-blanc",
    gallery: ["product-marbre-blanc-1", "product-marbre-blanc-2"],
    featured: true,
    status: "published",
  },
  {
    id: 2,
    name: "Dalle de granit noir absolu",
    slug: "dalle-granit-noir-absolu",
    reference: "GR-014",
    category: productCategories[1],
    description:
      "Dalle de granit noir absolu, très résistante à l'usure et aux taches. Parfaite pour les sols, escaliers et revêtements extérieurs.",
    characteristics: [
      { label: "Matériau", value: "Granit noir absolu" },
      { label: "Finition", value: "Poli ou flammé" },
      { label: "Usage", value: "Intérieur / extérieur" },
    ],
    price: null,
    price_type: "on_quote",
    availability: "in_stock",
    image: "product-granit-noir",
    gallery: ["product-granit-noir-1"],
    featured: true,
    status: "published",
  },
  {
    id: 3,
    name: "Armoire en bois massif",
    slug: "armoire-bois-massif",
    reference: "EB-027",
    category: productCategories[2],
    description:
      "Armoire deux portes en bois massif, façonnée à la main par nos ébénistes. Finition vernie, quincaillerie soignée.",
    characteristics: [
      { label: "Matériau", value: "Bois massif" },
      { label: "Dimensions", value: "180 x 100 x 55 cm" },
      { label: "Finition", value: "Vernis mat" },
    ],
    price: 850000,
    price_type: "fixed",
    availability: "in_stock",
    image: "product-armoire-bois",
    gallery: ["product-armoire-bois-1"],
    featured: true,
    status: "published",
  },
  {
    id: 4,
    name: "Table à manger sur mesure",
    slug: "table-a-manger-sur-mesure",
    reference: "EB-034",
    category: productCategories[3],
    description:
      "Table à manger fabriquée sur mesure selon les dimensions et essence de bois souhaitées. Devis personnalisé après prise de contact.",
    characteristics: [
      { label: "Matériau", value: "Bois au choix" },
      { label: "Places", value: "6 à 12 convives" },
      { label: "Fabrication", value: "Sur mesure" },
    ],
    price: null,
    price_type: "on_quote",
    availability: "on_order",
    image: "product-table-bois",
    gallery: ["product-table-bois-1"],
    featured: false,
    status: "published",
  },
  {
    id: 5,
    name: "Porte d'entrée en bois massif",
    slug: "porte-entree-bois-massif",
    reference: "MN-011",
    category: productCategories[2],
    description:
      "Porte d'entrée robuste en bois massif, avec serrure de sécurité. Fabrication et pose incluses.",
    characteristics: [
      { label: "Matériau", value: "Bois massif" },
      { label: "Dimensions", value: "220 x 100 cm" },
      { label: "Sécurité", value: "Serrure 3 points" },
    ],
    price: 620000,
    price_type: "fixed",
    availability: "on_order",
    image: "product-porte-bois",
    gallery: ["product-porte-bois-1"],
    featured: true,
    status: "published",
  },
  {
    id: 6,
    name: "Fenêtre aluminium double vitrage",
    slug: "fenetre-aluminium-double-vitrage",
    reference: "MN-018",
    category: productCategories[4],
    description:
      "Fenêtre en aluminium avec double vitrage, isolation thermique et phonique renforcée. Plusieurs coloris disponibles.",
    characteristics: [
      { label: "Matériau", value: "Aluminium" },
      { label: "Vitrage", value: "Double vitrage" },
      { label: "Coloris", value: "Blanc, gris, noir" },
    ],
    price: null,
    price_type: "on_quote",
    availability: "on_order",
    image: "product-fenetre-alu",
    gallery: ["product-fenetre-alu-1"],
    featured: false,
    status: "published",
  },
  {
    id: 7,
    name: "Carrelage importé grès cérame",
    slug: "carrelage-importe-gres-cerame",
    reference: "IM-045",
    category: productCategories[5],
    description:
      "Carrelage en grès cérame importé, grand format, idéal pour sols et murs intérieurs comme extérieurs.",
    characteristics: [
      { label: "Format", value: "60 x 60 cm" },
      { label: "Matériau", value: "Grès cérame" },
      { label: "Usage", value: "Sol / mur" },
    ],
    price: null,
    price_type: "on_quote",
    availability: "in_stock",
    image: "product-carrelage",
    gallery: ["product-carrelage-1"],
    featured: false,
    status: "published",
  },
  {
    id: 8,
    name: "Ciment et matériaux de construction",
    slug: "ciment-materiaux-construction",
    reference: "CG-002",
    category: productCategories[6],
    description:
      "Vente en gros et au détail de ciment et matériaux de construction courants, pour particuliers et chantiers professionnels.",
    characteristics: [
      { label: "Conditionnement", value: "Sac 50 kg" },
      { label: "Vente", value: "Gros et détail" },
    ],
    price: null,
    price_type: "on_quote",
    availability: "in_stock",
    image: "product-ciment",
    gallery: ["product-ciment-1"],
    featured: false,
    status: "published",
  },
];

export const projects: Project[] = [
  {
    id: 1,
    title: "Cuisine moderne en granit",
    slug: "cuisine-moderne-granit",
    service: "marbrerie",
    description:
      "Réalisation complète d'une cuisine moderne avec plan de travail en granit noir, crédence assortie et finitions sur mesure.",
    location: "Pointe-Noire",
    realized_at: "2025-11-04",
    materials: ["Granit noir absolu", "Bois laqué"],
    image: "project-cuisine-granit",
    gallery: [
      "project-cuisine-granit-1",
      "project-cuisine-granit-2",
      "project-cuisine-granit-3",
    ],
    featured: true,
    status: "published",
  },
  {
    id: 2,
    title: "Escalier en marbre blanc",
    slug: "escalier-marbre-blanc",
    service: "marbrerie",
    description:
      "Habillage complet d'un escalier intérieur en marbre blanc veiné, avec nez de marche antidérapants.",
    location: "Pointe-Noire",
    realized_at: "2025-09-18",
    materials: ["Marbre blanc"],
    image: "project-escalier-marbre",
    gallery: ["project-escalier-marbre-1", "project-escalier-marbre-2"],
    featured: true,
    status: "published",
  },
  {
    id: 3,
    title: "Dressing sur mesure",
    slug: "dressing-sur-mesure",
    service: "menuiserie",
    description:
      "Conception et pose d'un dressing sur mesure optimisant l'espace disponible, avec rangements modulables.",
    location: "Pointe-Noire",
    realized_at: "2025-08-02",
    materials: ["Bois mélaminé", "Quincaillerie aluminium"],
    image: "project-dressing",
    gallery: ["project-dressing-1", "project-dressing-2"],
    featured: false,
    status: "published",
  },
  {
    id: 4,
    title: "Bureau d'entreprise en bois massif",
    slug: "bureau-entreprise-bois-massif",
    service: "ebenisterie",
    description:
      "Fabrication d'un mobilier de bureau complet en bois massif : bureau de direction, bibliothèque et meuble d'appoint.",
    location: "Pointe-Noire",
    realized_at: "2025-07-15",
    materials: ["Bois massif", "Verre trempé"],
    image: "project-bureau",
    gallery: ["project-bureau-1", "project-bureau-2"],
    featured: true,
    status: "published",
  },
  {
    id: 5,
    title: "Façade en pierre naturelle",
    slug: "facade-pierre-naturelle",
    service: "marbrerie",
    description:
      "Habillage de façade extérieure en pierre naturelle, alliant esthétique et résistance aux intempéries.",
    location: "Pointe-Noire",
    realized_at: "2025-06-10",
    materials: ["Pierre naturelle"],
    image: "project-facade-pierre",
    gallery: ["project-facade-pierre-1"],
    featured: false,
    status: "published",
  },
  {
    id: 6,
    title: "Portail et clôture en fer et bois",
    slug: "portail-cloture-fer-bois",
    service: "menuiserie",
    description:
      "Conception et installation d'un portail et d'une clôture combinant structure métallique et lames de bois.",
    location: "Pointe-Noire",
    realized_at: "2025-05-20",
    materials: ["Fer forgé", "Bois traité"],
    image: "project-portail",
    gallery: ["project-portail-1"],
    featured: false,
    status: "published",
  },
  {
    id: 7,
    title: "Aménagement showroom commercial",
    slug: "amenagement-showroom-commercial",
    service: "commerce-general",
    description:
      "Aménagement complet d'un showroom : agencement, mobilier de présentation et signalétique.",
    location: "Pointe-Noire",
    realized_at: "2025-04-08",
    materials: ["Bois", "Métal", "Verre"],
    image: "project-showroom",
    gallery: ["project-showroom-1"],
    featured: false,
    status: "published",
  },
  {
    id: 8,
    title: "Monument funéraire en granit",
    slug: "monument-funeraire-granit",
    service: "marbrerie",
    description:
      "Réalisation d'un monument funéraire en granit poli, gravure personnalisée incluse.",
    location: "Pointe-Noire",
    realized_at: "2025-03-02",
    materials: ["Granit"],
    image: "project-monument",
    gallery: ["project-monument-1"],
    featured: false,
    status: "published",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Jean-Marc Loubaki",
    service: "marbrerie",
    message:
      "Travail impeccable pour notre cuisine en granit. L'équipe a respecté les délais et le résultat dépasse nos attentes.",
    rating: 5,
    status: "approved",
  },
  {
    id: 2,
    name: "Christelle Bemba",
    service: "menuiserie",
    message:
      "ENGOBO GROUP a réalisé notre dressing sur mesure avec un vrai souci du détail. Je recommande sans hésiter.",
    rating: 5,
    status: "approved",
  },
  {
    id: 3,
    name: "Patrick Ondongo",
    service: "ebenisterie",
    message:
      "Le mobilier de notre bureau a été fabriqué avec un savoir-faire remarquable. Un vrai travail d'artisan.",
    rating: 4,
    status: "approved",
  },
];

export const articles: Article[] = [
  {
    id: 1,
    title: "5 tendances en marbrerie pour vos intérieurs",
    slug: "5-tendances-marbrerie-interieurs",
    excerpt:
      "Découvrez les finitions et coloris de marbre les plus demandés cette année pour sublimer vos espaces.",
    content:
      "Le marbre reste une valeur sûre pour habiller intérieurs et extérieurs. Cette année, les teintes claires et les veinages marqués séduisent particulièrement nos clients à Pointe-Noire...",
    image: "article-marbre-tendances",
    author: "ENGOBO GROUP",
    category: { id: 1, name: "Conseils", slug: "conseils" },
    published_at: "2026-08-20",
    status: "published",
  },
  {
    id: 2,
    title: "Nouvelle réalisation : cuisine moderne en granit",
    slug: "nouvelle-realisation-cuisine-granit",
    excerpt:
      "Retour sur notre dernière réalisation, une cuisine entièrement habillée de granit noir absolu.",
    content:
      "Notre équipe vient de livrer une cuisine moderne alliant granit noir absolu et finitions bois laqué. Découvrez les étapes clés de ce projet...",
    image: "article-cuisine-granit",
    author: "ENGOBO GROUP",
    category: { id: 2, name: "Réalisations", slug: "realisations" },
    published_at: "2026-07-05",
    status: "published",
  },
  {
    id: 3,
    title: "Comment bien préparer votre demande de devis",
    slug: "comment-preparer-demande-devis",
    excerpt:
      "Quelques conseils simples pour nous transmettre toutes les informations utiles et accélérer votre projet.",
    content:
      "Pour vous accompagner au mieux, voici les informations à préparer avant de nous contacter : dimensions, matériaux souhaités, budget estimatif...",
    image: "article-devis-conseils",
    author: "ENGOBO GROUP",
    category: { id: 1, name: "Conseils", slug: "conseils" },
    published_at: "2026-06-12",
    status: "published",
  },
];

export const whyChooseUs = [
  {
    title: "Savoir-faire artisanal",
    description:
      "Des équipes expérimentées dans le travail du marbre, du bois et des matériaux importés.",
  },
  {
    title: "Réalisations sur mesure",
    description:
      "Chaque projet est pensé et fabriqué selon vos besoins exacts, du croquis à la pose.",
  },
  {
    title: "Matériaux sélectionnés",
    description:
      "Des matières premières importées et sélectionnées pour leur qualité et leur durabilité.",
  },
  {
    title: "Accompagnement complet",
    description:
      "Du devis à la livraison, un interlocuteur unique pour suivre votre projet.",
  },
];

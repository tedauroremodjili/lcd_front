// Conversation engine for the site assistant. Pure functions only (no React):
// intent detection tolerant to typos/accents, page-aware suggestions, and the
// step-by-step quote collection. Data (products, projects) is fetched by the
// component through lib/api.ts and turned into cards here.

import type {
  ChatbotButton,
  ChatbotConfig,
  CompanySettings,
  Product,
  Project,
  QuoteServiceOption,
  Service,
} from "./types";
import { formatPrice, serviceLabels, whatsappLink } from "./utils";

export type Chip = { label: string; send?: string; href?: string };
export type BotCard = { title: string; subtitle?: string; image?: string; href: string };
export type BotAction = "start-quote" | "search-products" | "search-projects";
export type BotReply = {
  text: string;
  chips?: Chip[];
  cards?: BotCard[];
  action?: BotAction;
  query?: string;
  service?: QuoteServiceOption;
};

export type ChatContext = {
  settings: CompanySettings;
  services: Service[];
  pathname: string;
  /** Content edited in the back-office (null = API unreachable, built-in defaults are used). */
  config?: ChatbotConfig | null;
};

// ---------------------------------------------------------------------------
// Text utilities
// ---------------------------------------------------------------------------

export function normalize(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function levenshtein(a: string, b: string) {
  if (Math.abs(a.length - b.length) > 1) return 2;
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = tmp;
    }
  }
  return row[b.length];
}

function tokenScore(token: string, keyword: string) {
  if (token === keyword) return 1;
  if (keyword.length >= 5 && token.length >= 4) {
    if (keyword.startsWith(token) || token.startsWith(keyword)) return 0.8;
    if (levenshtein(token, keyword) <= 1) return 0.7;
  }
  return 0;
}

function score(text: string, tokens: string[], words: string[], phrases: string[] = []) {
  let total = 0;
  for (const phrase of phrases) if (text.includes(phrase)) total += 2;
  for (const word of words) {
    let best = 0;
    for (const token of tokens) best = Math.max(best, tokenScore(token, word));
    total += best;
  }
  return total;
}

const STOP_WORDS = new Set(
  (
    "je tu il elle nous vous ils elles on le la les un une des du de d l en au aux et ou a " +
    "ce cet cette ces mon ma mes votre vos notre nos que qui quoi quel quelle pour par avec sans " +
    "sur dans est sont suis etes avez avons veux voudrais souhaite cherche chercher voir montre montrez " +
    "afficher donne donnez besoin y il ya svp stp s il plait bonjour salut hello produit produits " +
    "article articles catalogue prix realisation realisations projet projets exemple exemples photo photos"
  ).split(" ")
);

export function extractQuery(text: string) {
  return normalize(text)
    .split(" ")
    .filter((t) => t.length >= 3 && !STOP_WORDS.has(t))
    .join(" ");
}

// ---------------------------------------------------------------------------
// Intents
// ---------------------------------------------------------------------------

type IntentId =
  | "greeting" | "thanks" | "bye" | "services" | "products" | "projects" | "quote"
  | "price" | "contact" | "address" | "hours" | "human" | "delay" | "about" | "news" | "help";

const INTENTS: { id: IntentId; words: string[]; phrases?: string[] }[] = [
  { id: "greeting", words: ["bonjour", "bonsoir", "salut", "hello", "hey", "coucou", "slt", "bjr"] },
  { id: "thanks", words: ["merci", "thanks", "parfait", "genial", "super", "top", "nickel"] },
  { id: "bye", words: ["aurevoir", "bye", "ciao"], phrases: ["a bientot", "bonne journee", "bonne soiree"] },
  { id: "services", words: ["service", "services", "activite", "activites", "domaine", "domaines", "metier", "metiers", "proposez"], phrases: ["que faites vous", "vous faites quoi", "que proposez vous"] },
  { id: "products", words: ["produit", "produits", "catalogue", "stock", "disponible", "disponibilite", "reference", "vendez", "vendre"], phrases: ["avez vous", "vous vendez"] },
  { id: "projects", words: ["realisation", "realisations", "projet", "projets", "portfolio", "exemple", "exemples", "chantier", "chantiers", "galerie", "photos"] },
  { id: "quote", words: ["devis", "estimation", "commander", "commande"], phrases: ["faire un devis", "demande de devis", "obtenir un devis", "un devis", "je veux commander"] },
  { id: "price", words: ["prix", "cout", "combien", "budget", "cher", "tarif", "tarifs"] },
  { id: "contact", words: ["contact", "contacter", "telephone", "tel", "numero", "appeler", "appel", "mail", "email", "joindre"], phrases: ["votre numero", "vous joindre", "vous contacter"] },
  { id: "address", words: ["adresse", "localisation", "situe", "situee", "trouve", "trouver", "venir", "maps"], phrases: ["ou etes vous", "ou se trouve", "ou est votre", "vous etes ou", "pointe noire"] },
  { id: "hours", words: ["horaire", "horaires", "ouvert", "ouverts", "ouverture", "ferme", "fermeture", "heures"], phrases: ["quand etes vous ouvert"] },
  { id: "human", words: ["whatsapp", "conseiller", "humain", "agent", "commercial", "responsable", "quelqu"], phrases: ["parler a quelqu un", "parler a un conseiller", "une vraie personne"] },
  { id: "delay", words: ["delai", "delais", "duree", "livraison", "livrer", "longtemps"], phrases: ["combien de temps", "sous combien"] },
  { id: "about", words: ["entreprise", "societe", "histoire", "equipe", "propos"], phrases: ["qui etes vous", "a propos"] },
  { id: "news", words: ["actualite", "actualites", "news", "blog", "nouveaute", "nouveautes"] },
  { id: "help", words: ["aide", "aider", "help", "assistance", "question", "questions"] },
];

const SERVICE_WORDS: { slug: string; option: QuoteServiceOption; words: string[] }[] = [
  { slug: "importation", option: "importation", words: ["importation", "import", "importer", "container", "conteneur"] },
  { slug: "marbrerie", option: "marbrerie", words: ["marbre", "marbrerie", "granit", "granite", "pierre", "dalle", "comptoir", "escalier", "tombale", "monument", "funeraire"] },
  { slug: "ebenisterie", option: "ebenisterie", words: ["ebenisterie", "ebeniste", "mobilier", "meuble", "meubles", "table", "armoire", "bureau", "commode"] },
  { slug: "menuiserie", option: "menuiserie", words: ["menuiserie", "menuisier", "porte", "portes", "fenetre", "fenetres", "cuisine", "dressing", "placard", "portail"] },
  { slug: "commerce-general", option: "commerce-general", words: ["commerce", "ciment", "materiaux", "quincaillerie", "vente"] },
];

function detectService(text: string, tokens: string[]) {
  let best: (typeof SERVICE_WORDS)[number] | null = null;
  let bestScore = 0;
  for (const entry of SERVICE_WORDS) {
    const s = score(text, tokens, entry.words);
    if (s > bestScore) {
      best = entry;
      bestScore = s;
    }
  }
  return bestScore >= 0.7 ? best : null;
}

// ---------------------------------------------------------------------------
// Cards / chips helpers
// ---------------------------------------------------------------------------

const serviceCard = (s: Service): BotCard => ({
  title: s.name,
  subtitle: s.short_description,
  image: s.image,
  href: `/services/${s.slug}`,
});

export const productCards = (products: Product[]): BotCard[] =>
  products.slice(0, 6).map((p) => ({
    title: p.name,
    subtitle: `${p.category.name} · ${p.price_type === "on_quote" || p.price == null ? "Sur devis" : formatPrice(p.price)}`,
    image: p.image,
    href: `/produits/${p.slug}`,
  }));

export const projectCards = (projects: Project[]): BotCard[] =>
  projects.slice(0, 6).map((p) => ({
    title: p.title,
    subtitle: serviceLabels[p.service] ?? "Réalisation",
    image: p.image,
    href: `/realisations/${p.slug}`,
  }));

const mainMenu: Chip[] = [
  { label: "Nos services", send: "Quels sont vos services ?" },
  { label: "Voir les produits", send: "Voir les produits" },
  { label: "Nos réalisations", send: "Voir vos réalisations" },
  { label: "Demander un devis", send: "Je veux un devis" },
  { label: "Parler à un conseiller", send: "Parler à un conseiller" },
];

function salutation() {
  return new Date().getHours() >= 18 ? "Bonsoir" : "Bonjour";
}

export function whatsappChip(ctx: ChatContext, message: string, label = "Discuter sur WhatsApp"): Chip {
  return { label, href: whatsappLink(ctx.settings.whatsapp, message) };
}

// ---------------------------------------------------------------------------
// Back-office content (chatbot_entries) helpers
// ---------------------------------------------------------------------------

/** "/produits" matches the list and its sub-pages; "/produits/" only sub-pages; "/" only home. */
function pageMatches(pathname: string, page: string) {
  if (page === "/") return pathname === "/";
  return pathname === page || pathname.startsWith(page.endsWith("/") ? page : `${page}/`);
}

/** Most specific page (longest match) that has entries for the current path. */
function bestPage(entries: { page?: string | null }[], pathname: string) {
  return entries
    .map((e) => e.page)
    .filter((p): p is string => !!p && pageMatches(pathname, p))
    .sort((a, b) => b.length - a.length)[0];
}

function chipsFrom(buttons: ChatbotButton[] = []): Chip[] {
  return buttons.map((b) => (b.url ? { label: b.label, href: b.url } : { label: b.label, send: b.message ?? b.label }));
}

const fill = (text: string) => text.replaceAll("{salutation}", salutation());

/** Main menu buttons: page-specific set if any, else the general set, else built-in defaults. */
function menuChips(ctx: ChatContext): Chip[] {
  const quick = ctx.config?.quick_replies ?? [];
  const page = bestPage(quick, ctx.pathname);
  const chosen = quick.filter((q) => (page ? q.page === page : !q.page));
  return chosen.length
    ? chosen.map((q) => (q.url ? { label: q.label, href: q.url } : { label: q.label, send: q.message ?? q.label }))
    : mainMenu;
}

export function nudgeFor(ctx: ChatContext): string {
  const nudges = ctx.config?.nudges ?? [];
  const page = bestPage(nudges, ctx.pathname);
  const chosen = nudges.find((n) => (page ? n.page === page : !n.page));
  if (chosen) return fill(chosen.text);

  if (ctx.pathname.startsWith("/produits")) return "Une question sur un produit ? Je peux vous aider.";
  if (ctx.pathname.startsWith("/devis")) return "Je peux remplir votre devis avec vous, en 1 minute.";
  return "Un projet en tête ? Je réponds à vos questions et prépare votre devis.";
}

function matchFaq(tokens: string[], config?: ChatbotConfig | null) {
  let best: ChatbotConfig["faq"][number] | null = null;
  let bestScore = 0;
  for (const entry of config?.faq ?? []) {
    let s = 0;
    for (const keyword of entry.keywords) {
      const parts = normalize(keyword).split(" ").filter(Boolean);
      if (parts.length && parts.every((p) => tokens.some((t) => tokenScore(t, p) >= 0.7))) s += parts.length + 0.5;
    }
    if (s > bestScore) {
      best = entry;
      bestScore = s;
    }
  }
  return best;
}

// ---------------------------------------------------------------------------
// Greeting (page-aware)
// ---------------------------------------------------------------------------

export function openingMessages(ctx: ChatContext): BotReply[] {
  const welcome = ctx.config?.welcome ?? [];
  if (welcome.length === 0) return defaultOpening(ctx);

  const page = bestPage(welcome, ctx.pathname);
  const messages: BotReply[] = welcome
    .filter((w) => !w.page || w.page === page)
    .map((w) => ({ text: fill(w.text), chips: chipsFrom(w.buttons) }));

  const last = messages[messages.length - 1];
  last.chips = [...(last.chips ?? []), ...menuChips(ctx)];
  return messages;
}

function defaultOpening(ctx: ChatContext): BotReply[] {
  const { pathname, services } = ctx;
  const hello: BotReply = {
    text: `${salutation()} ! Je suis l'assistant virtuel d'**ENGOBO GROUP**. Je peux vous renseigner sur nos services, vous montrer nos produits et réalisations, ou préparer votre demande de devis.`,
  };

  let follow: BotReply = { text: "Que souhaitez-vous faire ?", chips: mainMenu };

  const serviceSlug = pathname.match(/^\/services\/([^/]+)/)?.[1];
  const currentService = services.find((s) => s.slug === serviceSlug);

  if (pathname.startsWith("/produits/")) {
    follow = {
      text: "Ce produit vous intéresse ? Je peux vous obtenir un prix ou préparer un devis en 1 minute.",
      chips: [
        { label: "Demander un devis", send: "Je veux un devis" },
        { label: "Voir d'autres produits", send: "Voir les produits" },
        { label: "Parler à un conseiller", send: "Parler à un conseiller" },
      ],
    };
  } else if (pathname.startsWith("/produits")) {
    follow = {
      text: "Dites-moi ce que vous cherchez (marbre, porte, carrelage…) et je vous montre les produits correspondants.",
      chips: [
        { label: "Marbre", send: "produits marbre" },
        { label: "Granit", send: "produits granit" },
        { label: "Bois", send: "produits bois" },
        { label: "Carrelage", send: "produits carrelage" },
        { label: "Demander un devis", send: "Je veux un devis" },
      ],
    };
  } else if (currentService) {
    follow = {
      text: `Vous consultez notre activité **${currentService.name}**. Je peux vous détailler les prestations ou lancer un devis.`,
      chips: [
        { label: `Devis ${currentService.name}`, send: `Je veux un devis ${currentService.name}` },
        { label: "Voir les réalisations", send: `réalisations ${currentService.name}` },
        { label: "Autres services", send: "Quels sont vos services ?" },
      ],
    };
  } else if (pathname.startsWith("/devis")) {
    follow = {
      text: "Je peux remplir votre demande de devis avec vous, question par question.",
      chips: [
        { label: "Commencer mon devis", send: "Je veux un devis" },
        { label: "Voir les tarifs", send: "Quels sont vos prix ?" },
      ],
    };
  } else if (pathname.startsWith("/contact")) {
    follow = {
      text: "Besoin de nous joindre rapidement ?",
      chips: [
        { label: "Nos coordonnées", send: "Vos coordonnées" },
        { label: "Horaires", send: "Vos horaires" },
        { label: "Parler à un conseiller", send: "Parler à un conseiller" },
      ],
    };
  }

  return [hello, follow];
}

// ---------------------------------------------------------------------------
// Reply generation
// ---------------------------------------------------------------------------

export type RespondResult = { reply: BotReply; fallback: boolean };

export function respond(input: string, ctx: ChatContext): RespondResult {
  const { settings, services } = ctx;
  const text = normalize(input);
  const tokens = text.split(" ").filter(Boolean);
  const service = detectService(text, tokens);

  // Answers written in the back-office take priority over the built-in intents.
  const faq = matchFaq(tokens, ctx.config);
  if (faq) {
    return { reply: { text: fill(faq.answer), chips: chipsFrom(faq.buttons) }, fallback: false };
  }

  const scored = INTENTS.map((i) => ({ id: i.id, s: score(text, tokens, i.words, i.phrases) }))
    .filter((i) => i.s >= 0.7)
    .sort((a, b) => b.s - a.s);
  const top = scored[0]?.id;
  const has = (id: IntentId) => scored.some((i) => i.id === id);

  // Composite intents first: quote / products / projects carry the service along.
  if (has("quote")) {
    return { reply: { text: "", action: "start-quote", service: service?.option }, fallback: false };
  }
  if (has("products")) {
    return {
      reply: {
        text: "",
        action: "search-products",
        query: extractQuery(input) || service?.words[0] || "",
      },
      fallback: false,
    };
  }
  if (has("projects")) {
    return {
      reply: { text: "", action: "search-projects", service: service?.option },
      fallback: false,
    };
  }

  if (top === "human") {
    return {
      reply: {
        text: "Bien sûr, un conseiller ENGOBO GROUP peut vous répondre directement. Cliquez ci-dessous pour ouvrir la conversation WhatsApp.",
        chips: [
          whatsappChip(ctx, "Bonjour ENGOBO GROUP, je souhaite parler à un conseiller."),
          { label: `Appeler ${settings.phone_1}`, href: `tel:${settings.phone_1}` },
        ],
      },
      fallback: false,
    };
  }

  const generic: IntentId[] = ["contact", "address", "hours", "services", "thanks", "bye", "greeting", "about", "news"];
  if (service && !scored.some((i) => generic.includes(i.id) && i.s >= 1)) {
    const match = services.find((s) => s.slug === service.slug);
    const label = match?.name ?? serviceLabels[service.slug];
    const list = (match?.prestations ?? []).slice(0, 5).map((p) => `• ${p}`).join("\n");
    return {
      reply: {
        text: `${has("price") ? "Ce type d'ouvrage est chiffré **sur devis** (dimensions, matériaux, finitions), gratuitement.\n\n" : ""}**${label}**${match ? ` — ${match.short_description}` : ""}${list ? `\n\nParmi nos prestations :\n${list}` : ""}`,
        cards: match ? [serviceCard(match)] : undefined,
        chips: [
          { label: `Devis ${label}`, send: `Je veux un devis ${label}` },
          { label: "Voir les réalisations", send: `réalisations ${label}` },
          { label: "Voir les produits", send: `produits ${label}` },
        ],
      },
      fallback: false,
    };
  }

  switch (top) {
    case "greeting":
      return { reply: { text: `${salutation()} ! Comment puis-je vous aider ?`, chips: menuChips(ctx) }, fallback: false };
    case "thanks":
      return {
        reply: {
          text: "Avec plaisir ! N'hésitez pas si vous avez d'autres questions.",
          chips: [{ label: "Demander un devis", send: "Je veux un devis" }, { label: "Autre question", send: "Aide" }],
        },
        fallback: false,
      };
    case "bye":
      return { reply: { text: "Merci de votre visite et à très bientôt chez ENGOBO GROUP !" }, fallback: false };
    case "services":
      return {
        reply: {
          text: `ENGOBO GROUP intervient dans **${services.length || 5} domaines** :\n${(services.length ? services.map((s) => s.name) : Object.values(serviceLabels).slice(0, 5)).map((n) => `• ${n}`).join("\n")}`,
          cards: services.map(serviceCard),
          chips: [{ label: "Demander un devis", send: "Je veux un devis" }, { label: "Voir les produits", send: "Voir les produits" }],
        },
        fallback: false,
      };
    case "price":
      return {
        reply: {
          text: "Nos prix dépendent des dimensions, des matériaux et des finitions : la plupart de nos ouvrages sont réalisés **sur devis**, gratuit et sans engagement. Certains produits du catalogue affichent un prix fixe.",
          chips: [{ label: "Demander un devis", send: "Je veux un devis" }, { label: "Voir les produits", send: "Voir les produits" }],
        },
        fallback: false,
      };
    case "contact":
      return {
        reply: {
          text: `Voici comment nous joindre :\n• Téléphone : **${settings.phone_1}**${settings.phone_2 ? ` / **${settings.phone_2}**` : ""}\n• Email : **${settings.email}**\n• ${settings.hours_weekdays}`,
          chips: [
            { label: "Appeler", href: `tel:${settings.phone_1}` },
            whatsappChip(ctx, "Bonjour ENGOBO GROUP, je souhaite obtenir des informations."),
            { label: "Page contact", href: "/contact" },
          ],
        },
        fallback: false,
      };
    case "address":
      return {
        reply: {
          text: `Nous sommes situés : **${settings.address}, ${settings.city}**.\n${settings.hours_weekdays} — ${settings.hours_weekend}.`,
          chips: [{ label: "Page contact", href: "/contact" }, { label: "Horaires", send: "Vos horaires" }],
        },
        fallback: false,
      };
    case "hours":
      return {
        reply: {
          text: `Nos horaires :\n• ${settings.hours_weekdays}\n• ${settings.hours_weekend}`,
          chips: [{ label: "Nous contacter", send: "Vos coordonnées" }, { label: "Demander un devis", send: "Je veux un devis" }],
        },
        fallback: false,
      };
    case "delay":
      return {
        reply: {
          text: "Les délais varient selon le projet : quelques jours pour un produit en stock, plusieurs semaines pour un ouvrage sur mesure (marbre, menuiserie, mobilier). Le délai précis est confirmé dans votre devis.",
          chips: [{ label: "Demander un devis", send: "Je veux un devis" }, { label: "Parler à un conseiller", send: "Parler à un conseiller" }],
        },
        fallback: false,
      };
    case "about":
      return {
        reply: {
          text: `${settings.description}`,
          chips: [{ label: "En savoir plus", href: "/a-propos" }, { label: "Nos réalisations", send: "Voir vos réalisations" }],
        },
        fallback: false,
      };
    case "news":
      return {
        reply: { text: "Retrouvez nos dernières nouvelles, réalisations et conseils dans la rubrique actualités.", chips: [{ label: "Voir les actualités", href: "/actualites" }] },
        fallback: false,
      };
    case "help":
      return { reply: { text: "Voici ce que je peux faire pour vous :", chips: menuChips(ctx) }, fallback: false };
  }

  // Unknown: try a catalogue search on the meaningful words, else guide the user.
  const query = extractQuery(input);
  if (query) {
    return { reply: { text: "", action: "search-products", query }, fallback: true };
  }
  return { reply: fallbackReply(ctx), fallback: true };
}

export function fallbackReply(ctx: ChatContext, misses = 1): BotReply {
  const chips = menuChips(ctx);
  if (misses >= 2) {
    return {
      text: "Je n'arrive pas à bien cerner votre demande. Le plus simple : un conseiller peut vous répondre directement.",
      chips: [whatsappChip(ctx, "Bonjour ENGOBO GROUP, j'ai une question."), { label: `Appeler ${ctx.settings.phone_1}`, href: `tel:${ctx.settings.phone_1}` }, ...chips.slice(0, 3)],
    };
  }
  const custom = ctx.config?.fallback;
  return {
    text: custom ? fill(custom.text) : "Je n'ai pas bien compris, mais voici ce que je peux faire :",
    chips: [...chipsFrom(custom?.buttons), ...chips],
  };
}

// ---------------------------------------------------------------------------
// Quote collection flow
// ---------------------------------------------------------------------------

export type QuoteStep = "name" | "phone" | "service" | "description" | "confirm";
export type QuoteData = {
  name?: string;
  phone?: string;
  service?: QuoteServiceOption;
  description?: string;
};

const serviceChips: Chip[] = [
  { label: "Importation", send: "importation" },
  { label: "Marbrerie", send: "marbrerie" },
  { label: "Ébénisterie", send: "ebenisterie" },
  { label: "Menuiserie", send: "menuiserie" },
  { label: "Commerce général", send: "commerce general" },
  { label: "Autre", send: "autre" },
];

const cancelChip: Chip = { label: "Annuler", send: "annuler" };

export function startQuote(service?: QuoteServiceOption): { step: QuoteStep; data: QuoteData; reply: BotReply } {
  return {
    step: "name",
    data: { service },
    reply: {
      text: "Avec plaisir ! Je vais préparer votre demande de devis en quelques questions (gratuit et sans engagement).\n\nQuel est votre **nom complet** ?",
      chips: [cancelChip],
    },
  };
}

function serviceFromText(input: string): QuoteServiceOption {
  const text = normalize(input);
  const tokens = text.split(" ");
  return detectService(text, tokens)?.option ?? "autre";
}

function summary(data: QuoteData) {
  return `• Nom : **${data.name}**\n• Téléphone : **${data.phone}**\n• Service : **${serviceLabels[data.service ?? "autre"]}**\n• Projet : ${data.description}`;
}

export type QuoteAdvance =
  | { kind: "next"; step: QuoteStep; data: QuoteData; reply: BotReply }
  | { kind: "submit"; data: QuoteData }
  | { kind: "cancel"; reply: BotReply };

export function advanceQuote(step: QuoteStep, data: QuoteData, input: string, ctx: ChatContext): QuoteAdvance {
  const raw = input.trim();
  const text = normalize(raw);

  if (/^(annuler|stop|quitter|laisse|laisser|non merci|abandon)/.test(text)) {
    return {
      kind: "cancel",
      reply: { text: "D'accord, j'ai annulé la demande. Je reste disponible si besoin.", chips: menuChips(ctx) },
    };
  }

  switch (step) {
    case "name": {
      if (raw.length < 2) return { kind: "next", step, data, reply: { text: "Pouvez-vous me donner votre nom complet ?", chips: [cancelChip] } };
      const name = raw.replace(/^(je m appelle|je suis|mon nom est|c est)\s+/i, "").trim();
      return {
        kind: "next",
        step: "phone",
        data: { ...data, name },
        reply: { text: `Enchanté ${name.split(" ")[0]} ! Quel est votre **numéro de téléphone** (pour vous rappeler) ?`, chips: [cancelChip] },
      };
    }
    case "phone": {
      const digits = raw.replace(/\D/g, "");
      if (digits.length < 8) {
        return { kind: "next", step, data, reply: { text: "Ce numéro me semble incomplet. Pouvez-vous le saisir à nouveau (au moins 8 chiffres) ?", chips: [cancelChip] } };
      }
      if (data.service) {
        return {
          kind: "next",
          step: "description",
          data: { ...data, phone: raw },
          reply: { text: `Parfait. Pour le service **${serviceLabels[data.service]}**, décrivez-moi votre projet (dimensions, matériaux, lieu, délai souhaité…).`, chips: [cancelChip] },
        };
      }
      return {
        kind: "next",
        step: "service",
        data: { ...data, phone: raw },
        reply: { text: "Merci ! Quel type de service vous intéresse ?", chips: [...serviceChips, cancelChip] },
      };
    }
    case "service": {
      const service = serviceFromText(raw);
      return {
        kind: "next",
        step: "description",
        data: { ...data, service },
        reply: { text: `Noté : **${serviceLabels[service]}**. Décrivez-moi maintenant votre projet (dimensions, matériaux, lieu, délai souhaité…).`, chips: [cancelChip] },
      };
    }
    case "description": {
      if (raw.length < 10) {
        return { kind: "next", step, data, reply: { text: "Pouvez-vous m'en dire un peu plus sur votre projet (au moins une phrase) ?", chips: [cancelChip] } };
      }
      const next = { ...data, description: raw };
      return {
        kind: "next",
        step: "confirm",
        data: next,
        reply: {
          text: `Voici le récapitulatif de votre demande :\n${summary(next)}\n\nJe l'envoie à notre équipe ?`,
          chips: [{ label: "Envoyer ma demande", send: "oui" }, { label: "Recommencer", send: "recommencer" }, cancelChip],
        },
      };
    }
    case "confirm": {
      if (/^(oui|ok|envoy|confirm|valid|d accord|yes|go)/.test(text)) return { kind: "submit", data };
      if (/^(recommenc|modif|non|corrig)/.test(text)) {
        const restart = startQuote(data.service);
        return { kind: "next", step: restart.step, data: { service: data.service }, reply: restart.reply };
      }
      return {
        kind: "next",
        step,
        data,
        reply: { text: "Souhaitez-vous que j'envoie cette demande ?", chips: [{ label: "Envoyer ma demande", send: "oui" }, { label: "Recommencer", send: "recommencer" }, cancelChip] },
      };
    }
  }
}

export function quoteSuccessReply(data: QuoteData, ctx: ChatContext): BotReply {
  return {
    text: `Merci ${data.name?.split(" ")[0]} ! Votre demande a bien été enregistrée. Notre équipe vous contactera très prochainement au **${data.phone}**.`,
    chips: [
      whatsappChip(ctx, `Bonjour ENGOBO GROUP, je viens d'envoyer une demande de devis (${serviceLabels[data.service ?? "autre"]}). Nom : ${data.name}.`, "Accélérer via WhatsApp"),
      { label: "Voir nos réalisations", send: "Voir vos réalisations" },
    ],
  };
}

export function quoteErrorReply(data: QuoteData, ctx: ChatContext): BotReply {
  return {
    text: "Désolé, l'envoi a rencontré un problème. Vous pouvez réessayer ou transmettre votre demande directement à un conseiller.",
    chips: [
      { label: "Réessayer", send: "oui" },
      whatsappChip(ctx, `Bonjour ENGOBO GROUP, je souhaite un devis (${serviceLabels[data.service ?? "autre"]}). ${data.description ?? ""} — ${data.name}, ${data.phone}`),
    ],
  };
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat("fr-FR").format(value) + " FCFA";
}

export function whatsappLink(phone: string, message: string) {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

/** Returns the URL only if it is a real web address (http/https); blocks « javascript: », « data: »… */
export function safeUrl(value?: string | null): string | null {
  if (!value) return null;
  try {
    const url = new URL(value.trim());
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : null;
  } catch {
    return null;
  }
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export const serviceLabels: Record<string, string> = {
  importation: "Importation",
  marbrerie: "Marbrerie",
  ebenisterie: "Ébénisterie",
  menuiserie: "Menuiserie",
  "commerce-general": "Commerce général",
  autre: "Autre",
};

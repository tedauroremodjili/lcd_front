export function formatPrice(value: number) {
  return new Intl.NumberFormat("fr-FR").format(value) + " FCFA";
}

export function whatsappLink(phone: string, message: string) {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
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

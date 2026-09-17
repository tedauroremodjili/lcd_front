"use client";

import { FormEvent, useState } from "react";
import Button from "@/components/ui/Button";
import { submitQuoteRequest } from "@/lib/api";
import type { QuoteServiceOption } from "@/lib/types";

const serviceOptions: { value: QuoteServiceOption; label: string }[] = [
  { value: "importation", label: "Importation" },
  { value: "marbrerie", label: "Marbrerie" },
  { value: "ebenisterie", label: "Ébénisterie" },
  { value: "menuiserie", label: "Menuiserie" },
  { value: "commerce-general", label: "Commerce général" },
  { value: "autre", label: "Autre" },
];

const inputClasses =
  "w-full rounded-lg border border-navy/15 bg-white px-4 py-3 text-sm text-navy placeholder:text-charcoal/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30";
const labelClasses = "mb-2 block text-sm font-semibold text-navy";

export default function QuoteForm({
  defaultService,
  defaultDescription,
}: {
  defaultService?: string;
  defaultDescription?: string;
}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = new FormData(e.currentTarget);
    await submitQuoteRequest({
      full_name: String(form.get("full_name") ?? ""),
      phone: String(form.get("phone") ?? ""),
      email: (form.get("email") as string) || undefined,
      company: (form.get("company") as string) || undefined,
      service: form.get("service") as QuoteServiceOption,
      project_type: (form.get("project_type") as string) || undefined,
      description: String(form.get("description") ?? ""),
      budget: (form.get("budget") as string) || undefined,
      desired_date: (form.get("desired_date") as string) || undefined,
    });

    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-gold/30 bg-gold/10 p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-navy">
          <svg width="24" height="24" viewBox="0 0 20 20" fill="none">
            <path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="font-serif-display text-xl font-bold text-navy">
          Demande envoyée
        </h3>
        <p className="mt-2 text-sm text-charcoal/70">
          Votre demande de devis a bien été enregistrée. Notre équipe vous contactera
          prochainement.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 sm:grid-cols-2">
      <div>
        <label htmlFor="full_name" className={labelClasses}>
          Nom complet *
        </label>
        <input id="full_name" name="full_name" required className={inputClasses} />
      </div>
      <div>
        <label htmlFor="phone" className={labelClasses}>
          Téléphone *
        </label>
        <input id="phone" name="phone" type="tel" required className={inputClasses} />
      </div>
      <div>
        <label htmlFor="email" className={labelClasses}>
          Email
        </label>
        <input id="email" name="email" type="email" className={inputClasses} />
      </div>
      <div>
        <label htmlFor="company" className={labelClasses}>
          Entreprise
        </label>
        <input id="company" name="company" className={inputClasses} />
      </div>
      <div>
        <label htmlFor="service" className={labelClasses}>
          Service *
        </label>
        <select
          id="service"
          name="service"
          required
          defaultValue={defaultService ?? ""}
          className={inputClasses}
        >
          <option value="" disabled>
            Sélectionnez un service
          </option>
          {serviceOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="project_type" className={labelClasses}>
          Type de projet
        </label>
        <input
          id="project_type"
          name="project_type"
          placeholder="Ex : cuisine, dressing, façade..."
          className={inputClasses}
        />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="description" className={labelClasses}>
          Description du projet *
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={5}
          defaultValue={defaultDescription}
          className={inputClasses}
        />
      </div>
      <div>
        <label htmlFor="budget" className={labelClasses}>
          Budget estimatif
        </label>
        <input id="budget" name="budget" placeholder="Optionnel" className={inputClasses} />
      </div>
      <div>
        <label htmlFor="desired_date" className={labelClasses}>
          Date souhaitée
        </label>
        <input id="desired_date" name="desired_date" type="date" className={inputClasses} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="attachments" className={labelClasses}>
          Pièces jointes
        </label>
        <input
          id="attachments"
          name="attachments"
          type="file"
          multiple
          accept="image/png,image/jpeg,image/webp,application/pdf"
          className="w-full rounded-lg border border-dashed border-navy/25 bg-offwhite px-4 py-6 text-sm text-charcoal/60 file:mr-4 file:rounded-full file:border-0 file:bg-navy file:px-4 file:py-2 file:text-xs file:font-semibold file:text-white"
        />
      </div>

      <div className="sm:col-span-2">
        <Button type="submit" variant="primary" className="w-full" disabled={status === "submitting"}>
          {status === "submitting" ? "Envoi en cours..." : "Envoyer ma demande"}
        </Button>
      </div>
    </form>
  );
}

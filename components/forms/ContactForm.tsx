"use client";

import { FormEvent, useState } from "react";
import Button from "@/components/ui/Button";
import { submitContactMessage } from "@/lib/api";

const inputClasses =
  "w-full rounded-lg border border-navy/15 bg-white px-4 py-3 text-sm text-navy placeholder:text-charcoal/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30";
const labelClasses = "mb-2 block text-sm font-semibold text-navy";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = new FormData(e.currentTarget);
    await submitContactMessage({
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: (form.get("phone") as string) || undefined,
      subject: String(form.get("subject") ?? ""),
      message: String(form.get("message") ?? ""),
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
          Message envoyé
        </h3>
        <p className="mt-2 text-sm text-charcoal/70">
          Merci de nous avoir contactés. Nous répondrons à votre message dans les meilleurs
          délais.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 sm:grid-cols-2">
      <div>
        <label htmlFor="name" className={labelClasses}>
          Nom complet *
        </label>
        <input id="name" name="name" required className={inputClasses} />
      </div>
      <div>
        <label htmlFor="email" className={labelClasses}>
          Email *
        </label>
        <input id="email" name="email" type="email" required className={inputClasses} />
      </div>
      <div>
        <label htmlFor="phone" className={labelClasses}>
          Téléphone
        </label>
        <input id="phone" name="phone" type="tel" className={inputClasses} />
      </div>
      <div>
        <label htmlFor="subject" className={labelClasses}>
          Sujet *
        </label>
        <input id="subject" name="subject" required className={inputClasses} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="message" className={labelClasses}>
          Message *
        </label>
        <textarea id="message" name="message" required rows={5} className={inputClasses} />
      </div>
      <div className="sm:col-span-2">
        <Button type="submit" variant="primary" className="w-full" disabled={status === "submitting"}>
          {status === "submitting" ? "Envoi en cours..." : "Envoyer le message"}
        </Button>
      </div>
    </form>
  );
}

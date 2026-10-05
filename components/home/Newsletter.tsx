"use client";

import Reveal from "@/components/ui/Reveal";

import { FormEvent, useState } from "react";
import Container from "@/components/ui/Container";
import { submitNewsletterSignup } from "@/lib/api";

export default function Newsletter({
  title,
  text,
  button,
}: {
  title: string;
  text: string;
  button: string;
}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = new FormData(e.currentTarget);
    await submitNewsletterSignup(String(form.get("email") ?? ""));
    setStatus("success");
  }

  return (
    <section className="bg-surface py-16">
      <Container>
        <Reveal direction="zoom" className="flex flex-col items-center justify-between gap-8 rounded-2xl border border-subtle/10 bg-surface-alt p-8 sm:p-10 lg:flex-row">
          <div className="max-w-lg text-center lg:text-left">
            <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-gold-dark">
              Newsletter
            </span>
            <h2 className="font-serif-display text-2xl font-bold text-heading sm:text-3xl">
              {title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-body/70">
              {text}
            </p>
          </div>

          <div className="w-full max-w-md">
            {status === "success" ? (
              <p className="flex items-center gap-3 rounded-full bg-gold/15 px-6 py-4 text-sm font-medium text-gold-dark">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="shrink-0">
                  <path
                    d="M4 10l4 4 8-8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Merci ! Votre inscription a bien été enregistrée.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
                <label htmlFor="newsletter-email" className="sr-only">
                  Adresse email
                </label>
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  required
                  placeholder="Votre adresse email"
                  className="w-full flex-1 rounded-full border border-subtle/15 bg-surface px-5 py-3.5 text-sm text-heading placeholder:text-body/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
                />
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex shrink-0 items-center justify-center rounded-full bg-gold px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-navy transition-colors hover:bg-gold-light disabled:opacity-50"
                >
                  {status === "submitting" ? "Envoi..." : button}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

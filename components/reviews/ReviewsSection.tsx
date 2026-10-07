"use client";

import { FormEvent, useState } from "react";
import Container from "@/components/ui/Container";
import { submitReview } from "@/lib/api";
import type { ReviewsPayload } from "@/lib/types";
import { formatDate } from "@/lib/utils";

type Target = { service_slug: string } | { product_slug: string };

function Stars({ value, size = 16 }: { value: number; size?: number }) {
  return (
    <span className="flex gap-0.5 text-gold" aria-label={`${value} sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 20 20" fill={i < value ? "currentColor" : "none"} stroke="currentColor" aria-hidden="true">
          <path strokeWidth="1.2" d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5Z" />
        </svg>
      ))}
    </span>
  );
}

export default function ReviewsSection({
  target,
  initial,
  title = "Avis clients",
}: {
  target: Target;
  initial: ReviewsPayload;
  title?: string;
}) {
  const [rating, setRating] = useState(0);
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!rating) {
      setStatus("error");
      setMessage("Merci de choisir une note.");
      return;
    }
    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    setStatus("submitting");
    try {
      await submitReview({
        ...target,
        name: String(form.get("name") ?? ""),
        email: String(form.get("email") ?? "") || undefined,
        rating,
        comment: String(form.get("comment") ?? ""),
      });
      setStatus("done");
      setMessage("Merci pour votre avis ! Il sera publié après validation.");
      formEl.reset();
      setRating(0);
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Une erreur est survenue.");
    }
  }

  const inputClass =
    "w-full rounded-xl border border-subtle/15 bg-surface px-4 py-3 text-sm text-heading placeholder:text-body/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30";

  return (
    <section className="bg-tint py-16 sm:py-20">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1fr]">
        <div>
          <h2 className="font-serif-display text-2xl font-bold text-heading sm:text-3xl">{title}</h2>
          {initial.average !== null ? (
            <div className="mt-3 flex items-center gap-3">
              <Stars value={Math.round(initial.average)} />
              <span className="text-sm text-body/70">
                {initial.average.toFixed(1)} / 5 · {initial.count} avis
              </span>
            </div>
          ) : (
            <p className="mt-3 text-sm text-body/60">Soyez le premier à donner votre avis.</p>
          )}

          <ul className="mt-8 space-y-4">
            {initial.reviews.map((review) => (
              <li key={review.id} className="rounded-2xl border border-subtle/10 bg-surface-alt p-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold text-heading">{review.name}</p>
                  <Stars value={review.rating} size={14} />
                </div>
                <p className="mt-1 text-xs text-body/50">{formatDate(review.created_at)}</p>
                <p className="mt-3 text-sm leading-relaxed text-body/80">{review.comment}</p>
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl bg-surface-alt p-6 sm:p-8">
          <h3 className="font-serif-display text-xl font-bold text-heading">Donnez votre avis</h3>

          <div>
            <p className="mb-2 text-sm font-medium text-heading">Votre note</p>
            <div className="flex gap-1" role="radiogroup" aria-label="Note sur 5">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  role="radio"
                  aria-checked={rating === n}
                  aria-label={`${n} sur 5`}
                  onClick={() => setRating(n)}
                  className={`transition-transform hover:scale-110 ${n <= rating ? "text-gold" : "text-body/25"}`}
                >
                  <svg width="26" height="26" viewBox="0 0 20 20" fill={n <= rating ? "currentColor" : "none"} stroke="currentColor" aria-hidden="true">
                    <path strokeWidth="1.2" d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5Z" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <input name="name" required maxLength={100} placeholder="Votre nom" className={inputClass} />
            <input name="email" type="email" maxLength={150} placeholder="Email (facultatif)" className={inputClass} />
          </div>
          <textarea
            name="comment"
            required
            minLength={10}
            maxLength={1000}
            rows={5}
            placeholder="Partagez votre expérience (10 caractères minimum)"
            className={inputClass}
          />

          {message && (
            <p className={`text-sm ${status === "error" ? "text-red-600" : "text-green-700"}`} role="status">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex w-full items-center justify-center rounded-full bg-gold px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-navy transition-colors hover:bg-gold-light disabled:opacity-50"
          >
            {status === "submitting" ? "Envoi..." : "Envoyer mon avis"}
          </button>
        </form>
      </Container>
    </section>
  );
}

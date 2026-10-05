"use client";

import { FormEvent, useState } from "react";
import Button from "@/components/ui/Button";
import { submitOrder } from "@/lib/api";

const inputClasses =
  "w-full rounded-lg border border-subtle/15 bg-surface px-4 py-3 text-sm text-heading placeholder:text-body/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30";
const labelClasses = "mb-2 block text-sm font-semibold text-heading";

export default function OrderForm({
  productId,
  productName,
  maxStock,
}: {
  productId: number;
  productName: string;
  maxStock?: number;
}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [reference, setReference] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = new FormData(e.currentTarget);
    try {
      const res = await submitOrder({
        customer_name: String(form.get("customer_name") ?? ""),
        customer_phone: String(form.get("customer_phone") ?? ""),
        customer_email: (form.get("customer_email") as string) || undefined,
        customer_address: (form.get("customer_address") as string) || undefined,
        notes: (form.get("notes") as string) || undefined,
        items: [{ product_id: productId, quantity: Number(form.get("quantity") ?? 1) }],
      });
      setReference(res.data?.reference ?? "");
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
      setStatus("idle");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-gold/30 bg-gold/10 p-8 text-center">
        <h3 className="font-serif-display text-xl font-bold text-heading">Commande enregistrée</h3>
        {reference && (
          <p className="mt-2 text-sm text-body/70">
            Référence : <span className="font-semibold text-heading">{reference}</span>
          </p>
        )}
        <p className="mt-2 text-sm text-body/70">
          Notre équipe vous contactera pour confirmer la disponibilité et la livraison.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 sm:grid-cols-2">
      <p className="sm:col-span-2 text-sm text-body/70">
        Commande de <span className="font-semibold text-heading">{productName}</span>
        {maxStock !== undefined && maxStock > 0 && <> · {maxStock} en stock</>}
      </p>
      <div>
        <label htmlFor="customer_name" className={labelClasses}>Nom complet *</label>
        <input id="customer_name" name="customer_name" required className={inputClasses} />
      </div>
      <div>
        <label htmlFor="customer_phone" className={labelClasses}>Téléphone *</label>
        <input id="customer_phone" name="customer_phone" type="tel" required className={inputClasses} />
      </div>
      <div>
        <label htmlFor="customer_email" className={labelClasses}>Email</label>
        <input id="customer_email" name="customer_email" type="email" className={inputClasses} />
      </div>
      <div>
        <label htmlFor="quantity" className={labelClasses}>Quantité *</label>
        <input
          id="quantity"
          name="quantity"
          type="number"
          min={1}
          max={maxStock && maxStock > 0 ? maxStock : undefined}
          defaultValue={1}
          required
          className={inputClasses}
        />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="customer_address" className={labelClasses}>Adresse de livraison</label>
        <input id="customer_address" name="customer_address" className={inputClasses} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="notes" className={labelClasses}>Remarques</label>
        <textarea id="notes" name="notes" rows={3} className={inputClasses} />
      </div>
      <div className="sm:col-span-2">
        {error && (
          <p role="alert" className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
        )}
        <Button type="submit" variant="primary" className="w-full" disabled={status === "submitting"}>
          {status === "submitting" ? "Envoi en cours..." : "Passer la commande"}
        </Button>
      </div>
    </form>
  );
}

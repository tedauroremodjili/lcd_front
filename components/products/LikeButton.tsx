"use client";

import { useState, useSyncExternalStore } from "react";
import { toggleProductLike } from "@/lib/api";
import { getLikedSlugs, getVisitorId, setLiked } from "@/lib/visitor";

const noSubscribe = () => () => {};

export default function LikeButton({ slug, initialCount }: { slug: string; initialCount: number }) {
  const storedLiked = useSyncExternalStore(
    noSubscribe,
    () => getLikedSlugs().includes(slug),
    () => false
  );
  const [override, setOverride] = useState<boolean | null>(null);
  const liked = override ?? storedLiked;
  const [count, setCount] = useState(initialCount);
  const [busy, setBusy] = useState(false);

  async function handleClick(e: React.MouseEvent) {
    // The whole card is a link: a like must not navigate away.
    e.preventDefault();
    e.stopPropagation();
    if (busy) return;

    const next = !liked;
    setOverride(next);
    setCount((c) => Math.max(0, c + (next ? 1 : -1)));
    setBusy(true);
    try {
      const result = await toggleProductLike(slug, getVisitorId());
      setOverride(result.liked);
      setCount(result.likes_count);
      setLiked(slug, result.liked);
    } catch {
      setOverride(!next);
      setCount((c) => Math.max(0, c + (next ? -1 : 1)));
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={liked}
      aria-label={liked ? "Retirer mon j'aime" : "J'aime ce produit"}
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-200 active:scale-90 ${
        liked ? "bg-rose-50 text-rose-600" : "bg-surface-alt text-body/60 hover:text-rose-500"
      }`}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" strokeLinejoin="round" />
      </svg>
      {count}
    </button>
  );
}

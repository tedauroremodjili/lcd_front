"use client";

import { useEffect, useRef } from "react";

export default function ScrollRow({
  children,
  className = "",
  fadeFrom = "from-surface",
  autoPlay = true,
  intervalMs = 3200,
}: {
  children: React.ReactNode;
  className?: string;
  fadeFrom?: string;
  autoPlay?: boolean;
  intervalMs?: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollByAmount = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.85, behavior: "smooth" });
  };

  const pauseTemporarily = () => {
    pausedRef.current = true;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      pausedRef.current = false;
    }, 4000);
  };

  useEffect(() => {
    if (!autoPlay) return;

    const prefersReducedMotion = window.matchMedia("(pointer: coarse)").matches || window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const el = trackRef.current;
    if (!el) return;

    const tick = () => {
      if (pausedRef.current) return;

      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;

      if (atEnd) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: el.clientWidth * 0.85, behavior: "smooth" });
      }
    };

    const id = setInterval(tick, intervalMs);
    return () => clearInterval(id);
  }, [autoPlay, intervalMs]);

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  return (
    <div
      className={`group/row relative ${className}`}
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
    >
      <div
        ref={trackRef}
        onPointerDown={pauseTemporarily}
        onWheel={pauseTemporarily}
        onTouchMove={pauseTemporarily}
        className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2"
      >
        {children}
      </div>

      {/* Edge fades hinting there's more to scroll */}
      <div className={`pointer-events-none absolute inset-y-0 left-0 hidden w-10 bg-linear-to-r ${fadeFrom} to-transparent sm:block`} />
      <div className={`pointer-events-none absolute inset-y-0 right-0 hidden w-10 bg-linear-to-l ${fadeFrom} to-transparent sm:block`} />

      <button
        type="button"
        aria-label="Précédent"
        onClick={() => {
          pauseTemporarily();
          scrollByAmount(-1);
        }}
        className="absolute left-0 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-surface p-3 text-heading opacity-0 shadow-[0_4px_20px_rgba(6,37,74,0.15)] ring-1 ring-subtle/10 transition hover:bg-navy hover:text-white group-hover/row:opacity-100 lg:flex"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 3 5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Suivant"
        onClick={() => {
          pauseTemporarily();
          scrollByAmount(1);
        }}
        className="absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-surface p-3 text-heading opacity-0 shadow-[0_4px_20px_rgba(6,37,74,0.15)] ring-1 ring-subtle/10 transition hover:bg-navy hover:text-white group-hover/row:opacity-100 lg:flex"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}

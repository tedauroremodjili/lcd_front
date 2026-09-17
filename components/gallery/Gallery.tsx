"use client";

import { useEffect, useState } from "react";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";

// Shared gallery for products and projects: main image + thumbnails, with a
// fullscreen lightbox (zoom, prev/next, keyboard navigation) as required by
// the cahier des charges §13/§16.
export default function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowRight") setActive((v) => (v + 1) % images.length);
      if (e.key === "ArrowLeft") setActive((v) => (v - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, images.length]);

  if (images.length === 0) return null;

  return (
    <div>
      <button
        onClick={() => setLightbox(true)}
        className="block aspect-[4/3] w-full overflow-hidden rounded-2xl"
        aria-label={`Agrandir : ${alt}`}
      >
        <ImagePlaceholder
          id={images[active]}
          className="h-full w-full transition-transform hover:scale-[1.02]"
        />
      </button>

      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3">
          {images.map((image, i) => (
            <button
              key={image}
              onClick={() => setActive(i)}
              className={`aspect-square overflow-hidden rounded-lg ring-2 transition-all ${
                i === active ? "ring-gold" : "ring-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <ImagePlaceholder id={image} className="h-full w-full" />
            </button>
          ))}
        </div>
      )}

      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-dark/95 p-4"
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={() => setLightbox(false)}
            aria-label="Fermer"
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path
                d="M4 4l12 12M16 4 4 16"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <div className="relative aspect-[4/3] w-full max-w-3xl overflow-hidden rounded-xl">
            <ImagePlaceholder id={images[active]} className="h-full w-full" />
          </div>

          {images.length > 1 && (
            <>
              <button
                onClick={() => setActive((v) => (v - 1 + images.length) % images.length)}
                aria-label="Image précédente"
                className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M12 4 6 10l6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={() => setActive((v) => (v + 1) % images.length)}
                aria-label="Image suivante"
                className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M8 4l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

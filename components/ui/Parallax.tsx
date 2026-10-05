"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Moves its content at a different speed than the page scroll.
// mode "scroll": offset follows window.scrollY (hero backgrounds at page top).
// mode "viewport": offset follows the parent's position in the viewport.
export default function Parallax({
  children,
  className = "",
  speed = 0.15,
  mode = "viewport",
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
  mode?: "scroll" | "viewport";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = parent.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom < 0 || rect.top > vh) return;
      let y: number;
      if (mode === "scroll") {
        y = Math.min(window.scrollY * speed, rect.height * 0.08);
      } else {
        y = (rect.top + rect.height / 2 - vh / 2) * -speed;
      }
      el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [speed, mode]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";

// Desktop-only cursor accent: a small dot plus a lagging ring that grows over
// interactive elements. Invisible on touch devices.
export default function CursorFollower() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    let tx = -100;
    let ty = -100;
    let rx = -100;
    let ry = -100;
    let frame = 0;

    const loop = () => {
      rx += (tx - rx) * 0.16;
      ry += (ty - ry) * 0.16;
      if (dot.current) dot.current.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      frame = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      tx = e.clientX;
      ty = e.clientY;
      document.documentElement.classList.add("has-cursor");
      const interactive = (e.target as Element | null)?.closest(
        "a, button, [role=button], input, textarea, select, label"
      );
      ring.current?.classList.toggle("cursor-hover", Boolean(interactive));
    };
    const onLeave = () => document.documentElement.classList.remove("has-cursor");

    frame = requestAnimationFrame(loop);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <div
      className="cursor-layer pointer-events-none fixed inset-0 z-[70] hidden lg:block"
      aria-hidden="true"
    >
      <div ref={ring} className="cursor-ring" />
      <div ref={dot} className="cursor-dot" />
    </div>
  );
}

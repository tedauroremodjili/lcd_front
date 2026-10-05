"use client";

import { useRef, type ReactNode } from "react";

// 3D tilt + moving glare that follow the mouse (desktop only).
export default function Tilt({
  children,
  className = "",
  max = 6,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (e.pointerType !== "mouse" || !el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${((0.5 - py) * max * 2).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${((px - 0.5) * max * 2).toFixed(2)}deg`);
    el.style.setProperty("--gx", `${(px * 100).toFixed(0)}%`);
    el.style.setProperty("--gy", `${(py * 100).toFixed(0)}%`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`tilt ${className}`}
    >
      {children}
    </div>
  );
}

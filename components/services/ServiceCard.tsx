import Link from "next/link";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import type { Service } from "@/lib/types";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_2px_20px_rgba(6,37,74,0.08)] transition-shadow hover:shadow-[0_8px_30px_rgba(6,37,74,0.15)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <ImagePlaceholder
          id={service.image}
          className="h-full w-full transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif-display text-xl font-bold text-navy">
          {service.name}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-charcoal/70">
          {service.short_description}
        </p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gold-dark">
          Découvrir
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="transition-transform group-hover:translate-x-1"
          >
            <path
              d="M3 8h10m0 0L9 4m4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}

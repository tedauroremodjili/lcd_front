import type { CompanySettings } from "@/lib/types";

// Google Maps will be embedded once ENGOBO GROUP confirms the exact address
// (cahier des charges §25). If settings.google_maps_embed is set, render the
// real iframe instead of this placeholder.
export default function MapPlaceholder({ settings }: { settings: CompanySettings }) {
  if (settings.google_maps_embed) {
    return (
      <iframe
        src={settings.google_maps_embed}
        className="h-full w-full"
        loading="lazy"
        title="Localisation ENGOBO GROUP"
      />
    );
  }

  return (
    <div className="relative flex h-full min-h-[280px] w-full flex-col items-center justify-center gap-3 bg-offwhite text-center">
      <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(#06254a_1px,transparent_1px)] [background-size:18px_18px]" />
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="relative text-navy">
        <path
          d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <circle cx="12" cy="9.5" r="2.5" stroke="currentColor" strokeWidth="1.6" />
      </svg>
      <p className="relative max-w-xs text-sm text-charcoal/60">
        {settings.address}, {settings.city}
        <br />
        Carte disponible après confirmation de l&apos;adresse exacte.
      </p>
    </div>
  );
}

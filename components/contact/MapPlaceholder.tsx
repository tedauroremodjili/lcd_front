import type { CompanySettings } from "@/lib/types";

// Centre of Pointe-Noire. The exact address is not confirmed yet, so the default
// map is approximate; a Google Maps embed set in the back-office takes priority.
const CITY_CENTER = { lat: -4.7761, lon: 11.8636 };
const DELTA = 0.012;

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

  const { lat, lon } = CITY_CENTER;
  const bbox = [lon - DELTA, lat - DELTA, lon + DELTA, lat + DELTA].join(",");
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`;

  return (
    <iframe
      src={src}
      className="h-full w-full"
      loading="lazy"
      title={`Carte : ${settings.address}, ${settings.city}`}
    />
  );
}

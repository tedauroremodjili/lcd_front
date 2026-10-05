import type { WeatherCity, WeatherInfo } from "@/lib/types";

// Sun, cloud or rain icon picked from the WMO weather code.
function WeatherIcon({ code, size = 14 }: { code: number; size?: number }) {
  const isRain = code >= 51 && code <= 82;
  const isStorm = code >= 95;
  const isCloud = code >= 2 && code < 51;

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      {isStorm || isRain ? (
        <>
          <path d="M7 15a4 4 0 0 1 .5-8 5.5 5.5 0 0 1 10.6 1.5A3.5 3.5 0 0 1 17.5 15H7Z" />
          <path d="M9 18l-1 2M13 18l-1 2M17 18l-1 2" />
        </>
      ) : isCloud ? (
        <path d="M7 18a4 4 0 0 1 .5-8 5.5 5.5 0 0 1 10.6 1.5A3.5 3.5 0 0 1 17.5 18H7Z" />
      ) : (
        <>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </>
      )}
    </svg>
  );
}

// Summary shows Pointe-Noire (where the company is); the list opens on click
// and shows every city covered by the report.
export default function WeatherChip({ weather }: { weather: WeatherInfo }) {
  const home: WeatherCity | undefined =
    weather.cities.find((c) => c.city === "Pointe-Noire") ?? weather.cities[0];
  if (!home) return null;

  return (
    <details className="group relative">
      <summary className="flex cursor-pointer list-none items-center gap-2 select-none hover:text-gold-light">
        <WeatherIcon code={home.code} />
        {home.temperature}°C · {weather.country}
      </summary>
      <div className="absolute left-0 top-full z-50 mt-3 w-64 rounded-xl border border-subtle/10 bg-surface p-3 text-heading shadow-lg">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-body/60">Météo · {weather.country}</p>
        <ul className="space-y-2">
          {weather.cities.map((c) => (
            <li key={c.city} className="flex items-center justify-between gap-3 text-sm">
              <span className="flex items-center gap-2 font-medium">
                <WeatherIcon code={c.code} size={14} />
                {c.city}
              </span>
              <span className="text-right">
                <span className="font-semibold">{c.temperature}°C</span>
                <span className="block text-xs text-body/60">{c.condition}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}

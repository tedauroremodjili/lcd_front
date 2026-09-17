import type { CompanySettings } from "@/lib/types";
import { whatsappLink } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/layout/Header";

const iconProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export default function ContactInfoList({ settings }: { settings: CompanySettings }) {
  const items = [
    {
      label: "Adresse",
      value: `${settings.address}, ${settings.city}`,
      icon: (
        <svg {...iconProps}>
          <path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21Z" />
          <circle cx="12" cy="9.5" r="2.5" />
        </svg>
      ),
    },
    {
      label: "Téléphone",
      value: [settings.phone_1, settings.phone_2].filter(Boolean).join(" / "),
      href: `tel:${settings.phone_1}`,
      icon: (
        <svg {...iconProps}>
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L8 9.7a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2Z" />
        </svg>
      ),
    },
    {
      label: "Email",
      value: settings.email,
      href: `mailto:${settings.email}`,
      icon: (
        <svg {...iconProps}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      ),
    },
    {
      label: "Horaires",
      value: `${settings.hours_weekdays} — ${settings.hours_weekend}`,
      icon: (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      ),
    },
  ];

  return (
    <ul className="space-y-6">
      {items.map((item) => (
        <li key={item.label} className="flex gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold-dark">
            {item.icon}
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-charcoal/50">
              {item.label}
            </p>
            {item.href ? (
              <a href={item.href} className="font-medium text-navy hover:text-gold-dark">
                {item.value}
              </a>
            ) : (
              <p className="font-medium text-navy">{item.value}</p>
            )}
          </div>
        </li>
      ))}
      <li className="flex gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#25D366]/15 text-[#1fa855]">
          <WhatsAppIcon className="h-5 w-5" />
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-charcoal/50">
            WhatsApp
          </p>
          <a
            href={whatsappLink(
              settings.whatsapp,
              "Bonjour ENGOBO GROUP, je souhaite obtenir des informations concernant vos services."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-navy hover:text-gold-dark"
          >
            Discuter maintenant
          </a>
        </div>
      </li>
    </ul>
  );
}

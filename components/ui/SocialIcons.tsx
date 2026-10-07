import type { ReactNode } from "react";
import type { CompanySettings } from "@/lib/types";
import { safeUrl, whatsappLink } from "@/lib/utils";

export function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.004 2.667c-7.36 0-13.333 5.973-13.333 13.333 0 2.353.615 4.56 1.692 6.475L2.667 29.333l7.03-1.844a13.26 13.26 0 0 0 6.307 1.605h.006c7.36 0 13.333-5.973 13.333-13.333S23.364 2.667 16.004 2.667Zm0 24.395a11 11 0 0 1-5.61-1.537l-.402-.239-4.172 1.094 1.114-4.067-.262-.418a10.98 10.98 0 0 1-1.685-5.895c0-6.078 4.944-11.022 11.022-11.022 6.077 0 11.02 4.944 11.02 11.022 0 6.077-4.943 11.062-11.025 11.062Zm6.043-8.257c-.331-.166-1.96-.967-2.264-1.077-.303-.11-.524-.166-.744.166-.221.331-.855 1.077-1.048 1.298-.193.221-.386.249-.717.083-.331-.166-1.398-.516-2.663-1.643-.984-.878-1.65-1.963-1.843-2.294-.193-.331-.02-.51.146-.675.15-.149.331-.386.497-.58.166-.192.221-.33.331-.551.11-.221.055-.414-.028-.58-.083-.166-.744-1.795-1.02-2.458-.269-.645-.542-.558-.744-.568l-.634-.011c-.221 0-.58.083-.883.414-.303.331-1.157 1.13-1.157 2.76 0 1.628 1.185 3.202 1.35 3.423.166.221 2.332 3.562 5.65 4.995.79.341 1.406.545 1.886.697.792.252 1.513.216 2.083.131.635-.095 1.96-.802 2.236-1.575.276-.773.276-1.436.193-1.575-.083-.138-.303-.221-.634-.386Z" />
    </svg>
  );
}

const Facebook = ({ className }: { className: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M14 9h3V5.5h-3c-2.21 0-4 1.79-4 4V12H8v3.5h2V22h3.5v-6.5H16l.5-3.5h-3V9.5c0-.55.45-1 1-1Z" />
  </svg>
);

const Instagram = ({ className }: { className: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const TikTok = ({ className }: { className: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M14 3v11.2a3.7 3.7 0 1 1-3.7-3.7" />
    <path d="M14 3c.3 2.6 2 4.3 4.8 4.5" />
  </svg>
);

type Social = { key: string; label: string; href: string; icon: (cls: string) => ReactNode };

function getSocials(settings: CompanySettings): Social[] {
  const list: Social[] = [];
  const facebook = safeUrl(settings.facebook);
  const instagram = safeUrl(settings.instagram);
  const tiktok = safeUrl(settings.tiktok);
  if (facebook) list.push({ key: "facebook", label: "Facebook", href: facebook, icon: (c) => <Facebook className={c} /> });
  if (instagram) list.push({ key: "instagram", label: "Instagram", href: instagram, icon: (c) => <Instagram className={c} /> });
  if (tiktok) list.push({ key: "tiktok", label: "TikTok", href: tiktok, icon: (c) => <TikTok className={c} /> });
  if (settings.whatsapp) {
    list.push({
      key: "whatsapp",
      label: "WhatsApp",
      href: whatsappLink(settings.whatsapp, "Bonjour ENGOBO GROUP, je souhaite obtenir des informations concernant vos services."),
      icon: (c) => <WhatsAppIcon className={c} />,
    });
  }
  return list;
}

const variants = {
  topbar: { link: "h-7 w-7 text-white/80 hover:bg-gold hover:text-navy", icon: "h-3.5 w-3.5" },
  footer: { link: "h-9 w-9 bg-white/10 text-white hover:bg-gold hover:text-navy", icon: "h-4 w-4" },
  menu: { link: "h-10 w-10 bg-surface-alt text-heading hover:bg-gold hover:text-navy", icon: "h-[18px] w-[18px]" },
} as const;

export default function SocialIcons({
  settings,
  variant = "topbar",
  className = "",
}: {
  settings: CompanySettings;
  variant?: keyof typeof variants;
  className?: string;
}) {
  const socials = getSocials(settings);
  if (socials.length === 0) return null;
  const v = variants[variant];

  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      {socials.map((s) => (
        <li key={s.key}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            title={s.label}
            className={`flex items-center justify-center rounded-full transition-all duration-200 hover:-translate-y-0.5 ${v.link} ${
              s.key === "whatsapp" ? "hover:!bg-[#25D366] hover:!text-white" : ""
            }`}
          >
            {s.icon(v.icon)}
          </a>
        </li>
      ))}
    </ul>
  );
}

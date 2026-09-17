import Link from "next/link";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import { services, settings } from "@/lib/data";

const navigation = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/services", label: "Services" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/produits", label: "Produits" },
  { href: "/devis", label: "Devis" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo variant="light" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/70">
            {settings.description}
          </p>
          <div className="mt-6 flex gap-3">
            {settings.facebook && (
              <SocialIcon href={settings.facebook} label="Facebook">
                <path d="M14 9h3V5.5h-3c-2.21 0-4 1.79-4 4V12H8v3.5h2V22h3.5v-6.5H16l.5-3.5h-3V9.5c0-.55.45-1 1-1Z" />
              </SocialIcon>
            )}
            {settings.instagram && (
              <SocialIcon href={settings.instagram} label="Instagram">
                <path d="M12 8.2a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6Zm0 6.27a2.47 2.47 0 1 1 0-4.94 2.47 2.47 0 0 1 0 4.94ZM17.5 6.5a.9.9 0 1 1-1.8 0 .9.9 0 0 1 1.8 0ZM12 4.35c2.6 0 2.91.01 3.94.06.95.04 1.46.2 1.8.34.45.17.78.38 1.12.72.34.34.55.67.72 1.12.14.34.3.85.34 1.8.05 1.03.06 1.34.06 3.94s-.01 2.91-.06 3.94c-.04.95-.2 1.46-.34 1.8a3.02 3.02 0 0 1-.72 1.12 3.02 3.02 0 0 1-1.12.72c-.34.14-.85.3-1.8.34-1.03.05-1.34.06-3.94.06s-2.91-.01-3.94-.06c-.95-.04-1.46-.2-1.8-.34a3.02 3.02 0 0 1-1.12-.72 3.02 3.02 0 0 1-.72-1.12c-.14-.34-.3-.85-.34-1.8-.05-1.03-.06-1.34-.06-3.94s.01-2.91.06-3.94c.04-.95.2-1.46.34-1.8.17-.45.38-.78.72-1.12.34-.34.67-.55 1.12-.72.34-.14.85-.3 1.8-.34 1.03-.05 1.34-.06 3.94-.06ZM12 2.5c-2.65 0-2.98.01-4.02.06-1.04.05-1.75.21-2.37.46a5.35 5.35 0 0 0-1.94 1.26 5.35 5.35 0 0 0-1.26 1.94c-.25.62-.41 1.33-.46 2.37C2 9.67 2 10 2 12.65s.01 2.98.06 4.02c.05 1.04.21 1.75.46 2.37.26.65.6 1.2 1.26 1.94.63.66 1.29 1 1.94 1.26.62.25 1.33.41 2.37.46 1.04.05 1.37.06 4.02.06s2.98-.01 4.02-.06c1.04-.05 1.75-.21 2.37-.46a5.35 5.35 0 0 0 1.94-1.26 5.35 5.35 0 0 0 1.26-1.94c.25-.62.41-1.33.46-2.37.05-1.04.06-1.37.06-4.02s-.01-2.98-.06-4.02c-.05-1.04-.21-1.75-.46-2.37a5.35 5.35 0 0 0-1.26-1.94 5.35 5.35 0 0 0-1.94-1.26c-.62-.25-1.33-.41-2.37-.46C14.98 2.51 14.65 2.5 12 2.5Z" />
              </SocialIcon>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gold-light">
            Navigation
          </h3>
          <ul className="mt-5 space-y-3">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-white/70 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gold-light">
            Nos services
          </h3>
          <ul className="mt-5 space-y-3">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="text-sm text-white/70 hover:text-white"
                >
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gold-light">
            Contact
          </h3>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            <li>
              {settings.address}, {settings.city}
            </li>
            <li>{settings.phone_1}{settings.phone_2 ? ` / ${settings.phone_2}` : ""}</li>
            <li>{settings.email}</li>
            <li>{settings.hours_weekdays}</li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10 py-6">
        <Container className="flex flex-col items-center justify-between gap-3 text-xs text-white/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {settings.name}. Tous droits réservés.
          </p>
          <p>Importation • Marbrerie • Ébénisterie • Menuiserie • Commerce général</p>
        </Container>
      </div>
    </footer>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-gold hover:text-navy"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        {children}
      </svg>
    </a>
  );
}

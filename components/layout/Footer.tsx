import Reveal from "@/components/ui/Reveal";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import SocialIcons from "@/components/ui/SocialIcons";
import { txt, type Texts } from "@/lib/texts";
import type { CompanySettings, Service } from "@/lib/types";

function navigationFor(texts: Texts) {
  return [
    { href: "/", label: txt(texts, "menu.home") },
    { href: "/a-propos", label: txt(texts, "menu.about") },
    { href: "/services", label: txt(texts, "menu.services") },
    { href: "/realisations", label: txt(texts, "menu.projects") },
    { href: "/produits", label: txt(texts, "menu.products") },
    { href: "/devis", label: txt(texts, "menu.quote_cta") },
    { href: "/contact", label: txt(texts, "menu.contact") },
  ];
}

export default function Footer({
  services,
  settings,
  texts,
}: {
  texts: Texts;
  services: Service[];
  settings: CompanySettings;
}) {
  return (
    <footer className="bg-navy text-white">
      <Reveal>
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo variant="onDark" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/70">
            {settings.description}
          </p>
          <SocialIcons settings={settings} variant="footer" className="mt-6 gap-3" />
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gold-light">
            {txt(texts, "footer.nav_title")}
          </h3>
          <ul className="mt-5 space-y-3">
            {navigationFor(texts).map((item) => (
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
            {txt(texts, "footer.services_title")}
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
            {txt(texts, "footer.contact_title")}
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
      </Reveal>

      <div className="border-t border-white/10 py-6">
        <Container className="flex flex-col items-center justify-between gap-3 text-xs text-white/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {settings.name}. Tous droits réservés.
          </p>
          <p>{txt(texts, "footer.tagline")}</p>
          <p>
            {txt(texts, "footer.credit_label")}{" "}
            <a
              href={txt(texts, "footer.credit_url")}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-gold-light transition-colors hover:text-white"
            >
              {txt(texts, "footer.credit_name")}
            </a>
          </p>
        </Container>
      </div>
    </footer>
  );
}

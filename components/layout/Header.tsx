"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import SocialIcons, { WhatsAppIcon } from "@/components/ui/SocialIcons";
import ThemeToggle from "@/components/ui/ThemeToggle";
import WeatherChip from "@/components/layout/WeatherChip";
import type { CompanySettings, Service, WeatherInfo } from "@/lib/types";
import { txt, type Texts } from "@/lib/texts";
import { whatsappLink } from "@/lib/utils";

export { WhatsAppIcon };

type NavLink = { href: string; label: string };
type NavItem =
  | { type: "link"; href: string; label: string }
  | { type: "dropdown"; label: string; items: NavLink[] };

function buildNavItems(services: Service[], texts: Texts): NavItem[] {
  return [
    { type: "link", href: "/", label: txt(texts, "menu.home") },
    {
      type: "dropdown",
      label: txt(texts, "menu.services"),
      items: [
        ...services.map((s) => ({ href: `/services/${s.slug}`, label: s.name })),
        { href: "/services", label: txt(texts, "menu.services_all") },
      ],
    },
    { type: "link", href: "/realisations", label: txt(texts, "menu.projects") },
    { type: "link", href: "/produits", label: txt(texts, "menu.products") },
    {
      type: "dropdown",
      label: txt(texts, "menu.about"),
      items: [
        { href: "/a-propos", label: txt(texts, "menu.about_company") },
        { href: "/actualites", label: txt(texts, "menu.news") },
      ],
    },
    { type: "link", href: "/contact", label: txt(texts, "menu.contact") },
  ];
}

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

const navLinkBase =
  "relative text-[13px] font-semibold uppercase tracking-wide transition-colors xl:text-sm after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-300 hover:after:scale-x-100";

const iconProps = {
  width: 14,
  height: 14,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const PhoneIcon = () => (
  <svg {...iconProps}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L8 9.7a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2Z" />
  </svg>
);
const ClockIcon = () => (
  <svg {...iconProps}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);
const PinIcon = () => (
  <svg {...iconProps}>
    <path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);
const MailIcon = () => (
  <svg {...iconProps}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

export default function Header({
  services,
  settings,
  texts,
  weather,
}: {
  services: Service[];
  settings: CompanySettings;
  texts: Texts;
  weather: WeatherInfo | null;
}) {
  const navItems = buildNavItems(services, texts);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
    if (openDropdown) setOpenDropdown(null);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const phones = [settings.phone_1, settings.phone_2].filter(Boolean).join(" · ");
  const waLink = whatsappLink(
    settings.whatsapp,
    "Bonjour ENGOBO GROUP, je souhaite obtenir des informations concernant vos services."
  );

  return (
    <header
      className={`animate-header-in sticky top-0 z-50 w-full transition-shadow duration-300 ${
        scrolled ? "shadow-md shadow-navy/10" : ""
      }`}
    >
      {/* Top bar: contact info (left) and social networks (right). Collapses on scroll. */}
      <div
        className={`hidden bg-navy text-white/80 transition-all duration-300 lg:block ${
          scrolled ? "invisible max-h-0 opacity-0" : "max-h-10 opacity-100"
        }`}
      >
        <Container className="flex h-10 items-center justify-between text-xs">
          <div className="flex items-center gap-6">
            {phones && (
              <a href={`tel:${settings.phone_1}`} className="flex items-center gap-2 transition-colors hover:text-gold-light">
                <PhoneIcon />
                {phones}
              </a>
            )}
            {settings.hours_weekdays && (
              <span className="hidden items-center gap-2 xl:flex">
                <ClockIcon />
                {settings.hours_weekdays}
              </span>
            )}
            {weather && (
              <span className="hidden items-center gap-2 lg:flex">
                <WeatherChip weather={weather} />
              </span>
            )}
            {settings.city && (
              <span className="hidden items-center gap-2 2xl:flex">
                <PinIcon />
                {settings.address}, {settings.city}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4">
            {settings.email && (
              <a href={`mailto:${settings.email}`} className="hidden items-center gap-2 transition-colors hover:text-gold-light xl:flex">
                <MailIcon />
                {settings.email}
              </a>
            )}
            <span className="hidden h-4 w-px bg-white/20 xl:block" />
            <SocialIcons settings={settings} variant="topbar" />
          </div>
        </Container>
      </div>

      {/* Main bar: logo, navigation, theme + call to action. */}
      <div className="bg-surface/95 backdrop-blur-md">
        <Container className="flex h-20 items-center justify-between gap-6">
          <Link href="/" aria-label="ENGOBO GROUP - Accueil" className="shrink-0">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-5 lg:flex xl:gap-8">
            {navItems.map((item) => {
              if (item.type === "link") {
                const active = isActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`${navLinkBase} ${
                      active ? "text-gold-dark after:scale-x-100" : "text-heading hover:text-gold-dark"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              }

              const active = item.items.some((sub) => isActive(pathname, sub.href));
              const isOpen = openDropdown === item.label;

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown((v) => (v === item.label ? null : v))}
                >
                  <button
                    type="button"
                    onClick={() => setOpenDropdown((v) => (v === item.label ? null : item.label))}
                    aria-expanded={isOpen}
                    className={`${navLinkBase} flex items-center gap-1.5 ${
                      active || isOpen ? "text-gold-dark after:scale-x-100" : "text-heading hover:text-gold-dark"
                    }`}
                  >
                    {item.label}
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                    >
                      <path d="m2 3.5 3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  <div
                    className={`absolute left-1/2 top-full w-56 -translate-x-1/2 pt-4 transition-all duration-150 ${
                      isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden rounded-xl border border-subtle/10 bg-surface py-2 shadow-lg shadow-navy/10">
                      {item.items.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className={`block px-4 py-2.5 text-sm font-medium transition-colors ${
                            isActive(pathname, sub.href)
                              ? "bg-surface-alt text-gold-dark"
                              : "text-heading hover:bg-surface-alt hover:text-gold-dark"
                          }`}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>

          <div className="hidden shrink-0 items-center gap-3 lg:flex">
            <ThemeToggle />
            <Link
              href="/devis"
              className="btn-sheen inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-[13px] font-semibold uppercase tracking-wide text-navy shadow-sm shadow-gold/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/40 xl:text-sm"
            >
              {txt(texts, "menu.quote_cta")}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10m0 0L9 4m4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5"
            >
              <span className={`block h-0.5 w-6 bg-heading transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-6 bg-heading transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-6 bg-heading transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
            </button>
          </div>
        </Container>
      </div>

      {/* Mobile menu */}
      <div
        className={`absolute inset-x-0 top-full z-40 max-h-[calc(100dvh-5rem)] origin-top overflow-y-auto bg-surface shadow-lg transition-all duration-200 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <nav className="flex flex-col divide-y divide-subtle/10 px-5">
          {navItems.map((item) => {
            if (item.type === "link") {
              return (
                <Link key={item.href} href={item.href} className="py-4 text-base font-semibold text-heading">
                  {item.label}
                </Link>
              );
            }

            return (
              <div key={item.label} className="py-4">
                <p className="text-base font-semibold text-heading">{item.label}</p>
                <div className="mt-2 flex flex-col gap-1 pl-3">
                  {item.items.map((sub) => (
                    <Link key={sub.href} href={sub.href} className="py-1.5 text-sm text-body/70">
                      {sub.label}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </nav>

        <div className="space-y-3 px-5 pb-6 pt-4">
          <Link
            href="/devis"
            className="flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-3.5 text-sm font-semibold uppercase tracking-wide text-navy"
          >
            Demander un devis gratuit
          </Link>

          <div className="grid grid-cols-2 gap-3">
            <a
              href={`tel:${settings.phone_1}`}
              className="flex items-center justify-center gap-2 rounded-full border border-subtle/20 px-4 py-3 text-sm font-semibold text-heading"
            >
              <PhoneIcon />
              Appeler
            </a>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp
            </a>
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-subtle/10 pt-4">
            <SocialIcons settings={settings} variant="menu" />
            {settings.hours_weekdays && (
              <p className="flex items-center gap-1.5 text-right text-xs text-body/60">
                <ClockIcon />
                {settings.hours_weekdays}
              </p>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

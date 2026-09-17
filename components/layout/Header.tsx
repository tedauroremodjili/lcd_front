"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import { settings } from "@/lib/data";
import { whatsappLink } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/services", label: "Services" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/produits", label: "Produits" },
  { href: "/devis", label: "Devis" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
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

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 shadow-sm backdrop-blur-sm"
          : "bg-white/90 backdrop-blur-sm"
      }`}
    >
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" aria-label="ENGOBO GROUP - Accueil">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex xl:gap-9">
          {navLinks.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold uppercase tracking-wide transition-colors ${
                  active ? "text-gold-dark" : "text-navy hover:text-gold-dark"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={whatsappLink(
              settings.whatsapp,
              "Bonjour ENGOBO GROUP, je souhaite obtenir des informations concernant vos services."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-light"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span
            className={`block h-0.5 w-6 bg-navy transition-transform ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-navy transition-opacity ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-navy transition-transform ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </Container>

      {/* Mobile menu */}
      <div
        className={`fixed inset-x-0 top-20 z-40 origin-top bg-white shadow-lg transition-all duration-200 lg:hidden ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <nav className="flex flex-col divide-y divide-navy/10 px-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="py-4 text-base font-semibold text-navy"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="px-5 pb-6 pt-2">
          <a
            href={whatsappLink(
              settings.whatsapp,
              "Bonjour ENGOBO GROUP, je souhaite obtenir des informations concernant vos services."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Contacter sur WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}

export function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.004 2.667c-7.36 0-13.333 5.973-13.333 13.333 0 2.353.615 4.56 1.692 6.475L2.667 29.333l7.03-1.844a13.26 13.26 0 0 0 6.307 1.605h.006c7.36 0 13.333-5.973 13.333-13.333S23.364 2.667 16.004 2.667Zm0 24.395a11 11 0 0 1-5.61-1.537l-.402-.239-4.172 1.094 1.114-4.067-.262-.418a10.98 10.98 0 0 1-1.685-5.895c0-6.078 4.944-11.022 11.022-11.022 6.077 0 11.02 4.944 11.02 11.022 0 6.077-4.943 11.062-11.025 11.062Zm6.043-8.257c-.331-.166-1.96-.967-2.264-1.077-.303-.11-.524-.166-.744.166-.221.331-.855 1.077-1.048 1.298-.193.221-.386.249-.717.083-.331-.166-1.398-.516-2.663-1.643-.984-.878-1.65-1.963-1.843-2.294-.193-.331-.02-.51.146-.675.15-.149.331-.386.497-.58.166-.192.221-.33.331-.551.11-.221.055-.414-.028-.58-.083-.166-.744-1.795-1.02-2.458-.269-.645-.542-.558-.744-.568l-.634-.011c-.221 0-.58.083-.883.414-.303.331-1.157 1.13-1.157 2.76 0 1.628 1.185 3.202 1.35 3.423.166.221 2.332 3.562 5.65 4.995.79.341 1.406.545 1.886.697.792.252 1.513.216 2.083.131.635-.095 1.96-.802 2.236-1.575.276-.773.276-1.436.193-1.575-.083-.138-.303-.221-.634-.386Z" />
    </svg>
  );
}

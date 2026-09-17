import type { Metadata } from "next";
import ContactForm from "@/components/forms/ContactForm";
import ContactInfoList from "@/components/contact/ContactInfoList";
import MapPlaceholder from "@/components/contact/MapPlaceholder";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import { getSettings } from "@/lib/api";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Adresse, téléphones, WhatsApp, email et horaires d'ENGOBO GROUP à Pointe-Noire.",
};

export default async function ContactPage() {
  const settings = await getSettings();

  return (
    <>
      <PageHero
        eyebrow="Nous trouver"
        title="Contact"
        description="Une question, un projet ? Contactez-nous par téléphone, WhatsApp ou via le formulaire ci-dessous."
        breadcrumb={[{ label: "Accueil", href: "/" }, { label: "Contact" }]}
        image="hero-contact"
      />
      <section className="bg-white py-20 sm:py-24">
        <Container className="grid gap-14 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <h2 className="font-serif-display text-2xl font-bold text-navy">
              Nos coordonnées
            </h2>
            <div className="mt-8">
              <ContactInfoList settings={settings} />
            </div>
            <div className="mt-10 aspect-[4/3] overflow-hidden rounded-2xl">
              <MapPlaceholder settings={settings} />
            </div>
          </div>

          <div>
            <h2 className="font-serif-display text-2xl font-bold text-navy">
              Envoyez-nous un message
            </h2>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

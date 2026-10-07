import SplitText from "@/components/ui/SplitText";
import Reveal from "@/components/ui/Reveal";
import type { Metadata } from "next";
import ContactForm from "@/components/forms/ContactForm";
import ContactInfoList from "@/components/contact/ContactInfoList";
import MapPlaceholder from "@/components/contact/MapPlaceholder";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import { getSettings, getPageBanners } from "@/lib/api";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Adresse, téléphones, WhatsApp, email et horaires d'ENGOBO GROUP à Pointe-Noire.",
};

export default async function ContactPage() {
  const banners = await getPageBanners();
  const settings = await getSettings();

  return (
    <>
      <PageHero
        eyebrow={banners.contact?.eyebrow ?? ""}
        title={banners.contact?.title ?? ""}
        description={settings.contact_intro || banners.contact?.description || ""}
        breadcrumb={[{ label: "Accueil", href: "/" }, { label: "Contact" }]}
        image={banners.contact?.image ?? ""}
      />
      <section className="bg-tint py-20 sm:py-24">
        <Container className="grid gap-14 lg:grid-cols-[1fr_1.3fr]">
          <Reveal direction="left">
            <h2 className="font-serif-display text-2xl font-bold text-heading">
              <SplitText text="Nos coordonnées" />
            </h2>
            <div className="mt-8">
              <ContactInfoList settings={settings} />
            </div>
            <Reveal direction="wipe" delay={200} className="mt-10 aspect-[4/3] overflow-hidden rounded-2xl">
              <MapPlaceholder settings={settings} />
            </Reveal>
          </Reveal>

          <Reveal direction="right" delay={150}>
            <h2 className="font-serif-display text-2xl font-bold text-heading">
              <SplitText text="Envoyez-nous un message" />
            </h2>
            <div className="mt-8">
              <ContactForm />
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

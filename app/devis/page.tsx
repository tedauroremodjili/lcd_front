import Reveal from "@/components/ui/Reveal";
import type { Metadata } from "next";
import QuoteForm from "@/components/forms/QuoteForm";
import ContactInfoList from "@/components/contact/ContactInfoList";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import { getProductBySlug, getSettings, getPageBanners } from "@/lib/api";

export const metadata: Metadata = {
  title: "Demander un devis",
  description:
    "Décrivez votre projet et recevez un devis personnalisé de l'équipe ENGOBO GROUP, sans engagement.",
};

export default async function DevisPage(props: PageProps<"/devis">) {
  const banners = await getPageBanners();
  const searchParams = await props.searchParams;
  const settings = await getSettings();

  const serviceParam = typeof searchParams.service === "string" ? searchParams.service : undefined;
  const produitParam = typeof searchParams.produit === "string" ? searchParams.produit : undefined;
  const product = produitParam ? await getProductBySlug(produitParam) : undefined;

  return (
    <>
      <PageHero
        eyebrow={banners.devis?.eyebrow ?? ""}
        title={banners.devis?.title ?? ""}
        description={banners.devis?.description ?? ""}
        breadcrumb={[{ label: "Accueil", href: "/" }, { label: "Devis" }]}
        image={banners.devis?.image ?? ""}
      />
      <section className="bg-tint py-20 sm:py-24">
        <Container className="grid gap-14 lg:grid-cols-[1.5fr_1fr]">
          <Reveal direction="left">
          <QuoteForm
            defaultService={serviceParam}
            defaultDescription={
              product ? `Je suis intéressé par le produit "${product.name}".` : undefined
            }
          />
          </Reveal>

          <Reveal direction="right" delay={150} className="h-fit">
          <aside className="h-fit rounded-2xl bg-surface-alt p-8">
            <h3 className="font-serif-display text-lg font-bold text-heading">
              Besoin d&apos;échanger directement ?
            </h3>
            <p className="mt-2 text-sm text-body/70">
              Notre équipe reste disponible par téléphone ou WhatsApp pour répondre à vos
              questions.
            </p>
            <div className="mt-6">
              <ContactInfoList settings={settings} />
            </div>
          </aside>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

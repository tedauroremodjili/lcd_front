import CtaSection from "@/components/home/CtaSection";
import Hero from "@/components/home/Hero";
import Intro from "@/components/home/Intro";
import Marquee from "@/components/ui/Marquee";
import { listOf, txt } from "@/lib/texts";
import Newsletter from "@/components/home/Newsletter";
import ProductsShowcase from "@/components/home/ProductsShowcase";
import ProjectsShowcase from "@/components/home/ProjectsShowcase";
import ServicesGrid from "@/components/home/ServicesGrid";
import Testimonials from "@/components/home/Testimonials";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import {
  getHeroSlides,
  getSettings,
  getProducts,
  getProjects,
  getServices,
  getTestimonials,
  getTexts,
} from "@/lib/api";

export default async function Home() {
  const [slides, services, projects, products, testimonials, settings, texts] =
    await Promise.all([
      getHeroSlides(),
      getServices(),
      getProjects({ featured: true }),
      getProducts({ featured: true }),
      getTestimonials(),
      getSettings(),
      getTexts(),
    ]);

  return (
    <>
      <Hero slides={slides} />
      <Marquee items={listOf(texts, "marquee.items")} />
      <Intro settings={settings} serviceCount={services.length} />
      <ServicesGrid services={services} />
      <ProjectsShowcase projects={projects} />
      <ProductsShowcase products={products} />
      <WhyChooseUs />
      <Testimonials testimonials={testimonials} />
      <CtaSection />
      <Newsletter title={txt(texts, "newsletter.title")} text={txt(texts, "newsletter.text")} button={txt(texts, "newsletter.button")} />
    </>
  );
}

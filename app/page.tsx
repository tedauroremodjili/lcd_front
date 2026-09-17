import CtaSection from "@/components/home/CtaSection";
import Hero from "@/components/home/Hero";
import Intro from "@/components/home/Intro";
import LatestArticles from "@/components/home/LatestArticles";
import ProductsShowcase from "@/components/home/ProductsShowcase";
import ProjectsShowcase from "@/components/home/ProjectsShowcase";
import ServicesGrid from "@/components/home/ServicesGrid";
import Testimonials from "@/components/home/Testimonials";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import {
  getArticles,
  getHeroSlides,
  getProducts,
  getProjects,
  getServices,
  getTestimonials,
} from "@/lib/api";

export default async function Home() {
  const [slides, services, projects, products, testimonials, articles] =
    await Promise.all([
      getHeroSlides(),
      getServices(),
      getProjects({ featured: true }),
      getProducts({ featured: true }),
      getTestimonials(),
      getArticles(),
    ]);

  return (
    <>
      <Hero slides={slides} />
      <Intro />
      <ServicesGrid services={services} />
      <ProjectsShowcase projects={projects} />
      <ProductsShowcase products={products} />
      <WhyChooseUs />
      <Testimonials testimonials={testimonials} />
      <LatestArticles articles={articles.slice(0, 3)} />
      <CtaSection />
    </>
  );
}

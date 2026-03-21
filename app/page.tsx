import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SobreNosotros from "@/components/SobreNosotros";
import WhyLuxxor from "@/components/WhyLuxxor";
import Services from "@/components/Services";
import ValueAdded from "@/components/ValueAdded";
import ProjectsGrid from "@/components/ProjectsGrid";
import BeforeAfterSection from "@/components/BeforeAfterSection";
import ArchitecturalDesignSection from "@/components/ArchitecturalDesignSection";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import CommercialRemodelingSection from "@/components/CommercialRemodelingSection";
import FAQSection from "@/components/FAQSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--color-luxxor-dark)] selection:bg-[var(--color-luxxor-gold)] selection:text-[var(--color-luxxor-dark)] flex flex-col w-full overflow-x-hidden">
      <Navbar />
      <Hero />
      <SobreNosotros />
      <WhyLuxxor />
      <Services />
      <ValueAdded />
      <ArchitecturalDesignSection />
      <ProjectsGrid />
      <BeforeAfterSection />
      <CommercialRemodelingSection />
      <FAQSection />
      <TestimonialsCarousel />
      <FinalCTA />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}

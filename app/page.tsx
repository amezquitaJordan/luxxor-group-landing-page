import dynamic from 'next/dynamic';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SobreNosotros from "@/components/SobreNosotros";
import WhyLuxxor from "@/components/WhyLuxxor";
import Services from "@/components/Services";
import BeforeAfterSection from "@/components/BeforeAfterSection";
import ArchitecturalDesignSection from "@/components/ArchitecturalDesignSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import FAQSection from "@/components/FAQSection";

// Lazy Loaded Sections for Performance
const ValueAdded = dynamic(() => import("@/components/ValueAdded"));
const ProjectsGrid = dynamic(() => import("@/components/ProjectsGrid"));
const CommercialRemodelingSection = dynamic(() => import("@/components/CommercialRemodelingSection"));
const TestimonialsCarousel = dynamic(() => import("@/components/TestimonialsCarousel"));

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

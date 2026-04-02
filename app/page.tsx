/*
 * Archivo: app/page.tsx
 * Propósito: Define la página de inicio (Landing Page) de Luxxor Group.
 * Orquesta y renderiza ordenada mente todas las secciones visibles de la UI, 
 * gestionando el flujo narrativo y visual del usuario.
 */
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

/*
 * Carga diferida (Lazy Loading) de componentes para la optimización 
 * del rendimiento. Esto asegura que estas secciones no bloqueen 
 * la carga inicial (First Contentful Paint), mejorando Lighthouse SEO.
 */
// Lazy Loaded Sections for Performance
const ValueAdded = dynamic(() => import("@/components/ValueAdded"));
const ProjectsGrid = dynamic(() => import("@/components/ProjectsGrid"));
const CommercialRemodelingSection = dynamic(() => import("@/components/CommercialRemodelingSection"));
const TestimonialsCarousel = dynamic(() => import("@/components/TestimonialsCarousel"));

/*
 * Componente Home
 * Controla el renderizado principal de la página, agrupando todos los componentes 
 * de manera semántica dentro de un contenedor en forma de columna (flex-col).
 * Organiza en orden: Navbar, Hero, Sobre Nosotros, etc.
 * Aplica estilos globales de fondo oscuro (bg-[var(--color-luxxor-dark)]).
 */
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

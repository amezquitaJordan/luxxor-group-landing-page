/*
 * Archivo: components/Footer.tsx
 * Componente: Footer
 * Propósito: Pie de página central de toda la aplicación.
 * Aloja ligas a secciones importantes, información oficial del negocio e iconos de RRSS.
 */
"use client";

import { Instagram, MapPin, Phone, Mail } from "lucide-react";

/* Componente estructurado estáticamente, utiliza marcadores HTML5 semánticos y rejilla densa (grid). */
export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[var(--color-luxxor-gold)]/30 pt-20 pb-10">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 lg:col-span-1">
            <h2 className="text-3xl font-serif text-[var(--color-luxxor-gold)] mb-6 uppercase tracking-widest">
              Luxxor Group
            </h2>
            <p className="text-gray-400 font-light text-sm leading-relaxed mb-6">
              Empresa especializada en remodelaciones residenciales premium, diseño de interiores, carpintería arquitectónica a medida y restauración de mobiliario de alta gama.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://instagram.com/luxxorcol" target="_blank" rel="noopener noreferrer" className="p-2 border border-gray-800 text-gray-400 hover:text-[var(--color-luxxor-gold)] hover:border-[var(--color-luxxor-gold)] transition-colors duration-300 rounded-full">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-serif text-white mb-6 uppercase tracking-wider">Enlaces</h3>
            <ul className="space-y-4 text-sm text-gray-400 font-light">
              <li><a href="#sobre-nosotros" className="hover:text-[var(--color-luxxor-gold)] transition-colors">Sobre Nosotros</a></li>
              <li><a href="#por-que-elegirnos" className="hover:text-[var(--color-luxxor-gold)] transition-colors">La Ventaja Luxxor</a></li>
              <li><a href="#servicios" className="hover:text-[var(--color-luxxor-gold)] transition-colors">Servicios Premium</a></li>
              <li><a href="#proyectos" className="hover:text-[var(--color-luxxor-gold)] transition-colors">Portafolio</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1 lg:col-span-2">
            <h3 className="text-lg font-serif text-white mb-6 uppercase tracking-wider">Contacto Oficial</h3>
            <ul className="space-y-4 text-sm text-gray-400 font-light">
              <li className="flex items-start gap-4">
                <MapPin size={20} className="text-[var(--color-luxxor-gold)] flex-shrink-0 mt-1" />
                <span>Barrio La Flora<br />Calle 44N No 4N-05 2do piso<br />Cali, Valle del Cauca, Colombia</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone size={20} className="text-[var(--color-luxxor-gold)] flex-shrink-0" />
                <a href="tel:+573170303333" className="hover:text-white transition-colors">+57 317 0303333</a>
              </li>
              <li className="flex items-center gap-4">
                <Mail size={20} className="text-[var(--color-luxxor-gold)] flex-shrink-0" />
                <a href="mailto:info@luxxorgroup.com" className="hover:text-white transition-colors">info@luxxorgroup.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 font-light">
          <p>&copy; 2026 Luxxor Group. Todos los derechos reservados.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Política de Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Términos de Servicio</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

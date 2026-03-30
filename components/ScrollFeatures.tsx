"use client";

import React, { useEffect, useState } from "react";
import { LazyMotion, domAnimation, m, useScroll, useTransform, AnimatePresence } from "framer-motion";

export default function ScrollFeatures() {
  const { scrollYProgress } = useScroll();
  const [showBackToTop, setBackToTop] = useState(false);

  // Transform scaleX for the progress bar based on scroll position
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  // Opacidad del progress bar (30% inactivo, hasta 100% activo)
  const opacity = useTransform(scrollYProgress, [0, 0.05], [0.3, 1]);

  useEffect(() => {
    // Show back-to-top button when scrolled past 50% of the page
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // If we scroll past 50%
      if (latest > 0.5) {
        setBackToTop(true);
      } else {
        setBackToTop(false);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <LazyMotion features={domAnimation}>
      {/* Scroll Progress Bar */}
      <m.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-[#D4AF37] z-[100] origin-left pointer-events-none shadow-[0_2px_10px_rgba(212,175,55,0.4)]"
        style={{ scaleX, opacity }}
      />

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <m.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={scrollToTop}
            aria-label="Volver arriba"
            // Ubicación: bottom right, above WhatsApp (usually bottom-6)
            className="fixed bottom-28 right-6 md:right-8 z-[90] flex items-center justify-center w-12 h-12 rounded-full bg-[#121212] border-[1.5px] border-[#D4AF37]/50 text-[#D4AF37] shadow-[0_0_20px_-5px_rgba(212,175,55,0.4)] hover:shadow-[0_0_25px_-5px_rgba(212,175,55,0.6)] hover:-translate-y-1 transition-all duration-300 group outline-none"
          >
            {/* Inner Aura inside button on hover */}
            <div className="absolute inset-0 rounded-full bg-[#D4AF37]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-5 h-5 relative z-10" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </m.button>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}

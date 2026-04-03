"use client";

import React, { useState, useEffect } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import FloatingWhatsApp from "./FloatingWhatsApp";
import { Sun, Moon, ArrowUp } from "lucide-react";

export default function FloatingControls() {
  const { theme, toggleTheme } = useTheme();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleChatbotState = (e: Event) => {
      const customEvent = e as CustomEvent<{ isOpen: boolean }>;
      setIsChatbotOpen(customEvent.detail.isOpen);
    };
    window.addEventListener("chatbot-state-change", handleChatbotState);
    return () => window.removeEventListener("chatbot-state-change", handleChatbotState);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Mostrar Botón de Volver Arriba si ha bajado 400px
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {!isChatbotOpen && (
          <m.div
            className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-50 flex flex-col-reverse items-center gap-4"
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.92 }}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          >
            {/* 1. WhatsApp Button (Bottom-most) */}
            <FloatingWhatsApp isContainerOpen={!isChatbotOpen} />

            {/* 2. Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Alternar Tema"
              className="w-[56px] h-[56px] rounded-full bg-[var(--theme-bg-surface)] text-[var(--theme-text-primary)] border border-[var(--theme-border)] shadow-lg hover:shadow-xl hover:border-[var(--color-luxxor-gold)] flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <AnimatePresence mode="wait">
                <m.div
                  key={theme}
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.3 }}
                >
                  {theme === "light" ? (
                    <Moon size={24} className="text-gray-700" />
                  ) : (
                    <Sun size={24} className="text-[var(--color-luxxor-gold)]" />
                  )}
                </m.div>
              </AnimatePresence>
            </button>

            {/* 3. Back to Top Button */}
            <AnimatePresence>
              {showScrollTop && (
                <m.button
                  onClick={scrollToTop}
                  aria-label="Volver arriba"
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5, y: 20 }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 20 }}
                  className="w-[56px] h-[56px] rounded-full bg-[var(--theme-bg-surface)] text-[var(--theme-text-primary)] border border-[var(--theme-border)] shadow-lg hover:shadow-xl hover:border-[var(--color-luxxor-gold)] flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <ArrowUp size={24} className="text-[var(--theme-text-primary)]" />
                </m.button>
              )}
            </AnimatePresence>
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}

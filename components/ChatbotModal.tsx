/*
 * Archivo: components/ChatbotModal.tsx
 * Componente: ChatbotModal
 * Propósito: Interfaz del asistente virtual ("Lia") potenciado por IA (Gemini/API custom).
 * Permite a los usuarios interactuar con el bot y recibir respuestas en tiempo real.
 * Emite eventos globales (chatbot-state-change) para orquestar la UI con otros componentes 
 * (ej: FloatingWhatsApp).
 */
"use client";

import React, { useState, useRef, useEffect } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import { X, Send, User, Sparkles, Loader2 } from "lucide-react";

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
}

/*
 * Componente principal ChatbotModal
 * Props: isOpen, onClose.
 * Estado interno: 
 *  - messages: Historial de la conversación (usuario vs bot).
 *  - inputValue: Texto escrito por el usuario actualmente.
 *  - isTyping: Indicador de carga realista tipo humano.
 */
export default React.memo(function ChatbotModal({ isOpen, onClose }: ChatbotModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "¡Hola! Soy Lia, la Asistente Virtual Premium de Luxxor Group. ¿En qué te puedo ayudar hoy con tu proyecto de remodelación o diseño?",
      sender: "bot",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('chatbot-state-change', { detail: { isOpen } }));
  }, [isOpen]);

  /* 
   * Manejador central del envío de mensajes:
   * 1. Añade el mensaje localmente.
   * 2. Prepara el historial ajustando el rol para cumplir con los requisitos de la API.
   * 3. Llama al endpoint (/api/chat) de manera asincrónica simulando tiempo humano de tipeo.
   * 4. Ajusta la lista añadiendo el nuevo mensaje de bot finalmente.
   */
  // Handle Input Submit
  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), text: inputValue.trim(), sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Solo se envían los últimos 6 mensajes: el servidor limita el tamaño del cuerpo a 16 KB.
    const historyForApi = messages.slice(-6).map(m => ({
      role: m.sender === "user" ? "user" : "model",
      content: m.text
    }));

    // El historial enviado al servidor debe comenzar obligatoriamente con un rol de usuario
    if (historyForApi.length > 0 && historyForApi[0].role === "model") {
      historyForApi.shift();
    }

    try {
      // Simulate realism typing delay based on requirement (1.0 - 1.8s)
      const realisticDelay = Math.random() * 800 + 1000;
      
      const [response] = await Promise.all([
        fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userMsg.text, chatHistory: historyForApi }),
        }),
        new Promise((resolve) => setTimeout(resolve, realisticDelay)) // ensures minimum typed delay
      ]);

      const data = await response.json().catch(() => null);

      // Límite de mensajes (429) o mensaje demasiado largo (413): se muestra el aviso del servidor.
      if ((response.status === 429 || response.status === 413) && typeof data?.error === "string") {
        setMessages((prev) => [
          ...prev,
          { id: Date.now().toString(), text: data.error, sender: "bot" }
        ]);
        return;
      }

      if (!response.ok || !data) {
        throw new Error("Failed connecting to API");
      }
      
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), text: data.response || data.message, sender: "bot" }
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: "Lo siento, tuve un problema de conexión. Por favor, intenta de nuevo.",
          sender: "bot",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" style={{ pointerEvents: 'auto' }}>
            {/* Backdrop */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/*
             * Modal Content
             * OPTIMIZACIÓN DESKTOP (lg+): Modal redimensionado para Desktop.
             * lg:max-w-5xl (1024px) era demasiado ancho — casi toda la pantalla en 1366px.
             * Se reduce a xl:max-w-2xl (672px) para proporciones premium y elegantes.
             * lg:h-[620px] + max-h evita desbordamiento en pantallas de 768px de alto.
             * Beneficio: Modal centrado, cómodo y sin tapar el botón de WhatsApp.
             */}
            <m.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg lg:max-w-xl xl:max-w-2xl bg-[var(--theme-bg-surface)] transition-colors duration-700 border border-[var(--theme-border)] shadow-2xl overflow-hidden flex flex-col pt-0 rounded-2xl h-[85vh] sm:h-[600px] lg:h-[620px] lg:max-h-[78vh] xl:h-[680px] xl:max-h-[82vh]"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[var(--theme-border)] bg-[var(--theme-bg-surface)] transition-colors duration-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[var(--color-luxxor-gold)] to-yellow-200 flex items-center justify-center p-0.5 shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                    <div className="w-full h-full bg-[#111] rounded-full flex flex-col items-center justify-center text-[var(--color-luxxor-gold)]">
                      <span className="text-[10px] font-bold font-serif leading-none tracking-tighter">LX</span>
                      <Sparkles className="w-3 h-3 mt-0.5 text-[var(--theme-text-primary)]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[var(--theme-text-primary)] font-medium flex items-center gap-2">
                      Asistente Luxxor IA
                    </h3>
                    <span className="text-xs text-[var(--color-luxxor-gold)] flex items-center gap-1.5 font-light">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_#22c55e] animate-pulse" />
                      En línea
                    </span>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] rounded-full hover:bg-[var(--theme-bg-primary)] transition-colors focus:outline-none"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Area */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 scrollbar-thin scrollbar-thumb-[#333] scrollbar-track-transparent">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} font-light`}
                  >
                    <div className={`flex max-w-[85%] gap-3 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                      
                      {/* Avatar */}
                      <div className="flex-shrink-0 mt-1">
                        {msg.sender === "bot" ? (
                          <div className="w-8 h-8 rounded-full bg-[var(--color-luxxor-gold)] flex items-center justify-center text-[#111]">
                            <span className="text-xs font-bold font-serif tracking-tighter">LX</span>
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-[var(--theme-bg-primary)] border border-[var(--theme-border)] flex items-center justify-center text-[var(--theme-text-secondary)]">
                            <User className="w-4 h-4" />
                          </div>
                        )}
                      </div>

                      {/* Bubble */}
                      <div
                        className={`p-3.5 rounded-2xl transition-colors duration-700 ${
                          msg.sender === "user"
                            ? "bg-[var(--color-luxxor-gold)] text-[#111] rounded-tr-sm"
                            : "bg-[var(--theme-bg-primary)] border border-[var(--theme-border)] text-[var(--theme-text-primary)] rounded-tl-sm shadow-sm"
                        }`}
                      >
                        {/* Check if response shows contact buttons */}
                        {msg.text.includes("¡Gracias por tu consulta!") ? (
                           <div className="space-y-4">
                              <p className="leading-relaxed text-[0.95rem]">¡Gracias por tu consulta! 😊</p>
                              <div className="flex flex-col gap-2 pt-2 border-t border-[var(--color-luxxor-gold)]/20">
                                <a href="https://www.instagram.com/luxxor_group/" target="_blank" rel="noreferrer" className="text-center w-full py-2.5 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:opacity-90 transition-opacity rounded-lg text-sm font-medium text-white shadow-md flex items-center justify-center gap-2">Síguenos en Instagram</a>
                                <a href="https://wa.me/573170303333" target="_blank" rel="noreferrer" className="text-center w-full py-2.5 bg-[#25D366] hover:bg-[#128C7E] transition-colors rounded-lg text-sm font-medium text-white shadow-md flex items-center justify-center gap-2">Escríbenos por WhatsApp</a>
                              </div>
                           </div>
                        ) : (
                           <p className="leading-relaxed text-[0.95rem] whitespace-pre-wrap">{msg.text}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex max-w-[85%] gap-3 flex-row">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-8 h-8 rounded-full bg-[var(--color-luxxor-gold)]/80 flex items-center justify-center text-[#111]">
                          <Loader2 className="w-4 h-4 animate-spin text-[#111]" />
                        </div>
                      </div>
                      <div className="p-4 rounded-2xl bg-[#1a1a1a] rounded-tl-sm border border-[var(--color-luxxor-gold)]/20 flex items-center gap-1.5 h-[46px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-luxxor-gold)] animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-luxxor-gold)] animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-luxxor-gold)] animate-bounce" style={{ animationDelay: '300ms' }}></span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 bg-[var(--theme-bg-surface)] border-t border-[var(--theme-border)] transition-colors duration-700">
                <form
                  onSubmit={handleSendMessage}
                  className="relative flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    maxLength={500}
                    placeholder="Escribe tu duda aquí..."
                    className="w-full bg-[var(--theme-bg-primary)] border border-[var(--theme-border)] focus:border-[var(--color-luxxor-gold)] text-[var(--theme-text-primary)] rounded-full pl-5 pr-12 py-3.5 outline-none transition-all placeholder:text-[var(--theme-text-secondary)] font-light text-[0.95rem]"
                    disabled={isTyping}
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isTyping}
                    className="absolute right-1.5 p-2.5 bg-[var(--color-luxxor-gold)] rounded-full text-[#111] hover:bg-yellow-400 disabled:opacity-50 disabled:hover:bg-[var(--color-luxxor-gold)] transition-colors focus:outline-none"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
                <div className="text-center mt-2.5">
                 <span className="text-[10px] text-[var(--theme-text-secondary)] transition-colors duration-700 font-light">La IA puede cometer errores. Considera verificar la información importante.</span>
                </div>
              </div>
            </m.div>
          </div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
});

"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

export default function ChatbotModal({ isOpen, onClose }: ChatbotModalProps) {
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

  // Handle Input Submit
  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), text: inputValue.trim(), sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    const historyForApi = messages.map(m => ({
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

      if (!response.ok) {
        throw new Error("Failed connecting to API");
      }
      
      const data = await response.json();
      
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), text: data.message, sender: "bot" }
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
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" style={{ pointerEvents: 'auto' }}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-[#111111] border border-[var(--color-luxxor-gold)]/30 shadow-2xl overflow-hidden flex flex-col pt-0 rounded-2xl h-[85vh] sm:h-[600px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[var(--color-luxxor-gold)]/20 bg-gradient-to-r from-[#1a1a1a] to-[#111111]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[var(--color-luxxor-gold)] to-yellow-200 flex items-center justify-center p-0.5 shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                  <div className="w-full h-full bg-[#111] rounded-full flex flex-col items-center justify-center text-[var(--color-luxxor-gold)]">
                    <span className="text-[10px] font-bold font-serif leading-none tracking-tighter">LX</span>
                    <Sparkles className="w-3 h-3 mt-0.5 text-white/80" />
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-medium flex items-center gap-2">
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
                className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/5 transition-colors focus:outline-none"
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
                        <div className="w-8 h-8 rounded-full bg-[#333] flex items-center justify-center text-gray-300">
                          <User className="w-4 h-4" />
                        </div>
                      )}
                    </div>

                    {/* Bubble */}
                    <div
                      className={`p-3.5 rounded-2xl ${
                        msg.sender === "user"
                          ? "bg-[#222] text-white rounded-tr-sm border border-white/5"
                          : "bg-gradient-to-br from-[#1a1a1a] to-[#141414] text-gray-200 rounded-tl-sm border border-[var(--color-luxxor-gold)]/20 shadow-[0_5px_15px_rgba(0,0,0,0.3)]"
                      }`}
                    >
                      {/* Check if response shows contact buttons */}
                      {msg.text.includes("Fue un placer") ? (
                         <div className="space-y-4">
                            <p className="leading-relaxed text-[0.95rem]">{msg.text}</p>
                            <div className="flex flex-col gap-2 pt-2 border-t border-[var(--color-luxxor-gold)]/20">
                              <a href="https://instagram.com/luxxorcol" target="_blank" rel="noreferrer" className="text-center w-full py-2 bg-[#222] hover:bg-[#333] transition-colors rounded-lg text-sm flex items-center justify-center gap-2 border border-white/10">Instagram @luxxorcol</a>
                              <a href="https://wa.me/573187517172" target="_blank" rel="noreferrer" className="text-center w-full py-2 bg-green-600/20 hover:bg-green-600/30 text-green-400 border border-green-500/30 transition-colors rounded-lg text-sm flex items-center justify-center gap-2">WhatsApp Directo</a>
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
            <div className="p-4 bg-[#141414] border-t border-white/10">
              <form
                onSubmit={handleSendMessage}
                className="relative flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Escribe tu duda aquí..."
                  className="w-full bg-[#1a1a1a] border border-[#333] focus:border-[var(--color-luxxor-gold)] text-white rounded-full pl-5 pr-12 py-3.5 outline-none transition-all placeholder:text-gray-500 font-light text-[0.95rem]"
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
               <span className="text-[10px] text-gray-500 font-light">La IA puede cometer errores. Considera verificar la información importante.</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

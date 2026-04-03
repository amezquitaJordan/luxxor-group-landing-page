"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only access localStorage on client mount
    /* Usar light por defecto */
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    const initialTheme = storedTheme || "light";
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  // By always providing the context, we prevent SSR crashes when children call useTheme.
  // The actual theme state is 'light' initially on server to match the default.
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div style={{ visibility: mounted ? "visible" : "hidden", display: "contents" }} className={!mounted ? "opacity-0" : "opacity-100 transition-opacity duration-300"}>
         {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Lang = "en" | "es";

interface LangCtx {
  lang: Lang;
  toggle: () => void;
}

const Ctx = createContext<LangCtx>({ lang: "en", toggle: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-lang") as Lang | null;
    if (saved === "en" || saved === "es") setLang(saved);
  }, []);

  const toggle = () => {
    setLang((l) => {
      const next: Lang = l === "en" ? "es" : "en";
      localStorage.setItem("portfolio-lang", next);
      return next;
    });
  };

  return <Ctx.Provider value={{ lang, toggle }}>{children}</Ctx.Provider>;
}

export function useLang() {
  return useContext(Ctx);
}

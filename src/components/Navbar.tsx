"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { useLang } from "@/lib/lang";
import { t } from "@/content/translations";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { lang, toggle } = useLang();
  const tx = t[lang].nav;

  const links = [
    { href: "/#about", label: tx.about },
    { href: "/#experience", label: tx.experience },
    { href: "/#skills", label: tx.skills },
    { href: "/#projects", label: tx.projects },
    { href: "/#contact", label: tx.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while drawer open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled || open
          ? "backdrop-blur-xl bg-bg/80 border-b border-border"
          : "bg-transparent"
      )}
    >
      <nav className="container-page flex h-16 items-center justify-between relative">
        <Link
          href="/"
          aria-label="Home"
          onClick={() => setOpen(false)}
          className="group inline-flex items-center justify-center h-9 w-9 rounded-lg border border-border bg-bg-elev/60 backdrop-blur-md font-mono text-xs font-semibold text-ink hover:border-accent hover:text-accent transition-colors"
        >
          AV
        </Link>
        <ul className="hidden md:flex items-center gap-8 text-sm text-ink-muted">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="link-underline">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          {/* Language toggle */}
          <div className="flex items-center rounded-full border border-border overflow-hidden text-xs font-mono">
            <button
              onClick={() => lang !== "en" && toggle()}
              aria-label="Switch to English"
              className={cn(
                "px-2.5 py-1 transition-colors",
                lang === "en"
                  ? "bg-accent/20 text-accent"
                  : "text-ink-muted hover:text-accent"
              )}
            >
              🇺🇸
            </button>
            <div className="w-px h-4 bg-border" />
            <button
              onClick={() => lang !== "es" && toggle()}
              aria-label="Cambiar a español"
              className={cn(
                "px-2.5 py-1 transition-colors",
                lang === "es"
                  ? "bg-accent/20 text-accent"
                  : "text-ink-muted hover:text-accent"
              )}
            >
              🇪🇸
            </button>
          </div>

          <a
            href="/Alexandre_Vives_resume.pdf"
            target="_blank"
            rel="noopener"
            className="btn-ghost text-xs max-md:absolute max-md:left-1/2 max-md:-translate-x-1/2"
          >
            Resume ↗
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-lg border border-border bg-bg-elev/60 backdrop-blur-md text-ink hover:border-accent hover:text-accent transition-colors"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-[max-height] duration-300 ease-out",
          open ? "max-h-96" : "max-h-0"
        )}
      >
        <ul className="container-page py-4 flex flex-col gap-1 text-sm">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-3 text-ink-muted hover:bg-bg-elev hover:text-accent transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}


  // Lock body scroll while drawer open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled || open
          ? "backdrop-blur-xl bg-bg/80 border-b border-border"
          : "bg-transparent"
      )}
    >
      <nav className="container-page flex h-16 items-center justify-between relative">
        <Link
          href="/"
          aria-label="Home"
          onClick={() => setOpen(false)}
          className="group inline-flex items-center justify-center h-9 w-9 rounded-lg border border-border bg-bg-elev/60 backdrop-blur-md font-mono text-xs font-semibold text-ink hover:border-accent hover:text-accent transition-colors"
        >
          AV
        </Link>
        <ul className="hidden md:flex items-center gap-8 text-sm text-ink-muted">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="link-underline">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <a
            href="/Alexandre_Vives_resume.pdf"
            target="_blank"
            rel="noopener"
            className="btn-ghost text-xs max-md:absolute max-md:left-1/2 max-md:-translate-x-1/2"
          >
            Resume ↗
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-lg border border-border bg-bg-elev/60 backdrop-blur-md text-ink hover:border-accent hover:text-accent transition-colors"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-[max-height] duration-300 ease-out",
          open ? "max-h-96" : "max-h-0"
        )}
      >
        <ul className="container-page py-4 flex flex-col gap-1 text-sm">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-3 text-ink-muted hover:bg-bg-elev hover:text-accent transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "backdrop-blur-xl bg-bg/70 border-b border-border"
          : "bg-transparent"
      )}
    >
      <nav className="container-page flex h-16 items-center justify-between">
        <Link
          href="/"
          aria-label="Home"
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
        <a
          href="/Alexandre_Vives_resume.pdf"
          target="_blank"
          rel="noopener"
          className="btn-ghost text-xs"
        >
          Resume ↗
        </a>
      </nav>
    </header>
  );
}

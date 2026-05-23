"use client";
import { human } from "@/content/profile";
import { Github, Linkedin, Mail } from "lucide-react";
import { useLang } from "@/lib/lang";
import { t } from "@/content/translations";

export function Footer() {
  const { lang } = useLang();
  const tx = t[lang].footer;

  return (
    <footer className="border-t border-border mt-24">
      <div className="container-page py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <p className="font-mono text-xs text-ink-subtle">
            © {new Date().getFullYear()} {human.name}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <a
            href={`mailto:${human.email}`}
            aria-label="Email"
            className="text-ink-muted hover:text-accent transition-colors"
          >
            <Mail className="h-5 w-5" />
          </a>
          <a
            href={human.linkedin}
            target="_blank"
            rel="noopener"
            aria-label="LinkedIn"
            className="text-ink-muted hover:text-accent transition-colors"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href={human.github}
            target="_blank"
            rel="noopener"
            aria-label="GitHub"
            className="text-ink-muted hover:text-accent transition-colors"
          >
            <Github className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}

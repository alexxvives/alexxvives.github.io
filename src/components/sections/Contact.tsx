import { Reveal } from "@/components/Reveal";
import { human } from "@/content/profile";
import { Mail, Linkedin, Github, ArrowRight } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="section">
      <Reveal>
        <div className="card p-10 sm:p-14 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-fade pointer-events-none" />
          <div className="relative">
            <p className="eyebrow justify-center">05 — Contact</p>
            <h2 className="h2 mt-4 max-w-2xl mx-auto">
              Have a problem worth modeling?
            </h2>
            <p className="text-ink-muted mt-4 max-w-lg mx-auto">
              I&apos;m always interested in causal inference, ML at scale, and applied AI
              problems. Drop me a line — I read everything.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a href={`mailto:${human.email}`} className="btn-primary">
                {human.email} <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-ink-muted">
              <a
                href={human.linkedin}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 hover:text-accent transition-colors"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
              <a
                href={human.github}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 hover:text-accent transition-colors"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
              <a
                href={`mailto:${human.email}`}
                className="inline-flex items-center gap-2 hover:text-accent transition-colors"
              >
                <Mail className="h-4 w-4" /> Email
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

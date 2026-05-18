"use client";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import type { Project } from "@/content/projects";
import { getProjectImage } from "@/content/projectImages";
import { CaseStudyVisual } from "@/components/charts/CaseStudyVisual";
import { useLang } from "@/lib/lang";
import { t } from "@/content/translations";

export function ProjectDetail({
  project,
  next,
}: {
  project: Project;
  next: Project;
}) {
  const { lang } = useLang();
  const tx = t[lang].article;

  return (
    <article className="pt-32 pb-16">
      <div className="container-page">
        {/* Back */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-accent transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> {tx.allProjects}
        </Link>

        {/* Header */}
        <header className="mt-10 max-w-3xl">
          <div className="font-mono text-xs uppercase tracking-widest text-accent">
            {project.category} · {project.date} · {project.org}
          </div>
          <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mt-4">{project.title}</h1>
          <p className="mt-6 text-lg text-ink-muted leading-relaxed">
            {project.blurb}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {project.link && (
              <a
                href={project.link.href}
                target="_blank"
                rel="noopener"
                className="btn-ghost text-xs"
              >
                <ExternalLink className="h-3.5 w-3.5" /> {project.link.label}
              </a>
            )}
          </div>
        </header>

        {/* Hero image (splash) */}
        {getProjectImage(project.slug) && (
          <div className="mt-12 relative overflow-hidden rounded-2xl border border-border bg-bg-elev aspect-[16/8]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getProjectImage(project.slug)}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent" />
          </div>
        )}

        {/* Custom visualizations */}
        {project.hasCustomVisual && (
          <div className="mt-16">
            <CaseStudyVisual slug={project.slug} />
          </div>
        )}

        {/* Body with sticky TOC on lg+ */}
        <div className="mt-16 lg:grid lg:grid-cols-[180px_1fr] lg:gap-12 lg:max-w-[900px] lg:mx-auto">
          <aside className="hidden lg:block">
            <nav className="sticky top-32 space-y-2 font-mono text-xs">
              <div className="text-ink-subtle uppercase tracking-widest text-[10px] mb-3">
                {tx.onThisPage}
              </div>
              <a href="#problem" className="block text-ink-muted hover:text-accent transition-colors">01 · {project.sectionLabels?.problem ?? tx.problem}</a>
              <a href="#approach" className="block text-ink-muted hover:text-accent transition-colors">02 · {project.sectionLabels?.approach ?? tx.approach}</a>
              <a href="#results" className="block text-ink-muted hover:text-accent transition-colors">03 · {project.sectionLabels?.results ?? tx.results}</a>
              {project.learnings && project.learnings.length > 0 && (
                <a href="#learnings" className="block text-ink-muted hover:text-accent transition-colors">04 · {project.sectionLabels?.learnings ?? tx.learnings}</a>
              )}
            </nav>
          </aside>

          <div className="min-w-0 max-w-[72ch]">
            <Section id="problem" title={project.sectionLabels?.problem ?? tx.problem} eyebrow="01">
              <p className="prose-text" dangerouslySetInnerHTML={{ __html: renderInline(project.problem) }} />
            </Section>

            <Section id="approach" title={project.sectionLabels?.approach ?? tx.approach} eyebrow="02">
              <ol className="space-y-6 list-none">
                {(() => {
                  let n = 0;
                  return project.approach.map((step, i) => {
                    if (step.startsWith("> ")) {
                      return (
                        <li key={i}>
                          <div className="border-l-2 border-accent/40 pl-5 py-2 my-1 bg-bg-elev/30 rounded-r-lg">
                            <p className="prose-text italic text-ink/70" dangerouslySetInnerHTML={{ __html: renderInline(step.slice(2)) }} />
                          </div>
                        </li>
                      );
                    }
                    n++;
                    return (
                      <li key={i} className="flex gap-4">
                        <span className="font-mono text-xs text-accent shrink-0 mt-[0.35rem] w-6">{String(n).padStart(2, "0")}</span>
                        <span className="prose-text flex-1" dangerouslySetInnerHTML={{ __html: renderInline(step) }} />
                      </li>
                    );
                  });
                })()}
              </ol>
            </Section>

            <Section id="results" title={project.sectionLabels?.results ?? tx.results} eyebrow="03">
              <ul className="space-y-4 list-none">
                {project.results.map((r, i) => {
                  if (r.startsWith("> ")) {
                    return (
                      <li key={i}>
                        <div className="border-l-2 border-accent/40 pl-5 py-2 my-1 bg-bg-elev/30 rounded-r-lg">
                          <p className="prose-text italic text-ink/70" dangerouslySetInnerHTML={{ __html: renderInline(r.slice(2)) }} />
                        </div>
                      </li>
                    );
                  }
                  return (
                    <li key={i} className="flex gap-3 items-start">
                      <span className="text-accent mt-[0.35rem] shrink-0">→</span>
                      <span className="prose-text flex-1" dangerouslySetInnerHTML={{ __html: renderInline(r) }} />
                    </li>
                  );
                })}
              </ul>
            </Section>

            {project.learnings && project.learnings.length > 0 && (
              <Section id="learnings" title={project.sectionLabels?.learnings ?? tx.learnings} eyebrow="04">
                <ul className="space-y-4 list-none">
                  {project.learnings.map((l, i) => {
                    if (l.startsWith("> ")) {
                      return (
                        <li key={i}>
                          <div className="border-l-2 border-accent/40 pl-5 py-2 my-1 bg-bg-elev/30 rounded-r-lg">
                            <p className="prose-text italic text-ink/70" dangerouslySetInnerHTML={{ __html: renderInline(l.slice(2)) }} />
                          </div>
                        </li>
                      );
                    }
                    return (
                      <li key={i} className="flex gap-3 items-start">
                        <span className="text-accent mt-[0.35rem] shrink-0">✦</span>
                        <span className="prose-text flex-1" dangerouslySetInnerHTML={{ __html: renderInline(l) }} />
                      </li>
                    );
                  })}
                </ul>
              </Section>
            )}
          </div>
        </div>

        {/* Next project */}
        <div className="mt-24 pt-12 border-t border-border">
          <Link
            href={`/projects/${next.slug}`}
            className="group block card p-8 hover:translate-y-[-2px]"
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-ink-subtle">
                  {tx.nextProject}
                </div>
                <h3 className="h3 mt-2 group-hover:text-accent transition-colors">
                  {next.title}
                </h3>
                <p className="text-sm text-ink-muted mt-2 line-clamp-2 max-w-lg">
                  {next.blurb}
                </p>
              </div>
              <ArrowUpRight className="h-6 w-6 text-ink-subtle group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0" />
            </div>
          </Link>
        </div>
      </div>
    </article>
  );
}

function Section({
  id,
  title,
  eyebrow,
  children,
}: {
  id?: string;
  title: string;
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mt-16 scroll-mt-32">
      <div className="flex items-baseline gap-4 mb-8">
        <span className="font-mono text-xs text-accent">{eyebrow}</span>
        <h2 className="h3">{title}</h2>
      </div>
      <div>{children}</div>
    </section>
  );
}

// Inline markdown: **bold**, _italic_, `code`
function renderInline(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-ink font-semibold">$1</strong>')
    .replace(/_([^_\n]{2,300})_/g, '<em class="italic text-ink/80">$1</em>')
    .replace(/`([^`]+)`/g, '<code class="font-mono text-xs text-accent bg-bg-elev px-1.5 py-0.5 rounded">$1</code>');
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import { getProject, projects } from "@/content/projects";
import { getProjectImage } from "@/content/projectImages";
import { CaseStudyVisual } from "@/components/charts/CaseStudyVisual";
import type { Metadata } from "next";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.title} — Alexandre Vives`,
    description: project.blurb,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <article className="pt-32 pb-16">
      <div className="container-page max-w-5xl">
        {/* Back */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-accent transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> All projects
        </Link>

        {/* Header */}
        <header className="mt-10">
          <div className="font-mono text-xs uppercase tracking-widest text-accent">
            {project.category} · {project.date} · {project.org}
          </div>
          <h1 className="h1 mt-4">{project.title}</h1>
          <p className="mt-6 text-xl text-ink-muted leading-relaxed">
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

        {/* Impact */}
        {project.impact && project.impact.length > 0 && (
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {project.impact.map((m) => (
              <div key={m.label} className="card p-5">
                <div className="font-mono text-3xl text-accent font-semibold">
                  {m.value}
                </div>
                <div className="text-[11px] uppercase tracking-widest text-ink-subtle mt-1">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        )}

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

        {/* Sections */}
        <Section title="Problem" eyebrow="01">
          <p className="prose-text">{project.problem}</p>
        </Section>

        <Section title="Approach" eyebrow="02">
          <ol className="space-y-4">
            {project.approach.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="font-mono text-xs text-accent shrink-0 mt-1.5 w-6">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="prose-text flex-1"
                  dangerouslySetInnerHTML={{ __html: renderInline(step) }}
                />
              </li>
            ))}
          </ol>
        </Section>

        <Section title="Results" eyebrow="03">
          <ul className="space-y-3">
            {project.results.map((r, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-accent mt-1.5">→</span>
                <span
                  className="prose-text flex-1"
                  dangerouslySetInnerHTML={{ __html: renderInline(r) }}
                />
              </li>
            ))}
          </ul>
        </Section>

        {project.learnings && project.learnings.length > 0 && (
          <Section title="Learnings" eyebrow="04">
            <ul className="space-y-3">
              {project.learnings.map((l, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-accent mt-1.5">✦</span>
                  <span className="prose-text flex-1">{l}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* Next project */}
        <div className="mt-24 pt-12 border-t border-border">
          <Link
            href={`/projects/${next.slug}`}
            className="group block card p-8 hover:translate-y-[-2px]"
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-ink-subtle">
                  Next project
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
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-16">
      <div className="flex items-baseline gap-4 mb-6">
        <span className="font-mono text-xs text-accent">{eyebrow}</span>
        <h2 className="h3">{title}</h2>
      </div>
      <div className="text-ink-muted text-base leading-relaxed">{children}</div>
    </section>
  );
}

// Minimal inline markdown: **bold** and `code`
function renderInline(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-ink font-semibold">$1</strong>')
    .replace(/`([^`]+)`/g, '<code class="font-mono text-xs text-accent bg-bg-elev px-1.5 py-0.5 rounded">$1</code>');
}

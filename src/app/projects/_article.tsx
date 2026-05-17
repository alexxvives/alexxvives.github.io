import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getProject } from "@/content/projects";

// ── Layout ─────────────────────────────────────────────────────────────────────

export function Prose({ children }: { children: ReactNode }) {
  return <div className="max-w-[840px] mx-auto px-5 sm:px-8 lg:px-10">{children}</div>;
}

export function Wide({ children }: { children: ReactNode }) {
  return <div className="max-w-5xl mx-auto my-10 px-5 sm:px-8 lg:px-10">{children}</div>;
}

// ── Inline typography ──────────────────────────────────────────────────────────

export function B({ children }: { children: ReactNode }) {
  return <strong className="text-ink font-semibold">{children}</strong>;
}
export function Em({ children }: { children: ReactNode }) {
  return <em className="italic text-ink/80">{children}</em>;
}
export function C({ children }: { children: ReactNode }) {
  return (
    <code className="font-mono text-xs text-accent bg-bg-elev px-1.5 py-0.5 rounded">
      {children}
    </code>
  );
}

// ── Headings ───────────────────────────────────────────────────────────────────

export function SH({
  id,
  step,
  children,
}: {
  id: string;
  step: string;
  children: ReactNode;
}) {
  return (
    <div id={id} className="scroll-mt-32 mt-20 mb-6">
      <p className="font-mono text-xs text-accent mb-2">{step}</p>
      <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-ink">
        {children}
      </h2>
    </div>
  );
}

export function SH3({ children }: { children: ReactNode }) {
  return (
    <h3 className="font-display text-base font-semibold tracking-tight mt-10 mb-3 text-ink/90">
      {children}
    </h3>
  );
}

// ── Paragraph ──────────────────────────────────────────────────────────────────

export function P({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={`prose-text mt-5 ${className}`}>{children}</p>;
}

// ── Callout ────────────────────────────────────────────────────────────────────

export function Callout({ children }: { children: ReactNode }) {
  return (
    <div className="my-8 border-l-2 border-accent/50 pl-6 py-1 bg-bg-elev/30 rounded-r-xl">
      <p className="text-[1.0625rem] leading-[1.9] tracking-[0.005em] italic text-ink/70">
        {children}
      </p>
    </div>
  );
}

// ── OptionBox ──────────────────────────────────────────────────────────────────

export function OptionBox({
  title,
  options,
  chosenLabel,
  reason,
}: {
  title: string;
  options: { label: string; desc: string }[];
  chosenLabel: string;
  reason: string;
}) {
  return (
    <div className="my-8 rounded-2xl border border-border bg-bg-card p-6">
      <p className="font-mono text-[10px] uppercase tracking-widest text-ink-subtle mb-4">
        {title}
      </p>
      <div className="grid sm:grid-cols-2 gap-3 mb-5">
        {options.map((opt) => {
          const chosen = opt.label === chosenLabel;
          return (
            <div
              key={opt.label}
              className={`rounded-xl border p-4 ${
                chosen
                  ? "border-accent/50 bg-accent/5"
                  : "border-border/50 bg-bg-elev/30 opacity-60"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {chosen && (
                  <span className="text-[10px] font-mono uppercase tracking-wider text-accent">
                    ✓ chosen
                  </span>
                )}
                <span
                  className={`text-sm font-semibold ${
                    chosen ? "text-ink" : "text-ink-muted"
                  }`}
                >
                  {opt.label}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-ink-muted">{opt.desc}</p>
            </div>
          );
        })}
      </div>
      <p className="text-sm leading-relaxed text-ink-muted border-t border-border/40 pt-4">
        <span className="text-ink-subtle font-medium">Why: </span>
        {reason}
      </p>
    </div>
  );
}

// ── MetricStrip ────────────────────────────────────────────────────────────────

export function MetricStrip({
  metrics,
}: {
  metrics: { label: string; value: string; sub?: string }[];
}) {
  return (
    <div className="max-w-[840px] mx-auto px-5 sm:px-8 lg:px-10">
    <div className="my-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
      {metrics.map(({ label, value, sub }) => (
        <div
          key={label}
          className="rounded-xl border border-border bg-bg-card px-4 py-4 text-center"
        >
          <p className="font-display text-2xl font-bold text-accent">{value}</p>
          {sub && (
            <p className="font-mono text-xs text-ink-subtle mt-0.5">{sub}</p>
          )}
          <p className="text-[11px] text-ink-muted mt-1 leading-snug">{label}</p>
        </div>
      ))}
    </div>
    </div>
  );
}

// ── CheckList ─────────────────────────────────────────────────────────────────

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="my-6 space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-[1.0625rem] leading-[1.9] text-ink-muted">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" />
          {item}
        </li>
      ))}
    </ul>
  );
}

// ── NextProject ────────────────────────────────────────────────────────────────

export function NextProject({ slug }: { slug: string }) {
  const p = getProject(slug);
  if (!p) return null;
  return (
    <div className="max-w-[840px] mx-auto px-5 sm:px-8 lg:px-10">
    <div className="mt-24 pt-12 border-t border-border/40">
      <p className="font-mono text-xs uppercase tracking-widest text-ink-subtle mb-4">
        Next project
      </p>
      <Link
        href={`/projects/${p.slug}`}
        className="group flex items-start justify-between gap-6 rounded-2xl border border-border bg-bg-card p-6 hover:border-border-strong hover:bg-bg-elev transition-all"
      >
        <div>
          <p className="text-xs text-ink-subtle mb-1">
            {p.org} · {p.date}
          </p>
          <p className="font-display text-lg font-semibold text-ink group-hover:text-accent transition-colors">
            {p.title}
          </p>
          <p className="text-sm text-ink-muted mt-1 leading-relaxed line-clamp-2">
            {p.blurb}
          </p>
        </div>
        <ArrowUpRight className="h-5 w-5 shrink-0 text-ink-subtle group-hover:text-accent transition-colors mt-1" />
      </Link>
    </div>
    </div>
  );
}

// ── ArticleHeader ──────────────────────────────────────────────────────────────

export function ArticleHeader({
  eyebrow,
  title,
  subtitle,
  tags,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  tags: string[];
}) {
  return (
    <header className="max-w-[840px] mx-auto px-5 sm:px-8 lg:px-10 mt-10">
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-accent">
          {eyebrow}
        </p>
        <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight leading-[1.08] mt-4">
          {title}
        </h1>
        <p className="mt-5 text-lg text-ink-muted leading-relaxed">{subtitle}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span
              key={t}
              className="text-[11px] px-2.5 py-1 rounded-md bg-bg-elev border border-border text-ink-muted font-mono"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}

// ── BackLink ───────────────────────────────────────────────────────────────────

export function BackLink() {
  return (
    <div className="max-w-[840px] mx-auto px-5 sm:px-8 lg:px-10">
      <Link
        href="/#projects"
        className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-accent transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> All projects
      </Link>
    </div>
  );
}

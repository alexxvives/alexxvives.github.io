"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, type ProjectCategory } from "@/content/projects";
import { cn } from "@/lib/cn";

const categories: Array<"All" | ProjectCategory> = ["All", "Work", "Personal", "Research"];

export function Projects() {
  const [filter, setFilter] = useState<"All" | ProjectCategory>("All");

  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <section id="projects" className="section">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
        <div>
          <p className="eyebrow">03 — Projects</p>
          <h2 className="h2 mt-4">Selected work.</h2>
          <p className="text-ink-muted mt-3 max-w-xl">
            {projects.length} projects across production ML, applied research, hackathons
            and personal experiments. Filter or dive into a case study.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={cn(
                "rounded-full px-4 py-1.5 text-xs font-mono border transition-all",
                filter === c
                  ? "bg-accent text-bg border-accent"
                  : "border-border text-ink-muted hover:border-accent hover:text-accent"
              )}
            >
              {c}
              <span className="ml-1.5 opacity-60">
                {c === "All"
                  ? projects.length
                  : projects.filter((p) => p.category === c).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {visible.map((p, i) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.03, 0.3) }}
            >
              <Link
                href={`/projects/${p.slug}`}
                className="group block h-full card p-6 hover:translate-y-[-2px]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-accent">
                      {p.category} · {p.date}
                    </div>
                    <h3 className="mt-2 font-display text-lg font-semibold text-ink group-hover:text-accent transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-xs text-ink-subtle mt-0.5">{p.org}</p>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-ink-subtle group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                </div>

                <p className="mt-4 text-sm text-ink-muted leading-relaxed line-clamp-3">
                  {p.blurb}
                </p>

                {p.impact && p.impact.length > 0 && (
                  <div className="mt-5 pt-4 border-t border-border grid grid-cols-2 gap-3">
                    {p.impact.slice(0, 2).map((m) => (
                      <div key={m.label}>
                        <div className="font-mono text-base text-accent font-semibold">
                          {m.value}
                        </div>
                        <div className="text-[10px] uppercase tracking-wider text-ink-subtle leading-tight mt-0.5">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.tags.slice(0, 3).map((t) => (
                    <span key={t} className="chip">{t}</span>
                  ))}
                  {p.tags.length > 3 && (
                    <span className="chip">+{p.tags.length - 3}</span>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

"use client";
import { Reveal } from "@/components/Reveal";
import { skills, education, awards } from "@/content/profile";
import { useLang } from "@/lib/lang";
import { t, educationEs } from "@/content/translations";

export function Skills() {
  const { lang } = useLang();
  const tx = t[lang].skills;
  const edu = lang === "es" ? educationEs : education;

  return (
    <section id="skills" className="section">
      <Reveal>
        <p className="eyebrow">{tx.eyebrow}</p>
        <h2 className="h2 mt-4">{tx.headline}</h2>
      </Reveal>

      <div className="mt-8 sm:mt-14 grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-8">
        {/* Skills */}
        <Reveal className="lg:col-span-2">
          <div className="card p-4 sm:p-6 h-full">
            <h3 className="h3 mb-6">{tx.skillsTitle}</h3>
            <div className="space-y-5">
              {Object.entries(skills).map(([group, items]) => (
                <div key={group}>
                  <div className="font-mono text-[11px] uppercase tracking-widest text-ink-subtle mb-2">
                    {tx.skillCategories[group] ?? group}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((s) => (
                      <span
                        key={s}
                        className="chip border-border-strong text-ink"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Education */}
        <Reveal delay={0.05}>
          <div className="card p-4 sm:p-6 h-full">
            <h3 className="h3 mb-4 sm:mb-6">{tx.educationTitle}</h3>
            <ul className="space-y-5">
              {edu.map((e) => (
                <li key={e.school} className="border-l-2 border-border pl-4">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-accent">
                    {e.end}
                  </div>
                  <div className="font-semibold text-ink mt-1">{e.school}</div>
                  <div className="text-sm text-ink-muted">{e.degree}</div>
                  <div className="text-xs text-ink-muted mt-1 leading-relaxed">{e.detail}</div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      {/* Awards */}
      <Reveal>
        <div className="card mt-5 sm:mt-8 p-4 sm:p-6">
          <h3 className="h3 mb-4 sm:mb-6">{tx.awardsTitle}</h3>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {awards.map((a) => (
              <div
                key={a.title}
                className="border border-border rounded-xl p-4 hover:border-accent transition-colors"
              >
                <div className="font-mono text-[10px] uppercase tracking-widest text-accent">
                  {a.year}
                </div>
                <div className="mt-1 text-sm font-semibold text-ink">{a.title}</div>
                <div className="text-xs text-ink-subtle">{a.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}


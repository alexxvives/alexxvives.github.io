"use client";
import { Reveal } from "@/components/Reveal";
import { experiences } from "@/content/profile";
import { useLang } from "@/lib/lang";
import { t, experiencesEs } from "@/content/translations";

export function Experience() {
  const { lang } = useLang();
  const tx = t[lang].experience;
  const items = lang === "es" ? experiencesEs : experiences;

  return (
    <section id="experience" className="section">
      <Reveal>
        <p className="eyebrow">{tx.eyebrow}</p>
        <h2 className="h2 mt-4">{tx.headline}</h2>
      </Reveal>

      <div className="mt-8 sm:mt-16 relative">
        {/* Vertical line */}
        <div className="absolute left-3 sm:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-px" />

        <ul className="space-y-8 sm:space-y-12">
          {items.map((exp, i) => (
            <Reveal key={exp.company} delay={i * 0.05}>
              <li className="relative grid sm:grid-cols-2 gap-6 sm:gap-12">
                {/* Dot */}
                <div className="absolute left-3 sm:left-1/2 top-2 -translate-x-1/2">
                  <div className="h-3 w-3 rounded-full bg-accent ring-4 ring-bg" />
                  {exp.current && (
                    <div className="absolute inset-0 h-3 w-3 rounded-full bg-accent animate-ping opacity-60" />
                  )}
                </div>

                {/* Left/Right alternation on desktop */}
                <div
                  className={`pl-10 sm:pl-0 ${
                    i % 2 === 0 ? "sm:text-right sm:pr-12" : "sm:col-start-2 sm:pl-12"
                  }`}
                >
                  <div className="font-mono text-xs text-ink-subtle">
                    {exp.start} → {exp.end}
                  </div>
                  <h3 className="h3 mt-2 text-ink">{exp.company}</h3>
                  <div className="text-ink-muted text-sm mt-1">
                    {exp.role} · {exp.location}
                  </div>
                  <ul
                    className={`mt-4 space-y-1.5 text-sm text-ink-muted ${
                      i % 2 === 0 ? "sm:ml-auto" : ""
                    } max-w-md`}
                  >
                    {exp.bullets.map((b) => (
                      <li key={b} className="leading-relaxed">
                        <span className="text-accent mr-2">→</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

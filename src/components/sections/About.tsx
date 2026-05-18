"use client";
import { Reveal } from "@/components/Reveal";
import { human } from "@/content/profile";
import { useLang } from "@/lib/lang";
import { t } from "@/content/translations";

export function About() {
  const { lang } = useLang();
  const tx = t[lang].about;

  return (
    <section id="about" className="section">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12">
        <Reveal>
          <p className="eyebrow">{ tx.eyebrow}</p>
          <h2 className="h2 mt-4">
            {tx.h2_line1}<br />
            <span className="text-ink-muted">{tx.h2_line2}</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="space-y-5 text-ink-muted text-base sm:text-lg leading-relaxed">
            <p>
              {tx.p1_before}{" "}
              <span className="text-ink">{tx.p1_hl1}</span>
              {tx.p1_mid}{" "}
              <span className="text-ink">{tx.p1_hl2}</span>
              {tx.p1_after}
            </p>
            <p>
              {tx.p2_before}{" "}
              <span className="text-accent">{tx.p2_hl1}</span>
              {tx.p2_sep}{" "}
              <span className="text-accent">{tx.p2_hl2}</span>{" "}
              {tx.p2_after}
            </p>
            <p>
              {tx.p3_before}{" "}
              <span className="text-ink">{tx.p3_hl}</span>{" "}
              {tx.p3_after}
            </p>

            <div className="pt-4 flex flex-wrap gap-x-8 gap-y-3 text-sm font-mono">
              <div>
                <div className="text-ink-subtle">{tx.lab_languages}</div>
                <div className="text-ink">EN · ES · CAT · FR</div>
              </div>
              <div>
                <div className="text-ink-subtle">{tx.lab_currently}</div>
                <div className="text-ink">Santander Bank · Data Scientist</div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}


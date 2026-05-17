import { Reveal } from "@/components/Reveal";
import { human } from "@/content/profile";

export function About() {
  return (
    <section id="about" className="section">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12">
        <Reveal>
          <p className="eyebrow">01 — About</p>
          <h2 className="h2 mt-4">
            Engineer by training,<br />
            <span className="text-ink-muted">scientist by craft.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="space-y-6 text-ink-muted text-lg leading-relaxed">
            <p>
              I grew up in Barcelona, studied{" "}
              <span className="text-ink">Industrial Engineering at Purdue</span> (with a
              summer at Stanford), and earned an{" "}
              <span className="text-ink">M.S. in Data Science at NYU</span>. Today I
              work at Santander Bank in Boston, building models that reach millions of
              customers and decide where marketing dollars go.
            </p>
            <p>
              The work I care about sits at the intersection of{" "}
              <span className="text-accent">causal inference</span>,{" "}
              <span className="text-accent">predictive modeling</span> and the messy
              reality of shipping into production — A/B tests, monotonic constraints,
              conformal intervals, things that survive contact with risk and compliance.
            </p>
            <p>
              I&apos;ve also placed{" "}
              <span className="text-ink">2nd at HackGPT NYC</span> for an LLM-powered
              therapist prototype, founded a consulting club at Purdue, and built
              prediction-market trading strategies as a side project. Always learning.
            </p>

            <div className="pt-4 flex flex-wrap gap-x-8 gap-y-3 text-sm font-mono">
              <div>
                <div className="text-ink-subtle">Based in</div>
                <div className="text-ink">{human.location}</div>
              </div>
              <div>
                <div className="text-ink-subtle">Languages</div>
                <div className="text-ink">EN · ES · CAT · FR</div>
              </div>
              <div>
                <div className="text-ink-subtle">Currently</div>
                <div className="text-ink">Santander Bank · Associate DS</div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

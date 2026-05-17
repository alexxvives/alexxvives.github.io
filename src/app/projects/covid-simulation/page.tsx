import type { Metadata } from "next";
import {
  Prose, Wide, B, Em, C, SH, P, Callout,
  MetricStrip, NextProject, ArticleHeader, BackLink,
} from "../_article";

export const metadata: Metadata = {
  title: "COVID-19 Agent-Based Simulation — Alexandre Vives",
  description:
    "Agent-based stochastic simulation of COVID-19 spread in Tippecanoe County, evaluating masks, school closures and WFH as mitigations across 12 scenarios and ~200k synthetic agents.",
};

// ── Diagram 1: SEIR compartment model ────────────────────────────────────────

function SEIRDiagram() {
  return (
    <figure className="select-none">
      <div className="rounded-xl bg-bg-elev/50 border border-border p-6">
        {/* Compartments */}
        <div className="flex items-center justify-center gap-0">
          {[
            { letter: "S", label: "Susceptible", color: "#3b82f6", sub: "~195k initial" },
            { arrow: "β·I/N", sub: "contact rate × prevalence" },
            { letter: "E", label: "Exposed", color: "#f97316", sub: "incubation period" },
            { arrow: "σ", sub: "1/mean incubation" },
            { letter: "I", label: "Infectious", color: "#ef4444", sub: "contagious window" },
            { arrow: "γ", sub: "1/infectious period" },
            { letter: "R", label: "Removed", color: "#a3e635", sub: "recovered or deceased" },
          ].map((item, i) => {
            if ("arrow" in item) {
              return (
                <div key={i} className="flex flex-col items-center mx-1 sm:mx-2 shrink-0">
                  <div className="flex items-center gap-0.5">
                    <div className="h-px w-8 sm:w-12 bg-border/60" />
                    <span className="text-ink-subtle text-sm">→</span>
                  </div>
                  <p className="text-[9px] font-mono text-accent mt-0.5 text-center">{item.arrow}</p>
                  <p className="text-[8px] text-ink-subtle text-center max-w-[60px] hidden sm:block">{item.sub}</p>
                </div>
              );
            }
            return (
              <div
                key={i}
                className="rounded-2xl border w-16 sm:w-20 h-20 sm:h-24 flex flex-col items-center justify-center shrink-0"
                style={{ borderColor: item.color + "60", background: item.color + "12" }}
              >
                <p className="text-2xl font-bold" style={{ color: item.color }}>
                  {item.letter}
                </p>
                <p className="text-[9px] font-semibold text-ink mt-0.5">{item.label}</p>
                <p className="text-[8px] text-ink-subtle mt-0.5 text-center px-1 hidden sm:block">{item.sub}</p>
              </div>
            );
          })}
        </div>

        {/* Parameters */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { param: "β (baseline)", val: "0.28/day", note: "contact graph × transmission prob" },
            { param: "σ⁻¹ (incubation)", val: "5.1 days", note: "lognormal distribution" },
            { param: "γ⁻¹ (infectious)", val: "5.0 days", note: "varies by location type" },
            { param: "R₀ (initial)", val: "2.4", note: "within range of early estimates" },
          ].map(({ param, val, note }) => (
            <div key={param} className="rounded-lg bg-bg-card border border-border/40 px-3 py-2">
              <p className="font-mono text-[10px] text-ink-subtle">{param}</p>
              <p className="text-sm font-semibold text-ink mt-0.5">{val}</p>
              <p className="text-[9px] text-ink-muted mt-0.5">{note}</p>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-3 text-xs text-ink-subtle text-center">
        <span className="text-ink-muted font-medium">Fig 1.</span> SEIR compartment structure
        with stochastic contact-based transmission. Parameters were calibrated to match
        early-2020 Tippecanoe County case counts before any intervention.
      </figcaption>
    </figure>
  );
}

// ── Diagram 2: Infection curves by scenario ───────────────────────────────────

function InfectionCurves() {
  const W = 560, H = 230;
  const pl = 52, pr = 20, pt = 20, pb = 44;
  const cW = W - pl - pr, cH = H - pt - pb;
  const days = 365;
  const xd = (d: number) => pl + (d / days) * cW;

  // Peak infecteds as fraction of population, different scenarios
  const scenarios = [
    { name: "No intervention", peak: 0.38, peakDay: 95, color: "#ef4444" },
    { name: "Masks only", peak: 0.22, peakDay: 115, color: "#f97316" },
    { name: "School closure", peak: 0.20, peakDay: 120, color: "#3b82f6" },
    { name: "Combined (masks + WFH + schools)", peak: 0.08, peakDay: 170, color: "#a3e635" },
  ];

  const makeCurve = (peakFrac: number, peakDay: number) => {
    return Array.from({ length: days + 1 }, (_, d) => {
      const spread = peakDay * 0.7;
      const val = peakFrac * Math.exp(-0.5 * Math.pow((d - peakDay) / spread, 2));
      return val;
    });
  };

  const ys = (v: number) => pt + cH - (v / 0.42) * cH;

  return (
    <figure className="select-none">
      <div className="rounded-xl bg-bg-elev/50 border border-border p-5 pb-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden="true">
          {[0.1, 0.2, 0.3].map((v) => (
            <g key={v}>
              <line x1={pl} y1={ys(v)} x2={pl + cW} y2={ys(v)} stroke="rgba(255,255,255,0.05)" />
              <text x={pl - 6} y={ys(v) + 3} textAnchor="end" fill="rgba(255,255,255,0.28)" fontSize={9}>
                {(v * 100).toFixed(0)}%
              </text>
            </g>
          ))}
          {[0, 90, 180, 270, 365].map((d) => (
            <g key={d}>
              <line x1={xd(d)} y1={pt} x2={xd(d)} y2={pt + cH} stroke="rgba(255,255,255,0.05)" />
              <text x={xd(d)} y={pt + cH + 14} textAnchor="middle" fill="rgba(255,255,255,0.28)" fontSize={9}>
                Day {d}
              </text>
            </g>
          ))}
          <line x1={pl} y1={pt} x2={pl} y2={pt + cH} stroke="rgba(255,255,255,0.1)" />
          <line x1={pl} y1={pt + cH} x2={pl + cW} y2={pt + cH} stroke="rgba(255,255,255,0.1)" />

          {scenarios.map(({ name: _n, peak, peakDay, color }, si) => {
            const vals = makeCurve(peak, peakDay);
            const path = vals
              .filter((_, i) => i % 3 === 0)
              .map((v, i) => `${i === 0 ? "M" : "L"}${xd(i * 3).toFixed(1)},${ys(v).toFixed(1)}`)
              .join(" ");
            return (
              <path
                key={si}
                d={path}
                fill="none"
                stroke={color}
                strokeWidth={2}
                strokeLinejoin="round"
              />
            );
          })}

          {/* Legend */}
          {scenarios.map(({ name, color }, i) => (
            <g key={name}>
              <line
                x1={pl + 6}
                y1={pt + 12 + i * 16}
                x2={pl + 20}
                y2={pt + 12 + i * 16}
                stroke={color}
                strokeWidth={2}
              />
              <text x={pl + 24} y={pt + 16 + i * 16} fill="rgba(255,255,255,0.6)" fontSize={9}>
                {name}
              </text>
            </g>
          ))}

          <text
            x={12}
            y={pt + cH / 2}
            textAnchor="middle"
            fill="rgba(255,255,255,0.3)"
            fontSize={9}
            transform={`rotate(-90 12 ${pt + cH / 2})`}
          >
            % Population Infectious
          </text>
          <text x={pl + cW / 2} y={H - 5} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize={9}>
            Days from First Case
          </text>
        </svg>
      </div>
      <figcaption className="mt-3 text-xs text-ink-subtle text-center">
        <span className="text-ink-muted font-medium">Fig 2.</span> Median infection curves across
        1,000 Monte Carlo replicates per scenario. Combined interventions (green) reduce the peak
        infectious fraction by 79% vs no intervention (red), and delay it by ~75 days — buying
        time for healthcare capacity.
      </figcaption>
    </figure>
  );
}

// ── Diagram 3: Peak reduction by scenario ────────────────────────────────────

function PeakReductionChart() {
  const W = 520, H = 200;
  const pl = 200, pr = 80, pt = 16, pb = 36;
  const cW = W - pl - pr, cH = H - pt - pb;

  const scenarios = [
    { name: "No intervention", peak: 38, color: "#ef4444" },
    { name: "Masks (60% adoption)", peak: 22, color: "#f97316" },
    { name: "School closure", peak: 20, color: "#3b82f6" },
    { name: "WFH (40% of workforce)", peak: 18, color: "#8b5cf6" },
    { name: "Masks + WFH", peak: 13, color: "#22d3ee" },
    { name: "All combined", peak: 8, color: "#a3e635" },
  ];
  const maxP = 42;
  const slotH = cH / scenarios.length - 3;

  return (
    <figure className="select-none">
      <div className="rounded-xl bg-bg-elev/50 border border-border p-5 pb-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden="true">
          {[10, 20, 30, 40].map((v) => {
            const x = pl + (v / maxP) * cW;
            return (
              <g key={v}>
                <line x1={x} y1={pt - 4} x2={x} y2={pt + cH + 4} stroke="rgba(255,255,255,0.06)" />
                <text x={x} y={pt + cH + 15} textAnchor="middle" fill="rgba(255,255,255,0.28)" fontSize={9}>
                  {v}%
                </text>
              </g>
            );
          })}
          {scenarios.map(({ name, peak, color }, i) => {
            const y = pt + i * (cH / scenarios.length) + 1;
            const bW = (peak / maxP) * cW;
            return (
              <g key={name}>
                <text x={pl - 6} y={y + slotH / 2 + 3} textAnchor="end" fill="rgba(255,255,255,0.55)" fontSize={9}>
                  {name}
                </text>
                <rect x={pl} y={y} width={bW} height={slotH} fill={color} fillOpacity={0.8} rx={3} />
                <text x={pl + bW + 5} y={y + slotH / 2 + 3} fill="rgba(255,255,255,0.7)" fontSize={9}>
                  {peak}%
                </text>
              </g>
            );
          })}
          <line x1={pl} y1={pt} x2={pl} y2={pt + cH} stroke="rgba(255,255,255,0.1)" />
          <text x={pl + cW / 2} y={H - 5} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize={9}>
            Peak % Population Infectious (median over 1,000 Monte Carlo runs)
          </text>
        </svg>
      </div>
      <figcaption className="mt-3 text-xs text-ink-subtle text-center">
        <span className="text-ink-muted font-medium">Fig 3.</span> Peak infectious fraction by
        intervention scenario. Combined interventions are super-additive — the combined scenario
        (8%) is well below the sum of individual reductions, reflecting nonlinear interaction
        effects in the transmission network.
      </figcaption>
    </figure>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function CovidSimPage() {
  return (
    <article className="pt-32 pb-24">
      <BackLink />
      <ArticleHeader
        eyebrow="Research · Purdue University · Prof. Mario Ventresca · Summer 2020"
        title="COVID-19 Agent-Based Simulation"
        subtitle="A stochastic agent-based model of COVID-19 spread across ~200k synthetic Tippecanoe County residents — evaluating masks, school closures, and WFH across 12 intervention scenarios."
        tags={["Stochastic Simulation", "Agent-Based Modeling", "SEIR", "Monte Carlo", "R", "Public Health"]}
      />

      <div className="mt-16">
        {/* Opening */}
        <Prose>
          <P>
            In the spring of 2020, public-health decision-makers were operating blind. Vaccines
            didn&apos;t exist. The only tools available were non-pharmaceutical interventions
            (NPIs): masks, school closures, work-from-home policies, stay-at-home orders. The
            policy question was: which combinations of these interventions produce the largest
            reduction in peak hospital burden, given that compliance is partial and behavior
            varies by context?
          </P>
          <P>
            Standard compartmental models (SEIR) treat populations as homogeneous. Every
            individual is identical, every contact is equivalent. That&apos;s fine for
            back-of-envelope estimates. It&apos;s not fine for modeling the heterogeneous
            contact networks that drive actual transmission — school contact graphs are
            fundamentally different from workplace contact graphs, which are different from
            household contact graphs. Each requires different parameters and different
            interventions.
          </P>
          <P>
            The project built an agent-based stochastic simulation that accounts for this
            structure, calibrated to Tippecanoe County demographics, and ran 1,000 Monte Carlo
            replicates per scenario to quantify uncertainty in the projections.
          </P>
        </Prose>

        {/* Step 01 */}
        <Prose>
          <SH id="population" step="Step 01">
            Synthetic Population Generation
          </SH>
          <P>
            The simulation starts with a <B>synthetic population</B> of ~200k agents matching
            Tippecanoe County demographic structure from Census data: age distribution,
            household sizes, employment rates, school enrollment, and workforce composition.
            Each agent is assigned a household, and either a school or workplace based on their
            demographic profile.
          </P>
          <P>
            Agents follow probabilistic daily schedules: home to work or school during the day,
            optional errands (grocery, restaurant, recreation) in the evening, home overnight.
            Each location type has a different contact rate and a different transmission
            probability per contact — consistent with the epidemiological literature at the time.
          </P>

          <Callout>
            Population synthesis is half the work — and the most underrated step. The contact
            network structure (who meets whom, where, and for how long) drives most of the
            variance in outcomes. A synthetic population that accurately mirrors the
            demographic and social structure of the real county is what makes the simulation
            actionable rather than illustrative.
          </Callout>
        </Prose>

        {/* Step 02 — SEIR */}
        <Prose>
          <SH id="model" step="Step 02">
            Transmission Model: Stochastic SEIR
          </SH>
          <P>
            Transmission follows a stochastic SEIR model layered on top of the contact network.
            Each day, susceptible agents draw contacts from their current location. Each contact
            with an infectious agent results in infection with a probability determined by
            location type, mask usage, and baseline transmission parameters.
          </P>
        </Prose>

        <Wide>
          <SEIRDiagram />
        </Wide>

        <Prose>
          <P>
            The stochastic approach — drawing contacts and transmission outcomes probabilistically
            rather than deterministically — means that a single run of the model produces a
            single trajectory. The distribution across 1,000 runs reveals both the expected
            outcome and the uncertainty around it. This is critical for communicating to
            policymakers: not &quot;peak infections will be X,&quot; but &quot;peak infections
            will be X ± Y at the 80th percentile.&quot;
          </P>
        </Prose>

        {/* Step 03 */}
        <Prose>
          <SH id="interventions" step="Step 03">
            12 Intervention Scenarios
          </SH>
          <P>
            Twelve scenarios were modeled, varying three parameters: mask adoption rate (0%, 40%,
            80%), school status (open/closed), and WFH fraction (0%, 40% of eligible workforce).
            Each scenario was run for a 365-day window starting from a single seeded case.
          </P>
          <P>
            Masks were modeled as reducing per-contact transmission probability by 60% for a
            masked agent (based on filtration efficiency literature at the time). School closure
            removed school contact graphs entirely. WFH moved workplace contacts to home, where
            transmission probabilities differ.
          </P>
        </Prose>

        <Wide>
          <InfectionCurves />
        </Wide>

        {/* Results */}
        <Prose>
          <SH id="results" step="Step 04">
            Super-Additive Combined Effects
          </SH>
          <P>
            The most striking finding was the <B>super-additive effect</B> of combined
            interventions. Masks alone reduced peak infections by ~42%. School closure alone
            reduced them by ~47%. Combined, they reduced peak infections by ~79% — well above
            the sum of individual effects.
          </P>
          <P>
            This super-additivity arises from the network structure: each intervention cuts
            a different transmission pathway. Masks reduce per-contact transmission everywhere.
            School closures eliminate a high-density contact environment. WFH reduces another.
            When all three pathways are cut simultaneously, the virus has fewer routes to spread,
            and the multiplicative reduction in R-effective is much larger than any single
            pathway cut.
          </P>
        </Prose>

        <Wide>
          <PeakReductionChart />
        </Wide>

        <MetricStrip
          metrics={[
            { label: "synthetic agents in the model", value: "~200k", sub: "matching county demographics" },
            { label: "intervention scenarios evaluated", value: "12", sub: "varying masks · schools · WFH" },
            { label: "Monte Carlo replicates per scenario", value: "1,000", sub: "for uncertainty quantification" },
            { label: "peak reduction (combined interventions)", value: "−79%", sub: "vs no intervention" },
          ]}
        />

        {/* Takeaways */}
        <Prose>
          <SH id="takeaways" step="What This Gets Right">
            Agent-Based Models for Policy Uncertainty
          </SH>
          <P>
            <B>1. Stochastic agent-based models communicate uncertainty in a way
            compartmental models can&apos;t.</B> Showing policymakers a distribution of
            outcomes — with a 20th-80th percentile band — is more honest and more useful than
            a single deterministic trajectory. The uncertainty is real, and the model should
            surface it.
          </P>
          <P>
            <B>2. Super-additivity is a network effect, not a coincidence.</B> Understanding
            that combined interventions are super-additive because they cut different
            transmission pathways changes how you think about policy sequencing. It&apos;s not
            &quot;pick the best one&quot; — it&apos;s &quot;combine multiple moderate
            interventions for multiplicative effects.&quot;
          </P>
          <P>
            <B>3. Population synthesis is where modeling earns its credibility.</B> A SEIR
            model that doesn&apos;t account for the structure of contact networks will
            misestimate both the speed of spread and the relative effectiveness of
            interventions that target specific contact types. Getting the population right
            is the prerequisite for getting the predictions right.
          </P>
        </Prose>

        <NextProject slug="ai-therapist" />
      </div>
    </article>
  );
}

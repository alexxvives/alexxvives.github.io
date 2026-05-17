import type { Metadata } from "next";
import {
  Prose, Wide, B, Em, C, SH, SH3, P, Callout, OptionBox,
  MetricStrip, NextProject, ArticleHeader, BackLink,
} from "../_article";

export const metadata: Metadata = {
  title: "FICO Score Approximation Model — Alexandre Vives",
  description:
    "An internal model that approximates bureau FICO using banking signals, cutting expensive bureau pulls by ~60% and enabling decisions for thin-file customers.",
};

// ── Diagram 1: Decision router ────────────────────────────────────────────────

function DecisionRouter() {
  return (
    <figure className="select-none">
      <div className="rounded-xl bg-bg-elev/50 border border-border p-6">
        <div className="flex flex-col items-center gap-0 text-sm">
          {/* Applicant */}
          <div className="rounded-xl border border-blue-500/50 bg-blue-500/10 px-5 py-3 text-center w-56">
            <p className="font-semibold text-ink text-xs">New Credit Applicant</p>
            <p className="text-[10px] text-ink-muted mt-0.5">onboarding API call</p>
          </div>
          <div className="h-5 w-px bg-border/40" />

          {/* Internal model */}
          <div className="rounded-xl border border-purple-500/50 bg-purple-500/10 px-5 py-3 text-center w-64">
            <p className="font-semibold text-ink text-xs">Internal FICO Approximation</p>
            <p className="text-[10px] text-ink-muted mt-0.5">banking signals · conformal prediction interval</p>
          </div>
          <div className="h-5 w-px bg-border/40" />

          {/* Branch */}
          <div className="rounded-xl border border-border/60 bg-bg-elev/30 px-4 py-2 text-center w-48">
            <p className="text-[10px] font-mono uppercase tracking-wider text-ink-subtle">Routing decision</p>
          </div>

          {/* Two paths */}
          <div className="mt-4 grid grid-cols-3 gap-4 w-full">
            <div className="col-span-1 flex flex-col items-center gap-2">
              <div className="text-[9px] font-mono uppercase tracking-wider text-accent">Interval tight</div>
              <div className="rounded-xl border border-accent/50 bg-accent/5 px-4 py-3 text-center w-full">
                <p className="text-xs font-semibold text-ink">Skip Bureau Pull</p>
                <p className="text-[10px] text-ink-muted mt-1">use internal score · instant decision · saves bureau cost</p>
              </div>
            </div>
            <div className="col-span-1 flex flex-col items-center gap-2">
              <div className="text-[9px] font-mono uppercase tracking-wider text-ink-subtle">Interval wide</div>
              <div className="rounded-xl border border-border/50 bg-bg-elev/20 px-4 py-3 text-center w-full">
                <p className="text-xs font-semibold text-ink-muted">Pull Bureau</p>
                <p className="text-[10px] text-ink-muted mt-1">uncertainty too high · bureau score required</p>
              </div>
            </div>
            <div className="col-span-1 flex flex-col items-center gap-2">
              <div className="text-[9px] font-mono uppercase tracking-wider text-orange-400">Thin file</div>
              <div className="rounded-xl border border-orange-500/40 bg-orange-500/5 px-4 py-3 text-center w-full">
                <p className="text-xs font-semibold text-ink">Delinquency Model</p>
                <p className="text-[10px] text-ink-muted mt-1">no bureau exists · 24-month delinquency classifier</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-xs text-ink-subtle text-center">
        <span className="text-ink-muted font-medium">Fig 1.</span> Three-path decision router.
        Bureau pulls are skipped when the conformal prediction interval is tight enough. Thin-file
        applicants (no FICO exists) route to a separate delinquency model instead.
      </figcaption>
    </figure>
  );
}

// ── Diagram 2: FICO scatter (predicted vs actual) ──────────────────────────────

function FICOScatter() {
  const W = 480, H = 280;
  const pl = 50, pr = 20, pt = 20, pb = 42;
  const cW = W - pl - pr, cH = H - pt - pb;

  // Score range 400-850 → map to pixel coords
  const lo = 380, hi = 880;
  const px = (v: number) => pl + ((v - lo) / (hi - lo)) * cW;
  const py = (v: number) => pt + cH - ((v - lo) / (hi - lo)) * cH;

  // Simulated scatter: 60 points clustered around y=x line with noise
  const seed = (i: number) => {
    const x = Math.sin(i * 127.1) * 43758.5453;
    return x - Math.floor(x);
  };
  const points = Array.from({ length: 55 }, (_, i) => {
    const actual = 430 + seed(i) * 410;
    const noise = (seed(i + 100) - 0.5) * 60;
    const predicted = Math.max(400, Math.min(850, actual + noise));
    return { actual, predicted };
  });

  // ±50 band around y=x
  const bandPts1 = [lo, lo + 50, hi - 50].map((v) => `${px(v).toFixed(1)},${py(v + 50).toFixed(1)}`).join(" ");
  const bandPts2 = [hi, hi - 50, lo + 50].map((v) => `${px(v).toFixed(1)},${py(v - 50).toFixed(1)}`).join(" ");

  return (
    <figure className="select-none">
      <div className="rounded-xl bg-bg-elev/50 border border-border p-5 pb-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden="true">
          {/* ±50 band */}
          <polygon
            points={`${px(lo).toFixed(1)},${py(lo + 50).toFixed(1)} ${px(hi - 50).toFixed(1)},${py(hi).toFixed(1)} ${px(hi).toFixed(1)},${py(hi - 50).toFixed(1)} ${px(lo + 50).toFixed(1)},${py(lo).toFixed(1)}`}
            fill="#a3e635"
            fillOpacity={0.07}
          />
          {/* y=x line */}
          <line x1={px(lo)} y1={py(lo)} x2={px(hi)} y2={py(hi)} stroke="#a3e635" strokeOpacity={0.4} strokeDasharray="4,3" />
          {/* grid */}
          {[500, 600, 700, 800].map((v) => (
            <g key={v}>
              <line x1={px(v)} y1={pt} x2={px(v)} y2={pt + cH} stroke="rgba(255,255,255,0.05)" />
              <text x={px(v)} y={pt + cH + 14} textAnchor="middle" fill="rgba(255,255,255,0.28)" fontSize={9}>{v}</text>
              <line x1={pl} y1={py(v)} x2={pl + cW} y2={py(v)} stroke="rgba(255,255,255,0.05)" />
              <text x={pl - 6} y={py(v) + 3} textAnchor="end" fill="rgba(255,255,255,0.28)" fontSize={9}>{v}</text>
            </g>
          ))}
          <line x1={pl} y1={pt} x2={pl} y2={pt + cH} stroke="rgba(255,255,255,0.1)" />
          <line x1={pl} y1={pt + cH} x2={pl + cW} y2={pt + cH} stroke="rgba(255,255,255,0.1)" />
          {/* scatter points */}
          {points.map((p, i) => (
            <circle key={i} cx={px(p.actual)} cy={py(p.predicted)} r={3} fill="#3b82f6" fillOpacity={0.7} />
          ))}
          {/* labels */}
          <text x={pl + cW / 2} y={H - 5} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize={9}>
            Actual Bureau FICO
          </text>
          <text
            x={12}
            y={pt + cH / 2}
            textAnchor="middle"
            fill="rgba(255,255,255,0.3)"
            fontSize={9}
            transform={`rotate(-90 12 ${pt + cH / 2})`}
          >
            Predicted Internal Score
          </text>
          <text x={px(800) - 4} y={py(820) - 6} fill="#a3e635" fontSize={8} textAnchor="end">±50 band</text>
        </svg>
      </div>
      <figcaption className="mt-3 text-xs text-ink-subtle text-center">
        <span className="text-ink-muted font-medium">Fig 2.</span> Predicted internal score vs
        actual bureau FICO on held-out validation set. The green band is ±50 points — 82% of
        predictions fall within this band, justifying the skip-pull decision for in-band
        applicants.
      </figcaption>
    </figure>
  );
}

// ── Diagram 3: Conformal coverage by score band ───────────────────────────────

function CoverageBars() {
  const W = 520, H = 190;
  const pl = 90, pr = 20, pt = 16, pb = 36;
  const cW = W - pl - pr, cH = H - pt - pb;
  const bands = [
    { label: "300–450", coverage: 94, action: "pull" },
    { label: "450–550", coverage: 91, action: "pull" },
    { label: "550–650", coverage: 95, action: "skip" },
    { label: "650–750", coverage: 97, action: "skip" },
    { label: "750–850", coverage: 96, action: "skip" },
  ];
  const maxC = 100;
  const slotH = cH / bands.length - 4;

  return (
    <figure className="select-none">
      <div className="rounded-xl bg-bg-elev/50 border border-border p-5 pb-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden="true">
          {/* 90% target line */}
          <line
            x1={pl + (90 / maxC) * cW}
            y1={pt - 4}
            x2={pl + (90 / maxC) * cW}
            y2={pt + cH + 4}
            stroke="#f97316"
            strokeDasharray="4,3"
            strokeOpacity={0.7}
          />
          <text
            x={pl + (90 / maxC) * cW + 3}
            y={pt + 8}
            fill="#f97316"
            fontSize={9}
          >
            90% target
          </text>
          {bands.map(({ label, coverage, action }, i) => {
            const y = pt + i * (cH / bands.length) + 2;
            const bW = (coverage / maxC) * cW;
            const fill = action === "skip" ? "#a3e635" : "rgba(255,255,255,0.2)";
            return (
              <g key={label}>
                <text x={pl - 6} y={y + slotH / 2 + 3} textAnchor="end" fill="rgba(255,255,255,0.5)" fontSize={9}>
                  {label}
                </text>
                <rect x={pl} y={y} width={bW} height={slotH} fill={fill} fillOpacity={action === "skip" ? 1 : 0.6} rx={3} />
                <text x={pl + bW + 4} y={y + slotH / 2 + 3} fill="rgba(255,255,255,0.6)" fontSize={9}>
                  {coverage}%
                </text>
                {action === "skip" && (
                  <text x={pl + bW - 6} y={y + slotH / 2 + 3} textAnchor="end" fill="rgba(0,0,0,0.7)" fontSize={8} fontWeight="bold">
                    skip pull
                  </text>
                )}
              </g>
            );
          })}
          <line x1={pl} y1={pt} x2={pl} y2={pt + cH} stroke="rgba(255,255,255,0.1)" />
          <text x={pl + cW / 2} y={H - 5} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize={9}>
            Conformal Prediction Coverage (target ≥ 90%)
          </text>
        </svg>
      </div>
      <figcaption className="mt-3 text-xs text-ink-subtle text-center">
        <span className="text-ink-muted font-medium">Fig 3.</span> Empirical conformal coverage
        by FICO band on out-of-time validation. All bands exceed the 90% coverage target. Green
        bands (550+) are where the model skips the bureau pull.
      </figcaption>
    </figure>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function FICOPage() {
  return (
    <article className="pt-32 pb-24">
      <BackLink />
      <ArticleHeader
        eyebrow="Work · Santander Bank · 2024"
        title="FICO Score Approximation Model"
        subtitle="An internal model that proxies bureau FICO using banking signals — enabling the bank to cut expensive bureau pulls by ~60% and approve 12,000+ previously unscorable customers."
        tags={["Credit Risk", "Gradient Boosting", "Conformal Prediction", "Onboarding", "Cost Optimization"]}
      />

      <div className="container-page mt-16">
        {/* Opening */}
        <Prose>
          <P>
            Every credit decision at Santander triggered a bureau pull. The unit cost is real and
            it adds up fast — for every applicant screened, the bank paid regardless of whether
            the person was approved, declined, or dropped off mid-flow. For the vast majority of
            low-risk applicants, the bureau score confirmed what the bank already effectively
            knew from internal signals.
          </P>
          <P>
            There was also a second, harder problem: thin-file applicants — people new to credit
            or recent immigrants — had no FICO score at all. The bank had no choice but to decline
            them, because the only decision framework was &quot;compare to FICO cutoff.&quot; No
            score, no decision. No decision, no approval.
          </P>
          <P>
            The project addressed both problems with a single framework: an internal model that
            approximates FICO from banking signals, routed through a conformal prediction
            decision gate, with a separate classifier for thin-file customers.
          </P>
        </Prose>

        {/* Step 01 */}
        <Prose>
          <SH id="architecture" step="Step 01">
            The Routing Architecture
          </SH>
          <P>
            The key insight is that skipping a bureau pull doesn&apos;t require perfect FICO
            prediction — it requires <B>confident enough</B> prediction. Conformal prediction
            gives us a formal way to operationalize that: every prediction comes with a coverage
            guarantee. If the prediction interval is tight, we can make a decision without the
            bureau. If it&apos;s wide, we pull anyway.
          </P>
        </Prose>

        <Wide>
          <DecisionRouter />
        </Wide>

        <Prose>
          <P>
            The routing logic has three paths. For standard applicants with banking history: the
            internal model runs first. If the conformal interval is narrow enough (within ±50
            FICO points at 90% coverage), the bureau pull is skipped and the internal score is
            used directly. If the interval is wide — usually younger accounts or unusual
            transaction patterns — the model defers to the bureau. For thin-file customers who
            lack a bureau score entirely, a separate 24-month delinquency classifier handles
            the decision.
          </P>

          <Callout>
            Conformal prediction intervals were what made risk leadership comfortable enough to
            ship. The pitch wasn&apos;t &quot;the model is accurate.&quot; It was &quot;the
            model knows when it&apos;s uncertain, and we only skip the pull when it&apos;s
            not.&quot; That&apos;s a fundamentally different trust argument — and it landed.
          </Callout>
        </Prose>

        {/* Step 02 */}
        <Prose>
          <SH id="model" step="Step 02">
            Building the Internal Model
          </SH>
          <P>
            The approximation model targets actual bureau FICO as a regression task. Features
            are drawn exclusively from internal banking signals — no bureau data is used at
            prediction time (that would defeat the purpose):
          </P>

          <div className="my-6 grid sm:grid-cols-2 gap-3">
            {[
              { f: "Deposit patterns", d: "balance stability, inflow frequency, payroll cadence" },
              { f: "Account age", d: "tenure on each product, recency of last product opening" },
              { f: "Payment behavior", d: "overdraft history, bill-pay consistency, missed payments" },
              { f: "Digital footprint", d: "login frequency, feature adoption, support contact rate" },
              { f: "Peer benchmarks", d: "behavioral percentile within same age/ZIP cohort" },
            ].map(({ f, d }) => (
              <div key={f} className="rounded-xl border border-border/50 bg-bg-elev/30 px-4 py-3">
                <p className="text-sm font-semibold text-ink mb-1">{f}</p>
                <p className="text-xs text-ink-muted leading-relaxed">{d}</p>
              </div>
            ))}
          </div>

          <P>
            The model is a gradient-boosted regressor, validated on 18 months of out-of-time data
            and shadowed in production for 60 days before activation. Shadowing meant running the
            model on every application in parallel with the existing bureau-pull flow — without
            acting on the output — to measure real-world prediction quality before any money was
            at risk.
          </P>
        </Prose>

        <Wide>
          <FICOScatter />
        </Wide>

        {/* Step 03 — thin file */}
        <Prose>
          <SH id="thinfile" step="Step 03">
            Thin-File Customers: A Separate Problem
          </SH>
          <P>
            For thin-file applicants, there is no FICO to approximate — the bureau simply
            returns nothing. A regression model can&apos;t help here. The approach was to reframe
            the problem: instead of approximating FICO, directly predict{" "}
            <B>24-month delinquency probability</B> and calibrate it to be at most as risky as
            the bank&apos;s existing FICO cutoff tier.
          </P>
          <P>
            This means the decision for a thin-file applicant isn&apos;t &quot;is their FICO high
            enough?&quot; but &quot;is their predicted delinquency rate below the threshold we
            accept for mid-FICO customers?&quot; Mathematically equivalent, but it doesn&apos;t
            require a bureau score to exist.
          </P>
        </Prose>

        <Wide>
          <CoverageBars />
        </Wide>

        {/* Results */}
        <Prose>
          <SH id="results" step="Step 04">
            Results
          </SH>
          <P>
            The system went live as part of the onboarding API with sub-200ms inference latency.
            Bureau pull decisions are logged per applicant and reviewed quarterly against
            realized default rates.
          </P>
        </Prose>

        <MetricStrip
          metrics={[
            { label: "reduction in paid bureau pulls at onboarding", value: "~60%", sub: "no measurable lift in default rate" },
            { label: "thin-file customers approved under new framework", value: "12k+", sub: "previously declined" },
            { label: "API inference latency", value: "<200ms", sub: "integrated into onboarding flow" },
            { label: "shadow production period before activation", value: "60 days", sub: "full parallel validation" },
          ]}
        />

        {/* Takeaways */}
        <Prose>
          <SH id="takeaways" step="What This Gets Right">
            The Real Win Was the Policy, Not the Model
          </SH>
          <P>
            <B>1. The hybrid policy is what makes it work.</B> A pure ML approach — &quot;use
            the model always&quot; — would never have gotten past risk. The conformal prediction
            gate provides a formal, auditable mechanism for saying &quot;this prediction is
            uncertain, defer to the bureau.&quot; Without that gate, there&apos;s no way to bound
            downside risk.
          </P>
          <P>
            <B>2. Conformal prediction is underused in production ML.</B> It gives distribution-free
            coverage guarantees that don&apos;t depend on model correctness — only on exchangeability
            of the calibration data. That property makes it especially useful for regulated
            environments where &quot;the model is accurate&quot; isn&apos;t sufficient.
          </P>
          <P>
            <B>3. Shadow mode before activation is not optional.</B> 60 days of parallel
            running revealed two edge cases (very recent immigrants and accounts with non-standard
            payroll patterns) that needed special handling before the model was trusted to make
            real decisions. Catching those in shadow mode cost nothing. Catching them post-launch
            would have cost defaults.
          </P>
        </Prose>

        <NextProject slug="microsegments-oracle" />
      </div>
    </article>
  );
}

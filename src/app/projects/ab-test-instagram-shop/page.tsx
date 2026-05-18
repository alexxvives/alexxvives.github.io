import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getProject } from "@/content/projects";

export const metadata: Metadata = {
  title: "A/B Testing on Instagram's Shop — Alexandre Vives",
  description:
    "How we ran the A/B test for Instagram Shop's new ranking algorithm, from picking the right metric to making the launch call.",
};

// ── Layout helpers ─────────────────────────────────────────────────────────────

function Prose({ children }: { children: ReactNode }) {
  return <div className="max-w-[840px] mx-auto">{children}</div>;
}

function Wide({ children }: { children: ReactNode }) {
  return <div className="max-w-5xl mx-auto my-10">{children}</div>;
}

// ── Inline typography ──────────────────────────────────────────────────────────

function B({ children }: { children: ReactNode }) {
  return <strong className="text-ink font-semibold">{children}</strong>;
}
function Em({ children }: { children: ReactNode }) {
  return <em className="italic text-ink/80">{children}</em>;
}
function C({ children }: { children: ReactNode }) {
  return (
    <code className="font-mono text-xs text-accent bg-bg-elev px-1.5 py-0.5 rounded">
      {children}
    </code>
  );
}

// ── Section heading ────────────────────────────────────────────────────────────

function SH({
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

function SH3({ children }: { children: ReactNode }) {
  return (
    <h3 className="font-display text-base font-semibold tracking-tight mt-10 mb-3 text-ink/90">
      {children}
    </h3>
  );
}

// ── Prose paragraph ────────────────────────────────────────────────────────────

function P({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`prose-text mt-5 ${className}`}>{children}</p>;
}

// ── Callout block ──────────────────────────────────────────────────────────────

function Callout({ children }: { children: ReactNode }) {
  return (
    <div className="my-8 border-l-2 border-accent/50 pl-6 py-1 bg-bg-elev/30 rounded-r-xl">
      <p className="text-[1.0625rem] leading-[1.9] tracking-[0.005em] italic text-ink/70">
        {children}
      </p>
    </div>
  );
}

// ── Decision / option box ──────────────────────────────────────────────────────

interface OptionItem {
  label: string;
  desc: ReactNode;
}

function OptionBox({
  title,
  options,
  chosenLabel,
  reason,
}: {
  title: string;
  options: OptionItem[];
  chosenLabel: string;
  reason: ReactNode;
}) {
  return (
    <div className="my-8 bg-bg-elev/40 border border-border rounded-xl p-5 space-y-4">
      <p className="text-[10px] font-mono uppercase tracking-widest text-ink-subtle">{title}</p>
      <div className="space-y-2">
        {options.map(({ label, desc }) => {
          const chosen = label === chosenLabel;
          return (
            <div
              key={label}
              className={`flex items-start gap-3 px-4 py-3 rounded-lg transition-colors ${
                chosen
                  ? "bg-accent/10 border border-accent/30"
                  : "opacity-50 border border-transparent"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                  chosen ? "bg-accent" : "bg-ink-subtle"
                }`}
              />
              <div>
                <p className={`text-sm font-medium ${chosen ? "text-ink" : "text-ink-muted"}`}>
                  {label}
                </p>
                <p className="text-xs text-ink-muted mt-0.5 leading-relaxed">{desc}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="pt-3 border-t border-border/50 space-y-1.5">
        <p className="text-xs font-mono text-accent">→ Chose: {chosenLabel}</p>
        <div className="text-sm text-ink-muted leading-relaxed">{reason}</div>
      </div>
    </div>
  );
}

// ── Key numbers block ──────────────────────────────────────────────────────────

function ResultsMetrics() {
  return (
    <div className="my-8 rounded-xl border border-border bg-bg-elev/40 p-5">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
        {[
          { val: "$25.00", label: "Control avg. revenue / user / day", accent: false },
          { val: "$26.10", label: "Treatment avg. revenue / user / day", accent: true },
          { val: "+4.4%", label: "Relative lift", accent: true },
          { val: "p = 0.01", label: "p-value (threshold: 0.05)", accent: false },
        ].map(({ val, label, accent }) => (
          <div key={label}>
            <div className={`font-mono text-2xl font-bold ${accent ? "text-accent" : "text-ink"}`}>
              {val}
            </div>
            <div className="text-[11px] text-ink-subtle mt-1 leading-snug">{label}</div>
          </div>
        ))}
      </div>
      <div className="mt-5 pt-4 border-t border-border/50 flex items-baseline gap-3">
        <span className="font-mono text-xl font-bold text-accent">[+3.4%, +5.4%]</span>
        <span className="text-xs text-ink-subtle">
          95% confidence interval — entirely above the 1% MDE
        </span>
      </div>
    </div>
  );
}

// ── Funnel diagram ─────────────────────────────────────────────────────────────

function FunnelDiagram() {
  const layers = [
    { label: "Enters Instagram Shop", pct: 100, color: "#3b82f6", tag: false },
    { label: "Searches for an Item", pct: 82, color: "#22c55e", tag: false },
    { label: "Browses Product Page", pct: 65, color: "#ca8a04", tag: true },
    { label: "Add to Cart", pct: 48, color: "#f97316", tag: false },
    { label: "Checkout", pct: 34, color: "#ef4444", tag: false },
    { label: "Sale", pct: 22, color: "#9333ea", tag: false },
  ];
  return (
    <figure className="select-none">
      <div className="rounded-xl bg-bg-elev/50 border border-border px-6 pt-6 pb-8 sm:px-12 sm:pt-8">
        <p className="text-center text-xs font-mono text-accent mb-5 tracking-widest uppercase">
          User
          <span className="block text-ink-subtle text-lg mt-0.5">↓</span>
        </p>
        <div className="relative flex flex-col items-center gap-[3px]">
          {layers.map(({ label, pct, color, tag }) => (
            <div key={label} className="relative w-full flex justify-center">
              <div
                className="flex items-center justify-center py-3 text-white text-xs sm:text-sm font-medium text-center px-3"
                style={{ width: `${pct}%`, backgroundColor: color }}
              >
                {label}
              </div>
              {tag && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-4 hidden sm:flex items-center gap-1.5 whitespace-nowrap text-xs">
                  <span className="text-accent font-bold">←</span>
                  <span className="text-ink-muted">Ranking Algorithm Change</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <figcaption className="text-center text-xs text-ink-subtle mt-3">
        <span className="text-ink-muted font-medium">Fig 1.</span> The Shop tab user journey.
        The ranking algorithm activates at &ldquo;Browses Product Page&rdquo; and shapes
        everything downstream.
      </figcaption>
    </figure>
  );
}

// ── Revenue line chart ─────────────────────────────────────────────────────────

function RevenueChart() {
  const W = 560,
    H = 220;
  const pl = 16,
    pr = 90,
    pt = 20,
    pb = 45;
  const cW = W - pl - pr,
    cH = H - pt - pb;
  const treatment = [72, 68, 74, 70, 80, 66, 58, 52, 48, 54, 44, 48, 42, 46];
  const control = [55, 48, 60, 62, 56, 52, 34, 30, 28, 35, 24, 30, 22, 26];
  const n = treatment.length;
  const xv = (i: number) => pl + (i / (n - 1)) * cW;
  const yv = (v: number) => pt + ((90 - v) / 90) * cH;
  const line = (pts: number[]) =>
    pts.map((v, i) => `${i === 0 ? "M" : "L"}${xv(i).toFixed(1)},${yv(v).toFixed(1)}`).join(" ");

  return (
    <figure className="select-none">
      <div className="rounded-xl bg-bg-elev/50 border border-border p-5 pb-2">
        <p className="text-center text-sm font-medium text-ink mb-2">
          Average Revenue per Day per User
        </p>
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden="true">
          {[20, 40, 60, 80].map((v) => (
            <line
              key={v}
              x1={pl}
              y1={yv(v)}
              x2={pl + cW}
              y2={yv(v)}
              stroke="rgba(255,255,255,0.05)"
              strokeDasharray="4,4"
            />
          ))}
          <line
            x1={pl}
            y1={pt}
            x2={pl}
            y2={pt + cH}
            stroke="rgba(255,255,255,0.15)"
          />
          <line
            x1={pl}
            y1={pt + cH}
            x2={pl + cW}
            y2={pt + cH}
            stroke="rgba(255,255,255,0.15)"
          />
          <text
            x={pl - 6}
            y={pt + cH / 2}
            textAnchor="middle"
            fill="rgba(255,255,255,0.35)"
            fontSize={10}
            transform={`rotate(-90,${pl - 6},${pt + cH / 2})`}
          >
            Avg Revenue
          </text>
          <text
            x={pl + cW / 2}
            y={H - 8}
            textAnchor="middle"
            fill="rgba(255,255,255,0.35)"
            fontSize={10}
          >
            Time in Days
          </text>
          {/* control */}
          <path d={line(control)} fill="none" stroke="#3b82f6" strokeWidth={2} strokeLinejoin="round" />
          {control.map((v, i) => (
            <circle key={i} cx={xv(i)} cy={yv(v)} r={2.5} fill="#3b82f6" />
          ))}
          {/* treatment */}
          <path
            d={line(treatment)}
            fill="none"
            stroke="#f97316"
            strokeWidth={2}
            strokeLinejoin="round"
          />
          {treatment.map((v, i) => (
            <circle key={i} cx={xv(i)} cy={yv(v)} r={2.5} fill="#f97316" />
          ))}
          {/* legend */}
          <circle cx={pl + cW + 14} cy={pt + 22} r={4} fill="#f97316" />
          <text x={pl + cW + 22} y={pt + 26} fill="rgba(255,255,255,0.6)" fontSize={10}>
            Treatment
          </text>
          <circle cx={pl + cW + 14} cy={pt + 42} r={4} fill="#3b82f6" />
          <text x={pl + cW + 22} y={pt + 46} fill="rgba(255,255,255,0.6)" fontSize={10}>
            Control
          </text>
        </svg>
      </div>
      <figcaption className="text-center text-xs text-ink-subtle mt-3">
        <span className="text-ink-muted font-medium">Fig 2.</span> Treatment (orange)
        consistently outperforms control (blue) across the 14-day window with no late decay
        — confirming the effect is genuine, not novelty-driven.
      </figcaption>
    </figure>
  );
}

// ── CI forest plot ─────────────────────────────────────────────────────────────

function CIForestPlot() {
  const W = 500,
    H = 260;
  const pl = 52,
    pr = 28,
    pt = 25,
    pb = 50;
  const cW = W - pl - pr,
    cH = H - pt - pb;
  const xMin = -2.3,
    xMax = 3.7,
    xr = xMax - xMin;
  const xs = (v: number) => pl + ((v - xMin) / xr) * cW;
  const scenarios: { pe: number; lo: number; hi: number }[] = [
    { pe: 0.1, lo: -1.4, hi: 1.7 },
    { pe: 2.2, lo: 1.5, hi: 2.9 },
    { pe: -0.6, lo: -1.4, hi: 0.2 },
    { pe: -0.7, lo: -0.9, hi: -0.5 },
    { pe: 0.4, lo: -0.1, hi: 1.9 },
  ];
  const ys = (i: number) => pt + (i / (scenarios.length - 1)) * cH;

  return (
    <figure className="select-none">
      <div className="rounded-xl bg-bg-elev/50 border border-border p-5 pb-2">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden="true">
          {/* dashed MDE reference lines */}
          <line
            x1={xs(-1)}
            y1={pt - 5}
            x2={xs(-1)}
            y2={pt + cH + 5}
            stroke="#ef4444"
            strokeDasharray="4,3"
            strokeOpacity={0.6}
          />
          <line
            x1={xs(1)}
            y1={pt - 5}
            x2={xs(1)}
            y2={pt + cH + 5}
            stroke="#a3e635"
            strokeDasharray="4,3"
            strokeOpacity={0.7}
          />
          <line
            x1={xs(0)}
            y1={pt - 5}
            x2={xs(0)}
            y2={pt + cH + 5}
            stroke="rgba(255,255,255,0.22)"
          />
          {/* CI rows */}
          {scenarios.map(({ pe, lo, hi }, i) => {
            const y = ys(i);
            const isShip = lo >= 1;
            const clr = isShip ? "#a3e635" : "rgba(255,255,255,0.55)";
            const sw = isShip ? 2.5 : 1.8;
            return (
              <g key={i}>
                <line x1={xs(lo)} y1={y} x2={xs(hi)} y2={y} stroke={clr} strokeWidth={sw} />
                <line x1={xs(lo)} y1={y - 5} x2={xs(lo)} y2={y + 5} stroke={clr} strokeWidth={1.5} />
                <line x1={xs(hi)} y1={y - 5} x2={xs(hi)} y2={y + 5} stroke={clr} strokeWidth={1.5} />
                <line x1={xs(pe)} y1={y - 6} x2={xs(pe)} y2={y + 6} stroke={clr} strokeWidth={2} />
                <circle cx={pl - 24} cy={y} r={11} fill="#2563eb" />
                <text
                  x={pl - 24}
                  y={y + 4}
                  textAnchor="middle"
                  fill="white"
                  fontSize={10}
                  fontWeight="bold"
                >
                  {i + 1}
                </text>
              </g>
            );
          })}
          {/* x-axis */}
          <line
            x1={pl}
            y1={pt + cH}
            x2={pl + cW}
            y2={pt + cH}
            stroke="rgba(255,255,255,0.15)"
          />
          <text x={xs(-1)} y={H - 15} textAnchor="middle" fill="#ef4444" fontSize={10}>
            -1.0%
          </text>
          <text
            x={xs(0)}
            y={H - 15}
            textAnchor="middle"
            fill="rgba(255,255,255,0.5)"
            fontSize={10}
          >
            0%
          </text>
          <text x={xs(1)} y={H - 15} textAnchor="middle" fill="#a3e635" fontSize={10}>
            +1.0%
          </text>
        </svg>
      </div>
      <figcaption className="mt-3 text-xs text-ink-subtle text-center">
        <span className="text-ink-muted font-medium">Fig 3.</span> Five possible experiment
        outcomes plotted by where the 95% CI falls relative to the ±1% MDE thresholds. Scenario
        2 (green) — CI entirely above +1% — is a clean launch signal. Our result landed here.
      </figcaption>
    </figure>
  );
}

// ── Funnel results table ───────────────────────────────────────────────────────

function FunnelTable() {
  const rows = [
    { stage: "Click-through rate (CTR)", lift: "+5.4%" },
    { stage: "Product page views", lift: "+4.8%" },
    { stage: "Add to cart", lift: "+4.1%" },
    { stage: "Checkout started", lift: "+3.5%" },
    { stage: "Orders placed", lift: "+3.1%" },
  ];
  return (
    <div className="my-6 rounded-xl border border-border overflow-hidden text-sm">
      <div className="grid grid-cols-[1fr_auto] bg-bg-elev/60 px-5 py-2.5 text-[10px] font-mono uppercase tracking-widest text-ink-subtle">
        <span>Funnel stage</span>
        <span>Lift vs control</span>
      </div>
      {rows.map(({ stage, lift }) => (
        <div
          key={stage}
          className="grid grid-cols-[1fr_auto] px-5 py-3 border-t border-border/40 hover:bg-bg-elev/30 transition-colors"
        >
          <span className="text-ink-muted">{stage}</span>
          <span className="font-mono font-semibold text-accent">{lift}</span>
        </div>
      ))}
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function AbTestPage() {
  const next = getProject("fico-approximation");

  return (
    <article className="pt-32 pb-24">
      {/* ── Back link */}
      <div className="container-page">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-accent transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> All projects
        </Link>
      </div>

      {/* ── Header */}
      <header className="container-page mt-10">
        <div className="max-w-[840px] mx-auto">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            Work · Meta (Instagram) · Summer 2022
          </p>
          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight leading-[1.08] mt-4">
            A/B Testing on Instagram&apos;s Shop
          </h1>
          <p className="mt-5 text-lg text-ink-muted leading-relaxed">
            The Shop team at Meta had a new ranking algorithm ready to go. Before shipping it to
            everyone, we needed real evidence it worked. This walks through every design decision
            that went into building that evidence.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["A/B Testing", "Experimentation", "Recommender Systems", "Statistical Inference"].map(
              (t) => (
                <span
                  key={t}
                  className="text-[11px] px-2.5 py-1 rounded-md bg-bg-elev border border-border text-ink-muted font-mono"
                >
                  {t}
                </span>
              )
            )}
          </div>
        </div>
      </header>

      {/* ── Article body */}
      <div className="container-page mt-16">

        {/* Opening */}
        <Prose>
          <P>
            The Shop tab uses a ranking algorithm to decide which products to show you, and in what
            order. The ML team built a new version and wanted to roll it out. Before that, we needed
            real evidence it actually moved the numbers, and that the evidence wasn&apos;t just an
            artifact of a badly designed test.
          </P>
          <P>
            Most of the real work in experimentation happens before you touch any analysis code.
            What to measure, how to split users, how many you need, what checks need to pass before
            you trust the result. This is a walkthrough of each of those decisions.
          </P>
        </Prose>

        {/* ── The funnel */}
        <Prose>
          <SH id="setup" step="The Setup">
            User Journey & Where the Algorithm Fits
          </SH>
          <P>
            The user journey on the Shop tab has six steps. The ranking algorithm kicks in at{" "}
            <B>Browses Product Page</B> — it decides which products show up in search results, and
            in what order. Everything that happens after that is shaped by that ranking.
          </P>
        </Prose>

        <Wide>
          <FunnelDiagram />
        </Wide>

        <Prose>
          <P>
            A better ranking should lift CTR, product views, add to cart events, and purchases. But
            it could also inflate early funnel metrics while doing nothing downstream, which is
            exactly why the <Em>choice of success metric</Em> is the most consequential design
            decision in the whole experiment.
          </P>
        </Prose>

        {/* ── Metric */}
        <Prose>
          <SH id="metric" step="Step 01">
            Choosing the Right Metric
          </SH>
          <P>Two options were on the table:</P>

          <OptionBox
            title="Options on the table"
            options={[
              {
                label: "Conversion Rate",
                desc: "% of users who make at least one purchase during the experiment window. Simple to compute, easy to explain.",
              },
              {
                label: "Avg Revenue per User per Day",
                desc: "Average daily spend per exposed user. Captures both purchase frequency and purchase value in a single number.",
              },
            ]}
            chosenLabel="Avg Revenue per User per Day"
            reason="Conversion rate fires once per purchasing user, regardless of order value. A $5 phone case and a $200 jacket count the same. An algorithm that surfaces cheap impulse buys could win on conversion rate while quietly losing on what the business actually cares about. Revenue per user doesn't have that problem."
          />

          <P>
            Four things a good metric needs: <B>measurable</B> (computable from server logs),{" "}
            <B>attributable</B> (traceable back to the treatment session), <B>sensitive</B> (low
            enough variance to detect a 1% lift without needing 100M users), and <B>timely</B> (14
            days is short enough to iterate quickly).
          </P>

          <Callout>
            Conversion rate measures volume. Revenue per user measures value. The difference looks
            academic right up until you ship an algorithm that wins on one while losing on the other.
          </Callout>
        </Prose>

        {/* ── Hypothesis */}
        <Prose>
          <SH id="hypothesis" step="Step 02">
            Writing the Hypothesis
          </SH>
          <P>
            A hypothesis gets written before any data is collected. Not after seeing what moved.
          </P>
          <ul className="mt-5 space-y-2.5 text-[1.0625rem] leading-[1.9]">
            <li className="flex gap-3 items-start">
              <span className="text-accent font-mono text-sm shrink-0 w-6 mt-0.5">H₀</span>
              <span className="text-ink-muted">
                Average revenue per user per day is the same in control and treatment.
              </span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-accent font-mono text-sm shrink-0 w-6 mt-0.5">H₁</span>
              <span className="text-ink-muted">
                Average revenue per user per day differs between the two arms.
              </span>
            </li>
          </ul>
          <P>Three parameters get locked before the experiment starts. None of them change once data starts flowing:</P>
          <div className="mt-5 space-y-3">
            {[
              {
                label: "Significance level",
                val: "α = 0.05",
                desc: "The threshold below which we reject H₀. Represents the false positive rate we're willing to tolerate.",
              },
              {
                label: "Statistical power",
                val: "0.80",
                desc: "80% probability of detecting a real effect if one exists. Industry standard for online experiments.",
              },
              {
                label: "Minimum detectable effect (MDE)",
                val: "1% relative lift",
                desc: "Smallest improvement that justifies the cost of shipping. Drives the sample size calculation.",
              },
            ].map(({ label, val, desc }) => (
              <div
                key={label}
                className="flex gap-4 rounded-lg bg-bg-elev/30 border border-border px-4 py-3"
              >
                <div className="shrink-0 w-36 sm:w-44">
                  <p className="text-xs text-ink-muted font-medium">{label}</p>
                  <p className="font-mono text-sm text-accent mt-0.5">{val}</p>
                </div>
                <p className="text-xs text-ink-subtle leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </Prose>

        {/* ── Design */}
        <Prose>
          <SH id="design" step="Step 03">
            Designing the Experiment
          </SH>
          <SH3>Randomization Unit</SH3>

          <OptionBox
            title="Randomization unit"
            options={[
              {
                label: "Session",
                desc: "Each visit independently gets assigned to an arm. More events per day, simpler bucket logic.",
              },
              {
                label: "User",
                desc: (
                  <>
                    <C>user_id</C> is hashed into a bucket once. The user always sees the same
                    algorithm across all visits.
                  </>
                ),
              },
            ]}
            chosenLabel="User"
            reason={
              <>
                Session level lets the same user see both algorithms across visits, which breaks the
                independence assumption the stats rely on. Revenue per user is a user level metric,
                so it needs a user level randomization unit. <C>user_id</C> gets hashed into 1,000
                buckets, each permanently assigned to one arm.
              </>
            }
          />

          <SH3>Target Population</SH3>
          <P>
            Not all users, just those who triggered at least one search on the Shop tab during the
            window. These are the only users for whom the ranking algorithm actually activates.
            Including people who never saw any ranking just inflates the denominator and adds noise.
          </P>

          <SH3>Sample Size</SH3>
          <P>
            Plugging baseline revenue variance and a 1% MDE into the standard two-sample formula{" "}
            <C>n ≈ 16σ²/Δ²</C> gives about <B>2.1M users per arm</B> (4.2M total). At Instagram
            Shop traffic volumes, that&apos;s roughly 1 to 2 weeks from the target population.
          </P>

          <SH3>Ramp Schedule</SH3>
          <P>
            The experiment ramps from <C>1%</C> → <C>5%</C> → <C>25%</C> → <C>50%</C> with daily
            guardrail checks between each step. If crash rate spikes, latency degrades, or ads
            revenue drops at any stage, the experiment halts before reaching more users.
          </P>
        </Prose>

        {/* ── Run */}
        <Prose>
          <SH id="run" step="Step 04">
            Running the Experiment
          </SH>
          <P>Three things matter during the run:</P>
          <ol className="mt-5 space-y-4 list-none">
            {(
              [
                {
                  n: "1",
                  t: "Instrumentation",
                  d: (
                    <>
                      Every impression, click, add to cart, and purchase gets logged with{" "}
                      <C>user_id</C>, arm assignment, and a session ID so events can be attributed
                      to the correct treatment exposure. Target event loss rate: &lt; 0.5%.
                    </>
                  ),
                },
                {
                  n: "2",
                  t: "Guardrail monitoring",
                  d: "Daily checks on crash rate, p95 latency, ads revenue per user, and hide and report rate. These catch unintended regressions before they affect too many users.",
                },
                {
                  n: "3",
                  t: "No peeking at the primary metric p-value",
                  d: "The end date is committed to before launch and doesn't change based on what the data looks like at day 7. This is the most violated rule in online experimentation.",
                },
              ] as { n: string; t: string; d: ReactNode }[]
            ).map(({ n, t, d }) => (
              <li key={n} className="flex gap-4">
                <span className="font-mono text-xs text-accent shrink-0 mt-[0.45rem] w-5">
                  {n}.
                </span>
                <span className="prose-text">
                  <span className="text-ink font-medium">{t}. </span>
                  {d}
                </span>
              </li>
            ))}
          </ol>

          <Callout>
            Every time you check the p-value mid-experiment and could act on what you see, you add
            a decision point to the test. With α = 0.05, checking daily over a 14 day run can push
            your true false positive rate well above 5%. The prespecified guarantee no longer holds.
          </Callout>
        </Prose>

        {/* ── Validity */}
        <Prose>
          <SH id="validity" step="Step 05">
            Validity Checks
          </SH>
          <P>
            Four checks need to pass before any result gets read. All four do the same thing: rule
            out alternative explanations before attributing what you see to the treatment.
          </P>
          <div className="mt-6 space-y-3">
            {(
              [
                {
                  n: "01",
                  t: "Instrumentation audit",
                  d: (
                    <>
                      Cross-reference server logs and client logs. Event loss rate: <B>&lt; 0.3%</B>.
                      Within tolerance.
                    </>
                  ),
                },
                {
                  n: "02",
                  t: "AA test",
                  d: (
                    <>
                      A 50/50 split ran with no treatment applied the prior week — identical
                      algorithm in both arms. p-value on revenue/user: <C>0.61</C>. Randomization
                      pipeline is unbiased.
                    </>
                  ),
                },
                {
                  n: "03",
                  t: "Ratio check",
                  d: (
                    <>
                      Chi-square test on actual arm sizes: 50.1% / 49.9%, p = <C>0.42</C>. No
                      systematic bucketing bias.
                    </>
                  ),
                },
                {
                  n: "04",
                  t: "Novelty effect",
                  d: "Week 2 lift was 91% of week 1. A decay toward zero would mean users are reacting to novelty, not quality. 91% is stable.",
                },
              ] as { n: string; t: string; d: ReactNode }[]
            ).map(({ n, t, d }) => (
              <div
                key={n}
                className="flex gap-4 rounded-lg bg-bg-elev/30 border border-border px-4 py-3.5"
              >
                <span className="font-mono text-xs text-accent shrink-0 mt-0.5">{n}</span>
                <p className="text-sm text-ink-muted leading-relaxed">
                  <span className="text-ink font-medium">{t}. </span>
                  {d}
                </p>
              </div>
            ))}
          </div>

          <Callout>
            The AA test is like zeroing your scale before you weigh anything. If you skip it and
            the groups turn out unbalanced before treatment, everything you report afterward is
            confounded and there&apos;s no way to know.
          </Callout>
        </Prose>

        {/* ── Results */}
        <Prose>
          <SH id="results" step="Step 06">
            The Results
          </SH>
          <P>All four validity checks cleared. Then we read the results.</P>
        </Prose>

        <Prose>
          <ResultsMetrics />
        </Prose>

        <Wide>
          <RevenueChart />
        </Wide>

        <Prose>
          <P>
            Revenue per user moved from <B>$25.00</B> in control to <B>$26.10</B> in treatment, a
            relative lift of <B>+4.4%</B>. The p-value came in at 0.01, below the prespecified
            α = 0.05 threshold. H₀ rejected.
          </P>
          <P>
            The 95% confidence interval is <B>[+3.4%, +5.4%]</B>. The entire interval sits above
            the 1% MDE. It&apos;s not just statistically significant, it&apos;s{" "}
            <Em>practically</Em> significant. Real improvement of a meaningful size.
          </P>
          <SH3>Funnel check</SH3>
          <P>
            A CTR lift that collapsed at checkout would mean the algorithm is just surfacing
            eye-catching but low-intent products. The lift held all the way through:
          </P>
        </Prose>

        <Prose>
          <FunnelTable />
        </Prose>

        <Prose>
          <P>
            Segment breakdown: dormant users (no purchase in 90 days) <B>+6.9%</B>, APAC{" "}
            <B>+5.1%</B>, high-frequency buyers (3+ prior purchases) <B>+0.2%</B>. The legacy
            ranker was already well calibrated for power users. The gains came from everyone else.
          </P>
        </Prose>

        {/* ── Decision */}
        <Prose>
          <SH id="decision" step="Step 07">
            The Launch Decision
          </SH>
          <P>
            A significant result with CI above the MDE doesn&apos;t automatically mean ship it.
            Three things need to clear first. The forest plot below shows five possible outcomes.
            Only one is a clean signal.
          </P>
        </Prose>

        <Wide>
          <CIForestPlot />
        </Wide>

        <Prose>
          <P>
            Our result is scenario 2: CI fully above the +1% threshold. The other scenarios would
            each lead to a different call, more data, a redesign, or a hard no. Three things that
            closed the decision:
          </P>
          <div className="mt-5 space-y-3">
            {[
              {
                n: "1",
                t: "Metric tradeoffs",
                d: "All guardrails green. No regressions in crash rate, latency, ads revenue, or user satisfaction signals.",
              },
              {
                n: "2",
                t: "Implementation cost",
                d: "Additional inference cost breaks even at ~+0.4% GMV lift. The observed lift is +4.4%. The economics are clear.",
              },
              {
                n: "3",
                t: "False positive risk",
                d: "p = 0.01, CI fully above the MDE. The probability this is noise is negligible.",
              },
            ].map(({ n, t, d }) => (
              <div
                key={n}
                className="flex gap-4 items-start rounded-lg bg-bg-elev/30 border border-border px-4 py-3.5"
              >
                <span className="w-6 h-6 rounded-full bg-accent/20 text-accent font-mono text-xs font-bold flex items-center justify-center shrink-0">
                  {n}
                </span>
                <p className="text-sm text-ink-muted leading-relaxed">
                  <span className="text-ink font-medium">{t}. </span>
                  {d}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-xl bg-accent/10 border border-accent/30 px-6 py-5">
            <p className="font-mono text-xs text-accent mb-1.5">Decision</p>
            <p className="text-ink font-semibold text-lg">
              Launch to 100% with a 5% holdback for 90 days.
            </p>
            <p className="text-sm text-ink-muted mt-1.5">
              The holdback runs as a long-horizon counterfactual to catch any delayed regressions
              or GMV cannibalization that wouldn&apos;t show up in a 14 day window.
            </p>
          </div>
        </Prose>

        {/* ── Takeaways */}
        <Prose>
          <SH id="takeaways" step="What This Gets Right">
            Three Things That Made the Result Trustworthy
          </SH>
          <ol className="mt-5 space-y-4 list-none">
            {(
              [
                {
                  t: "The metric was chosen before the test ran",
                  d: "Revenue per user, not conversion rate, because the question was about GMV not volume. Choosing the metric after seeing the data is the fastest way to invalidate an experiment.",
                },
                {
                  t: "The end date was non-negotiable",
                  d: "No peeking, no early stops, no extensions. Committing to the end date beforehand is the only way the α = 0.05 guarantee stays valid.",
                },
                {
                  t: "The AA test ran the week before",
                  d: "Not as a formality, but as a genuine check. If the groups had been unbalanced before treatment, the entire readout would have been confounded.",
                },
              ] as { t: string; d: string }[]
            ).map(({ t, d }, i) => (
              <li key={i} className="flex gap-4">
                <span className="font-mono text-xs text-accent shrink-0 mt-[0.45rem] w-5">
                  {i + 1}.
                </span>
                <span className="prose-text">
                  <span className="text-ink font-medium">{t}. </span>
                  {d}
                </span>
              </li>
            ))}
          </ol>
        </Prose>

        {/* ── Next project */}
        {next && (
          <div className="max-w-2xl mx-auto mt-24 pt-12 border-t border-border">
            <Link
              href={`/projects/${next.slug}`}
              className="group block card p-8 hover:translate-y-[-2px] transition-transform"
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-ink-subtle">
                    Next project
                  </div>
                  <h3 className="font-display text-xl font-bold tracking-tight mt-2 group-hover:text-accent transition-colors">
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
        )}
      </div>
    </article>
  );
}

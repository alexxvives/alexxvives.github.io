import type { Metadata } from "next";
import {
  Prose, Wide, B, Em, C, SH, SH3, P, Callout,
  MetricStrip, NextProject, ArticleHeader, BackLink,
} from "../_article";

export const metadata: Metadata = {
  title: "White-box Affinity Scoring — Alexandre Vives",
  description:
    "A white-box behavioral scoring system using 1,000+ binary flags to rank customers by product affinity — no retraining, +29% lift in campaign product openings.",
};

// ── Diagram 1: System architecture ───────────────────────────────────────────

function SystemDiagram() {
  const stages = [
    {
      icon: "⌛",
      label: "90-Day Behavioral Window",
      sub: "transaction logs · product events · digital actions",
      color: "#3b82f6",
    },
    {
      icon: "🏷",
      label: "Flag Evaluation",
      sub: "~1,000 binary rules, e.g. '3+ Zelle transfers in 30d'",
      color: "#8b5cf6",
    },
    {
      icon: "⚖️",
      label: "Weighted Linear Score",
      sub: "flag weight = historical lift over baseline open-rate",
      color: "#f97316",
    },
    {
      icon: "📊",
      label: "Decile Assignment",
      sub: "rank order → 10 tiers per product",
      color: "#a3e635",
    },
    {
      icon: "📣",
      label: "Marketing Trigger",
      sub: "audience segmentation API · nightly refresh",
      color: "#22d3ee",
    },
  ];

  return (
    <figure className="select-none">
      <div className="rounded-xl bg-bg-elev/50 border border-border p-6">
        <div className="flex flex-col sm:flex-row items-stretch gap-0">
          {stages.map((s, i) => (
            <div key={s.label} className="flex sm:flex-col items-center flex-1 min-w-0">
              <div
                className="rounded-xl border px-3 py-3 text-center flex-1 w-full"
                style={{ borderColor: s.color + "55", background: s.color + "10" }}
              >
                <p className="text-lg mb-1">{s.icon}</p>
                <p className="text-xs font-semibold text-ink leading-snug">{s.label}</p>
                <p className="text-[10px] text-ink-muted mt-1 leading-snug hidden sm:block">{s.sub}</p>
              </div>
              {i < stages.length - 1 && (
                <div className="flex sm:hidden w-6 shrink-0 items-center justify-center text-ink-subtle">→</div>
              )}
              {i < stages.length - 1 && (
                <div className="hidden sm:flex h-5 w-full items-center justify-center text-ink-subtle text-sm">→</div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-lg bg-bg-card border border-border/40 px-4 py-2 text-center">
          <p className="text-[10px] font-mono text-ink-subtle uppercase tracking-wider">
            ↻ Auto-updates nightly · flag weights recomputed from rolling 90-day window · zero retraining cost
          </p>
        </div>
      </div>
      <figcaption className="mt-3 text-xs text-ink-subtle text-center">
        <span className="text-ink-muted font-medium">Fig 1.</span> End-to-end scoring pipeline.
        The key architectural property: flag weights are recomputed nightly from fresh data,
        so the model never drifts and never needs a retraining ceremony.
      </figcaption>
    </figure>
  );
}

// ── Diagram 2: Example flag card ──────────────────────────────────────────────

function FlagCard() {
  const flags = [
    { flag: "Made 3+ Zelle transfers in last 30d", weight: "+18%", active: true },
    { flag: "Opened savings account in last 90d", weight: "+14%", active: true },
    { flag: "Mobile check deposit in last 60d", weight: "+11%", active: true },
    { flag: "No debit card usage in last 30d", weight: "−7%", active: false },
    { flag: "Last login > 45 days ago", weight: "−12%", active: false },
  ];

  return (
    <figure className="select-none">
      <div className="rounded-xl bg-bg-elev/50 border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-ink-subtle">
              Sample customer · Product: savings account
            </p>
            <p className="text-sm font-semibold text-ink mt-0.5">Score: 82 / 100 · Decile 1</p>
          </div>
          <div className="rounded-lg bg-accent/10 border border-accent/30 px-3 py-1.5 text-center">
            <p className="text-xl font-bold text-accent">82</p>
            <p className="text-[9px] font-mono text-ink-muted">AFFINITY</p>
          </div>
        </div>
        <div className="space-y-2">
          {flags.map(({ flag, weight, active }) => (
            <div
              key={flag}
              className={`flex items-center justify-between rounded-lg px-3 py-2 ${
                active ? "bg-accent/5 border border-accent/20" : "bg-bg-card border border-border/40 opacity-50"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`text-xs ${active ? "text-accent" : "text-ink-subtle"}`}>
                  {active ? "✓" : "✗"}
                </span>
                <span className="text-xs text-ink-muted">{flag}</span>
              </div>
              <span
                className={`font-mono text-xs font-semibold ${
                  weight.startsWith("+") ? "text-accent" : "text-red-400"
                }`}
              >
                {weight}
              </span>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-ink-subtle mt-3 text-center font-mono">
          Score = sum of active flag weights relative to category baseline open-rate
        </p>
      </div>
      <figcaption className="mt-3 text-xs text-ink-subtle text-center">
        <span className="text-ink-muted font-medium">Fig 2.</span> Attribution for a sample
        high-decile customer. Each activated flag and its lift contribution is visible —
        marketers can explain to compliance exactly why this customer received the offer.
      </figcaption>
    </figure>
  );
}

// ── Diagram 3: Lift by decile bar chart ───────────────────────────────────────

function LiftChart() {
  const W = 520, H = 200;
  const pl = 44, pr = 16, pt = 14, pb = 36;
  const cW = W - pl - pr, cH = H - pt - pb;
  // Lift over baseline open-rate by decile: top deciles very high, tapering off
  const vals = [3.8, 2.9, 2.1, 1.6, 1.2, 0.9, 0.7, 0.5, 0.3, 0.1];
  const maxV = 4.2;
  const slotW = cW / vals.length;
  const bW = slotW - 5;

  return (
    <figure className="select-none">
      <div className="rounded-xl bg-bg-elev/50 border border-border p-5 pb-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden="true">
          {/* baseline line at 1x */}
          <line
            x1={pl}
            y1={pt + cH - (1 / maxV) * cH}
            x2={pl + cW}
            y2={pt + cH - (1 / maxV) * cH}
            stroke="rgba(255,255,255,0.2)"
            strokeDasharray="4,3"
          />
          <text
            x={pl + cW + 3}
            y={pt + cH - (1 / maxV) * cH + 3}
            fill="rgba(255,255,255,0.3)"
            fontSize={8}
          >
            baseline
          </text>
          {[1, 2, 3, 4].map((v) => (
            <g key={v}>
              <line x1={pl} y1={pt + cH - (v / maxV) * cH} x2={pl + cW} y2={pt + cH - (v / maxV) * cH} stroke="rgba(255,255,255,0.05)" />
              <text x={pl - 6} y={pt + cH - (v / maxV) * cH + 3} textAnchor="end" fill="rgba(255,255,255,0.3)" fontSize={9}>
                {v}×
              </text>
            </g>
          ))}
          {vals.map((v, i) => {
            const x = pl + i * slotW + 2;
            const bH = (v / maxV) * cH;
            const y = pt + cH - bH;
            const fill = i < 3 ? "#a3e635" : i < 6 ? "rgba(163,230,53,0.4)" : "rgba(255,255,255,0.12)";
            return (
              <g key={i}>
                <rect x={x} y={y} width={bW} height={bH} fill={fill} rx={3} />
                <text
                  x={x + bW / 2}
                  y={H - pb + 14}
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.4)"
                  fontSize={9}
                >
                  {i + 1}
                </text>
              </g>
            );
          })}
          <line x1={pl} y1={pt} x2={pl} y2={pt + cH} stroke="rgba(255,255,255,0.1)" />
          <line x1={pl} y1={pt + cH} x2={pl + cW} y2={pt + cH} stroke="rgba(255,255,255,0.1)" />
          <text x={pl + cW / 2} y={H - 4} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize={9}>
            Score Decile (1 = highest affinity)
          </text>
          <text
            x={12}
            y={pt + cH / 2}
            textAnchor="middle"
            fill="rgba(255,255,255,0.3)"
            fontSize={9}
            transform={`rotate(-90 12 ${pt + cH / 2})`}
          >
            Lift over Baseline Open-Rate
          </text>
        </svg>
      </div>
      <figcaption className="mt-3 text-xs text-ink-subtle text-center">
        <span className="text-ink-muted font-medium">Fig 3.</span> Product opening lift by
        score decile vs. baseline open-rate. Targeting deciles 1–3 alone captures 3–4× the
        baseline response rate, explaining the +29% lift in campaign performance.
      </figcaption>
    </figure>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function MicrosegmentsPage() {
  return (
    <article className="pt-32 pb-24">
      <BackLink />
      <ArticleHeader
        eyebrow="Work · Santander Bank · 2023"
        title="White-box Affinity Scoring"
        subtitle="1,000+ binary behavioral flags, a transparent linear score, and a self-updating 90-day window — no black-box model, zero retraining cost, +29% campaign lift."
        tags={["White-box ML", "Segmentation", "A/B Testing", "Rolling Windows", "Interpretability"]}
      />

      <div className="mt-16">
        {/* Opening */}
        <Prose>
          <P>
            The bank had a model drift problem. Every black-box scoring model deployed for
            marketing — propensity models, response models, affinity models — decayed within
            months. Customer behavior shifted, new products launched, the world changed. The
            models didn&apos;t. The solution was always the same: a quarterly retraining cycle
            that consumed weeks of data science time and still lagged the market by 3–6 months.
          </P>
          <P>
            There was a second problem: the scores were opaque. When a compliance reviewer asked
            &quot;why is this customer in the top decile?&quot; the answer was a SHAP waterfall
            chart that no one outside data science could interpret. When marketers asked why a
            segment suddenly shifted, no one could answer.
          </P>
          <P>
            This project replaced the black-box stack with a transparent system designed to
            self-update continuously and explain itself in plain language.
          </P>
        </Prose>

        {/* Step 01 */}
        <Prose>
          <SH id="flags" step="Step 01">
            1,000+ Binary Behavioral Flags
          </SH>
          <P>
            The core idea is simple: instead of learning latent representations, enumerate
            observable behaviors. A customer either &quot;made 3+ Zelle transfers in the last
            30 days&quot; or they didn&apos;t. They either &quot;opened a savings account in
            the last 90 days&quot; or they didn&apos;t. Each flag is a binary rule, computable
            directly from transaction logs and product event tables.
          </P>
          <P>
            The flag library contains <B>~1,000 rules</B> across five categories: transaction
            patterns, product events, digital engagement, account lifecycle milestones, and
            peer benchmarking cohort flags. Most flags are simple threshold rules over rolling
            windows — 30, 60, or 90 days.
          </P>

          <Callout>
            The 90-day window wasn&apos;t arbitrary. Shorter windows (30 days) were too noisy —
            individual months have high variance in transaction volume. Longer windows (180 days)
            were too stale for fast-moving signals like digital engagement. 90 days was the
            empirical sweet spot validated on held-out A/B data.
          </Callout>
        </Prose>

        {/* Step 02 */}
        <Prose>
          <SH id="scoring" step="Step 02">
            From Flags to Scores: A Transparent Linear Model
          </SH>
          <P>
            For each product, flags are ranked by <B>historical lift over the product&apos;s
            baseline open-rate</B>. A flag that predicts 3× the baseline opening rate gets a
            high weight. A flag associated with lower-than-average opening rates gets a negative
            weight. The final score is a weighted sum of activated flags.
          </P>
          <P>
            This is interpretable by construction. Every score has an exact flag-level
            attribution that can be printed in a compliance report, shown to a marketer, or
            debugged by a data scientist in seconds.
          </P>
        </Prose>

        <Wide>
          <SystemDiagram />
        </Wide>

        <Prose>
          <P>
            The self-updating mechanism is what makes this different from a static model.
            Flag weights are recomputed nightly from the rolling 90-day window. If customer
            behavior shifts — say, a new digital feature drives a surge in app logins — the
            weight on login-related flags updates within 24 hours. No retraining job, no model
            deployment, no ceremony.
          </P>
        </Prose>

        <Wide>
          <FlagCard />
        </Wide>

        {/* Step 03 */}
        <Prose>
          <SH id="validation" step="Step 03">
            Validation: A/B Test Against Black-Box Baseline
          </SH>
          <P>
            The system was validated against the prior black-box scoring model in a randomized
            A/B test across three product campaigns (deposits, credit cards, auto loans). Random
            assignment ensured that the only difference was the targeting model — same offer,
            same channel, same audience size.
          </P>
          <P>
            The white-box system outperformed the black-box model on all three campaigns, with
            an average <B>+29% lift in product opening rates</B>. The lift came primarily from
            the top three deciles — the black-box model had over-represented &quot;sure thing&quot;
            customers in its high-score tier, while the white-box flags more precisely
            identified genuinely persuadable customers.
          </P>
        </Prose>

        <Wide>
          <LiftChart />
        </Wide>

        <MetricStrip
          metrics={[
            { label: "lift in product opening rates per campaign", value: "+29%", sub: "vs. black-box baseline" },
            { label: "behavioral segment flags", value: "1,000+", sub: "binary rules · 5 categories" },
            { label: "model retraining cost", value: "$0", sub: "nightly self-update" },
            { label: "flag attribution fields per customer", value: "4–5", sub: "compliance-ready" },
          ]}
        />

        {/* Takeaways */}
        <Prose>
          <SH id="takeaways" step="What This Gets Right">
            Sometimes the Answer Isn&apos;t Deep Learning
          </SH>
          <P>
            <B>1. Interpretability is a product feature, not a nice-to-have.</B> The marketing
            team&apos;s adoption of the system skyrocketed once they understood why each customer
            was in the top decile. Knowing that a customer &quot;made 3+ Zelle transfers and opened
            a savings account in the last 90 days&quot; is actionable context for creative and
            offer design. A SHAP value isn&apos;t.
          </P>
          <P>
            <B>2. Self-updating removes the biggest operational bottleneck.</B> The quarterly
            retraining cycle wasn&apos;t just expensive — it introduced model staleness as a
            systematic risk. Nightly flag-weight updates mean the system always reflects the
            last 90 days of actual customer behavior, not a snapshot from months ago.
          </P>
          <P>
            <B>3. The right level of complexity is the minimum that works.</B> A linear model
            over binary flags sounds naive compared to a gradient-boosted ensemble. It also
            outperformed one in production. The lesson: match model complexity to the
            interpretability and maintenance requirements of the deployment context.
          </P>
        </Prose>

        <NextProject slug="printer-sales-forecast" />
      </div>
    </article>
  );
}

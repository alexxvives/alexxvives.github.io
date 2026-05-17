import type { Metadata } from "next";
import {
  Prose, Wide, B, Em, C, SH, SH3, P, Callout, OptionBox,
  MetricStrip, NextProject, ArticleHeader, BackLink,
} from "../_article";

export const metadata: Metadata = {
  title: "Customer Lifetime Value Model — Alexandre Vives",
  description:
    "How a gradient-boosted CLTV model shifted Santander's marketing from volume acquisition to value acquisition, lifting average deposits per campaign by 18%.",
};

// ── Diagram 1: ML Pipeline ────────────────────────────────────────────────────

function MLPipeline() {
  const steps = [
    { label: "Raw Data", sub: "transactions · deposits · digital · demographics", color: "#3b82f6" },
    { label: "Feature Engineering", sub: "~180 features · rolling windows · ZIP enrichment", color: "#8b5cf6" },
    { label: "XGBoost Regression", sub: "monotonic constraints · 5-fold time-aware CV", color: "#f97316" },
    { label: "Isotonic Calibration", sub: "held-out cohort · reduces distribution shift", color: "#ec4899" },
    { label: "Decile Buckets", sub: "rank-ordered scores → 10 tiers", color: "#a3e635" },
    { label: "Marketing Platform", sub: "Streamlit dashboard · campaign handoff", color: "#22d3ee" },
  ];
  return (
    <figure className="select-none">
      <div className="rounded-xl bg-bg-elev/50 border border-border p-6">
        <div className="flex flex-col sm:flex-row items-stretch gap-0">
          {steps.map((s, i) => (
            <div key={s.label} className="flex sm:flex-col items-center flex-1 min-w-0">
              <div
                className="rounded-xl border px-3 py-3 text-center flex-1 w-full"
                style={{ borderColor: s.color + "55", background: s.color + "10" }}
              >
                <p className="text-xs font-semibold text-ink leading-snug">{s.label}</p>
                <p className="text-[10px] text-ink-muted mt-1 leading-snug hidden sm:block">{s.sub}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="flex sm:hidden w-6 shrink-0 items-center justify-center text-ink-subtle text-lg">→</div>
              )}
              {i < steps.length - 1 && (
                <div className="hidden sm:flex h-5 w-full items-center justify-center text-ink-subtle text-sm">→</div>
              )}
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-3 text-xs text-ink-subtle text-center">
        <span className="text-ink-muted font-medium">Fig 1.</span> End-to-end CLTV modeling
        pipeline. Isotonic calibration was critical for risk team sign-off — raw XGBoost scores
        drifted at the tails.
      </figcaption>
    </figure>
  );
}

// ── Diagram 2: Decile CLTV bar chart ──────────────────────────────────────────

function DecileChart() {
  const W = 560, H = 200;
  const pl = 46, pr = 16, pt = 14, pb = 36;
  const cW = W - pl - pr, cH = H - pt - pb;
  const vals = [4200, 3600, 3050, 2650, 2250, 1850, 1480, 1150, 790, 440];
  const maxV = 4600;
  const slotW = cW / vals.length;
  const bW = slotW - 5;

  return (
    <figure className="select-none">
      <div className="rounded-xl bg-bg-elev/50 border border-border p-5 pb-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden="true">
          {[0, 1000, 2000, 3000, 4000].map((v) => {
            const y = pt + cH - (v / maxV) * cH;
            return (
              <g key={v}>
                <line x1={pl} y1={y} x2={pl + cW} y2={y} stroke="rgba(255,255,255,0.06)" />
                <text x={pl - 6} y={y + 3} textAnchor="end" fill="rgba(255,255,255,0.3)" fontSize={9}>
                  ${v / 1000}k
                </text>
              </g>
            );
          })}
          {vals.map((v, i) => {
            const x = pl + i * slotW + 2;
            const bH = (v / maxV) * cH;
            const y = pt + cH - bH;
            const fill = i < 3 ? "#a3e635" : "rgba(255,255,255,0.14)";
            return (
              <g key={i}>
                <rect x={x} y={y} width={bW} height={bH} fill={fill} rx={3} />
                <text
                  x={x + bW / 2}
                  y={H - pb + 14}
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.45)"
                  fontSize={9}
                >
                  {i + 1}
                </text>
              </g>
            );
          })}
          <line x1={pl} y1={pt} x2={pl} y2={pt + cH} stroke="rgba(255,255,255,0.1)" />
          <line x1={pl} y1={pt + cH} x2={pl + cW} y2={pt + cH} stroke="rgba(255,255,255,0.1)" />
          <text x={pl + cW * 0.12} y={pt + 2} fill="#a3e635" fontSize={9} textAnchor="middle">
            targeted
          </text>
        </svg>
      </div>
      <figcaption className="mt-3 text-xs text-ink-subtle text-center">
        <span className="text-ink-muted font-medium">Fig 2.</span> Avg predicted 2-year CLTV by
        score decile. Redirecting spend to deciles 1–3 (green) doubled the average value per
        acquired customer vs. random targeting.
      </figcaption>
    </figure>
  );
}

// ── Diagram 3: Lift curve ─────────────────────────────────────────────────────

function LiftCurve() {
  const W = 560, H = 220;
  const pl = 44, pr = 20, pt = 20, pb = 40;
  const cW = W - pl - pr, cH = H - pt - pb;
  const xs = (pct: number) => pl + (pct / 100) * cW;
  const ys = (pct: number) => pt + cH - (pct / 100) * cH;

  // Model captures 64% of value by contacting top 50%
  const model = [0, 14, 28, 42, 55, 64, 72, 79, 85, 91, 96, 100];
  const pts = model.map((v, i) => {
    const x = xs((i / (model.length - 1)) * 100);
    const y = ys(v);
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  });
  const dModel = pts.join(" ");
  const dArea = `${dModel} L${xs(100).toFixed(1)},${ys(0).toFixed(1)} L${xs(0).toFixed(1)},${ys(0).toFixed(1)} Z`;

  return (
    <figure className="select-none">
      <div className="rounded-xl bg-bg-elev/50 border border-border p-5 pb-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden="true">
          {[25, 50, 75, 100].map((v) => (
            <g key={v}>
              <line x1={pl} y1={ys(v)} x2={pl + cW} y2={ys(v)} stroke="rgba(255,255,255,0.05)" />
              <text x={pl - 6} y={ys(v) + 3} textAnchor="end" fill="rgba(255,255,255,0.3)" fontSize={9}>
                {v}%
              </text>
              <line x1={xs(v)} y1={pt} x2={xs(v)} y2={pt + cH} stroke="rgba(255,255,255,0.05)" />
              <text x={xs(v)} y={pt + cH + 14} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize={9}>
                {v}%
              </text>
            </g>
          ))}
          <line x1={pl} y1={pt} x2={pl} y2={pt + cH} stroke="rgba(255,255,255,0.1)" />
          <line x1={pl} y1={pt + cH} x2={pl + cW} y2={pt + cH} stroke="rgba(255,255,255,0.1)" />
          {/* random baseline */}
          <line
            x1={pl} y1={pt + cH}
            x2={pl + cW} y2={pt}
            stroke="rgba(255,255,255,0.2)"
            strokeDasharray="4,3"
          />
          {/* model area */}
          <path d={dArea} fill="#a3e635" fillOpacity={0.07} />
          {/* model line */}
          <path d={dModel} fill="none" stroke="#a3e635" strokeWidth={2.5} strokeLinejoin="round" />
          {/* annotation: 64% @ 50% */}
          <circle cx={xs(50)} cy={ys(64)} r={3.5} fill="#a3e635" />
          <line x1={xs(50)} y1={ys(64)} x2={xs(50)} y2={ys(0)} stroke="#a3e635" strokeOpacity={0.3} strokeDasharray="3,2" />
          <text x={xs(50) + 6} y={ys(64) - 6} fill="#a3e635" fontSize={9}>
            64% of value
          </text>
          <text x={xs(50) + 6} y={ys(64) + 6} fill="#a3e635" fontSize={9}>
            @ top 50%
          </text>
          {/* labels */}
          <text x={pl + 6} y={ys(96) - 4} fill="#a3e635" fontSize={10}>
            CLTV model
          </text>
          <text x={pl + cW - 50} y={ys(52) + 14} fill="rgba(255,255,255,0.35)" fontSize={9}>
            Random
          </text>
          <text
            x={12}
            y={pt + cH / 2}
            fill="rgba(255,255,255,0.35)"
            fontSize={9}
            textAnchor="middle"
            transform={`rotate(-90 12 ${pt + cH / 2})`}
          >
            % Value Captured
          </text>
          <text x={pl + cW / 2} y={H - 4} textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize={9}>
            % Population Contacted
          </text>
        </svg>
      </div>
      <figcaption className="mt-3 text-xs text-ink-subtle text-center">
        <span className="text-ink-muted font-medium">Fig 3.</span> Cumulative lift curve. The
        model captures 64% of total CLTV by targeting just the top 50% of prospects — vs 50%
        for random outreach.
      </figcaption>
    </figure>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function CLTVPage() {
  return (
    <article className="pt-32 pb-24">
      <BackLink />
      <ArticleHeader
        eyebrow="Work · Santander Bank · 2024"
        title="Customer Lifetime Value Model"
        subtitle="Predicting 2-year customer profitability to shift marketing strategy from volume acquisition to value acquisition — without spending more."
        tags={["Supervised Learning", "XGBoost", "Marketing", "Snowflake", "Isotonic Calibration"]}
      />

      <div className="container-page mt-16">
        {/* Opening */}
        <Prose>
          <P>
            Santander&apos;s marketing machine was optimized for one thing: getting as many people as
            possible to open an account. The campaigns were efficient at volume. They were terrible
            at selecting <Em>which</Em> people to acquire.
          </P>
          <P>
            The result was a growing book of low-value customers who held small balances, rarely
            cross-purchased, and drove up cost-to-serve ratios. The business had no way to
            distinguish between a prospect worth $4,000 in lifetime margin and one worth $400 —
            not before acquisition, at least. Every lead was treated equally.
          </P>
          <P>
            The ask: build a model that scores every prospect by expected 2-year profitability
            before the campaign runs, so spend can be redirected toward the right people.
          </P>
        </Prose>

        {/* Step 01 */}
        <Prose>
          <SH id="target" step="Step 01">
            Defining the Right Target Variable
          </SH>
          <P>
            The first and most important decision wasn&apos;t modeling — it was <B>what to model</B>.
            Customer lifetime value (CLTV) is a slippery target. There are many ways to define it,
            and the choice shapes everything downstream.
          </P>
          <P>
            We settled on <B>2-year net contribution margin per customer</B>: deposits multiplied
            by net interest margin, minus cost-to-serve, minus attrition-adjusted early churn.
            This definition is grounded in actual P&amp;L, captures the horizon most relevant to
            the business, and excludes vanity signals like engagement that don&apos;t translate to
            revenue.
          </P>

          <OptionBox
            title="Two candidate target definitions"
            options={[
              {
                label: "First-year revenue",
                desc: "Deposits × NIM in year one. Simple to compute, quick to validate. Misses long-horizon retention and cross-sell effects.",
              },
              {
                label: "2-year net contribution margin",
                desc: "Deposits × NIM − cost-to-serve − attrition-adjusted churn over 24 months. Aligned to P&L and the actual business horizon.",
              },
            ]}
            chosenLabel="2-year net contribution margin"
            reason="First-year revenue systematically undervalues customers who take time to deepen their relationship with the bank. A customer who opens a savings account in month 1 and a mortgage in month 14 looks mediocre at 12 months and excellent at 24. The longer horizon captures the actual acquisition quality the business cares about."
          />
        </Prose>

        {/* Step 02 */}
        <Prose>
          <SH id="features" step="Step 02">
            Feature Engineering: 180 Signals
          </SH>
          <P>
            The model was built on <B>~180 features</B> drawn from five feature families. Each
            family captures a different facet of a customer&apos;s financial profile:
          </P>

          <div className="my-6 grid sm:grid-cols-2 gap-3">
            {[
              { name: "Product Holdings", detail: "accounts, cards, loans, investment products held" },
              { name: "Transaction Velocity", detail: "monthly avg inflows, frequency, ACH vs wire patterns" },
              { name: "Digital Engagement", detail: "login frequency, feature adoption, push notification opens" },
              { name: "Demographics", detail: "age cohort, tenure, acquisition channel, branch proximity" },
              { name: "ZIP-level Enrichment", detail: "median income, employment rate, regional deposit penetration" },
            ].map(({ name, detail }) => (
              <div key={name} className="rounded-xl border border-border/50 bg-bg-elev/30 px-4 py-3">
                <p className="text-sm font-semibold text-ink mb-1">{name}</p>
                <p className="text-xs text-ink-muted leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>

          <P>
            Transaction velocity features were the most predictive in isolation. Digital
            engagement was the most incrementally valuable — it added signal beyond what
            transactions alone captured, especially for identifying dormant accounts early.
          </P>
        </Prose>

        {/* Step 03 — Pipeline */}
        <Prose>
          <SH id="model" step="Step 03">
            Training, Calibrating, and Deploying
          </SH>
          <P>
            The model is a <B>gradient-boosted regression (XGBoost)</B>, tuned via 5-fold
            time-aware cross-validation — folds respect chronological order to prevent leakage
            from the future. The most important architectural decision was adding{" "}
            <B>monotonic constraints</B> on a handful of key features like account tenure and
            deposit balance: the model was forced to agree that more tenure is weakly better,
            and more deposits are weakly better. Not because that always holds in the data, but
            because it has to hold in the business logic — and baking it in made the model
            legible to risk and compliance reviewers.
          </P>
        </Prose>

        <Wide>
          <MLPipeline />
        </Wide>

        <Prose>
          <P>
            After training, raw scores were <B>calibrated with isotonic regression</B> on a
            held-out cohort. XGBoost scores tend to compress at the tails — the model is
            uncertain about the very top and very bottom, so it pulls predictions toward the
            mean. Isotonic calibration corrects this, ensuring the top-decile scores actually
            correspond to top-decile realized margins.
          </P>

          <Callout>
            Monotonic constraints weren&apos;t technically necessary for accuracy — the model
            learned the right direction anyway. They were necessary for{" "}
            <strong>adoption</strong>. A compliance reviewer who sees &quot;higher tenure →
            lower predicted value&quot; in a feature plot will kill a project. Good ML
            engineering includes making the model explainable to the people who have to
            approve it.
          </Callout>

          <P>
            Final scores are bucketed into <B>deciles</B> for the marketing handoff. Predicted
            dollar values are noisy — the model can be off by $300 on a $2,000 prediction. But
            rank order is very stable. Giving marketers a &quot;top decile / mid tier / low
            tier&quot; interface, rather than raw predictions, makes the output robust to that
            uncertainty.
          </P>
        </Prose>

        {/* Decile chart */}
        <Wide>
          <DecileChart />
        </Wide>

        {/* Step 04 — Results */}
        <Prose>
          <SH id="results" step="Step 04">
            Validation & Results
          </SH>
          <P>
            The model was validated on 18 months of out-of-time data before deployment. In
            production, campaigns were rerun with marketing spend redirected to the top three
            score deciles — and the results held.
          </P>
        </Prose>

        <MetricStrip
          metrics={[
            { label: "lift in avg deposits per campaign", value: "+18%", sub: "top-3 decile targeting" },
            { label: "acquisition cost reduction", value: "−11%", sub: "same revenue target" },
            { label: "marketing pillars adopted", value: "4", sub: "deposits · lending · cards · wealth" },
            { label: "feature horizon", value: "2 yr", sub: "net contribution margin" },
          ]}
        />

        <Wide>
          <LiftCurve />
        </Wide>

        <Prose>
          <P>
            The model was adopted across four marketing pillars at the bank — deposits, lending,
            credit cards, and wealth management. Each team uses the same scoring infrastructure
            with the same monthly batch cadence in <B>Snowflake</B>, with a{" "}
            <B>Streamlit dashboard</B> for campaign owners to slice scores by product and
            filter to their audience.
          </P>
        </Prose>

        {/* Takeaways */}
        <Prose>
          <SH id="takeaways" step="What This Gets Right">
            Three Things Worth Carrying Forward
          </SH>
          <P>
            <B>1. Monotonic constraints are a compliance interface, not just a modeling tool.</B>{" "}
            They don&apos;t always improve accuracy, but they make the model legible to risk
            reviewers, which is often the difference between a model that ships and one that
            doesn&apos;t in a regulated environment.
          </P>
          <P>
            <B>2. Decile buckets are the right interface for marketers.</B> Predicted dollar
            values feel precise but aren&apos;t. Rank-ordered tiers are less precise but more
            actionable and more robust to model uncertainty at the individual level.
          </P>
          <P>
            <B>3. The hardest part is defining the target variable, not training the model.</B>{" "}
            A well-defined CLTV target aligned to actual P&L is worth more than any hyperparameter
            tuning. Getting that definition right with the finance team — early — is the most
            important work in the project.
          </P>
        </Prose>

        <NextProject slug="uplift-model" />
      </div>
    </article>
  );
}

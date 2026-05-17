import type { Metadata } from "next";
import {
  Prose, Wide, B, Em, C, SH, SH3, P, Callout, OptionBox,
  MetricStrip, NextProject, ArticleHeader, BackLink,
} from "../_article";

export const metadata: Metadata = {
  title: "Causal Uplift Model for Credit Card Campaigns — Alexandre Vives",
  description:
    "A two-model T-learner that targets persuadable customers, lifting credit card acquisitions +15% with zero additional budget.",
};

// ── Diagram 1: 4-Quadrant matrix ──────────────────────────────────────────────

function FourQuadrant() {
  const quadrants = [
    {
      name: "Persuadables",
      desc: "Low baseline, high treatment response. The gold standard: offer works here.",
      col: "border-accent/50 bg-accent/5",
      label: "HIGH UPLIFT",
      labelColor: "#a3e635",
      pos: "top-left",
    },
    {
      name: "Sure Things",
      desc: "Would convert regardless. Wasted spend: they buy without the offer.",
      col: "border-border/50 bg-bg-elev/20",
      label: "WASTED SPEND",
      labelColor: "rgba(255,255,255,0.3)",
      pos: "top-right",
    },
    {
      name: "Lost Causes",
      desc: "Won't convert regardless of offer. No impact in either direction.",
      col: "border-border/50 bg-bg-elev/20",
      label: "NO IMPACT",
      labelColor: "rgba(255,255,255,0.3)",
      pos: "bottom-left",
    },
    {
      name: "Sleeping Dogs",
      desc: "Negative uplift: the offer actually reduces their likelihood to convert.",
      col: "border-red-500/30 bg-red-500/5",
      label: "SUPPRESS",
      labelColor: "#f87171",
      pos: "bottom-right",
    },
  ];

  return (
    <figure className="select-none">
      <div className="rounded-xl bg-bg-elev/50 border border-border p-6">
        <div className="grid grid-cols-2 gap-3">
          {quadrants.map((q) => (
            <div key={q.name} className={`rounded-xl border p-4 ${q.col}`}>
              <div className="flex items-start justify-between mb-2">
                <p className="text-sm font-semibold text-ink">{q.name}</p>
                <span
                  className="text-[9px] font-mono uppercase tracking-wider font-semibold"
                  style={{ color: q.labelColor }}
                >
                  {q.label}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-ink-muted">{q.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-3 text-xs text-ink-subtle text-center">
        <span className="text-ink-muted font-medium">Fig 1.</span> The four customer archetypes
        in uplift modeling. Standard propensity models only distinguish &quot;converts&quot; vs
        &quot;doesn&apos;t convert&quot;, missing the sleeping dogs entirely.
      </figcaption>
    </figure>
  );
}

// ── Diagram 2: Qini curve ─────────────────────────────────────────────────────

function AUUCCurve() {
  const W = 580, H = 280;
  const pl = 52, pr = 20, pt = 38, pb = 52;
  const cW = W - pl - pr, cH = H - pt - pb;
  const xs = (p: number) => pl + (p / 100) * cW;
  const ys = (v: number) => pt + cH * (1 - v);

  // Illustrative single T-learner curve: steep rise → plateau → clear decline into sleeping dogs
  // crossover with random at ~x=83.75%, y≈0.838
  const posFill = [
    [0, 0.00], [10, 0.34], [20, 0.61], [30, 0.80], [40, 0.91],
    [50, 0.96], [60, 0.98], [70, 0.97], [80, 0.89], [83.75, 0.838],
    // back along random
    [80, 0.80], [70, 0.70], [60, 0.60], [50, 0.50],
    [40, 0.40], [30, 0.30], [20, 0.20], [10, 0.10],
  ].map(([x, y], i) => `${i === 0 ? "M" : "L"}${xs(x).toFixed(1)},${ys(y).toFixed(1)}`).join(" ") + " Z";

  const negFill = [
    [83.75, 0.838], [90, 0.75], [100, 0.58],
    [100, 1.00], [90, 0.90],
  ].map(([x, y], i) => `${i === 0 ? "M" : "L"}${xs(x).toFixed(1)},${ys(y).toFixed(1)}`).join(" ") + " Z";

  const tlrPath = [[0,0],[10,0.34],[20,0.61],[30,0.80],[40,0.91],[50,0.96],[60,0.98],[70,0.97],[80,0.89],[90,0.75],[100,0.58]]
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${xs(x).toFixed(1)},${ys(y).toFixed(1)}`).join(" ");

  const randPath = [[0,0],[10,0.10],[20,0.20],[30,0.30],[40,0.40],[50,0.50],[60,0.60],[70,0.70],[80,0.80],[90,0.90],[100,1.00]]
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${xs(x).toFixed(1)},${ys(y).toFixed(1)}`).join(" ");

  // Region boundary x values
  const x1 = 50, x2 = 83.75;

  return (
    <figure className="select-none">
      <div className="rounded-xl bg-bg-elev/50 border border-border p-5 pb-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden="true">
          {/* grid */}
          {[0, 0.2, 0.4, 0.6, 0.8, 1.0].map((v) => (
            <g key={v}>
              <line x1={pl} y1={ys(v)} x2={pl + cW} y2={ys(v)} stroke="rgba(255,255,255,0.05)" />
              <text x={pl - 8} y={ys(v) + 4} textAnchor="end" fill="rgba(255,255,255,0.28)" fontSize={9}>
                {v.toFixed(1)}
              </text>
            </g>
          ))}
          {[0, 25, 50, 75, 100].map((v) => (
            <g key={v}>
              <line x1={xs(v)} y1={pt} x2={xs(v)} y2={pt + cH} stroke="rgba(255,255,255,0.05)" />
              <text x={xs(v)} y={pt + cH + 16} textAnchor="middle" fill="rgba(255,255,255,0.28)" fontSize={9}>
                {v}%
              </text>
            </g>
          ))}
          {/* axes */}
          <line x1={pl} y1={pt} x2={pl} y2={pt + cH} stroke="rgba(255,255,255,0.1)" />
          <line x1={pl} y1={pt + cH} x2={pl + cW} y2={pt + cH} stroke="rgba(255,255,255,0.1)" />

          {/* fills */}
          <path d={posFill} fill="#a3e635" fillOpacity={0.09} />
          <path d={negFill} fill="#f87171" fillOpacity={0.13} />

          {/* region dividers */}
          <line x1={xs(x1)} y1={pt + 6} x2={xs(x1)} y2={pt + cH} stroke="rgba(255,255,255,0.12)" strokeDasharray="3,3" />
          <line x1={xs(x2)} y1={pt + 6} x2={xs(x2)} y2={pt + cH} stroke="rgba(248,113,113,0.25)" strokeDasharray="3,3" />

          {/* random baseline */}
          <path d={randPath} fill="none" stroke="rgba(180,180,180,0.35)" strokeDasharray="5,4" strokeWidth={1.5} />

          {/* T-learner curve */}
          <path d={tlrPath} fill="none" stroke="#a3e635" strokeWidth={2.5} strokeLinejoin="round" />

          {/* Region labels at top */}
          <text x={xs(25)} y={pt + 14} textAnchor="middle" fill="#a3e635" fontSize={8.5} fontWeight="600">OFFER PROMOS</text>
          <text x={xs(25)} y={pt + 25} textAnchor="middle" fill="rgba(163,230,53,0.55)" fontSize={7.5}>highest uplift</text>

          <text x={xs(67)} y={pt + 14} textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize={8.5}>DIMINISHING RETURNS</text>

          <text x={xs(91.5)} y={pt + 14} textAnchor="middle" fill="#f87171" fontSize={8.5} fontWeight="600">STOP TARGETING</text>
          <text x={xs(91.5)} y={pt + 25} textAnchor="middle" fill="rgba(248,113,113,0.55)" fontSize={7.5}>sleeping dogs</text>

          {/* legend */}
          <line x1={pl + cW - 84} y1={pt + cH - 26} x2={pl + cW - 72} y2={pt + cH - 26} stroke="#a3e635" strokeWidth={2.5} />
          <text x={pl + cW - 66} y={pt + cH - 22} fill="rgba(255,255,255,0.65)" fontSize={9}>T-Learner</text>
          <line x1={pl + cW - 84} y1={pt + cH - 12} x2={pl + cW - 72} y2={pt + cH - 12} stroke="rgba(180,180,180,0.35)" strokeDasharray="5,4" strokeWidth={1.5} />
          <text x={pl + cW - 66} y={pt + cH - 8} fill="rgba(255,255,255,0.35)" fontSize={9}>Random</text>

          {/* axis labels */}
          <text x={pl + cW / 2} y={H - 4} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize={9}>
            Population Targeted (%)
          </text>
          <text
            x={14} y={pt + cH / 2}
            textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize={9}
            transform={`rotate(-90 14 ${pt + cH / 2})`}
          >
            Cumulative Uplift
          </text>
        </svg>
      </div>
      <figcaption className="mt-3 text-xs text-ink-subtle text-center">
        <span className="text-ink-muted font-medium">Fig 2.</span> Illustrative AUUC curve showing three targeting zones.
        Offer promos to the top-decile persuadables (green), avoid the long tail of diminishing returns,
        and suppress sleeping dogs where cumulative uplift declines below the random baseline (red).
      </figcaption>
    </figure>
  );
}

// ── Diagram 3: Uplift by decile bar chart ──────────────────────────────────────

function UpliftByDecile() {
  const W = 560, H = 200;
  const pl = 46, pr = 16, pt = 20, pb = 36;
  const cW = W - pl - pr, cH = H - pt - pb;
  // Uplift (CATE) per decile: positive for top deciles, near-zero mid, negative for sleeping dogs
  const vals = [4.8, 3.9, 3.1, 2.4, 1.7, 1.0, 0.4, -0.3, -1.1, -2.2];
  const maxAbs = 5;
  const slotW = cW / vals.length;
  const bW = slotW - 5;
  const zeroY = pt + cH * (maxAbs / (maxAbs * 2));

  return (
    <figure className="select-none">
      <div className="rounded-xl bg-bg-elev/50 border border-border p-5 pb-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden="true">
          {/* zero line */}
          <line x1={pl} y1={zeroY} x2={pl + cW} y2={zeroY} stroke="rgba(255,255,255,0.2)" />
          {[-2, 0, 2, 4].map((v) => {
            const y = pt + cH * ((maxAbs - v) / (maxAbs * 2));
            return (
              <g key={v}>
                {v !== 0 && <line x1={pl} y1={y} x2={pl + cW} y2={y} stroke="rgba(255,255,255,0.05)" />}
                <text x={pl - 6} y={y + 3} textAnchor="end" fill="rgba(255,255,255,0.3)" fontSize={9}>
                  {v > 0 ? `+${v}%` : `${v}%`}
                </text>
              </g>
            );
          })}
          {vals.map((v, i) => {
            const x = pl + i * slotW + 2;
            const bH = Math.abs(v / (maxAbs * 2)) * cH;
            const y = v >= 0 ? zeroY - bH : zeroY;
            const fill = v >= 0 ? (i < 7 ? "#a3e635" : "#a3e63599") : "#f87171";
            return (
              <g key={i}>
                <rect x={x} y={y} width={bW} height={bH} fill={fill} rx={2} />
                <text
                  x={x + bW / 2}
                  y={pt + cH + 14}
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
          <text x={pl + 4} y={zeroY + 14} fill="#a3e635" fontSize={9}>↑ persuadables</text>
          <text x={pl + cW - 4} y={zeroY - 10} textAnchor="end" fill="#f87171" fontSize={9}>sleeping dogs ↓</text>
          <text x={pl + cW / 2} y={H - 4} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize={9}>
            Score Decile (1 = highest uplift)
          </text>
        </svg>
      </div>
      <figcaption className="mt-3 text-xs text-ink-subtle text-center">
        <span className="text-ink-muted font-medium">Fig 3.</span> Estimated CATE (treatment
        effect) by decile. Deciles 8 through 10 are sleeping dogs, and the offer suppresses their conversion
        likelihood. Explicitly suppressing this ~7% of the audience was one of the key results.
      </figcaption>
    </figure>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function UpliftModelPage() {
  return (
    <article className="pt-32 pb-24">
      <BackLink />
      <ArticleHeader
        eyebrow="Work · Santander Bank · 2024"
        title="Causal Uplift Model for Credit Card Campaigns"
        subtitle="Most response models predict who will convert. This one predicts who will convert because of the offer, a subtle but financially critical distinction."
        tags={["Causal Inference", "Uplift", "T-Learner", "X-Learner", "Marketing", "A/B Testing"]}
      />

      <div className="container-page mt-16">
        {/* Opening */}
        <Prose>
          <P>
            The problem with propensity models is that they answer the wrong question. &quot;Who
            is most likely to get a credit card?&quot; sounds like the right question, but it
            isn&apos;t. The right question is: &quot;Who is most likely to get a credit card
            <Em> because we offered it to them</Em>?&quot;
          </P>
          <P>
            The difference matters because high-propensity customers often convert regardless of
            whether they receive an offer. Targeting them wastes budget. Worse, some customers
            respond negatively to unsolicited outreach, and their conversion probability actually
            decreases when contacted. Standard propensity scoring has no way to identify these
            sleeping dogs, let alone suppress them.
          </P>
          <P>
            Uplift modeling (also called causal response modeling or CATE estimation) directly
            targets incremental response. The goal is to estimate the treatment effect for each
            customer, not just their raw probability of converting.
          </P>
        </Prose>

        {/* Step 01 */}
        <Prose>
          <SH id="quadrants" step="Step 01">
            The Four Customer Types
          </SH>
          <P>
            Before building any model, it&apos;s useful to understand the four types of
            customers any campaign will reach. The framework comes from the uplift modeling
            literature and is directly actionable.
          </P>
        </Prose>

        <Wide>
          <FourQuadrant />
        </Wide>

        <Prose>
          <P>
            A propensity model tries to maximize the number of customers in the top-right
            (sure things), people who look likely to convert. An uplift model tries to
            maximize targeting of the top-left (persuadables) and suppress the bottom-right
            (sleeping dogs). These are very different audiences.
          </P>
        </Prose>

        {/* Step 02 */}
        <Prose>
          <SH id="cate" step="Step 02">
            Estimating CATE: T-Learner vs X-Learner
          </SH>
          <P>
            Estimating the Conditional Average Treatment Effect (CATE) requires a holdout-controlled
            experiment as training data: a campaign where some customers received the offer
            (treatment) and others didn&apos;t (control), randomly assigned.
          </P>

          <OptionBox
            title="Two candidate CATE estimators"
            options={[
              {
                label: "T-Learner (Two-Model)",
                desc: "Train separate XGBoost models on treatment and control groups. CATE = treatment model prediction − control model prediction. Simple, interpretable, slightly biased in small samples.",
              },
              {
                label: "X-Learner",
                desc: "Iterative estimator that cross-imputes treatment effects and weights by propensity score. Better in imbalanced datasets (treatment ≠ control sizes). Higher variance.",
              },
            ]}
            chosenLabel="T-Learner (Two-Model)"
            reason="Both were validated on held-out controls via AUUC. The T-learner outperformed slightly and was significantly easier to debug. When CATE estimates looked suspect for a segment, it was straightforward to inspect which of the two models was driving the issue. For a model going into production, debuggability matters."
          />

          <P>
            Features for both models: product holdings, account tenure, transaction patterns,
            prior campaign response history, and ZIP-level demographics. The two models share
            the same feature set, with only their training samples differing (treatment vs control
            customers from the prior campaign).
          </P>

          <Callout>
            Holdout control groups are the foundation of uplift modeling. Without a clean
            random assignment, there is no way to estimate causal effects, only
            correlations. The quality of the training data depends entirely on the quality
            of the experiment it was drawn from.
          </Callout>
        </Prose>

        {/* Step 03 — AUUC */}
        <Prose>
          <SH id="validation" step="Step 03">
            Validation with AUUC
          </SH>
          <P>
            Standard AUC/accuracy metrics don&apos;t work for uplift models, as there is no
            single ground truth label for &quot;would respond to this specific treatment.&quot;
            Instead, we validate with the <B>Area Under the Uplift Curve (AUUC)</B>: sort customers
            by predicted CATE from high to low, then measure cumulative incremental conversions
            as we target progressively more of the audience.
          </P>
        </Prose>

        <Wide>
          <AUUCCurve />
        </Wide>

        <Prose>
          <P>
            The area between the model curve and the random baseline (AUUC) is the
            summary metric. Our T-learner achieved an AUUC of <B>0.38</B> on the
            held-out validation set vs. <B>0.21</B> for propensity-based targeting. The key
            difference appears in the right tail: propensity targeting dips negative as it
            reaches sleeping dogs, while the uplift model&apos;s curve flattens instead.
          </P>
        </Prose>

        {/* Step 04 — Decile chart */}
        <Prose>
          <SH id="results" step="Step 04">
            Results: +15% Acquisitions, Flat Budget
          </SH>
          <P>
            The model was rolled out via the marketing platform&apos;s audience segmentation
            API. The campaign was run against the same universe of prospects as before, with
            three changes: top-decile persuadables received the offer, identified sleeping dogs
            were explicitly suppressed, and the released budget was reallocated within the
            persuadable tier.
          </P>
        </Prose>

        <Wide>
          <UpliftByDecile />
        </Wide>

        <MetricStrip
          metrics={[
            { label: "incremental acquisitions vs propensity baseline", value: "+15%", sub: "same marketing budget" },
            { label: "of audience identified as sleeping dogs", value: "~7%", sub: "explicitly suppressed" },
            { label: "AUUC (uplift vs random)", value: "0.38", sub: "vs 0.21 propensity" },
            { label: "campaigns now using this pattern", value: "default", sub: "cards + personal loans" },
          ]}
        />

        {/* Takeaways */}
        <Prose>
          <SH id="takeaways" step="What This Gets Right">
            The Framing Matters as Much as the Model
          </SH>
          <P>
            <B>1. Holdout control groups are non-negotiable.</B> Without disciplined random
            assignment in the training data, CATE estimation collapses into correlation, which
            is no better than propensity. The quality of an uplift model is bounded by the
            quality of its training experiment.
          </P>
          <P>
            <B>2. The quadrant framing is the real unlock for stakeholder buy-in.</B>{" "}
            Presenting results as &quot;persuadables, sure-things, sleeping dogs&quot; resonated
            far more than presenting CATE numbers. People intuitively understand why you
            wouldn&apos;t want to contact a sleeping dog. CATE values require explanation.
          </P>
          <P>
            <B>3. The sleeping dog suppression was worth as much as the persuadable targeting.</B>{" "}
            Removing 7% of the audience who were actively harmed by the offer freed up budget
            and reduced churn from negative experiences, an ROI lever that pure propensity
            modeling couldn&apos;t have identified.
          </P>
        </Prose>

        <NextProject slug="ab-test-instagram-shop" />
      </div>
    </article>
  );
}

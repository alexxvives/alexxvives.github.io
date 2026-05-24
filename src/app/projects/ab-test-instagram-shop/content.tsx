"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { useLang } from "@/lib/lang";
import { BackLink, NextProject as ArticleNextProject } from "../_article";

// ── Local layout helpers (this page uses its own layout, not _article's) ─────

function Prose({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

function Wide({ children }: { children: ReactNode }) {
  return <div className="max-w-5xl mx-auto my-10">{children}</div>;
}

function B({ children }: { children: ReactNode }) {
  return <strong className="text-ink font-semibold">{children}</strong>;
}
function Em({ children }: { children: ReactNode }) {
  return <em className="italic text-ink/80">{children}</em>;
}
function C({ children }: { children: ReactNode }) {
  return <code className="font-mono text-xs text-accent bg-bg-elev px-1.5 py-0.5 rounded">{children}</code>;
}

function SH({ id, step, children }: { id: string; step: string; children: ReactNode }) {
  return (
    <div id={id} className="scroll-mt-32 mt-20 mb-6">
      <p className="font-mono text-xs text-accent mb-2">{step}</p>
      <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-ink">{children}</h2>
    </div>
  );
}

function SH3({ children }: { children: ReactNode }) {
  return <h3 className="font-display text-base font-semibold tracking-tight mt-10 mb-3 text-ink/90">{children}</h3>;
}

function P({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`prose-text mt-5 ${className}`}>{children}</p>;
}

function Callout({ children }: { children: ReactNode }) {
  return (
    <div className="my-8 border-l-2 border-accent/50 pl-6 py-1 bg-bg-elev/30 rounded-r-xl">
      <p className="text-[1.0625rem] leading-[1.9] tracking-[0.005em] italic text-ink/70">{children}</p>
    </div>
  );
}

interface OptionItem { label: string; desc: ReactNode; }
function OptionBox({ title, options, chosenLabel, reason }: { title?: string; options: OptionItem[]; chosenLabel: string; reason: ReactNode }) {
  return (
    <div className="my-8 bg-bg-elev/40 border border-border rounded-xl p-5 space-y-4">
      {title && <p className="text-[10px] font-mono uppercase tracking-widest text-ink-subtle">{title}</p>}
      <div className={options.length === 2 ? "grid sm:grid-cols-2 gap-2" : "space-y-2"}>
        {options.map(({ label, desc }) => {
          const chosen = label === chosenLabel;
          return (
            <div key={label} className={`flex flex-col items-center text-center px-4 py-3 rounded-lg transition-colors ${chosen ? "bg-accent/10 border border-accent/30" : "opacity-50 border border-transparent"}`}>
              <p className={`text-sm font-medium ${chosen ? "text-ink" : "text-ink-muted"}`}>{label}</p>
              <p className="text-xs text-ink-muted mt-0.5 leading-relaxed">{desc}</p>
            </div>
          );
        })}
      </div>
      <div className="pt-3 border-t border-border/50 space-y-1.5">
        <p className="text-xs font-mono text-accent">→ {chosenLabel}</p>
        <div className="text-sm text-ink-muted leading-relaxed">{reason}</div>
      </div>
    </div>
  );
}

// ── Translation objects ───────────────────────────────────────────────────────

const en = {
  eyebrow: "Work · Meta (Instagram) · Summer 2022",
  headerSubtitle:
    "The Shop team at Meta had a new discovery ranking algorithm ready, one that curates what products you see the moment you open the tab, before any search. Before shipping it to everyone, we needed real evidence it worked. This walks through every design decision that went into building that evidence.",
  openP1: (
    <>Instagram Shop was a <B>dedicated shopping tab</B> inside the Instagram app, accessible from the bottom navigation bar, where users could <B>browse and buy products without leaving the app</B>. The surface looked like a dense, scrollable grid of product images, each tile surfaced from brands, creators, and retailers, <B>ranked and personalized to each user</B>. Meta shut it down in early 2023 as part of a broader pullback from social commerce, but during peak operation it was one of the <B>highest-traffic surfaces on the platform</B>, processing <B>hundreds of millions of product impressions</B> daily.</>
  ),
  openP2: (
    <>The ML team built a <B>new version of the discovery ranking algorithm</B> and wanted to ship it. I built the <B>A/B test</B> to validate it was actually worth deploying.</>
  ),
  openP3: (
    <>Most of the real work in experimentation happens <B>before you touch any analysis code</B>. What to measure, how to split users, how many you need, what checks need to pass before you trust the result. This is a walkthrough of each of those decisions.</>
  ),

  setupStep: "The Setup",
  setupTitle: "User Journey & Where the Algorithm Fits",
  setupP1pre: "The user journey starts on Instagram. From there, navigating to the Shop tab activates the ranking algorithm the instant the user ",
  setupP1bold: "Opens the Shop Tab",
  setupP1post: ". No search, no typed query. Unlike a search ranker, the discovery algorithm has no query to anchor it, only behavioral signals from past views, clicks, and purchases. Whatever order the grid loads in is the order the model chose.",
  setupP2: "A better ranking should lift CTR, product views, add-to-cart events, and purchases. But it could also inflate early-funnel metrics while doing nothing downstream, which is exactly why the ",
  setupP2em: "choice of success metric",
  setupP2post: " is the most consequential design decision in the whole experiment.",

  funnelLayers: [
    { label: "Visits Instagram", pct: 100, color: "#6366f1", tag: false },
    { label: "Opens Instagram Shop", pct: 72, color: "#3b82f6", tag: true },
    { label: "Scrolls Discovery Feed", pct: 64, color: "#22c55e", tag: false },
    { label: "Taps on a Product", pct: 47, color: "#ca8a04", tag: false },
    { label: "Add to Cart", pct: 34, color: "#f97316", tag: false },
    { label: "Checkout", pct: 24, color: "#ef4444", tag: false },
    { label: "Purchase", pct: 16, color: "#9333ea", tag: false },
  ] as { label: string; pct: number; color: string; tag: boolean }[],
  funnelAlgoTag: "Discovery Ranking Activates",
  fig1label: "Fig 1.",
  fig1caption: "The Shop tab user journey.",

  metricStep: "Step 01",
  metricTitle: "Choosing the Right Metric",
  metricP1: "Two options were on the table:",
  metricOptionTitle: "Options on the table",
  metricOpt1Label: "Conversion Rate",
  metricOpt1Desc: "% of users who make at least one purchase during the experiment window.",
  metricOpt2Label: "Avg Revenue per User per Day",
  metricOpt2Desc: "Average daily spend per exposed user.",
  metricChosenLabel: "Avg Revenue per User per Day",
  metricReason: "Conversion rate fires once per purchasing user, regardless of order value. A $5 phone case and a $200 jacket count the same. An algorithm that surfaces cheap impulse buys could win on conversion rate while quietly losing on what the business actually cares about. Revenue per user doesn't have that problem.",
  metricChosenPrefix: "Chose: ",
  metricP2pre: "Four things a good metric needs: ",
  metricP2b1: "measurable",
  metricP2t1: " (computable from server logs), ",
  metricP2b2: "attributable",
  metricP2t2: " (traceable back to the treatment session), ",
  metricP2b3: "sensitive",
  metricP2t3: " (low enough variance to detect a 1% lift without needing 100M users), and ",
  metricP2b4: "timely",
  metricP2t4: " (14 days is short enough to iterate quickly).",
  callout1: "Conversion rate measures volume. Revenue per user measures value. The difference looks academic right up until you ship an algorithm that wins on one while losing on the other.",

  hypothesisStep: "Step 02",
  hypothesisTitle: "Writing the Hypothesis",
  hypothesisP1: "A hypothesis gets written before any data is collected. Not after seeing what moved.",
  h0: "Average revenue per user per day is the same in control and treatment.",
  h1: "Average revenue per user per day differs between the two arms.",
  hypothesisP2: "Three parameters get locked before the experiment starts. None of them change once data starts flowing:",
  hypothesisParams: [
    { label: "Significance level", val: "0.05", desc: "5% probability of detecting an effect when none actually exists (Type I error)" },
    { label: "Statistical power", val: "0.80", desc: "80% probability of detecting a real effect if one exists (Type II error)" },
    { label: "Minimum detectable effect (MDE)", val: "1% relative lift", desc: "Smallest improvement that justifies the cost of shipping." },
  ] as { label: string; val: string; desc: string }[],

  designStep: "Step 03",
  designTitle: "Designing the Experiment",
  randUnitTitle: "Randomization Unit",
  randOptionTitle: "Randomization unit",
  randOpt1Label: "Session",
  randOpt1Desc: "Each visit independently gets assigned to an arm.",
  randOpt2Label: "User",
  randOpt2Desc: <>The user always sees the same algorithm across all visits.</>,
  randChosenLabel: "User",
  randReason: <> Session level lets the same user see both algorithms across visits, which breaks the independence assumption the stats rely on. Revenue per user is a user level metric, so it needs a user level randomization unit. </>,
  randChosenPrefix: "Chose: ",
  targetTitle: "Target Population",
  targetP: "Not all users, just those who opened the Shop tab at least once during the experiment window. These are the only users who actually saw the discovery feed and were exposed to the ranking. Including users who never visited the Shop tab inflates the denominator and dilutes the signal.",
  sampleTitle: "Sample Size",
  sampleP: <> Revenue per user is heavy-tailed (σ ≈ $30 on a $8.50 mean). Plugging raw variance and a 1% MDE into <C>n ≈ 16σ²/Δ²</C> gives <B>~4.2M users per arm</B>, about four weeks at Instagram Shop traffic levels. After the CUPED variance reduction described below, the effective variance halves and the required sample drops to <B>2.1M users per arm</B> (4.2M total), or roughly 1 to 2 weeks.</>,
  cupedTitle: "Variance Reduction (CUPED)",
  cupedP: <>Revenue per user is heavy-tailed, which is why the naive sample size sat at 4.2M per arm. CUPED (Controlled-experiment Using Pre-experiment Data) corrects for this by adjusting each user&apos;s in-experiment revenue for their pre-experiment baseline: <C>Y_cv = Y − θ × revenue_pre</C>, where <C>θ = Cov(Y, X) / Var(X)</C>. Pre-experiment revenue is measured before randomization, so it is independent of treatment assignment. Subtracting it does not shift the estimated treatment effect. It removes noise that was already present in each user before the experiment started. With ρ ≈ 0.7 between pre- and in-experiment revenue, CUPED reduces variance by about 50%, and the required sample drops from 4.2M to <B>2.1M users per arm</B>.</>,
  canaryTitle: "Canary Rollout",
  canaryP: <> Before the main experiment, a <B>1/99 canary</B> deploys the new algorithm to 1% of traffic while 99% stays on control. The only guardrails monitored are crash rate, p95 latency, and hide and report rate. If any breach, the canary stops. If all clear, the canary data is <span className="text-red-400 font-medium">discarded</span> and the 50/50 experiment runs on that same 99%.</>,
  durationTitle: "Experiment Duration",
  durationP: <> The sample size of <B>2.1M users per arm</B> drives the timeline. At Instagram Shop traffic levels, that fills in roughly <B>14 days</B>. The end date is locked before launch and does not move based on what the data looks like mid-run.</>,
  aaTestTitle: "A/A Pre-Check",
  aaTestP: <> Run the week before the main experiment: both arms on the identical algorithm, no treatment. Result — revenue-per-user p-value: <C>0.61</C>. Randomization confirmed unbiased. Experiment cleared to proceed.</>,
  srmTitle: "SRM Check",
  srmP: "After assignment, a chi-square test on actual arm sizes will confirm bucketing correctness. An unexpected imbalance — 55/45 instead of 50/50 — would invalidate all results regardless of what the primary metric shows.",
  noveltyCheckTitle: "Novelty Effect Check",
  noveltyCheckP: "Week 1 and week 2 lift will be compared after the run ends. A sharp decay toward zero means users were reacting to change, not quality — not a valid basis for a ship decision.",
  extValTitle: "External and Internal Validity",
  extValP: "The experiment window is selected to avoid major shopping events. Concurrent experiments and marketing campaigns on the same population will be audited to ensure no confounding during the window.",

  preValidityStep: "Step 04",
  preValidityTitle: "Pre-Experiment Checklist",
  preValidityP1: "Four checks run before data collection starts. The goal is prevention: safety nets in place, calendar clear, randomization verified.",
  preValidityItems: [
    { n: "01", t: "Guardrail metrics", d: "Backend tracking for technical health — crash rate, p95 latency, error rate, hide-and-report rate — goes live before day one. These are the kill switches: if any metric breaches during the run, the experiment stops automatically." },
    { n: "02", t: "Internal calendar", d: "The company launch calendar was checked for concurrent promotions, email campaigns, and feature rollouts on the same population. Any overlap that could differentially affect purchasing behavior in one arm triggers a reschedule or strict audience exclusion." },
    { n: "03", t: "External calendar", d: "The window (Jul 12 – Jul 26) was chosen to avoid major shopping events, public holidays, and competitor sales. No overlap found." },
    { n: "04", t: "A/A pre-check", d: <> Run the week before the main experiment: both arms on the identical algorithm, no treatment. Result — revenue-per-user p-value: <C>0.61</C>. Randomization confirmed unbiased. Experiment cleared to proceed.</> },
  ] as { n: string; t: string; d: ReactNode }[],

  runStep: "Step 05",
  runTitle: "Running the Experiment",
  runP1: "Two things matter during the run:",
  runItems: [
    { n: "1", t: "Instrumentation", d: <> Every impression, click, add to cart, and purchase gets logged with <C>user_id</C>, arm assignment, and a timestamp. Logging completeness is verified in the post-experiment validity checks before results are read.</> },
    { n: "2", t: "No peeking at the primary metric p-value", d: "The end date is committed to before launch and doesn't change based on what the data looks like at day 7. This is the most violated rule in online experimentation." },
  ] as { n: string; t: string; d: ReactNode }[],
  callout2: "Every time you check the p-value mid-experiment and could act on what you see, you add a decision point to the test. With α = 0.05, checking daily over a 14 day run can push your true false positive rate well above 5%. The prespecified guarantee no longer holds.",

  validityStep: "Step 06",
  validityTitle: "Post-Experiment Validity Checks",
  validityP1: "Three post-experiment checks need to pass before any result gets read. All three rule out alternative explanations before attributing what you see to the treatment.",
  validityItems: [
    { n: "01", t: "Instrumentation audit", d: <> We cross-checked server-side view logs against client-side clicks and purchases to ensure no events were dropped, and confirmed that logging latency (<C>p95</C>) remained stable. Total event loss was negligible (<B>&lt; 0.3%</B>) and distributed evenly across both groups, no tracking bias, no systematic logging gaps.</> },
    { n: "02", t: "Ratio check", d: <> Chi-square test on actual arm sizes: 50.1% / 49.9%, p = <C>0.42</C>. No systematic bucketing bias.</> },
    { n: "03", t: "Novelty effect", d: "Week 2 lift was 91% of week 1. A decay toward zero would mean users are reacting to novelty, not quality. 91% is stable." },
  ] as { n: string; t: string; d: ReactNode }[],

  resultsStep: "Step 07",
  resultsTitle: "The Results",
  resultsP1: "All three post-experiment validity checks cleared. Then we read the results.",
  resultsMetrics: [
    { val: "$8.50", label: "Control avg. revenue / user / 14 days", accent: false },
    { val: "$8.87", label: "Treatment avg. revenue / user / 14 days", accent: true },
    { val: "+4.4%", label: "Relative lift", accent: true },
    { val: "p = 0.01", label: "p-value (threshold: 0.05)", accent: false },
  ] as { val: string; label: string; accent: boolean }[],
  resultsCILabel: "95% bootstrap CI",
  revenueChartTitle: "Average Daily Revenue per User ($)",
  revenueYLabel: "Avg Revenue",
  revenueXLabel: "Time in Days",
  revenueTreatment: "Treatment",
  revenueControl: "Control",
  fig2label: "Fig 2.",
  fig2caption: "Treatment (orange) consistently outperforms control (blue) across the 14-day window with no late decay.",
  resultsP2pre: "Revenue per user moved from ",
  resultsP2b1: "$8.50",
  resultsP2mid: " in control to ",
  resultsP2b2: "$8.87",
  resultsP2mid2: " in treatment over the 14-day window, a relative lift of ",
  resultsP2b3: "+4.4%",
  resultsP2post: ". The p-value came in at 0.01, below the prespecified α = 0.05 threshold.",
  resultsP3pre: "The 95% confidence interval is ",
  resultsP3bold: "[+3.4%, +5.4%]",
  resultsP3mid: ". The entire interval sits above the 1% MDE. It's not just statistically significant, it's ",
  resultsP3em: "practically",
  resultsP3post: " significant. Real improvement of a meaningful size.",
  funnelCheckTitle: "Funnel check",
  funnelCheckP: "A CTR lift that collapsed at checkout would mean the algorithm is just surfacing eye-catching but low-intent products. The lift held all the way through:",
  funnelRows: [
    { stage: "Click-through rate (CTR)", lift: "+4.1%" },
    { stage: "Product page views", lift: "+3.7%" },
    { stage: "Add to cart", lift: "+2.8%" },
    { stage: "Checkout started", lift: "+2.3%" },
    { stage: "Orders placed", lift: "+2.1%" },
  ] as { stage: string; lift: string }[],
  funnelColStage: "Funnel stage",
  funnelColLift: "Lift vs control",
  segmentP: <> Segment breakdown: dormant users (no purchase in 90 days) <B>+6.9%</B>, APAC <B>+5.1%</B>, high-frequency buyers (3+ prior purchases) <B>+0.2%</B>. The legacy ranker was already well calibrated for power users. The gains came from everyone else.</>,

  decisionStep: "Step 08",
  decisionTitle: "The Launch Decision",
  decisionP1: "A significant result with CI above the MDE doesn't automatically mean ship it. The forest plot below maps five possible experimental outcomes to five different calls.",
  fig3label: "Fig 3.",
  fig3caption: "Five possible experiment outcomes plotted by where the 95% CI falls relative to the ±1% MDE thresholds.",
  decisionP2: "Our result is scenario 2. Three things that closed the call:",
  decisionItems: [
    { n: "1", t: "Metric tradeoffs", d: "All guardrails green. No regressions in crash rate, latency, ads revenue, or user satisfaction signals." },
    { n: "2", t: "Implementation cost", d: "Additional inference cost breaks even at ~+0.4% GMV lift. The observed lift is +4.4%. The economics are clear." },
    { n: "3", t: "False positive risk", d: "p = 0.01, CI fully above the MDE. The probability this is noise is negligible." },
  ] as { n: string; t: string; d: string }[],
  decisionScenarios: [
    { n: "1", ci: "−1.4% to +1.7%", label: "Underpowered", verdict: "Re-run with higher power", type: "hold" as const, desc: "CI spans zero and both MDE thresholds. Effect could be anywhere from harmful to beneficial. No conclusion is valid. Running longer collects more users and narrows the CI — the most practical path. Variance-reduction techniques (CUPED, stratification on pre-experiment revenue) can achieve the same without extending the window." },
    { n: "2", ci: "+1.5% to +2.9%", label: "Clean launch signal ← our result", verdict: "Ship", type: "go" as const, desc: "CI fully above the +1% MDE. Effect is positive, statistically significant, and practically meaningful." },
    { n: "3", ci: "−1.4% to +0.2%", label: "Likely null or harm", verdict: "Abandon", type: "stop" as const, desc: "CI mostly below zero. Most plausible effect is negative or zero. Return to the ML team for algorithm redesign before any further testing." },
    { n: "4", ci: "−0.9% to −0.5%", label: "Confirmed regression", verdict: "Hard no", type: "stop" as const, desc: "CI fully below the −1% MDE. Algorithm actively harms revenue. Statistically significant in the wrong direction, investigate root cause before any further experimentation." },
    { n: "5", ci: "−0.1% to +1.9%", label: "Ambiguous", verdict: "Re-run with higher power", type: "hold" as const, desc: "Direction is positive but CI crosses zero. Can't rule out a null effect at α = 0.05, and can't confirm the effect clears the MDE. Running longer is the most direct fix — more users, narrower CI. Variance reduction (CUPED) can help if extending the window is not an option." },
  ] as { n: string; ci: string; label: string; verdict: string; type: "go" | "stop" | "hold"; desc: string }[],
  decisionBoxLabel: "Decision",
  decisionBoxTitle: "Launch to 100% with a 5% holdback for 90 days.",
  decisionBoxDesc: "The holdback runs as a long-horizon counterfactual to catch any delayed regressions or GMV cannibalization that wouldn't show up in a 14 day window.",

  gapsFixAddressable: "addressable now",
  gapsFixPartial: "partial fix",
  gapsFixRedesign: "needs redesign",
  gapsStep: "Honest Assessment",
  gapsTitle: "Four Things This Test Doesn't Fully Address",
  gapsP1: "A significant result doesn't mean the experiment was perfect. These are the gaps worth knowing:",
  gapsItems: [
    {
      n: "01",
      t: "Social spillover",
      d: "A product surfaced to a treatment user can spread organically, shared via DMs, Stories, or Reels, exposing control users to it too. Standard 50/50 splits can't fully isolate this. A geo-based or cluster holdout design would, but at a significant cost in statistical power.",
      fix: "redesign" as const,
    },
    {
      n: "02",
      t: "Multiple testing on funnel metrics",
      d: "Five secondary funnel metrics were read alongside the primary. Without Bonferroni or Benjamini-Hochberg correction, the family-wise false positive rate exceeds the reported α = 0.05. The primary metric is pre-specified and clean; the secondary lifts should carry a caveat. Applying Benjamini-Hochberg correction to the five funnel metrics takes one step and should be done before reading them.",
      fix: "addressable" as const,
    },
    {
      n: "03",
      t: "Algorithm warmup",
      d: "Discovery models learn from engagement signals. The algorithm at day 14 has seen far less data than it will at day 90. The measured lift may underestimate the eventual steady-state gain, and a warmed-up control vs. a cold treatment creates a small but real asymmetry in the comparison. The 90-day holdback captures the steady-state lift; the warmup asymmetry within the primary 14-day window is harder to eliminate.",
      fix: "partial" as const,
    },
    {
      n: "04",
      t: "Discovery and search displacement",
      d: "If users find products through the discovery feed, they search less. That's good for this experiment but could suppress search CTR, a metric owned by a different team. A cross-surface check (discovery impressions vs. subsequent search rate per arm) wasn't included but can be queried from existing server logs.",
      fix: "addressable" as const,
    },
  ] as { n: string; t: string; d: string; fix: "addressable" | "partial" | "redesign" }[],

  takeawaysStep: "What This Gets Right",
  takeawaysTitle: "Three Things That Made the Result Trustworthy",
  takeaways: [
    { t: "The metric was chosen before the test ran", d: "Revenue per user, not conversion rate, because the question was about GMV not volume. Choosing the metric after seeing the data is the fastest way to invalidate an experiment." },
    { t: "The end date was non-negotiable", d: "No peeking, no early stops, no extensions. Committing to the end date beforehand is the only way the α = 0.05 guarantee stays valid." },
    { t: "The AA test ran the week before", d: "Not as a formality, but as a genuine check. If the groups had been unbalanced before treatment, the entire readout would have been confounded." },
  ] as { t: string; d: string }[],
};

const es: typeof en = {
  eyebrow: "Trabajo · Meta (Instagram) · Verano 2022",
  headerSubtitle:
    "El equipo de Shop en Meta tenía un nuevo algoritmo de ranking de descubrimiento listo, uno que organiza los productos que ves en cuanto abres la pestaña, antes de cualquier búsqueda. Antes de desplegarlo a todo el mundo, necesitábamos evidencia real de que funcionaba. Aquí se detalla cada decisión de diseño que formó esa evidencia.",
  openP1: (
    <>Instagram Shop era una <B>pestaña de compras dedicada</B> dentro de la aplicación de Instagram, accesible desde la <B>barra de navegación inferior</B>, donde los usuarios podían <B>explorar y comprar productos sin salir de la app</B>. El feed cargaba como una <B>cuadrícula densa y desplazable de imágenes de productos</B>, clasificada y personalizada para cada usuario, con artículos de marcas, creadores y minoristas. Meta la cerró a <B>principios de 2023</B> como parte de una retirada más amplia del comercio social, pero en su momento de mayor actividad era una de las <B>superficies con más tráfico de la plataforma</B>, procesando <B>cientos de millones de impresiones de productos</B> al día.</>
  ),
  openP2: (
    <>El equipo de ML construyó una <B>nueva versión del algoritmo de ranking de descubrimiento</B> y quería lanzarla. Yo construí el <B>test A/B</B> para asegurarnos de que realmente valía la pena desplegarlo.</>
  ),
  openP3: (
    <>La mayor parte del trabajo real en experimentación ocurre <B>antes de tocar el código de análisis</B>. Qué medir, cómo dividir usuarios, cuántos necesitas, qué comprobaciones deben pasar antes de confiar en el resultado. Esto es un recorrido por cada una de esas decisiones.</>
  ),

  setupStep: "El Contexto",
  setupTitle: "El Recorrido del Usuario y Dónde Encaja el Algoritmo",
  setupP1pre: "El recorrido del usuario comienza en Instagram. Desde allí, navegar a la pestaña Shop activa el algoritmo de ranking en el instante en que el usuario ",
  setupP1bold: "Abre la Pestaña Shop",
  setupP1post: ". Sin búsqueda, sin consulta escrita. A diferencia de un ranker de búsqueda, el algoritmo de descubrimiento no tiene ninguna consulta como ancla, solo señales de comportamiento de vistas, clics y compras pasadas. El orden en que carga la cuadrícula es el orden que eligió el modelo.",
  setupP2: "Un mejor ranking debería aumentar el CTR, las vistas de productos, los eventos de añadir al carrito y las compras. Pero también podría inflar las métricas del embudo superior sin hacer nada aguas abajo, que es exactamente por qué la ",
  setupP2em: "elección de la métrica de éxito",
  setupP2post: " es la decisión de diseño más importante de todo el experimento.",

  funnelLayers: [
    { label: "Visita Instagram", pct: 100, color: "#6366f1", tag: false },
    { label: "Abre Instagram Shop", pct: 72, color: "#3b82f6", tag: true },
    { label: "Navega el Feed de Descubrimiento", pct: 64, color: "#22c55e", tag: false },
    { label: "Toca un Producto", pct: 47, color: "#ca8a04", tag: false },
    { label: "Añadir al Carrito", pct: 34, color: "#f97316", tag: false },
    { label: "Checkout", pct: 24, color: "#ef4444", tag: false },
    { label: "Compra", pct: 16, color: "#9333ea", tag: false },
  ],
  funnelAlgoTag: "Se Activa el Ranking de Descubrimiento",
  fig1label: "Fig 1.",
  fig1caption: "El recorrido del usuario en la pestaña Shop.",

  metricStep: "Paso 01",
  metricTitle: "Elegir la Métrica Correcta",
  metricP1: "Había dos opciones sobre la mesa:",
  metricOptionTitle: "Opciones sobre la mesa",
  metricOpt1Label: "Tasa de Conversión",
  metricOpt1Desc: "% de usuarios que realizan al menos una compra durante la ventana del experimento.",
  metricOpt2Label: "Ingresos Medios por Usuario por Día",
  metricOpt2Desc: "Gasto diario medio por usuario expuesto.",
  metricChosenLabel: "Ingresos Medios por Usuario por Día",
  metricReason: "La tasa de conversión se activa una vez por usuario que compra, independientemente del valor del pedido. Una funda de teléfono de 5$ y una chaqueta de 200$ cuentan igual. Un algoritmo que muestra compras impulsivas baratas podría ganar en tasa de conversión mientras pierde silenciosamente en lo que el negocio realmente importa. Los ingresos por usuario no tienen ese problema.",
  metricChosenPrefix: "Elegido: ",
  metricP2pre: "Cuatro cosas que necesita una buena métrica: ",
  metricP2b1: "medible",
  metricP2t1: " (calculable desde los registros del servidor), ",
  metricP2b2: "atribuible",
  metricP2t2: " (rastreable hasta la sesión de tratamiento), ",
  metricP2b3: "sensible",
  metricP2t3: " (varianza suficientemente baja para detectar un uplift del 1% sin necesitar 100M de usuarios), y ",
  metricP2b4: "oportuna",
  metricP2t4: " (14 días es suficientemente corto para iterar rápidamente).",
  callout1: "La tasa de conversión mide volumen. Los ingresos por usuario miden valor. La diferencia parece académica hasta que lanzas un algoritmo que gana en uno mientras pierde en el otro.",

  hypothesisStep: "Paso 02",
  hypothesisTitle: "Escribir la Hipótesis",
  hypothesisP1: "La hipótesis se escribe antes de recopilar ningún dato. No después de ver qué se movió.",
  h0: "Los ingresos medios por usuario por día son iguales en control y tratamiento.",
  h1: "Los ingresos medios por usuario por día difieren entre los dos brazos.",
  hypothesisP2: "Tres parámetros se fijan antes de que comience el experimento. Ninguno cambia una vez que los datos empiezan a fluir:",
  hypothesisParams: [
    { label: "Nivel de significancia", val: "0,05", desc: "5% de probabilidad de detectar un efecto cuando en realidad no existe (error de tipo I)" },
    { label: "Potencia estadística", val: "0,80", desc: "80% de probabilidad de detectar un efecto real si existe (error de tipo II)" },
    { label: "Efecto mínimo detectable (EMD)", val: "1% de uplift relativo", desc: "La mejora más pequeña que justifica el costo de lanzar." },
  ],

  designStep: "Paso 03",
  designTitle: "Diseñar el Experimento",
  randUnitTitle: "Unidad de Aleatorización",
  randOptionTitle: "Unidad de aleatorización",
  randOpt1Label: "Sesión",
  randOpt1Desc: "Cada visita se asigna independientemente a un brazo.",
  randOpt2Label: "Usuario",
  randOpt2Desc: <>El usuario siempre ve el mismo algoritmo en todas las visitas.</>,
  randChosenLabel: "Usuario",
  randReason: <> A nivel de sesión, el mismo usuario puede ver ambos algoritmos en distintas visitas, lo que rompe el supuesto de independencia en que se basan las estadísticas. Los ingresos por usuario son una métrica a nivel de usuario, por lo que necesita una unidad de aleatorización a nivel de usuario. </>,
  randChosenPrefix: "Elegido: ",
  targetTitle: "Población Objetivo",
  targetP: "No todos los usuarios, solo los que abrieron la pestaña Shop al menos una vez durante la ventana del experimento. Son los únicos usuarios que vieron el feed de descubrimiento y estuvieron expuestos al ranking. Incluir usuarios que nunca visitaron la pestaña Shop inflaría el denominador y diluiría la señal.",
  sampleTitle: "Tamaño Muestral",
  sampleP: <> Los ingresos por usuario tienen cola pesada (σ ≈ $30 sobre una media de $8,50). Introduciendo la varianza bruta y un EMD del 1% en <C>n ≈ 16σ²/Δ²</C> se obtienen <B>~4,2M de usuarios por brazo</B>, unas cuatro semanas al ritmo de tráfico de Instagram Shop. Con la reducción de varianza por CUPED descrita abajo, la varianza efectiva se reduce a la mitad y el tamaño muestral baja a <B>2,1M de usuarios por brazo</B> (4,2M en total), o aproximadamente 1 a 2 semanas.</>,
  cupedTitle: "Reducción de Varianza (CUPED)",
  cupedP: <>Los ingresos por usuario tienen cola pesada, por eso el tamaño muestral naive era de 4,2M por brazo. CUPED (Controlled-experiment Using Pre-experiment Data) lo corrige ajustando los ingresos de cada usuario en el experimento por su baseline pre-experimento: <C>Y_cv = Y − θ × ingresos_pre</C>, donde <C>θ = Cov(Y, X) / Var(X)</C>. Los ingresos pre-experimento se miden antes de la asignación aleatoria, así que son independientes del tratamiento. Restarlos no desplaza la estimación del efecto. Solo elimina el ruido que ya existía en cada usuario antes de que el experimento comenzara. Con ρ ≈ 0,7 entre ingresos pre y durante el experimento, CUPED reduce la varianza en un 50%, y el tamaño muestral baja de 4,2M a <B>2,1M de usuarios por brazo</B>.</>,
  canaryTitle: "Lanzamiento Canario",
  canaryP: <> Antes del experimento principal, un <B>canario 1/99</B> despliega el nuevo algoritmo al 1% del tráfico mientras el 99% permanece en control. Los únicos guardianes monitorizados son la tasa de fallos, la latencia p95 y la tasa de ocultar y denunciar. Si alguno falla, el canario se detiene. Si todo está bien, los datos del canario se <span className="text-red-400 font-medium">descartan</span> y el experimento 50/50 corre en ese mismo 99%.</>,
  durationTitle: "Duración del Experimento",
  durationP: <> El tamaño muestral de <B>2,1M de usuarios por brazo</B> determina el calendario. Con los volúmenes de tráfico de Instagram Shop, eso se completa en aproximadamente <B>14 días</B>. La fecha de fin se fija antes del lanzamiento y no se mueve según cómo se vean los datos a mitad de la ejecución.</>,
  aaTestTitle: "Pre-verificación A/A",
  aaTestP: <> Se ejecuta la semana anterior al experimento principal: ambos brazos con el algoritmo idéntico, sin tratamiento. Resultado — p-valor de ingresos por usuario: <C>0,61</C>. Aleatorización confirmada sin sesgo. Experimento autorizado para proceder.</>,
  srmTitle: "Comprobación de SRM",
  srmP: "Tras la asignación, un test chi-cuadrado sobre los tamaños reales de los brazos confirmará que el bucketing es correcto. Un desequilibrio inesperado — 55/45 en lugar de 50/50 — invalidaría todos los resultados independientemente de la métrica principal.",
  noveltyCheckTitle: "Comprobación de Efecto Novedad",
  noveltyCheckP: "El uplift de la semana 1 y la semana 2 se compararán tras la ejecución. Una caída brusca hacia cero significaría que los usuarios reaccionaron al cambio, no a la calidad — no es una base válida para decidir el lanzamiento.",
  extValTitle: "Validez Externa e Interna",
  extValP: "La ventana del experimento se selecciona para evitar grandes eventos de compras. Los experimentos concurrentes y las campañas de marketing sobre la misma población se auditarán para descartar confusiones durante la ventana.",

  preValidityStep: "Paso 04",
  preValidityTitle: "Lista de Comprobación Pre-Experimento",
  preValidityP1: "Cuatro comprobaciones se ejecutan antes de que comience la recopilación de datos. El objetivo es la prevención: redes de seguridad activas, calendario libre de interferencias, aleatorización verificada.",
  preValidityItems: [
    { n: "01", t: "Métricas de guardia", d: "El seguimiento backend de salud técnica — tasa de fallos, latencia p95, tasa de errores, tasa de ocultar y denunciar — entra en funcionamiento antes del primer día. Estos son los interruptores de emergencia: si alguna métrica falla durante la ejecución, el experimento se detiene automáticamente." },
    { n: "02", t: "Calendario interno", d: "El calendario de lanzamientos de la empresa se revisó en busca de promociones concurrentes, campañas de email y rollouts de funcionalidades sobre la misma población. Cualquier solapamiento que pudiera afectar diferencialmente el comportamiento de compra en un brazo provoca una reprogramación o exclusión estricta." },
    { n: "03", t: "Calendario externo", d: "La ventana (12-26 jul) se eligió para evitar grandes eventos de compras, festivos y ventas de competidores. No se encontraron solapamientos." },
    { n: "04", t: "Pre-verificación A/A", d: <> Se ejecuta la semana anterior al experimento principal: ambos brazos con el algoritmo idéntico, sin tratamiento. Resultado — p-valor de ingresos por usuario: <C>0,61</C>. Aleatorización confirmada sin sesgo. Experimento autorizado para proceder.</> },
  ] as { n: string; t: string; d: ReactNode }[],

  runStep: "Paso 05",
  runTitle: "Ejecutar el Experimento",
  runP1: "Dos cosas importan durante la ejecución:",
  runItems: [
    { n: "1", t: "Instrumentación", d: <> Cada impresión, clic, añadir al carrito y compra se registra con <C>user_id</C>, asignación de brazo y una marca de tiempo. La completitud del registro se verifica en las comprobaciones de validez post-experimento antes de leer los resultados.</> },
    { n: "2", t: "No mirar el p-valor de la métrica principal", d: "La fecha de fin se fija antes del lanzamiento y no cambia según cómo se vean los datos en el día 7. Esta es la regla más violada en la experimentación online." },
  ],
  callout2: "Cada vez que compruebas el p-valor a mitad del experimento y podrías actuar según lo que ves, añades un punto de decisión al test. Con α = 0,05, comprobarlo diariamente a lo largo de una ejecución de 14 días puede elevar tu tasa real de falsos positivos muy por encima del 5%. La garantía preespecificada ya no se sostiene.",

  validityStep: "Paso 06",
  validityTitle: "Comprobaciones de Validez Post-Experimento",
  validityP1: "Tres comprobaciones post-experimento deben pasar antes de leer ningún resultado. Las tres hacen lo mismo: descartar explicaciones alternativas antes de atribuir lo que ves al tratamiento.",
  validityItems: [
    { n: "01", t: "Auditoría de instrumentación", d: <> Cruzamos los registros de vistas del servidor con los clics y compras del cliente para confirmar que no se perdieron eventos, y verificamos que la latencia de registro (<C>p95</C>) se mantuvo estable. La pérdida total de eventos fue insignificante (<B>&lt; 0,3%</B>) y se distribuyó uniformemente en ambos grupos, sin sesgo de seguimiento, sin gaps sistemáticos de registro.</> },
    { n: "02", t: "Comprobación de ratio", d: <> Test chi-cuadrado sobre los tamaños reales de los brazos: 50,1% / 49,9%, p = <C>0,42</C>. Sin sesgo sistemático de cubo.</> },
    { n: "03", t: "Efecto novedad", d: "El uplift de la semana 2 fue el 91% del de la semana 1. Una caída hacia cero significaría que los usuarios reaccionan a la novedad, no a la calidad. 91% es estable." },
  ],

  resultsStep: "Paso 07",
  resultsTitle: "Los Resultados",
  resultsP1: "Las tres comprobaciones de validez post-experimento superadas. Entonces leímos los resultados.",
  resultsMetrics: [
    { val: "$8,50", label: "Ingresos medios control / usuario / 14 días", accent: false },
    { val: "$8,87", label: "Ingresos medios tratamiento / usuario / 14 días", accent: true },
    { val: "+4,4%", label: "Uplift relativo", accent: true },
    { val: "p = 0,01", label: "p-valor (umbral: 0,05)", accent: false },
  ],
  resultsCILabel: "IC bootstrap del 95%",
  revenueChartTitle: "Ingresos Diarios Medios por Usuario ($)",
  revenueYLabel: "Ingresos Medios",
  revenueXLabel: "Tiempo en Días",
  revenueTreatment: "Tratamiento",
  revenueControl: "Control",
  fig2label: "Fig 2.",
  fig2caption: "El tratamiento (naranja) supera consistentemente al control (azul) durante la ventana de 14 días sin caída tardía.",
  resultsP2pre: "Los ingresos por usuario pasaron de ",
  resultsP2b1: "$8,50",
  resultsP2mid: " en control a ",
  resultsP2b2: "$8,87",
  resultsP2mid2: " en tratamiento durante la ventana de 14 días, un uplift relativo de ",
  resultsP2b3: "+4,4%",
  resultsP2post: ". El p-valor fue 0,01, por debajo del umbral α = 0,05 preespecificado.",
  resultsP3pre: "El intervalo de confianza del 95% es ",
  resultsP3bold: "[+3,4%, +5,4%]",
  resultsP3mid: ". Todo el intervalo está por encima del EMD del 1%. No es solo estadísticamente significativo, es ",
  resultsP3em: "prácticamente",
  resultsP3post: " significativo. Una mejora real de tamaño relevante.",
  funnelCheckTitle: "Comprobación del embudo",
  funnelCheckP: "Un uplift de CTR que se derrumbara en el checkout significaría que el algoritmo solo muestra productos llamativos pero de baja intención. El uplift se mantuvo hasta el final:",
  funnelRows: [
    { stage: "Tasa de clics (CTR)", lift: "+4,1%" },
    { stage: "Vistas de página de producto", lift: "+3,7%" },
    { stage: "Añadir al carrito", lift: "+2,8%" },
    { stage: "Checkout iniciado", lift: "+2,3%" },
    { stage: "Pedidos realizados", lift: "+2,1%" },
  ],
  funnelColStage: "Etapa del embudo",
  funnelColLift: "Uplift vs control",
  segmentP: <> Desglose por segmento: usuarios inactivos (sin compra en 90 días) <B>+6,9%</B>, APAC <B>+5,1%</B>, compradores frecuentes (3+ compras previas) <B>+0,2%</B>. El ranker heredado ya estaba bien calibrado para usuarios avanzados. Las ganancias vinieron del resto.</>,

  decisionStep: "Paso 08",
  decisionTitle: "La Decisión de Lanzamiento",
  decisionP1: "Un resultado significativo con el IC por encima del EMD no significa automáticamente lanzar. El forest plot a continuación mapea cinco posibles resultados experimentales a cinco decisiones distintas.",
  fig3label: "Fig 3.",
  fig3caption: "Cinco posibles resultados del experimento según dónde cae el IC del 95% respecto a los umbrales EMD de ±1%.",
  decisionP2: "Nuestro resultado es el escenario 2. Tres cosas que cerraron la decisión:",
  decisionItems: [
    { n: "1", t: "Compensaciones de métricas", d: "Todos los guardianes en verde. Sin regresiones en tasa de fallos, latencia, ingresos por anuncios o señales de satisfacción del usuario." },
    { n: "2", t: "Costo de implementación", d: "El costo adicional de inferencia alcanza el punto de equilibrio en ~+0,4% de uplift en GMV. El uplift observado es +4,4%. La economía está clara." },
    { n: "3", t: "Riesgo de falso positivo", d: "p = 0,01, IC completamente por encima del EMD. La probabilidad de que esto sea ruido es insignificante." },
  ],
  decisionScenarios: [
    { n: "1", ci: "−1,4% a +1,7%", label: "Sin potencia suficiente", verdict: "Repetir con mayor potencia", type: "hold" as const, desc: "El IC abarca el cero y ambos umbrales EMD. El efecto podría ir desde dañino hasta beneficioso. No hay conclusión válida. Correr el experimento más tiempo es la solución más práctica — más usuarios, IC más estrecho. Las técnicas de reducción de varianza (CUPED, estratificación sobre ingresos pre-experimento) pueden lograr lo mismo sin ampliar la ventana temporal." },
    { n: "2", ci: "+1,5% a +2,9%", label: "Señal clara de lanzamiento ← nuestro resultado", verdict: "Lanzar", type: "go" as const, desc: "IC completamente por encima del EMD del +1%. El efecto es positivo, estadísticamente significativo y prácticamente relevante." },
    { n: "3", ci: "−1,4% a +0,2%", label: "Probablemente nulo o dañino", verdict: "Abandonar", type: "stop" as const, desc: "IC mayoritariamente por debajo de cero. El efecto más probable es negativo o nulo. Devolver al equipo de ML para rediseño del algoritmo antes de seguir experimentando." },
    { n: "4", ci: "−0,9% a −0,5%", label: "Regresión confirmada", verdict: "No definitivo", type: "stop" as const, desc: "IC completamente por debajo del −1% EMD. El algoritmo daña activamente los ingresos. Estadísticamente significativo en la dirección incorrecta, investigar causa raíz antes de cualquier nueva experimentación." },
    { n: "5", ci: "−0,1% a +1,9%", label: "Ambiguo", verdict: "Repetir con mayor potencia", type: "hold" as const, desc: "La dirección es positiva pero el IC cruza el cero. No se puede descartar efecto nulo con α = 0,05, ni confirmar que el efecto supera el EMD. Correr más tiempo es la solución más directa — más usuarios estrecha el IC. La reducción de varianza (CUPED) puede ayudar si ampliar la ventana no es una opción." },
  ] as { n: string; ci: string; label: string; verdict: string; type: "go" | "stop" | "hold"; desc: string }[],
  decisionBoxLabel: "Decisión",
  decisionBoxTitle: "Lanzar al 100% con un holdback del 5% durante 90 días.",
  decisionBoxDesc: "El holdback funciona como un contrafactual de largo plazo para detectar cualquier regresión retardada o canibalización de GMV que no aparecería en una ventana de 14 días.",

  gapsFixAddressable: "abordable ahora",
  gapsFixPartial: "solución parcial",
  gapsFixRedesign: "requiere rediseño",
  gapsStep: "Evaluación Honesta",
  gapsTitle: "Cuatro Cosas que este Test No Aborda del Todo",
  gapsP1: "Un resultado significativo no significa que el experimento fuera perfecto. Estas son las limitaciones que vale la pena conocer:",
  gapsItems: [
    {
      n: "01",
      t: "Spillover social",
      d: "Un producto mostrado a un usuario de tratamiento puede propagarse orgánicamente, compartido por DMs, Stories o Reels, exponiendo también a usuarios de control. Los splits 50/50 estándar no pueden aislar esto por completo. Un diseño de clúster geográfico podría, pero a un coste significativo en potencia estadística.",
      fix: "redesign" as const,
    },
    {
      n: "02",
      t: "Testing múltiple en métricas de embudo",
      d: "Se leyeron cinco métricas secundarias de embudo junto con la primaria. Sin corrección Bonferroni o Benjamini-Hochberg, la tasa de falsos positivos familiar supera el α = 0,05 reportado. La métrica primaria está preespecificada y es sólida; los uplift secundarios deberían llevar una advertencia. Aplicar la corrección Benjamini-Hochberg a las cinco métricas de embudo es un paso directo y debería hacerse antes de leerlas.",
      fix: "addressable" as const,
    },
    {
      n: "03",
      t: "Calentamiento del algoritmo",
      d: "Los modelos de descubrimiento aprenden de las señales de engagement. El algoritmo en el día 14 ha visto mucho menos datos que en el día 90. El uplift medido puede infraestimar la ganancia eventual en estado estable, y comparar un control calentado con un tratamiento frío crea una pequeña pero real asimetría en la comparación. El holdback de 90 días captura el uplift en estado estable; la asimetría dentro de la ventana principal de 14 días es más difícil de eliminar.",
      fix: "partial" as const,
    },
    {
      n: "04",
      t: "Desplazamiento descubrimiento y búsqueda",
      d: "Si los usuarios encuentran productos a través del feed de descubrimiento, buscan menos. Eso es bueno para este experimento pero podría suprimir el CTR de búsqueda, una métrica de otro equipo. No se incluyó una comprobación entre superficies (impresiones de descubrimiento vs. tasa posterior de búsqueda por brazo), pero puede consultarse desde los registros del servidor existentes.",
      fix: "addressable" as const,
    },
  ] as { n: string; t: string; d: string; fix: "addressable" | "partial" | "redesign" }[],

  takeawaysStep: "Lo Que Funciona",
  takeawaysTitle: "Tres Cosas Que Hicieron el Resultado Fiable",
  takeaways: [
    { t: "La métrica se eligió antes de ejecutar el test", d: "Ingresos por usuario, no tasa de conversión, porque la pregunta era sobre GMV no volumen. Elegir la métrica después de ver los datos es la forma más rápida de invalidar un experimento." },
    { t: "La fecha de fin no era negociable", d: "Sin mirar, sin paradas anticipadas, sin extensiones. Comprometerse con la fecha de fin de antemano es la única forma de que la garantía α = 0,05 siga siendo válida." },
    { t: "El test AA se ejecutó la semana anterior", d: "No como formalidad, sino como una comprobación real. Si los grupos hubieran estado desequilibrados antes del tratamiento, toda la lectura habría estado confundida." },
  ],
};

// ── Diagram components ────────────────────────────────────────────────────────

function FunnelDiagram({ tx }: { tx: typeof en }) {
  return (
    <figure className="select-none">
      <div className="rounded-xl bg-bg-elev/50 border border-border px-6 pt-6 pb-8 sm:px-12 sm:pt-8">
        <div className="relative flex flex-col items-center gap-[3px]">
          {tx.funnelLayers.map(({ label, pct, color, tag }) => (
            <div key={label} className="w-full flex flex-col items-center">
              <div className="flex items-center justify-center py-3 text-white text-xs sm:text-sm font-medium text-center px-3" style={{ width: `${pct}%`, backgroundColor: color }}>
                {label}
              </div>
              {tag && (
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-accent py-1 tracking-wide">
                  <span className="font-bold">↑</span>
                  <span>{tx.funnelAlgoTag}</span>
                  <span className="font-bold">↑</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <figcaption className="text-center text-xs text-ink-subtle mt-3">
        <span className="text-ink-muted font-medium">{tx.fig1label}</span>{" "}{tx.fig1caption}
      </figcaption>
    </figure>
  );
}

function RevenueChart({ tx }: { tx: typeof en }) {
  const W = 560, H = 220;
  const pl = 16, pr = 90, pt = 20, pb = 45;
  const cW = W - pl - pr, cH = H - pt - pb;
  const treatment = [0.64, 0.62, 0.65, 0.63, 0.64, 0.62, 0.62, 0.64, 0.62, 0.64, 0.65, 0.62, 0.63, 0.63];
  const control   = [0.61, 0.57, 0.63, 0.58, 0.62, 0.57, 0.59, 0.61, 0.56, 0.60, 0.64, 0.58, 0.59, 0.61];
  const n = treatment.length;
  const xv = (i: number) => pl + (i / (n - 1)) * cW;
  const yv = (v: number) => pt + ((0.72 - v) / (0.72 - 0.42)) * cH;
  const line = (pts: number[]) => pts.map((v, i) => `${i === 0 ? "M" : "L"}${xv(i).toFixed(1)},${yv(v).toFixed(1)}`).join(" ");

  return (
    <figure className="select-none">
      <div className="rounded-xl bg-bg-elev/50 border border-border p-5 pb-2">
        <p className="text-center text-sm font-medium text-ink mb-2">{tx.revenueChartTitle}</p>
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden="true">
          {[0.50, 0.58, 0.66].map((v) => (
            <line key={v} x1={pl} y1={yv(v)} x2={pl + cW} y2={yv(v)} stroke="rgba(14,16,20,0.07)" strokeDasharray="4,4" />
          ))}
          <line x1={pl} y1={pt} x2={pl} y2={pt + cH} stroke="rgba(14,16,20,0.12)" />
          <line x1={pl} y1={pt + cH} x2={pl + cW} y2={pt + cH} stroke="rgba(14,16,20,0.12)" />
          <text x={pl - 6} y={pt + cH / 2} textAnchor="middle" fill="rgba(14,16,20,0.45)" fontSize={10} transform={`rotate(-90,${pl - 6},${pt + cH / 2})`}>{tx.revenueYLabel}</text>
          <text x={pl + cW / 2} y={H - 8} textAnchor="middle" fill="rgba(14,16,20,0.45)" fontSize={10}>{tx.revenueXLabel}</text>
          <path d={line(control)} fill="none" stroke="#3b82f6" strokeWidth={2} strokeLinejoin="round" />
          {control.map((v, i) => <circle key={i} cx={xv(i)} cy={yv(v)} r={2.5} fill="#3b82f6" />)}
          <path d={line(treatment)} fill="none" stroke="#f97316" strokeWidth={2} strokeLinejoin="round" />
          {treatment.map((v, i) => <circle key={i} cx={xv(i)} cy={yv(v)} r={2.5} fill="#f97316" />)}
          <circle cx={pl + cW + 14} cy={pt + 22} r={4} fill="#f97316" />
          <text x={pl + cW + 22} y={pt + 26} fill="rgba(14,16,20,0.65)" fontSize={10}>{tx.revenueTreatment}</text>
          <circle cx={pl + cW + 14} cy={pt + 42} r={4} fill="#3b82f6" />
          <text x={pl + cW + 22} y={pt + 46} fill="rgba(14,16,20,0.65)" fontSize={10}>{tx.revenueControl}</text>
        </svg>
      </div>
      <figcaption className="text-center text-xs text-ink-subtle mt-3">
        <span className="text-ink-muted font-medium">{tx.fig2label}</span>{" "}{tx.fig2caption}
      </figcaption>
    </figure>
  );
}

function CIForestPlot({ tx }: { tx: typeof en }) {
  const W = 500, H = 260;
  const pl = 52, pr = 28, pt = 25, pb = 50;
  const cW = W - pl - pr, cH = H - pt - pb;
  const xMin = -2.3, xMax = 3.7, xr = xMax - xMin;
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
          <line x1={xs(-1)} y1={pt - 5} x2={xs(-1)} y2={pt + cH + 5} stroke="rgba(14,16,20,0.35)" strokeDasharray="4,3" strokeOpacity={1} />
          <line x1={xs(1)} y1={pt - 5} x2={xs(1)} y2={pt + cH + 5} stroke="rgba(14,16,20,0.35)" strokeDasharray="4,3" strokeOpacity={1} />
          <line x1={xs(0)} y1={pt - 5} x2={xs(0)} y2={pt + cH + 5} stroke="rgba(14,16,20,0.2)" />
          {scenarios.map(({ pe, lo, hi }, i) => {
            const y = ys(i);
            const type = tx.decisionScenarios[i].type;
            const clr = type === "go" ? "#16a34a" : type === "stop" ? "#ef4444" : "#f97316";
            const sw = type === "go" ? 2.5 : 1.8;
            return (
              <g key={i}>
                <line x1={xs(lo)} y1={y} x2={xs(hi)} y2={y} stroke={clr} strokeWidth={sw} />
                <line x1={xs(lo)} y1={y - 5} x2={xs(lo)} y2={y + 5} stroke={clr} strokeWidth={1.5} />
                <line x1={xs(hi)} y1={y - 5} x2={xs(hi)} y2={y + 5} stroke={clr} strokeWidth={1.5} />
                <line x1={xs(pe)} y1={y - 6} x2={xs(pe)} y2={y + 6} stroke={clr} strokeWidth={2} />
                <circle cx={pl - 24} cy={y} r={11} fill="#15254e" />
                <text x={pl - 24} y={y + 4} textAnchor="middle" fill="white" fontSize={10} fontWeight="bold">{i + 1}</text>
              </g>
            );
          })}
          <line x1={pl} y1={pt + cH} x2={pl + cW} y2={pt + cH} stroke="rgba(14,16,20,0.12)" />
          <text x={xs(-1)} y={H - 15} textAnchor="middle" fill="rgba(14,16,20,0.45)" fontSize={10}>-1.0%</text>
          <text x={xs(0)} y={H - 15} textAnchor="middle" fill="rgba(14,16,20,0.45)" fontSize={10}>0%</text>
          <text x={xs(1)} y={H - 15} textAnchor="middle" fill="rgba(14,16,20,0.45)" fontSize={10}>+1.0%</text>
        </svg>
      </div>
      <figcaption className="mt-3 text-xs text-ink-subtle text-center">
        <span className="text-ink-muted font-medium">{tx.fig3label}</span>{" "}{tx.fig3caption}
      </figcaption>
    </figure>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AbTestContent() {
  const { lang } = useLang();
  const tx = lang === "es" ? es : en;

  return (
    <article className="pt-32 pb-24">
      <BackLink />
      <header className="container-page mt-10">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-accent">{tx.eyebrow}</p>
          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight leading-[1.08] mt-4">
            A/B Testing on Instagram&apos;s Shop
          </h1>
          <div className="mt-6 flex flex-wrap gap-2">
            {["A/B Testing", "Experimentation", "Recommender Systems", "Statistical Inference"].map((t) => (
              <span key={t} className="text-[11px] px-2.5 py-1 rounded-md bg-bg-elev border border-border text-ink-muted font-mono">{t}</span>
            ))}
          </div>
        </div>
      </header>

      <div className="container-page mt-16">
        {/* Opening: text left, Instagram Shop screenshot right */}
        <div className="flex flex-col md:flex-row md:gap-12 md:items-start">
          <div className="md:flex-1 min-w-0">
            <P>{tx.openP1}</P>
            <P>{tx.openP2}</P>
            <P>{tx.openP3}</P>
          </div>
          <div className="mt-8 md:mt-0 md:w-52 lg:w-60 shrink-0 md:sticky md:top-24">
            <Image
              src="/instagram-shop.webp"
              alt="Instagram Shop discovery feed"
              width={240}
              height={520}
              className="rounded-2xl border border-border w-full h-auto shadow-xl"
            />
            <p className="text-[11px] text-ink-subtle text-center mt-2 leading-snug">Instagram Shop — discovery feed</p>
          </div>
        </div>

        <Prose>
          <SH id="setup" step={tx.setupStep}>{tx.setupTitle}</SH>
          <P>{tx.setupP1pre}<B>{tx.setupP1bold}</B>{tx.setupP1post}</P>
        </Prose>

        <Wide><FunnelDiagram tx={tx} /></Wide>

        <Prose>
          <P>{tx.setupP2}<Em>{tx.setupP2em}</Em>{tx.setupP2post}</P>
        </Prose>

        <Prose>
          <SH id="metric" step={tx.metricStep}>{tx.metricTitle}</SH>
          <P>{tx.metricP1}</P>
          <OptionBox
            options={[
              { label: tx.metricOpt1Label, desc: tx.metricOpt1Desc },
              { label: tx.metricOpt2Label, desc: tx.metricOpt2Desc },
            ]}
            chosenLabel={tx.metricChosenLabel}
            reason={tx.metricReason}
          />
          <P>
            {tx.metricP2pre}<B>{tx.metricP2b1}</B>{tx.metricP2t1}
            <B>{tx.metricP2b2}</B>{tx.metricP2t2}
            <B>{tx.metricP2b3}</B>{tx.metricP2t3}
            <B>{tx.metricP2b4}</B>{tx.metricP2t4}
          </P>

        </Prose>

        <Prose>
          <SH id="hypothesis" step={tx.hypothesisStep}>{tx.hypothesisTitle}</SH>
          <P>{tx.hypothesisP1}</P>
          <div className="mt-5 grid sm:grid-cols-2 gap-3">
            <div className="flex flex-col items-center text-center rounded-lg bg-bg-elev/30 border border-border px-4 py-5 gap-2">
              <span className="text-accent font-mono text-2xl font-bold">H₀</span>
              <p className="text-sm text-ink-muted leading-relaxed">{tx.h0}</p>
            </div>
            <div className="flex flex-col items-center text-center rounded-lg bg-bg-elev/30 border border-border px-4 py-5 gap-2">
              <span className="text-accent font-mono text-2xl font-bold">H₁</span>
              <p className="text-sm text-ink-muted leading-relaxed">{tx.h1}</p>
            </div>
          </div>
          <P>{tx.hypothesisP2}</P>
          <div className="mt-5 grid sm:grid-cols-3 gap-3">
            {tx.hypothesisParams.map(({ label, val, desc }) => (
              <div key={label} className="flex flex-col items-center text-center rounded-lg bg-bg-elev/30 border border-border px-4 py-4 gap-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-ink-muted font-medium">{label}:</span>
                  <span className="font-mono text-sm text-accent">{val}</span>
                </div>
                <p className="text-xs text-ink-subtle leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </Prose>

        <Prose>
          <SH id="design" step={tx.designStep}>{tx.designTitle}</SH>
          <SH3>{tx.randUnitTitle}</SH3>
          <OptionBox
            options={[
              { label: tx.randOpt1Label, desc: tx.randOpt1Desc },
              { label: tx.randOpt2Label, desc: tx.randOpt2Desc },
            ]}
            chosenLabel={tx.randChosenLabel}
            reason={tx.randReason}
          />
          <div className="mt-8 space-y-3">
            {([
              { n: "01", title: tx.targetTitle, body: tx.targetP },
              { n: "02", title: tx.sampleTitle, body: tx.sampleP },
              { n: "03", title: tx.canaryTitle, body: tx.canaryP },
              { n: "04", title: tx.durationTitle, body: tx.durationP },
            ] as { n: string; title: string; body: React.ReactNode }[]).map(({ n, title, body }) => (
              <div key={n} className="flex gap-4 rounded-lg bg-bg-elev/30 border border-border px-4 py-4">
                <span className="font-mono text-xs text-accent shrink-0 mt-0.5 w-7">{n}</span>
                <div>
                  <p className="text-sm font-semibold text-ink">{title}</p>
                  <div className="text-sm text-ink-muted leading-relaxed mt-1.5">{body}</div>
                </div>
              </div>
            ))}
          </div>
          <SH3>{tx.cupedTitle}</SH3>
          <P>{tx.cupedP}</P>
        </Prose>

        <Prose>
          <SH id="pre-validity" step={tx.preValidityStep}>{tx.preValidityTitle}</SH>
          <P>{tx.preValidityP1}</P>
          <div className="mt-6 space-y-3">
            {tx.preValidityItems.map(({ n, t, d }) => (
              <div key={n} className="flex gap-4 rounded-lg bg-bg-elev/30 border border-border px-4 py-3.5">
                <span className="font-mono text-xs text-accent shrink-0 mt-0.5">{n}</span>
                <p className="text-sm text-ink-muted leading-relaxed"><span className="text-ink font-medium">{t}. </span>{d}</p>
              </div>
            ))}
          </div>
        </Prose>

        <Prose>
          <SH id="run" step={tx.runStep}>{tx.runTitle}</SH>
          <P>{tx.runP1}</P>
          <ol className="mt-5 space-y-4 list-none">
            {tx.runItems.map(({ n, t, d }) => (
              <li key={n} className="flex gap-4">
                <span className="font-mono text-xs text-accent shrink-0 mt-[0.45rem] w-5">{n}.</span>
                <span className="prose-text"><span className="text-ink font-medium">{t}. </span>{d}</span>
              </li>
            ))}
          </ol>
          <Callout>{tx.callout2}</Callout>
        </Prose>

        <Prose>
          <SH id="validity" step={tx.validityStep}>{tx.validityTitle}</SH>
          <P>{tx.validityP1}</P>
          <div className="mt-6 space-y-3">
            {tx.validityItems.map(({ n, t, d }) => (
              <div key={n} className="flex gap-4 rounded-lg bg-bg-elev/30 border border-border px-4 py-3.5">
                <span className="font-mono text-xs text-accent shrink-0 mt-0.5">{n}</span>
                <p className="text-sm text-ink-muted leading-relaxed"><span className="text-ink font-medium">{t}. </span>{d}</p>
              </div>
            ))}
          </div>
        </Prose>

        <Prose>
          <SH id="results" step={tx.resultsStep}>{tx.resultsTitle}</SH>
          <P>{tx.resultsP1}</P>
        </Prose>

        <Prose>
          <div className="my-8 rounded-xl border border-border bg-bg-elev/40 p-5">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-5">
              {tx.resultsMetrics.map(({ val, label, accent }) => (
                <div key={label}>
                  <div className={`font-mono text-2xl font-bold ${accent ? "text-accent" : "text-ink"}`}>{val}</div>
                  <div className="text-[11px] text-ink-subtle mt-1 leading-snug">{label}</div>
                </div>
              ))}
              <div>
                <div className="font-mono text-2xl font-bold text-ink">[+3.4%, +5.4%]</div>
                <div className="text-[11px] text-ink-subtle mt-1 leading-snug">{tx.resultsCILabel}</div>
              </div>
            </div>
          </div>
        </Prose>

        <Wide><RevenueChart tx={tx} /></Wide>

        <Prose>
          <P>{tx.resultsP2pre}<B>{tx.resultsP2b1}</B>{tx.resultsP2mid}<B>{tx.resultsP2b2}</B>{tx.resultsP2mid2}<B>{tx.resultsP2b3}</B>{tx.resultsP2post}</P>
          <P>{tx.resultsP3pre}<B>{tx.resultsP3bold}</B>{tx.resultsP3mid}<Em>{tx.resultsP3em}</Em>{tx.resultsP3post}</P>
          <SH3>{tx.funnelCheckTitle}</SH3>
          <P>{tx.funnelCheckP}</P>
        </Prose>

        <Prose>
          <div className="my-6 flex flex-col items-center gap-1.5">
            {tx.funnelRows.map(({ stage, lift }, i) => {
              const pcts = [100, 84, 70, 58, 47];
              return (
                <div key={stage} style={{ width: `${pcts[i]}%` }} className="flex items-center justify-center gap-3 rounded-lg bg-accent/10 border border-accent/20 px-4 py-2.5">
                  <span className="text-sm text-ink-muted">{stage}</span>
                  <span className="font-mono font-semibold text-accent text-sm">{lift}</span>
                </div>
              );
            })}
          </div>
        </Prose>

        <Prose>
          <SH id="decision" step={tx.decisionStep}>{tx.decisionTitle}</SH>
          <P>{tx.decisionP1}</P>
        </Prose>

        <Wide><CIForestPlot tx={tx} /></Wide>

        <Prose>
          <div className="mt-6 space-y-2">
            {tx.decisionScenarios.map(({ n, ci, label, verdict, type, desc }) => (
              <div key={n} className="flex gap-4 rounded-lg bg-bg-elev/30 border border-border px-4 py-3.5">
                <span className="w-6 h-6 rounded-full bg-accent/20 text-accent font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{n}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-ink">{label}</span>
                    <span className="font-mono text-xs text-ink-subtle">{ci}</span>
                    <span className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded border ${
                      type === "go" ? "text-green-700 bg-green-50 border-green-200"
                      : type === "stop" ? "text-red-700 bg-red-50 border-red-200"
                      : "text-amber-700 bg-amber-50 border-amber-200"
                    }`}>{verdict}</span>
                  </div>
                  <p className="text-sm text-ink-muted leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <P>{tx.decisionP2}</P>
          <div className="mt-5 space-y-3">
            {tx.decisionItems.map(({ n, t, d }) => (
              <div key={n} className="flex gap-4 items-start rounded-lg bg-bg-elev/30 border border-border px-4 py-3.5">
                <span className="w-6 h-6 rounded-full bg-accent/20 text-accent font-mono text-xs font-bold flex items-center justify-center shrink-0">{n}</span>
                <p className="text-sm text-ink-muted leading-relaxed"><span className="text-ink font-medium">{t}. </span>{d}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-xl bg-accent/10 border border-accent/30 px-6 py-5">
            <p className="font-mono text-xs text-accent mb-1.5">{tx.decisionBoxLabel}</p>
            <p className="text-ink font-semibold text-lg">{tx.decisionBoxTitle}</p>
            <p className="text-sm text-ink-muted mt-1.5">{tx.decisionBoxDesc}</p>
          </div>
        </Prose>

        <Prose>
          <SH id="gaps" step={tx.gapsStep}>{tx.gapsTitle}</SH>
          <P>{tx.gapsP1}</P>
          <div className="mt-6 space-y-3">
            {tx.gapsItems.map(({ n, t, d, fix }) => (
              <div key={n} className="flex gap-4 rounded-lg bg-bg-elev/30 border border-border/70 px-4 py-3.5">
                <span className="font-mono text-xs text-ink-subtle shrink-0 mt-0.5">{n}</span>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-ink">{t}</span>
                    <span className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded border ${
                      fix === "addressable" ? "text-green-700 bg-green-50 border-green-200"
                      : fix === "partial" ? "text-amber-700 bg-amber-50 border-amber-200"
                      : "text-red-700 bg-red-50 border-red-200"
                    }`}>{fix === "addressable" ? tx.gapsFixAddressable : fix === "partial" ? tx.gapsFixPartial : tx.gapsFixRedesign}</span>
                  </div>
                  <p className="text-sm text-ink-muted leading-relaxed">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </Prose>

        <Prose>
          <SH id="takeaways" step={tx.takeawaysStep}>{tx.takeawaysTitle}</SH>
          <ol className="mt-5 space-y-4 list-none">
            {tx.takeaways.map(({ t, d }, i) => (
              <li key={i} className="flex gap-4">
                <span className="font-mono text-xs text-accent shrink-0 mt-[0.45rem] w-5">{i + 1}.</span>
                <span className="prose-text"><span className="text-ink font-medium">{t}. </span>{d}</span>
              </li>
            ))}
          </ol>
        </Prose>

        <ArticleNextProject slug="fico-approximation" />
      </div>
    </article>
  );
}

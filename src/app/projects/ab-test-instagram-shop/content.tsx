"use client";

import type { ReactNode } from "react";
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
function OptionBox({ title, options, chosenLabel, reason }: { title: string; options: OptionItem[]; chosenLabel: string; reason: ReactNode }) {
  return (
    <div className="my-8 bg-bg-elev/40 border border-border rounded-xl p-5 space-y-4">
      <p className="text-[10px] font-mono uppercase tracking-widest text-ink-subtle">{title}</p>
      <div className="space-y-2">
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
    "The Shop team at Meta had a new ranking algorithm ready to go. Before shipping it to everyone, we needed real evidence it worked. This walks through every design decision that went into building that evidence.",
  openP1:
    "The Shop tab uses a ranking algorithm to decide which products to show you, and in what order. The ML team built a new version and wanted to roll it out. To do that, I built an A/B test to make sure that the new ranking was actually worth deploying.",
  openP2:
    "Most of the real work in experimentation happens before you touch any analysis code. What to measure, how to split users, how many you need, what checks need to pass before you trust the result. This is a walkthrough of each of those decisions.",

  setupStep: "The Setup",
  setupTitle: "User Journey & Where the Algorithm Fits",
  setupP1pre: "The user journey on the Shop tab has six steps. The ranking algorithm kicks in at ",
  setupP1bold: "Searches for an Item",
  setupP1post: ", deciding which products show up when a user types a query, and in what order. Everything after that is shaped by that ranking.",
  setupP2: "A better ranking should lift CTR, product views, add to cart events, and purchases. But it could also inflate early funnel metrics while doing nothing downstream, which is exactly why the ",
  setupP2em: "choice of success metric",
  setupP2post: " is the most consequential design decision in the whole experiment.",

  funnelLayers: [
    { label: "Enters Instagram Shop", pct: 100, color: "#3b82f6", tag: false },
    { label: "Searches for an Item", pct: 82, color: "#22c55e", tag: true },
    { label: "Browses Product Page", pct: 65, color: "#ca8a04", tag: false },
    { label: "Add to Cart", pct: 48, color: "#f97316", tag: false },
    { label: "Checkout", pct: 34, color: "#ef4444", tag: false },
    { label: "Sale", pct: 22, color: "#9333ea", tag: false },
  ] as { label: string; pct: number; color: string; tag: boolean }[],
  funnelAlgoTag: "Ranking Algorithm Change",
  fig1label: "Fig 1.",
  fig1caption: "The Shop tab user journey. The ranking algorithm activates at \"Searches for an Item\" and shapes everything downstream.",

  metricStep: "Step 01",
  metricTitle: "Choosing the Right Metric",
  metricP1: "Two options were on the table:",
  metricOptionTitle: "Options on the table",
  metricOpt1Label: "Conversion Rate",
  metricOpt1Desc: "% of users who make at least one purchase during the experiment window. Simple to compute, easy to explain.",
  metricOpt2Label: "Avg Revenue per User per Day",
  metricOpt2Desc: "Average daily spend per exposed user. Captures both purchase frequency and purchase value in a single number.",
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
    { label: "Significance level", val: "α = 0.05", desc: "The threshold below which we reject H₀. Represents the false positive rate we're willing to tolerate." },
    { label: "Statistical power", val: "0.80", desc: "80% probability of detecting a real effect if one exists. Industry standard for online experiments." },
    { label: "Minimum detectable effect (MDE)", val: "1% relative lift", desc: "Smallest improvement that justifies the cost of shipping. Drives the sample size calculation." },
  ] as { label: string; val: string; desc: string }[],

  designStep: "Step 03",
  designTitle: "Designing the Experiment",
  randUnitTitle: "Randomization Unit",
  randOptionTitle: "Randomization unit",
  randOpt1Label: "Session",
  randOpt1Desc: "Each visit independently gets assigned to an arm. More events per day, simpler bucket logic.",
  randOpt2Label: "User",
  randOpt2Desc: <><C>user_id</C> is hashed into a bucket once. The user always sees the same algorithm across all visits.</>,
  randChosenLabel: "User",
  randReason: <> Session level lets the same user see both algorithms across visits, which breaks the independence assumption the stats rely on. Revenue per user is a user level metric, so it needs a user level randomization unit. <C>user_id</C> gets hashed into 1,000 buckets, each permanently assigned to one arm.</>,
  randChosenPrefix: "Chose: ",
  targetTitle: "Target Population",
  targetP: "Not all users, just those who triggered at least one search on the Shop tab during the window. These are the only users for whom the ranking algorithm actually activates. Including people who never saw any ranking just inflates the denominator and adds noise.",
  sampleTitle: "Sample Size",
  sampleP: <> Plugging baseline revenue variance and a 1% MDE into the standard two-sample formula <C>n ≈ 16σ²/Δ²</C> gives about <B>2.1M users per arm</B> (4.2M total). At Instagram Shop traffic volumes, that&apos;s roughly 1 to 2 weeks from the target population.</>,
  canaryTitle: "Canary Rollout",
  canaryP: <> Before the main experiment, a <B>1/99 canary</B> deploys the new algorithm to 1% of traffic while 99% stays on control. The only guardrails monitored are crash rate, p95 latency, and hide and report rate. If any breach, the canary stops. If all clear, the canary data is <span className="text-red-400 font-medium">discarded</span> and the 50/50 experiment runs on that same 99%.</>,

  runStep: "Step 04",
  runTitle: "Running the Experiment",
  runP1: "Two things matter during the run:",
  runItems: [
    { n: "1", t: "Instrumentation", d: <> Every impression, click, add to cart, and purchase gets logged with <C>user_id</C>, arm assignment, and a timestamp. Logging completeness is verified in the validity checks before results are read.</> },
    { n: "2", t: "No peeking at the primary metric p-value", d: "The end date is committed to before launch and doesn't change based on what the data looks like at day 7. This is the most violated rule in online experimentation." },
  ] as { n: string; t: string; d: ReactNode }[],
  callout2: "Every time you check the p-value mid-experiment and could act on what you see, you add a decision point to the test. With α = 0.05, checking daily over a 14 day run can push your true false positive rate well above 5%. The prespecified guarantee no longer holds.",

  validityStep: "Step 05",
  validityTitle: "Validity Checks",
  validityP1: "Five checks need to pass before any result gets read. All five do the same thing: rule out alternative explanations before attributing what you see to the treatment.",
  validityItems: [
    { n: "01", t: "Instrumentation audit", d: <> Checks that events are captured correctly and that neither arm has a systematic logging gap. We verify server-side impression logs against client-side click/purchase logs, confirm p95 logging latency is stable across arms, and check that event loss is symmetric. Loss rate: <B>&lt; 0.3%</B>, distributed evenly across arms. All checks passed.</> },
    { n: "02", t: "AA test (pre-experiment)", d: <> Ran the week before the experiment launched: both arms on the identical algorithm, no treatment. Reviewing the result here confirms the groups were comparable before treatment started. Revenue-per-user p-value: <C>0.61</C>. Randomization is unbiased.</> },
    { n: "03", t: "Ratio check", d: <> Chi-square test on actual arm sizes: 50.1% / 49.9%, p = <C>0.42</C>. No systematic bucketing bias.</> },
    { n: "04", t: "Novelty effect", d: "Week 2 lift was 91% of week 1. A decay toward zero would mean users are reacting to novelty, not quality. 91% is stable." },
    { n: "05", t: "External validity", d: <> The window (Jul 12 – Jul 26) was chosen to avoid major shopping events. No holidays, promotional pushes, or competitor sales overlapped the run. Concurrent experiments touching the same population were checked for interference via the SUTVA log. None found.</> },
  ] as { n: string; t: string; d: ReactNode }[],
  callout3: "The AA test is like zeroing your scale before you weigh anything. If you skip it and the groups turn out unbalanced before treatment, everything you report afterward is confounded and there's no way to know.",

  resultsStep: "Step 06",
  resultsTitle: "The Results",
  resultsP1: "All five validity checks cleared. Then we read the results.",
  resultsMetrics: [
    { val: "$8.50", label: "Control avg. revenue / user / 14 days", accent: false },
    { val: "$8.87", label: "Treatment avg. revenue / user / 14 days", accent: true },
    { val: "+4.4%", label: "Relative lift", accent: true },
    { val: "p = 0.01", label: "p-value (threshold: 0.05)", accent: false },
  ] as { val: string; label: string; accent: boolean }[],
  resultsCILabel: "95% confidence interval, entirely above the 1% MDE",
  revenueChartTitle: "Average Daily Revenue per User ($)",
  revenueYLabel: "Avg Revenue",
  revenueXLabel: "Time in Days",
  revenueTreatment: "Treatment",
  revenueControl: "Control",
  fig2label: "Fig 2.",
  fig2caption: "Treatment (orange) consistently outperforms control (blue) across the 14-day window with no late decay, confirming the effect is genuine, not novelty-driven.",
  resultsP2pre: "Revenue per user moved from ",
  resultsP2b1: "$8.50",
  resultsP2mid: " in control to ",
  resultsP2b2: "$8.87",
  resultsP2mid2: " in treatment over the 14-day window, a relative lift of ",
  resultsP2b3: "+4.4%",
  resultsP2post: ". The p-value came in at 0.01, below the prespecified α = 0.05 threshold. H₀ rejected.",
  resultsP3pre: "The 95% confidence interval is ",
  resultsP3bold: "[+3.4%, +5.4%]",
  resultsP3mid: ". The entire interval sits above the 1% MDE. It's not just statistically significant, it's ",
  resultsP3em: "practically",
  resultsP3post: " significant. Real improvement of a meaningful size.",
  funnelCheckTitle: "Funnel check",
  funnelCheckP: "A CTR lift that collapsed at checkout would mean the algorithm is just surfacing eye-catching but low-intent products. The lift held all the way through:",
  funnelRows: [
    { stage: "Click-through rate (CTR)", lift: "+5.4%" },
    { stage: "Product page views", lift: "+4.8%" },
    { stage: "Add to cart", lift: "+4.1%" },
    { stage: "Checkout started", lift: "+3.5%" },
    { stage: "Orders placed", lift: "+3.1%" },
  ] as { stage: string; lift: string }[],
  funnelColStage: "Funnel stage",
  funnelColLift: "Lift vs control",
  segmentP: <> Segment breakdown: dormant users (no purchase in 90 days) <B>+6.9%</B>, APAC <B>+5.1%</B>, high-frequency buyers (3+ prior purchases) <B>+0.2%</B>. The legacy ranker was already well calibrated for power users. The gains came from everyone else.</>,

  decisionStep: "Step 07",
  decisionTitle: "The Launch Decision",
  decisionP1: "A significant result with CI above the MDE doesn't automatically mean ship it. Three things need to clear first. The forest plot below shows five possible outcomes. Only one is a clean signal.",
  fig3label: "Fig 3.",
  fig3caption: "Five possible experiment outcomes plotted by where the 95% CI falls relative to the ±1% MDE thresholds. Scenario 2 (green), CI entirely above +1%, is a clean launch signal. Our result landed here.",
  decisionP2: "Our result is scenario 2: CI fully above the +1% threshold. The other scenarios would each lead to a different call, more data, a redesign, or a hard no. Three things that closed the decision:",
  decisionItems: [
    { n: "1", t: "Metric tradeoffs", d: "All guardrails green. No regressions in crash rate, latency, ads revenue, or user satisfaction signals." },
    { n: "2", t: "Implementation cost", d: "Additional inference cost breaks even at ~+0.4% GMV lift. The observed lift is +4.4%. The economics are clear." },
    { n: "3", t: "False positive risk", d: "p = 0.01, CI fully above the MDE. The probability this is noise is negligible." },
  ] as { n: string; t: string; d: string }[],
  decisionBoxLabel: "Decision",
  decisionBoxTitle: "Launch to 100% with a 5% holdback for 90 days.",
  decisionBoxDesc: "The holdback runs as a long-horizon counterfactual to catch any delayed regressions or GMV cannibalization that wouldn't show up in a 14 day window.",

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
    "El equipo de Shop en Meta tenía un nuevo algoritmo de ranking listo para lanzar. Antes de desplegarlo a todo el mundo, necesitábamos evidencia real de que funcionaba. Aquí se detalla cada decisión de diseño que formó esa evidencia.",
  openP1:
    "La pestaña Shop usa un algoritmo de ranking para decidir qué productos mostrarte y en qué orden. El equipo de ML construyó una nueva versión y quería lanzarla. Para ello, construí un test A/B para asegurarme de que el nuevo ranking valía la pena desplegar.",
  openP2:
    "La mayor parte del trabajo real en experimentación ocurre antes de tocar el código de análisis. Qué medir, cómo dividir usuarios, cuántos necesitas, qué comprobaciones deben pasar antes de confiar en el resultado. Esto es un recorrido por cada una de esas decisiones.",

  setupStep: "El Contexto",
  setupTitle: "El Recorrido del Usuario y Dónde Encaja el Algoritmo",
  setupP1pre: "El recorrido del usuario en la pestaña Shop tiene seis pasos. El algoritmo de ranking entra en acción en ",
  setupP1bold: "Busca un Artículo",
  setupP1post: ", decidiendo qué productos aparecen cuando un usuario escribe una consulta, y en qué orden. Todo lo que sigue está condicionado por ese ranking.",
  setupP2: "Un mejor ranking debería aumentar el CTR, las vistas de productos, los eventos de añadir al carrito y las compras. Pero también podría inflar las métricas del embudo superior sin hacer nada aguas abajo, que es exactamente por qué la ",
  setupP2em: "elección de la métrica de éxito",
  setupP2post: " es la decisión de diseño más importante de todo el experimento.",

  funnelLayers: [
    { label: "Entra en Instagram Shop", pct: 100, color: "#3b82f6", tag: false },
    { label: "Busca un Artículo", pct: 82, color: "#22c55e", tag: true },
    { label: "Navega la Página de Producto", pct: 65, color: "#ca8a04", tag: false },
    { label: "Añadir al Carrito", pct: 48, color: "#f97316", tag: false },
    { label: "Checkout", pct: 34, color: "#ef4444", tag: false },
    { label: "Venta", pct: 22, color: "#9333ea", tag: false },
  ],
  funnelAlgoTag: "Cambio de Algoritmo de Ranking",
  fig1label: "Fig 1.",
  fig1caption: "El recorrido del usuario en la pestaña Shop. El algoritmo de ranking se activa en «Busca un Artículo» y condiciona todo lo que sigue.",

  metricStep: "Paso 01",
  metricTitle: "Elegir la Métrica Correcta",
  metricP1: "Había dos opciones sobre la mesa:",
  metricOptionTitle: "Opciones sobre la mesa",
  metricOpt1Label: "Tasa de Conversión",
  metricOpt1Desc: "% de usuarios que realizan al menos una compra durante la ventana del experimento. Simple de calcular, fácil de explicar.",
  metricOpt2Label: "Ingresos Medios por Usuario por Día",
  metricOpt2Desc: "Gasto diario medio por usuario expuesto. Captura tanto la frecuencia de compra como el valor de compra en un solo número.",
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
    { label: "Nivel de significancia", val: "α = 0,05", desc: "El umbral por debajo del cual rechazamos H₀. Representa la tasa de falsos positivos que estamos dispuestos a tolerar." },
    { label: "Potencia estadística", val: "0,80", desc: "80% de probabilidad de detectar un efecto real si existe. Estándar del sector para experimentos online." },
    { label: "Efecto mínimo detectable (EMD)", val: "1% de uplift relativo", desc: "La mejora más pequeña que justifica el costo de lanzar. Determina el cálculo del tamaño muestral." },
  ],

  designStep: "Paso 03",
  designTitle: "Diseñar el Experimento",
  randUnitTitle: "Unidad de Aleatorización",
  randOptionTitle: "Unidad de aleatorización",
  randOpt1Label: "Sesión",
  randOpt1Desc: "Cada visita se asigna independientemente a un brazo. Más eventos por día, lógica de cubo más simple.",
  randOpt2Label: "Usuario",
  randOpt2Desc: <><C>user_id</C> se hashea en un cubo una vez. El usuario siempre ve el mismo algoritmo en todas las visitas.</>,
  randChosenLabel: "Usuario",
  randReason: <> A nivel de sesión, el mismo usuario puede ver ambos algoritmos en distintas visitas, lo que rompe el supuesto de independencia en que se basan las estadísticas. Los ingresos por usuario son una métrica a nivel de usuario, por lo que necesita una unidad de aleatorización a nivel de usuario. <C>user_id</C> se hashea en 1.000 cubos, cada uno asignado permanentemente a un brazo.</>,
  randChosenPrefix: "Elegido: ",
  targetTitle: "Población Objetivo",
  targetP: "No todos los usuarios, solo los que activaron al menos una búsqueda en la pestaña Shop durante la ventana. Son los únicos usuarios para quienes el algoritmo de ranking se activa realmente. Incluir personas que nunca vieron ningún ranking solo infla el denominador y añade ruido.",
  sampleTitle: "Tamaño Muestral",
  sampleP: <> Introduciendo la varianza de ingresos base y un EMD del 1% en la fórmula estándar de dos muestras <C>n ≈ 16σ²/Δ²</C> se obtienen aproximadamente <B>2,1M de usuarios por brazo</B> (4,2M en total). Con los volúmenes de tráfico de Instagram Shop, eso es aproximadamente 1 a 2 semanas de la población objetivo.</>,
  canaryTitle: "Lanzamiento Canario",
  canaryP: <> Antes del experimento principal, un <B>canario 1/99</B> despliega el nuevo algoritmo al 1% del tráfico mientras el 99% permanece en control. Los únicos guardianes monitorizados son la tasa de fallos, la latencia p95 y la tasa de ocultar y denunciar. Si alguno falla, el canario se detiene. Si todo está bien, los datos del canario se <span className="text-red-400 font-medium">descartan</span> y el experimento 50/50 corre en ese mismo 99%.</>,

  runStep: "Paso 04",
  runTitle: "Ejecutar el Experimento",
  runP1: "Dos cosas importan durante la ejecución:",
  runItems: [
    { n: "1", t: "Instrumentación", d: <> Cada impresión, clic, añadir al carrito y compra se registra con <C>user_id</C>, asignación de brazo y una marca de tiempo. La completitud del registro se verifica en las comprobaciones de validez antes de leer los resultados.</> },
    { n: "2", t: "No mirar el p-valor de la métrica principal", d: "La fecha de fin se fija antes del lanzamiento y no cambia según cómo se vean los datos en el día 7. Esta es la regla más violada en la experimentación online." },
  ],
  callout2: "Cada vez que compruebas el p-valor a mitad del experimento y podrías actuar según lo que ves, añades un punto de decisión al test. Con α = 0,05, comprobarlo diariamente a lo largo de una ejecución de 14 días puede elevar tu tasa real de falsos positivos muy por encima del 5%. La garantía preespecificada ya no se sostiene.",

  validityStep: "Paso 05",
  validityTitle: "Comprobaciones de Validez",
  validityP1: "Cinco comprobaciones deben pasar antes de leer ningún resultado. Las cinco hacen lo mismo: descartar explicaciones alternativas antes de atribuir lo que ves al tratamiento.",
  validityItems: [
    { n: "01", t: "Auditoría de instrumentación", d: <> Comprueba que los eventos se capturan correctamente y que ningún brazo tiene un gap sistemático de registro. Verificamos los registros de impresiones del lado del servidor contra los registros de clics/compras del lado del cliente, confirmamos que la latencia de registro p95 es estable en todos los brazos y comprobamos que la pérdida de eventos es simétrica. Tasa de pérdida: <B>&lt; 0,3%</B>, distribuida uniformemente en todos los brazos. Todas las comprobaciones superadas.</> },
    { n: "02", t: "Test AA (pre-experimento)", d: <> Se ejecutó la semana antes del lanzamiento del experimento: ambos brazos con el algoritmo idéntico, sin tratamiento. Revisar el resultado aquí confirma que los grupos eran comparables antes de que comenzara el tratamiento. P-valor de ingresos por usuario: <C>0,61</C>. La aleatorización no está sesgada.</> },
    { n: "03", t: "Comprobación de ratio", d: <> Test chi-cuadrado sobre los tamaños reales de los brazos: 50,1% / 49,9%, p = <C>0,42</C>. Sin sesgo sistemático de cubo.</> },
    { n: "04", t: "Efecto novedad", d: "El uplift de la semana 2 fue el 91% del de la semana 1. Una caída hacia cero significaría que los usuarios reaccionan a la novedad, no a la calidad. 91% es estable." },
    { n: "05", t: "Validez externa", d: <> La ventana (12-26 jul) se eligió para evitar grandes eventos de compras. Ninguna festividad, promoción o venta de competidores coincidió con la ejecución. Los experimentos concurrentes que afectaban a la misma población se comprobaron en busca de interferencias a través del registro SUTVA. No se encontró ninguna.</> },
  ],
  callout3: "El test AA es como poner tu báscula a cero antes de pesar algo. Si lo omites y los grupos resultan desequilibrados antes del tratamiento, todo lo que informes después estará confundido y no habrá forma de saberlo.",

  resultsStep: "Paso 06",
  resultsTitle: "Los Resultados",
  resultsP1: "Las cinco comprobaciones de validez superadas. Entonces leímos los resultados.",
  resultsMetrics: [
    { val: "$8,50", label: "Ingresos medios control / usuario / 14 días", accent: false },
    { val: "$8,87", label: "Ingresos medios tratamiento / usuario / 14 días", accent: true },
    { val: "+4,4%", label: "Uplift relativo", accent: true },
    { val: "p = 0,01", label: "p-valor (umbral: 0,05)", accent: false },
  ],
  resultsCILabel: "Intervalo de confianza del 95%, completamente por encima del EMD del 1%",
  revenueChartTitle: "Ingresos Diarios Medios por Usuario ($)",
  revenueYLabel: "Ingresos Medios",
  revenueXLabel: "Tiempo en Días",
  revenueTreatment: "Tratamiento",
  revenueControl: "Control",
  fig2label: "Fig 2.",
  fig2caption: "El tratamiento (naranja) supera consistentemente al control (azul) durante la ventana de 14 días sin caída tardía, confirmando que el efecto es genuino, no impulsado por la novedad.",
  resultsP2pre: "Los ingresos por usuario pasaron de ",
  resultsP2b1: "$8,50",
  resultsP2mid: " en control a ",
  resultsP2b2: "$8,87",
  resultsP2mid2: " en tratamiento durante la ventana de 14 días, un uplift relativo de ",
  resultsP2b3: "+4,4%",
  resultsP2post: ". El p-valor fue 0,01, por debajo del umbral α = 0,05 preespecificado. H₀ rechazada.",
  resultsP3pre: "El intervalo de confianza del 95% es ",
  resultsP3bold: "[+3,4%, +5,4%]",
  resultsP3mid: ". Todo el intervalo está por encima del EMD del 1%. No es solo estadísticamente significativo, es ",
  resultsP3em: "prácticamente",
  resultsP3post: " significativo. Una mejora real de tamaño relevante.",
  funnelCheckTitle: "Comprobación del embudo",
  funnelCheckP: "Un uplift de CTR que se derrumbara en el checkout significaría que el algoritmo solo muestra productos llamativos pero de baja intención. El uplift se mantuvo hasta el final:",
  funnelRows: [
    { stage: "Tasa de clics (CTR)", lift: "+5,4%" },
    { stage: "Vistas de página de producto", lift: "+4,8%" },
    { stage: "Añadir al carrito", lift: "+4,1%" },
    { stage: "Checkout iniciado", lift: "+3,5%" },
    { stage: "Pedidos realizados", lift: "+3,1%" },
  ],
  funnelColStage: "Etapa del embudo",
  funnelColLift: "Uplift vs control",
  segmentP: <> Desglose por segmento: usuarios inactivos (sin compra en 90 días) <B>+6,9%</B>, APAC <B>+5,1%</B>, compradores frecuentes (3+ compras previas) <B>+0,2%</B>. El ranker heredado ya estaba bien calibrado para usuarios avanzados. Las ganancias vinieron del resto.</>,

  decisionStep: "Paso 07",
  decisionTitle: "La Decisión de Lanzamiento",
  decisionP1: "Un resultado significativo con el IC por encima del EMD no significa automáticamente lanzar. Tres cosas deben estar claras primero. El forest plot a continuación muestra cinco posibles resultados. Solo uno es una señal clara.",
  fig3label: "Fig 3.",
  fig3caption: "Cinco posibles resultados del experimento según dónde cae el IC del 95% respecto a los umbrales EMD de ±1%. El escenario 2 (verde), IC completamente por encima del +1%, es una señal clara de lanzamiento. Nuestro resultado cayó aquí.",
  decisionP2: "Nuestro resultado es el escenario 2: IC completamente por encima del umbral +1%. Los otros escenarios llevarían cada uno a una decisión diferente, más datos, un rediseño o un no definitivo. Tres cosas que cerraron la decisión:",
  decisionItems: [
    { n: "1", t: "Compensaciones de métricas", d: "Todos los guardianes en verde. Sin regresiones en tasa de fallos, latencia, ingresos por anuncios o señales de satisfacción del usuario." },
    { n: "2", t: "Costo de implementación", d: "El costo adicional de inferencia alcanza el punto de equilibrio en ~+0,4% de uplift en GMV. El uplift observado es +4,4%. La economía está clara." },
    { n: "3", t: "Riesgo de falso positivo", d: "p = 0,01, IC completamente por encima del EMD. La probabilidad de que esto sea ruido es insignificante." },
  ],
  decisionBoxLabel: "Decisión",
  decisionBoxTitle: "Lanzar al 100% con un holdback del 5% durante 90 días.",
  decisionBoxDesc: "El holdback funciona como un contrafactual de largo plazo para detectar cualquier regresión retardada o canibalización de GMV que no aparecería en una ventana de 14 días.",

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
        <p className="text-center text-xs font-mono text-accent mb-5 tracking-widest uppercase">
          User<span className="block text-ink-subtle text-lg mt-0.5">↓</span>
        </p>
        <div className="relative flex flex-col items-center gap-[3px]">
          {tx.funnelLayers.map(({ label, pct, color, tag }) => (
            <div key={label} className="relative w-full flex justify-center">
              <div className="flex items-center justify-center py-3 text-white text-xs sm:text-sm font-medium text-center px-3" style={{ width: `${pct}%`, backgroundColor: color }}>
                {label}
              </div>
              {tag && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-4 hidden sm:flex items-center gap-1.5 whitespace-nowrap text-xs">
                  <span className="text-accent font-bold">←</span>
                  <span className="text-ink-muted">{tx.funnelAlgoTag}</span>
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
            <line key={v} x1={pl} y1={yv(v)} x2={pl + cW} y2={yv(v)} stroke="rgba(255,255,255,0.05)" strokeDasharray="4,4" />
          ))}
          <line x1={pl} y1={pt} x2={pl} y2={pt + cH} stroke="rgba(255,255,255,0.15)" />
          <line x1={pl} y1={pt + cH} x2={pl + cW} y2={pt + cH} stroke="rgba(255,255,255,0.15)" />
          <text x={pl - 6} y={pt + cH / 2} textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize={10} transform={`rotate(-90,${pl - 6},${pt + cH / 2})`}>{tx.revenueYLabel}</text>
          <text x={pl + cW / 2} y={H - 8} textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize={10}>{tx.revenueXLabel}</text>
          <path d={line(control)} fill="none" stroke="#3b82f6" strokeWidth={2} strokeLinejoin="round" />
          {control.map((v, i) => <circle key={i} cx={xv(i)} cy={yv(v)} r={2.5} fill="#3b82f6" />)}
          <path d={line(treatment)} fill="none" stroke="#f97316" strokeWidth={2} strokeLinejoin="round" />
          {treatment.map((v, i) => <circle key={i} cx={xv(i)} cy={yv(v)} r={2.5} fill="#f97316" />)}
          <circle cx={pl + cW + 14} cy={pt + 22} r={4} fill="#f97316" />
          <text x={pl + cW + 22} y={pt + 26} fill="rgba(255,255,255,0.6)" fontSize={10}>{tx.revenueTreatment}</text>
          <circle cx={pl + cW + 14} cy={pt + 42} r={4} fill="#3b82f6" />
          <text x={pl + cW + 22} y={pt + 46} fill="rgba(255,255,255,0.6)" fontSize={10}>{tx.revenueControl}</text>
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
          <line x1={xs(-1)} y1={pt - 5} x2={xs(-1)} y2={pt + cH + 5} stroke="#ef4444" strokeDasharray="4,3" strokeOpacity={0.6} />
          <line x1={xs(1)} y1={pt - 5} x2={xs(1)} y2={pt + cH + 5} stroke="#a3e635" strokeDasharray="4,3" strokeOpacity={0.7} />
          <line x1={xs(0)} y1={pt - 5} x2={xs(0)} y2={pt + cH + 5} stroke="rgba(255,255,255,0.22)" />
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
                <text x={pl - 24} y={y + 4} textAnchor="middle" fill="white" fontSize={10} fontWeight="bold">{i + 1}</text>
              </g>
            );
          })}
          <line x1={pl} y1={pt + cH} x2={pl + cW} y2={pt + cH} stroke="rgba(255,255,255,0.15)" />
          <text x={xs(-1)} y={H - 15} textAnchor="middle" fill="#ef4444" fontSize={10}>-1.0%</text>
          <text x={xs(0)} y={H - 15} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize={10}>0%</text>
          <text x={xs(1)} y={H - 15} textAnchor="middle" fill="#a3e635" fontSize={10}>+1.0%</text>
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
          <p className="mt-5 text-lg text-ink-muted leading-relaxed">{tx.headerSubtitle}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["A/B Testing", "Experimentation", "Recommender Systems", "Statistical Inference"].map((t) => (
              <span key={t} className="text-[11px] px-2.5 py-1 rounded-md bg-bg-elev border border-border text-ink-muted font-mono">{t}</span>
            ))}
          </div>
        </div>
      </header>

      <div className="container-page mt-16">
        <Prose>
          <P>{tx.openP1}</P>
          <P>{tx.openP2}</P>
        </Prose>

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
            title={tx.metricOptionTitle}
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
          <Callout>{tx.callout1}</Callout>
        </Prose>

        <Prose>
          <SH id="hypothesis" step={tx.hypothesisStep}>{tx.hypothesisTitle}</SH>
          <P>{tx.hypothesisP1}</P>
          <ul className="mt-5 space-y-2.5 text-[1.0625rem] leading-[1.9]">
            <li className="flex gap-3 items-start">
              <span className="text-accent font-mono text-sm shrink-0 w-6 mt-0.5">H₀</span>
              <span className="text-ink-muted">{tx.h0}</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-accent font-mono text-sm shrink-0 w-6 mt-0.5">H₁</span>
              <span className="text-ink-muted">{tx.h1}</span>
            </li>
          </ul>
          <P>{tx.hypothesisP2}</P>
          <div className="mt-5 space-y-3">
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
            title={tx.randOptionTitle}
            options={[
              { label: tx.randOpt1Label, desc: tx.randOpt1Desc },
              { label: tx.randOpt2Label, desc: tx.randOpt2Desc },
            ]}
            chosenLabel={tx.randChosenLabel}
            reason={tx.randReason}
          />
          <SH3>{tx.targetTitle}</SH3>
          <P>{tx.targetP}</P>
          <SH3>{tx.sampleTitle}</SH3>
          <P>{tx.sampleP}</P>
          <SH3>{tx.canaryTitle}</SH3>
          <P>{tx.canaryP}</P>
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
          <Callout>{tx.callout3}</Callout>
        </Prose>

        <Prose>
          <SH id="results" step={tx.resultsStep}>{tx.resultsTitle}</SH>
          <P>{tx.resultsP1}</P>
        </Prose>

        <Prose>
          <div className="my-8 rounded-xl border border-border bg-bg-elev/40 p-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
              {tx.resultsMetrics.map(({ val, label, accent }) => (
                <div key={label}>
                  <div className={`font-mono text-2xl font-bold ${accent ? "text-accent" : "text-ink"}`}>{val}</div>
                  <div className="text-[11px] text-ink-subtle mt-1 leading-snug">{label}</div>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-border/50 flex flex-col items-center text-center gap-1">
              <span className="font-mono text-xl font-bold text-accent">[+3.4%, +5.4%]</span>
              <span className="text-xs text-ink-subtle">{tx.resultsCILabel}</span>
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
          <div className="my-6 rounded-xl border border-border overflow-hidden text-sm">
            <div className="grid grid-cols-[1fr_auto] bg-bg-elev/60 px-5 py-2.5 text-[10px] font-mono uppercase tracking-widest text-ink-subtle">
              <span>{tx.funnelColStage}</span>
              <span>{tx.funnelColLift}</span>
            </div>
            {tx.funnelRows.map(({ stage, lift }) => (
              <div key={stage} className="grid grid-cols-[1fr_auto] px-5 py-3 border-t border-border/40 hover:bg-bg-elev/30 transition-colors">
                <span className="text-ink-muted">{stage}</span>
                <span className="font-mono font-semibold text-accent">{lift}</span>
              </div>
            ))}
          </div>
        </Prose>

        <Prose>
          <P>{tx.segmentP}</P>
        </Prose>

        <Prose>
          <SH id="decision" step={tx.decisionStep}>{tx.decisionTitle}</SH>
          <P>{tx.decisionP1}</P>
        </Prose>

        <Wide><CIForestPlot tx={tx} /></Wide>

        <Prose>
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

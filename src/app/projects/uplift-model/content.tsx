"use client";

import { useLang } from "@/lib/lang";
import {
  Prose, Wide, B, Em, SH, P, Callout, OptionBox,
  MetricStrip, NextProject, ArticleHeader, BackLink,
} from "../_article";

// ── translations ─────────────────────────────────────────────────────────────

const en = {
  subtitle:
    "Most response models predict who will convert. This one predicts who will convert because of the offer, a subtle but financially critical distinction.",

  openP1pre: "The problem with propensity models is that they answer the wrong question. \"Who is most likely to get a credit card?\" sounds like the right question, but it isn't. The right question is: \"Who is most likely to get a credit card",
  openP1em: " because we offered it to them",
  openP1post: "?\"",
  openP2:
    "The difference matters because high-propensity customers often convert regardless of whether they receive an offer. Targeting them wastes budget. Worse, some customers respond negatively to unsolicited outreach, and their conversion probability actually decreases when contacted. Standard propensity scoring has no way to identify these sleeping dogs, let alone suppress them.",
  openP3:
    "Uplift modeling (also called causal response modeling or CATE estimation) directly targets incremental response. The goal is to estimate the treatment effect for each customer, not just their raw probability of converting.",

  s1step: "Step 01",
  s1title: "The Four Customer Types",
  s1p1:
    "Before building any model, it's useful to understand the four types of customers any campaign will reach. The framework comes from the uplift modeling literature and is directly actionable.",
  quadrants: [
    { name: "Persuadables", desc: "Low baseline, high treatment response. The gold standard: offer works here.", label: "HIGH UPLIFT", labelColor: "#a3e635", col: "border-accent/50 bg-accent/5" },
    { name: "Sure Things", desc: "Would convert regardless. Wasted spend: they buy without the offer.", label: "WASTED SPEND", labelColor: "rgba(255,255,255,0.3)", col: "border-border/50 bg-bg-elev/20" },
    { name: "Lost Causes", desc: "Won't convert regardless of offer. No impact in either direction.", label: "NO IMPACT", labelColor: "rgba(255,255,255,0.3)", col: "border-border/50 bg-bg-elev/20" },
    { name: "Sleeping Dogs", desc: "Negative uplift: the offer actually reduces their likelihood to convert.", label: "SUPPRESS", labelColor: "#f87171", col: "border-red-500/30 bg-red-500/5" },
  ] as { name: string; desc: string; label: string; labelColor: string; col: string }[],
  fig1label: "Fig 1.",
  fig1caption:
    "The four customer archetypes in uplift modeling. Standard propensity models only distinguish \"converts\" vs \"doesn't convert\", missing the sleeping dogs entirely.",
  s1p2:
    "A propensity model tries to maximize the number of customers in the top-right (sure things), people who look likely to convert. An uplift model tries to maximize targeting of the top-left (persuadables) and suppress the bottom-right (sleeping dogs). These are very different audiences.",

  s2step: "Step 02",
  s2title: "Estimating CATE: T-Learner vs X-Learner",
  s2p1:
    "Estimating the Conditional Average Treatment Effect (CATE) requires a holdout-controlled experiment as training data: a campaign where some customers received the offer (treatment) and others didn't (control), randomly assigned.",
  optTitle: "Two candidate CATE estimators",
  opt1label: "T-Learner (Two-Model)",
  opt1desc:
    "Train separate XGBoost models on treatment and control groups. CATE = treatment model prediction − control model prediction. Simple, interpretable, slightly biased in small samples.",
  opt2label: "X-Learner",
  opt2desc:
    "Iterative estimator that cross-imputes treatment effects and weights by propensity score. Better in imbalanced datasets (treatment ≠ control sizes). Higher variance.",
  optChosen: "T-Learner (Two-Model)",
  optReason:
    "Both were validated on held-out controls via AUUC. The T-learner outperformed slightly and was significantly easier to debug. When CATE estimates looked suspect for a segment, it was straightforward to inspect which of the two models was driving the issue. For a model going into production, debuggability matters.",
  s2p2:
    "Features for both models: product holdings, account tenure, transaction patterns, prior campaign response history, and ZIP-level demographics. The two models share the same feature set, with only their training samples differing (treatment vs control customers from the prior campaign).",
  callout:
    "Holdout control groups are the foundation of uplift modeling. Without a clean random assignment, there is no way to estimate causal effects, only correlations. The quality of the training data depends entirely on the quality of the experiment it was drawn from.",

  s3step: "Step 03",
  s3title: "Validation with AUUC",
  s3p1pre: "Standard AUC/accuracy metrics don't work for uplift models, as there is no single ground truth label for \"would respond to this specific treatment.\" Instead, we validate with the",
  s3p1bold: "Area Under the Uplift Curve (AUUC)",
  s3p1post:
    ": sort customers by predicted CATE from high to low, then measure cumulative incremental conversions as we target progressively more of the audience.",
  auucOfferLabel: "OFFER PROMOS",
  auucOfferSub: "highest uplift",
  auucStopLabel: "STOP TARGETING",
  auucStopSub: "sleeping dogs",
  auucModelLabel: "T-Learner",
  auucRandomLabel: "Random",
  auucXAxis: "Population Targeted (%)",
  auucYAxis: "Cumulative Uplift",
  fig2label: "Fig 2.",
  fig2caption:
    "Illustrative AUUC curve showing three targeting zones. Offer promos to the top-decile persuadables (green), avoid the long tail of diminishing returns, and suppress sleeping dogs where cumulative uplift declines below the random baseline (red).",
  s3p2pre: "The area between the model curve and the random baseline (AUUC) is the summary metric. Our T-learner achieved an AUUC of",
  s3p2bold1: "0.38",
  s3p2mid: "on the held-out validation set vs.",
  s3p2bold2: "0.21",
  s3p2post:
    " for propensity-based targeting. The key difference appears in the right tail: propensity targeting dips negative as it reaches sleeping dogs, while the uplift model's curve flattens instead.",

  s4step: "Step 04",
  s4title: "Results: +15% Acquisitions, Flat Budget",
  s4p1:
    "The model was rolled out via the marketing platform's audience segmentation API. The campaign was run against the same universe of prospects as before, with three changes: top-decile persuadables received the offer, identified sleeping dogs were explicitly suppressed, and the released budget was reallocated within the persuadable tier.",
  decilePersuadables: "↑ persuadables",
  decileSleepingDogs: "sleeping dogs ↓",
  decileXAxis: "Score Decile (1 = highest uplift)",
  fig3label: "Fig 3.",
  fig3caption:
    "Estimated CATE (treatment effect) by decile. Deciles 8 through 10 are sleeping dogs, and the offer suppresses their conversion likelihood. Explicitly suppressing this ~7% of the audience was one of the key results.",
  metrics: [
    { label: "incremental acquisitions vs propensity baseline", value: "+15%", sub: "same marketing budget" },
    { label: "of audience identified as sleeping dogs", value: "~7%", sub: "explicitly suppressed" },
    { label: "AUUC (uplift vs random)", value: "0.38", sub: "vs 0.21 propensity" },
    { label: "campaigns now using this pattern", value: "default", sub: "cards + personal loans" },
  ] as { label: string; value: string; sub: string }[],

  s5step: "What This Gets Right",
  s5title: "The Framing Matters as Much as the Model",
  s5p1bold: "1. Holdout control groups are non-negotiable.",
  s5p1:
    " Without disciplined random assignment in the training data, CATE estimation collapses into correlation, which is no better than propensity. The quality of an uplift model is bounded by the quality of its training experiment.",
  s5p2bold: "2. The quadrant framing is the real unlock for stakeholder buy-in.",
  s5p2:
    " Presenting results as \"persuadables, sure-things, sleeping dogs\" resonated far more than presenting CATE numbers. People intuitively understand why you wouldn't want to contact a sleeping dog. CATE values require explanation.",
  s5p3bold: "3. The sleeping dog suppression was worth as much as the persuadable targeting.",
  s5p3:
    " Removing 7% of the audience who were actively harmed by the offer freed up budget and reduced churn from negative experiences, an ROI lever that pure propensity modeling couldn't have identified.",
};

const es: typeof en = {
  subtitle:
    "La mayoría de los modelos de respuesta predicen quién convertirá. Este predice quién convertirá por culpa de la oferta, una distinción sutil pero financieramente crítica.",

  openP1pre: "El problema con los modelos de propensión es que responden la pregunta equivocada. «¿Quién tiene más probabilidad de solicitar una tarjeta de crédito?» suena como la pregunta correcta, pero no lo es. La pregunta correcta es: «¿Quién tiene más probabilidad de solicitar una tarjeta de crédito",
  openP1em: " porque se la hemos ofrecido",
  openP1post: "?»",
  openP2:
    "La diferencia importa porque los clientes de alta propensión a menudo convierten independientemente de si reciben una oferta. Dirigirse a ellos es un gasto inútil. Peor aún, algunos clientes responden negativamente al contacto no solicitado, y su probabilidad de conversión disminuye al ser contactados. Los modelos de propensión estándar no tienen manera de identificar a estos «perros dormidos», y mucho menos de suprimirlos.",
  openP3:
    "El modelado de uplift (también llamado modelado de respuesta causal o estimación de CATE) se centra directamente en la respuesta incremental. El objetivo es estimar el efecto del tratamiento para cada cliente, no solo su probabilidad bruta de conversión.",

  s1step: "Paso 01",
  s1title: "Los Cuatro Tipos de Cliente",
  s1p1:
    "Antes de construir cualquier modelo, es útil entender los cuatro tipos de clientes que alcanzará cualquier campaña. El marco proviene de la literatura de modelado de uplift y es directamente accionable.",
  quadrants: [
    { name: "Persuadables", desc: "Baja base, alta respuesta al tratamiento. El estándar de oro: la oferta funciona aquí.", label: "ALTO UPLIFT", labelColor: "#a3e635", col: "border-accent/50 bg-accent/5" },
    { name: "Seguros", desc: "Convertirían de todos modos. Gasto inútil: compran sin la oferta.", label: "GASTO INÚTIL", labelColor: "rgba(255,255,255,0.3)", col: "border-border/50 bg-bg-elev/20" },
    { name: "Causas Perdidas", desc: "No convertirán independientemente de la oferta. Sin impacto en ninguna dirección.", label: "SIN IMPACTO", labelColor: "rgba(255,255,255,0.3)", col: "border-border/50 bg-bg-elev/20" },
    { name: "Perros Dormidos", desc: "Uplift negativo: la oferta reduce su probabilidad de convertir.", label: "SUPRIMIR", labelColor: "#f87171", col: "border-red-500/30 bg-red-500/5" },
  ],
  fig1label: "Fig 1.",
  fig1caption:
    "Los cuatro arquetipos de cliente en el modelado de uplift. Los modelos de propensión estándar solo distinguen entre «convierte» y «no convierte», pasando por alto completamente a los perros dormidos.",
  s1p2:
    "Un modelo de propensión intenta maximizar el número de clientes en la parte superior derecha (los seguros), personas que parecen propensas a convertir. Un modelo de uplift intenta maximizar el targeting de la parte superior izquierda (los persuadables) y suprimir la parte inferior derecha (los perros dormidos). Son audiencias muy diferentes.",

  s2step: "Paso 02",
  s2title: "Estimando CATE: T-Learner vs X-Learner",
  s2p1:
    "Estimar el Efecto Medio Condicional del Tratamiento (CATE) requiere un experimento controlado con holdout como datos de entrenamiento: una campaña en la que algunos clientes recibieron la oferta (tratamiento) y otros no (control), asignados aleatoriamente.",
  optTitle: "Dos estimadores CATE candidatos",
  opt1label: "T-Learner (Dos Modelos)",
  opt1desc:
    "Entrena modelos XGBoost separados en grupos de tratamiento y control. CATE = predicción del modelo de tratamiento − predicción del modelo de control. Simple, interpretable, ligeramente sesgado en muestras pequeñas.",
  opt2label: "X-Learner",
  opt2desc:
    "Estimador iterativo que imputa efectos de tratamiento cruzados y pondera por puntuación de propensión. Mejor en conjuntos de datos desbalanceados (tamaños de tratamiento ≠ control). Mayor varianza.",
  optChosen: "T-Learner (Dos Modelos)",
  optReason:
    "Ambos fueron validados en controles de holdout mediante AUUC. El T-learner superó ligeramente y fue significativamente más fácil de depurar. Cuando las estimaciones de CATE parecían sospechosas para un segmento, era sencillo inspeccionar cuál de los dos modelos estaba causando el problema. Para un modelo que va a producción, la depurabilidad importa.",
  s2p2:
    "Variables para ambos modelos: productos contratados, antigüedad de cuenta, patrones transaccionales, historial de respuesta a campañas previas y demografía por ZIP. Los dos modelos comparten el mismo conjunto de variables, con solo sus muestras de entrenamiento diferentes (clientes de tratamiento vs. control de la campaña anterior).",
  callout:
    "Los grupos de control de holdout son la base del modelado de uplift. Sin una asignación aleatoria limpia, no hay manera de estimar efectos causales, solo correlaciones. La calidad de los datos de entrenamiento depende enteramente de la calidad del experimento del que provienen.",

  s3step: "Paso 03",
  s3title: "Validación con AUUC",
  s3p1pre: "Las métricas estándar de AUC/precisión no funcionan para los modelos de uplift, ya que no existe una etiqueta de verdad única para «respondería a este tratamiento específico». En su lugar, validamos con el",
  s3p1bold: "Área Bajo la Curva de Uplift (AUUC)",
  s3p1post:
    ": ordenamos los clientes por CATE predicho de mayor a menor, luego medimos las conversiones incrementales acumuladas a medida que vamos alcanzando a más de la audiencia.",
  auucOfferLabel: "OFRECER PROMOS",
  auucOfferSub: "mayor uplift",
  auucStopLabel: "DEJAR DE TARGETEAR",
  auucStopSub: "perros dormidos",
  auucModelLabel: "T-Learner",
  auucRandomLabel: "Aleatorio",
  auucXAxis: "Población Contactada (%)",
  auucYAxis: "Uplift Acumulado",
  fig2label: "Fig 2.",
  fig2caption:
    "Curva AUUC ilustrativa que muestra tres zonas de targeting. Ofrece promociones a los persuadables del primer decil (verde), evita la larga cola de rendimientos decrecientes y suprime los perros dormidos donde el uplift acumulado cae por debajo de la línea de base aleatoria (rojo).",
  s3p2pre: "El área entre la curva del modelo y la línea de base aleatoria (AUUC) es la métrica resumen. Nuestro T-learner alcanzó un AUUC de",
  s3p2bold1: "0.38",
  s3p2mid: "en el conjunto de validación de holdout frente a",
  s3p2bold2: "0.21",
  s3p2post:
    " para el targeting basado en propensión. La diferencia clave aparece en la cola derecha: el targeting de propensión cae por debajo de cero al llegar a los perros dormidos, mientras que la curva del modelo de uplift se aplana.",

  s4step: "Paso 04",
  s4title: "Resultados: +15% Adquisiciones, Presupuesto Igual",
  s4p1:
    "El modelo se desplegó a través de la API de segmentación de audiencia de la plataforma de marketing. La campaña se ejecutó contra el mismo universo de prospectos que antes, con tres cambios: los persuadables del primer decil recibieron la oferta, los perros dormidos identificados fueron suprimidos explícitamente, y el presupuesto liberado se reasignó dentro del nivel de persuadables.",
  decilePersuadables: "↑ persuadables",
  decileSleepingDogs: "perros dormidos ↓",
  decileXAxis: "Decil de Puntuación (1 = mayor uplift)",
  fig3label: "Fig 3.",
  fig3caption:
    "CATE estimado (efecto del tratamiento) por decil. Los deciles 8 a 10 son perros dormidos, y la oferta suprime su probabilidad de conversión. Suprimir explícitamente a este ~7% de la audiencia fue uno de los resultados clave.",
  metrics: [
    { label: "adquisiciones incrementales vs. propensión", value: "+15%", sub: "mismo presupuesto de marketing" },
    { label: "audiencia identificada como perros dormidos", value: "~7%", sub: "suprimidos explícitamente" },
    { label: "AUUC (uplift vs. aleatorio)", value: "0.38", sub: "vs. 0.21 propensión" },
    { label: "campañas usando este patrón", value: "default", sub: "tarjetas + préstamos personales" },
  ],

  s5step: "Lo Que Funciona",
  s5title: "El Marco es tan Importante como el Modelo",
  s5p1bold: "1. Los grupos de control de holdout son innegociables.",
  s5p1:
    " Sin una asignación aleatoria disciplinada en los datos de entrenamiento, la estimación de CATE colapsa en correlación, que no es mejor que la propensión. La calidad de un modelo de uplift está acotada por la calidad de su experimento de entrenamiento.",
  s5p2bold: "2. El marco de cuadrantes es la clave para el buy-in de los stakeholders.",
  s5p2:
    " Presentar los resultados como «persuadables, seguros, perros dormidos» resonó mucho más que presentar números de CATE. La gente entiende intuitivamente por qué no querrías contactar a un perro dormido. Los valores de CATE requieren explicación.",
  s5p3bold: "3. La supresión de los perros dormidos valió tanto como el targeting de los persuadables.",
  s5p3:
    " Eliminar al 7% de la audiencia que resultaba perjudicada por la oferta liberó presupuesto y redujo el churn por experiencias negativas — una palanca de ROI que el modelado de propensión puro no habría podido identificar.",
};

// ── Diagram components ────────────────────────────────────────────────────────

function FourQuadrant({ tx }: { tx: typeof en }) {
  return (
    <figure className="select-none">
      <div className="rounded-xl bg-bg-elev/50 border border-border p-6">
        <div className="grid grid-cols-2 gap-3">
          {tx.quadrants.map((q) => (
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
        <span className="text-ink-muted font-medium">{tx.fig1label}</span>{" "}
        {tx.fig1caption}
      </figcaption>
    </figure>
  );
}

function AUUCCurve({ tx }: { tx: typeof en }) {
  const W = 580, H = 280;
  const pl = 52, pr = 20, pt = 38, pb = 52;
  const cW = W - pl - pr, cH = H - pt - pb;
  const xs = (p: number) => pl + (p / 100) * cW;
  const ys = (v: number) => pt + cH * (1 - v);

  const posFill = [
    [0, 0.00], [10, 0.34], [20, 0.61], [30, 0.80], [40, 0.91],
    [50, 0.96], [60, 0.98], [70, 0.97], [80, 0.89], [83.75, 0.838],
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

  const x1 = 50, x2 = 83.75;

  return (
    <figure className="select-none">
      <div className="rounded-xl bg-bg-elev/50 border border-border p-5 pb-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden="true">
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
          <line x1={pl} y1={pt} x2={pl} y2={pt + cH} stroke="rgba(255,255,255,0.1)" />
          <line x1={pl} y1={pt + cH} x2={pl + cW} y2={pt + cH} stroke="rgba(255,255,255,0.1)" />
          <path d={posFill} fill="#a3e635" fillOpacity={0.09} />
          <path d={negFill} fill="#f87171" fillOpacity={0.13} />
          <line x1={xs(x1)} y1={pt + 6} x2={xs(x1)} y2={pt + cH} stroke="rgba(255,255,255,0.12)" strokeDasharray="3,3" />
          <line x1={xs(x2)} y1={pt + 6} x2={xs(x2)} y2={pt + cH} stroke="rgba(248,113,113,0.25)" strokeDasharray="3,3" />
          <path d={randPath} fill="none" stroke="rgba(180,180,180,0.35)" strokeDasharray="5,4" strokeWidth={1.5} />
          <path d={tlrPath} fill="none" stroke="#a3e635" strokeWidth={2.5} strokeLinejoin="round" />
          <text x={xs(25)} y={pt + 14} textAnchor="middle" fill="#a3e635" fontSize={8.5} fontWeight="600">{tx.auucOfferLabel}</text>
          <text x={xs(25)} y={pt + 25} textAnchor="middle" fill="rgba(163,230,53,0.55)" fontSize={7.5}>{tx.auucOfferSub}</text>
          <text x={xs(91.5)} y={pt + 14} textAnchor="middle" fill="#f87171" fontSize={8.5} fontWeight="600">{tx.auucStopLabel}</text>
          <text x={xs(91.5)} y={pt + 25} textAnchor="middle" fill="rgba(248,113,113,0.55)" fontSize={7.5}>{tx.auucStopSub}</text>
          <line x1={pl + cW - 84} y1={pt + cH - 26} x2={pl + cW - 72} y2={pt + cH - 26} stroke="#a3e635" strokeWidth={2.5} />
          <text x={pl + cW - 66} y={pt + cH - 22} fill="rgba(255,255,255,0.65)" fontSize={9}>{tx.auucModelLabel}</text>
          <line x1={pl + cW - 84} y1={pt + cH - 12} x2={pl + cW - 72} y2={pt + cH - 12} stroke="rgba(180,180,180,0.35)" strokeDasharray="5,4" strokeWidth={1.5} />
          <text x={pl + cW - 66} y={pt + cH - 8} fill="rgba(255,255,255,0.35)" fontSize={9}>{tx.auucRandomLabel}</text>
          <text x={pl + cW / 2} y={H - 4} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize={9}>{tx.auucXAxis}</text>
          <text x={14} y={pt + cH / 2} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize={9} transform={`rotate(-90 14 ${pt + cH / 2})`}>{tx.auucYAxis}</text>
        </svg>
      </div>
      <figcaption className="mt-3 text-xs text-ink-subtle text-center">
        <span className="text-ink-muted font-medium">{tx.fig2label}</span>{" "}
        {tx.fig2caption}
      </figcaption>
    </figure>
  );
}

function UpliftByDecile({ tx }: { tx: typeof en }) {
  const W = 560, H = 200;
  const pl = 46, pr = 16, pt = 20, pb = 36;
  const cW = W - pl - pr, cH = H - pt - pb;
  const vals = [4.8, 3.9, 3.1, 2.4, 1.7, 1.0, 0.4, -0.3, -1.1, -2.2];
  const maxAbs = 5;
  const slotW = cW / vals.length;
  const bW = slotW - 5;
  const zeroY = pt + cH * (maxAbs / (maxAbs * 2));

  return (
    <figure className="select-none">
      <div className="rounded-xl bg-bg-elev/50 border border-border p-5 pb-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden="true">
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
                <text x={x + bW / 2} y={pt + cH + 14} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize={9}>
                  {i + 1}
                </text>
              </g>
            );
          })}
          <line x1={pl} y1={pt} x2={pl} y2={pt + cH} stroke="rgba(255,255,255,0.1)" />
          <text x={pl + 4} y={zeroY + 14} fill="#a3e635" fontSize={9}>{tx.decilePersuadables}</text>
          <text x={pl + cW - 4} y={zeroY - 10} textAnchor="end" fill="#f87171" fontSize={9}>{tx.decileSleepingDogs}</text>
          <text x={pl + cW / 2} y={H - 4} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize={9}>{tx.decileXAxis}</text>
        </svg>
      </div>
      <figcaption className="mt-3 text-xs text-ink-subtle text-center">
        <span className="text-ink-muted font-medium">{tx.fig3label}</span>{" "}
        {tx.fig3caption}
      </figcaption>
    </figure>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function UpliftContent() {
  const { lang } = useLang();
  const tx = lang === "es" ? es : en;

  return (
    <article className="pt-32 pb-24">
      <BackLink />
      <ArticleHeader
        eyebrow="Work · Santander Bank · 2024"
        title="Causal Uplift Model for Credit Card Campaigns"
        subtitle={tx.subtitle}
        tags={["Causal Inference", "Uplift", "T-Learner", "X-Learner", "Marketing", "A/B Testing"]}
      />

      <div className="container-page mt-16">
        <Prose>
          <P>
            {tx.openP1pre}<Em>{tx.openP1em}</Em>{tx.openP1post}
          </P>
          <P>{tx.openP2}</P>
          <P>{tx.openP3}</P>
        </Prose>

        <Prose>
          <SH id="quadrants" step={tx.s1step}>
            {tx.s1title}
          </SH>
          <P>{tx.s1p1}</P>
        </Prose>

        <Wide>
          <FourQuadrant tx={tx} />
        </Wide>

        <Prose>
          <P>{tx.s1p2}</P>
        </Prose>

        <Prose>
          <SH id="cate" step={tx.s2step}>
            {tx.s2title}
          </SH>
          <P>{tx.s2p1}</P>
          <OptionBox
            title={tx.optTitle}
            options={[
              { label: tx.opt1label, desc: tx.opt1desc },
              { label: tx.opt2label, desc: tx.opt2desc },
            ]}
            chosenLabel={tx.optChosen}
            reason={tx.optReason}
          />
          <P>{tx.s2p2}</P>
          <Callout>{tx.callout}</Callout>
        </Prose>

        <Prose>
          <SH id="validation" step={tx.s3step}>
            {tx.s3title}
          </SH>
          <P>
            {tx.s3p1pre} <B>{tx.s3p1bold}</B>{tx.s3p1post}
          </P>
        </Prose>

        <Wide>
          <AUUCCurve tx={tx} />
        </Wide>

        <Prose>
          <P>
            {tx.s3p2pre} <B>{tx.s3p2bold1}</B> {tx.s3p2mid} <B>{tx.s3p2bold2}</B>{tx.s3p2post}
          </P>
        </Prose>

        <Prose>
          <SH id="results" step={tx.s4step}>
            {tx.s4title}
          </SH>
          <P>{tx.s4p1}</P>
        </Prose>

        <Wide>
          <UpliftByDecile tx={tx} />
        </Wide>

        <MetricStrip metrics={tx.metrics} />

        <Prose>
          <SH id="takeaways" step={tx.s5step}>
            {tx.s5title}
          </SH>
          <P><B>{tx.s5p1bold}</B>{tx.s5p1}</P>
          <P><B>{tx.s5p2bold}</B>{tx.s5p2}</P>
          <P><B>{tx.s5p3bold}</B>{tx.s5p3}</P>
        </Prose>

        <NextProject slug="ab-test-instagram-shop" />
      </div>
    </article>
  );
}

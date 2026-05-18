"use client";

import { useLang } from "@/lib/lang";
import {
  Prose, Wide, B, SH, P, Callout,
  MetricStrip, NextProject, ArticleHeader, BackLink,
} from "../_article";

const en = {
  subtitle:
    "1,000+ binary behavioral flags, a transparent linear score, and a self-updating 90-day window — no black-box model, zero retraining cost, +29% campaign lift.",

  openP1:
    "The bank had a model drift problem. Every black-box scoring model deployed for marketing — propensity models, response models, affinity models — decayed within months. Customer behavior shifted, new products launched, the world changed. The models didn't. The solution was always the same: a quarterly retraining cycle that consumed weeks of data science time and still lagged the market by 3–6 months.",
  openP2:
    "There was a second problem: the scores were opaque. When a compliance reviewer asked \"why is this customer in the top decile?\" the answer was a SHAP waterfall chart that no one outside data science could interpret. When marketers asked why a segment suddenly shifted, no one could answer.",
  openP3:
    "This project replaced the black-box stack with a transparent system designed to self-update continuously and explain itself in plain language.",

  stages: [
    { icon: "⌛", label: "90-Day Behavioral Window", sub: "transaction logs · product events · digital actions", color: "#3b82f6" },
    { icon: "🏷", label: "Flag Evaluation", sub: "~1,000 binary rules, e.g. '3+ Zelle transfers in 30d'", color: "#8b5cf6" },
    { icon: "⚖️", label: "Weighted Linear Score", sub: "flag weight = historical lift over baseline open-rate", color: "#f97316" },
    { icon: "📊", label: "Decile Assignment", sub: "rank order → 10 tiers per product", color: "#a3e635" },
    { icon: "📣", label: "Marketing Trigger", sub: "audience segmentation API · nightly refresh", color: "#22d3ee" },
  ] as { icon: string; label: string; sub: string; color: string }[],
  systemBottom: "↻ Auto-updates nightly · flag weights recomputed from rolling 90-day window · zero retraining cost",
  fig1label: "Fig 1.",
  fig1caption: "End-to-end scoring pipeline. The key architectural property: flag weights are recomputed nightly from fresh data, so the model never drifts and never needs a retraining ceremony.",

  flagCardHeader: "Sample customer · Product: savings account",
  flags: [
    { flag: "Made 3+ Zelle transfers in last 30d", weight: "+18%", active: true },
    { flag: "Opened savings account in last 90d", weight: "+14%", active: true },
    { flag: "Mobile check deposit in last 60d", weight: "+11%", active: true },
    { flag: "No debit card usage in last 30d", weight: "−7%", active: false },
    { flag: "Last login > 45 days ago", weight: "−12%", active: false },
  ] as { flag: string; weight: string; active: boolean }[],
  flagCardScore: "Score = sum of active flag weights relative to category baseline open-rate",
  fig2label: "Fig 2.",
  fig2caption: "Attribution for a sample high-decile customer. Each activated flag and its lift contribution is visible — marketers can explain to compliance exactly why this customer received the offer.",

  chartXLabel: "Score Decile (1 = highest affinity)",
  chartYLabel: "Lift over Baseline Open-Rate",
  chartBaseline: "baseline",
  fig3label: "Fig 3.",
  fig3caption: "Product opening lift by score decile vs. baseline open-rate. Targeting deciles 1–3 alone captures 3–4× the baseline response rate, explaining the +29% lift in campaign performance.",

  s1step: "Step 01",
  s1title: "1,000+ Binary Behavioral Flags",
  s1p1pre: "The core idea is simple: instead of learning latent representations, enumerate observable behaviors. A customer either \"made 3+ Zelle transfers in the last 30 days\" or they didn't. They either \"opened a savings account in the last 90 days\" or they didn't. Each flag is a binary rule, computable directly from transaction logs and product event tables.",
  s1p2pre: "The flag library contains ",
  s1p2bold: "~1,000 rules",
  s1p2post: " across five categories: transaction patterns, product events, digital engagement, account lifecycle milestones, and peer benchmarking cohort flags. Most flags are simple threshold rules over rolling windows — 30, 60, or 90 days.",
  callout1: "The 90-day window wasn't arbitrary. Shorter windows (30 days) were too noisy — individual months have high variance in transaction volume. Longer windows (180 days) were too stale for fast-moving signals like digital engagement. 90 days was the empirical sweet spot validated on held-out A/B data.",

  s2step: "Step 02",
  s2title: "From Flags to Scores: A Transparent Linear Model",
  s2p1pre: "For each product, flags are ranked by ",
  s2p1bold: "historical lift over the product's baseline open-rate",
  s2p1post: ". A flag that predicts 3× the baseline opening rate gets a high weight. A flag associated with lower-than-average opening rates gets a negative weight. The final score is a weighted sum of activated flags.",
  s2p2: "This is interpretable by construction. Every score has an exact flag-level attribution that can be printed in a compliance report, shown to a marketer, or debugged by a data scientist in seconds.",
  s2p3: "The self-updating mechanism is what makes this different from a static model. Flag weights are recomputed nightly from the rolling 90-day window. If customer behavior shifts — say, a new digital feature drives a surge in app logins — the weight on login-related flags updates within 24 hours. No retraining job, no model deployment, no ceremony.",

  s3step: "Step 03",
  s3title: "Validation: A/B Test Against Black-Box Baseline",
  s3p1: "The system was validated against the prior black-box scoring model in a randomized A/B test across three product campaigns (deposits, credit cards, auto loans). Random assignment ensured that the only difference was the targeting model — same offer, same channel, same audience size.",
  s3p2pre: "The white-box system outperformed the black-box model on all three campaigns, with an average ",
  s3p2bold: "+29% lift in product opening rates",
  s3p2post: ". The lift came primarily from the top three deciles — the black-box model had over-represented \"sure thing\" customers in its high-score tier, while the white-box flags more precisely identified genuinely persuadable customers.",

  metrics: [
    { label: "lift in product opening rates per campaign", value: "+29%", sub: "vs. black-box baseline" },
    { label: "behavioral segment flags", value: "1,000+", sub: "binary rules · 5 categories" },
    { label: "model retraining cost", value: "$0", sub: "nightly self-update" },
    { label: "flag attribution fields per customer", value: "4–5", sub: "compliance-ready" },
  ] as { label: string; value: string; sub: string }[],

  s4step: "What This Gets Right",
  s4title: "Sometimes the Answer Isn't Deep Learning",
  s4p1bold: "1. Interpretability is a product feature, not a nice-to-have.",
  s4p1: " The marketing team's adoption of the system skyrocketed once they understood why each customer was in the top decile. Knowing that a customer \"made 3+ Zelle transfers and opened a savings account in the last 90 days\" is actionable context for creative and offer design. A SHAP value isn't.",
  s4p2bold: "2. Self-updating removes the biggest operational bottleneck.",
  s4p2: " The quarterly retraining cycle wasn't just expensive — it introduced model staleness as a systematic risk. Nightly flag-weight updates mean the system always reflects the last 90 days of actual customer behavior, not a snapshot from months ago.",
  s4p3bold: "3. The right level of complexity is the minimum that works.",
  s4p3: " A linear model over binary flags sounds naive compared to a gradient-boosted ensemble. It also outperformed one in production. The lesson: match model complexity to the interpretability and maintenance requirements of the deployment context.",
};

const es: typeof en = {
  subtitle:
    "Más de 1.000 flags binarios de comportamiento, una puntuación lineal transparente y una ventana de 90 días que se actualiza sola — sin modelo de caja negra, coste de reentrenamiento cero, +29% de uplift en campañas.",

  openP1:
    "El banco tenía un problema de drift de modelos. Cada modelo de puntuación de caja negra desplegado para marketing — modelos de propensión, modelos de respuesta, modelos de afinidad — se deterioraba en cuestión de meses. El comportamiento de los clientes cambiaba, se lanzaban nuevos productos, el mundo cambiaba. Los modelos no. La solución era siempre la misma: un ciclo trimestral de reentrenamiento que consumía semanas de tiempo de ciencia de datos y aún así llegaba tarde al mercado 3–6 meses.",
  openP2:
    "Había un segundo problema: las puntuaciones eran opacas. Cuando un revisor de cumplimiento preguntaba «¿por qué está este cliente en el decil superior?» la respuesta era un gráfico de cascada SHAP que nadie fuera de ciencia de datos podía interpretar. Cuando los marketers preguntaban por qué un segmento había cambiado repentinamente, nadie podía responder.",
  openP3:
    "Este proyecto reemplazó la pila de caja negra con un sistema transparente diseñado para actualizarse continuamente y explicarse en lenguaje sencillo.",

  stages: [
    { icon: "⌛", label: "Ventana de Comportamiento de 90 Días", sub: "registros de transacciones · eventos de producto · acciones digitales", color: "#3b82f6" },
    { icon: "🏷", label: "Evaluación de Flags", sub: "~1.000 reglas binarias, p.ej. '3+ transferencias Zelle en 30d'", color: "#8b5cf6" },
    { icon: "⚖️", label: "Puntuación Lineal Ponderada", sub: "peso del flag = lift histórico sobre tasa de apertura base", color: "#f97316" },
    { icon: "📊", label: "Asignación de Deciles", sub: "orden de ranking → 10 niveles por producto", color: "#a3e635" },
    { icon: "📣", label: "Disparador de Marketing", sub: "API de segmentación de audiencia · actualización nocturna", color: "#22d3ee" },
  ],
  systemBottom: "↻ Se actualiza automáticamente cada noche · pesos de flags recalculados desde ventana rodante de 90 días · coste de reentrenamiento cero",
  fig1label: "Fig 1.",
  fig1caption: "Pipeline de puntuación de extremo a extremo. La propiedad arquitectónica clave: los pesos de los flags se recalculan cada noche con datos frescos, por lo que el modelo nunca se deteriora y nunca necesita un ciclo de reentrenamiento.",

  flagCardHeader: "Cliente de muestra · Producto: cuenta de ahorro",
  flags: [
    { flag: "Realizó 3+ transferencias Zelle en los últimos 30d", weight: "+18%", active: true },
    { flag: "Abrió cuenta de ahorro en los últimos 90d", weight: "+14%", active: true },
    { flag: "Depósito de cheque móvil en los últimos 60d", weight: "+11%", active: true },
    { flag: "Sin uso de tarjeta de débito en los últimos 30d", weight: "−7%", active: false },
    { flag: "Último inicio de sesión > 45 días atrás", weight: "−12%", active: false },
  ],
  flagCardScore: "Puntuación = suma de pesos de flags activos relativa a la tasa de apertura base de la categoría",
  fig2label: "Fig 2.",
  fig2caption: "Atribución para un cliente de muestra de decil superior. Cada flag activado y su contribución de uplift es visible — los marketers pueden explicar al departamento de cumplimiento exactamente por qué este cliente recibió la oferta.",

  chartXLabel: "Decil de Puntuación (1 = mayor afinidad)",
  chartYLabel: "Lift sobre Tasa de Apertura Base",
  chartBaseline: "línea base",
  fig3label: "Fig 3.",
  fig3caption: "Lift de apertura de producto por decil de puntuación vs. tasa de apertura base. Apuntar solo a los deciles 1–3 captura 3–4× la tasa de respuesta base, explicando el +29% de uplift en el rendimiento de campaña.",

  s1step: "Paso 01",
  s1title: "Más de 1.000 Flags Binarios de Comportamiento",
  s1p1pre: "La idea central es simple: en lugar de aprender representaciones latentes, enumerar comportamientos observables. Un cliente o «realizó 3+ transferencias Zelle en los últimos 30 días» o no. O «abrió una cuenta de ahorro en los últimos 90 días» o no. Cada flag es una regla binaria, calculable directamente a partir de registros de transacciones y tablas de eventos de productos.",
  s1p2pre: "La biblioteca de flags contiene ",
  s1p2bold: "~1.000 reglas",
  s1p2post: " en cinco categorías: patrones de transacciones, eventos de productos, participación digital, hitos del ciclo de vida de la cuenta y flags de cohorte de referencia entre pares. La mayoría de los flags son reglas de umbral simples sobre ventanas rodantes — 30, 60 o 90 días.",
  callout1: "La ventana de 90 días no fue arbitraria. Las ventanas más cortas (30 días) eran demasiado ruidosas — los meses individuales tienen alta varianza en el volumen de transacciones. Las ventanas más largas (180 días) estaban demasiado desactualizadas para señales de movimiento rápido como la participación digital. 90 días fue el punto óptimo empírico validado en datos de A/B de validación.",

  s2step: "Paso 02",
  s2title: "De Flags a Puntuaciones: Un Modelo Lineal Transparente",
  s2p1pre: "Para cada producto, los flags se clasifican por ",
  s2p1bold: "lift histórico sobre la tasa de apertura base del producto",
  s2p1post: ". Un flag que predice 3× la tasa de apertura base recibe un peso alto. Un flag asociado con tasas de apertura inferiores al promedio recibe un peso negativo. La puntuación final es una suma ponderada de los flags activados.",
  s2p2: "Esto es interpretable por construcción. Cada puntuación tiene una atribución exacta a nivel de flag que se puede imprimir en un informe de cumplimiento, mostrar a un marketer o depurar por un científico de datos en segundos.",
  s2p3: "El mecanismo de auto-actualización es lo que diferencia esto de un modelo estático. Los pesos de los flags se recalculan cada noche a partir de la ventana rodante de 90 días. Si el comportamiento del cliente cambia — digamos, una nueva función digital impulsa un aumento en los inicios de sesión de la app — el peso en los flags relacionados con el inicio de sesión se actualiza en 24 horas. Sin trabajo de reentrenamiento, sin despliegue de modelo, sin ceremonia.",

  s3step: "Paso 03",
  s3title: "Validación: Prueba A/B contra el Modelo de Caja Negra",
  s3p1: "El sistema fue validado contra el modelo de puntuación de caja negra anterior en una prueba A/B aleatorizada en tres campañas de productos (depósitos, tarjetas de crédito, préstamos para automóviles). La asignación aleatoria garantizó que la única diferencia fuera el modelo de targeting — misma oferta, mismo canal, mismo tamaño de audiencia.",
  s3p2pre: "El sistema de caja blanca superó al modelo de caja negra en las tres campañas, con un promedio de ",
  s3p2bold: "+29% de uplift en tasas de apertura de productos",
  s3p2post: ". El uplift provino principalmente de los tres primeros deciles — el modelo de caja negra había sobre-representado a los clientes «seguros» en su nivel de puntuación alta, mientras que los flags de caja blanca identificaron de forma más precisa a los clientes genuinamente persuadables.",

  metrics: [
    { label: "uplift en tasas de apertura por campaña", value: "+29%", sub: "vs. modelo de caja negra" },
    { label: "flags conductuales del segmento", value: "1.000+", sub: "reglas binarias · 5 categorías" },
    { label: "coste de reentrenamiento del modelo", value: "$0", sub: "auto-actualización nocturna" },
    { label: "campos de atribución de flags por cliente", value: "4–5", sub: "listo para cumplimiento" },
  ],

  s4step: "Lo Que Funciona",
  s4title: "A Veces la Respuesta No es Deep Learning",
  s4p1bold: "1. La interpretabilidad es una característica del producto, no un añadido.",
  s4p1: " La adopción del sistema por parte del equipo de marketing se disparó una vez que entendieron por qué cada cliente estaba en el decil superior. Saber que un cliente «realizó 3+ transferencias Zelle y abrió una cuenta de ahorro en los últimos 90 días» es contexto accionable para el diseño creativo y de ofertas. Un valor SHAP no lo es.",
  s4p2bold: "2. La auto-actualización elimina el mayor cuello de botella operativo.",
  s4p2: " El ciclo trimestral de reentrenamiento no era solo costoso — introducía la obsolescencia del modelo como un riesgo sistemático. Las actualizaciones nocturnas de los pesos de los flags significan que el sistema siempre refleja los últimos 90 días del comportamiento real del cliente, no una instantánea de meses atrás.",
  s4p3bold: "3. El nivel correcto de complejidad es el mínimo que funciona.",
  s4p3: " Un modelo lineal sobre flags binarios suena ingenuo comparado con un ensemble de gradient boosting. También superó a uno en producción. La lección: adaptar la complejidad del modelo a los requisitos de interpretabilidad y mantenimiento del contexto de despliegue.",
};

// ── Diagram components ────────────────────────────────────────────────────────

function SystemDiagram({ tx }: { tx: typeof en }) {
  return (
    <figure className="select-none">
      <div className="rounded-xl bg-bg-elev/50 border border-border p-6">
        <div className="flex flex-col sm:flex-row items-stretch gap-0">
          {tx.stages.map((s, i) => (
            <div key={s.label} className="flex sm:flex-col items-center flex-1 min-w-0">
              <div className="rounded-xl border px-3 py-3 text-center flex-1 w-full" style={{ borderColor: s.color + "55", background: s.color + "10" }}>
                <p className="text-lg mb-1">{s.icon}</p>
                <p className="text-xs font-semibold text-ink leading-snug">{s.label}</p>
                <p className="text-[10px] text-ink-muted mt-1 leading-snug hidden sm:block">{s.sub}</p>
              </div>
              {i < tx.stages.length - 1 && <div className="flex sm:hidden w-6 shrink-0 items-center justify-center text-ink-subtle">→</div>}
              {i < tx.stages.length - 1 && <div className="hidden sm:flex h-5 w-full items-center justify-center text-ink-subtle text-sm">→</div>}
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-lg bg-bg-card border border-border/40 px-4 py-2 text-center">
          <p className="text-[10px] font-mono text-ink-subtle uppercase tracking-wider">{tx.systemBottom}</p>
        </div>
      </div>
      <figcaption className="mt-3 text-xs text-ink-subtle text-center">
        <span className="text-ink-muted font-medium">{tx.fig1label}</span>{" "}{tx.fig1caption}
      </figcaption>
    </figure>
  );
}

function FlagCard({ tx }: { tx: typeof en }) {
  return (
    <figure className="select-none">
      <div className="rounded-xl bg-bg-elev/50 border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-ink-subtle">{tx.flagCardHeader}</p>
            <p className="text-sm font-semibold text-ink mt-0.5">Score: 82 / 100 · Decile 1</p>
          </div>
          <div className="rounded-lg bg-accent/10 border border-accent/30 px-3 py-1.5 text-center">
            <p className="text-xl font-bold text-accent">82</p>
            <p className="text-[9px] font-mono text-ink-muted">AFFINITY</p>
          </div>
        </div>
        <div className="space-y-2">
          {tx.flags.map(({ flag, weight, active }) => (
            <div key={flag} className={`flex items-center justify-between rounded-lg px-3 py-2 ${active ? "bg-accent/5 border border-accent/20" : "bg-bg-card border border-border/40 opacity-50"}`}>
              <div className="flex items-center gap-2">
                <span className={`text-xs ${active ? "text-accent" : "text-ink-subtle"}`}>{active ? "✓" : "✗"}</span>
                <span className="text-xs text-ink-muted">{flag}</span>
              </div>
              <span className={`font-mono text-xs font-semibold ${weight.startsWith("+") ? "text-accent" : "text-red-400"}`}>{weight}</span>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-ink-subtle mt-3 text-center font-mono">{tx.flagCardScore}</p>
      </div>
      <figcaption className="mt-3 text-xs text-ink-subtle text-center">
        <span className="text-ink-muted font-medium">{tx.fig2label}</span>{" "}{tx.fig2caption}
      </figcaption>
    </figure>
  );
}

function LiftChart({ tx }: { tx: typeof en }) {
  const W = 520, H = 200;
  const pl = 44, pr = 16, pt = 14, pb = 36;
  const cW = W - pl - pr, cH = H - pt - pb;
  const vals = [3.8, 2.9, 2.1, 1.6, 1.2, 0.9, 0.7, 0.5, 0.3, 0.1];
  const maxV = 4.2;
  const slotW = cW / vals.length;
  const bW = slotW - 5;

  return (
    <figure className="select-none">
      <div className="rounded-xl bg-bg-elev/50 border border-border p-5 pb-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden="true">
          <line x1={pl} y1={pt + cH - (1 / maxV) * cH} x2={pl + cW} y2={pt + cH - (1 / maxV) * cH} stroke="rgba(255,255,255,0.2)" strokeDasharray="4,3" />
          <text x={pl + cW + 3} y={pt + cH - (1 / maxV) * cH + 3} fill="rgba(255,255,255,0.3)" fontSize={8}>{tx.chartBaseline}</text>
          {[1, 2, 3, 4].map((v) => (
            <g key={v}>
              <line x1={pl} y1={pt + cH - (v / maxV) * cH} x2={pl + cW} y2={pt + cH - (v / maxV) * cH} stroke="rgba(255,255,255,0.05)" />
              <text x={pl - 6} y={pt + cH - (v / maxV) * cH + 3} textAnchor="end" fill="rgba(255,255,255,0.3)" fontSize={9}>{v}×</text>
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
                <text x={x + bW / 2} y={H - pb + 14} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize={9}>{i + 1}</text>
              </g>
            );
          })}
          <line x1={pl} y1={pt} x2={pl} y2={pt + cH} stroke="rgba(255,255,255,0.1)" />
          <line x1={pl} y1={pt + cH} x2={pl + cW} y2={pt + cH} stroke="rgba(255,255,255,0.1)" />
          <text x={pl + cW / 2} y={H - 4} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize={9}>{tx.chartXLabel}</text>
          <text x={12} y={pt + cH / 2} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize={9} transform={`rotate(-90 12 ${pt + cH / 2})`}>{tx.chartYLabel}</text>
        </svg>
      </div>
      <figcaption className="mt-3 text-xs text-ink-subtle text-center">
        <span className="text-ink-muted font-medium">{tx.fig3label}</span>{" "}{tx.fig3caption}
      </figcaption>
    </figure>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function MicrosegmentsContent() {
  const { lang } = useLang();
  const tx = lang === "es" ? es : en;

  return (
    <article className="pt-32 pb-24">
      <BackLink />
      <ArticleHeader
        eyebrow="Work · Santander Bank · 2023"
        title="White-box Affinity Scoring"
        subtitle={tx.subtitle}
        tags={["White-box ML", "Segmentation", "A/B Testing", "Rolling Windows", "Interpretability"]}
      />

      <div className="container-page mt-16">
        <Prose>
          <P>{tx.openP1}</P>
          <P>{tx.openP2}</P>
          <P>{tx.openP3}</P>
        </Prose>

        <Prose>
          <SH id="flags" step={tx.s1step}>{tx.s1title}</SH>
          <P>{tx.s1p1pre}</P>
          <P>{tx.s1p2pre}<B>{tx.s1p2bold}</B>{tx.s1p2post}</P>
          <Callout>{tx.callout1}</Callout>
        </Prose>

        <Prose>
          <SH id="scoring" step={tx.s2step}>{tx.s2title}</SH>
          <P>{tx.s2p1pre}<B>{tx.s2p1bold}</B>{tx.s2p1post}</P>
          <P>{tx.s2p2}</P>
        </Prose>

        <Wide><SystemDiagram tx={tx} /></Wide>

        <Prose>
          <P>{tx.s2p3}</P>
        </Prose>

        <Wide><FlagCard tx={tx} /></Wide>

        <Prose>
          <SH id="validation" step={tx.s3step}>{tx.s3title}</SH>
          <P>{tx.s3p1}</P>
          <P>{tx.s3p2pre}<B>{tx.s3p2bold}</B>{tx.s3p2post}</P>
        </Prose>

        <Wide><LiftChart tx={tx} /></Wide>

        <MetricStrip metrics={tx.metrics} />

        <Prose>
          <SH id="takeaways" step={tx.s4step}>{tx.s4title}</SH>
          <P><B>{tx.s4p1bold}</B>{tx.s4p1}</P>
          <P><B>{tx.s4p2bold}</B>{tx.s4p2}</P>
          <P><B>{tx.s4p3bold}</B>{tx.s4p3}</P>
        </Prose>

        <NextProject slug="printer-sales-forecast" />
      </div>
    </article>
  );
}

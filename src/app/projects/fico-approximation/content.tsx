"use client";

import { useLang } from "@/lib/lang";
import {
  Prose, Wide, B, SH, P, Callout,
  MetricStrip, NextProject, ArticleHeader, BackLink,
} from "../_article";

const en = {
  subtitle:
    "An internal model that proxies bureau FICO using banking signals — enabling the bank to cut expensive bureau pulls by ~60% and approve 12,000+ previously unscorable customers.",
  openP1:
    "Every credit decision at Santander triggered a bureau pull. The unit cost is real and it adds up fast — for every applicant screened, the bank paid regardless of whether the person was approved, declined, or dropped off mid-flow. For the vast majority of low-risk applicants, the bureau score confirmed what the bank already effectively knew from internal signals.",
  openP2:
    "There was also a second, harder problem: thin-file applicants — people new to credit or recent immigrants — had no FICO score at all. The bank had no choice but to decline them, because the only decision framework was \"compare to FICO cutoff.\" No score, no decision. No decision, no approval.",
  openP3:
    "The project addressed both problems with a single framework: an internal model that approximates FICO from banking signals, routed through a conformal prediction decision gate, with a separate classifier for thin-file customers.",

  routerApplicant: "New Credit Applicant",
  routerApplicantSub: "onboarding API call",
  routerModel: "Internal FICO Approximation",
  routerModelSub: "banking signals · conformal prediction interval",
  routerDecision: "Routing decision",
  routerTightLabel: "Interval tight",
  routerSkipTitle: "Skip Bureau Pull",
  routerSkipSub: "use internal score · instant decision · saves bureau cost",
  routerWideLabel: "Interval wide",
  routerPullTitle: "Pull Bureau",
  routerPullSub: "uncertainty too high · bureau score required",
  routerThinLabel: "Thin file",
  routerDelinqTitle: "Delinquency Model",
  routerDelinqSub: "no bureau exists · 24-month delinquency classifier",
  fig1label: "Fig 1.",
  fig1caption: "Three-path decision router. Bureau pulls are skipped when the conformal prediction interval is tight enough. Thin-file applicants (no FICO exists) route to a separate delinquency model instead.",

  scatterXLabel: "Actual Bureau FICO",
  scatterYLabel: "Predicted Internal Score",
  scatterBandLabel: "±50 band",
  fig2label: "Fig 2.",
  fig2caption: "Predicted internal score vs actual bureau FICO on held-out validation set. The green band is ±50 points — 82% of predictions fall within this band, justifying the skip-pull decision for in-band applicants.",

  coverageTarget: "90% target",
  coverageSkip: "skip pull",
  coverageXLabel: "Conformal Prediction Coverage (target ≥ 90%)",
  bands: [
    { label: "300–450", coverage: 94, action: "pull" },
    { label: "450–550", coverage: 91, action: "pull" },
    { label: "550–650", coverage: 95, action: "skip" },
    { label: "650–750", coverage: 97, action: "skip" },
    { label: "750–850", coverage: 96, action: "skip" },
  ] as { label: string; coverage: number; action: string }[],
  fig3label: "Fig 3.",
  fig3caption: "Empirical conformal coverage by FICO band on out-of-time validation. All bands exceed the 90% coverage target. Green bands (550+) are where the model skips the bureau pull.",

  s1step: "Step 01",
  s1title: "The Routing Architecture",
  s1p1pre: "The key insight is that skipping a bureau pull doesn't require perfect FICO prediction — it requires ",
  s1p1bold: "confident enough",
  s1p1post: " prediction. Conformal prediction gives us a formal way to operationalize that: every prediction comes with a coverage guarantee. If the prediction interval is tight, we can make a decision without the bureau. If it's wide, we pull anyway.",
  s1p2: "The routing logic has three paths. For standard applicants with banking history: the internal model runs first. If the conformal interval is narrow enough (within ±50 FICO points at 90% coverage), the bureau pull is skipped and the internal score is used directly. If the interval is wide — usually younger accounts or unusual transaction patterns — the model defers to the bureau. For thin-file customers who lack a bureau score entirely, a separate 24-month delinquency classifier handles the decision.",
  callout1: "Conformal prediction intervals were what made risk leadership comfortable enough to ship. The pitch wasn't \"the model is accurate.\" It was \"the model knows when it's uncertain, and we only skip the pull when it's not.\" That's a fundamentally different trust argument — and it landed.",

  s2step: "Step 02",
  s2title: "Building the Internal Model",
  s2p1: "The approximation model targets actual bureau FICO as a regression task. Features are drawn exclusively from internal banking signals — no bureau data is used at prediction time (that would defeat the purpose):",
  featureCards: [
    { f: "Deposit patterns", d: "balance stability, inflow frequency, payroll cadence" },
    { f: "Account age", d: "tenure on each product, recency of last product opening" },
    { f: "Payment behavior", d: "overdraft history, bill-pay consistency, missed payments" },
    { f: "Digital footprint", d: "login frequency, feature adoption, support contact rate" },
    { f: "Peer benchmarks", d: "behavioral percentile within same age/ZIP cohort" },
  ] as { f: string; d: string }[],
  s2p2: "The model is a gradient-boosted regressor, validated on 18 months of out-of-time data and shadowed in production for 60 days before activation. Shadowing meant running the model on every application in parallel with the existing bureau-pull flow — without acting on the output — to measure real-world prediction quality before any money was at risk.",

  s3step: "Step 03",
  s3title: "Thin-File Customers: A Separate Problem",
  s3p1pre: "For thin-file applicants, there is no FICO to approximate — the bureau simply returns nothing. A regression model can't help here. The approach was to reframe the problem: instead of approximating FICO, directly predict ",
  s3p1bold: "24-month delinquency probability",
  s3p1post: " and calibrate it to be at most as risky as the bank's existing FICO cutoff tier.",
  s3p2: "This means the decision for a thin-file applicant isn't \"is their FICO high enough?\" but \"is their predicted delinquency rate below the threshold we accept for mid-FICO customers?\" Mathematically equivalent, but it doesn't require a bureau score to exist.",

  s4step: "Step 04",
  s4title: "Results",
  s4p1: "The system went live as part of the onboarding API with sub-200ms inference latency. Bureau pull decisions are logged per applicant and reviewed quarterly against realized default rates.",

  metrics: [
    { label: "reduction in paid bureau pulls at onboarding", value: "~60%", sub: "no measurable lift in default rate" },
    { label: "thin-file customers approved under new framework", value: "12k+", sub: "previously declined" },
    { label: "API inference latency", value: "<200ms", sub: "integrated into onboarding flow" },
    { label: "shadow production period before activation", value: "60 days", sub: "full parallel validation" },
  ] as { label: string; value: string; sub: string }[],

  s5step: "What This Gets Right",
  s5title: "The Real Win Was the Policy, Not the Model",
  s5p1bold: "1. The hybrid policy is what makes it work.",
  s5p1: " A pure ML approach — \"use the model always\" — would never have gotten past risk. The conformal prediction gate provides a formal, auditable mechanism for saying \"this prediction is uncertain, defer to the bureau.\" Without that gate, there's no way to bound downside risk.",
  s5p2bold: "2. Conformal prediction is underused in production ML.",
  s5p2: " It gives distribution-free coverage guarantees that don't depend on model correctness — only on exchangeability of the calibration data. That property makes it especially useful for regulated environments where \"the model is accurate\" isn't sufficient.",
  s5p3bold: "3. Shadow mode before activation is not optional.",
  s5p3: " 60 days of parallel running revealed two edge cases (very recent immigrants and accounts with non-standard payroll patterns) that needed special handling before the model was trusted to make real decisions. Catching those in shadow mode cost nothing. Catching them post-launch would have cost defaults.",
};

const es: typeof en = {
  subtitle:
    "Un modelo interno que aproxima el FICO del bureau usando señales bancarias — permitiendo al banco reducir las costosas consultas al bureau en ~60% y aprobar más de 12.000 clientes previamente inscorables.",
  openP1:
    "Cada decisión de crédito en Santander activaba una consulta al bureau. El costo unitario es real y se acumula rápidamente — por cada solicitante revisado, el banco pagaba independientemente de si la persona fue aprobada, rechazada o abandonó a mitad del proceso. Para la gran mayoría de solicitantes de bajo riesgo, la puntuación del bureau confirmaba lo que el banco ya sabía efectivamente a partir de las señales internas.",
  openP2:
    "También había un segundo problema, más difícil: los clientes con historial crediticio delgado — personas nuevas en el crédito o inmigrantes recientes — no tenían puntuación FICO en absoluto. El banco no tenía más opción que rechazarlos, porque el único marco de decisión era «comparar con el umbral FICO.» Sin puntuación, sin decisión. Sin decisión, sin aprobación.",
  openP3:
    "El proyecto abordó ambos problemas con un único framework: un modelo interno que aproxima FICO a partir de señales bancarias, enrutado a través de una puerta de decisión de predicción conformal, con un clasificador separado para clientes sin historial crediticio.",

  routerApplicant: "Nuevo Solicitante de Crédito",
  routerApplicantSub: "llamada API de onboarding",
  routerModel: "Aproximación Interna de FICO",
  routerModelSub: "señales bancarias · intervalo de predicción conformal",
  routerDecision: "Decisión de enrutamiento",
  routerTightLabel: "Intervalo ajustado",
  routerSkipTitle: "Omitir Consulta al Bureau",
  routerSkipSub: "usar puntuación interna · decisión instantánea · ahorra costo del bureau",
  routerWideLabel: "Intervalo amplio",
  routerPullTitle: "Consultar Bureau",
  routerPullSub: "incertidumbre muy alta · puntuación del bureau requerida",
  routerThinLabel: "Sin historial",
  routerDelinqTitle: "Modelo de Morosidad",
  routerDelinqSub: "no existe bureau · clasificador de morosidad a 24 meses",
  fig1label: "Fig 1.",
  fig1caption: "Enrutador de decisión de tres caminos. Las consultas al bureau se omiten cuando el intervalo de predicción conformal es lo suficientemente ajustado. Los clientes sin historial (sin FICO existente) se enrutan a un modelo de morosidad separado.",

  scatterXLabel: "FICO del Bureau Real",
  scatterYLabel: "Puntuación Interna Predicha",
  scatterBandLabel: "banda ±50",
  fig2label: "Fig 2.",
  fig2caption: "Puntuación interna predicha vs FICO del bureau real en el conjunto de validación holdout. La banda verde es ±50 puntos — el 82% de las predicciones caen dentro de esta banda, justificando la decisión de omitir la consulta para los solicitantes en banda.",

  coverageTarget: "objetivo 90%",
  coverageSkip: "omitir consulta",
  coverageXLabel: "Cobertura de Predicción Conformal (objetivo ≥ 90%)",
  bands: [
    { label: "300–450", coverage: 94, action: "pull" },
    { label: "450–550", coverage: 91, action: "pull" },
    { label: "550–650", coverage: 95, action: "skip" },
    { label: "650–750", coverage: 97, action: "skip" },
    { label: "750–850", coverage: 96, action: "skip" },
  ],
  fig3label: "Fig 3.",
  fig3caption: "Cobertura conformal empírica por banda FICO en validación fuera de tiempo. Todas las bandas superan el objetivo de cobertura del 90%. Las bandas verdes (550+) son donde el modelo omite la consulta al bureau.",

  s1step: "Paso 01",
  s1title: "La Arquitectura de Enrutamiento",
  s1p1pre: "La idea clave es que omitir una consulta al bureau no requiere predicción perfecta de FICO — requiere una predicción ",
  s1p1bold: "lo suficientemente segura",
  s1p1post: ". La predicción conformal nos da una forma formal de operacionalizar eso: cada predicción viene con una garantía de cobertura. Si el intervalo de predicción es ajustado, podemos tomar una decisión sin el bureau. Si es amplio, consultamos de todas formas.",
  s1p2: "La lógica de enrutamiento tiene tres caminos. Para solicitantes estándar con historial bancario: el modelo interno corre primero. Si el intervalo conformal es lo suficientemente estrecho (dentro de ±50 puntos FICO con cobertura del 90%), se omite la consulta al bureau y se usa directamente la puntuación interna. Si el intervalo es amplio — generalmente cuentas jóvenes o patrones de transacción inusuales — el modelo delega al bureau. Para clientes sin historial que carecen completamente de una puntuación del bureau, un clasificador de morosidad a 24 meses separado maneja la decisión.",
  callout1: "Los intervalos de predicción conformal fueron lo que hizo que la dirección de riesgo se sintiera cómoda para lanzar. El argumento no era «el modelo es preciso.» Era «el modelo sabe cuándo está inseguro, y solo omitimos la consulta cuando no lo está.» Ese es un argumento de confianza fundamentalmente diferente — y funcionó.",

  s2step: "Paso 02",
  s2title: "Construyendo el Modelo Interno",
  s2p1: "El modelo de aproximación apunta al FICO del bureau real como una tarea de regresión. Las características se extraen exclusivamente de señales bancarias internas — no se usan datos del bureau en el momento de la predicción (eso derrotaría el propósito):",
  featureCards: [
    { f: "Patrones de depósito", d: "estabilidad del saldo, frecuencia de entradas, cadencia de nómina" },
    { f: "Antigüedad de cuenta", d: "permanencia en cada producto, recencia de la última apertura de producto" },
    { f: "Comportamiento de pago", d: "historial de sobregiro, consistencia de domiciliaciones, pagos omitidos" },
    { f: "Huella digital", d: "frecuencia de inicio de sesión, adopción de funciones, tasa de contacto con soporte" },
    { f: "Referencias de pares", d: "percentil de comportamiento dentro del mismo cohorte de edad/ZIP" },
  ],
  s2p2: "El modelo es un regresor de gradient boosting, validado en 18 meses de datos fuera de tiempo y en modo sombra en producción durante 60 días antes de la activación. El modo sombra significaba ejecutar el modelo en cada solicitud en paralelo con el flujo existente de consulta al bureau — sin actuar sobre el output — para medir la calidad de predicción en el mundo real antes de que hubiera dinero en riesgo.",

  s3step: "Paso 03",
  s3title: "Clientes sin Historial: Un Problema Separado",
  s3p1pre: "Para los clientes sin historial crediticio, no hay FICO que aproximar — el bureau simplemente no devuelve nada. Un modelo de regresión no puede ayudar aquí. El enfoque fue replantear el problema: en lugar de aproximar FICO, predecir directamente la ",
  s3p1bold: "probabilidad de morosidad a 24 meses",
  s3p1post: " y calibrarla para que sea como máximo tan arriesgada como el nivel de corte FICO existente del banco.",
  s3p2: "Esto significa que la decisión para un cliente sin historial no es «¿es su FICO suficientemente alto?» sino «¿está su tasa de morosidad predicha por debajo del umbral que aceptamos para clientes de FICO medio?» Matemáticamente equivalente, pero no requiere que exista una puntuación del bureau.",

  s4step: "Paso 04",
  s4title: "Resultados",
  s4p1: "El sistema se puso en marcha como parte de la API de onboarding con latencia de inferencia inferior a 200ms. Las decisiones de consulta al bureau se registran por solicitante y se revisan trimestralmente contra tasas de impago realizadas.",

  metrics: [
    { label: "reducción en consultas al bureau pagadas en onboarding", value: "~60%", sub: "sin aumento medible en tasa de impago" },
    { label: "clientes sin historial aprobados bajo el nuevo framework", value: "12k+", sub: "previamente rechazados" },
    { label: "latencia de inferencia de la API", value: "<200ms", sub: "integrada en el flujo de onboarding" },
    { label: "período de producción en modo sombra antes de activación", value: "60 días", sub: "validación paralela completa" },
  ],

  s5step: "Lo Que Funciona",
  s5title: "El Verdadero Triunfo Fue la Política, No el Modelo",
  s5p1bold: "1. La política híbrida es lo que lo hace funcionar.",
  s5p1: " Un enfoque ML puro — «usa el modelo siempre» — nunca habría pasado el riesgo. La puerta de predicción conformal proporciona un mecanismo formal y auditable para decir «esta predicción es incierta, delegar al bureau.» Sin esa puerta, no hay forma de acotar el riesgo a la baja.",
  s5p2bold: "2. La predicción conformal está infrautilizada en ML de producción.",
  s5p2: " Ofrece garantías de cobertura libres de distribución que no dependen de la corrección del modelo — solo de la intercambiabilidad de los datos de calibración. Esa propiedad la hace especialmente útil en entornos regulados donde «el modelo es preciso» no es suficiente.",
  s5p3bold: "3. El modo sombra antes de la activación no es opcional.",
  s5p3: " 60 días de ejecución paralela revelaron dos casos extremos (inmigrantes muy recientes y cuentas con patrones de nómina no estándar) que necesitaban manejo especial antes de que se confiara al modelo tomar decisiones reales. Detectarlos en modo sombra no costó nada. Detectarlos post-lanzamiento habría costado impagos.",
};

// ── Diagram components ────────────────────────────────────────────────────────

function DecisionRouter({ tx }: { tx: typeof en }) {
  return (
    <figure className="select-none">
      <div className="rounded-xl bg-bg-elev/50 border border-border p-6">
        <div className="flex flex-col items-center gap-0 text-sm">
          <div className="rounded-xl border border-blue-500/50 bg-blue-500/10 px-5 py-3 text-center w-56">
            <p className="font-semibold text-ink text-xs">{tx.routerApplicant}</p>
            <p className="text-[10px] text-ink-muted mt-0.5">{tx.routerApplicantSub}</p>
          </div>
          <div className="h-5 w-px bg-border/40" />
          <div className="rounded-xl border border-purple-500/50 bg-purple-500/10 px-5 py-3 text-center w-64">
            <p className="font-semibold text-ink text-xs">{tx.routerModel}</p>
            <p className="text-[10px] text-ink-muted mt-0.5">{tx.routerModelSub}</p>
          </div>
          <div className="h-5 w-px bg-border/40" />
          <div className="rounded-xl border border-border/60 bg-bg-elev/30 px-4 py-2 text-center w-48">
            <p className="text-[10px] font-mono uppercase tracking-wider text-ink-subtle">{tx.routerDecision}</p>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4 w-full">
            <div className="col-span-1 flex flex-col items-center gap-2">
              <div className="text-[9px] font-mono uppercase tracking-wider text-accent">{tx.routerTightLabel}</div>
              <div className="rounded-xl border border-accent/50 bg-accent/5 px-4 py-3 text-center w-full">
                <p className="text-xs font-semibold text-ink">{tx.routerSkipTitle}</p>
                <p className="text-[10px] text-ink-muted mt-1">{tx.routerSkipSub}</p>
              </div>
            </div>
            <div className="col-span-1 flex flex-col items-center gap-2">
              <div className="text-[9px] font-mono uppercase tracking-wider text-ink-subtle">{tx.routerWideLabel}</div>
              <div className="rounded-xl border border-border/50 bg-bg-elev/20 px-4 py-3 text-center w-full">
                <p className="text-xs font-semibold text-ink-muted">{tx.routerPullTitle}</p>
                <p className="text-[10px] text-ink-muted mt-1">{tx.routerPullSub}</p>
              </div>
            </div>
            <div className="col-span-1 flex flex-col items-center gap-2">
              <div className="text-[9px] font-mono uppercase tracking-wider text-orange-400">{tx.routerThinLabel}</div>
              <div className="rounded-xl border border-orange-500/40 bg-orange-500/5 px-4 py-3 text-center w-full">
                <p className="text-xs font-semibold text-ink">{tx.routerDelinqTitle}</p>
                <p className="text-[10px] text-ink-muted mt-1">{tx.routerDelinqSub}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-xs text-ink-subtle text-center">
        <span className="text-ink-muted font-medium">{tx.fig1label}</span>{" "}{tx.fig1caption}
      </figcaption>
    </figure>
  );
}

function FICOScatter({ tx }: { tx: typeof en }) {
  const W = 480, H = 280;
  const pl = 50, pr = 20, pt = 20, pb = 42;
  const cW = W - pl - pr, cH = H - pt - pb;
  const lo = 380, hi = 880;
  const px = (v: number) => pl + ((v - lo) / (hi - lo)) * cW;
  const py = (v: number) => pt + cH - ((v - lo) / (hi - lo)) * cH;
  const seed = (i: number) => { const x = Math.sin(i * 127.1) * 43758.5453; return x - Math.floor(x); };
  const points = Array.from({ length: 55 }, (_, i) => {
    const actual = 430 + seed(i) * 410;
    const noise = (seed(i + 100) - 0.5) * 60;
    return { actual, predicted: Math.max(400, Math.min(850, actual + noise)) };
  });

  return (
    <figure className="select-none">
      <div className="rounded-xl bg-bg-elev/50 border border-border p-5 pb-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden="true">
          <polygon
            points={`${px(lo).toFixed(1)},${py(lo + 50).toFixed(1)} ${px(hi - 50).toFixed(1)},${py(hi).toFixed(1)} ${px(hi).toFixed(1)},${py(hi - 50).toFixed(1)} ${px(lo + 50).toFixed(1)},${py(lo).toFixed(1)}`}
            fill="#a3e635" fillOpacity={0.07}
          />
          <line x1={px(lo)} y1={py(lo)} x2={px(hi)} y2={py(hi)} stroke="#a3e635" strokeOpacity={0.4} strokeDasharray="4,3" />
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
          {points.map((p, i) => <circle key={i} cx={px(p.actual)} cy={py(p.predicted)} r={3} fill="#3b82f6" fillOpacity={0.7} />)}
          <text x={pl + cW / 2} y={H - 5} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize={9}>{tx.scatterXLabel}</text>
          <text x={12} y={pt + cH / 2} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize={9} transform={`rotate(-90 12 ${pt + cH / 2})`}>{tx.scatterYLabel}</text>
          <text x={px(800) - 4} y={py(820) - 6} fill="#a3e635" fontSize={8} textAnchor="end">{tx.scatterBandLabel}</text>
        </svg>
      </div>
      <figcaption className="mt-3 text-xs text-ink-subtle text-center">
        <span className="text-ink-muted font-medium">{tx.fig2label}</span>{" "}{tx.fig2caption}
      </figcaption>
    </figure>
  );
}

function CoverageBars({ tx }: { tx: typeof en }) {
  const W = 520, H = 190;
  const pl = 90, pr = 20, pt = 16, pb = 36;
  const cW = W - pl - pr, cH = H - pt - pb;
  const maxC = 100;
  const slotH = cH / tx.bands.length - 4;

  return (
    <figure className="select-none">
      <div className="rounded-xl bg-bg-elev/50 border border-border p-5 pb-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden="true">
          <line x1={pl + (90 / maxC) * cW} y1={pt - 4} x2={pl + (90 / maxC) * cW} y2={pt + cH + 4} stroke="#f97316" strokeDasharray="4,3" strokeOpacity={0.7} />
          <text x={pl + (90 / maxC) * cW + 3} y={pt + 8} fill="#f97316" fontSize={9}>{tx.coverageTarget}</text>
          {tx.bands.map(({ label, coverage, action }, i) => {
            const y = pt + i * (cH / tx.bands.length) + 2;
            const bW = (coverage / maxC) * cW;
            const fill = action === "skip" ? "#a3e635" : "rgba(255,255,255,0.2)";
            return (
              <g key={label}>
                <text x={pl - 6} y={y + slotH / 2 + 3} textAnchor="end" fill="rgba(255,255,255,0.5)" fontSize={9}>{label}</text>
                <rect x={pl} y={y} width={bW} height={slotH} fill={fill} fillOpacity={action === "skip" ? 1 : 0.6} rx={3} />
                <text x={pl + bW + 4} y={y + slotH / 2 + 3} fill="rgba(255,255,255,0.6)" fontSize={9}>{coverage}%</text>
                {action === "skip" && (
                  <text x={pl + bW - 6} y={y + slotH / 2 + 3} textAnchor="end" fill="rgba(0,0,0,0.7)" fontSize={8} fontWeight="bold">{tx.coverageSkip}</text>
                )}
              </g>
            );
          })}
          <line x1={pl} y1={pt} x2={pl} y2={pt + cH} stroke="rgba(255,255,255,0.1)" />
          <text x={pl + cW / 2} y={H - 5} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize={9}>{tx.coverageXLabel}</text>
        </svg>
      </div>
      <figcaption className="mt-3 text-xs text-ink-subtle text-center">
        <span className="text-ink-muted font-medium">{tx.fig3label}</span>{" "}{tx.fig3caption}
      </figcaption>
    </figure>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function FICOContent() {
  const { lang } = useLang();
  const tx = lang === "es" ? es : en;

  return (
    <article className="pt-32 pb-24">
      <BackLink />
      <ArticleHeader
        eyebrow="Work · Santander Bank · 2024"
        title="FICO Score Approximation Model"
        subtitle={tx.subtitle}
        tags={["Credit Risk", "Gradient Boosting", "Conformal Prediction", "Onboarding", "Cost Optimization"]}
      />

      <div className="container-page mt-16">
        <Prose>
          <P>{tx.openP1}</P>
          <P>{tx.openP2}</P>
          <P>{tx.openP3}</P>
        </Prose>

        <Prose>
          <SH id="architecture" step={tx.s1step}>{tx.s1title}</SH>
          <P>{tx.s1p1pre}<B>{tx.s1p1bold}</B>{tx.s1p1post}</P>
        </Prose>

        <Wide><DecisionRouter tx={tx} /></Wide>

        <Prose>
          <P>{tx.s1p2}</P>
          <Callout>{tx.callout1}</Callout>
        </Prose>

        <Prose>
          <SH id="model" step={tx.s2step}>{tx.s2title}</SH>
          <P>{tx.s2p1}</P>
          <div className="my-6 grid sm:grid-cols-2 gap-3">
            {tx.featureCards.map(({ f, d }) => (
              <div key={f} className="rounded-xl border border-border/50 bg-bg-elev/30 px-4 py-3">
                <p className="text-sm font-semibold text-ink mb-1">{f}</p>
                <p className="text-xs text-ink-muted leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
          <P>{tx.s2p2}</P>
        </Prose>

        <Wide><FICOScatter tx={tx} /></Wide>

        <Prose>
          <SH id="thinfile" step={tx.s3step}>{tx.s3title}</SH>
          <P>{tx.s3p1pre}<B>{tx.s3p1bold}</B>{tx.s3p1post}</P>
          <P>{tx.s3p2}</P>
        </Prose>

        <Wide><CoverageBars tx={tx} /></Wide>

        <Prose>
          <SH id="results" step={tx.s4step}>{tx.s4title}</SH>
          <P>{tx.s4p1}</P>
        </Prose>

        <MetricStrip metrics={tx.metrics} />

        <Prose>
          <SH id="takeaways" step={tx.s5step}>{tx.s5title}</SH>
          <P><B>{tx.s5p1bold}</B>{tx.s5p1}</P>
          <P><B>{tx.s5p2bold}</B>{tx.s5p2}</P>
          <P><B>{tx.s5p3bold}</B>{tx.s5p3}</P>
        </Prose>

        <NextProject slug="microsegments-oracle" />
      </div>
    </article>
  );
}

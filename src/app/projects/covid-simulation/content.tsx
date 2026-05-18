"use client";

import { useLang } from "@/lib/lang";
import {
  Prose, Wide, B, SH, P, Callout,
  MetricStrip, NextProject, ArticleHeader, BackLink,
} from "../_article";

const en = {
  subtitle:
    "A stochastic agent-based model of COVID-19 spread across ~200k synthetic Tippecanoe County residents — evaluating masks, school closures, and WFH across 12 intervention scenarios.",

  openP1:
    "In the spring of 2020, public-health decision-makers were operating blind. Vaccines didn't exist. The only tools available were non-pharmaceutical interventions (NPIs): masks, school closures, work-from-home policies, stay-at-home orders. The policy question was: which combinations of these interventions produce the largest reduction in peak hospital burden, given that compliance is partial and behavior varies by context?",
  openP2:
    "Standard compartmental models (SEIR) treat populations as homogeneous. Every individual is identical, every contact is equivalent. That's fine for back-of-envelope estimates. It's not fine for modeling the heterogeneous contact networks that drive actual transmission — school contact graphs are fundamentally different from workplace contact graphs, which are different from household contact graphs. Each requires different parameters and different interventions.",
  openP3:
    "The project built an agent-based stochastic simulation that accounts for this structure, calibrated to Tippecanoe County demographics, and ran 1,000 Monte Carlo replicates per scenario to quantify uncertainty in the projections.",

  seirCompartments: [
    { letter: "S", label: "Susceptible", color: "#3b82f6", sub: "~195k initial" },
    { letter: "E", label: "Exposed", color: "#f97316", sub: "incubation period" },
    { letter: "I", label: "Infectious", color: "#ef4444", sub: "contagious window" },
    { letter: "R", label: "Removed", color: "#a3e635", sub: "recovered or deceased" },
  ] as { letter: string; label: string; color: string; sub: string }[],
  seirArrows: [
    { arrow: "β·I/N", sub: "contact rate × prevalence" },
    { arrow: "σ", sub: "1/mean incubation" },
    { arrow: "γ", sub: "1/infectious period" },
  ] as { arrow: string; sub: string }[],
  seirParams: [
    { param: "β (baseline)", val: "0.28/day", note: "contact graph × transmission prob" },
    { param: "σ⁻¹ (incubation)", val: "5.1 days", note: "lognormal distribution" },
    { param: "γ⁻¹ (infectious)", val: "5.0 days", note: "varies by location type" },
    { param: "R₀ (initial)", val: "2.4", note: "within range of early estimates" },
  ] as { param: string; val: string; note: string }[],
  fig1label: "Fig 1.",
  fig1caption: "SEIR compartment structure with stochastic contact-based transmission. Parameters were calibrated to match early-2020 Tippecanoe County case counts before any intervention.",

  curveScenarios: [
    { name: "No intervention", peak: 0.38, peakDay: 95, color: "#ef4444" },
    { name: "Masks only", peak: 0.22, peakDay: 115, color: "#f97316" },
    { name: "School closure", peak: 0.20, peakDay: 120, color: "#3b82f6" },
    { name: "Combined (masks + WFH + schools)", peak: 0.08, peakDay: 170, color: "#a3e635" },
  ] as { name: string; peak: number; peakDay: number; color: string }[],
  curveYLabel: "% Population Infectious",
  curveXLabel: "Days from First Case",
  fig2label: "Fig 2.",
  fig2caption: "Median infection curves across 1,000 Monte Carlo replicates per scenario. Combined interventions (green) reduce the peak infectious fraction by 79% vs no intervention (red), and delay it by ~75 days — buying time for healthcare capacity.",

  peakScenarios: [
    { name: "No intervention", peak: 38, color: "#ef4444" },
    { name: "Masks (60% adoption)", peak: 22, color: "#f97316" },
    { name: "School closure", peak: 20, color: "#3b82f6" },
    { name: "WFH (40% of workforce)", peak: 18, color: "#8b5cf6" },
    { name: "Masks + WFH", peak: 13, color: "#22d3ee" },
    { name: "All combined", peak: 8, color: "#a3e635" },
  ] as { name: string; peak: number; color: string }[],
  peakXLabel: "Peak % Population Infectious (median over 1,000 Monte Carlo runs)",
  fig3label: "Fig 3.",
  fig3caption: "Peak infectious fraction by intervention scenario. Combined interventions are super-additive — the combined scenario (8%) is well below the sum of individual reductions, reflecting nonlinear interaction effects in the transmission network.",

  s1step: "Step 01",
  s1title: "Synthetic Population Generation",
  s1p1pre: "The simulation starts with a ",
  s1p1bold: "synthetic population",
  s1p1post: " of ~200k agents matching Tippecanoe County demographic structure from Census data: age distribution, household sizes, employment rates, school enrollment, and workforce composition. Each agent is assigned a household, and either a school or workplace based on their demographic profile.",
  s1p2: "Agents follow probabilistic daily schedules: home to work or school during the day, optional errands (grocery, restaurant, recreation) in the evening, home overnight. Each location type has a different contact rate and a different transmission probability per contact — consistent with the epidemiological literature at the time.",
  callout1: "Population synthesis is half the work — and the most underrated step. The contact network structure (who meets whom, where, and for how long) drives most of the variance in outcomes. A synthetic population that accurately mirrors the demographic and social structure of the real county is what makes the simulation actionable rather than illustrative.",

  s2step: "Step 02",
  s2title: "Transmission Model: Stochastic SEIR",
  s2p1: "Transmission follows a stochastic SEIR model layered on top of the contact network. Each day, susceptible agents draw contacts from their current location. Each contact with an infectious agent results in infection with a probability determined by location type, mask usage, and baseline transmission parameters.",
  s2p2: "The stochastic approach — drawing contacts and transmission outcomes probabilistically rather than deterministically — means that a single run of the model produces a single trajectory. The distribution across 1,000 runs reveals both the expected outcome and the uncertainty around it. This is critical for communicating to policymakers: not \"peak infections will be X,\" but \"peak infections will be X ± Y at the 80th percentile.\"",

  s3step: "Step 03",
  s3title: "12 Intervention Scenarios",
  s3p1: "Twelve scenarios were modeled, varying three parameters: mask adoption rate (0%, 40%, 80%), school status (open/closed), and WFH fraction (0%, 40% of eligible workforce). Each scenario was run for a 365-day window starting from a single seeded case.",
  s3p2: "Masks were modeled as reducing per-contact transmission probability by 60% for a masked agent (based on filtration efficiency literature at the time). School closure removed school contact graphs entirely. WFH moved workplace contacts to home, where transmission probabilities differ.",

  s4step: "Step 04",
  s4title: "Super-Additive Combined Effects",
  s4p1pre: "The most striking finding was the ",
  s4p1bold: "super-additive effect",
  s4p1post: " of combined interventions. Masks alone reduced peak infections by ~42%. School closure alone reduced them by ~47%. Combined, they reduced peak infections by ~79% — well above the sum of individual effects.",
  s4p2: "This super-additivity arises from the network structure: each intervention cuts a different transmission pathway. Masks reduce per-contact transmission everywhere. School closures eliminate a high-density contact environment. WFH reduces another. When all three pathways are cut simultaneously, the virus has fewer routes to spread, and the multiplicative reduction in R-effective is much larger than any single pathway cut.",

  metrics: [
    { label: "synthetic agents in the model", value: "~200k", sub: "matching county demographics" },
    { label: "intervention scenarios evaluated", value: "12", sub: "varying masks · schools · WFH" },
    { label: "Monte Carlo replicates per scenario", value: "1,000", sub: "for uncertainty quantification" },
    { label: "peak reduction (combined interventions)", value: "−79%", sub: "vs no intervention" },
  ] as { label: string; value: string; sub: string }[],

  s5step: "What This Gets Right",
  s5title: "Agent-Based Models for Policy Uncertainty",
  s5p1bold: "1. Stochastic agent-based models communicate uncertainty in a way compartmental models can't.",
  s5p1: " Showing policymakers a distribution of outcomes — with a 20th-80th percentile band — is more honest and more useful than a single deterministic trajectory. The uncertainty is real, and the model should surface it.",
  s5p2bold: "2. Super-additivity is a network effect, not a coincidence.",
  s5p2: " Understanding that combined interventions are super-additive because they cut different transmission pathways changes how you think about policy sequencing. It's not \"pick the best one\" — it's \"combine multiple moderate interventions for multiplicative effects.\"",
  s5p3bold: "3. Population synthesis is where modeling earns its credibility.",
  s5p3: " A SEIR model that doesn't account for the structure of contact networks will misestimate both the speed of spread and the relative effectiveness of interventions that target specific contact types. Getting the population right is the prerequisite for getting the predictions right.",
};

const es: typeof en = {
  subtitle:
    "Un modelo estocástico basado en agentes de la propagación del COVID-19 entre ~200k residentes sintéticos del condado de Tippecanoe — evaluando mascarillas, cierres escolares y teletrabajo en 12 escenarios de intervención.",

  openP1:
    "En la primavera de 2020, los responsables de salud pública operaban a ciegas. Las vacunas no existían. Las únicas herramientas disponibles eran las intervenciones no farmacéuticas (INF): mascarillas, cierres escolares, políticas de trabajo desde casa, órdenes de confinamiento. La pregunta política era: ¿qué combinaciones de estas intervenciones producen la mayor reducción en la carga hospitalaria máxima, dado que el cumplimiento es parcial y el comportamiento varía según el contexto?",
  openP2:
    "Los modelos compartimentales estándar (SEIR) tratan las poblaciones como homogéneas. Cada individuo es idéntico, cada contacto es equivalente. Eso está bien para estimaciones aproximadas. No está bien para modelar las redes de contacto heterogéneas que impulsan la transmisión real — los grafos de contacto escolar son fundamentalmente diferentes de los grafos de contacto laboral, que son diferentes de los grafos de contacto doméstico. Cada uno requiere diferentes parámetros y diferentes intervenciones.",
  openP3:
    "El proyecto construyó una simulación estocástica basada en agentes que tiene en cuenta esta estructura, calibrada con los datos demográficos del condado de Tippecanoe, y ejecutó 1.000 réplicas de Monte Carlo por escenario para cuantificar la incertidumbre en las proyecciones.",

  seirCompartments: [
    { letter: "S", label: "Susceptible", color: "#3b82f6", sub: "~195k inicial" },
    { letter: "E", label: "Expuesto", color: "#f97316", sub: "período de incubación" },
    { letter: "I", label: "Infeccioso", color: "#ef4444", sub: "ventana de contagio" },
    { letter: "R", label: "Recuperado", color: "#a3e635", sub: "recuperado o fallecido" },
  ],
  seirArrows: [
    { arrow: "β·I/N", sub: "tasa de contacto × prevalencia" },
    { arrow: "σ", sub: "1/incubación media" },
    { arrow: "γ", sub: "1/período infeccioso" },
  ],
  seirParams: [
    { param: "β (base)", val: "0,28/día", note: "grafo de contacto × prob. de transmisión" },
    { param: "σ⁻¹ (incubación)", val: "5,1 días", note: "distribución lognormal" },
    { param: "γ⁻¹ (infeccioso)", val: "5,0 días", note: "varía según tipo de lugar" },
    { param: "R₀ (inicial)", val: "2,4", note: "dentro del rango de estimaciones tempranas" },
  ],
  fig1label: "Fig 1.",
  fig1caption: "Estructura de compartimentos SEIR con transmisión estocástica basada en contactos. Los parámetros fueron calibrados para coincidir con los recuentos de casos del condado de Tippecanoe a principios de 2020 antes de cualquier intervención.",

  curveScenarios: [
    { name: "Sin intervención", peak: 0.38, peakDay: 95, color: "#ef4444" },
    { name: "Solo mascarillas", peak: 0.22, peakDay: 115, color: "#f97316" },
    { name: "Cierre escolar", peak: 0.20, peakDay: 120, color: "#3b82f6" },
    { name: "Combinado (mascarillas + teletrabajo + escuelas)", peak: 0.08, peakDay: 170, color: "#a3e635" },
  ],
  curveYLabel: "% Población Infecciosa",
  curveXLabel: "Días desde el Primer Caso",
  fig2label: "Fig 2.",
  fig2caption: "Curvas de infección medianas en 1.000 réplicas de Monte Carlo por escenario. Las intervenciones combinadas (verde) reducen la fracción infecciosa máxima en un 79% frente a ninguna intervención (rojo), y la retrasan ~75 días — ganando tiempo para la capacidad sanitaria.",

  peakScenarios: [
    { name: "Sin intervención", peak: 38, color: "#ef4444" },
    { name: "Mascarillas (60% adopción)", peak: 22, color: "#f97316" },
    { name: "Cierre escolar", peak: 20, color: "#3b82f6" },
    { name: "Teletrabajo (40% de la fuerza laboral)", peak: 18, color: "#8b5cf6" },
    { name: "Mascarillas + teletrabajo", peak: 13, color: "#22d3ee" },
    { name: "Todo combinado", peak: 8, color: "#a3e635" },
  ],
  peakXLabel: "% Máximo de Población Infecciosa (mediana sobre 1.000 ejecuciones Monte Carlo)",
  fig3label: "Fig 3.",
  fig3caption: "Fracción infecciosa máxima por escenario de intervención. Las intervenciones combinadas son superaditivas — el escenario combinado (8%) está muy por debajo de la suma de las reducciones individuales, reflejando efectos de interacción no lineales en la red de transmisión.",

  s1step: "Paso 01",
  s1title: "Generación de Población Sintética",
  s1p1pre: "La simulación comienza con una ",
  s1p1bold: "población sintética",
  s1p1post: " de ~200k agentes que coincide con la estructura demográfica del condado de Tippecanoe a partir de datos del Censo: distribución de edades, tamaños de hogares, tasas de empleo, matriculación escolar y composición de la fuerza laboral. A cada agente se le asigna un hogar, y ya sea una escuela o lugar de trabajo según su perfil demográfico.",
  s1p2: "Los agentes siguen horarios diarios probabilísticos: casa al trabajo o la escuela durante el día, recados opcionales (supermercado, restaurante, recreación) por la tarde, casa por la noche. Cada tipo de lugar tiene una tasa de contacto diferente y una probabilidad de transmisión por contacto diferente — consistente con la literatura epidemiológica en ese momento.",
  callout1: "La síntesis de población es la mitad del trabajo — y el paso más subestimado. La estructura de la red de contactos (quién se encuentra con quién, dónde y durante cuánto tiempo) impulsa la mayor parte de la varianza en los resultados. Una población sintética que refleja con precisión la estructura demográfica y social del condado real es lo que hace que la simulación sea accionable en lugar de meramente ilustrativa.",

  s2step: "Paso 02",
  s2title: "Modelo de Transmisión: SEIR Estocástico",
  s2p1: "La transmisión sigue un modelo SEIR estocástico superpuesto sobre la red de contactos. Cada día, los agentes susceptibles obtienen contactos de su ubicación actual. Cada contacto con un agente infeccioso resulta en infección con una probabilidad determinada por el tipo de lugar, el uso de mascarilla y los parámetros de transmisión base.",
  s2p2: "El enfoque estocástico — obtener contactos y resultados de transmisión probabilísticamente en lugar de de forma determinista — significa que una sola ejecución del modelo produce una sola trayectoria. La distribución a lo largo de 1.000 ejecuciones revela tanto el resultado esperado como la incertidumbre a su alrededor. Esto es fundamental para comunicarse con los responsables políticos: no «las infecciones máximas serán X», sino «las infecciones máximas serán X ± Y en el percentil 80.»",

  s3step: "Paso 03",
  s3title: "12 Escenarios de Intervención",
  s3p1: "Se modelaron doce escenarios, variando tres parámetros: tasa de adopción de mascarillas (0%, 40%, 80%), estado escolar (abierto/cerrado) y fracción de teletrabajo (0%, 40% de la fuerza laboral elegible). Cada escenario se ejecutó durante una ventana de 365 días comenzando desde un único caso sembrado.",
  s3p2: "Las mascarillas se modelaron como una reducción del 60% en la probabilidad de transmisión por contacto para un agente con mascarilla (basado en la literatura sobre eficiencia de filtración en ese momento). El cierre escolar eliminó los grafos de contacto escolar por completo. El teletrabajo trasladó los contactos laborales al hogar, donde las probabilidades de transmisión difieren.",

  s4step: "Paso 04",
  s4title: "Efectos Combinados Superaditivos",
  s4p1pre: "El hallazgo más llamativo fue el ",
  s4p1bold: "efecto superaditivo",
  s4p1post: " de las intervenciones combinadas. Las mascarillas solas redujeron las infecciones máximas en ~42%. El cierre escolar solo las redujo en ~47%. Combinadas, redujeron las infecciones máximas en ~79% — muy por encima de la suma de los efectos individuales.",
  s4p2: "Esta superaditividad surge de la estructura de la red: cada intervención corta una vía de transmisión diferente. Las mascarillas reducen la transmisión por contacto en todas partes. Los cierres escolares eliminan un entorno de contacto de alta densidad. El teletrabajo reduce otro. Cuando se cortan las tres vías simultáneamente, el virus tiene menos rutas para propagarse, y la reducción multiplicativa en el R-efectivo es mucho mayor que cualquier corte de una sola vía.",

  metrics: [
    { label: "agentes sintéticos en el modelo", value: "~200k", sub: "coincidiendo con la demografía del condado" },
    { label: "escenarios de intervención evaluados", value: "12", sub: "variando mascarillas · escuelas · teletrabajo" },
    { label: "réplicas de Monte Carlo por escenario", value: "1.000", sub: "para cuantificación de incertidumbre" },
    { label: "reducción máxima (intervenciones combinadas)", value: "−79%", sub: "vs ninguna intervención" },
  ],

  s5step: "Lo Que Funciona",
  s5title: "Modelos Basados en Agentes para la Incertidumbre Política",
  s5p1bold: "1. Los modelos basados en agentes estocásticos comunican la incertidumbre de una manera que los modelos compartimentales no pueden.",
  s5p1: " Mostrar a los responsables políticos una distribución de resultados — con una banda del percentil 20-80 — es más honesto y más útil que una única trayectoria determinista. La incertidumbre es real, y el modelo debe reflejarla.",
  s5p2bold: "2. La superaditividad es un efecto de red, no una coincidencia.",
  s5p2: " Entender que las intervenciones combinadas son superaditivas porque cortan diferentes vías de transmisión cambia la forma en que se piensa en la secuenciación de políticas. No es «elegir la mejor» — es «combinar múltiples intervenciones moderadas para efectos multiplicativos.»",
  s5p3bold: "3. La síntesis de población es donde el modelado gana credibilidad.",
  s5p3: " Un modelo SEIR que no tiene en cuenta la estructura de las redes de contacto subestimará tanto la velocidad de propagación como la eficacia relativa de las intervenciones que apuntan a tipos de contacto específicos. Acertar con la población es el prerrequisito para acertar con las predicciones.",
};

// ── Diagram components ────────────────────────────────────────────────────────

function SEIRDiagram({ tx }: { tx: typeof en }) {
  const items: ({ letter: string; label: string; color: string; sub: string } | { arrow: string; sub: string })[] = [];
  let ai = 0;
  tx.seirCompartments.forEach((c, i) => {
    items.push(c);
    if (i < tx.seirCompartments.length - 1) items.push(tx.seirArrows[ai++]);
  });

  return (
    <figure className="select-none">
      <div className="rounded-xl bg-bg-elev/50 border border-border p-6">
        <div className="flex items-center justify-center gap-0">
          {items.map((item, i) => {
            if ("arrow" in item) {
              return (
                <div key={i} className="flex flex-col items-center mx-1 sm:mx-2 shrink-0">
                  <div className="flex items-center gap-0.5">
                    <div className="h-px w-8 sm:w-12 bg-border/60" />
                    <span className="text-ink-subtle text-sm">→</span>
                  </div>
                  <p className="text-[9px] font-mono text-accent mt-0.5 text-center">{item.arrow}</p>
                  <p className="text-[8px] text-ink-subtle text-center max-w-[60px] hidden sm:block">{item.sub}</p>
                </div>
              );
            }
            const c = item as { letter: string; label: string; color: string; sub: string };
            return (
              <div key={i} className="rounded-2xl border w-16 sm:w-20 h-20 sm:h-24 flex flex-col items-center justify-center shrink-0" style={{ borderColor: c.color + "60", background: c.color + "12" }}>
                <p className="text-2xl font-bold" style={{ color: c.color }}>{c.letter}</p>
                <p className="text-[9px] font-semibold text-ink mt-0.5">{c.label}</p>
                <p className="text-[8px] text-ink-subtle mt-0.5 text-center px-1 hidden sm:block">{c.sub}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2">
          {tx.seirParams.map(({ param, val, note }) => (
            <div key={param} className="rounded-lg bg-bg-card border border-border/40 px-3 py-2">
              <p className="font-mono text-[10px] text-ink-subtle">{param}</p>
              <p className="text-sm font-semibold text-ink mt-0.5">{val}</p>
              <p className="text-[9px] text-ink-muted mt-0.5">{note}</p>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-3 text-xs text-ink-subtle text-center">
        <span className="text-ink-muted font-medium">{tx.fig1label}</span>{" "}{tx.fig1caption}
      </figcaption>
    </figure>
  );
}

function InfectionCurves({ tx }: { tx: typeof en }) {
  const W = 560, H = 230;
  const pl = 52, pr = 20, pt = 20, pb = 44;
  const cW = W - pl - pr, cH = H - pt - pb;
  const days = 365;
  const xd = (d: number) => pl + (d / days) * cW;
  const ys = (v: number) => pt + cH - (v / 0.42) * cH;
  const makeCurve = (peakFrac: number, peakDay: number) =>
    Array.from({ length: days + 1 }, (_, d) => {
      const spread = peakDay * 0.7;
      return peakFrac * Math.exp(-0.5 * Math.pow((d - peakDay) / spread, 2));
    });

  return (
    <figure className="select-none">
      <div className="rounded-xl bg-bg-elev/50 border border-border p-5 pb-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden="true">
          {[0.1, 0.2, 0.3].map((v) => (
            <g key={v}>
              <line x1={pl} y1={ys(v)} x2={pl + cW} y2={ys(v)} stroke="rgba(255,255,255,0.05)" />
              <text x={pl - 6} y={ys(v) + 3} textAnchor="end" fill="rgba(255,255,255,0.28)" fontSize={9}>{(v * 100).toFixed(0)}%</text>
            </g>
          ))}
          {[0, 90, 180, 270, 365].map((d) => (
            <g key={d}>
              <line x1={xd(d)} y1={pt} x2={xd(d)} y2={pt + cH} stroke="rgba(255,255,255,0.05)" />
              <text x={xd(d)} y={pt + cH + 14} textAnchor="middle" fill="rgba(255,255,255,0.28)" fontSize={9}>Day {d}</text>
            </g>
          ))}
          <line x1={pl} y1={pt} x2={pl} y2={pt + cH} stroke="rgba(255,255,255,0.1)" />
          <line x1={pl} y1={pt + cH} x2={pl + cW} y2={pt + cH} stroke="rgba(255,255,255,0.1)" />
          {tx.curveScenarios.map(({ peak, peakDay, color }, si) => {
            const vals = makeCurve(peak, peakDay);
            const path = vals.filter((_, i) => i % 3 === 0).map((v, i) => `${i === 0 ? "M" : "L"}${xd(i * 3).toFixed(1)},${ys(v).toFixed(1)}`).join(" ");
            return <path key={si} d={path} fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round" />;
          })}
          {tx.curveScenarios.map(({ name, color }, i) => (
            <g key={name}>
              <line x1={pl + 6} y1={pt + 12 + i * 16} x2={pl + 20} y2={pt + 12 + i * 16} stroke={color} strokeWidth={2} />
              <text x={pl + 24} y={pt + 16 + i * 16} fill="rgba(255,255,255,0.6)" fontSize={9}>{name}</text>
            </g>
          ))}
          <text x={12} y={pt + cH / 2} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize={9} transform={`rotate(-90 12 ${pt + cH / 2})`}>{tx.curveYLabel}</text>
          <text x={pl + cW / 2} y={H - 5} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize={9}>{tx.curveXLabel}</text>
        </svg>
      </div>
      <figcaption className="mt-3 text-xs text-ink-subtle text-center">
        <span className="text-ink-muted font-medium">{tx.fig2label}</span>{" "}{tx.fig2caption}
      </figcaption>
    </figure>
  );
}

function PeakReductionChart({ tx }: { tx: typeof en }) {
  const W = 520, H = 200;
  const pl = 200, pr = 80, pt = 16, pb = 36;
  const cW = W - pl - pr, cH = H - pt - pb;
  const maxP = 42;
  const slotH = cH / tx.peakScenarios.length - 3;

  return (
    <figure className="select-none">
      <div className="rounded-xl bg-bg-elev/50 border border-border p-5 pb-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden="true">
          {[10, 20, 30, 40].map((v) => {
            const x = pl + (v / maxP) * cW;
            return (
              <g key={v}>
                <line x1={x} y1={pt - 4} x2={x} y2={pt + cH + 4} stroke="rgba(255,255,255,0.06)" />
                <text x={x} y={pt + cH + 15} textAnchor="middle" fill="rgba(255,255,255,0.28)" fontSize={9}>{v}%</text>
              </g>
            );
          })}
          {tx.peakScenarios.map(({ name, peak, color }, i) => {
            const y = pt + i * (cH / tx.peakScenarios.length) + 1;
            const bW = (peak / maxP) * cW;
            return (
              <g key={name}>
                <text x={pl - 6} y={y + slotH / 2 + 3} textAnchor="end" fill="rgba(255,255,255,0.55)" fontSize={9}>{name}</text>
                <rect x={pl} y={y} width={bW} height={slotH} fill={color} fillOpacity={0.8} rx={3} />
                <text x={pl + bW + 5} y={y + slotH / 2 + 3} fill="rgba(255,255,255,0.7)" fontSize={9}>{peak}%</text>
              </g>
            );
          })}
          <line x1={pl} y1={pt} x2={pl} y2={pt + cH} stroke="rgba(255,255,255,0.1)" />
          <text x={pl + cW / 2} y={H - 5} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize={9}>{tx.peakXLabel}</text>
        </svg>
      </div>
      <figcaption className="mt-3 text-xs text-ink-subtle text-center">
        <span className="text-ink-muted font-medium">{tx.fig3label}</span>{" "}{tx.fig3caption}
      </figcaption>
    </figure>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function CovidSimContent() {
  const { lang } = useLang();
  const tx = lang === "es" ? es : en;

  return (
    <article className="pt-32 pb-24">
      <BackLink />
      <ArticleHeader
        eyebrow="Research · Purdue University · Prof. Mario Ventresca · Summer 2020"
        title="COVID-19 Agent-Based Simulation"
        subtitle={tx.subtitle}
        tags={["Stochastic Simulation", "Agent-Based Modeling", "SEIR", "Monte Carlo", "R", "Public Health"]}
      />

      <div className="container-page mt-16">
        <Prose>
          <P>{tx.openP1}</P>
          <P>{tx.openP2}</P>
          <P>{tx.openP3}</P>
        </Prose>

        <Prose>
          <SH id="population" step={tx.s1step}>{tx.s1title}</SH>
          <P>{tx.s1p1pre}<B>{tx.s1p1bold}</B>{tx.s1p1post}</P>
          <P>{tx.s1p2}</P>
          <Callout>{tx.callout1}</Callout>
        </Prose>

        <Prose>
          <SH id="model" step={tx.s2step}>{tx.s2title}</SH>
          <P>{tx.s2p1}</P>
        </Prose>

        <Wide><SEIRDiagram tx={tx} /></Wide>

        <Prose>
          <P>{tx.s2p2}</P>
        </Prose>

        <Prose>
          <SH id="interventions" step={tx.s3step}>{tx.s3title}</SH>
          <P>{tx.s3p1}</P>
          <P>{tx.s3p2}</P>
        </Prose>

        <Wide><InfectionCurves tx={tx} /></Wide>

        <Prose>
          <SH id="results" step={tx.s4step}>{tx.s4title}</SH>
          <P>{tx.s4p1pre}<B>{tx.s4p1bold}</B>{tx.s4p1post}</P>
          <P>{tx.s4p2}</P>
        </Prose>

        <Wide><PeakReductionChart tx={tx} /></Wide>

        <MetricStrip metrics={tx.metrics} />

        <Prose>
          <SH id="takeaways" step={tx.s5step}>{tx.s5title}</SH>
          <P><B>{tx.s5p1bold}</B>{tx.s5p1}</P>
          <P><B>{tx.s5p2bold}</B>{tx.s5p2}</P>
          <P><B>{tx.s5p3bold}</B>{tx.s5p3}</P>
        </Prose>

        <NextProject slug="ai-therapist" />
      </div>
    </article>
  );
}

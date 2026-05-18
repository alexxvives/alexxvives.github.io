"use client";

import { useLang } from "@/lib/lang";
import {
  Prose, Wide, B, Em, SH, P, Callout, OptionBox,
  MetricStrip, NextProject, ArticleHeader, BackLink,
} from "../_article";

// ── translations ─────────────────────────────────────────────────────────────

const en = {
  subtitle:
    "Predicting 2-year customer profitability to shift marketing strategy from volume acquisition to value acquisition — without spending more.",
  openP1:
    "Santander's marketing machine was optimized for one thing: getting as many people as possible to open an account. The campaigns were efficient at volume. They were terrible at selecting",
  openP1em: "which",
  openP1b: "people to acquire.",
  openP2:
    "The result was a growing book of low-value customers who held small balances, rarely cross-purchased, and drove up cost-to-serve ratios. The business had no way to distinguish between a prospect worth $4,000 in lifetime margin and one worth $400 — not before acquisition, at least. Every lead was treated equally.",
  openP3:
    "The ask: build a model that scores every prospect by expected 2-year profitability before the campaign runs, so spend can be redirected toward the right people.",

  s1step: "Step 01",
  s1title: "Defining the Right Target Variable",
  s1p1pre: "The first and most important decision wasn't modeling — it was",
  s1p1bold: "what to model",
  s1p1post:
    ". Customer lifetime value (CLTV) is a slippery target. There are many ways to define it, and the choice shapes everything downstream.",
  s1p2pre: "We settled on",
  s1p2bold: "2-year net contribution margin per customer",
  s1p2post:
    ": deposits multiplied by net interest margin, minus cost-to-serve, minus attrition-adjusted early churn. This definition is grounded in actual P&L, captures the horizon most relevant to the business, and excludes vanity signals like engagement that don't translate to revenue.",
  optTitle: "Two candidate target definitions",
  opt1label: "First-year revenue",
  opt1desc:
    "Deposits × NIM in year one. Simple to compute, quick to validate. Misses long-horizon retention and cross-sell effects.",
  opt2label: "2-year net contribution margin",
  opt2desc:
    "Deposits × NIM − cost-to-serve − attrition-adjusted churn over 24 months. Aligned to P&L and the actual business horizon.",
  optChosen: "2-year net contribution margin",
  optReason:
    "First-year revenue systematically undervalues customers who take time to deepen their relationship with the bank. A customer who opens a savings account in month 1 and a mortgage in month 14 looks mediocre at 12 months and excellent at 24. The longer horizon captures the actual acquisition quality the business cares about.",

  s2step: "Step 02",
  s2title: "Feature Engineering: 180 Signals",
  s2p1pre: "The model was built on",
  s2p1bold: "~180 features",
  s2p1post:
    " drawn from five feature families. Each family captures a different facet of a customer's financial profile:",
  features: [
    { name: "Product Holdings", detail: "accounts, cards, loans, investment products held" },
    { name: "Transaction Velocity", detail: "monthly avg inflows, frequency, ACH vs wire patterns" },
    { name: "Digital Engagement", detail: "login frequency, feature adoption, push notification opens" },
    { name: "Demographics", detail: "age cohort, tenure, acquisition channel, branch proximity" },
    { name: "ZIP-level Enrichment", detail: "median income, employment rate, regional deposit penetration" },
  ],
  s2p2:
    "Transaction velocity features were the most predictive in isolation. Digital engagement was the most incrementally valuable — it added signal beyond what transactions alone captured, especially for identifying dormant accounts early.",

  s3step: "Step 03",
  s3title: "Training, Calibrating, and Deploying",
  s3p1pre: "The model is a",
  s3p1bold1: "gradient-boosted regression (XGBoost)",
  s3p1mid: ", tuned via 5-fold time-aware cross-validation — folds respect chronological order to prevent leakage from the future. The most important architectural decision was adding",
  s3p1bold2: "monotonic constraints",
  s3p1post:
    " on a handful of key features like account tenure and deposit balance: the model was forced to agree that more tenure is weakly better, and more deposits are weakly better. Not because that always holds in the data, but because it has to hold in the business logic — and baking it in made the model legible to risk and compliance reviewers.",
  pipeSteps: [
    { label: "Raw Data", sub: "transactions · deposits · digital · demographics", color: "#3b82f6" },
    { label: "Feature Engineering", sub: "~180 features · rolling windows · ZIP enrichment", color: "#8b5cf6" },
    { label: "XGBoost Regression", sub: "monotonic constraints · 5-fold time-aware CV", color: "#f97316" },
    { label: "Isotonic Calibration", sub: "held-out cohort · reduces distribution shift", color: "#ec4899" },
    { label: "Decile Buckets", sub: "rank-ordered scores → 10 tiers", color: "#a3e635" },
    { label: "Marketing Platform", sub: "Streamlit dashboard · campaign handoff", color: "#22d3ee" },
  ],
  fig1label: "Fig 1.",
  fig1caption:
    "End-to-end CLTV modeling pipeline. Isotonic calibration was critical for risk team sign-off — raw XGBoost scores drifted at the tails.",
  s3p2pre: "After training, raw scores were",
  s3p2bold: "calibrated with isotonic regression",
  s3p2post:
    " on a held-out cohort. XGBoost scores tend to compress at the tails — the model is uncertain about the very top and very bottom, so it pulls predictions toward the mean. Isotonic calibration corrects this, ensuring the top-decile scores actually correspond to top-decile realized margins.",
  callout:
    "Monotonic constraints weren't technically necessary for accuracy — the model learned the right direction anyway. They were necessary for adoption. A compliance reviewer who sees \"higher tenure → lower predicted value\" in a feature plot will kill a project. Good ML engineering includes making the model explainable to the people who have to approve it.",
  calloutBold: "adoption",
  calloutPre:
    "Monotonic constraints weren't technically necessary for accuracy — the model learned the right direction anyway. They were necessary for",
  calloutPost:
    ". A compliance reviewer who sees \"higher tenure → lower predicted value\" in a feature plot will kill a project. Good ML engineering includes making the model explainable to the people who have to approve it.",
  s3p3pre: "Final scores are bucketed into",
  s3p3bold: "deciles",
  s3p3post:
    " for the marketing handoff. Predicted dollar values are noisy — the model can be off by $300 on a $2,000 prediction. But rank order is very stable. Giving marketers a \"top decile / mid tier / low tier\" interface, rather than raw predictions, makes the output robust to that uncertainty.",
  decileTargetedLabel: "targeted",
  fig2label: "Fig 2.",
  fig2caption:
    "Avg predicted 2-year CLTV by score decile. Redirecting spend to deciles 1–3 (green) doubled the average value per acquired customer vs. random targeting.",
  liftModelLabel: "CLTV model",
  liftRandomLabel: "Random",
  liftAnnot1: "64% of value",
  liftAnnot2: "@ top 50%",
  liftYAxis: "% Value Captured",
  liftXAxis: "% Population Contacted",
  fig3label: "Fig 3.",
  fig3caption:
    "Cumulative lift curve. The model captures 64% of total CLTV by targeting just the top 50% of prospects — vs 50% for random outreach.",

  s4step: "Step 04",
  s4title: "Validation & Results",
  s4p1:
    "The model was validated on 18 months of out-of-time data before deployment. In production, campaigns were rerun with marketing spend redirected to the top three score deciles — and the results held.",
  metrics: [
    { label: "lift in avg deposits per campaign", value: "+18%", sub: "top-3 decile targeting" },
    { label: "acquisition cost reduction", value: "−11%", sub: "same revenue target" },
    { label: "marketing pillars adopted", value: "4", sub: "deposits · lending · cards · wealth" },
    { label: "feature horizon", value: "2 yr", sub: "net contribution margin" },
  ] as { label: string; value: string; sub: string }[],
  s4p2pre:
    "The model was adopted across four marketing pillars at the bank — deposits, lending, credit cards, and wealth management. Each team uses the same scoring infrastructure with the same monthly batch cadence in",
  s4p2bold1: "Snowflake",
  s4p2mid: ", with a",
  s4p2bold2: "Streamlit dashboard",
  s4p2post: " for campaign owners to slice scores by product and filter to their audience.",

  s5step: "What This Gets Right",
  s5title: "Three Things Worth Carrying Forward",
  s5p1bold: "1. Monotonic constraints are a compliance interface, not just a modeling tool.",
  s5p1:
    " They don't always improve accuracy, but they make the model legible to risk reviewers, which is often the difference between a model that ships and one that doesn't in a regulated environment.",
  s5p2bold: "2. Decile buckets are the right interface for marketers.",
  s5p2:
    " Predicted dollar values feel precise but aren't. Rank-ordered tiers are less precise but more actionable and more robust to model uncertainty at the individual level.",
  s5p3bold: "3. The hardest part is defining the target variable, not training the model.",
  s5p3:
    " A well-defined CLTV target aligned to actual P&L is worth more than any hyperparameter tuning. Getting that definition right with the finance team — early — is the most important work in the project.",
};

const es: typeof en = {
  subtitle:
    "Prediciendo la rentabilidad del cliente a 2 años para cambiar la estrategia de marketing de adquisición por volumen a adquisición por valor — sin aumentar el presupuesto.",
  openP1:
    "La máquina de marketing de Santander estaba optimizada para una sola cosa: conseguir que el mayor número posible de personas abriera una cuenta. Las campañas eran eficientes en volumen. Eran pésimas para seleccionar",
  openP1em: "qué",
  openP1b: "personas adquirir.",
  openP2:
    "El resultado fue una cartera creciente de clientes de bajo valor con saldos pequeños, escasas ventas cruzadas y ratios de coste elevados. El negocio no podía distinguir entre un prospecto que vale $4.000 en margen de vida y uno que vale $400 — al menos antes de la adquisición. Todos los leads se trataban igual.",
  openP3:
    "El objetivo: construir un modelo que puntúe a cada prospecto según su rentabilidad esperada a 2 años antes de lanzar la campaña, para redirigir el gasto hacia las personas adecuadas.",

  s1step: "Paso 01",
  s1title: "Definir la Variable Objetivo Correcta",
  s1p1pre: "La primera e más importante decisión no era de modelado — era",
  s1p1bold: "qué modelar",
  s1p1post:
    ". El valor del tiempo de vida del cliente (CLTV) es un objetivo escurridizo. Hay muchas formas de definirlo, y la elección condiciona todo lo demás.",
  s1p2pre: "Optamos por el",
  s1p2bold: "margen neto de contribución a 2 años por cliente",
  s1p2post:
    ": depósitos multiplicados por el margen de interés neto, menos el coste de servicio, menos la pérdida ajustada por abandono anticipado. Esta definición se basa en el P&L real, captura el horizonte más relevante para el negocio y excluye señales de vanidad como el engagement que no se traducen en ingresos.",
  optTitle: "Dos candidatos para la variable objetivo",
  opt1label: "Ingresos del primer año",
  opt1desc:
    "Depósitos × NIM en el primer año. Simple de calcular, rápido de validar. No captura los efectos de retención a largo plazo ni de venta cruzada.",
  opt2label: "Margen neto de contribución a 2 años",
  opt2desc:
    "Depósitos × NIM − coste de servicio − abandono ajustado en 24 meses. Alineado al P&L y al horizonte real del negocio.",
  optChosen: "Margen neto de contribución a 2 años",
  optReason:
    "Los ingresos del primer año infravaloran sistemáticamente a los clientes que tardan en profundizar su relación con el banco. Un cliente que abre una cuenta de ahorro en el mes 1 y una hipoteca en el mes 14 parece mediocre a los 12 meses y excelente a los 24. El horizonte más largo captura la calidad real de adquisición que le importa al negocio.",

  s2step: "Paso 02",
  s2title: "Ingeniería de Variables: 180 Señales",
  s2p1pre: "El modelo se construyó sobre",
  s2p1bold: "~180 variables",
  s2p1post:
    " extraídas de cinco familias de características. Cada familia captura una faceta distinta del perfil financiero del cliente:",
  features: [
    { name: "Productos Contratados", detail: "cuentas, tarjetas, préstamos, productos de inversión" },
    { name: "Velocidad Transaccional", detail: "ingresos medios mensuales, frecuencia, patrones ACH vs. transferencias" },
    { name: "Engagement Digital", detail: "frecuencia de acceso, adopción de funcionalidades, aperturas de notificaciones push" },
    { name: "Demografía", detail: "franja de edad, antigüedad, canal de adquisición, proximidad a sucursal" },
    { name: "Enriquecimiento por ZIP", detail: "renta mediana, tasa de empleo, penetración regional de depósitos" },
  ],
  s2p2:
    "Las variables de velocidad transaccional fueron las más predictivas de forma aislada. El engagement digital fue el más incrementalmente valioso — añadió señal más allá de lo que las transacciones captaban solas, especialmente para identificar cuentas inactivas de forma temprana.",

  s3step: "Paso 03",
  s3title: "Entrenamiento, Calibración y Despliegue",
  s3p1pre: "El modelo es una",
  s3p1bold1: "regresión por gradient boosting (XGBoost)",
  s3p1mid:
    ", ajustada mediante validación cruzada temporal de 5 folds — los folds respetan el orden cronológico para evitar filtración del futuro. La decisión arquitectónica más importante fue añadir",
  s3p1bold2: "restricciones monótonas",
  s3p1post:
    " en un conjunto de variables clave como la antigüedad de cuenta y el saldo de depósitos: el modelo fue forzado a asumir que más antigüedad es ligeramente mejor, y más depósitos también. No porque siempre sea así en los datos, sino porque debe serlo en la lógica del negocio — e incluirlo como restricción hizo el modelo comprensible para los revisores de riesgo y cumplimiento.",
  pipeSteps: [
    { label: "Datos Crudos", sub: "transacciones · depósitos · digital · demografía", color: "#3b82f6" },
    { label: "Ingeniería de Variables", sub: "~180 variables · ventanas temporales · enriquecimiento ZIP", color: "#8b5cf6" },
    { label: "Regresión XGBoost", sub: "restricciones monótonas · CV temporal de 5 folds", color: "#f97316" },
    { label: "Calibración Isotónica", sub: "cohorte de validación · reduce desviación de distribución", color: "#ec4899" },
    { label: "Grupos por Decil", sub: "puntuaciones ordenadas → 10 niveles", color: "#a3e635" },
    { label: "Plataforma de Marketing", sub: "dashboard Streamlit · entrega a campañas", color: "#22d3ee" },
  ],
  fig1label: "Fig 1.",
  fig1caption:
    "Pipeline de modelado CLTV de extremo a extremo. La calibración isotónica fue crítica para la aprobación del equipo de riesgo — las puntuaciones brutas de XGBoost se desviaban en los extremos.",
  s3p2pre: "Tras el entrenamiento, las puntuaciones brutas se",
  s3p2bold: "calibraron con regresión isotónica",
  s3p2post:
    " sobre una cohorte de validación. Las puntuaciones de XGBoost tienden a comprimirse en los extremos — el modelo es incierto sobre los valores muy altos y muy bajos, por lo que acerca las predicciones hacia la media. La calibración isotónica corrige esto, asegurando que las puntuaciones del decil superior correspondan realmente a márgenes realizados del decil superior.",
  callout:
    "Las restricciones monótonas no eran técnicamente necesarias para la precisión — el modelo aprendió la dirección correcta de todos modos. Eran necesarias para la adopción. Un revisor de cumplimiento que vea «mayor antigüedad → menor valor predicho» en un gráfico de variables parará el proyecto. La buena ingeniería de ML incluye hacer el modelo comprensible para quienes tienen que aprobarlo.",
  calloutBold: "adopción",
  calloutPre:
    "Las restricciones monótonas no eran técnicamente necesarias para la precisión — el modelo aprendió la dirección correcta de todos modos. Eran necesarias para",
  calloutPost:
    ". Un revisor de cumplimiento que vea «mayor antigüedad → menor valor predicho» en un gráfico de variables parará el proyecto. La buena ingeniería de ML incluye hacer el modelo comprensible para quienes tienen que aprobarlo.",
  s3p3pre: "Las puntuaciones finales se agrupan en",
  s3p3bold: "deciles",
  s3p3post:
    " para la entrega a marketing. Los valores en dólares predichos son ruidosos — el modelo puede equivocarse en $300 sobre una predicción de $2.000. Pero el orden de ranking es muy estable. Dar a los responsables de marketing una interfaz de «decil superior / nivel medio / nivel bajo», en lugar de predicciones brutas, hace que el resultado sea robusto a esa incertidumbre.",
  decileTargetedLabel: "objetivo",
  fig2label: "Fig 2.",
  fig2caption:
    "CLTV medio predicho a 2 años por decil de puntuación. Redirigir el gasto a los deciles 1–3 (verde) duplicó el valor medio por cliente adquirido frente al targeting aleatorio.",
  liftModelLabel: "Modelo CLTV",
  liftRandomLabel: "Aleatorio",
  liftAnnot1: "64% del valor",
  liftAnnot2: "top 50%",
  liftYAxis: "% Valor Capturado",
  liftXAxis: "% Población Contactada",
  fig3label: "Fig 3.",
  fig3caption:
    "Curva de lift acumulada. El modelo captura el 64% del CLTV total contactando solo al 50% superior de los prospectos — frente al 50% del outreach aleatorio.",

  s4step: "Paso 04",
  s4title: "Validación y Resultados",
  s4p1:
    "El modelo se validó sobre 18 meses de datos fuera del tiempo antes del despliegue. En producción, las campañas se reejecutaron con el gasto de marketing redirigido a los tres primeros deciles de puntuación — y los resultados se mantuvieron.",
  metrics: [
    { label: "incremento depósitos medios por campaña", value: "+18%", sub: "targeting top-3 deciles" },
    { label: "reducción del coste de adquisición", value: "−11%", sub: "mismo objetivo de ingresos" },
    { label: "pilares de marketing adoptados", value: "4", sub: "depósitos · crédito · tarjetas · banca privada" },
    { label: "horizonte del modelo", value: "2 yr", sub: "margen neto de contribución" },
  ],
  s4p2pre:
    "El modelo fue adoptado por cuatro pilares de marketing en el banco — depósitos, crédito, tarjetas y banca privada. Cada equipo usa la misma infraestructura de puntuación con el mismo ciclo mensual en batch en",
  s4p2bold1: "Snowflake",
  s4p2mid: ", con un",
  s4p2bold2: "dashboard en Streamlit",
  s4p2post: " para que los responsables de campaña filtren puntuaciones por producto y audiencia.",

  s5step: "Lo Que Funciona",
  s5title: "Tres Aprendizajes que Vale la Pena Llevarse",
  s5p1bold: "1. Las restricciones monótonas son una interfaz de cumplimiento, no solo una herramienta de modelado.",
  s5p1:
    " No siempre mejoran la precisión, pero hacen el modelo comprensible para los revisores de riesgo, lo que suele ser la diferencia entre un modelo que se despliega y uno que no en un entorno regulado.",
  s5p2bold: "2. Los deciles son la interfaz correcta para los responsables de marketing.",
  s5p2:
    " Los valores en dólares predichos parecen precisos pero no lo son. Los niveles por orden de ranking son menos precisos pero más accionables y más robustos a la incertidumbre del modelo a nivel individual.",
  s5p3bold: "3. La parte más difícil es definir la variable objetivo, no entrenar el modelo.",
  s5p3:
    " Una variable CLTV bien definida y alineada al P&L real vale más que cualquier ajuste de hiperparámetros. Alcanzar esa definición con el equipo de finanzas — de forma temprana — es el trabajo más importante del proyecto.",
};

// ── Diagram components ────────────────────────────────────────────────────────

function MLPipeline({ tx }: { tx: typeof en }) {
  return (
    <figure className="select-none">
      <div className="rounded-xl bg-bg-elev/50 border border-border p-6">
        <div className="flex flex-col sm:flex-row items-stretch gap-0">
          {tx.pipeSteps.map((s, i) => (
            <div key={s.label} className="flex sm:flex-col items-center flex-1 min-w-0">
              <div
                className="rounded-xl border px-3 py-3 text-center flex-1 w-full"
                style={{ borderColor: s.color + "55", background: s.color + "10" }}
              >
                <p className="text-xs font-semibold text-ink leading-snug">{s.label}</p>
                <p className="text-[10px] text-ink-muted mt-1 leading-snug hidden sm:block">{s.sub}</p>
              </div>
              {i < tx.pipeSteps.length - 1 && (
                <div className="flex sm:hidden w-6 shrink-0 items-center justify-center text-ink-subtle text-lg">→</div>
              )}
              <div className={`hidden sm:flex h-5 w-full items-center justify-center text-ink-subtle text-sm${i < tx.pipeSteps.length - 1 ? "" : " invisible"}`}>
                →
              </div>
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

function DecileChart({ tx }: { tx: typeof en }) {
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
            {tx.decileTargetedLabel}
          </text>
        </svg>
      </div>
      <figcaption className="mt-3 text-xs text-ink-subtle text-center">
        <span className="text-ink-muted font-medium">{tx.fig2label}</span>{" "}
        {tx.fig2caption}
      </figcaption>
    </figure>
  );
}

function LiftCurve({ tx }: { tx: typeof en }) {
  const W = 560, H = 220;
  const pl = 44, pr = 20, pt = 20, pb = 40;
  const cW = W - pl - pr, cH = H - pt - pb;
  const xs = (pct: number) => pl + (pct / 100) * cW;
  const ys = (pct: number) => pt + cH - (pct / 100) * cH;

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
          <line
            x1={pl} y1={pt + cH}
            x2={pl + cW} y2={pt}
            stroke="rgba(255,255,255,0.2)"
            strokeDasharray="4,3"
          />
          <path d={dArea} fill="#a3e635" fillOpacity={0.07} />
          <path d={dModel} fill="none" stroke="#a3e635" strokeWidth={2.5} strokeLinejoin="round" />
          <circle cx={xs(50)} cy={ys(64)} r={3.5} fill="#a3e635" />
          <line x1={xs(50)} y1={ys(64)} x2={xs(50)} y2={ys(0)} stroke="#a3e635" strokeOpacity={0.3} strokeDasharray="3,2" />
          <rect x={xs(50) + 6} y={ys(64) - 18} width={62} height={28} rx={3} fill="rgba(0,0,0,0.55)" />
          <text x={xs(50) + 10} y={ys(64) - 6} fill="rgba(255,255,255,0.9)" fontSize={9}>
            {tx.liftAnnot1}
          </text>
          <text x={xs(50) + 10} y={ys(64) + 7} fill="rgba(255,255,255,0.9)" fontSize={9}>
            {tx.liftAnnot2}
          </text>
          <text x={pl + 6} y={ys(96) - 4} fill="#a3e635" fontSize={10}>
            {tx.liftModelLabel}
          </text>
          <text x={pl + cW - 50} y={ys(52) + 14} fill="rgba(255,255,255,0.35)" fontSize={9}>
            {tx.liftRandomLabel}
          </text>
          <text
            x={12}
            y={pt + cH / 2}
            fill="rgba(255,255,255,0.35)"
            fontSize={9}
            textAnchor="middle"
            transform={`rotate(-90 12 ${pt + cH / 2})`}
          >
            {tx.liftYAxis}
          </text>
          <text x={pl + cW / 2} y={H - 4} textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize={9}>
            {tx.liftXAxis}
          </text>
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

export default function CLTVContent() {
  const { lang } = useLang();
  const tx = lang === "es" ? es : en;

  return (
    <article className="pt-32 pb-24">
      <BackLink />
      <ArticleHeader
        eyebrow="Work · Santander Bank · 2024"
        title="Customer Lifetime Value Model"
        subtitle={tx.subtitle}
        tags={["Supervised Learning", "XGBoost", "Marketing", "Snowflake", "Isotonic Calibration"]}
      />

      <div className="container-page mt-16">
        {/* Opening */}
        <Prose>
          <P>
            {tx.openP1} <Em>{tx.openP1em}</Em> {tx.openP1b}
          </P>
          <P>{tx.openP2}</P>
          <P>{tx.openP3}</P>
        </Prose>

        {/* Step 01 */}
        <Prose>
          <SH id="target" step={tx.s1step}>
            {tx.s1title}
          </SH>
          <P>
            {tx.s1p1pre} <B>{tx.s1p1bold}</B>{tx.s1p1post}
          </P>
          <P>
            {tx.s1p2pre} <B>{tx.s1p2bold}</B>{tx.s1p2post}
          </P>
          <OptionBox
            title={tx.optTitle}
            options={[
              { label: tx.opt1label, desc: tx.opt1desc },
              { label: tx.opt2label, desc: tx.opt2desc },
            ]}
            chosenLabel={tx.optChosen}
            reason={tx.optReason}
          />
        </Prose>

        {/* Step 02 */}
        <Prose>
          <SH id="features" step={tx.s2step}>
            {tx.s2title}
          </SH>
          <P>
            {tx.s2p1pre} <B>{tx.s2p1bold}</B>{tx.s2p1post}
          </P>
          <div className="my-6 grid sm:grid-cols-2 gap-3">
            {tx.features.map(({ name, detail }) => (
              <div key={name} className="rounded-xl border border-border/50 bg-bg-elev/30 px-4 py-3">
                <p className="text-sm font-semibold text-ink mb-1">{name}</p>
                <p className="text-xs text-ink-muted leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>
          <P>{tx.s2p2}</P>
        </Prose>

        {/* Step 03 */}
        <Prose>
          <SH id="model" step={tx.s3step}>
            {tx.s3title}
          </SH>
          <P>
            {tx.s3p1pre} <B>{tx.s3p1bold1}</B>{tx.s3p1mid} <B>{tx.s3p1bold2}</B>{tx.s3p1post}
          </P>
        </Prose>

        <Wide>
          <MLPipeline tx={tx} />
        </Wide>

        <Prose>
          <P>
            {tx.s3p2pre} <B>{tx.s3p2bold}</B>{tx.s3p2post}
          </P>
          <Callout>
            {tx.calloutPre} <strong>{tx.calloutBold}</strong>{tx.calloutPost}
          </Callout>
          <P>
            {tx.s3p3pre} <B>{tx.s3p3bold}</B>{tx.s3p3post}
          </P>
        </Prose>

        <Wide>
          <DecileChart tx={tx} />
        </Wide>

        {/* Step 04 */}
        <Prose>
          <SH id="results" step={tx.s4step}>
            {tx.s4title}
          </SH>
          <P>{tx.s4p1}</P>
        </Prose>

        <MetricStrip metrics={tx.metrics} />

        <Wide>
          <LiftCurve tx={tx} />
        </Wide>

        <Prose>
          <P>
            {tx.s4p2pre} <B>{tx.s4p2bold1}</B>{tx.s4p2mid} <B>{tx.s4p2bold2}</B>{tx.s4p2post}
          </P>
        </Prose>

        {/* Takeaways */}
        <Prose>
          <SH id="takeaways" step={tx.s5step}>
            {tx.s5title}
          </SH>
          <P>
            <B>{tx.s5p1bold}</B>{tx.s5p1}
          </P>
          <P>
            <B>{tx.s5p2bold}</B>{tx.s5p2}
          </P>
          <P>
            <B>{tx.s5p3bold}</B>{tx.s5p3}
          </P>
        </Prose>

        <NextProject slug="uplift-model" />
      </div>
    </article>
  );
}

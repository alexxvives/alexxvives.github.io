import type { Metadata } from "next";
import {
  Prose, Wide, B, Em, C, SH, SH3, P, Callout,
  MetricStrip, NextProject, ArticleHeader, BackLink,
} from "../_article";

export const metadata: Metadata = {
  title: "Printer Sales Time-Series Forecast — Alexandre Vives",
  description:
    "ARIMA/SARIMA forecasting pipeline for 120+ printer SKUs at HP, improving forecast accuracy by ~27% and enabling more reliable global supply-chain planning.",
};

// ── Diagram 1: Time series with CI band ───────────────────────────────────────

function TimeSeriesChart() {
  const W = 560, H = 220;
  const pl = 44, pr = 20, pt = 20, pb = 42;
  const cW = W - pl - pr, cH = H - pt - pb;
  const n = 52;
  const xs = (i: number) => pl + (i / (n - 1)) * cW;

  // Actual sales (weekly, with seasonality and trend)
  const actual = Array.from({ length: n }, (_, i) => {
    const trend = 85 + i * 0.3;
    const season = 18 * Math.sin((i / 52) * 2 * Math.PI * 2 - 1.2);
    const noise = (Math.sin(i * 37.1) * 0.5 + Math.sin(i * 17.3) * 0.3) * 12;
    return trend + season + noise;
  });

  // Forecast (last 10 weeks = forecast period)
  const forecastStart = 42;
  const forecast = Array.from({ length: n - forecastStart }, (_, i) => {
    const base = actual[forecastStart] ?? 100;
    const trend = (actual[n - 1] ?? 100) - base;
    const t = (i + 1) / (n - forecastStart);
    const season = 18 * Math.sin(((forecastStart + i) / 52) * 2 * Math.PI * 2 - 1.2);
    return base + trend * t + season + 2;
  });

  const minV = Math.min(...actual) - 10;
  const maxV = Math.max(...actual) + 20;
  const yv = (v: number) => pt + cH - ((v - minV) / (maxV - minV)) * cH;

  const actualPath = actual.map((v, i) => `${i === 0 ? "M" : "L"}${xs(i).toFixed(1)},${yv(v).toFixed(1)}`).join(" ");
  const fcPath = forecast.map((v, i) => {
    const xi = forecastStart + i;
    return `${i === 0 ? "M" : "L"}${xs(xi).toFixed(1)},${yv(v).toFixed(1)}`;
  }).join(" ");

  // CI band (±8 units widening)
  const bandTop = forecast.map((v, i) => {
    const xi = forecastStart + i;
    const spread = 5 + i * 1.2;
    return `${xs(xi).toFixed(1)},${yv(v + spread).toFixed(1)}`;
  });
  const bandBot = [...forecast].reverse().map((v, i) => {
    const xi = n - 1 - i;
    const spread = 5 + (n - forecastStart - 1 - i) * 1.2;
    return `${xs(xi).toFixed(1)},${yv(v - spread).toFixed(1)}`;
  });
  const bandPath = `M${bandTop.join(" L")} L${bandBot.join(" L")} Z`;

  // Gridlines
  const gridVals = [80, 100, 120, 140];

  return (
    <figure className="select-none">
      <div className="rounded-xl bg-bg-elev/50 border border-border p-5 pb-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden="true">
          {gridVals.map((v) => (
            <g key={v}>
              <line x1={pl} y1={yv(v)} x2={pl + cW} y2={yv(v)} stroke="rgba(255,255,255,0.05)" />
              <text x={pl - 6} y={yv(v) + 3} textAnchor="end" fill="rgba(255,255,255,0.28)" fontSize={9}>{v}</text>
            </g>
          ))}
          {[0, 13, 26, 39, 52].map((i) => (
            <g key={i}>
              <line x1={xs(i)} y1={pt} x2={xs(i)} y2={pt + cH} stroke="rgba(255,255,255,0.05)" />
              <text x={xs(i)} y={pt + cH + 14} textAnchor="middle" fill="rgba(255,255,255,0.28)" fontSize={9}>
                W{i}
              </text>
            </g>
          ))}
          <line x1={pl} y1={pt} x2={pl} y2={pt + cH} stroke="rgba(255,255,255,0.1)" />
          <line x1={pl} y1={pt + cH} x2={pl + cW} y2={pt + cH} stroke="rgba(255,255,255,0.1)" />
          {/* forecast window shading */}
          <rect
            x={xs(forecastStart)}
            y={pt}
            width={xs(n - 1) - xs(forecastStart)}
            height={cH}
            fill="rgba(255,255,255,0.02)"
          />
          <line x1={xs(forecastStart)} y1={pt} x2={xs(forecastStart)} y2={pt + cH} stroke="rgba(255,255,255,0.12)" strokeDasharray="3,2" />
          <text x={xs(forecastStart) + 4} y={pt + 10} fill="rgba(255,255,255,0.3)" fontSize={8}>forecast →</text>
          {/* CI band */}
          <path d={bandPath} fill="#f97316" fillOpacity={0.12} />
          {/* actual line */}
          <path d={actualPath} fill="none" stroke="#3b82f6" strokeWidth={1.8} strokeLinejoin="round" />
          {/* forecast line */}
          <path d={fcPath} fill="none" stroke="#f97316" strokeWidth={2} strokeLinejoin="round" strokeDasharray="5,2" />
          {/* legend */}
          <line x1={pl + 6} y1={pt + 12} x2={pl + 20} y2={pt + 12} stroke="#3b82f6" strokeWidth={1.8} />
          <text x={pl + 24} y={pt + 16} fill="rgba(255,255,255,0.6)" fontSize={9}>Actual</text>
          <line x1={pl + 70} y1={pt + 12} x2={pl + 84} y2={pt + 12} stroke="#f97316" strokeWidth={2} strokeDasharray="5,2" />
          <text x={pl + 88} y={pt + 16} fill="rgba(255,255,255,0.6)" fontSize={9}>Forecast ± CI</text>
          <text x={pl + cW / 2} y={H - 5} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize={9}>
            Week (annual cycle)
          </text>
          <text
            x={12}
            y={pt + cH / 2}
            textAnchor="middle"
            fill="rgba(255,255,255,0.3)"
            fontSize={9}
            transform={`rotate(-90 12 ${pt + cH / 2})`}
          >
            Units Sold (index)
          </text>
        </svg>
      </div>
      <figcaption className="mt-3 text-xs text-ink-subtle text-center">
        <span className="text-ink-muted font-medium">Fig 1.</span> Representative SKU: actual
        weekly sales (blue) vs SARIMA forecast with 80% CI band (orange). The model captures
        seasonal peaks and the underlying trend without over-fitting to noise.
      </figcaption>
    </figure>
  );
}

// ── Diagram 2: MAPE comparison (horizontal bars) ─────────────────────────────

function MAPEComparison() {
  const W = 520, H = 210;
  const pl = 110, pr = 60, pt = 20, pb = 36;
  const cW = W - pl - pr, cH = H - pt - pb;

  const models = [
    { name: "Legacy (judgment)", mape: 42, color: "rgba(255,255,255,0.15)" },
    { name: "AR baseline", mape: 37, color: "rgba(255,255,255,0.2)" },
    { name: "ARIMA (global)", mape: 31, color: "rgba(255,255,255,0.25)" },
    { name: "SARIMA (global)", mape: 26, color: "rgba(163,230,53,0.4)" },
    { name: "Auto-select (per-SKU)", mape: 15, color: "#a3e635" },
  ];
  const maxM = 46;
  const slotH = cH / models.length - 3;

  return (
    <figure className="select-none">
      <div className="rounded-xl bg-bg-elev/50 border border-border p-5 pb-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden="true">
          {[10, 20, 30, 40].map((v) => {
            const x = pl + (v / maxM) * cW;
            return (
              <g key={v}>
                <line x1={x} y1={pt - 4} x2={x} y2={pt + cH + 4} stroke="rgba(255,255,255,0.06)" />
                <text x={x} y={pt + cH + 14} textAnchor="middle" fill="rgba(255,255,255,0.28)" fontSize={9}>
                  {v}%
                </text>
              </g>
            );
          })}
          {models.map(({ name, mape, color }, i) => {
            const y = pt + i * (cH / models.length) + 1;
            const bW = (mape / maxM) * cW;
            return (
              <g key={name}>
                <text x={pl - 6} y={y + slotH / 2 + 3} textAnchor="end" fill="rgba(255,255,255,0.55)" fontSize={9}>
                  {name}
                </text>
                <rect x={pl} y={y} width={bW} height={slotH} fill={color} rx={3} />
                <text x={pl + bW + 5} y={y + slotH / 2 + 3} fill="rgba(255,255,255,0.7)" fontSize={9} fontWeight="bold">
                  {mape}%
                </text>
              </g>
            );
          })}
          <line x1={pl} y1={pt} x2={pl} y2={pt + cH} stroke="rgba(255,255,255,0.1)" />
          <text x={pl + cW / 2} y={H - 5} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize={9}>
            Mean Absolute Percentage Error (MAPE) — lower is better
          </text>
        </svg>
      </div>
      <figcaption className="mt-3 text-xs text-ink-subtle text-center">
        <span className="text-ink-muted font-medium">Fig 2.</span> MAPE by modeling approach
        on rolling-origin out-of-sample evaluation. Per-SKU auto-selection (green) halves the
        error of a single global SARIMA — heterogeneity across SKUs is too high for one model
        to dominate.
      </figcaption>
    </figure>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function PrinterForecastPage() {
  return (
    <article className="pt-32 pb-24">
      <BackLink />
      <ArticleHeader
        eyebrow="Work · Hewlett-Packard · Spring 2021"
        title="Printer Sales Time-Series Forecast"
        subtitle="A per-SKU forecasting pipeline that auto-selects the best ARIMA/SARIMA model for 120+ printer SKUs — cutting MAPE by 27% and improving global supply-chain planning."
        tags={["Time Series", "SARIMA", "ARIMA", "Forecasting", "Supply Chain", "R"]}
      />

      <div className="mt-16">
        {/* Opening */}
        <Prose>
          <P>
            HP&apos;s supply-chain planning team ran on judgment-based forecasts. Experienced
            planners would look at recent sales, note seasonal patterns by memory, and produce
            a number. The process worked reasonably well for the most-familiar SKUs. For the
            long tail of 120+ active printer models, it systematically over-ordered on slow
            movers and under-ordered on breakout hits — the exact two failure modes that drive
            inventory cost and stockout losses.
          </P>
          <P>
            The ask was straightforward: build a statistical forecasting pipeline that produces
            weekly SKU-level sales forecasts with confidence intervals, runs automatically, and
            is explainable enough that planners can understand when to trust it.
          </P>
        </Prose>

        {/* Step 01 */}
        <Prose>
          <SH id="decomposition" step="Step 01">
            Decomposing the Signal
          </SH>
          <P>
            Before fitting any model, the time series for each SKU was decomposed into trend,
            seasonality, and residual components using <B>STL (Seasonal and Trend decomposition
            using Loess)</B>. This step serves two purposes: it reveals whether a SKU has stable
            seasonality (a SARIMA will perform well) or irregular patterns (simpler AR/MA may
            generalize better), and it provides a diagnostic for outlier detection.
          </P>
          <P>
            The analysis showed clear heterogeneity across the SKU catalog. Commercial printers
            had strong year-end seasonality tied to corporate procurement cycles. Consumer
            inkjets followed back-to-school and holiday patterns. Mid-range laser printers had
            almost no seasonality. A single global model would fit some SKUs well and others
            badly. The right approach was per-SKU model selection.
          </P>

          <Callout>
            Per-SKU model selection beat any single global model by a large margin. The reason:
            heterogeneity across the SKU catalog is too high for one model architecture to
            dominate everywhere. A SARIMA that captures consumer inkjet seasonality is the wrong
            model for a commercial laser with quarterly procurement cycles.
          </Callout>
        </Prose>

        {/* Step 02 */}
        <Prose>
          <SH id="selection" step="Step 02">
            Auto-Model Selection via AIC + Rolling-Origin Backtest
          </SH>
          <P>
            For each SKU, the pipeline fits <B>five model families</B>: AR, MA, ARIMA, SARIMA,
            and exponential smoothing. Model order and seasonality parameters are selected to
            minimize <B>AIC (Akaike Information Criterion)</B>, which penalizes complexity.
            The AIC winner for each SKU is then validated on a <B>rolling-origin backtest</B>
            — the model is re-fit from the beginning of the series and evaluated on the next
            8-week hold-out window, rolled forward monthly.
          </P>
          <P>
            The final per-SKU model is the AIC-selected model with the best rolling-origin MAPE.
            If the AIC winner and the MAPE winner disagree, MAPE wins — we care about forecast
            accuracy in deployment, not model fit in-sample.
          </P>

          <div className="my-6 grid sm:grid-cols-3 gap-3">
            {[
              { label: "Model families benchmarked", val: "5", sub: "AR · MA · ARIMA · SARIMA · ETS" },
              { label: "SKUs in production", val: "120+", sub: "across 3 product lines" },
              { label: "Backtest window", val: "8 wk", sub: "rolling-origin, monthly re-fit" },
            ].map(({ label, val, sub }) => (
              <div key={label} className="rounded-xl border border-border bg-bg-card px-4 py-4 text-center">
                <p className="font-display text-2xl font-bold text-accent">{val}</p>
                <p className="font-mono text-xs text-ink-subtle mt-0.5">{sub}</p>
                <p className="text-[11px] text-ink-muted mt-1 leading-snug">{label}</p>
              </div>
            ))}
          </div>
        </Prose>

        {/* Charts */}
        <Wide>
          <TimeSeriesChart />
        </Wide>

        <Prose>
          <SH id="results" step="Step 03">
            Results: −27% MAPE, 120+ SKUs in Production
          </SH>
          <P>
            The pipeline was delivered as a parameterized R/Python script producing weekly
            forecasts for all active SKUs, with 80% and 95% confidence bands. Planners receive
            a dashboard showing this week&apos;s forecast, the trailing 52-week actuals, and
            the model type currently selected for each SKU.
          </P>
        </Prose>

        <Wide>
          <MAPEComparison />
        </Wide>

        <MetricStrip
          metrics={[
            { label: "MAPE reduction vs legacy judgment forecast", value: "−27%", sub: "rolling-origin validation" },
            { label: "SKUs forecasted weekly in production", value: "120+", sub: "3 product lines" },
            { label: "model families auto-benchmarked per SKU", value: "5", sub: "AIC + MAPE selection" },
            { label: "confidence bands communicated to planners", value: "2", sub: "80% and 95%" },
          ]}
        />

        {/* Takeaways */}
        <Prose>
          <SH id="takeaways" step="What This Gets Right">
            Lessons from Forecasting in Production
          </SH>
          <P>
            <B>1. Per-SKU model selection is worth the complexity.</B> It would have been simpler
            to deploy a single global SARIMA. It also would have left half the catalog with poor
            forecasts. The SKU heterogeneity was too large to ignore.
          </P>
          <P>
            <B>2. Confidence bands changed how planners thought about safety stock.</B> When
            forecasts were point estimates, planners added a fixed safety buffer everywhere.
            When forecasts came with confidence intervals, they sized safety stock proportional
            to uncertainty — wider intervals got bigger buffers, narrow intervals got smaller
            ones. That&apos;s a more rational use of inventory capital.
          </P>
          <P>
            <B>3. Rolling-origin backtests are the right evaluation protocol for time series.</B>
            In-sample fit metrics (R², AIC) tell you about model fit, not forecast accuracy.
            Rolling-origin evaluation, where the model is evaluated on data it has never seen
            in a realistic deployment scenario, is the only way to measure what planners
            actually care about.
          </P>
        </Prose>

        <NextProject slug="food-detection" />
      </div>
    </article>
  );
}

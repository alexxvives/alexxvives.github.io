"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  ReferenceLine,
} from "recharts";

const ACCENT = "#a3e635";
const MUTED = "#a1a1aa";

// ─── Cumulative conversion lift over ramp ───
const rampData = Array.from({ length: 14 }, (_, i) => {
  const day = i + 1;
  // baseline ~ 12.4%, treatment ramps to ~12.78
  const treatment = 12.4 + 0.38 * (1 - Math.exp(-day / 4)) + (Math.random() - 0.5) * 0.05;
  const control = 12.4 + (Math.random() - 0.5) * 0.05;
  return {
    day: `D${day}`,
    Treatment: +treatment.toFixed(3),
    Control: +control.toFixed(3),
  };
});

// ─── Power analysis curve ───
const powerData = Array.from({ length: 21 }, (_, i) => {
  const n = 0.5 + i * 0.15; // millions per arm
  // approximate power for detecting 1% relative lift at p0=0.124
  const z = (Math.sqrt(n * 1e6) * 0.001) / Math.sqrt(2 * 0.124 * (1 - 0.124));
  const power = Math.min(0.999, 0.5 + 0.5 * erf(z));
  return { n: +n.toFixed(2), power: +(power * 100).toFixed(1) };
});

// ─── Heterogeneous treatment effects ───
const hteData = [
  { group: "Dormant", lift: 6.9 },
  { group: "APAC", lift: 5.1 },
  { group: "New users", lift: 4.4 },
  { group: "LatAm", lift: 4.2 },
  { group: "EU", lift: 3.0 },
  { group: "Engaged", lift: 2.6 },
  { group: "US", lift: 1.4 },
  { group: "US · 3+ purch.", lift: 0.2 },
];

// ─── Buyer funnel: per-stage conversion, control vs. treatment ───
// Values are "per 1,000 exposed users" so the visual is intuitive.
const funnelStages = [
  { stage: "Impressions",      control: 1000, treatment: 1000 },
  { stage: "Product clicks",   control:  420, treatment:  443 }, // +5.4%
  { stage: "Product views",    control:  160, treatment:  168 }, // +4.8%
  { stage: "Add to cart",      control:   58, treatment:   60.4 }, // +4.1%
  { stage: "Checkout started", control:   31, treatment:   32.1 }, // +3.5%
  { stage: "Orders placed",    control:   20, treatment:   20.6 }, // +3.1%
];

function CustomerFunnel() {
  const max = funnelStages[0].control;
  return (
    <div className="card p-6">
      <div className="mb-2">
        <h3 className="text-sm font-semibold text-ink">Buyer funnel · per 1,000 exposed users</h3>
        <p className="text-xs text-ink-subtle mt-0.5">
          Control vs. treatment at each step. The win has to survive the whole funnel, not just the click.
        </p>
      </div>
      <div className="mt-6 flex items-center gap-4 text-[11px] font-mono text-ink-muted">
        <span className="inline-flex items-center gap-1.5"><span className="h-2 w-3 rounded-sm" style={{ background: MUTED }} /> control</span>
        <span className="inline-flex items-center gap-1.5"><span className="h-2 w-3 rounded-sm" style={{ background: ACCENT }} /> treatment</span>
      </div>
      <div className="mt-4 space-y-3">
        {funnelStages.map((s, i) => {
          const cw = (s.control / max) * 100;
          const tw = (s.treatment / max) * 100;
          const lift = ((s.treatment - s.control) / s.control) * 100;
          return (
            <div key={s.stage} className="grid grid-cols-[110px_1fr_70px] items-center gap-3 text-xs">
              <div className="font-mono text-ink-muted text-right text-[11px]">
                <div>{s.stage}</div>
                <div className="text-ink-subtle text-[10px]">step {i + 1}</div>
              </div>
              <div className="space-y-1.5">
                <div className="relative h-3.5 w-full">
                  <div className="absolute inset-y-0 left-0 rounded-sm" style={{ width: `${cw}%`, background: MUTED, opacity: 0.55 }} />
                  <span className="absolute right-0 -top-0.5 text-[10px] font-mono text-ink-subtle">{s.control.toLocaleString()}</span>
                </div>
                <div className="relative h-3.5 w-full">
                  <div className="absolute inset-y-0 left-0 rounded-sm" style={{ width: `${tw}%`, background: ACCENT }} />
                  <span className="absolute right-0 -top-0.5 text-[10px] font-mono text-accent">{s.treatment.toLocaleString()}</span>
                </div>
              </div>
              <div className={`text-right font-mono font-semibold ${lift > 0 ? "text-accent" : "text-ink-subtle"}`}>
                {lift > 0 ? "+" : ""}{lift.toFixed(1)}%
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-5 text-[11px] text-ink-subtle leading-relaxed">
        Click lift would have looked great in isolation. The real test is whether each step downstream still moves.
        Here it does, attenuating from <span className="text-ink">+5.4% clicks</span> to <span className="text-accent">+3.1% orders</span>.
        A treatment that lit up clicks but flatlined at add-to-cart would have been a clear no-ship.
      </p>
    </div>
  );
}

export function ABTestVisuals() {
  return (
    <div className="space-y-12">
      {/* Buyer funnel — headline visual */}
      <CustomerFunnel />

      {/* Conversion ramp */}
      <ChartCard
        title="Primary metric: orders per exposed user (%)"
        subtitle="Treatment vs. control over the 14-day exposure window · user-level randomization"
      >
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={rampData} margin={{ top: 8, right: 16, left: -8, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f1f23" />
            <XAxis dataKey="day" stroke={MUTED} fontSize={11} />
            <YAxis
              stroke={MUTED}
              fontSize={11}
              domain={[12.2, 13.0]}
              tickFormatter={(v) => `${v.toFixed(1)}%`}
            />
            <Tooltip
              contentStyle={{
                background: "#111113",
                border: "1px solid #1f1f23",
                borderRadius: 8,
                fontSize: 12,
              }}
              formatter={(v: number) => `${v.toFixed(3)}%`}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line
              type="monotone"
              dataKey="Control"
              stroke={MUTED}
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="Treatment"
              stroke={ACCENT}
              strokeWidth={2.5}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Heterogeneous treatment effects */}
      <ChartCard
        title="Heterogeneous treatment effects"
        subtitle="Relative lift in 28-day conversion by pre-registered subgroup"
      >
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={hteData}
            layout="vertical"
            margin={{ top: 8, right: 32, left: 60, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1f1f23" horizontal={false} />
            <XAxis
              type="number"
              stroke={MUTED}
              fontSize={11}
              tickFormatter={(v) => `+${v}%`}
              domain={[0, 8]}
            />
            <YAxis
              type="category"
              dataKey="group"
              stroke={MUTED}
              fontSize={11}
              width={100}
            />
            <Tooltip
              contentStyle={{
                background: "#111113",
                border: "1px solid #1f1f23",
                borderRadius: 8,
                fontSize: 12,
              }}
              formatter={(v: number) => `+${v}%`}
            />
            <ReferenceLine x={3.1} stroke={ACCENT} strokeDasharray="4 4" label={{ value: "ATE +3.1%", fill: ACCENT, fontSize: 10, position: "top" }} />
            <Bar dataKey="lift" fill={ACCENT} radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Power analysis */}
        <ChartCard
          title="Power analysis"
          subtitle="Sample size per arm needed to detect 1% relative lift (α=0.05, two-sided)"
        >
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={powerData} margin={{ top: 8, right: 16, left: -8, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f1f23" />
              <XAxis
                dataKey="n"
                stroke={MUTED}
                fontSize={11}
                label={{ value: "Sample size (M / arm)", fill: MUTED, fontSize: 10, position: "insideBottom", offset: -4 }}
              />
              <YAxis
                stroke={MUTED}
                fontSize={11}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip
                contentStyle={{ background: "#111113", border: "1px solid #1f1f23", borderRadius: 8, fontSize: 12 }}
                formatter={(v: number) => `${v}%`}
              />
              <ReferenceLine y={80} stroke={MUTED} strokeDasharray="4 4" />
              <ReferenceLine x={2.1} stroke={ACCENT} strokeDasharray="4 4" label={{ value: "2.1M", fill: ACCENT, fontSize: 10 }} />
              <Line type="monotone" dataKey="power" stroke={ACCENT} strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Ramp plan illustration */}
        <ChartCard
          title="Ramp plan"
          subtitle="Traffic share to treatment over the first week, with daily guardrail review"
        >
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={[
                { day: "D1", share: 1 },
                { day: "D2", share: 5 },
                { day: "D3", share: 25 },
                { day: "D4", share: 50 },
                { day: "D5", share: 50 },
                { day: "D6", share: 50 },
                { day: "D7", share: 50 },
              ]}
              margin={{ top: 8, right: 16, left: -8, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1f1f23" vertical={false} />
              <XAxis dataKey="day" stroke={MUTED} fontSize={11} />
              <YAxis stroke={MUTED} fontSize={11} tickFormatter={(v) => `${v}%`} domain={[0, 60]} />
              <Tooltip
                contentStyle={{ background: "#111113", border: "1px solid #1f1f23", borderRadius: 8, fontSize: 12 }}
                formatter={(v: number) => `${v}% traffic`}
              />
              <Bar dataKey="share" radius={[6, 6, 0, 0]} fill={ACCENT} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Guardrails */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "p95 latency", value: "+18ms", ok: true, budget: "±25ms" },
          { label: "Ads revenue / user", value: "+0.4%", ok: true, budget: "≥ −1%" },
          { label: "Crash rate", value: "+0.01pp", ok: true, budget: "≤ +0.05pp" },
          { label: "Hide / report rate", value: "−0.2%", ok: true, budget: "≤ +5%" },
        ].map((g) => (
          <div key={g.label} className="card p-4">
            <div className="flex items-center justify-between">
              <div className="text-[10px] uppercase tracking-widest text-ink-subtle">
                Guardrail
              </div>
              <span className="text-accent text-xs">✓</span>
            </div>
            <div className="mt-2 font-mono text-lg text-ink font-semibold">{g.value}</div>
            <div className="text-xs text-ink-muted mt-0.5">{g.label}</div>
            <div className="text-[10px] text-ink-subtle font-mono mt-1">budget {g.budget}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChartCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="card p-6">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-ink">{title}</h3>
        {subtitle && <p className="text-xs text-ink-subtle mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

// Approximation of error function
function erf(x: number): number {
  // Abramowitz and Stegun formula 7.1.26
  const sign = x >= 0 ? 1 : -1;
  x = Math.abs(x);
  const a1 = 0.254829592,
    a2 = -0.284496736,
    a3 = 1.421413741,
    a4 = -1.453152027,
    a5 = 1.061405429,
    p = 0.3275911;
  const t = 1 / (1 + p * x);
  const y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  return sign * y;
}

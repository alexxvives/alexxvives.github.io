"use client";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  LineChart,
  ReferenceLine,
} from "recharts";

const ACCENT = "#a3e635";
const MUTED = "#a1a1aa";

// Qini curve: cumulative incremental conversions vs. % of population targeted
const qiniData = Array.from({ length: 21 }, (_, i) => {
  const p = i * 5; // 0..100
  // Uplift model: concave, peaks early; Random: linear
  const upliftGain = Math.min(100, 100 * (1 - Math.exp(-p / 22)));
  const random = p;
  return { p: `${p}%`, Uplift: +upliftGain.toFixed(1), Random: random };
});

// Uplift by decile
const decileData = Array.from({ length: 10 }, (_, i) => {
  const d = i + 1;
  // Persuadables in top deciles, sleeping dogs at bottom
  const uplift = 8 - (i * 1.5) + (i === 9 ? -1.2 : 0);
  return { decile: `D${d}`, uplift: +uplift.toFixed(2) };
});

export function UpliftVisuals() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="card p-6">
        <h3 className="text-sm font-semibold text-ink">Qini curve</h3>
        <p className="text-xs text-ink-subtle mt-0.5 mb-4">
          Cumulative incremental conversions vs. % population targeted
        </p>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={qiniData} margin={{ top: 8, right: 16, left: -8, bottom: 0 }}>
            <defs>
              <linearGradient id="qiniGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={ACCENT} stopOpacity={0.4} />
                <stop offset="100%" stopColor={ACCENT} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f1f23" />
            <XAxis dataKey="p" stroke={MUTED} fontSize={11} />
            <YAxis stroke={MUTED} fontSize={11} />
            <Tooltip
              contentStyle={{ background: "#111113", border: "1px solid #1f1f23", borderRadius: 8, fontSize: 12 }}
            />
            <Area type="monotone" dataKey="Uplift" stroke={ACCENT} strokeWidth={2.5} fill="url(#qiniGrad)" />
            <Line type="monotone" dataKey="Random" stroke={MUTED} strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="card p-6">
        <h3 className="text-sm font-semibold text-ink">Uplift by decile</h3>
        <p className="text-xs text-ink-subtle mt-0.5 mb-4">
          Bottom decile shows negative uplift — &quot;sleeping dogs&quot; suppressed in campaign
        </p>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={decileData} margin={{ top: 8, right: 16, left: -8, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f1f23" />
            <XAxis dataKey="decile" stroke={MUTED} fontSize={11} />
            <YAxis stroke={MUTED} fontSize={11} tickFormatter={(v) => `${v}%`} />
            <Tooltip
              contentStyle={{ background: "#111113", border: "1px solid #1f1f23", borderRadius: 8, fontSize: 12 }}
              formatter={(v: number) => `${v}%`}
            />
            <ReferenceLine y={0} stroke={MUTED} />
            <Line type="monotone" dataKey="uplift" stroke={ACCENT} strokeWidth={2.5} dot={{ fill: ACCENT, r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

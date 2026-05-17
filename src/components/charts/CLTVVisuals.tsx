"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const ACCENT = "#a3e635";
const MUTED = "#a1a1aa";

const decileRevenue = Array.from({ length: 10 }, (_, i) => {
  const d = 10 - i;
  const value = Math.round(120 * Math.pow(1.45, d - 1));
  return { decile: `D${d}`, value };
});

export function CLTVVisuals() {
  return (
    <div className="card p-6">
      <h3 className="text-sm font-semibold text-ink">Predicted 2-year value by decile</h3>
      <p className="text-xs text-ink-subtle mt-0.5 mb-4">
        Top decile (D10) is predicted to contribute ~25× the bottom decile
      </p>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={decileRevenue} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f1f23" vertical={false} />
          <XAxis dataKey="decile" stroke={MUTED} fontSize={11} />
          <YAxis stroke={MUTED} fontSize={11} tickFormatter={(v) => `$${v}`} />
          <Tooltip
            contentStyle={{ background: "#111113", border: "1px solid #1f1f23", borderRadius: 8, fontSize: 12 }}
            formatter={(v: number) => `$${v}`}
          />
          <Bar dataKey="value" radius={[6, 6, 0, 0]}>
            {decileRevenue.map((d, i) => (
              <Cell
                key={i}
                fill={i < 3 ? ACCENT : i < 6 ? "#65a30d" : "#3f3f46"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

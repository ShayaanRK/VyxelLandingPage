import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ------------------------------------------------------------------ */
/* Sample data — replace with real values from your API/DB later      */
/* ------------------------------------------------------------------ */

const leadConversionData = [
  { month: "Jan", newLeads: 400, conversions: 120 },
  { month: "Feb", newLeads: 520, conversions: 190 },
  { month: "Mar", newLeads: 610, conversions: 250 },
  { month: "Apr", newLeads: 720, conversions: 300 },
  { month: "May", newLeads: 860, conversions: 350 },
];

const monthlyGrowthData = [
  { month: "Jan", leads: 450 },
  { month: "Feb", leads: 560 },
  { month: "Mar", leads: 650 },
  { month: "Apr", leads: 800 },
  { month: "May", leads: 920 },
];

/* ------------------------------------------------------------------ */
/* Custom tooltip — matches the "Jan / New Leads: 400 / Conversions:  */
/* 120" card from the reference screenshot                            */
/* ------------------------------------------------------------------ */

function LeadTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;

  const newLeads = payload.find((p) => p.dataKey === "newLeads")?.value;
  const conversions = payload.find((p) => p.dataKey === "conversions")?.value;

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 px-5 py-4 min-w-[190px]">
      <p className="text-base font-semibold text-slate-900 mb-2">{label}</p>
      <p className="text-sm mb-1" style={{ color: "#f87516" }}>
        New Leads : <span className="font-medium">{newLeads}</span>
      </p>
      <p className="text-sm" style={{ color: "#ff9b63" }}>
        Conversions : <span className="font-medium">{conversions}</span>
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Custom dot — filled circle with white ring, matches screenshot     */
/* ------------------------------------------------------------------ */

function LineDot(color) {
  // eslint-disable-next-line react/display-name
  return (props) => {
    const { cx, cy } = props;
    return (
      <circle
        cx={cx}
        cy={cy}
        r={6}
        fill={color}
        stroke="#fff"
        strokeWidth={2}
        style={{ cursor: "pointer" }}
      />
    );
  };
}

/* ------------------------------------------------------------------ */
/* Lead Conversion Trends — line chart                                */
/* ------------------------------------------------------------------ */

export function LeadConversionChart() {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={leadConversionData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94A3B8", fontSize: 13 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94A3B8", fontSize: 13 }}
            domain={[0, 1000]}
            ticks={[0, 250, 500, 750, 1000]}
          />
          <Tooltip content={<LeadTooltip />} cursor={{ stroke: "#E5E7EB", strokeWidth: 1 }} />
          <Line
            type="monotone"
            dataKey="newLeads"
            stroke="#f87516"
            strokeWidth={3}
            dot={LineDot("#f87516")}
            activeDot={{ r: 7, stroke: "#fff", strokeWidth: 2 }}
          />
          <Line
            type="monotone"
            dataKey="conversions"
            stroke="#ff9b63"
            strokeWidth={3}
            dot={LineDot("#ff9b63")}
            activeDot={{ r: 7, stroke: "#fff", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Legend, matches the "● New Leads  ● Conversions" row under the chart */}
      <div className="flex items-center gap-6 mt-2 pl-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#f87516" }} />
          <span className="text-sm" style={{ color: "#d15a05ff" }}>New Leads</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#ff9b63" }} />
          <span className="text-sm" style={{ color: "#fc8946ff" }}>Conversions</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Monthly Growth — bar chart                                         */
/* ------------------------------------------------------------------ */

export function MonthlyGrowthChart() {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={monthlyGrowthData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94A3B8", fontSize: 13 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94A3B8", fontSize: 13 }}
            domain={[0, 1000]}
            ticks={[0, 250, 500, 750, 1000]}
          />
          <Tooltip
            cursor={{ fill: "#f87516" }}
            contentStyle={{
              borderRadius: 16,
              border: "1px solid #F1F5F9",
              boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
            }}
            labelStyle={{ color: "#111827", fontWeight: 600 }}
          />
          <Bar dataKey="leads" fill="#f87516" radius={[8, 8, 0, 0]} maxBarSize={56} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

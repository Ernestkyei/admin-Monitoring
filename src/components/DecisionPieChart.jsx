import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Automate", value: 1 },
  { name: "Escalate", value: 1 },
  { name: "No Action", value: 1 },
];

const COLORS = {
  Automate: "#22c55e",
  Escalate: "#ef4444",
  "No Action": "#9ca3af",
};

function DecisionPieChart() {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          Decision Distribution
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Actions taken by the AI agent
        </p>
      </div>

      {/* Chart */}
      <div className="relative mt-6 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={95}
              paddingAngle={3}
              label
            >
              {data.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[entry.name]}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value, name) => [
                `${value} email${value === 1 ? "" : "s"}`,
                name,
              ]}
            />

            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value) => (
                <span className="text-sm text-gray-700">
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Center value */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center pb-10">
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900">
              {total}
            </p>

            <p className="text-xs text-gray-500">
              Total Decisions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DecisionPieChart;
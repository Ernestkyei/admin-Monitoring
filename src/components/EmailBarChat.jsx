import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const monthlyData = {
  "2026-01": [
    { name: "In Remit", emails: 1 },
    { name: "Out of Remit", emails: 1 },
    { name: "Needs Review", emails: 1 },
  ],

  "2026-02": [
    { name: "In Remit", emails: 3 },
    { name: "Out of Remit", emails: 1 },
    { name: "Needs Review", emails: 2 },
  ],

  "2026-03": [
    { name: "In Remit", emails: 5 },
    { name: "Out of Remit", emails: 2 },
    { name: "Needs Review", emails: 1 },
  ],

  "2026-04": [
    { name: "In Remit", emails: 4 },
    { name: "Out of Remit", emails: 3 },
    { name: "Needs Review", emails: 2 },
  ],

  "2026-05": [
    { name: "In Remit", emails: 7 },
    { name: "Out of Remit", emails: 2 },
    { name: "Needs Review", emails: 3 },
  ],

  "2026-06": [
    { name: "In Remit", emails: 8 },
    { name: "Out of Remit", emails: 3 },
    { name: "Needs Review", emails: 2 },
  ],

  "2026-07": [
    { name: "In Remit", emails: 6 },
    { name: "Out of Remit", emails: 2 },
    { name: "Needs Review", emails: 4 },
  ],

  "2026-08": [
    { name: "In Remit", emails: 10 },
    { name: "Out of Remit", emails: 3 },
    { name: "Needs Review", emails: 2 },
  ],

  "2026-09": [
    { name: "In Remit", emails: 0 },
    { name: "Out of Remit", emails: 0 },
    { name: "Needs Review", emails: 0 },
  ],

  "2026-10": [
    { name: "In Remit", emails: 0 },
    { name: "Out of Remit", emails: 0 },
    { name: "Needs Review", emails: 0 },
  ],

  "2026-11": [
    { name: "In Remit", emails: 0 },
    { name: "Out of Remit", emails: 0 },
    { name: "Needs Review", emails: 0 },
  ],

  "2026-12": [
    { name: "In Remit", emails: 0 },
    { name: "Out of Remit", emails: 0 },
    { name: "Needs Review", emails: 0 },
  ],
};

const months = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

const years = ["2026", "2025", "2024"];

function EmailBarChat() {
  const [selectedMonth, setSelectedMonth] = useState("09");
  const [selectedYear, setSelectedYear] = useState("2026");

  const selectedKey = `${selectedYear}-${selectedMonth}`;

  const data = monthlyData[selectedKey] || [
    { name: "In Remit", emails: 0 },
    { name: "Out of Remit", emails: 0 },
    { name: "Needs Review", emails: 0 },
  ];

  const selectedMonthName =
    months.find((month) => month.value === selectedMonth)?.label;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Email Classification
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Distribution of processed emails
          </p>
        </div>

        {/* Month and Year selectors */}
        <div className="flex gap-2">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-gray-900"
          >
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-gray-900"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Selected period */}
      <div className="mt-5">
        <p className="text-sm font-medium text-gray-900">
          {selectedMonthName} {selectedYear}
        </p>

        <p className="mt-1 text-xs text-gray-500">
          Email classification for selected month
        </p>
      </div>

      {/* Chart */}
      <div className="mt-6 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis allowDecimals={false} />

            <Tooltip />

            <Bar
              dataKey="emails"
              name="Emails"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default EmailBarChat;
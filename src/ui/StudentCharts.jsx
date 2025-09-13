import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import useFeedback from "../features/feedback/useFeedback";

const typeLabels = {
  late: "Late Bus Arrival",
  overcharging: "Overcharging",
  reckless: "Reckless Driving",
  overcrowding: "Overcrowding",
  rude: "Rude Behavior",
  vehicle: "Poor Vehicle Condition",
  safety: "Safety Concern",
  other: "Other",
};

// Color palettes
const COLORS01 = [
  "var(--color-card-1)",
  "var(--color-card-2)",
  "var(--color-card-3)",
  "var(--color-card-4)",
];
const COLORS02 = [
  "#8884d8",
  "#8dd1e1",
  "#82ca9d",
  "#a4de6c",
  "#d0ed57",
  "#ffc658",
  "#ff7300",
  "#ff8042",
  "#00C49F",
  "#0088FE",
  "#FFBB28",
];

function StudentCharts() {
  const { complaints = [] } = useFeedback();
  const totalComplaint = complaints.length;

  const pendingComplaint = complaints.filter(
    (pending) => pending.status === "pending"
  ).length;
  const resolvedComplaint = complaints.filter(
    (resolved) => resolved.status === "resolved"
  ).length;
  const rejectedComplaint = complaints.filter(
    (rejected) => rejected.status === "rejected"
  ).length;

  const complaintData = [
    { name: "All", value: totalComplaint },
    { name: "Pending", value: pendingComplaint },
    { name: "Resolved", value: resolvedComplaint },
    { name: "Rejected", value: rejectedComplaint },
  ];

  const categoryMap = {};
  complaints.forEach((c) => {
    const raw = c.complaintType || "Unknown";
    const type = typeLabels[raw] || raw;
    categoryMap[type] = (categoryMap[type] || 0) + 1;
  });

  const numbers = Object.entries(categoryMap).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={complaintData}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={60}
            fill="#8884d8"
          >
            {complaintData.map((entry, index) => (
              <Cell
                key={`slice1-${index}`}
                fill={COLORS01[index % COLORS01.length]}
              />
            ))}
          </Pie>
          <Pie
            data={numbers}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={90}
            labelLine={{ strokeWidth: 5 }}
            label={({ cx, cy, midAngle, outerRadius, value }) => {
              const RADIAN = Math.PI / 180;
              const labelRadius = outerRadius + 30; // Position outside the pie
              const x = cx + labelRadius * Math.cos(-midAngle * RADIAN);
              const y = cy + labelRadius * Math.sin(-midAngle * RADIAN);

              return (
                <text
                  x={x}
                  y={y}
                  fill="#000"
                  fontWeight="bold"
                  fontSize={14}
                  textAnchor="middle"
                  dominantBaseline="central"
                >
                  {value}
                </text>
              );
            }}
          >
            {numbers.map((entry, index) => (
              <Cell
                key={`slice2-${index}`}
                fill={COLORS02[index % COLORS02.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            payload={complaintData.map((item, index) => ({
              id: item.name,
              type: "square",
              value: item.name,
              color: COLORS01[index % COLORS01.length],
            }))}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StudentCharts;

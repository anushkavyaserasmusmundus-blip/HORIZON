import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";

const platformData = [
  {
    name: "LeetCode",
    solved: 180,
    color: "#FFA116",
  },
  {
    name: "Codeforces",
    solved: 92,
    color: "#3B82F6",
  },
  {
    name: "HackerRank",
    solved: 70,
    color: "#22C55E",
  },
];

export default function CodingBarChart() {
  return (
    <div className="mt-4 h-44 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={platformData}
          margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#FBE7CC"
            vertical={false}
          />

          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#5E6F78", fontSize: 11 }}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#5E6F78", fontSize: 11 }}
          />

          <Tooltip
            cursor={{ fill: "#FFF8EF" }}
            formatter={(value) => [`${value}`, "Problems"]}
          />

          <Bar
            dataKey="solved"
            barSize={32}
            radius={[6, 6, 0, 0]}
          >
            {platformData.map((entry) => (
              <Cell
                key={entry.name}
                fill={entry.color}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
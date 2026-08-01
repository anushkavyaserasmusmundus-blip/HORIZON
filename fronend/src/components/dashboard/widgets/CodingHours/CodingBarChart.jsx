import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";

export default function CodingBarChart({ data }) {
  return (
    <div className="mt-4 h-44 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#FBE7CC" vertical={false} />
          <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#5E6F78", fontSize: 12 }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: "#5E6F78", fontSize: 12 }} />
          <Tooltip cursor={{ fill: "#FFF8EF" }} />
          <Bar dataKey="hours" fill="#F4B643" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

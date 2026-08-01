import Card from "../../../common/Card";
import CodingBarChart from "./CodingBarChart";
import mockCodingData from "./mockCodingData";

export default function CodingHoursWidget() {
  const totalHours = mockCodingData.reduce((sum, item) => sum + item.hours, 0);
  const averageHours = totalHours / mockCodingData.length;

  // mock LeetCode stats (replace with real data later)
  const leetCodeStats = { totalSolved: 124, solvedThisWeek: 3 };

  return (
    <Card title="Coding Hours" className="h-full border-[#E8DCCF] bg-[#FFF8EF] p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-[#2D4C59]">This Week</p>
        <span className="rounded-full bg-[#FBE7CC] px-2.5 py-1 text-[11px] font-semibold text-[#C84D38]">
          Weekly
        </span>
      </div>

      <CodingBarChart data={mockCodingData} />

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="col-span-2 rounded-2xl bg-[#FFF8EF] p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#C84D38]">
            Problems solved on LeetCode
          </p>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-2xl font-semibold text-[#2D4C59]">{leetCodeStats.totalSolved}</p>
            <p className="text-sm text-[#5E6F78]">This week: {leetCodeStats.solvedThisWeek}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
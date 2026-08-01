import { useState } from "react";
import { Code2, GitBranch, TerminalSquare } from "lucide-react";

const platforms = [
  { id: "leetcode", label: "LeetCode", icon: Code2 },
  { id: "github", label: "GitHub", icon: GitBranch },
  { id: "hackerrank", label: "HackerRank", icon: TerminalSquare },
];

function buildContributionDays(platformId) {
  const days = Array.from({ length: 42 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (41 - index));

    let value = 0;

    if (platformId === "leetcode") {
      value = index % 8 === 0 ? 3 : index % 5 === 0 ? 2 : index % 3 === 0 ? 1 : 0;
    } else if (platformId === "github") {
      value = index % 7 === 0 ? 0 : index % 4 === 0 ? 2 : index % 2 === 0 ? 1 : 3;
    } else {
      value = index % 6 === 0 ? 0 : index % 4 === 0 ? 2 : index % 3 === 0 ? 1 : 3;
    }

    return {
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      value,
    };
  });

  return days;
}

const weekRows = (days) => Array.from({ length: 6 }, (_, rowIndex) => days.slice(rowIndex * 7, rowIndex * 7 + 7));

function getContributionClass(value) {
  if (value === 0) return "bg-[#F7F3EA]";
  if (value === 1) return "bg-[#CFEFD5]";
  if (value === 2) return "bg-[#8ED18F]";
  if (value === 3) return "bg-[#52B96A]";
  return "bg-[#2F8E49]";
}

export default function CodingContributionHeatmap() {
  const [selectedPlatform, setSelectedPlatform] = useState("leetcode");
  const contributionDays = buildContributionDays(selectedPlatform);
  const rows = weekRows(contributionDays);

  return (
    <div className="mt-4 rounded-2xl border border-[#F2D5A5] bg-[#FFFDF8] p-3">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#C84D38]">
          Activity Heatmap
        </p>
        <p className="text-[11px] text-[#5E6F78]">Last 6 weeks</p>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {platforms.map(({ id, label, icon: Icon }) => {
          const active = selectedPlatform === id;

          return (
            <button
              key={id}
              type="button"
              onClick={() => setSelectedPlatform(id)}
              className={`flex items-center gap-2 rounded-full border px-2.5 py-1.5 text-[11px] font-semibold transition ${
                active
                  ? "border-[#C84D38] bg-[#FFF0D8] text-[#C84D38]"
                  : "border-[#E8DCCF] bg-white text-[#5E6F78]"
              }`}
            >
              <Icon size={14} />
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-3 grid grid-cols-7 gap-1.5">
        {rows.flat().map((day, index) => (
          <div
            key={`${day.date}-${index}`}
            className={`h-4 w-4 rounded-[4px] border border-[#F0E7DA] ${getContributionClass(day.value)}`}
            title={day.date}
          />
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2 text-[11px] text-[#5E6F78]">
        <span>Less</span>
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4].map((level) => (
            <div key={level} className={`h-3 w-3 rounded-[3px] border border-[#F0E7DA] ${getContributionClass(level)}`} />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  );
}

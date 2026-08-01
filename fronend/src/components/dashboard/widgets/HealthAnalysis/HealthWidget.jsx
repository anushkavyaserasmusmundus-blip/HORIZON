import { useState } from "react";
import { Link } from "react-router-dom";
import Card from "../../../common/Card";
import HealthGrid from "./HealthGrid";
import HealthSummaryButton from "./HealthSummaryButton";
import healthData from "./mockHealthData";

const periods = [
  { label: "Today", value: "today" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
];

export default function HealthWidget() {
  const [selectedView, setSelectedView] = useState("today");
  const currentItems = healthData[selectedView] || [];

  return (
    <Card title="Health Analysis" className="p-4">
      <div className="flex items-center gap-2 rounded-full border border-[#F2D5A5] bg-white px-2 py-1 text-[11px] text-[#5E6F78]">
        {periods.map((period) => (
          <button
            key={period.value}
            type="button"
            onClick={() => setSelectedView(period.value)}
            className={`rounded-full px-3 py-1 text-sm font-semibold transition ${
              selectedView === period.value
                ? "bg-[#FFF8EF] text-[#2D4C59]"
                : "text-[#5E6F78] hover:text-[#2D4C59]"
            }`}
          >
            {period.label}
          </button>
        ))}
      </div>

      <div className="mt-4">
        <HealthGrid items={currentItems} />
      </div>

      <HealthSummaryButton />
    </Card>
  );
}

import { Sparkles } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import CodingHoursWidget from "../components/dashboard/widgets/CodingHours/CodingHoursWidget";
import CodingContributionHeatmap from "../components/dashboard/widgets/CodingHours/CodingContributionHeatmap";
import PersonalWidget from "../components/dashboard/widgets/Personal/PersonalWidget";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-[1500px] space-y-5">
        <div className="grid grid-cols-12 gap-4 lg:gap-5">

          {/* Row 1: Coding Activity (wide) + GitHub Heatmap */}
          <div className="col-span-12 min-h-[300px] lg:col-span-8">
            <CodingHoursWidget />
          </div>

          <div className="col-span-12 min-h-[300px] lg:col-span-4">
            <div className="flex h-full flex-col rounded-2xl border border-[#E8DCCF] bg-white p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#C84D38]">GitHub Contributions</p>
              <div className="mt-3 flex-1">
                <CodingContributionHeatmap />
              </div>
            </div>
          </div>

          {/* Row 2: Personal */}
          <div className="col-span-12 min-h-[300px]">
            <PersonalWidget />
          </div>

          {/* Row 3: AI Assistant */}
          <div className="col-span-12 min-h-[200px] lg:col-span-5">
            <div className="flex h-full flex-col rounded-2xl border border-[#E8DCCF] bg-white p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#C84D38]">AI Assistant</p>
              <h2 className="mt-2 text-xl font-semibold text-[#2D4C59]">Ready to guide your next step</h2>
              <div className="mt-4 rounded-2xl bg-[#FFF8EF] p-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F4B643] text-[#2D4C59]">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-[#2D4C59]">Suggested review prompt</p>
                    <p className="text-[13px] text-[#5E6F78]">Summarize the top win from today.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </DashboardLayout>
  );
}
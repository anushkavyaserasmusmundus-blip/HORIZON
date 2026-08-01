import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import HealthGrid from "../components/dashboard/widgets/HealthAnalysis/HealthGrid";
import HealthCalendar from "../components/dashboard/widgets/HealthAnalysis/HealthCalendar";
import healthData from "../components/dashboard/widgets/HealthAnalysis/mockHealthData";

export default function HealthAnalysis() {
  const healthItems = healthData.monthly;

  const [cycleSettings, setCycleSettings] = useState(() => {
    try {
      const raw = localStorage.getItem("menstrualCycleSettings");
      return raw
        ? JSON.parse(raw)
        : { lastPeriodStart: "", cycleLength: 28, periodLength: 5 };
    } catch (e) {
      return { lastPeriodStart: "", cycleLength: 28, periodLength: 5 };
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("menstrualCycleSettings", JSON.stringify(cycleSettings));
    } catch (e) {}
  }, [cycleSettings]);

  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-[1100px] py-6 space-y-6">
        <div className="rounded-3xl border border-[#E8DCCF] bg-white p-6 shadow-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#C84D38]">Health Analysis</p>
          <h1 className="mt-3 text-2xl font-semibold text-[#2D4C59]">Detailed Health Analysis</h1>
          <p className="mt-2 max-w-2xl text-sm text-[#5E6F78]">Explore your routine, trends, and wellness metrics in one place.</p>

          <div className="mt-5 grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <HealthGrid items={healthItems} />
            </div>

            <div>
              <div className="rounded-2xl border border-[#F2D5A5] bg-white p-4">
                <p className="text-sm font-semibold text-[#2D4C59]">Period Tracking</p>
                <p className="mt-1 text-xs text-[#5E6F78]">Add your last period start and cycle details to track phases.</p>

                <div className="mt-3 space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-[#2D4C59]">Last period start</label>
                    <input type="date" value={cycleSettings.lastPeriodStart} onChange={(e) => setCycleSettings((s) => ({ ...s, lastPeriodStart: e.target.value }))} className="mt-1 w-full rounded-md border border-[#E8DCCF] p-2 text-sm" />
                  </div>

                  <div className="grid gap-2 md:grid-cols-2">
                    <div>
                      <label className="text-xs font-semibold text-[#2D4C59]">Cycle length (days)</label>
                      <input type="number" min={18} max={45} value={cycleSettings.cycleLength} onChange={(e) => setCycleSettings((s) => ({ ...s, cycleLength: Number(e.target.value) }))} className="mt-1 w-full rounded-md border border-[#E8DCCF] p-2 text-sm" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#2D4C59]">Period length (days)</label>
                      <input type="number" min={1} max={10} value={cycleSettings.periodLength} onChange={(e) => setCycleSettings((s) => ({ ...s, periodLength: Number(e.target.value) }))} className="mt-1 w-full rounded-md border border-[#E8DCCF] p-2 text-sm" />
                    </div>
                  </div>

                  <div className="text-right">
                    <button onClick={() => setCycleSettings({ lastPeriodStart: "", cycleLength: 28, periodLength: 5 })} className="rounded-md border border-[#E8DCCF] px-3 py-1 text-sm">Reset</button>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <HealthCalendar settings={cycleSettings} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}



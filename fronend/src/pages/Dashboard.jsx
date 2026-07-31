import { CheckCircle2, Sparkles } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";

const focusItems = ["Finish the UI polish", "Complete one focused coding sprint", "Log your reflection before dinner"];

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-[1500px] space-y-5">
        <div className="grid grid-cols-12 gap-4 lg:gap-5">
          <div className="col-span-12 min-h-[250px] sm:col-span-6 lg:col-span-4">
            <div className="flex h-full flex-col rounded-2xl border border-[#E8DCCF] bg-white p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#C84D38]">Today&apos;s Focus</p>
              <h2 className="mt-2 text-xl font-semibold text-[#2D4C59]">Build one meaningful progress block</h2>
              <div className="mt-4 space-y-2">
                {focusItems.map((item) => (
                  <label key={item} className="flex items-center gap-2 rounded-lg bg-[#FFF8EF] px-2.5 py-2 text-[13px] text-[#4C5D66]">
                    <CheckCircle2 size={14} className="text-[#F4B643]" />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
              <div className="mt-4">
                <div className="mb-1 flex items-center justify-between text-[12px] text-[#5E6F78]">
                  <span>Daily completion</span>
                  <span className="font-semibold text-[#2D4C59]">72%</span>
                </div>
                <div className="h-2 rounded-full bg-[#FBE7CC]">
                  <div className="h-2 w-[72%] rounded-full bg-[#F4B643]" />
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 min-h-[250px] sm:col-span-6 lg:col-span-4">
            <div className="flex h-full flex-col rounded-2xl border border-[#E8DCCF] bg-white p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#C84D38]">Coding Hours</p>
              <h2 className="mt-2 text-2xl font-semibold text-[#2D4C59]">4.8 h</h2>
              <p className="mt-2 text-[13px] leading-6 text-[#5E6F78]">
                Strong momentum in UI refinement and debugging this week.
              </p>
              <div className="mt-4 h-2 rounded-full bg-[#FBE7CC]">
                <div className="h-2 w-[78%] rounded-full bg-[#F4B643]" />
              </div>
              <div className="mt-4 rounded-xl bg-[#FFF8EF] p-3">
                <p className="text-[12px] font-semibold text-[#2D4C59]">Problems solved so far</p>
                <p className="mt-1 text-[13px] text-[#5E6F78]">LeetCode sync coming soon.</p>
              </div>
            </div>
          </div>

          <div className="col-span-12 min-h-[250px] sm:col-span-6 lg:col-span-4">
            <div className="flex h-full flex-col rounded-2xl border border-[#E8DCCF] bg-white p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#C84D38]">Analytics Overview</p>
              <h2 className="mt-2 text-2xl font-semibold text-[#2D4C59]">+18%</h2>
              <p className="mt-2 text-[13px] leading-6 text-[#5E6F78]">
                Consistency is improving your daily habits.
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-[13px] text-[#4C5D66]">
                  <span>Consistency</span>
                  <span className="font-semibold text-[#2D4C59]">86%</span>
                </div>
                <div className="h-2 rounded-full bg-[#FBE7CC]">
                  <div className="h-2 w-[86%] rounded-full bg-[#C84D38]" />
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 min-h-[300px] sm:col-span-6 lg:col-span-7">
            <div className="flex h-full flex-col rounded-2xl border border-[#E8DCCF] bg-white p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#C84D38]">Personal Module</p>
              <h2 className="mt-2 text-xl font-semibold text-[#2D4C59]">Stay grounded with your routine</h2>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl bg-[#FFF8EF] p-3">
                  <p className="text-[13px] font-semibold text-[#2D4C59]">Routine check-in</p>
                  <p className="mt-1 text-[13px] leading-6 text-[#5E6F78]">
                    A short reflection keeps your energy aligned with your goals.
                  </p>
                </div>
                <div className="rounded-2xl bg-[#FFF8EF] p-3">
                  <p className="text-[13px] font-semibold text-[#2D4C59]">Weekly focus</p>
                  <p className="mt-1 text-[13px] leading-6 text-[#5E6F78]">
                    Protect your deep work time and leave space for rest.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 min-h-[300px] sm:col-span-6 lg:col-span-5">
            <div className="flex h-full flex-col rounded-2xl border border-[#E8DCCF] bg-white p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#C84D38]">Health Analytics</p>
              <h2 className="mt-2 text-xl font-semibold text-[#2D4C59]">Balanced energy, steady recovery</h2>
              <div className="mt-4 rounded-2xl bg-[#FFF8EF] p-3">
                <div className="flex items-center justify-between text-[13px] text-[#4C5D66]">
                  <span>Sleep quality</span>
                  <span className="font-semibold text-[#2D4C59]">8.2/10</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-[#FBE7CC]">
                  <div className="h-2 w-[82%] rounded-full bg-[#F4B643]" />
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 min-h-[280px] sm:col-span-6 lg:col-span-7">
            <div className="flex h-full flex-col rounded-2xl border border-[#E8DCCF] bg-white p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#C84D38]">Journal</p>
              <h2 className="mt-2 text-xl font-semibold text-[#2D4C59]">Capture today’s insight</h2>
              <div className="mt-4 rounded-2xl border border-dashed border-[#F2D5A5] bg-[#FFFDF8] p-3 text-[13px] leading-6 text-[#5E6F78]">
                “The best progress came from a calm start and one uninterrupted sprint.”
              </div>
            </div>
          </div>

          <div className="col-span-12 min-h-[280px] sm:col-span-6 lg:col-span-5">
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
import { useMemo, useState } from "react";

const phaseColor = {
  menstruation: "bg-red-400",
  follicular: "bg-green-400",
  ovulation: "bg-orange-400",
  luteal: "bg-yellow-500",
};

// simple mock cycle data: map day numbers to phases for current month
function generateMockCycle(daysInMonth) {
  const map = {};
  // mock: days 1-5 menstruation, 6-13 follicular, 14-16 ovulation, 17-28 luteal
  for (let d = 1; d <= daysInMonth; d++) {
    if (d <= 5) map[d] = "menstruation";
    else if (d <= 13) map[d] = "follicular";
    else if (d <= 16) map[d] = "ovulation";
    else map[d] = "luteal";
  }
  return map;
}

export default function HealthCalendar({ settings }) {
  const today = new Date();
  const [displayDate, setDisplayDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const year = displayDate.getFullYear();
  const month = displayDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  function computeCycleMapFromSettings(settings) {
    if (!settings || !settings.lastPeriodStart) return generateMockCycle(daysInMonth);

    const lastStart = new Date(settings.lastPeriodStart);
    lastStart.setHours(0, 0, 0, 0);
    const cycleLength = Number(settings.cycleLength) || 28;
    const periodLength = Number(settings.periodLength) || 5;
    const ovulationDay = Math.max(1, Math.round(cycleLength - 14));

    const map = {};
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d);
      date.setHours(0, 0, 0, 0);
      const msPerDay = 24 * 60 * 60 * 1000;
      const daysSince = Math.floor((date - lastStart) / msPerDay);
      const dayInCycle = ((daysSince % cycleLength) + cycleLength) % cycleLength + 1;

      if (dayInCycle >= 1 && dayInCycle <= periodLength) map[d] = "menstruation";
      else if (dayInCycle > periodLength && dayInCycle < ovulationDay) map[d] = "follicular";
      else if (dayInCycle >= Math.max(1, ovulationDay - 1) && dayInCycle <= ovulationDay + 1) map[d] = "ovulation";
      else map[d] = "luteal";
    }

    return map;
  }

  const cycleMap = useMemo(() => computeCycleMapFromSettings(settings), [daysInMonth, month, year, settings]);

  const blanks = Array.from({ length: firstDay }, (_, i) => i + 1);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  function prevMonth() {
    setDisplayDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  }

  function nextMonth() {
    setDisplayDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  }

  function setMonthYear(m, y) {
    setDisplayDate(new Date(y, m, 1));
  }

  const monthNames = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString("default", { month: "long" }));
  }, []);

  const years = useMemo(() => {
    const range = [];
    const start = today.getFullYear() - 5;
    for (let y = start; y <= today.getFullYear() + 5; y++) range.push(y);
    return range;
  }, [today]);

  return (
    <div className="rounded-2xl border border-[#F2D5A5] bg-white p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-[#2D4C59]">Calendar</p>

        <div className="flex items-center gap-3">
          <button onClick={prevMonth} className="rounded p-1 text-sm text-[#5E6F78] hover:bg-[#F9F5EE]">‹</button>
          <div className="flex items-center gap-2">
            <select value={month} onChange={(e) => setMonthYear(Number(e.target.value), year)} className="rounded border border-[#E8DCCF] p-1 text-sm">
              {monthNames.map((m, i) => (
                <option key={m} value={i}>{m}</option>
              ))}
            </select>
            <select value={year} onChange={(e) => setMonthYear(month, Number(e.target.value))} className="rounded border border-[#E8DCCF] p-1 text-sm">
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
          <button onClick={nextMonth} className="rounded p-1 text-sm text-[#5E6F78] hover:bg-[#F9F5EE]">›</button>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-7 gap-2 text-center text-sm">
        <div className="text-xs text-[#8A8D95]">Sun</div>
        <div className="text-xs text-[#8A8D95]">Mon</div>
        <div className="text-xs text-[#8A8D95]">Tue</div>
        <div className="text-xs text-[#8A8D95]">Wed</div>
        <div className="text-xs text-[#8A8D95]">Thu</div>
        <div className="text-xs text-[#8A8D95]">Fri</div>
        <div className="text-xs text-[#8A8D95]">Sat</div>

        {blanks.map((b) => (
          <div key={`b-${b}`} />
        ))}

        {days.map((d) => (
          <div key={d} className="relative rounded-md p-2">
            <div className="text-sm font-semibold text-[#2D4C59]">{d}</div>
            <div className="absolute left-1/2 top-1 transform -translate-x-1/2 -translate-y-1/2">
              <span className={`inline-block h-2 w-2 rounded-full ${phaseColor[cycleMap[d]] || "bg-gray-300"}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-3 text-xs text-[#5E6F78]">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-red-400" /> Menstruation
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-green-400" /> Follicular
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-orange-400" /> Ovulation
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-yellow-500" /> Luteal
        </div>
      </div>
    </div>
  );
}

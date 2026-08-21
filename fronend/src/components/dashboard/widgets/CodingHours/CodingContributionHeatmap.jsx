import { useEffect, useState } from "react";

const API_BASE =
  "http://127.0.0.1:8081/api/v1/integrations/github/contributions";

function getContributionClass(value) {
  if (value === 0) return "bg-[#F0EDE6]";
  if (value <= 2) return "bg-[#CFEFD5]";
  if (value <= 5) return "bg-[#8ED18F]";
  if (value <= 8) return "bg-[#52B96A]";
  return "bg-[#2F8E49]";
}

export default function CodingContributionHeatmap() {
  const [days, setDays] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchContributions() {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(API_BASE, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401 || response.status === 403) {
          throw new Error("Your session has expired. Please log in again.");
        }

        if (!response.ok) {
          throw new Error("Failed to fetch GitHub contributions");
        }

        const data = await response.json();

        const calendar =
          data?.data?.user?.contributionsCollection?.contributionCalendar;

        if (!calendar) {
          throw new Error("Invalid GitHub contribution data");
        }

        const contributionDays = calendar.weeks.flatMap(
          (week) => week.contributionDays
        );

        setDays(contributionDays);
        setTotal(calendar.totalContributions);
      } catch (err) {
        console.error("GitHub contributions error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchContributions();
  }, []);

  return (
    <div className="mt-4 rounded-2xl border border-[#F2D5A5] bg-[#FFFDF8] p-4">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#C84D38]">
            GitHub Contributions
          </p>

          <p className="mt-1 text-xs text-[#5E6F78]">
            {loading
              ? "Loading activity..."
              : error
              ? error
              : `${total} contributions in the last year`}
          </p>
        </div>

        <div className="rounded-xl bg-[#FFF0D8] px-3 py-2 text-center">
          <p className="text-lg font-bold text-[#2D4C59]">{error ? "—" : total}</p>
          <p className="text-[9px] font-semibold uppercase text-[#A0714F]">
            Total
          </p>
        </div>
      </div>

      {/* Heatmap */}
      {!loading && !error && (
        <div className="mt-5 overflow-x-auto pb-1">
          <div className="min-w-[720px]">

            {/* Month labels */}
            <div className="mb-2 flex justify-between px-1 text-[10px] text-[#7B8790]">
              {(() => {
                const months = [];
                let lastMonth = "";

                days.forEach((day) => {
                  const month = new Date(day.date).toLocaleDateString("en-US", {
                    month: "short",
                  });

                  if (month !== lastMonth) {
                    months.push(month);
                    lastMonth = month;
                  }
                });

                return months.map((month, index) => (
                  <span key={`${month}-${index}`}>{month}</span>
                ));
              })()}
            </div>

            <div className="grid grid-cols-[18px_1fr] gap-2">

              {/* Weekday labels */}
              <div className="grid grid-rows-7 gap-[3px] text-[9px] text-[#7B8790]">
                <span></span>
                <span>Mon</span>
                <span></span>
                <span>Wed</span>
                <span></span>
                <span>Fri</span>
                <span></span>
              </div>

              {/* Contribution squares */}
              <div className="grid grid-flow-col grid-rows-7 gap-[3px]">
                {days.map((day) => (
                  <div
                    key={day.date}
                    title={`${day.date}: ${day.contributionCount} contributions`}
                    className={`h-[11px] w-[11px] rounded-[2px] border border-[#E8E1D7] ${getContributionClass(
                      day.contributionCount
                    )}`}
                  />
                ))}
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="mt-4 flex items-center justify-end gap-2 text-[10px] text-[#7B8790]">
        <span>Less</span>

        <div className="flex gap-1">
          {[0, 2, 5, 8, 10].map((level) => (
            <div
              key={level}
              className={`h-3 w-3 rounded-[2px] border border-[#E8E1D7] ${getContributionClass(
                level
              )}`}
            />
          ))}
        </div>

        <span>More</span>
      </div>

    </div>
  );
}
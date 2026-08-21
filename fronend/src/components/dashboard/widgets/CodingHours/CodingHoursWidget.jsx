import { useEffect, useState } from "react";
import Card from "../../../common/Card";
import CodingBarChart from "./CodingBarChart";
import { SiLeetcode } from "react-icons/si";

const LEETCODE_API =
  "http://127.0.0.1:8081/api/v1/integrations/leetcode";

const CODEFORCES_API =
  "http://127.0.0.1:8081/api/v1/integrations/codeforces/stats";

const platformColors = {
  LeetCode: "#FFA116",
  Codeforces: "#3B82F6",
};

export default function CodingHoursWidget() {
  const [leetcodeCount, setLeetcodeCount] = useState(0);
  const [codeforcesCount, setCodeforcesCount] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCodingStats() {
      try {
        const token = localStorage.getItem("token");

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const [leetcodeResponse, codeforcesResponse] =
          await Promise.all([
            fetch(LEETCODE_API, { headers }),
            fetch(CODEFORCES_API, { headers }),
          ]);

        if (!leetcodeResponse.ok || !codeforcesResponse.ok) {
          throw new Error("Failed to fetch coding statistics");
        }

        const leetcodeData = await leetcodeResponse.json();
        const codeforcesData = await codeforcesResponse.json();

        const leetcodeStats =
          leetcodeData?.data?.matchedUser?.submitStats?.acSubmissionNum;

        const leetcodeAll =
          leetcodeStats?.find(
            (item) => item.difficulty === "All"
          );

        const codeforcesSolved =
          codeforcesData?.solvedProblems ??
          codeforcesData?.solved ??
          0;

        setLeetcodeCount(leetcodeAll?.count ?? 0);
        setCodeforcesCount(codeforcesSolved);
      } catch (err) {
        console.error("Coding statistics error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCodingStats();
  }, []);

  const platformData = [
    {
      name: "LeetCode",
      solved: leetcodeCount,
      color: platformColors.LeetCode,
    },
    {
      name: "Codeforces",
      solved: codeforcesCount,
      color: platformColors.Codeforces,
    },
  ];

  const totalProblems = leetcodeCount + codeforcesCount;

  return (
    <Card
      title="Coding Activity"
      className="h-full border-[#E8DCCF] bg-[#FFF8EF] p-5"
    >
      <div className="grid grid-cols-[3fr_1px_2fr] gap-0 overflow-hidden">

        {/* LEFT — Platform Graph */}
        <div className="flex min-w-0 flex-col pr-6">

          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-[#2D4C59]">
              Problems by Platform
            </p>
          </div>

          {loading ? (
            <div className="flex h-44 items-center justify-center text-sm text-[#8A7260]">
              Loading coding statistics...
            </div>
          ) : error ? (
            <div className="flex h-44 items-center justify-center text-sm text-red-500">
              Failed to load coding statistics
            </div>
          ) : (
            <CodingBarChart platformData={platformData} />
          )}

        </div>

        {/* Divider */}
        <div className="bg-[#F2D5A5]" />

        {/* RIGHT — Stats */}
        <div className="flex min-w-0 flex-col gap-4 overflow-hidden pl-6">

          {/* Total Problems */}
          <div className="rounded-2xl border border-[#F2D5A5] bg-[#FFFBF3] p-4">

            <div className="flex items-center justify-between gap-2">

              <div className="min-w-0">

                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A0714F]">
                  Problems Solved
                </p>

                <p className="mt-0.5 text-4xl font-bold text-[#2D4C59]">
                  {loading ? "—" : totalProblems}
                </p>

                <p className="text-xs text-[#8A7260]">
                  Total across platforms
                </p>

              </div>

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFA116]/15">
                <SiLeetcode size={22} color="#FFA116" />
              </div>

            </div>

          </div>

          {/* Platform Breakdown */}
          <div className="flex min-w-0 flex-col gap-2 overflow-hidden">

            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#A0714F]">
              Platform Breakdown
            </p>

            {platformData.map((platform) => (

              <div
                key={platform.name}
                className="flex min-w-0 w-full items-center rounded-xl bg-white px-3 py-2 shadow-sm"
              >

                <span
                  className="mr-2 h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: platform.color }}
                />

                <span className="min-w-0 flex-1 truncate text-sm font-semibold text-[#2D4C59]">
                  {platform.name}
                </span>

                <span
                  className="ml-2 shrink-0 rounded-full px-2.5 py-0.5 text-sm font-bold"
                  style={{
                    backgroundColor: `${platform.color}20`,
                    color: platform.color,
                  }}
                >
                  {loading ? "—" : platform.solved}
                </span>

              </div>

            ))}

          </div>

        </div>

      </div>
    </Card>
  );
}
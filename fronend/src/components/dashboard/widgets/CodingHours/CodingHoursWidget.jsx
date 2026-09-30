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

const responseCache = new Map();

function fetchApiJsonOnce(url, token) {
  const cacheKey = `${url}:${token || "anonymous"}`;
  const cached = responseCache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) return cached.promise;

  const promise = fetch(url, { headers: { Authorization: `Bearer ${token || ""}` } }).then((response) => {
    if (!response.ok) throw new Error("Failed to fetch coding statistics");
    return response.json();
  });
  const entry = { promise, expiresAt: Date.now() + 15000 };
  responseCache.set(cacheKey, entry);
  promise.catch(() => {
    if (responseCache.get(cacheKey) === entry) responseCache.delete(cacheKey);
  });
  return promise;
}

export default function CodingHoursWidget({ renderLeetCodeDetails, onLeetCodeStateChange }) {
  const [leetcodeProfile, setLeetcodeProfile] = useState(null);
  const [leetcodeLoading, setLeetcodeLoading] = useState(true);
  const [leetcodeError, setLeetcodeError] = useState(false);
  const [codeforcesCount, setCodeforcesCount] = useState(0);
  const [codeforcesLoading, setCodeforcesLoading] = useState(true);
  const [codeforcesError, setCodeforcesError] = useState(false);

  useEffect(() => {
    let token = null;
    try {
      token = localStorage.getItem("token");
    } catch {
      // Continue with an empty bearer token if storage is unavailable.
    }
    let isActive = true;

    async function fetchLeetCodeProfile() {
      try {
        const leetcodeData = await fetchApiJsonOnce(LEETCODE_API, token);
        const profile = leetcodeData?.data?.matchedUser;
        if (!profile) throw new Error("LeetCode profile data is unavailable");
        if (isActive) {
          const profileWithRanking = {
            ...profile,
            userContestRanking: leetcodeData?.data?.userContestRanking ?? null,
          };
          setLeetcodeProfile(profileWithRanking);
          onLeetCodeStateChange?.({ profile: profileWithRanking, loading: false, error: false });
        }
      } catch (err) {
        if (isActive) {
          console.error("LeetCode statistics error:", err);
          setLeetcodeError(true);
          onLeetCodeStateChange?.({ profile: null, loading: false, error: true });
        }
      } finally {
        if (isActive) setLeetcodeLoading(false);
      }
    }

    async function fetchCodeforcesStats() {
      try {
        const data = await fetchApiJsonOnce(CODEFORCES_API, token);
        if (isActive) setCodeforcesCount(data?.solvedProblems ?? data?.solved ?? 0);
      } catch (err) {
        if (isActive) {
          console.error("Codeforces statistics error:", err);
          setCodeforcesError(true);
        }
      } finally {
        if (isActive) setCodeforcesLoading(false);
      }
    }

    fetchLeetCodeProfile();
    fetchCodeforcesStats();
    return () => {
      isActive = false;
    };
  }, [onLeetCodeStateChange]);

  const leetcodeStats = leetcodeProfile?.submitStats?.acSubmissionNum;
  const leetcodeAll = leetcodeStats?.find((item) => item.difficulty === "All");
  const leetcodeCount = leetcodeAll?.count ?? 0;
  const loading = leetcodeLoading || codeforcesLoading;
  const error = leetcodeError || codeforcesError;

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
    <>
    <Card
      title="Coding Activity"
      className="border-[#E8DCCF] bg-[#FFF8EF] p-5"
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
    {renderLeetCodeDetails?.({ profile: leetcodeProfile, loading: leetcodeLoading, error: leetcodeError })}
    </>
  );
}
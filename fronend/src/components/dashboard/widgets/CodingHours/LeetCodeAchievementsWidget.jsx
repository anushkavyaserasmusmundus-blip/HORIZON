import { Award, Medal, Trophy } from "lucide-react";

function formatInteger(value) {
  const number = Number(value);
  return Number.isFinite(number) ? new Intl.NumberFormat().format(number) : "—";
}

function getBadgeIcon(icon) {
  if (typeof icon !== "string" || !icon.trim()) return "";
  if (/^https:\/\//i.test(icon)) return icon;
  if (icon.startsWith("/")) return `https://leetcode.com${icon}`;
  return "";
}

function WidgetState({ loading, error, emptyText }) {
  if (loading) return <div className="mt-3 h-16 animate-pulse rounded-xl bg-[#FDF6E9]" role="status" aria-label="Loading LeetCode data" />;
  if (error) return <p className="mt-3 rounded-xl bg-[#FFF5F0] px-3 py-3 text-xs text-[#9E5B4D]">LeetCode data is unavailable right now.</p>;
  return <p className="mt-3 rounded-xl bg-[#FDF6E9] px-3 py-3 text-xs leading-5 text-[#75675B]">{emptyText}</p>;
}

export function LeetCodeBadgesWidget({ profile, loading, error }) {
  const badges = Array.isArray(profile?.badges)
    ? profile.badges.filter((badge) => badge && typeof badge.displayName === "string").slice(0, 6)
    : [];

  return (
    <section aria-labelledby="leetcode-badges-title" className="mt-4 rounded-2xl border border-[#E8DCCF] bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FFA116]/15 text-[#B96A00]"><Award size={17} /></span>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#B96A00]">LeetCode profile</p>
          <h2 id="leetcode-badges-title" className="text-base font-semibold text-[#1A1E32]">Badges</h2>
        </div>
      </div>

      {badges.length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {badges.map((badge, index) => {
            const badgeIcon = getBadgeIcon(badge.icon);
            return (
              <div key={`${badge.displayName}-${index}`} title={badge.displayName} className="flex max-w-full items-center gap-2 rounded-xl border border-[#F0E3D4] bg-[#FFFCF7] px-2.5 py-2">
                {badgeIcon ? <img src={badgeIcon} alt="" crossOrigin="anonymous" className="h-7 w-7 shrink-0 object-contain" /> : <Award size={20} className="shrink-0 text-[#E07A5F]" />}
                <span className="max-w-[8rem] truncate text-xs font-medium text-[#3F3530]">{badge.displayName}</span>
              </div>
            );
          })}
        </div>
      ) : <WidgetState loading={loading} error={error} emptyText="No badges yet. Keep solving to earn your first badge." />}
    </section>
  );
}

function Metric({ label, value, accent = false }) {
  return (
    <div className="rounded-xl bg-[#FDF6E9] px-3 py-2.5">
      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8A7260]">{label}</p>
      <p className={`mt-1 truncate text-lg font-bold ${accent ? "text-[#E07A5F]" : "text-[#1A1E32]"}`}>{value}</p>
    </div>
  );
}

export function LeetCodeContestWidget({ profile, loading, error }) {
  const contest = profile?.userContestRanking;
  const values = [contest?.rating, contest?.globalRanking, contest?.attendedContestsCount, contest?.topPercentage];
  const hasContestData = Boolean(contest && values.some((value) => value !== null && value !== undefined && Number.isFinite(Number(value))));

  return (
    <section aria-labelledby="leetcode-contests-title" className="mt-4 rounded-2xl border border-[#E8DCCF] bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E07A5F]/10 text-[#E07A5F]"><Trophy size={17} /></span>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#B96A00]">LeetCode profile</p>
          <h2 id="leetcode-contests-title" className="text-base font-semibold text-[#1A1E32]">Contest performance</h2>
        </div>
      </div>

      {hasContestData ? (
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Metric label="Rating" value={formatInteger(contest.rating)} accent />
          <Metric label="Global rank" value={formatInteger(contest.globalRanking)} />
          <Metric label="Contests" value={formatInteger(contest.attendedContestsCount)} />
          <Metric label="Top" value={contest.topPercentage == null ? "—" : `${Number(contest.topPercentage).toFixed(1)}%`} />
          {contest.badge?.name && <p className="col-span-2 flex items-center gap-1.5 text-xs text-[#75675B]"><Medal size={13} className="text-[#E07A5F]" /> Current rank: <span className="font-semibold text-[#3F3530]">{contest.badge.name}</span></p>}
        </div>
      ) : <WidgetState loading={loading} error={error} emptyText="No contest data yet. Join a weekly or biweekly contest to get started." />}
    </section>
  );
}
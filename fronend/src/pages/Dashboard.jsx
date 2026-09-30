import { useContext, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import CodingHoursWidget from "../components/dashboard/widgets/CodingHours/CodingHoursWidget";
import CodingContributionHeatmap from "../components/dashboard/widgets/CodingHours/CodingContributionHeatmap";
import { LeetCodeBadgesWidget, LeetCodeContestWidget } from "../components/dashboard/widgets/CodingHours/LeetCodeAchievementsWidget";
import PersonalWidget from "../components/dashboard/widgets/Personal/PersonalWidget";
import Scribble from "../components/ui/Scribble.tsx";
import ShareButtonFloating from "../components/ShareButtonFloating.tsx";
import { AuthContext } from "../context/AuthContext";
import sunLogo from "../assets/images/sun.logo.jpg";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [leetcodeState, setLeetCodeState] = useState({ profile: null, loading: true, error: false });
  const shareLinks = {
    linkedin: user?.linkedin || "",
    github: user?.githubUsername || "",
    twitter: user?.twitterUsername || user?.twitter || "",
    instagram: user?.instagramUsername || user?.instagram || "",
    website: user?.website || user?.portfolioUrl || "",
    resumeUrl: user?.resumeUrl || "/resume.pdf",
  };
  const capturedOn = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-[1500px]">
        <ShareButtonFloating username={user?.username || "developer"} links={shareLinks} />

        <div id="snapshot-root" className="dashboard-snapshot-root mx-auto grid w-full max-w-[1200px] gap-4 rounded-2xl bg-[#FDF6E9] px-5 pb-5 pt-2 sm:gap-5 sm:px-8 sm:pb-8 sm:pt-3">
          <header data-snapshot-branding="true" className="snapshot-only relative flex min-h-[5rem] items-center justify-center border-b border-[#E7D6C4] pb-4 text-center">
            <img src={sunLogo} alt="" aria-hidden="true" className="absolute left-0 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full object-cover" />
            <p className="text-sm font-medium text-[#75675B]">Your code. Your journey.</p>
            <span className="absolute left-12 top-1/2 -translate-y-1/2 font-serif text-[10px] font-bold tracking-[0.16em] text-[#9E2B25]">HORIZON</span>
            <time className="absolute right-0 top-1 text-xs font-medium text-[#75675B]">Captured on {capturedOn}</time>
          </header>

          <div className="grid grid-cols-12 items-start gap-4 lg:gap-5">
            <div className="col-span-12 min-w-0 lg:col-span-8">
              <CodingHoursWidget onLeetCodeStateChange={setLeetCodeState} renderLeetCodeDetails={({ profile, loading, error }) => (
                <LeetCodeBadgesWidget profile={profile} loading={loading} error={error} />
              )} />
            </div>

            <div className="col-span-12 min-w-0 lg:col-span-4">
              <div className="space-y-4">
                <section className="self-start rounded-2xl border border-[#E8DCCF] bg-white p-5">
                  <h2 className="mb-4 text-xl font-semibold text-[#2D4C59]"><Scribble type="underline" hover className="scribble-inline">GitHub Contributions</Scribble></h2>
                  <CodingContributionHeatmap />
                </section>
                <LeetCodeContestWidget {...leetcodeState} />
              </div>
            </div>
          </div>

          <div className="min-h-[300px]">
            <PersonalWidget snapshotLinks={shareLinks} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
import { useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";
import Footer from "./Footer";
import NotificationsModal from "./NotificationsModal";
import ProfileSetupModal from "../profile/ProfileSetupModal";
import TodaysMissionWidget from "../dashboard/widgets/TodaysMission/TodaysMissionWidget";
import { AuthContext } from "../../context/AuthContext";
import { X } from "lucide-react";

function getLocalDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getSavedStreak(username) {
  try {
    return {
      count: Number.parseInt(localStorage.getItem(`dailyStreakCount_${username}`) ?? "0", 10),
      date: localStorage.getItem(`lastStreakDate_${username}`),
    };
  } catch {
    return { count: 0, date: null };
  }
}

function DashboardLayout({ children, showSidebar = true, showTaskWidget = true, showFooter = true, naturalScroll = false, contentRef, contentClassName = "" }) {
  const { user, loading, updateUserProfile } = useContext(AuthContext);

  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [streakCount, setStreakCount] = useState(0);
  const [showStreakCelebration, setShowStreakCelebration] = useState(false);

  useEffect(() => {
    if (!user?.username) return;

    const streakKey = `dailyStreakCount_${user.username}`;
    const dateKey = `lastStreakDate_${user.username}`;
    const today = new Date();
    const todayKey = getLocalDateKey(today);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayKey = getLocalDateKey(yesterday);

    const { count, date: lastDate } = getSavedStreak(user.username);
    const savedCount = Number.isFinite(count) && count >= 0 ? count : 0;

    const streakForToday = lastDate === todayKey
      ? savedCount
      : lastDate === yesterdayKey ? savedCount + 1 : 1;
    const countTimer = window.setTimeout(() => setStreakCount(streakForToday), 0);

    if (lastDate === todayKey) return () => window.clearTimeout(countTimer);

    try {
      localStorage.setItem(streakKey, String(streakForToday));
      localStorage.setItem(dateKey, todayKey);
    } catch {
      // Keep the current streak usable when browser storage is unavailable.
    }

    const showTimer = window.setTimeout(() => setShowStreakCelebration(true), 1000);
    const hideTimer = window.setTimeout(() => setShowStreakCelebration(false), 7000);

    return () => {
      window.clearTimeout(countTimer);
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, [user?.username]);

  useEffect(() => {
    if (!showStreakCelebration) return undefined;
    function handleKeyDown(event) {
      if (event.key === "Escape") setShowStreakCelebration(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showStreakCelebration]);

  const needsProfileSetup =
    !loading &&
    user &&
    (
        !user.fullName?.trim() ||
        !user.githubUsername?.trim() ||
        !user.codeforcesUsername?.trim() ||
        !user.leetcodeUsername?.trim()
    );

  return (
    <div className={`min-h-screen ${naturalScroll ? "overflow-visible" : "overflow-hidden"} bg-[#FFF4E6]`}>

      {/* Fixed Top Navbar */}
      <div className="fixed left-0 right-0 top-0 z-40">
        <TopNavbar
          onOpenNotifications={() => setShowNotifications(true)}
          onOpenMenu={() => setMobileMenuOpen(true)}
          streakCount={streakCount}
          showMenu={showSidebar}
        />
      </div>

      {/* Fixed Sidebar + Scrollable Content */}
      <div className="flex min-h-screen">

        {showSidebar && <Sidebar mobileOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />}

        <div className={`flex min-w-0 flex-1 flex-col ${showSidebar ? "lg:pl-56" : ""}`}>
          <main
            ref={contentRef}
            className={naturalScroll
              ? `mt-20 min-h-[calc(100vh-5rem)] flex-1 ${contentClassName || "bg-[#FFF4E6] p-5"}`
              : `mt-20 h-[calc(100vh-5rem)] flex-1 overflow-y-auto ${contentClassName || "bg-[#FFF4E6] p-5"}`}
          >
            {children}

            {showFooter && <Footer className="mx-auto mt-10 max-w-[1100px] border-t border-[#F7B39B] py-5" />}
          </main>
        </div>

      </div>

      {showNotifications ? (
        <NotificationsModal
          onClose={() => setShowNotifications(false)}
        />
      ) : null}

      {showTaskWidget && <TodaysMissionWidget />}

      {showStreakCelebration ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#167449]/85 p-4 text-center text-white backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowStreakCelebration(false); }}>
          <div role="dialog" aria-modal="true" aria-labelledby="streak-dialog-title" className="relative my-auto w-full max-w-lg rounded-2xl border border-white/35 bg-white/15 px-5 py-8 shadow-2xl backdrop-blur-md animate-streak-pop sm:px-8 sm:py-10">
            <button type="button" aria-label="Dismiss streak celebration" onClick={() => setShowStreakCelebration(false)} className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-white transition hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white sm:right-4 sm:top-4">
              <X size={19} />
            </button>
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl" aria-hidden="true">
              <div className="firecracker absolute left-6 top-8" />
              <div className="firecracker absolute right-8 top-12" />
              <div className="firecracker absolute bottom-8 left-1/4" />
              <div className="firecracker absolute bottom-10 right-1/4" />
            </div>
            <div className="relative">
              <h2 id="streak-dialog-title" className="mb-4 break-words text-3xl font-bold leading-tight sm:text-4xl">Streak Boost!</h2>
              <p className="mb-4 text-base sm:text-lg">Your daily streak is growing.</p>
              <p className="text-2xl font-semibold sm:text-3xl">{streakCount} day streak</p>
            </div>
          </div>
        </div>
      ) : null}

      {needsProfileSetup ? (
        <ProfileSetupModal
          onSave={updateUserProfile}
        />
      ) : null}

    </div>
  );
}

export default DashboardLayout;
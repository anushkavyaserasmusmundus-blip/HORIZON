import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";
import NotificationsModal from "./NotificationsModal";


function DashboardLayout({children}){

  const [showNotifications, setShowNotifications] = useState(false);
  const [streakCount, setStreakCount] = useState(14);
  const [showStreakCelebration, setShowStreakCelebration] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const savedCount = parseInt(localStorage.getItem("dailyStreakCount") ?? "14", 10);
    const lastDate = localStorage.getItem("lastStreakDate");

    if (lastDate !== today) {
      const updatedCount = savedCount + 1;
      localStorage.setItem("dailyStreakCount", String(updatedCount));
      localStorage.setItem("lastStreakDate", today);
      setStreakCount(updatedCount);

      const showTimer = window.setTimeout(() => {
        setShowStreakCelebration(true);
      }, 5000);

      const hideTimer = window.setTimeout(() => {
        setShowStreakCelebration(false);
      }, 8000);

      return () => {
        window.clearTimeout(showTimer);
        window.clearTimeout(hideTimer);
      };
    }

    setStreakCount(savedCount);
  }, []);


return(

<div className="min-h-screen flex flex-col overflow-hidden">

<TopNavbar onOpenNotifications={() => setShowNotifications(true)} streakCount={streakCount} />

<div className="flex flex-1 overflow-hidden">

<Sidebar/>

<div className="flex-1 overflow-hidden">

<main className="flex-1 overflow-y-auto p-5 bg-[#FBE7CC]" style={{ height: 'calc(100vh - 4rem)' }}>
  {children}
</main>


</div>


</div>

{showNotifications ? <NotificationsModal onClose={() => setShowNotifications(false)} /> : null}

{showStreakCelebration ? (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#16a34a]/80 p-6 text-center text-white backdrop-blur-sm">
    <div className="absolute inset-0 overflow-hidden">
      <div className="firecracker absolute left-10 top-16" />
      <div className="firecracker absolute right-10 top-20" />
      <div className="firecracker absolute left-1/3 bottom-16" />
      <div className="firecracker absolute right-1/3 bottom-24" />
      <div className="firecracker absolute left-1/2 top-1/2" />
    </div>
    <div className="relative mx-auto max-w-2xl rounded-[2rem] border border-white/30 bg-white/15 px-8 py-10 shadow-2xl backdrop-blur-md animate-streak-pop">
      <div className="mb-6 text-5xl font-bold">Streak Boost!</div>
      <p className="mb-4 text-xl">Your streak just grew by 1 day.</p>
      <p className="text-3xl font-semibold">{streakCount} day streak</p>
    </div>
  </div>
) : null}

</div>


)

}


export default DashboardLayout;
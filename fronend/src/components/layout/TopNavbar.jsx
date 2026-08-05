import { Bell, Flame } from "lucide-react";
import { mockProfile } from "../dashboard/widgets/Personal/mockProfile";
import sunLogo from "../../assets/images/sun.logo.jpg";

function TopNavbar({ onOpenNotifications, streakCount }) {
  const firstName = mockProfile.name.split(" ")[0];

  return (
    <header className="relative flex h-20 items-center border-b border-[#F2D5A5] bg-[#FFF8EF] px-6">
      <div className="flex items-center gap-3">
        <img src={sunLogo} alt="Horizon logo" className="h-10 w-10 rounded-full object-cover" />
        <h1 className="text-2xl font-semibold text-[#2D4C59]">Horizon</h1>
      </div>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <p className="text-base italic text-[#2D4C59]" style={{ fontFamily: "Belista, cursive" }}>
          Welcome back, {firstName}
        </p>
      </div>

      <div className="ml-auto flex items-center gap-3">
        <button className="flex items-center gap-2 rounded-full border border-[#15803d] bg-[#16a34a] px-4 py-2 text-sm font-semibold text-white shadow-sm">
          <Flame size={16} className="text-white" />
          {streakCount} day streak
        </button>

        <button onClick={onOpenNotifications} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D1FAE5] bg-[#ECFDF5] text-[#166534] shadow-sm">
          <Bell size={18} />
        </button>
      </div>
    </header>
  );
}

export default TopNavbar;
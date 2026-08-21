import { Bell, Flame } from "lucide-react";
import sunLogo from "../../assets/images/sun.logo.jpg";

function TopNavbar({ onOpenNotifications, streakCount }) {
  return (
    <header className="relative z-20 flex min-h-20 items-center justify-center border-b border-[#F7B39B] bg-[#FFF4E6] px-5 py-3 lg:px-8">
      <div className="absolute left-5 flex items-center gap-2.5 lg:left-8">
        <img src={sunLogo} alt="Horizon logo" className="h-10 w-10 rounded-full object-cover" />
      </div>

      <div className="text-center">
        <p className="font-serif text-4xl font-black uppercase leading-none tracking-[0.08em] text-[#9E2F1C] sm:text-5xl">Horizon</p>
      </div>

      <div className="absolute right-5 flex items-center gap-2 lg:right-8">
        <button className="flex items-center gap-1.5 rounded-full bg-[#FF7A3D] px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#F4512A]">
          <Flame size={15} />
          {streakCount} day streak
        </button>
        <button onClick={onOpenNotifications} aria-label="Open notifications" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F36B91] text-white shadow-sm transition hover:bg-[#E94E78]">
          <Bell size={16} />
        </button>
      </div>
    </header>
  );
}

export default TopNavbar;
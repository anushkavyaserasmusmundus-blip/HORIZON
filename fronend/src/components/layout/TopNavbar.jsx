import { Bell, Flame } from "lucide-react";
import sunLogo from "../../assets/images/sun.logo.jpg";

function TopNavbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-[#F2D5A5] bg-[#FFF8EF] px-6">
      <div className="flex items-center gap-3">
        <img src={sunLogo} alt="Horizon logo" className="h-10 w-10 rounded-full object-cover" />
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#C84D38]">
            Horizon
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 rounded-full border border-[#F2D5A5] bg-white px-4 py-2 text-sm font-semibold text-[#2D4C59] shadow-sm">
          <Flame size={16} className="text-[#C84D38]" />
          14 day streak
        </button>

        <button className="flex h-10 w-10 items-center justify-center rounded-full border border-[#F2D5A5] bg-white text-[#2D4C59] shadow-sm">
          <Bell size={18} />
        </button>
      </div>
    </header>
  );
}

export default TopNavbar;
import { Bell, Flame, Menu } from "lucide-react";
import sunLogo from "../../assets/images/sun.logo.jpg";

function HeaderActions({ streakCount, onOpenNotifications, showStreakText = true }) {
  return (
    <>
      <button type="button" data-snapshot-ignore="true" aria-label={`${streakCount} day streak`} title={`${streakCount} day streak`} className="flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-full bg-[#FF7A3D] px-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#F4512A] sm:px-3">
        <Flame size={15} />
        {showStreakText && <span className="hidden sm:inline">{streakCount} day streak</span>}
      </button>
      <button type="button" data-snapshot-ignore="true" onClick={onOpenNotifications} aria-label="Open notifications" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F36B91] text-white shadow-sm transition hover:bg-[#E94E78]">
        <Bell size={16} />
      </button>
    </>
  );
}

function TopNavbar({ onOpenNotifications, onOpenMenu, streakCount, showMenu = true }) {
  return (
    <header data-snapshot-ignore="true" className="relative z-20 flex min-h-20 items-center justify-center border-b border-[#F7B39B] bg-[#FFF4E6] px-4 py-3 sm:px-5 lg:px-8">
      <div className="flex w-full items-center justify-between gap-2 lg:hidden">
        {showMenu && <button type="button" data-snapshot-ignore="true" onClick={onOpenMenu} aria-label="Open navigation" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#9E2F1C] shadow-sm"><Menu size={18} /></button>}
        <p className="min-w-0 flex-1 whitespace-nowrap text-center font-serif text-xl font-black uppercase leading-none tracking-[0.08em] text-[#9E2F1C] sm:text-2xl">Horizon</p>
        <div className="flex shrink-0 items-center gap-1.5">
          <HeaderActions streakCount={streakCount} onOpenNotifications={onOpenNotifications} showStreakText={false} />
        </div>
      </div>

      <div className="absolute left-5 hidden items-center gap-2.5 lg:flex lg:left-8">
        <img src={sunLogo} alt="Horizon logo" className="h-10 w-10 rounded-full object-cover" />
      </div>

      <div className="hidden text-center lg:block">
        <p className="font-serif text-5xl font-black uppercase leading-none tracking-[0.08em] text-[#9E2F1C]">Horizon</p>
      </div>

      <div className="absolute right-5 hidden items-center gap-2 lg:right-8 lg:flex">
        <HeaderActions streakCount={streakCount} onOpenNotifications={onOpenNotifications} />
      </div>
    </header>
  );
}

export default TopNavbar;
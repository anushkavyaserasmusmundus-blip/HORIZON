import {
  BarChart3,
  Brain,
  HeartPulse,
  LayoutDashboard,
  LogOut,
  Settings,
  Sparkles,
  Target,
  UserRound,
} from "lucide-react";

function Sidebar() {
  const mainItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Today's Focus", icon: <Target size={18} /> },
    { name: "Skill Matrix", icon: <Brain size={18} /> },
    { name: "Analytics", icon: <BarChart3 size={18} /> },
  ];

  const personalItems = [
    { name: "Profile", icon: <UserRound size={18} /> },
    { name: "Health Assistant", icon: <HeartPulse size={18} /> },
  ];

  const otherItems = [
    { name: "Settings", icon: <Settings size={18} /> },
    { name: "Log out", icon: <LogOut size={18} /> },
  ];

  return (
    <aside className="w-60 border-r border-[#F2D5A5] bg-[#FFF8EF] p-4 lg:w-56">
      <div className="flex items-center gap-3 rounded-2xl border border-[#F2D5A5] bg-[#FFFDF8] p-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F4B643] text-sm font-semibold text-[#2D4C59]">
          AP
        </div>
        <div>
          <p className="text-sm font-semibold text-[#2D4C59]">Aarav Patel</p>
          <p className="text-xs text-[#7B8790]">Focused builder</p>
        </div>
      </div>

      <nav className="mt-6 space-y-4">
        <div className="space-y-1">
          {mainItems.map((item) => (
            <button
              key={item.name}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-[#2D4C59] transition hover:bg-[#F9C966]"
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}
        </div>

        <div className="border-t border-[#F2D5A5] pt-3">
          <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8A8D95]">
            Personal
          </p>
          <div className="space-y-1">
            {personalItems.map((item) => (
              <button
                key={item.name}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-[#2D4C59] transition hover:bg-[#F9C966]"
              >
                {item.icon}
                <span>{item.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-[#F2D5A5] pt-3">
          <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8A8D95]">
            Other
          </p>
          <div className="space-y-1">
            {otherItems.map((item) => (
              <button
                key={item.name}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-[#2D4C59] transition hover:bg-[#F9C966]"
              >
                {item.icon}
                <span>{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  HeartPulse,
  LayoutDashboard,
  LogOut,
  Settings,
  UserRound,
} from "lucide-react";
import { mockProfile } from "../dashboard/widgets/Personal/mockProfile";

function Sidebar() {
  const mainItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={18} />, to: "/" },
  ];

  const personalItems = [
    { name: "Profile", icon: <UserRound size={18} />, to: "/profile" },
    { name: "Health Analysis", icon: <HeartPulse size={18} />, to: "/health-analysis" },
  ];

  const otherItems = [
    { name: "Settings", icon: <Settings size={18} /> },
    { name: "Log out", icon: <LogOut size={18} /> },
  ];

  const [profile, setProfile] = useState({ ...mockProfile });

  useEffect(() => {
    function onUpdate() {
      setProfile({ ...mockProfile });
    }
    window.addEventListener("profile-updated", onUpdate);
    return () => window.removeEventListener("profile-updated", onUpdate);
  }, []);

  return (
    <aside className="sticky top-16 h-[calc(100vh-4rem)] w-60 border-r border-[#F2D5A5] bg-[#FFF8EF] p-4 lg:w-56">
      <div className="flex items-center gap-3 rounded-2xl border border-[#F2D5A5] bg-[#FFFDF8] p-3">
        <div className="h-11 w-11 overflow-hidden rounded-full border-2 border-[#F4B643] bg-[#FFF8EF]">
          {profile.image ? (
            <img src={profile.image} alt={profile.name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-11 w-11 items-center justify-center bg-[#F4B643] text-sm font-semibold text-[#2D4C59]">{profile.name.charAt(0)}</div>
          )}
        </div>
        <div>
          <p className="text-sm font-semibold text-[#2D4C59]">{profile.name}</p>
          <p className="text-xs text-[#7B8790]">{profile.designation}</p>
        </div>
      </div>

      <nav className="mt-6 space-y-4">
        <div className="space-y-1">
          {mainItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${
                  isActive ? "bg-[#F9C966] text-[#2D4C59]" : "text-[#2D4C59] hover:bg-[#F9C966]"
                }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </div>

        <div className="border-t border-[#F2D5A5] pt-3">
          <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8A8D95]">
            Personal
          </p>
          <div className="space-y-1">
            {personalItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                className={({ isActive }) =>
                  `flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${
                    isActive ? "bg-[#F9C966] text-[#2D4C59]" : "text-[#2D4C59] hover:bg-[#F9C966]"
                  }`
                }
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
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
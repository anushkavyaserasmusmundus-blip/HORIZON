import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import {
  House,
  LayoutDashboard,
  LogOut,
  Settings,
  UserRound,
  X,
} from "lucide-react";
import { AuthContext } from "../../context/AuthContext";

function Sidebar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const mainItems = [
    { name: "Home", icon: <House size={18} />, to: "/home" },
    { name: "Dashboard", icon: <LayoutDashboard size={18} />, to: "/dashboard" },
  ];

  const personalItems = [
    { name: "Profile", icon: <UserRound size={18} />, to: "/profile" },
  ];

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <>
      <aside className="fixed left-0 top-20 z-30 h-[calc(100vh-5rem)] w-60 overflow-y-auto border-r border-[#F7B39B] bg-[#FFF4E6] p-4 lg:w-56">
        <nav className="space-y-5">

          {/* Main navigation */}
          <div className="space-y-1">
            {mainItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${
                    isActive
                      ? "bg-[#F9C966] text-[#2D4C59]"
                      : "text-[#2D4C59] hover:bg-[#F9C966]"
                  }`
                }
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            ))}
          </div>

          {/* Personal */}
          <div className="border-t border-[#F7B39B] pt-3">
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
                      isActive
                        ? "bg-[#F9C966] text-[#2D4C59]"
                        : "text-[#2D4C59] hover:bg-[#F9C966]"
                    }`
                  }
                >
                  {item.icon}
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </div>
          </div>

          {/* Other */}
          <div className="border-t border-[#F7B39B] pt-3">
            <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8A8D95]">
              Other
            </p>

            <div className="space-y-1">

              {/* Settings */}
              <button
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-[#2D4C59] transition hover:bg-[#F9C966]"
              >
                <Settings size={18} />
                <span>Settings</span>
              </button>

              {/* Logout */}
              <button
                onClick={() => setShowLogoutModal(true)}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-[#2D4C59] transition hover:bg-[#F9C966]"
              >
                <LogOut size={18} />
                <span>Log out</span>
              </button>

            </div>
          </div>

        </nav>
      </aside>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">

          <div className="relative w-full max-w-md rounded-3xl border border-[#F2D5A5] bg-[#FFFDF8] p-7 shadow-2xl">

            {/* Close */}
            <button
              onClick={() => setShowLogoutModal(false)}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-[#7B8790] transition hover:bg-[#FBE7CC] hover:text-[#2D4C59]"
            >
              <X size={18} />
            </button>

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FBE7CC] text-[#C84D38]">
              <LogOut size={22} />
            </div>

            <h2 className="mt-5 text-xl font-semibold text-[#2D4C59]">
              Do you want to log out?
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#6B7280]">
              You will need to log in again to access your Horizon dashboard.
            </p>

            <div className="mt-6 flex justify-end gap-3">

              <button
                onClick={() => setShowLogoutModal(false)}
                className="rounded-full border border-[#E8DCCF] bg-white px-5 py-2.5 text-sm font-semibold text-[#2D4C59] transition hover:bg-[#FFF8EF]"
              >
                Cancel
              </button>

              <button
                onClick={handleLogout}
                className="rounded-full bg-[#F4B643] px-5 py-2.5 text-sm font-semibold text-[#2D4C59] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#E8A92F] hover:shadow-md"
              >
                Log out
              </button>

            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
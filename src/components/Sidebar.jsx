import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Mail,
  AlertTriangle,
  ClipboardList,
  LogOut,
  ShieldCheck,
} from "lucide-react";

import { toast } from "react-toastify";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");

    toast.success("You have been logged out.");

    navigate("/login");
  };

  const navigation = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Emails",
      path: "/emails",
      icon: Mail,
    },
    {
      name: "Reviews",
      path: "/reviews",
      icon: AlertTriangle,
    },
    {
      name: "Audit Trails",
      path: "/audit-trails",
      icon: ClipboardList,
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-[#14181F] text-white flex flex-col">
      {/* Logo */}
      <div className="h-20 flex items-center px-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-6 w-6 text-[#B8863B]" />

          <div>
            <div className="text-lg font-semibold tracking-wide">
              SYLPRIN
            </div>

            <div className="text-[9px] text-[#9AA4B1] tracking-widest">
              AI EMAIL AGENT
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <div className="text-[10px] uppercase tracking-widest text-[#6B7684] font-semibold px-3 mb-3">
          Monitoring
        </div>

        <div className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${
                    isActive
                      ? "bg-[#1F3A5F] text-white"
                      : "text-[#9AA4B1] hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Logout */}
      <div className="px-4 pb-5">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-[#9AA4B1] hover:bg-red-500/10 hover:text-red-400 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
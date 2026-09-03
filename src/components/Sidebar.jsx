import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Mail,
  AlertTriangle,
  ClipboardList,
} from "lucide-react";

function Sidebar() {
  const menuItems = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      path: "/emails",
      label: "Emails",
      icon: Mail,
    },
    {
      path: "/reviews",
      label: "Reviews",
      icon: AlertTriangle,
    },
    {
      path: "/audit-trails",
      label: "Audit Trails",
      icon: ClipboardList,
    },
  ];

  return (
    <aside className="flex min-h-screen w-64 flex-col border-r border-gray-200 bg-white">
      {/* Logo */}
      <div className="flex h-20 items-center border-b border-gray-200 px-6">
        <div>
          <h1 className="text-xl font-bold tracking-wide text-gray-900">
            SYLPRIN
          </h1>

          <p className="text-xs text-gray-500">
            ADMIN MONITORING
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Monitoring
        </p>

        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-gray-900 text-white"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`
                }
              >
                <Icon size={19} strokeWidth={2} />

                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* System Status */}
      <div className="border-t border-gray-200 p-4">
        <div className="rounded-lg bg-gray-50 p-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>

            <p className="text-sm font-medium text-gray-800">
              AI Email Agent
            </p>
          </div>

          <p className="mt-1 text-xs text-gray-500">
            System monitoring active
          </p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;


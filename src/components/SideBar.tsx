import React from "react";
import type { UserResponse as User } from "focustime_types";
interface SidebarProps {
  user: User | null;
  activeView: string;
  setActiveView: (view: string) => void;
  logout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  user,
  activeView,
  setActiveView,
  logout,
}) => {
  const menuItems = [
    { label: "Dashboard", key: "dashboard" },
    { label: "My Task", key: "mytasks" },
    { label: "Settings", key: "settings" },
    { label: "Help", key: "help" },
  ];

  return (
    <aside className="fixed top-0 left-0 w-64 h-full bg-[#ff5b5b] text-white flex flex-col items-center py-6 shadow-lg">
      {/* Profile Section */}
      <div className="flex flex-col items-center mb-6">
        <img
          src="https://i.pravatar.cc/100"
          alt="User avatar"
          className="w-20 h-20 rounded-full border-4 border-white shadow-md mb-3"
        />
        <h3 className="font-semibold text-lg">{user?.name || "Guest"}</h3>
        <p className="text-sm text-white/80 text-center px-2">
          {user?.email || ""}
        </p>
      </div>

      {/* Menu Items */}
      <nav className="flex flex-col w-full px-4">
        {menuItems.map((item) => (
          <div
            key={item.key}
            onClick={() => setActiveView(item.key)}
            className={`cursor-pointer p-3 rounded-md transition-colors ${
              activeView === item.key
                ? "bg-red-700 font-semibold"
                : "hover:bg-red-600 font-medium"
            }`}
          >
            {item.label}
          </div>
        ))}
      </nav>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Logout Button */}
      <button
        onClick={logout}
        className="w-[90%] mt-4 py-2 bg-white text-[#ff5b5b] rounded-md font-semibold hover:bg-gray-100 transition"
      >
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;

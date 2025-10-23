// src/components/Navbar.tsx
import { useState, type KeyboardEvent } from "react";
// import dayjs from "dayjs";
import { Bell } from "lucide-react";
import type {
  NotificationAttributes as Notification,
  UserResponse as User,
} from "focustime_types";
import { updateNofication } from "../api/notificationApi";

// interface Notification {
//   id: number;
//   message: string;
//   is_read: boolean;
// }

interface NavbarProps {
  onsearch: (query: string) => void;
  user: User | null;
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
}

const Navbar: React.FC<NavbarProps> = ({
  onsearch,
  user,
  notifications,
  setNotifications,
}) => {
  const [search, setSearch] = useState<string>("");
  const [showNotifications, setShowNotifications] = useState<boolean>(false);

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onsearch(search);
    }
  };

  const handleNotificationClick = async (notificationId: number) => {
    try {
      const notify = await updateNofication(notificationId);
      console.log("updated notify:", notify);

      setNotifications((prev) =>
        prev.map((n) => (n.id === notificationId ? { ...n, isRead: true } : n))
      );
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center fixed top-0 left-64 right-0 z-10">
      <div className="flex items-center gap-2">
        <h3 className="text-xl font-bold">My To do's</h3>
      </div>

      <div className="flex-1 max-w-3xl mx-6">
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Search tasks..."
            className="w-full pl-10 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:border-red-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 relative">
        <span className="text-gray-600">Welcome, {user?.name}</span>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="focus:outline-none relative"
          >
            <Bell className="w-6 h-6 text-gray-600" />
            {notifications?.some((n) => !n.isRead) && (
              <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full" />
            )}
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-64 bg-white border rounded shadow-lg z-20">
              {notifications.length > 0 ? (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    className="px-4 py-2 border-b hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleNotificationClick(n.id)}
                  >
                    <p className="font-medium">{n.message}</p>
                    <p className="text-xs text-gray-500">
                      {/* Uncomment if you want to show scheduled date */}
                      {/* {n.scheduled_for && dayjs(n.scheduled_for).format("DD MMM YYYY, hh:mm A")} */}
                    </p>
                  </div>
                ))
              ) : (
                <p className="px-4 py-2 text-gray-500">No notifications</p>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

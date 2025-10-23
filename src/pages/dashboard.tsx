import React, { useState } from "react";

import { useAuth } from "../context/authContext";
import Sidebar from "../components/SideBar";
import Navbar from "../components/Navbar";
import { useNotifications } from "../hooks/useNotification";
import DashboardView from "../components/DashboardView";
import { useTasks } from "../hooks/useTasks";
import MyTaskView from "../components/MyTaskView";
import { Logout as LogoutApi } from "../api/authApi";

const Dashboard: React.FC = () => {
  const { logout, user } = useAuth();
  const { notifications, setNotifications, markAsRead } = useNotifications();
  const { dashboardData } = useTasks();
  const [activeView, setActiveView] = useState<string>("dashboard");

  const handleSearch = (query: string) => {
    console.log("Search query:", query);
  };

  const logoutfun = async () => {
    try {
      await LogoutApi();
      logout();
    } catch (error) {
      console.log("error:", error);
    }
  };
  const renderView = () => {
    switch (activeView) {
      case "dashboard":
        return (
          <DashboardView
            summary={
              dashboardData?.summary ?? {
                total: 0,
                completed: 0,
                pending: 0,
                highPriority: 0,
              }
            }
            upcomingTasks={dashboardData?.upcomingTasks ?? []}
            importantTasks={dashboardData?.importantTasks ?? []}
          />
        );
      case "mytasks":
        return <MyTaskView />;
      case "settings":
        return <div className="p-6">settings Section (coming soon)</div>;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen ">
      <Sidebar
        user={user}
        activeView={activeView}
        setActiveView={setActiveView}
        logout={logoutfun}
      />

      <Navbar
        user={user}
        onsearch={handleSearch}
        notifications={notifications}
        setNotifications={setNotifications}
      />

      <div className="flex-1 ml-64 mt-4  bg-gray-50 overflow-y-auto">
        {renderView()}
      </div>
    </div>
  );
};
export default Dashboard;

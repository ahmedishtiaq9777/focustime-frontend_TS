import api from "./axiosclient";
export const updateNofication = async (notificationId: number) => {
  try {
    const response = await api.patch(`/notifications/${notificationId}/read`);
    return response.data;
  } catch (error: any) {
    console.error("Failed to update notification:", error);
    throw error;
  }
};
export const fetchNotifications = async () => {
  try {
    const response = await api.get("/notifications");
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch notifications:", error);
    throw error;
  }
};

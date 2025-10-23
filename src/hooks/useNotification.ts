// src/hooks/useNotifications.ts
import { useState, useEffect, useCallback } from "react";
import type { NotificationAttributes as Notification } from "focustime_types";
import {
  fetchNotifications as getNotifications,
  updateNofication,
} from "../api/notificationApi";

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch all notifications
  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getNotifications();
      console.log("notifications:", data);
      setNotifications(data);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Mark a single notification as read
  const markAsRead = useCallback(async (id: number) => {
    try {
      await updateNofication(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
      );
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  }, []);

  // Auto-fetch notifications on mount
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return {
    notifications,
    loading,
    fetchNotifications,
    markAsRead,
    setNotifications,
  };
};

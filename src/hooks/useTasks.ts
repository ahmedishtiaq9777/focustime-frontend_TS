import { useState, useEffect } from "react";
import {
  fetchTasks,
  addTask,
  updateTask,
  deleteTaskapi,
  getDashboardData,
} from "../api/taskApi";
import type {
  DashboardDataResponse,
  TaskAttributes as Task,
} from "focustime_types";
import axios from "axios";
import { useAuth } from "../context/authContext";
import type { TaskInput } from "../types";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [dashboardData, setDashboardData] =
    useState<DashboardDataResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { logout } = useAuth();
  const loadTasks = async (page = 1, limit = 10) => {
    try {
      setLoading(true);
      console.log("loadTASKS");
      const { tasks } = await fetchTasks(page, limit);
      console.log("tasksinload tasks:", tasks);
      setTasks(tasks);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status == 403 || err?.response?.status == 401) {
          logout();
        }
        console.log("Axios error:", err.response?.data?.error || err.message);
      } else if (err instanceof Error) {
        console.log("General JS error:", err.message);
      } else {
        console.log("Unknown error", err);
      }
      console.log("error:");
      setError("Failed to load tasks");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData: TaskInput) => {
    try {
      await addTask(taskData);
      await loadTasks();
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  const editTask = async (id: number, taskData: Partial<Task>) => {
    try {
      console.log("taskData:edit:", taskData);
      await updateTask(id, taskData);
      await loadTasks();
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const removeTask = async (id: number) => {
    try {
      await deleteTaskapi(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const loadDashboardData = async () => {
    try {
      const data = await getDashboardData();
      console.log("getdashboard data:", data);
      setDashboardData(data);
    } catch (err) {
      console.error("Error loading dashboard data:", err);
    }
  };

  useEffect(() => {
    loadDashboardData();
    loadTasks(1, 10);
  }, []);

  return {
    tasks,
    dashboardData,
    loading,
    error,
    loadTasks,
    createTask,
    editTask,
    removeTask,
    loadDashboardData,
  };
};

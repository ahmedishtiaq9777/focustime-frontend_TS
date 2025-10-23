import type { TaskInput } from "../types";
import axiosClient from "./axiosclient";
import type {
  TaskAttributes as Task,
  DashboardDataResponse as DashboardData,
} from "focustime_types";

/**
 * Fetch paginated tasks
 */
export const fetchTasks = async (
  page = 1,
  limit = 10
): Promise<{ tasks: Task[] }> => {
  const res = await axiosClient.get(`/tasks?page=${page}&limit=${limit}`);
  return res.data;
};

/**
 * Add a new task
 */
export const addTask = async (taskData: TaskInput): Promise<Task> => {
  const res = await axiosClient.post("/addtask", taskData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

/**
 * Update an existing task
 */
export const updateTask = async (
  id: number,
  taskData: FormData | Partial<Task>
): Promise<Task> => {
  const res = await axiosClient.put(`/task/${id}`, taskData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

/**
 * Delete a task by ID
 */
export const deleteTaskapi = async (
  id: number
): Promise<{ success: boolean }> => {
  const res = await axiosClient.delete(`/tasks/${id}`);
  return res.data;
};

/**
 * Fetch dashboard overview (summary, upcoming tasks, etc.)
 */
export const getDashboardData = async (): Promise<DashboardData> => {
  const res = await axiosClient.get("/getDashboardData");
  return res.data;
};

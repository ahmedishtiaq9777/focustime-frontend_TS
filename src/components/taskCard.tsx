import React from "react";
import type { TaskAttributes as Task } from "focustime_types";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

interface TaskCardProps {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-600";
      case "medium":
        return "bg-yellow-100 text-yellow-600";
      case "low":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between hover:shadow-lg transition">
      {/* Task Header */}
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>

        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="text-blue-500 hover:text-blue-700 transition"
          >
            <FiEdit2 size={18} />
          </button>
          <button
            onClick={onDelete}
            className="text-red-500 hover:text-red-700 transition"
          >
            <FiTrash2 size={18} />
          </button>
        </div>
      </div>

      {/* Task Description */}
      <p className="text-gray-600 text-sm mb-3 line-clamp-3">
        {task.description || "No description provided."}
      </p>

      {/* Footer Section */}
      <div className="flex justify-between items-center mt-auto">
        {/* Priority */}
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full ${getPriorityColor(
            task.priority || ""
          )}`}
        >
          {task.priority}
        </span>

        {/* Scheduled Date */}
        {task.scheduled_for && (
          <span className="text-xs text-gray-500">
            {new Date(task.scheduled_for).toLocaleDateString()}
          </span>
        )}

        {/* Status */}
        <span
          className={`text-xs font-medium ${
            task.status === "completed" ? "text-green-600" : "text-yellow-600"
          }`}
        >
          {task.status}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;

import React, { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { TaskAttributes as Task } from "focustime_types";
import type { TaskInput } from "../types/index";
import { FiX } from "react-icons/fi";

interface AddTaskModalProps {
  onSubmit: (taskData: TaskInput) => Promise<void>;
  onClose: () => void;
  taskToEdit?: Task | null;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({
  onSubmit,
  onClose,
  taskToEdit,
}) => {
  const [formData, setFormData] = useState<TaskInput>({
    title: "",
    description: "",
    scheduled_for: new Date(),
    priority: "Moderate",
    image: null,
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 🔁 Prefill form when editing a task
  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        title: taskToEdit.title,
        description: taskToEdit.description ?? "",
        scheduled_for: new Date(taskToEdit.scheduled_for!),
        priority:
          (taskToEdit.priority as "Low" | "Moderate" | "Extreme") ?? "Moderate",
        image: null,
      });
      setPreviewUrl(taskToEdit.image_url ?? null);
    }
  }, [taskToEdit]);

  // 📝 Handle input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "scheduled_for" ? new Date(value) : value,
    }));
  };

  // 📷 Handle image upload
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  //  Submit handler
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("formDataout:", formData);

    if (
      !formData.title.trim() ||
      !formData.description?.trim() ||
      !formData.priority ||
      !formData.scheduled_for
    ) {
      console.log("formData:", formData.scheduled_for);
      setError("Please Complete all Fields");
      return;
    } else {
      setError(null);
    }

    await onSubmit({
      ...formData,
    });
  };
  const formatForInput = (date: Date) => {
    const offset = date.getTimezoneOffset();
    const local = new Date(date.getTime() - offset * 60000);
    return local.toISOString().slice(0, 16); // YYYY-MM-DDTHH:mm
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-30">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        >
          <FiX size={22} />
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          {taskToEdit ? "Edit Task" : "Add New Task"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          {error && <h5 className="text-red-500">{error}</h5>}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Scheduled Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Scheduled For
            </label>
            <input
              name="scheduled_for"
              type="datetime-local"
              value={formatForInput(formData.scheduled_for)}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Priority
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="w-32 h-32 object-cover mt-2 rounded-lg border"
              />
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600  rounded-lg hover:bg-blue-700"
            >
              {taskToEdit ? "Update Task" : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;

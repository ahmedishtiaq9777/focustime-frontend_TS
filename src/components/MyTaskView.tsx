import { useEffect, useState } from "react";
import TaskCard from "../components/taskCard";
import AddTaskModal from "../components/AddTaskModal";
import { useTasks } from "../hooks/useTasks";
import type { TaskAttributes as Task } from "focustime_types";
import type { TaskInput } from "../types";

const MyTaskView = () => {
  const { tasks, loading, createTask, editTask, removeTask, loadTasks } =
    useTasks();

  const [taskModalVisible, setTaskModalVisible] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  console.log("tasks:", tasks);

  const handleAddClick = () => {
    setTaskToEdit(null);
    setTaskModalVisible(true);
  };

  const handleEditClick = (task: Task) => {
    setTaskToEdit(task);
    setTaskModalVisible(true);
  };

  const handleSubmit = async (taskData: TaskInput) => {
    try {
      if (taskToEdit) {
        await editTask(taskToEdit.id, taskData as Partial<Task>);
      } else {
        await createTask(taskData);
        setSuccessMsg("✅ Task created successfully!");
      }
    } catch (error) {
      console.error("Task operation failed:", error);
    } finally {
      setTaskModalVisible(false);
      setTaskToEdit(null);
      setTimeout(() => setSuccessMsg(null), 3000);
    }
  };

  useEffect(() => {
    loadTasks(1, 10);
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this task?")) {
      await removeTask(id);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Loading tasks...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {successMsg && (
        <div className="mb-4 p-3 rounded bg-green-100 text-green-700 border border-green-400">
          {successMsg}
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">My Tasks</h2>
        <button
          onClick={handleAddClick}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md mt-2.5"
        >
          + Add Task
        </button>
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={() => handleEditClick(task)}
              onDelete={() => handleDelete(task.id)}
            />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No tasks found.
          </p>
        )}
      </div>

      {/* Add/Edit Modal */}
      {taskModalVisible && (
        <AddTaskModal
          onSubmit={handleSubmit}
          onClose={() => setTaskModalVisible(false)}
          taskToEdit={taskToEdit}
        />
      )}
    </div>
  );
};

export default MyTaskView;

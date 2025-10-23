import React from "react";
import type { TaskAttributes as Task } from "focustime_types";
import moment from "moment";

interface DashboardViewProps {
  summary: {
    total: number;
    completed: number;
    pending: number;
    highPriority: number;
  };
  upcomingTasks: Task[];
  importantTasks: Task[];
}

const DashboardView: React.FC<DashboardViewProps> = ({
  summary,
  upcomingTasks,
  importantTasks,
}) => {
  return (
    <div className="p-6 mt-4 ">
      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          label="Total Tasks"
          value={summary?.total}
          color="bg-blue-600"
        />
        <StatCard
          label="Completed"
          value={summary?.completed}
          color="bg-green-600"
        />
        <StatCard
          label="Pending"
          value={summary?.pending}
          color="bg-yellow-500"
        />
        <StatCard
          label="High Priority"
          value={summary?.highPriority}
          color="bg-red-600"
        />
      </div>

      {/* Upcoming & Important Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TaskSection
          title="Upcoming Tasks (Next 7 Days)"
          tasks={upcomingTasks}
        />
        <TaskSection title="Important Tasks" tasks={importantTasks} />
      </div>
    </div>
  );
};

export default DashboardView;

interface StatCardProps {
  label: string;
  value: number;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, color }) => (
  <div
    className={`${color} text-white rounded-xl shadow-md p-6 flex flex-col justify-center items-center`}
  >
    <span className="text-sm font-medium">{label}</span>
    <span className="text-3xl font-bold mt-2">{value}</span>
  </div>
);

interface TaskSectionProps {
  title: string;
  tasks: Task[];
}

const TaskSection: React.FC<TaskSectionProps> = ({ title, tasks }) => (
  <div className="bg-white rounded-xl shadow p-4">
    <h3 className="text-lg font-semibold mb-3 text-center">{title}</h3>
    {tasks?.length > 0 ? (
      tasks?.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between border-b last:border-b-0 py-2 px-2 hover:bg-gray-50"
        >
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            <div>
              <p className="font-medium text-gray-800">{task.title}</p>
              <p className="text-sm text-gray-500 truncate max-w-[250px]">
                {task.description}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                <span className="font-semibold text-gray-700">Priority:</span>{" "}
                {task.priority}{" "}
                <span className="ml-2 font-semibold text-gray-700">
                  Status:
                </span>{" "}
                {task.status}
              </p>
              <p className="text-xs text-gray-400">
                <span className="font-semibold text-gray-700">Created:</span>{" "}
                {moment(task.created_at).format("YYYY-MM-DD")}
              </p>
            </div>
          </div>
          {task.image_url && (
            <img
              src={task.image_url}
              alt="task"
              className="w-16 h-12 object-cover rounded-md"
            />
          )}
        </div>
      ))
    ) : (
      <p className="text-gray-500 text-center py-4">No tasks found</p>
    )}
  </div>
);

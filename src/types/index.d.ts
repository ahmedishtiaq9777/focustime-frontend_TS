export interface TaskInput {
  title: string;
  description?: string;
  priority?: "Low" | "Moderate" | "Extreme";
  status?: "Not Started" | "In Progress" | "Completed";
  scheduled_for: Date;
  image?: File | null;
}

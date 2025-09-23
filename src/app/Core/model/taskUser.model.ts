export interface TaskUser {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  assignedTaskId?: number | null;  // <-- Add this field
}

export interface Task {
  id: number;
  title: string;
  description: string;
  assignedTo?: number; // taskUserId if assigned
  completed: boolean;
}

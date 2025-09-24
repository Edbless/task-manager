export interface Task {
  id: number;
  title: string;
  description: string;
  assignedTo?: number | null;  // ✅ allow null; // taskUserId if assigned
  completed: boolean;
}

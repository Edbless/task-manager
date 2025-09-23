import { Injectable } from '@angular/core';
import { Task } from '../Core/model/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private storageKey = 'tasks';

  constructor() { }

  // Get all tasks
  getTasks(): Task[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) as Task[] : [];
  }

  // Add a new task
  addTask(title: string, description: string): Task {
    const tasks = this.getTasks();
    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      completed: false
    };
    tasks.push(newTask);
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
    return newTask;
  }

  // Assign a task to a user
  assignTask(taskId: number, userId: number) {
    const tasks = this.getTasks();
    const index = tasks.findIndex(t => t.id === taskId);
    if (index !== -1) {
      tasks[index].assignedTo = userId;
      localStorage.setItem(this.storageKey, JSON.stringify(tasks));
    }
  }

  // Mark task as completed (or remove task)
  completeTask(taskId: number) {
    let tasks = this.getTasks();
    tasks = tasks.filter(t => t.id !== taskId);
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }

  // Get all unassigned tasks
  getUnassignedTasks(): Task[] {
    return this.getTasks().filter(t => !t.assignedTo);
  }

  // Get all assigned tasks
  getAssignedTasks(): Task[] {
    return this.getTasks().filter(t => t.assignedTo);
  }

  // Get task by id
  getTaskById(taskId: number): Task | undefined {
    return this.getTasks().find(t => t.id === taskId);
  }
}

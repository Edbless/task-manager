import { Injectable } from '@angular/core';
import { TaskUser } from '../Core/model/taskUser';

@Injectable({
  providedIn: 'root'
})

export class TaskUserService {


  private storageKey = 'users';

  constructor() { }

  // Get all users
  getUsers(): TaskUser[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) as TaskUser[] : [];
  }

  // Add a new user
  addUser(user: TaskUser): void {
    const users = this.getUsers();
    users.push(user);
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }

  // Assign a task to a user
  assignTaskToUser(userId: number, taskId: number): void {
    const users = this.getUsers();
    const index = users.findIndex(u => u.id === userId);

    if (index !== -1) {
      users[index].assignedTaskId = taskId;  // add this field in User model
      localStorage.setItem(this.storageKey, JSON.stringify(users));
    }
  }

  // Get unassigned users
  getUnassignedUsers(): TaskUser[] {
    return this.getUsers().filter(u => !u.assignedTaskId);
  }
}

  
  


import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task-service';
import { TaskUserService } from '../../services/task-user-service';
import { TaskUser } from '../model/task-user.model';
import { Task } from '../model/task.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-assigned-task',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './assigned-task.html',
  styleUrl: './assigned-task.css'
})
export class AssignedTask implements OnInit {
  assignedTasks: Task[] = [];

  constructor(
    private taskService: TaskService,
    private userService: TaskUserService
  ) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    // ✅ Only tasks that are assigned
    this.assignedTasks = this.taskService.getTasks().filter(t => t.assignedTo);
  }

  // ✅ Fix: use firstname + lastname instead of name
  getUserName(userId?: number): string {
    if (!userId) return 'Unknown';
    const user: TaskUser | undefined = this.userService.getUsers().find(u => u.id === userId);
    return user ? `${user.firstname} ${user.lastname}` : 'Unknown';
  }

  // ✅ Fix: use assignedTaskId instead of hasTask
  completeTask(task: Task) {
    if (task.assignedTo) {
      const user = this.userService.getUsers().find(u => u.id === task.assignedTo);
      if (user) {
        user.assignedTaskId = null; // free this user
        this.userService.updateUser(user);
      }
    }

    this.taskService.completeTask(task.id); // remove/mark task as done
    this.loadTasks(); // refresh
  }
}

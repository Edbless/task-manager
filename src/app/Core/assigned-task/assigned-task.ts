import { Component } from '@angular/core';
import { TaskService } from '../../services/task-service';
import { TaskUserService } from '../../services/task-user-service';
import { TaskUser } from '../model/taskUser';
import { Task } from '../model/task';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-assigned-task',
  imports: [FormsModule, CommonModule],
  templateUrl: './assigned-task.html',
  styleUrl: './assigned-task.css'
})
export class AssignedTask {

  assignedTasks: Task[] = [];

  constructor(private taskService: TaskService, private userService: TaskUserService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.assignedTasks = this.taskService.getTasks().filter(t => t.assignedTo);
  }

  getUserName(userId?: number): string {
    if (!userId) return 'Unknown';
    const user: TaskUser | undefined = this.userService.getUsers().find(u => u.id === userId);
    return user ? user.name : 'Unknown';
  }

  completeTask(task: Task) {
    if (task.assignedTo) {
      const user = this.userService.getUsers().find(u => u.id === task.assignedTo);
      if (user) {
        user.hasTask = false;
        this.userService.updateUser(user);
      }
    }
    this.taskService.completeTask(task.id);
    this.loadTasks();
  }

}

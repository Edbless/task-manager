import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../Core/services/task.service';
import { TaskUserService } from '../services/task-user.service';
import { Router } from '@angular/router';
import { Task } from '../../Core/model/task.model';
import { TaskUser } from '../../Core/model/task-user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {
  tasks: Task[] = [];
  users: TaskUser[] = [];

  constructor(
    private taskService: TaskService,
    private userService: TaskUserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.tasks = this.taskService.getTasks();
    this.users = this.userService.getUsers();
  }

  getAssignedUser(task: Task): string {
    if (!task.assignedTo) return 'Not Assigned';
    const user = this.users.find(u => u.id === task.assignedTo);
    return user ? `${user.firstname} ${user.lastname}` : 'Unknown';
  }

  assignTask(task: Task) {
    // navigate to AssignTaskComponent with taskId
    this.router.navigate(['/assign-task', task.id]);
  }
}
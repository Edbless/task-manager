import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../model/task.model';
import { CommonModule } from '@angular/common';
import {TaskService} from '../../services/task-service';
import {TaskUserService} from '../../services/task-user-service';
import {TaskUser} from '../model/task-user.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
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

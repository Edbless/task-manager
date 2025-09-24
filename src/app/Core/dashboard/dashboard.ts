import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../model/task.model';
import { CommonModule, NgFor } from '@angular/common';
import {TaskService} from '../../services/task-service';
import {TaskUserService} from '../../services/task-user-service';
import {TaskUser} from '../model/task-user.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  tasks: Task[] = [];

  constructor(
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.tasks = this.taskService.getTasks();
  }

  goToAddTask(): void {
    this.router.navigate(['/add-task']);
  }

  goToAddUser(): void {
    this.router.navigate(['/add-task-user']);
  }

  completeTask(taskId: number): void {
    this.taskService.completeTask(taskId);
    this.loadTasks();
  }

}

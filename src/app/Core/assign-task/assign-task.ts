import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TaskUser } from '../model/taskUser';
import { TaskUserService } from '../../services/task-user-service';
import { TaskService } from '../../services/task-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-assign-task',
  imports: [FormsModule, CommonModule],
  templateUrl: './assign-task.html',
  styleUrl: './assign-task.css'
})
export class AssignTask {

  freeUsers: TaskUser[] = [];
  taskId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: TaskUserService,
    private taskService: TaskService
  ) {}

  ngOnInit() {
    this.taskId = Number(this.route.snapshot.paramMap.get('id'));
    this.freeUsers = this.userService.getFreeUsers();
  }

  assign(user: TaskUser) {
    this.taskService.assignTask(this.taskId, user.id);
    user.hasTask = true;
    this.userService.updateUser(user);
    this.router.navigate(['/dashboard']);
  }

}

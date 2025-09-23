import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TaskUser } from '../model/taskUser.model';
import { TaskUserService } from '../../services/task-user-service';
import { TaskService } from '../../services/task-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-assign-task',
  imports: [FormsModule, CommonModule],
  templateUrl: './assign-task.html',
  styleUrl: './assign-task.css'
})
export class AssignTaskComponent implements OnInit {
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
    this.freeUsers = this.userService.getUnassignedUsers();
  }

  assign(user: TaskUser) {
    // ✅ update task
    this.taskService.assignTask(this.taskId, user.id);

    // ✅ update user (set assignedTaskId instead of hasTask)
    user.assignedTaskId = this.taskId;
    this.userService.updateUser(user);

    // ✅ navigate back to dashboard
    this.router.navigate(['/dashboard']);
  }

}
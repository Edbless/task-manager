import { Component } from '@angular/core';
import { Task } from '../../Core/model/task.model';
import { FormsModule } from '@angular/forms';
import {TaskService} from '../../services/task-service';


@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-task.html',
  styleUrl: './add-task.css'
})
export class AddTask {
title = '';
  description = '';

  constructor(private taskService: TaskService) {}

  addTask() {
  if (this.title.trim() && this.description.trim()) {
    this.taskService.addTask(this.title, this.description);
    this.title = '';
    this.description = '';
    alert('Task added successfully!');
  }
}

}

import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../Core/model/task.model';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-add-task',
  imports: [FormsModule],
  templateUrl: './add-task.html',
  styleUrl: './add-task.css'
})
export class AddTask {
title = '';
  description = '';

  constructor(private taskService: TaskService) {}

  addTask() {
    if (this.title.trim() & this.description.trim()) {
      const newTask: Task = {
        id: Date.now(), // simple unique id
        title: this.title,
        description: this.description,
        assignedTo: null,
        completed: false
      };

      this.taskService.addTask(newTask);

      // reset form
      this.title = '';
      this.description = '';
      alert('Task added successfully!');
    }
  }
}

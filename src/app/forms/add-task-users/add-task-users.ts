import { Component } from '@angular/core';
import { TaskUserService } from '../../services/task-user-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-task-users',
  imports: [FormsModule, CommonModule],
  templateUrl: './add-task-users.html',
  styleUrl: './add-task-users.css'
})
export class AddTaskUsers {

  
  userName = '';
    users = this.userService.getUsers();
  
    constructor(private userService: TaskUserService) {}
  
    addUser() {
      if (this.userName.trim()) {
        this.userService.addUser(this.userName);
        this.users = this.userService.getUsers();
        this.userName = '';
      }

    }
}

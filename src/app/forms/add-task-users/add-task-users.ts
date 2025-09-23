import { Component } from '@angular/core';
import { TaskUserService } from '../../services/task-user-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskUser } from '../../core/model/task-user.model'; 

@Component({
  selector: 'app-add-task-users',
  imports: [FormsModule, CommonModule],
  templateUrl: './add-task-users.html',
  styleUrl: './add-task-users.css'
})
export class AddTaskUsers {
firstname = '';
  lastname = '';
  email = '';
  users: TaskUser[] = [];

  constructor(private userService: TaskUserService) {
    this.users = this.userService.getUsers(); // initialize list
  }

  addUser() {
    if (this.firstname.trim() && this.lastname.trim() && this.email.trim()) {
      const newUser: TaskUser = {
        id: Date.now(),
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        assignedTaskId: null
      };

      this.userService.addUser(newUser);
      this.users = this.userService.getUsers(); // refresh user list

      // reset form
      this.firstname = '';
      this.lastname = '';
      this.email = '';
    }
  }
}

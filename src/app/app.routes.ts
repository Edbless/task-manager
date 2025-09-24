import { Routes } from '@angular/router';
import { Register } from './Auth/register/register';
import { Login } from './Auth/login/login';
import { Dashboard } from './Core/dashboard/dashboard';
import { AuthGuard  } from './Auth/auth.guard';
import { AddTask } from './forms/add-task/add-task';
import { AddTaskUsers } from './forms/add-task-users/add-task-users';
import { AssignTaskComponent } from './Core/assign-task/assign-task';
import { AssignedTask } from './Core/assigned-task/assigned-task';

export const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' }, 
  { path: 'register', component: Register },
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard, canActivate: [AuthGuard] },
  { path: 'add-task', component: AddTask},
  { path: 'add-task-user', component: AddTaskUsers},
  { path: 'assign-task/:id', component: AssignTaskComponent},
  { path: 'assigned-task', component: AssignedTask},



];
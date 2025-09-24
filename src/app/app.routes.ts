import { Routes } from '@angular/router';
import { Register } from './Auth/register/register';
import { Login } from './Auth/login/login';
import { Dashboard } from './Core/dashboard/dashboard';
import { AuthGuard  } from './Auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' }, 
  { path: 'register', component: Register },
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard, canActivate: [AuthGuard] }
];
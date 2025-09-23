import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register implements OnInit {
  email: string = '';
  name: string = '';
  password: string = '';
  confirmPassword: string = '';
  passwordMismatch: boolean = false;
  error: string | null = null;
  loading: boolean = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    // if already logged in, go straight to dashboard
    if (this.auth.getLoggedInUser()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit() {
    this.loading = true;
    this.error = null;
    this.passwordMismatch = false;

    // check password match
    if (this.password !== this.confirmPassword) {
      this.passwordMismatch = true;
      this.loading = false;
      return;
    }

    try {
      // check if user already exists
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const existingUser = users.find((u: any) => u.email === this.email);
      if (existingUser) {
        this.error = 'Email already registered. Please login.';
        this.loading = false;
        return;
      }

      // create new user
      const newUser = {
        name: this.name,
        email: this.email,
        password: this.password, // storing plain for demo (hash in real apps!)
        createdAt: new Date().toISOString()
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      // set logged-in session
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      localStorage.setItem('isLoggedIn', 'true');

      // redirect to dashboard
      this.router.navigate(['/dashboard']);
    } catch (err: any) {
      this.error = err.message || 'Registration failed';
    } finally {
      this.loading = false;
    }
  }
}
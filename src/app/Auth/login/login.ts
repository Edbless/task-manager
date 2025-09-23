import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {
  email = '';
  password = '';
  error: string | null = null;
  loading: boolean = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    // If already logged in, redirect
    if (this.auth.getLoggedInUser()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit() {
    this.loading = true;
    this.error = null;

    const success = this.auth.login(this.email, this.password);

    if (success) {
      this.router.navigate(['/dashboard']);
    } else {
      this.error = 'Invalid email or password';
    }

    this.loading = false;
  }
}

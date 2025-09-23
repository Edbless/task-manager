import { Component } from '@angular/core';
import { User } from '../../Auth/user.model';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  loggedInUser: User | null = null;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.loggedInUser = this.auth.getLoggedInUser();
  }

  logout() {
    this.auth.logout();
    this.loggedInUser = null;
    this.router.navigate(['/login']);
  }
}

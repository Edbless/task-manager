import { Injectable } from '@angular/core';
import { User } from '../Auth/user.model';
import { BehaviorSubject } from 'rxjs';  

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private localStorageKey = 'users';

  // ✅ reactive state
  private loggedInUserSubject = new BehaviorSubject<User | null>(this.getLoggedInUser());
  loggedInUser$ = this.loggedInUserSubject.asObservable();

  constructor() {}

  // Save a new user
  register(user: User): boolean {
    const users = this.getAllUsers();
    const exists = users.find(u => u.email === user.email);
    if (exists) {
      return false; // Email already registered
    }
    users.push(user);
    localStorage.setItem(this.localStorageKey, JSON.stringify(users));

    // ✅ auto-login after register
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    this.loggedInUserSubject.next(user);

    return true;
  }

  // Validate login
  login(email: string, password: string): boolean {
    const users = this.getAllUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      this.loggedInUserSubject.next(user); // ✅ update state
      return true;
    }
    return false;
  }

  // Logout
  logout(): void {
    localStorage.removeItem('loggedInUser');
    this.loggedInUserSubject.next(null); // ✅ update state
  }

  // Check if user is logged in
  getLoggedInUser(): User | null {
    const user = localStorage.getItem('loggedInUser');
    return user ? JSON.parse(user) : null;
  }

  private getAllUsers(): User[] {
    const users = localStorage.getItem(this.localStorageKey);
    return users ? JSON.parse(users) : [];
  }
}

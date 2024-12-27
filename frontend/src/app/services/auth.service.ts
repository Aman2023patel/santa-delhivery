import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<Boolean> {
    return this.http.post<Boolean>(`${this.baseUrl}/login`, credentials);

  }
  register(userData: { username: string; email: string; password: string; name: string; mobile: string }): Observable<Boolean> {
    return this.http.post<Boolean>(`${this.baseUrl}/register`, userData);
  }

  checkUsernameAvailability(username: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/check-username/${username}`);
  }

  getUserByUsername(username: string): Observable<string>{
    return this.http.get<string>(`${this.baseUrl}/${username}`);
  }


  // Save user data to localStorage after successful login
  saveUserDetailsToLocalStorage(user: any): void {
    localStorage.setItem('user', JSON.stringify(user)); // Convert user object to a string
  }

  // Get user details from localStorage
  getUserDetailsFromLocalStorage(): any {
    return JSON.parse(localStorage.getItem('user') || '{}'); // Parse the JSON string back to an object
  }

  // Clear user data from localStorage on logout
  clearUserDetailsFromLocalStorage(): void {
    localStorage.removeItem('user');
  }

  // Get the order count of the logged-in user
  getOrderCount(userId: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/${userId}/orderCount`);
  }

}


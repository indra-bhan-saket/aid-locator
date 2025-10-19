import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoginUserDto, RegisterUserDto, LoginResponse, User } from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/auth';
  private readonly TOKEN_KEY = 'jwt_token';
  private readonly USER_KEY = 'current_user';

  constructor(private http: HttpClient) {}

  /**
   * Login user
   */
  login(credentials: LoginUserDto): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          // Store token and user in sessionStorage
          this.setToken(response.token);
          this.setUser(response.user);
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Register new user
   */
  register(userData: RegisterUserDto): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, userData)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Logout user
   */
  logout(): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/logout`, {})
      .pipe(
        tap(() => {
          this.clearAuthData();
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Store JWT token in sessionStorage
   */
  private setToken(token: string): void {
    sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  /**
   * Get JWT token from sessionStorage
   */
  getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Store user data in sessionStorage
   */
  private setUser(user: User): void {
    sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  /**
   * Get user data from sessionStorage
   */
  getUser(): User | null {
    const userData = sessionStorage.getItem(this.USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  /**
   * Check if user is admin
   */
  isAdmin(): boolean {
    const user = this.getUser();
    return user?.role?.toLowerCase() === 'admin';
  }

  /**
   * Check if user is provider
   */
  isProvider(): boolean {
    const user = this.getUser();
    return user?.role?.toLowerCase() === 'provider';
  }

  /**
   * Clear all authentication data
   */
  clearAuthData(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.USER_KEY);
  }

  /**
   * Handle HTTP errors
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      if (error.status === 401) {
        errorMessage = 'Please provide valid credentials';
      } else if (error.status === 400) {
        errorMessage = error.error?.error || 'Bad request';
      } else if (error.status === 0) {
        errorMessage = 'Unable to connect to server';
      } else {
        errorMessage = `Server error: ${error.status}`;
      }
    }
    
    return throwError(() => new Error(errorMessage));
  }
}

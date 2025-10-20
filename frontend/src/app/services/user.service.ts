import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/auth.models';

export interface UserApproval {
  email: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = '/api/private';

  constructor(private http: HttpClient) {}

  /**
   * Get all users for review (Admin only)
   */
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/userReview`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Approve or reject a user (Admin only)
   */
  approveUser(userApproval: UserApproval): Observable<number> {
    return this.http.post<number>(`${this.apiUrl}/userApprove`, userApproval)
      .pipe(
        catchError(this.handleError)
      );
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
      errorMessage = error.error?.message || error.message || `Error Code: ${error.status}`;
    }
    
    console.error('UserService Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}

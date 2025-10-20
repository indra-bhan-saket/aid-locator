import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AidListing } from '../models/location.models';

export interface ListingApproval {
  id: number;
  status: string;
}

interface ListingResponse {
  id: number;
  name: string;
  description: string;
  address: string;
  servicesOffered: string;
  gpsLat: string;
  gpsLng: string;
  status: string;
  capacity: string;
  createdAt: string;
  provider: string;
  verificationStatus: string;
}

@Injectable({
  providedIn: 'root'
})
export class ListingService {
  private apiUrl = '/api/private';

  constructor(private http: HttpClient) {}

  /**
   * Get all listings for review (Admin only)
   */
  getAllListings(): Observable<AidListing[]> {
    return this.http.get<ListingResponse[]>(`${this.apiUrl}/listingsReview`)
      .pipe(
        map(responses => responses.map(this.mapToAidListing)),
        catchError(this.handleError)
      );
  }

  /**
   * Map backend response to AidListing format
   */
  private mapToAidListing(response: ListingResponse): AidListing {
    return {
      id: response.id,
      name: response.name,
      address: response.address || 'Address not provided',
      latitude: response.gpsLat,
      longitude: response.gpsLng,
      services: response.servicesOffered ? response.servicesOffered.split(',').map(s => s.trim()) : [],
      capacity: response.capacity || 'Not specified',
      status: (response.status?.toLowerCase() as 'open' | 'closed' | 'full') || 'open',
      description: response.description || '',
      provider: response.provider,
      submitted: response.createdAt ? new Date(response.createdAt).toLocaleString() : '',
      verificationStatus: (response.verificationStatus as 'Verified' | 'Pending') || 'Pending'
    };
  }

  /**
   * Approve or reject a listing (Admin only)
   */
  approveListing(listingApproval: ListingApproval): Observable<number> {
    return this.http.post<number>(`${this.apiUrl}/listingApprove`, listingApproval)
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
      errorMessage = `Error ${error.status}: ${error.message}`;
    }
    
    console.error('ListingService error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}

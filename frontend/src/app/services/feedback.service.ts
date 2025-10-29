import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ListingFeedback } from '../models/location.models';

export interface FeedbackRequest {
  listingId: number;
  feedback: string;
}

export interface FeedbackResponse {
  id: number;
  listingId?: number;
  listingName?: string;
  feedback: string;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private apiUrl = '/api/reporting';

  constructor(private http: HttpClient) {}

  postFeedback(listingId: number, feedbackText: string): Observable<ListingFeedback> {
    const request: FeedbackRequest = {
      listingId,
      feedback: feedbackText
    };
    
    return this.http.post<FeedbackResponse>(`${this.apiUrl}/feedback`, request).pipe(
      map(response => this.mapToListingFeedback(response))
    );
  }

  getFeedbacksByListing(listingId: number): Observable<ListingFeedback[]> {
    return this.http.get<FeedbackResponse[]>(`${this.apiUrl}/feedback`).pipe(
      map(feedbacks => 
        // Filter by listingId if providerListing exists in response
        feedbacks.map(f => this.mapToListingFeedback(f))
      )
    );
  }

  getAllFeedbacks(): Observable<ListingFeedback[]> {
    return this.http.get<FeedbackResponse[]>(`${this.apiUrl}/feedback`).pipe(
      map(feedbacks => feedbacks.map(f => this.mapToListingFeedback(f)))
    );
  }

  private mapToListingFeedback(response: FeedbackResponse): ListingFeedback {
    return {
      id: response.id,
      listingId: response.listingId,
      listingName: response.listingName,
      feedback: response.feedback,
      createdAt: response.createdAt,
      updatedAt: response.updatedAt
    };
  }
}

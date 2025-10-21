import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ListingDto {
  id?: number;
  name: string;
  address: string;
  description: string;
  servicesOffered: string;
  gpsLat: number;
  gpsLng: number;
  capacity: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  active: boolean;
  pin: string;
}

export interface ProviderListing {
  id: number;
  name: string;
  address: string;
  description: string;
  servicesOffered: string;
  gpsLat: number;
  gpsLng: number;
  capacity: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  active: boolean;
  status: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProviderListingService {
  private apiUrl = '/api/private';

  constructor(private http: HttpClient) {}

  createListing(listing: ListingDto): Observable<ProviderListing> {
    return this.http.post<ProviderListing>(`${this.apiUrl}/listing`, listing);
  }

  updateListing(listing: ListingDto): Observable<ProviderListing> {
    return this.http.put<ProviderListing>(`${this.apiUrl}/listing`, listing);
  }

  deleteListing(listingId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/listing/${listingId}`);
  }

  getUserListings(): Observable<ProviderListing[]> {
    return this.http.get<ProviderListing[]>(`${this.apiUrl}/listingsByUser`);
  }
}

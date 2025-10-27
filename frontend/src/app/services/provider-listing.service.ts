import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AidListing } from '../models/location.models';

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
  pin: boolean; // backend expects boolean
}

@Injectable({
  providedIn: 'root'
})
export class ProviderListingService {
  private apiUrl = '/api/private';

  constructor(private http: HttpClient) {}

  createListing(listing: ListingDto): Observable<AidListing> {
    return this.http.post<any>(`${this.apiUrl}/listing`, listing).pipe(
      map((res: any) => this.mapDtoToAidListing(res))
    );
  }

  updateListing(listing: ListingDto): Observable<AidListing> {
    return this.http.post<any>(`${this.apiUrl}/listing`, listing).pipe(
      map((res: any) => this.mapDtoToAidListing(res))
    );
  }

  deleteListing(listingId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/listing/${listingId}`);
  }

  getUserListings(): Observable<AidListing[]> {
    return this.http.get<any[]>(`${this.apiUrl}/listingsByUser`).pipe(
      map((arr: any[]) => arr.map((r: any) => this.mapDtoToAidListing(r)))
    );
  }

  private mapDtoToAidListing(res: any): AidListing {
    return {
      id: res.id,
      name: res.name,
      address: res.address || '',
      latitude: res.gpsLat || '0',
      longitude: res.gpsLng || '0',
      services: res.servicesOffered ? res.servicesOffered.split(',').map((s: string) => s.trim()).filter((s: string) => s) : [],
      capacity: res.capacity || 'N/A',
      status: (res.status && (res.status === 'approved' || res.status === 'open')) ? 'open' : (res.status === 'full' ? 'full' : 'closed'),
      description: res.description || 'No description',
      contactPerson: res.contactPerson || '',
      contactPhone: res.contactPhone || '',
      contactEmail: res.contactEmail || '',
      provider: res.provider,
      verificationStatus: (res.verificationStatus as any) || 'pending'
    };
  }
}

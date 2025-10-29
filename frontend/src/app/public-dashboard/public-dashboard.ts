import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { HealthCheckService } from '../services/health-check.service';
import { AidListing, getServiceIcon } from '../models/location.models';
import { MapViewComponent } from './map-view/map-view';
import { LocationsListComponent } from './locations-list/locations-list';

@Component({
  selector: 'app-public-dashboard',
  standalone: true,
  imports: [CommonModule, MapViewComponent, LocationsListComponent],
  templateUrl: './public-dashboard.html',
  styleUrl: './public-dashboard.css'
})
export class PublicDashboardComponent implements OnInit, OnDestroy {
  healthResult: any = null;
  healthError: string = '';
  isLoading: boolean = false;
  
  // Filter related properties
  activeFilters: string[] = [];
  
  // Locations data - loaded from API
  locations: AidListing[] = [];
  isLoadingListings: boolean = true;
  listingsError: string = '';
  
  private healthCheckSubscription?: Subscription;
  
  // Filter display names mapping
  private filterDisplayNames: { [key: string]: string } = {
    'food': 'Food',
    'shelter': 'Shelter',
    'water': 'Water',
    'toilets': 'Toilets',
    'disabled-access': 'Disabled Access',
    'pet-friendly': 'Pet-Friendly',
    'child-safe': 'Child-Safe',
    'free-wifi': 'Free Wi-Fi'
  };

  constructor(private http: HttpClient, private healthCheckService: HealthCheckService) {}

  ngOnInit() {
    // Load listings on component initialization
    this.loadListings();
    
    // Subscribe to health check requests from header
    this.healthCheckSubscription = this.healthCheckService.healthCheckRequest$.subscribe(() => {
      this.checkHealth();
    });
  }

  loadListings() {
    this.isLoadingListings = true;
    this.listingsError = '';

    this.http.get<any[]>('/api/public/listings').subscribe({
      next: (response) => {
        this.locations = response.map(listing => this.mapBackendToAidListing(listing));
        this.isLoadingListings = false;
      },
      error: (error) => {
        this.listingsError = `Failed to load listings: ${error.message || 'Unknown error'}`;
        this.isLoadingListings = false;
        console.error('Error loading listings:', error);
      }
    });
  }

  private mapBackendToAidListing(backendListing: any): AidListing {
    return {
      id: backendListing.id,
      name: backendListing.name || '',
      address: backendListing.address || '',
      latitude: backendListing.gpsLat || '0',
      longitude: backendListing.gpsLng || '0',
      services: backendListing.servicesOffered 
        ? backendListing.servicesOffered.split(',').map((s: string) => s.trim()).filter((s: string) => s) 
        : [],
      capacity: backendListing.capacity || 'N/A',
      status: backendListing.status || 'closed',
      description: backendListing.description || 'No description available',
      contactPerson: backendListing.contactPerson || '',
      contactPhone: backendListing.contactPhone || '',
      contactEmail: backendListing.contactEmail || '',
      provider: backendListing.provider || '',
      verificationStatus: backendListing.verificationStatus || 'pending',
      feedbacks: backendListing.feedbacks || []
    };
  }

  checkHealth() {
    // Reset previous results
    this.healthResult = null;
    this.healthError = '';
    this.isLoading = true;

    // Make API call to health endpoint
    this.http.get('/api/health').subscribe({
      next: (result) => {
        this.healthResult = result;
        this.isLoading = false;
      },
      error: (error) => {
        this.healthError = `Failed to connect to backend: ${error.message || 'Unknown error'}`;
        this.isLoading = false;
      }
    });
  }

  clearHealthResult() {
    this.healthResult = null;
    this.healthError = '';
  }
  
  // Filter methods
  toggleFilter(filter: string) {
    const index = this.activeFilters.indexOf(filter);
    if (index > -1) {
      this.activeFilters.splice(index, 1);
    } else {
      this.activeFilters.push(filter);
    }
  }
  
  isFilterActive(filter: string): boolean {
    return this.activeFilters.includes(filter);
  }
  
  removeFilter(filter: string) {
    const index = this.activeFilters.indexOf(filter);
    if (index > -1) {
      this.activeFilters.splice(index, 1);
    }
  }
  
  clearAllFilters() {
    this.activeFilters = [];
  }
  
  getFilterDisplayName(filter: string): string {
    return this.filterDisplayNames[filter] || filter;
  }
  
  // Get filtered locations based on active filters
  get filteredLocations(): AidListing[] {
    if (this.activeFilters.length === 0) {
      return this.locations;
    }

    return this.locations.filter(location => {
      // Location must have at least one service that matches the active filters
      return this.activeFilters.some(filter =>
        location.services.includes(filter)
      );
    });
  }

  ngOnDestroy(): void {
    if (this.healthCheckSubscription) {
      this.healthCheckSubscription.unsubscribe();
    }
  }

  getServiceIcon(serviceName: string): string {
    return getServiceIcon(serviceName);
  }
}

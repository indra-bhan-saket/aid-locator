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
  
  // Locations data - only approved listings
  locations: AidListing[] = [
    {
      id: 1,
      name: 'Central Community Center',
      address: '123 Main St, Downtown',
      latitude: '40.7128',
      longitude: '-74.0060',
      services: ['food', 'shelter', 'water', 'child-safe'],
      capacity: '200 people',
      status: 'open',
      description: 'Large community center with full kitchen facilities and sleeping areas.',
      verificationStatus: 'verified'
    },
    {
      id: 2,
      name: 'Riverside Emergency Shelter',
      address: '456 River Rd, Riverside',
      latitude: '40.7580',
      longitude: '-73.9855',
      services: ['shelter', 'water', 'toilets', 'disabled-access'],
      capacity: '150 people',
      status: 'open',
      description: 'Temporary shelter with accessible facilities.',
      verificationStatus: 'verified'
    },
    {
      id: 3,
      name: 'Food Distribution Point',
      address: '789 Oak Ave, Westside',
      latitude: '40.7489',
      longitude: '-73.9680',
      services: ['food', 'water', 'pet-friendly'],
      capacity: '500 meals/day',
      status: 'open',
      description: 'Mobile food distribution with pet-friendly area.',
      verificationStatus: 'verified'
    },
    {
      id: 4,
      name: 'Emergency Medical Station',
      address: '321 Health Plaza, Medical District',
      latitude: '40.7614',
      longitude: '-73.9776',
      services: ['water', 'toilets', 'medical'],
      capacity: '100 people',
      status: 'full',
      description: 'Medical station with trained staff and equipment.',
      verificationStatus: 'verified'
    }
  ];
  
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
    // Subscribe to health check requests from header
    this.healthCheckSubscription = this.healthCheckService.healthCheckRequest$.subscribe(() => {
      this.checkHealth();
    });
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

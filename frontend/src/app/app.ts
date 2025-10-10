import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, JsonPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('aid-locator-frontend');
  
  // Health check related properties
  healthResult: any = null;
  healthError: string = '';
  isLoading: boolean = false;
  
  // Filter related properties
  activeFilters: string[] = [];
  
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

  constructor(private http: HttpClient) {}

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
}

import { Component, Input, OnInit, OnChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { AidListing } from '../../models/location.models';

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
  templateUrl: './map-view.html',
  styleUrl: './map-view.css'
})
export class MapViewComponent implements OnInit, OnChanges {
  @Input() locations: AidListing[] = [];
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  // Map configuration
  center: { lat: number; lng: number } = { lat: 40.7128, lng: -74.0060 }; // Default to NYC
  zoom = 12;
  mapOptions: any = {
    mapTypeId: 'roadmap',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: false,
    maxZoom: 20,
    minZoom: 8,
    streetViewControl: false,
    fullscreenControl: true,
    mapTypeControl: false
  };

  markers: Array<{
    position: { lat: number; lng: number };
    title: string;
    location: AidListing;
    options: any;
  }> = [];

  selectedLocation: AidListing | null = null;
  isLoading = true;
  mapLoadError = false;

  ngOnInit(): void {
    this.loadGoogleMapsScript();
    this.getUserLocation();
  }

  ngOnChanges(): void {
    // Update markers when locations input changes
    if (this.locations && this.locations.length > 0) {
      this.createMarkers();
      if (this.markers.length > 0) {
        // Center map on first location if no user location
        const firstMarker = this.markers[0];
        this.center = firstMarker.position;
      }
    }
  }

  loadGoogleMapsScript(): void {
    // Check if Google Maps is already loaded
    if (typeof (window as any).google !== 'undefined' && (window as any).google.maps) {
      this.isLoading = false;
      this.createMarkers();
      return;
    }

    // Load Google Maps script
    const script = document.createElement('script');
    // Note: Replace 'YOUR_API_KEY' with actual Google Maps API key
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyABKWzsGxHE_Xgq0d3hHssyq5V7GHgBoL8`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      this.isLoading = false;
      this.createMarkers();
    };
    script.onerror = () => {
      this.isLoading = false;
      this.mapLoadError = true;
    };
    document.head.appendChild(script);
  }

  getUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          this.zoom = 13;
        },
        (error) => {
          console.warn('Error getting user location:', error);
          // Keep default center if geolocation fails
        }
      );
    }
  }

  createMarkers(): void {
    if (typeof (window as any).google === 'undefined') {
      return;
    }
    
    const google = (window as any).google;
    this.markers = this.locations
      .filter(location => location.latitude && location.longitude)
      .map(location => ({
        position: {
          lat: parseFloat(location.latitude!),
          lng: parseFloat(location.longitude!)
        },
        title: location.name,
        location: location,
        options: {
          icon: {
            url: this.getMarkerIcon(location.status),
            scaledSize: new google.maps.Size(40, 40)
          }
        }
      }));
  }

  getMarkerIcon(status: string): string {
    // Different marker colors based on status
    const baseUrl = 'http://maps.google.com/mapfiles/ms/icons/';
    switch (status) {
      case 'open':
        return `${baseUrl}green-dot.png`;
      case 'full':
        return `${baseUrl}red-dot.png`;
      case 'closed':
        return `${baseUrl}grey-dot.png`;
      default:
        return `${baseUrl}blue-dot.png`;
    }
  }

  openInfoWindow(marker: MapMarker, location: AidListing): void {
    this.selectedLocation = location;
    this.infoWindow.open(marker);
  }

  getStatusClass(status: string): string {
    return status === 'open' ? 'status-open' : 'status-closed';
  }
}

import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GoogleMapsModule, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { AidListing, getServiceIcon } from '../../models/location.models';

@Component({
  selector: 'app-listing-details-modal',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
  templateUrl: './listing-details-modal.html',
  styleUrls: ['./listing-details-modal.css']
})
export class ListingDetailsModalComponent implements AfterViewInit {
  @Input() listing!: AidListing;
  @ViewChild('infoWindow') infoWindow!: MapInfoWindow;
  @ViewChild('marker') marker!: MapMarker;

  mapCenter: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  mapZoom = 15;
  markerPosition: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  
  mapOptions: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: false,
    streetViewControl: false,
    fullscreenControl: false,
    mapTypeControl: false
  };

  markerOptions: google.maps.MarkerOptions = {
    draggable: false
  };

  constructor(public activeModal: NgbActiveModal) {}

  ngAfterViewInit(): void {
    if (this.listing.latitude && this.listing.longitude) {
      const lat = parseFloat(this.listing.latitude);
      const lng = parseFloat(this.listing.longitude);
      
      if (!isNaN(lat) && !isNaN(lng)) {
        this.mapCenter = { lat, lng };
        this.markerPosition = { lat, lng };
        
        // Open info window by default after a short delay
        setTimeout(() => {
          if (this.marker && this.infoWindow) {
            this.infoWindow.open(this.marker);
          }
        }, 500);
      }
    }
  }

  openInfoWindow(marker: MapMarker): void {
    this.infoWindow.open(marker);
  }

  getGoogleMapsUrl(): string {
    if (this.listing.latitude && this.listing.longitude) {
      return `https://www.google.com/maps/search/?api=1&query=${this.listing.latitude},${this.listing.longitude}`;
    }
    return '#';
  }

  getServiceIcon(serviceName: string): string {
    return getServiceIcon(serviceName);
  }

  approveListing(): void {
    console.log('Approving listing:', this.listing.name);
    this.activeModal.close('approved');
  }

  rejectListing(): void {
    console.log('Rejecting listing:', this.listing.name);
    this.activeModal.close('rejected');
  }

  closeModal(): void {
    this.activeModal.dismiss('closed');
  }
}

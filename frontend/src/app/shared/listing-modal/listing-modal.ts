import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GoogleMapsModule } from '@angular/google-maps';
import { AidListing } from '../../models/location.models';
import { ProviderListingService, ListingDto } from '../../services/provider-listing.service';

@Component({
  selector: 'app-listing-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, GoogleMapsModule],
  templateUrl: './listing-modal.html',
  styleUrls: ['./listing-modal.css']
})
export class ListingModalComponent implements OnInit {
  @Input() mode: 'add' | 'edit' = 'add';
  @Input() locationData?: AidListing;
  
  listingForm!: FormGroup;
  isLoading: boolean = false;
  errorMessage: string = '';
  useMapPicker: boolean = false;

  // Map configuration
  mapCenter: { lat: number; lng: number } = { lat: 40.7128, lng: -74.0060 }; // Default to NYC
  mapZoom = 12;
  mapOptions: any = {
    mapTypeId: 'roadmap',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: false,
    maxZoom: 20,
    minZoom: 3,
    streetViewControl: false,
    fullscreenControl: false,
    mapTypeControl: false
  };
  markerPosition: { lat: number; lng: number } | null = null;
  markerOptions: any = {
    draggable: true
  };

  // Available services with icons
  availableServices = [
    { name: 'food', icon: '🍽️', label: 'Food' },
    { name: 'shelter', icon: '🏠', label: 'Shelter' },
    { name: 'water', icon: '💧', label: 'Water' },
    { name: 'medical', icon: '⚕️', label: 'Medical' },
    { name: 'child-safe', icon: '👶', label: 'Child-Safe' },
    { name: 'pet-friendly', icon: '🐕', label: 'Pet-Friendly' },
    { name: 'free-wifi', icon: '📶', label: 'Free Wi-Fi' },
    { name: 'clothing', icon: '👕', label: 'Clothing' }
  ];

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private providerListingService: ProviderListingService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getUserLocation();
    this.loadGoogleMapsScript();
  }

  loadGoogleMapsScript(): void {
    // Check if Google Maps is already loaded
    if (typeof (window as any).google !== 'undefined' && (window as any).google.maps) {
      return;
    }

    // Load Google Maps script if not already loaded
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyABKWzsGxHE_Xgq0d3hHssyq5V7GHgBoL8`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }

  getUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.mapCenter = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          this.mapZoom = 13;
        },
        (error) => {
          console.warn('Error getting user location:', error);
        }
      );
    }
  }

  initializeForm(): void {
    // Get selected services from locationData if in edit mode
    const selectedServices = this.locationData?.services || [];

    this.listingForm = this.fb.group({
      name: [this.locationData?.name || '', [Validators.required, Validators.minLength(3)]],
      address: [this.locationData?.address || '', [Validators.required, Validators.minLength(5)]],
      latitude: [this.locationData?.latitude || '', [Validators.required, Validators.pattern(/^-?([1-8]?[0-9]\.{1}\d+|90\.{1}0+)$/)]],
      longitude: [this.locationData?.longitude || '', [Validators.required, Validators.pattern(/^-?((1[0-7]|[1-9])?[0-9]\.{1}\d+|180\.{1}0+)$/)]],
      capacity: [this.locationData?.capacity || '', [Validators.required]],
      status: [this.locationData?.status || 'open', [Validators.required]],
      description: [this.locationData?.description || '', [Validators.required, Validators.minLength(10)]],
      contactPerson: [this.locationData?.contactPerson || '', [Validators.required]],
      contactPhone: [this.locationData?.contactPhone || '', [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]],
      contactEmail: [this.locationData?.contactEmail || '', [Validators.required, Validators.email]],
      services: [selectedServices],
      pin: [false]
    });

    // Initialize map marker if editing with existing coordinates
    if (this.locationData?.latitude && this.locationData?.longitude) {
      const lat = parseFloat(this.locationData.latitude);
      const lng = parseFloat(this.locationData.longitude);
      if (!isNaN(lat) && !isNaN(lng)) {
        this.markerPosition = { lat, lng };
        this.mapCenter = { lat, lng };
      }
    }
  }

  toggleMapPicker(event: any): void {
    this.useMapPicker = event.target.checked;
    
    if (this.useMapPicker) {
      // If switching to map picker, try to use existing lat/lng values
      const lat = parseFloat(this.listingForm.get('latitude')?.value);
      const lng = parseFloat(this.listingForm.get('longitude')?.value);
      
      if (!isNaN(lat) && !isNaN(lng)) {
        this.markerPosition = { lat, lng };
        this.mapCenter = { lat, lng };
      } else {
        // Use current map center as marker position
        this.markerPosition = { ...this.mapCenter };
        this.updateFormCoordinates(this.mapCenter.lat, this.mapCenter.lng);
      }
    }
  }

  onMapClick(event: any): void {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      this.markerPosition = { lat, lng };
      this.updateFormCoordinates(lat, lng);
    }
  }

  onMarkerDragEnd(event: any): void {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      this.markerPosition = { lat, lng };
      this.updateFormCoordinates(lat, lng);
    }
  }

  updateFormCoordinates(lat: number, lng: number): void {
    this.listingForm.patchValue({
      latitude: lat.toFixed(6),
      longitude: lng.toFixed(6)
    });
  }

  get modalTitle(): string {
    return this.mode === 'add' ? 'Add New Listing' : 'Edit Listing';
  }

  get submitButtonText(): string {
    return this.mode === 'add' ? 'Add Listing' : 'Update Listing';
  }

  isServiceSelected(serviceName: string): boolean {
    const services = this.listingForm.get('services')?.value || [];
    return services.includes(serviceName);
  }

  toggleService(serviceName: string): void {
    const servicesControl = this.listingForm.get('services');
    let services = servicesControl?.value || [];

    if (services.includes(serviceName)) {
      services = services.filter((s: string) => s !== serviceName);
    } else {
      services = [...services, serviceName];
    }

    servicesControl?.setValue(services);
  }

  onSubmit(): void {
    if (this.listingForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const formValue = this.listingForm.value;

      const listingDto: ListingDto = {
        id: this.mode === 'edit' ? this.locationData?.id : undefined,
        name: formValue.name,
        address: formValue.address,
        description: formValue.description,
        servicesOffered: formValue.services.join(','),
        gpsLat: parseFloat(formValue.latitude) || 0,
        gpsLng: parseFloat(formValue.longitude) || 0,
        capacity: formValue.capacity.toString(),
        contactPerson: formValue.contactPerson,
        contactEmail: formValue.contactEmail,
        contactPhone: formValue.contactPhone,
        status: formValue.status,
        active: true,
        pin: formValue.pin === true
      };

      if (this.mode === 'add') {
        this.providerListingService.createListing(listingDto).subscribe({
          next: (response) => {
            this.isLoading = false;
            this.activeModal.close({ action: 'add', data: response });
          },
          error: (error) => {
            this.isLoading = false;
            this.errorMessage = error.error?.message || 'Failed to create listing. Please try again.';
          }
        });
      } else {
        this.providerListingService.updateListing(listingDto).subscribe({
          next: (response) => {
            this.isLoading = false;
            this.activeModal.close({ action: 'edit', data: response });
          },
          error: (error) => {
            this.isLoading = false;
            this.errorMessage = error.error?.message || 'Failed to update listing. Please try again.';
          }
        });
      }
      
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.listingForm.controls).forEach(key => {
        this.listingForm.get(key)?.markAsTouched();
      });
      this.errorMessage = 'Please fill in all required fields correctly.';
    }
  }

  onCancel(): void {
    this.activeModal.dismiss('cancel');
  }
}

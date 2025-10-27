import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AidListing } from '../../models/location.models';
import { ProviderListingService, ListingDto } from '../../services/provider-listing.service';

@Component({
  selector: 'app-listing-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './listing-modal.html',
  styleUrls: ['./listing-modal.css']
})
export class ListingModalComponent implements OnInit {
  @Input() mode: 'add' | 'edit' = 'add';
  @Input() locationData?: AidListing;
  
  listingForm!: FormGroup;
  isLoading: boolean = false;
  errorMessage: string = '';

  // Available services with icons
  availableServices = [
    { name: 'food', icon: '🍽️', label: 'Food' },
    { name: 'shelter', icon: '🏠', label: 'Shelter' },
    { name: 'water', icon: '💧', label: 'Water' },
    { name: 'medical', icon: '⚕️', label: 'Medical' },
    { name: 'child-safe', icon: '👶', label: 'Child-Safe' },
    { name: 'pet-friendly', icon: '🐕', label: 'Pet-Friendly' },
    { name: 'wifi', icon: '📶', label: 'WiFi' },
    { name: 'clothing', icon: '👕', label: 'Clothing' }
  ];

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private providerListingService: ProviderListingService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
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

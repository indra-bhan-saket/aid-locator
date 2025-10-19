import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ListingModalComponent } from '../shared/listing-modal/listing-modal';
import { AidListing, getServiceIcon } from '../models/location.models';

@Component({
  selector: 'app-provider-console',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './provider-console.html',
  styleUrl: './provider-console.css'
})
export class ProviderConsoleComponent {
  constructor(private modalService: NgbModal) {}

  locations: AidListing[] = [
    {
      id: 1,
      name: 'Central Community Center',
      address: '123 Main St, Downtown',
      services: ['food', 'shelter', 'water', 'child-safe'],
      capacity: '200 people',
      status: 'open',
      description: 'Large community center with full kitchen facilities and sleeping areas.'
    },
    {
      id: 2,
      name: 'Food Distribution Point',
      address: '789 Oak Ave, Westside',
      services: ['food', 'water', 'pet-friendly'],
      capacity: '500 meals/day',
      status: 'open',
      description: 'Mobile food distribution with pet-friendly area.'
    }
  ];

  addNewLocation(): void {
    const modalRef = this.modalService.open(ListingModalComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true
    });

    modalRef.componentInstance.mode = 'add';

    modalRef.result.then(
      (result) => {
        if (result.action === 'add') {
          // Generate new ID
          const newId = this.locations.length > 0 
            ? Math.max(...this.locations.map(l => l.id)) + 1 
            : 1;
          
          const newLocation: AidListing = {
            ...result.data,
            id: newId
          };
          
          this.locations.unshift(newLocation);
          console.log('Location added:', newLocation);
        }
      },
      (reason) => {
        console.log('Modal dismissed:', reason);
      }
    );
  }

  editLocation(location: AidListing): void {
    const modalRef = this.modalService.open(ListingModalComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true
    });

    modalRef.componentInstance.mode = 'edit';
    modalRef.componentInstance.locationData = { ...location };

    modalRef.result.then(
      (result) => {
        if (result.action === 'edit') {
          // Find and update the location
          const index = this.locations.findIndex(l => l.id === location.id);
          if (index !== -1) {
            this.locations[index] = {
              ...result.data,
              id: location.id
            };
            console.log('Location updated:', this.locations[index]);
          }
        }
      },
      (reason) => {
        console.log('Modal dismissed:', reason);
      }
    );
  }

  deleteLocation(location: AidListing): void {
    if (confirm(`Are you sure you want to delete "${location.name}"? This action cannot be undone.`)) {
      const index = this.locations.findIndex(l => l.id === location.id);
      if (index !== -1) {
        this.locations.splice(index, 1);
        console.log('Location deleted:', location.name);
      }
    }
  }

  getServiceIcon(serviceName: string): string {
    return getServiceIcon(serviceName);
  }
}

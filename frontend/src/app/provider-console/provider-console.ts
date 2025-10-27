import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ListingModalComponent } from '../shared/listing-modal/listing-modal';
import { AidListing, getServiceIcon } from '../models/location.models';
import { ProviderListingService } from '../services/provider-listing.service';

@Component({
  selector: 'app-provider-console',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './provider-console.html',
  styleUrl: './provider-console.css'
})
export class ProviderConsoleComponent implements OnInit {
  locations: AidListing[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private modalService: NgbModal,
    private providerListingService: ProviderListingService
  ) {}

  ngOnInit(): void {
    this.loadUserListings();
  }

  loadUserListings(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.providerListingService.getUserListings().subscribe({
      next: (listings: AidListing[]) => {
        this.locations = listings;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading listings:', error);
        this.errorMessage = 'Failed to load listings. Please try again.';
        this.isLoading = false;
      }
    });
  }

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
          // Reload listings from backend
          this.loadUserListings();
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
          // Reload listings from backend
          this.loadUserListings();
        }
      },
      (reason) => {
        console.log('Modal dismissed:', reason);
      }
    );
  }

  deleteLocation(location: AidListing): void {
    if (confirm(`Are you sure you want to delete "${location.name}"? This action cannot be undone.`)) {
      this.providerListingService.deleteListing(location.id).subscribe({
        next: () => {
          this.loadUserListings();
        },
        error: (error) => {
          console.error('Error deleting listing:', error);
          alert('Failed to delete listing. Please try again.');
        }
      });
    }
  }

  getServiceIcon(serviceName: string): string {
    return getServiceIcon(serviceName);
  }
}

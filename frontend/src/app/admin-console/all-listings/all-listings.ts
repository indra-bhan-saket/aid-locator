import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocationDetailsModalComponent } from '../../shared/location-details-modal/location-details-modal';
import { AidListing, LocationDetails, getServiceIcon } from '../../models/location.models';
import { ListingService } from '../../services/listing.service';

@Component({
  selector: 'app-all-listings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-listings.html',
  styleUrl: './all-listings.css'
})
export class AllListingsComponent implements OnInit {
  listings: AidListing[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(
    private modalService: NgbModal,
    private listingService: ListingService
  ) {}

  ngOnInit(): void {
    this.loadListings();
  }

  loadListings(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.listingService.getAllListings().subscribe({
      next: (listings) => {
        this.listings = listings;
        this.isLoading = false;
        console.log('All listings loaded:', this.listings);
      },
      error: (error) => {
        console.error('Error loading listings:', error);
        this.errorMessage = error.message || 'Failed to load listings';
        this.isLoading = false;
        // Fallback to sample data for development
        this.loadSampleData();
      }
    });
  }

  loadSampleData(): void {
    // Fallback sample data
    this.listings = [
    {
      id: 1,
      name: 'Central Community Center',
      address: '123 Main St, Downtown',
      services: ['food', 'shelter', 'water', 'child-safe'],
      verificationStatus: 'Verified',
      status: 'open',
      capacity: '200 people',
      description: 'Large community center with multiple rooms and facilities.'
    },
    {
      id: 2,
      name: 'Riverside Emergency Shelter',
      address: '456 River Rd, Riverside',
      services: ['shelter', 'water', 'toilets', 'disabled-access'],
      verificationStatus: 'Pending',
      status: 'open',
      capacity: '150 people',
      description: 'Temporary shelter with accessible facilities.'
    },
    {
      id: 3,
      name: 'Food Distribution Point',
      address: '789 Oak Ave, Westside',
      services: ['food', 'water', 'pet-friendly'],
      verificationStatus: 'Verified',
      status: 'open',
      capacity: '100 people',
      description: 'Food distribution center operating daily.'
    },
    {
      id: 4,
      name: 'Emergency Medical Station',
      address: '321 Health Plaza, Medical District',
      services: ['water', 'toilets', 'medical'],
      verificationStatus: 'Verified',
      status: 'full',
      capacity: '100 people',
      description: 'Medical station with trained staff and equipment.'
    }
    ];
  }

  viewListing(listing: AidListing) {
    const locationDetails: LocationDetails = {
      name: listing.name,
      address: listing.address,
      status: listing.status,
      capacity: listing.capacity,
      verified: listing.verificationStatus === 'Verified' ? 'Yes' : 'No',
      description: listing.description,
      services: listing.services.map(serviceName => ({
        name: serviceName,
        icon: getServiceIcon(serviceName)
      }))
    };

    const modalRef = this.modalService.open(LocationDetailsModalComponent, {
      centered: true,
      size: 'lg',
      backdrop: 'static'
    });
    
    modalRef.componentInstance.location = locationDetails;
    
    modalRef.result.then(
      (result) => {
        console.log('Modal action:', result);
        // Handle approve/reject actions if needed
      },
      (reason) => {
        console.log('Modal dismissed:', reason);
      }
    );
  }

  getServiceIcon(serviceName: string): string {
    return getServiceIcon(serviceName);
  }
}

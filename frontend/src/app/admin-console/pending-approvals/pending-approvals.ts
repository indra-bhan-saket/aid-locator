import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ListingDetailsModalComponent } from '../../shared/listing-details-modal/listing-details-modal';
import { AidListing, getServiceIcon } from '../../models/location.models';
import { ListingService } from '../../services/listing.service';

@Component({
  selector: 'app-pending-approvals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pending-approvals.html',
  styleUrl: './pending-approvals.css'
})
export class PendingApprovalsComponent implements OnInit {
  pendingListings: AidListing[] = [];
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

    this.listingService.getAllPendingListings().subscribe({
      next: (listings) => {
        this.pendingListings = listings;
        this.isLoading = false;
        console.log('Listings loaded:', this.pendingListings);
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
    this.pendingListings = [
      {
        id: 1,
        name: 'Central Community Center',
        address: '123 Main St, Downtown',
        provider: 'Red Cross Emergency Response',
        services: ['shelter', 'food', 'water'],
        status: 'open',
        submitted: '15/01/2024, 13:30:00',
        capacity: '200 people',
        description: 'Large community center with multiple rooms and facilities.',
        verificationStatus: 'pending'
      },
      {
        id: 2,
        name: 'Riverside Emergency Shelter',
        address: '456 River Rd, Riverside',
        provider: 'Community Aid Network',
        services: ['food', 'water', 'toilets', 'disabled-access'],
        status: 'open',
        submitted: '14/01/2024, 17:30:00',
        capacity: '150 people',
        description: 'Temporary shelter with accessible facilities.',
        verificationStatus: 'pending'
      },
      {
        id: 3,
        name: 'Emergency Medical Station',
        address: '321 Health Plaza, Medical District',
        provider: 'Emergency Medical Services',
        services: ['water', 'toilets', 'medical'],
        status: 'full',
        submitted: '13/01/2024, 19:30:00',
        capacity: '100 people',
        description: 'Medical station with trained staff and equipment.',
        verificationStatus: 'pending'
      }
    ];
  }

  viewListing(listing: AidListing) {
    const modalRef = this.modalService.open(ListingDetailsModalComponent, {
      centered: true,
      size: 'lg',
      backdrop: 'static'
    });
    
    modalRef.componentInstance.listing = listing;
    
    modalRef.result.then(
      (result) => {
        if (result === 'approved') {
          this.updateListingStatus(listing, 'verified');
        } else if (result === 'rejected') {
          this.updateListingStatus(listing, 'rejected');
        }
      },
      (reason) => {
        console.log('Modal dismissed:', reason);
      }
    );
  }

  updateListingStatus(listing: AidListing, status: 'verified' | 'rejected') {
    if (!listing.id) {
      console.error('Cannot update listing without ID');
      return;
    }

    const approvalData = {
      id: listing.id,
      verificationStatus: status
    };

    const action = status === 'verified' ? 'approved' : 'rejected';

    this.listingService.approveListing(approvalData).subscribe({
      next: (result) => {
        console.log(`Listing ${action} successfully:`, result);
        // Update the listing in the local array
        const index = this.pendingListings.findIndex(l => l.id === listing.id);
        if (index !== -1) {
          this.pendingListings.splice(index, 1);
        }
        // Optionally reload the listings
        // this.loadListings();
      },
      error: (error) => {
        console.error(`Error ${action.slice(0, -1)}ing listing:`, error);
        this.errorMessage = `Failed to ${action.slice(0, -1)} listing. Please try again.`;
      }
    });
  }

  getServiceIcon(serviceName: string): string {
    return getServiceIcon(serviceName);
  }
}

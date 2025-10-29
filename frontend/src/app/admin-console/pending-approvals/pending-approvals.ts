import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ListingDetailsModalComponent } from '../../shared/listing-details-modal/listing-details-modal';
import { AidListing, getServiceIcon } from '../../models/location.models';
import { ListingService } from '../../services/listing.service';

@Component({
  selector: 'app-pending-approvals',
  standalone: true,
  imports: [CommonModule, NgbPaginationModule],
  templateUrl: './pending-approvals.html',
  styleUrl: './pending-approvals.css'
})
export class PendingApprovalsComponent implements OnInit {
  allPendingListings: AidListing[] = [];
  pendingListings: AidListing[] = [];
  isLoading = false;
  errorMessage = '';

  // Pagination properties
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  Math = Math;

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
        this.allPendingListings = listings;
        this.collectionSize = listings.length;
        this.refreshListings();
        this.isLoading = false;
        console.log('Listings loaded:', this.allPendingListings);
      },
      error: (error) => {
        console.error('Error loading listings:', error);
        this.errorMessage = error.message || 'Failed to load listings';
        this.isLoading = false;
      }
    });
  }

  refreshListings(): void {
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pendingListings = this.allPendingListings.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    this.page = page;
    this.refreshListings();
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        // Update the listing in both arrays
        const index = this.allPendingListings.findIndex(l => l.id === listing.id);
        if (index !== -1) {
          this.allPendingListings.splice(index, 1);
          this.collectionSize = this.allPendingListings.length;
        }
        // Refresh current page
        this.refreshListings();
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

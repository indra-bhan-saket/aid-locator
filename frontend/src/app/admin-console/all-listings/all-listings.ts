import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ListingDetailsModalComponent } from '../../shared/listing-details-modal/listing-details-modal';
import { AidListing, getServiceIcon } from '../../models/location.models';
import { ListingService } from '../../services/listing.service';

@Component({
  selector: 'app-all-listings',
  standalone: true,
  imports: [CommonModule, NgbPaginationModule],
  templateUrl: './all-listings.html',
  styleUrl: './all-listings.css'
})
export class AllListingsComponent implements OnInit {
  listings: AidListing[] = [];
  allListings: AidListing[] = [];
  isLoading = false;
  errorMessage = '';

  // Pagination properties
  page: number = 1;
  pageSize: number = 9; // 3x3 grid
  collectionSize: number = 0;

  // Expose Math for template
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

    this.listingService.getAllListings().subscribe({
      next: (listings) => {
        this.allListings = listings;
        this.collectionSize = this.allListings.length;
        this.refreshListings();
        this.isLoading = false;
        console.log('All listings loaded:', this.allListings);
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
    this.listings = this.allListings.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    this.page = page;
    this.refreshListings();
    // Scroll to top of listings
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
        // Update the listing in the local array
        const index = this.listings.findIndex(l => l.id === listing.id);
        if (index !== -1) {
          this.listings[index].verificationStatus = status;
        }
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

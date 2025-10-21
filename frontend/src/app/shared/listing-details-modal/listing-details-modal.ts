import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AidListing, getServiceIcon } from '../../models/location.models';

@Component({
  selector: 'app-listing-details-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listing-details-modal.html',
  styleUrls: ['./listing-details-modal.css']
})
export class ListingDetailsModalComponent {
  @Input() listing!: AidListing;

  constructor(public activeModal: NgbActiveModal) {}

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

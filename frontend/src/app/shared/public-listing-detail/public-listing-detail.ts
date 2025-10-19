import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AidListing, getServiceIcon } from '../../models/location.models';

@Component({
  selector: 'app-public-listing-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './public-listing-detail.html',
  styleUrls: ['./public-listing-detail.css']
})
export class PublicListingDetailComponent {
  @Input() location!: AidListing;

  constructor(public activeModal: NgbActiveModal) {}

  getServiceIcon(serviceName: string): string {
    return getServiceIcon(serviceName);
  }

  close(): void {
    this.activeModal.dismiss('close');
  }

  reportIssue(): void {
    console.log('Report issue for location:', this.location.name);
    // TODO: Implement report issue functionality
    alert('Report issue functionality will be implemented soon.');
  }
}

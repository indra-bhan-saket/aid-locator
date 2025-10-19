import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AidListing, getServiceIcon } from '../../models/location.models';
import { PublicListingDetailComponent } from '../../shared/public-listing-detail/public-listing-detail';

@Component({
  selector: 'app-locations-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './locations-list.html',
  styleUrl: './locations-list.css'
})
export class LocationsListComponent {
  @Input() locations: AidListing[] = [];

  constructor(private modalService: NgbModal) {}

  getServiceIcon(serviceName: string): string {
    return getServiceIcon(serviceName);
  }

  viewDetails(location: AidListing): void {
    const modalRef = this.modalService.open(PublicListingDetailComponent, {
      size: 'lg',
      centered: true,
      scrollable: true
    });

    modalRef.componentInstance.location = location;
  }
}

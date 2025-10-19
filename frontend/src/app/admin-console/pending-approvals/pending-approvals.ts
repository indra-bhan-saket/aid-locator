import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocationDetailsModalComponent } from '../../shared/location-details-modal/location-details-modal';
import { AidListing, LocationDetails, getServiceIcon } from '../../models/location.models';

@Component({
  selector: 'app-pending-approvals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pending-approvals.html',
  styleUrl: './pending-approvals.css'
})
export class PendingApprovalsComponent {
  constructor(private modalService: NgbModal) {}

  pendingLocations: AidListing[] = [
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
      verificationStatus: 'Pending'
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
      verificationStatus: 'Pending'
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
      verificationStatus: 'Pending'
    }
  ];

  viewLocation(location: AidListing) {
    const locationDetails: LocationDetails = {
      name: location.name,
      address: location.address,
      status: location.status,
      capacity: location.capacity,
      verified: 'No',
      description: location.description,
      services: location.services.map(serviceName => ({
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
        if (result === 'approved') {
          this.approveLocation(location);
        } else if (result === 'rejected') {
          this.rejectLocation(location);
        }
      },
      (reason) => {
        console.log('Modal dismissed:', reason);
      }
    );
  }

  approveLocation(location: AidListing) {
    console.log('Approve location:', location);
    // TODO: Implement approve location functionality
  }

  rejectLocation(location: AidListing) {
    console.log('Reject location:', location);
    // TODO: Implement reject location functionality
  }

  getServiceIcon(serviceName: string): string {
    return getServiceIcon(serviceName);
  }
}

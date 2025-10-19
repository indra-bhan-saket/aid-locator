import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LocationDetails } from '../../models/location.models';

@Component({
  selector: 'app-location-details-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './location-details-modal.html',
  styleUrls: ['./location-details-modal.css']
})
export class LocationDetailsModalComponent {
  @Input() location!: LocationDetails;

  constructor(public activeModal: NgbActiveModal) {}

  approveLocation(): void {
    console.log('Approving location:', this.location.name);
    this.activeModal.close('approved');
  }

  rejectLocation(): void {
    console.log('Rejecting location:', this.location.name);
    this.activeModal.close('rejected');
  }

  closeModal(): void {
    this.activeModal.dismiss('closed');
  }
}

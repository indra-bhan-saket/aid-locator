import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AidProvidersComponent } from './aid-providers/aid-providers';
import { PendingApprovalsComponent } from './pending-approvals/pending-approvals';
import { AllListingsComponent } from './all-listings/all-listings';

@Component({
  selector: 'app-admin-console',
  standalone: true,
  imports: [CommonModule, AidProvidersComponent, PendingApprovalsComponent, AllListingsComponent],
  templateUrl: './admin-console.html',
  styleUrl: './admin-console.css'
})
export class AdminConsoleComponent {
  activeTab: string = 'pending-approvals';

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  addVerifiedLocation() {
    console.log('Add Verified Location clicked');
    // TODO: Implement add location functionality
  }
}

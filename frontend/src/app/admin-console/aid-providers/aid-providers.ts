import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../models/auth.models';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-aid-providers',
  standalone: true,
  imports: [CommonModule, NgbPaginationModule],
  templateUrl: './aid-providers.html',
  styleUrl: './aid-providers.css'
})
export class AidProvidersComponent implements OnInit {
  allProviders: User[] = [];
  providers: User[] = [];
  isLoading = false;
  errorMessage = '';

  // Pagination properties
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  Math = Math;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadProviders();
  }

  loadProviders(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.userService.getAllUsers().subscribe({
      next: (users) => {
        // Filter to show only providers or show all based on requirements
        this.allProviders = users.filter(user => user.role?.toLowerCase() === 'provider');
        this.collectionSize = this.allProviders.length;
        this.refreshProviders();
        this.isLoading = false;
        console.log('Providers loaded:', this.allProviders);
      },
      error: (error) => {
        console.error('Error loading providers:', error);
        this.errorMessage = error.message || 'Failed to load providers';
        this.isLoading = false;
        // Fallback to sample data for development
        this.loadSampleData();
      }
    });
  }

  refreshProviders(): void {
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.providers = this.allProviders.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    this.page = page;
    this.refreshProviders();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  loadSampleData(): void {
    // Fallback sample data
    this.allProviders = [
      {
        id: 1,
        name: 'Red Cross Emergency Response',
        email: 'emergency@redcross.org',
        phone: '+1-555-0123',
        status: 'approved',
        role: 'provider',
        type: 'organization',
        createdAt: '2025-10-17T12:24:59.427+00:00',
        updatedAt: '2025-10-17T12:24:59.427+00:00',
        accountNonExpired: true,
        accountNonLocked: true,
        credentialsNonExpired: true,
        username: 'emergency@redcross.org',
        enabled: true,
        locationCount: 2
      },
      {
        id: 2,
        name: 'Community Aid Network',
        email: 'help@communityaid.org',
        phone: '+1-555-0456',
        status: 'approved',
        role: 'provider',
        type: 'organization',
        createdAt: '2025-10-17T12:25:30.427+00:00',
        updatedAt: '2025-10-17T12:25:30.427+00:00',
        accountNonExpired: true,
        accountNonLocked: true,
        credentialsNonExpired: true,
        username: 'help@communityaid.org',
        enabled: true,
        locationCount: 1
      },
      {
        id: 3,
        name: 'Emergency Medical Services',
        email: 'contact@ems.gov',
        phone: '+1-555-0789',
        status: 'approved',
        role: 'provider',
        type: 'organization',
        createdAt: '2025-10-17T12:26:00.427+00:00',
        updatedAt: '2025-10-17T12:26:00.427+00:00',
        accountNonExpired: true,
        accountNonLocked: true,
        credentialsNonExpired: true,
        username: 'contact@ems.gov',
        enabled: true,
        locationCount: 1
      }
    ];
    this.collectionSize = this.allProviders.length;
    this.refreshProviders();
  }

  viewProvider(provider: User) {
    console.log('View provider:', provider);
    // TODO: Implement view provider functionality
  }

  approveProvider(provider: User) {
    if (!provider.email) {
      console.error('Provider email is required');
      return;
    }

    // Confirm approval
    if (!confirm(`Are you sure you want to approve ${provider.name}?`)) {
      return;
    }

    this.isLoading = true;
    const userApproval = {
      email: provider.email,
      status: 'approved'
    };

    this.userService.approveUser(userApproval).subscribe({
      next: (response) => {
        console.log('Provider approved successfully:', response);
        // Refresh the providers list
        this.loadProviders();
      },
      error: (error) => {
        console.error('Error approving provider:', error);
        this.errorMessage = 'Failed to approve provider: ' + (error.message || 'Unknown error');
        this.isLoading = false;
      }
    });
  }

  rejectProvider(provider: User) {
    if (!provider.email) {
      console.error('Provider email is required');
      return;
    }

    // Confirm rejection
    if (!confirm(`Are you sure you want to reject ${provider.name}?`)) {
      return;
    }

    this.isLoading = true;
    const userApproval = {
      email: provider.email,
      status: 'rejected'
    };

    this.userService.approveUser(userApproval).subscribe({
      next: (response) => {
        console.log('Provider rejected successfully:', response);
        // Refresh the providers list
        this.loadProviders();
      },
      error: (error) => {
        console.error('Error rejecting provider:', error);
        this.errorMessage = 'Failed to reject provider: ' + (error.message || 'Unknown error');
        this.isLoading = false;
      }
    });
  }
}

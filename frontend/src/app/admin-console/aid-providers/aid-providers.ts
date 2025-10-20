import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../models/auth.models';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-aid-providers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aid-providers.html',
  styleUrl: './aid-providers.css'
})
export class AidProvidersComponent implements OnInit {
  providers: User[] = [];
  isLoading = false;
  errorMessage = '';

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
        this.providers = users.filter(user => user.role?.toLowerCase() === 'provider');
        this.isLoading = false;
        console.log('Providers loaded:', this.providers);
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

  loadSampleData(): void {
    // Fallback sample data
    this.providers = [
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

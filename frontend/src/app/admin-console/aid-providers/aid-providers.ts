import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Provider } from '../../models/provider.models';

@Component({
  selector: 'app-aid-providers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aid-providers.html',
  styleUrl: './aid-providers.css'
})
export class AidProvidersComponent {
  providers: Provider[] = [
    {
      id: 1,
      name: 'Red Cross Emergency Response',
      email: 'emergency@redcross.org',
      phone: '+1-555-0123',
      locationCount: 2,
      status: 'Approved'
    },
    {
      id: 2,
      name: 'Community Aid Network',
      email: 'help@communityaid.org',
      phone: '+1-555-0456',
      locationCount: 1,
      status: 'Approved'
    },
    {
      id: 3,
      name: 'Emergency Medical Services',
      email: 'contact@ems.gov',
      phone: '+1-555-0789',
      locationCount: 1,
      status: 'Approved'
    }
  ];

  viewProvider(provider: Provider) {
    console.log('View provider:', provider);
    // TODO: Implement view provider functionality
  }

  approveProvider(provider: Provider) {
    console.log('Approve provider:', provider);
    // TODO: Implement approve provider functionality
  }

  rejectProvider(provider: Provider) {
    console.log('Reject provider:', provider);
    // TODO: Implement reject provider functionality
  }
}

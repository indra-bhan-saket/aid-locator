// Provider-related interfaces

// Provider entity for admin console
export interface Provider {
  id: number;
  name: string;
  email: string;
  phone: string;
  locationCount: number;
  status: 'Approved' | 'Pending' | 'Suspended';
}

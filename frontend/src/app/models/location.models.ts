// Location-related interfaces

// Service offered at a location
export interface Service {
  name: string;
  icon: string;
  label: string;
}

// Location entity used in provider console and listings
export interface AidListing {
  id: number;
  name: string;
  address: string;
  latitude?: string;
  longitude?: string;
  services: string[];
  capacity: string;
  status: 'open' | 'closed' | 'full';
  description: string;
  contactPerson?: string;
  contactPhone?: string;
  contactEmail?: string;
  provider?: string;
  submitted?: string;
  verificationStatus?: 'verified' | 'pending' | 'rejected';
}

// Location details for display modal
export interface LocationDetails {
  name: string;
  address: string;
  status: string;
  capacity?: string;
  verified: string;
  description?: string;
  services: Array<{ name: string; icon: string }>;
}

/**
 * @deprecated Use AidListing instead. This interface is maintained for backward compatibility only.
 */
export interface Listing {
  id: number;
  name: string;
  address: string;
  services: Service[];
  verificationStatus: 'verified' | 'pending' | 'rejected';
  status: 'open' | 'full';
  capacity?: string;
  description?: string;
}

/**
 * @deprecated Use AidListing instead. This interface is maintained for backward compatibility only.
 */
export interface PendingLocation {
  id: number;
  name: string;
  address: string;
  provider: string;
  services: string[];
  status: 'open' | 'full';
  submitted: string;
  capacity?: string;
  description?: string;
}

// Helper function to get service icon
export function getServiceIcon(serviceName: string): string {
  const serviceMap: { [key: string]: string } = {
    'food': '🍽️',
    'shelter': '🏠',
    'water': '💧',
    'toilets': '🚻',
    'disabled-access': '♿',
    'pet-friendly': '🐕',
    'child-safe': '👶',
    'free-wifi': '📶',
    'medical': '⚕️',
    'wifi': '📶',
    'clothing': '👕'
  };
  
  return serviceMap[serviceName] || '❓';
}

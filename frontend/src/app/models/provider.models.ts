// User-related interfaces (Users are providers)

// User entity matching backend structure
export interface User {
  id: number;
  email: string;
  phone: string;
  name: string;
  status: string; // 'approved', 'pending', 'suspended'
  role: string; // 'admin', 'provider', 'user'
  type: string; // 'individual', 'organization'
  createdAt: string;
  updatedAt: string;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  authorities: any[];
  username: string;
  enabled: boolean;
  locationCount?: number; // Optional: for display purposes in admin console
}

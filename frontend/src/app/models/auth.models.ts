// User entity interface matching backend User class
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
  username: string;
  enabled: boolean;
  password?: string; // Optional as it shouldn't be returned in responses
  locationCount?: number; // Optional: for display purposes in admin console
}

// Login request DTO matching backend LoginUserDto
export interface LoginUserDto {
  email: string;
  password: string;
}

// Register request DTO matching backend RegisterUserDto
export interface RegisterUserDto {
  name: string;
  email: string;
  password: string;
  phone?: string;
//   providerName?: string;
  type: string;
  role: string;
}

// Login response matching backend LoginResponse
export interface LoginResponse {
  token: string;
  expiresIn: number;
  user: User;
}

// Error response
export interface ErrorResponse {
  error: string;
  message?: string;
}

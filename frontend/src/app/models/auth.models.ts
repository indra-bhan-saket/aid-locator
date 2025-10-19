// User entity interface matching backend User class
export interface User {
  id?: number;
  fullName: string;
  email: string;
  password?: string; // Optional as it shouldn't be returned in responses
  createdAt?: Date;
  updatedAt?: Date;
  role?: string;
  status?: string;
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

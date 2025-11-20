// Auth-related types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  user?: {
    id: number;
    email: string;
    name?: string;
  };
  error?: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
}

export interface ApiKeyRequest {
  name: string;
  description?: string;
  projectIds?: number[];
  expiresAt?: Date;
}

export interface ApiKeyResponse {
  success: boolean;
  key?: string; // The actual key value (not hashed) returned only when created
  apiKey?: {
    id: number;
    name: string;
    description?: string;
    projectIds: number[];
    isActive: boolean;
    expiresAt?: Date;
    createdAt: Date;
  };
  error?: string;
}

export interface UserWithProjects {
  id: number;
  email: string;
  name?: string;
  projects: {
    id: number;
    name: string;
    description?: string;
  }[];
}

// JWT payload
export interface JwtPayload {
  sub: number; // User ID
  email: string;
  iat?: number;
  exp?: number;
}
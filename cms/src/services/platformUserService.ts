import apiClient from './api';

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  PENDING = 'pending',
}

export interface PlatformUser {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  profilePictureUrl?: string;
  department?: string;
  employeeId?: string;
  role: {
    roleId: number;
    name: string;
    permissions: string[];
  };
  status: UserStatus;
  lastLoginAt?: string;
  emailVerified: boolean;
  twoFactorEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePlatformUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  profilePictureUrl?: string;
  department?: string;
  employeeId?: string;
  roleId: number;
  status?: UserStatus;
  emailVerified?: boolean;
  twoFactorEnabled?: boolean;
}

export interface UpdatePlatformUserDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
  profilePictureUrl?: string;
  department?: string;
  employeeId?: string;
  roleId?: number;
  status?: UserStatus;
  emailVerified?: boolean;
  twoFactorEnabled?: boolean;
}

export const platformUserService = {
  getAll: async (roleId?: number, status?: UserStatus): Promise<PlatformUser[]> => {
    const params = new URLSearchParams();
    if (roleId) params.append('roleId', roleId.toString());
    if (status) params.append('status', status);
    
    const response = await apiClient.get(`/platform-users?${params.toString()}`);
    return response.data;
  },

  getById: async (id: number): Promise<PlatformUser> => {
    const response = await apiClient.get(`/platform-users/${id}`);
    return response.data;
  },

  create: async (userData: CreatePlatformUserDto): Promise<PlatformUser> => {
    const response = await apiClient.post('/platform-users', userData);
    return response.data;
  },

  update: async (id: number, userData: UpdatePlatformUserDto): Promise<PlatformUser> => {
    const response = await apiClient.put(`/platform-users/${id}`, userData);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/platform-users/${id}`);
  },

  suspend: async (id: number): Promise<PlatformUser> => {
    const response = await apiClient.patch(`/platform-users/${id}/suspend`);
    return response.data;
  },

  activate: async (id: number): Promise<PlatformUser> => {
    const response = await apiClient.patch(`/platform-users/${id}/activate`);
    return response.data;
  },

  resetPassword: async (id: number): Promise<void> => {
    await apiClient.post(`/platform-users/${id}/reset-password`);
  },
};

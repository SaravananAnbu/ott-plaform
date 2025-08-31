import apiClient from './api';

export interface User {
  userId: number;
  phoneNumber?: string;
  email?: string;
  country?: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

export interface CreateUserDto {
  phoneNumber?: string;
  email?: string;
  country?: string;
  isActive?: boolean;
}

export interface UpdateUserDto {
  phoneNumber?: string;
  email?: string;
  country?: string;
  isActive?: boolean;
}

export const userService = {
  getAll: async (): Promise<User[]> => {
    const response = await apiClient.get('/users');
    return response.data;
  },

  getById: async (id: number): Promise<User> => {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  },

  create: async (userData: CreateUserDto): Promise<User> => {
    const response = await apiClient.post('/users', userData);
    return response.data;
  },

  update: async (id: number, userData: UpdateUserDto): Promise<User> => {
    const response = await apiClient.patch(`/users/${id}`, userData);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/users/${id}`);
  },

  getByEmail: async (email: string): Promise<User> => {
    const response = await apiClient.get(`/users/email/${email}`);
    return response.data;
  },

  getByPhone: async (phoneNumber: string): Promise<User> => {
    const response = await apiClient.get(`/users/phone/${phoneNumber}`);
    return response.data;
  },
};
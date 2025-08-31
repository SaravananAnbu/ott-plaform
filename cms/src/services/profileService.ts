import apiClient from './api';

export enum ProfileAgeRestriction {
  NONE = 'none',
  KIDS = 'kids',
  TEENS = 'teens',
  ADULTS = 'adults',
}

export interface Profile {
  profileId: number;
  user: { userId: number; email?: string; phoneNumber?: string };
  profileName: string;
  profileImage?: string;
  ageRestriction: ProfileAgeRestriction;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProfileDto {
  userId: number;
  profileName: string;
  profileImage?: string;
  ageRestriction?: ProfileAgeRestriction;
}

export interface UpdateProfileDto {
  userId?: number;
  profileName?: string;
  profileImage?: string;
  ageRestriction?: ProfileAgeRestriction;
}

export const profileService = {
  getAll: async (): Promise<Profile[]> => {
    const response = await apiClient.get('/profiles');
    return response.data;
  },

  getById: async (id: number): Promise<Profile> => {
    const response = await apiClient.get(`/profiles/${id}`);
    return response.data;
  },

  create: async (profileData: CreateProfileDto): Promise<Profile> => {
    const response = await apiClient.post('/profiles', profileData);
    return response.data;
  },

  update: async (id: number, profileData: UpdateProfileDto): Promise<Profile> => {
    const response = await apiClient.patch(`/profiles/${id}`, profileData);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/profiles/${id}`);
  },

  getByUserId: async (userId: number): Promise<Profile[]> => {
    const response = await apiClient.get(`/profiles/user/${userId}`);
    return response.data;
  },
};
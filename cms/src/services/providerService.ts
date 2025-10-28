import apiClient from './api';

// Provider Status Enum
export enum ProviderStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  MAINTENANCE = 'maintenance',
}

// Provider Type Enum
export enum ProviderType {
  STREAMING = 'streaming',
  STUDIO = 'studio',
  DISTRIBUTOR = 'distributor',
  NETWORK = 'network',
}

// Provider Interface
export interface Provider {
  providerId: number;
  providerName: string;
  description?: string;
  iconUrl?: string;
  logoUrl?: string;
  bannerUrl?: string;
  websiteUrl?: string;
  providerType: ProviderType;
  countryOfOrigin?: string;
  establishedYear?: number;
  isPremium: boolean;
  isFeatured: boolean;
  subscriptionRequired: boolean;
  colorCode?: string;
  sortOrder: number;
  status: ProviderStatus;
  contentCount: number;
  apiEndpoint?: string;
  apiKey?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProviderDto {
  providerName: string;
  description?: string;
  iconUrl?: string;
  logoUrl?: string;
  bannerUrl?: string;
  websiteUrl?: string;
  providerType?: ProviderType;
  countryOfOrigin?: string;
  establishedYear?: number;
  isPremium?: boolean;
  isFeatured?: boolean;
  subscriptionRequired?: boolean;
  colorCode?: string;
  sortOrder?: number;
  status?: ProviderStatus;
  apiEndpoint?: string;
  apiKey?: string;
  metadata?: Record<string, any>;
}

export interface UpdateProviderDto {
  providerName?: string;
  description?: string;
  iconUrl?: string;
  logoUrl?: string;
  bannerUrl?: string;
  websiteUrl?: string;
  providerType?: ProviderType;
  countryOfOrigin?: string;
  establishedYear?: number;
  isPremium?: boolean;
  isFeatured?: boolean;
  subscriptionRequired?: boolean;
  colorCode?: string;
  sortOrder?: number;
  status?: ProviderStatus;
  apiEndpoint?: string;
  apiKey?: string;
  metadata?: Record<string, any>;
}

// Provider Service
const API_BASE_URL = '/api/providers';

export const providerService = {
  getAll: async (type?: string): Promise<Provider[]> => {
    const params = type ? `?type=${type}` : '';
    const response = await apiClient.get(`/providers${params}`);
    return response.data;
  },

  getById: async (id: number): Promise<Provider> => {
    const response = await apiClient.get(`/providers/${id}`);
    return response.data;
  },

  create: async (providerData: CreateProviderDto): Promise<Provider> => {
    const response = await apiClient.post('/providers', providerData);
    return response.data;
  },

  update: async (id: number, providerData: UpdateProviderDto): Promise<Provider> => {
    const response = await apiClient.patch(`/providers/${id}`, providerData);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/providers/${id}`);
  },

  getFeatured: async (): Promise<Provider[]> => {
    const response = await apiClient.get('/providers/featured');
    return response.data;
  },

  updateContentCount: async (id: number): Promise<Provider> => {
    const response = await apiClient.patch(`/providers/${id}/update-content-count`);
    return response.data;
  },
};

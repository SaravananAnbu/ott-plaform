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
  // Get all providers
  async getAll(activeOnly?: boolean): Promise<Provider[]> {
    const params = activeOnly ? '?active=true' : '';
    const response = await apiClient.get(`${API_BASE_URL}${params}`);
    return response.data;
  },

  // Get provider by ID
  async getById(id: number): Promise<Provider> {
    const response = await apiClient.get(`${API_BASE_URL}/${id}`);
    return response.data;
  },

  // Get featured providers
  async getFeatured(): Promise<Provider[]> {
    const response = await apiClient.get(`${API_BASE_URL}/featured`);
    return response.data;
  },

  // Get providers by type
  async getByType(type: ProviderType): Promise<Provider[]> {
    const response = await apiClient.get(`${API_BASE_URL}/type/${type}`);
    return response.data;
  },

  // Create new provider
  async create(data: CreateProviderDto): Promise<Provider> {
    const response = await apiClient.post(API_BASE_URL, data);
    return response.data;
  },

  // Update provider
  async update(id: number, data: UpdateProviderDto): Promise<Provider> {
    const response = await apiClient.patch(`${API_BASE_URL}/${id}`, data);
    return response.data;
  },

  // Delete provider
  async delete(id: number): Promise<void> {
    await apiClient.delete(`${API_BASE_URL}/${id}`);
  },

  // Update content count
  async updateContentCount(id: number): Promise<void> {
    await apiClient.patch(`${API_BASE_URL}/${id}/update-content-count`);
  },

  // Search providers
  async search(query: string): Promise<Provider[]> {
    const response = await apiClient.get(`${API_BASE_URL}?search=${encodeURIComponent(query)}`);
    return response.data;
  },
};

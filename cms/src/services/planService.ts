import apiClient from './api';

export enum PlanType {
  FREE = 'free',
  BASIC = 'basic',
  STANDARD = 'standard',
  PREMIUM = 'premium',
  FAMILY = 'family',
}

export enum PlanStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DEPRECATED = 'deprecated',
}

export interface Plan {
  planId: number;
  planName: string;
  description?: string;
  priceCents: number;
  currency: string;
  type: PlanType;
  resolution: string;
  screensAllowed: number;
  downloadsAllowed: boolean;
  adsSupported: boolean;
  offlineViewing: boolean;
  maxDownloadQuality?: string;
  streamingQuality: string;
  contentAccessLevel: string;
  simultaneousStreams: number;
  familySharing: boolean;
  parentalControls: boolean;
  billingCycleMonths: number;
  freeTrialDays: number;
  status: PlanStatus;
  isPopular: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePlanDto {
  planName: string;
  description?: string;
  priceCents: number;
  currency?: string;
  type?: PlanType;
  resolution: string;
  screensAllowed?: number;
  downloadsAllowed?: boolean;
  adsSupported?: boolean;
  offlineViewing?: boolean;
  maxDownloadQuality?: string;
  streamingQuality: string;
  contentAccessLevel?: string;
  simultaneousStreams?: number;
  familySharing?: boolean;
  parentalControls?: boolean;
  billingCycleMonths?: number;
  freeTrialDays?: number;
  status?: PlanStatus;
  isPopular?: boolean;
  sortOrder?: number;
}

export interface UpdatePlanDto {
  planName?: string;
  description?: string;
  priceCents?: number;
  currency?: string;
  type?: PlanType;
  resolution?: string;
  screensAllowed?: number;
  downloadsAllowed?: boolean;
  adsSupported?: boolean;
  offlineViewing?: boolean;
  maxDownloadQuality?: string;
  streamingQuality?: string;
  contentAccessLevel?: string;
  simultaneousStreams?: number;
  familySharing?: boolean;
  parentalControls?: boolean;
  billingCycleMonths?: number;
  freeTrialDays?: number;
  status?: PlanStatus;
  isPopular?: boolean;
  sortOrder?: number;
}

export const planService = {
  getAll: async (): Promise<Plan[]> => {
    const response = await apiClient.get('/plans');
    return response.data;
  },

  getById: async (id: number): Promise<Plan> => {
    const response = await apiClient.get(`/plans/${id}`);
    return response.data;
  },

  create: async (planData: CreatePlanDto): Promise<Plan> => {
    const response = await apiClient.post('/plans', planData);
    return response.data;
  },

  update: async (id: number, planData: UpdatePlanDto): Promise<Plan> => {
    const response = await apiClient.patch(`/plans/${id}`, planData);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/plans/${id}`);
  },

  getByName: async (planName: string): Promise<Plan> => {
    const response = await apiClient.get(`/plans/name/${planName}`);
    return response.data;
  },
};
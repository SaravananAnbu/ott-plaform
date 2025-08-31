import apiClient from './api';

export interface Plan {
  planId: number;
  planName: string;
  priceCents: number;
  currency: string;
  resolution: string;
  screensAllowed: number;
  downloadsAllowed: boolean;
  createdAt: string;
}

export interface CreatePlanDto {
  planName: string;
  priceCents: number;
  currency?: string;
  resolution: string;
  screensAllowed?: number;
  downloadsAllowed?: boolean;
}

export interface UpdatePlanDto {
  planName?: string;
  priceCents?: number;
  currency?: string;
  resolution?: string;
  screensAllowed?: number;
  downloadsAllowed?: boolean;
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
import apiClient from './api';

export enum SubscriptionStatus {
  ACTIVE = 'active',
  CANCELLED = 'cancelled',
  EXPIRED = 'expired',
  PAUSED = 'paused',
}

export interface Subscription {
  subscriptionId: number;
  user: { userId: number; email?: string; phoneNumber?: string };
  plan: { planId: number; planName: string; priceCents: number };
  startDate: string;
  endDate?: string;
  status: SubscriptionStatus;
  autoRenew: boolean;
  createdAt: string;
}

export interface CreateSubscriptionDto {
  userId: number;
  planId: number;
  startDate: string;
  endDate?: string;
  status?: SubscriptionStatus;
  autoRenew?: boolean;
}

export interface UpdateSubscriptionDto {
  userId?: number;
  planId?: number;
  startDate?: string;
  endDate?: string;
  status?: SubscriptionStatus;
  autoRenew?: boolean;
}

export const subscriptionService = {
  getAll: async (): Promise<Subscription[]> => {
    const response = await apiClient.get('/subscriptions');
    return response.data;
  },

  getById: async (id: number): Promise<Subscription> => {
    const response = await apiClient.get(`/subscriptions/${id}`);
    return response.data;
  },

  create: async (subscriptionData: CreateSubscriptionDto): Promise<Subscription> => {
    const response = await apiClient.post('/subscriptions', subscriptionData);
    return response.data;
  },

  update: async (id: number, subscriptionData: UpdateSubscriptionDto): Promise<Subscription> => {
    const response = await apiClient.patch(`/subscriptions/${id}`, subscriptionData);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/subscriptions/${id}`);
  },

  getByUserId: async (userId: number): Promise<Subscription[]> => {
    const response = await apiClient.get(`/subscriptions/user/${userId}`);
    return response.data;
  },
};
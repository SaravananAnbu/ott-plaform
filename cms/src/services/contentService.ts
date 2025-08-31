import apiClient from './api';

export enum ContentCategory {
  MOVIE = 'movie',
  SERIES = 'series',
  EPISODE = 'episode',
  LIVE = 'live',
  DOCUMENTARY = 'documentary',
  SHORT = 'short',
  TRAILER = 'trailer',
}

export enum MaturityRating {
  G = 'G',
  PG = 'PG',
  PG13 = 'PG-13',
  R = 'R',
  NC17 = 'NC-17',
  U = 'U',
  A = 'A',
}

export enum ContentStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

export interface Content {
  contentId: number;
  title: string;
  description?: string;
  about?: string;
  category: ContentCategory;
  releaseDate?: string;
  durationMinutes?: number;
  language?: string;
  maturityRating?: MaturityRating;
  imdbRating?: number;
  posterUrl?: string;
  bannerUrl?: string;
  thumbnailUrl?: string;
  adUrl?: string;
  status: ContentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateContentDto {
  title: string;
  description?: string;
  about?: string;
  category: ContentCategory;
  releaseDate?: string;
  durationMinutes?: number;
  language?: string;
  maturityRating?: MaturityRating;
  imdbRating?: number;
  posterUrl?: string;
  bannerUrl?: string;
  thumbnailUrl?: string;
  adUrl?: string;
  playerId?: number;
  status?: ContentStatus;
}

export interface UpdateContentDto {
  title?: string;
  description?: string;
  about?: string;
  category?: ContentCategory;
  releaseDate?: string;
  durationMinutes?: number;
  language?: string;
  maturityRating?: MaturityRating;
  imdbRating?: number;
  posterUrl?: string;
  bannerUrl?: string;
  thumbnailUrl?: string;
  adUrl?: string;
  playerId?: number;
  status?: ContentStatus;
}

export const contentService = {
  getAll: async (category?: string, status?: string): Promise<Content[]> => {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (status) params.append('status', status);
    
    const response = await apiClient.get(`/content?${params.toString()}`);
    return response.data;
  },

  getById: async (id: number): Promise<Content> => {
    const response = await apiClient.get(`/content/${id}`);
    return response.data;
  },

  create: async (contentData: CreateContentDto): Promise<Content> => {
    const response = await apiClient.post('/content', contentData);
    return response.data;
  },

  update: async (id: number, contentData: UpdateContentDto): Promise<Content> => {
    const response = await apiClient.patch(`/content/${id}`, contentData);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/content/${id}`);
  },
};
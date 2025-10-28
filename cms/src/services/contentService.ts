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
  PG_13 = 'PG-13',
  SIXTEEN_PLUS = '16+',
  EIGHTEEN_PLUS = '18+',
  R = 'R',
  NC_17 = 'NC-17',
}

export enum ContentStatus {
  DRAFT = 'draft',
  SCHEDULED = 'scheduled',
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
  videoUrl?: string;
  director?: string;
  producer?: string;
  writer?: string;
  studio?: string;
  countryOfOrigin?: string;
  tags?: string;
  isPremium: boolean;
  isFeatured: boolean;
  viewCount: number;
  likeCount: number;
  dislikeCount: number;
  ageRestriction?: number;
  subtitleLanguages?: string;
  audioLanguages?: string;
  videoQuality?: string;
  fileSizeMb?: number;
  contentWarning?: string;
  scheduledReleaseDate?: string;
  playerId?: number;
  providerId?: number;
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
  videoUrl?: string;
  director?: string;
  producer?: string;
  writer?: string;
  studio?: string;
  countryOfOrigin?: string;
  tags?: string;
  isPremium?: boolean;
  isFeatured?: boolean;
  ageRestriction?: number;
  subtitleLanguages?: string;
  audioLanguages?: string;
  videoQuality?: string;
  fileSizeMb?: number;
  contentWarning?: string;
  scheduledReleaseDate?: string;
  playerId?: number;
  providerId?: number;
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
  videoUrl?: string;
  director?: string;
  producer?: string;
  writer?: string;
  studio?: string;
  countryOfOrigin?: string;
  tags?: string;
  isPremium?: boolean;
  isFeatured?: boolean;
  ageRestriction?: number;
  subtitleLanguages?: string;
  audioLanguages?: string;
  videoQuality?: string;
  fileSizeMb?: number;
  contentWarning?: string;
  scheduledReleaseDate?: string;
  playerId?: number;
  providerId?: number;
  status?: ContentStatus;
}

export const contentService = {
  getAll: async (
    provider?: string,
    genre?: string,
    type?: string,
    status?: string
  ): Promise<Content[]> => {
    const params = new URLSearchParams();
    if (provider) params.append('provider', provider);
    if (genre) params.append('genre', genre);
    if (type) params.append('type', type);
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
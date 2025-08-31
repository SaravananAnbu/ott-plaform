import apiClient from './api';

// Genre Status Enum
export enum GenreStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  HIDDEN = 'hidden',
}

// Genre Type
export interface Genre {
  genreId: number;
  genreName: string;
  description?: string;
  colorCode?: string;
  iconUrl?: string;
  imageUrl?: string;
  keywords?: string[];
  isFeatured: boolean;
  sortOrder?: number;
  parentGenreId?: number;
  status: GenreStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateGenreDto {
  genreName: string;
  description?: string;
  colorCode?: string;
  iconUrl?: string;
  imageUrl?: string;
  keywords?: string[];
  isFeatured?: boolean;
  sortOrder?: number;
  parentGenreId?: number;
  status?: GenreStatus;
}

export interface UpdateGenreDto {
  genreName?: string;
  description?: string;
  colorCode?: string;
  iconUrl?: string;
  imageUrl?: string;
  keywords?: string[];
  isFeatured?: boolean;
  sortOrder?: number;
  parentGenreId?: number;
  status?: GenreStatus;
}

export const genreService = {
  getAll: async (): Promise<Genre[]> => {
    const response = await apiClient.get('/genres');
    return response.data;
  },

  getById: async (id: number): Promise<Genre> => {
    const response = await apiClient.get(`/genres/${id}`);
    return response.data;
  },

  create: async (genreData: CreateGenreDto): Promise<Genre> => {
    const response = await apiClient.post('/genres', genreData);
    return response.data;
  },

  update: async (id: number, genreData: UpdateGenreDto): Promise<Genre> => {
    const response = await apiClient.patch(`/genres/${id}`, genreData);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/genres/${id}`);
  },

  getByName: async (name: string): Promise<Genre> => {
    const response = await apiClient.get(`/genres/name/${name}`);
    return response.data;
  },
};
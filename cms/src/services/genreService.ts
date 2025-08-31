import apiClient from './api';

export interface Genre {
  genreId: number;
  name: string;
  description?: string;
  createdAt: string;
}

export interface CreateGenreDto {
  name: string;
  description?: string;
}

export interface UpdateGenreDto {
  name?: string;
  description?: string;
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
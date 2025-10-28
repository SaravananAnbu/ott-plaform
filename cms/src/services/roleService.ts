import apiClient from './api';

export enum PlatformPermission {
  // Content Management
  CONTENT_CREATE = 'content:create',
  CONTENT_READ = 'content:read',
  CONTENT_UPDATE = 'content:update',
  CONTENT_DELETE = 'content:delete',
  CONTENT_PUBLISH = 'content:publish',
  
  // User Management
  USER_CREATE = 'user:create',
  USER_READ = 'user:read',
  USER_UPDATE = 'user:update',
  USER_DELETE = 'user:delete',
  USER_SUSPEND = 'user:suspend',
  
  // Plan Management
  PLAN_CREATE = 'plan:create',
  PLAN_READ = 'plan:read',
  PLAN_UPDATE = 'plan:update',
  PLAN_DELETE = 'plan:delete',
  
  // Analytics
  ANALYTICS_READ = 'analytics:read',
  ANALYTICS_EXPORT = 'analytics:export',
  
  // System Administration
  SYSTEM_ADMIN = 'system:admin',
  ROLE_MANAGE = 'role:manage',
  SETTINGS_MANAGE = 'settings:manage',
}

export interface Role {
  roleId: number;
  name: string;
  description?: string;
  permissions: string[];
  isSystemRole: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRoleDto {
  name: string;
  description?: string;
  permissions?: string[];
  isSystemRole?: boolean;
  isActive?: boolean;
}

export interface UpdateRoleDto {
  name?: string;
  description?: string;
  permissions?: string[];
  isSystemRole?: boolean;
  isActive?: boolean;
}

export const roleService = {
  getAll: async (): Promise<Role[]> => {
    const response = await apiClient.get('/roles');
    return response.data;
  },

  getById: async (id: number): Promise<Role> => {
    const response = await apiClient.get(`/roles/${id}`);
    return response.data;
  },

  create: async (roleData: CreateRoleDto): Promise<Role> => {
    const response = await apiClient.post('/roles', roleData);
    return response.data;
  },

  update: async (id: number, roleData: UpdateRoleDto): Promise<Role> => {
    const response = await apiClient.patch(`/roles/${id}`, roleData);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/roles/${id}`);
  },

  getPermissions: async (): Promise<string[]> => {
    const response = await apiClient.get('/roles/permissions');
    return response.data;
  },
};

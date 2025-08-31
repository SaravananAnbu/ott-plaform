import React, { useState, useEffect } from 'react';

// Mock permission data - replace with actual auth service
export interface User {
  id: number;
  username: string;
  email: string;
  roleId: number;
  role?: {
    roleId: number;
    roleName: string;
    permissions: string[];
    isSystemRole: boolean;
  };
}

// Available permissions for the OTT platform
export enum Permission {
  // Content Management
  CONTENT_VIEW = 'content:view',
  CONTENT_CREATE = 'content:create',
  CONTENT_EDIT = 'content:edit',
  CONTENT_DELETE = 'content:delete',
  CONTENT_PUBLISH = 'content:publish',
  
  // Plan Management
  PLANS_VIEW = 'plans:view',
  PLANS_CREATE = 'plans:create',
  PLANS_EDIT = 'plans:edit',
  PLANS_DELETE = 'plans:delete',
  
  // Genre Management
  GENRES_VIEW = 'genres:view',
  GENRES_CREATE = 'genres:create',
  GENRES_EDIT = 'genres:edit',
  GENRES_DELETE = 'genres:delete',
  
  // Provider Management
  PROVIDERS_VIEW = 'providers:view',
  PROVIDERS_CREATE = 'providers:create',
  PROVIDERS_EDIT = 'providers:edit',
  PROVIDERS_DELETE = 'providers:delete',
  
  // User Management
  USERS_VIEW = 'users:view',
  USERS_CREATE = 'users:create',
  USERS_EDIT = 'users:edit',
  USERS_DELETE = 'users:delete',
  
  // Role Management
  ROLES_VIEW = 'roles:view',
  ROLES_CREATE = 'roles:create',
  ROLES_EDIT = 'roles:edit',
  ROLES_DELETE = 'roles:delete',
  
  // Platform User Management
  PLATFORM_USERS_VIEW = 'platform_users:view',
  PLATFORM_USERS_CREATE = 'platform_users:create',
  PLATFORM_USERS_EDIT = 'platform_users:edit',
  PLATFORM_USERS_DELETE = 'platform_users:delete',
  
  // System Administration
  ADMIN_FULL_ACCESS = 'admin:full_access',
  SYSTEM_SETTINGS = 'system:settings',
}

// Custom hook for permission management
export const usePermissions = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock user data - replace with actual authentication
    const mockUser: User = {
      id: 1,
      username: 'admin',
      email: 'admin@example.com',
      roleId: 1,
      role: {
        roleId: 1,
        roleName: 'Super Admin',
        permissions: Object.values(Permission),
        isSystemRole: true,
      },
    };
    
    setCurrentUser(mockUser);
    setLoading(false);
  }, []);

  const hasPermission = (permission: Permission): boolean => {
    if (!currentUser?.role) return false;
    
    // Super admin has all permissions
    if (currentUser.role.permissions.includes(Permission.ADMIN_FULL_ACCESS)) {
      return true;
    }
    
    return currentUser.role.permissions.includes(permission);
  };

  const hasAnyPermission = (permissions: Permission[]): boolean => {
    return permissions.some(permission => hasPermission(permission));
  };

  const hasAllPermissions = (permissions: Permission[]): boolean => {
    return permissions.every(permission => hasPermission(permission));
  };

  const canAccess = (module: string): boolean => {
    switch (module) {
      case 'content':
        return hasPermission(Permission.CONTENT_VIEW);
      case 'plans':
        return hasPermission(Permission.PLANS_VIEW);
      case 'genres':
        return hasPermission(Permission.GENRES_VIEW);
      case 'providers':
        return hasPermission(Permission.PROVIDERS_VIEW);
      case 'users':
        return hasPermission(Permission.USERS_VIEW);
      case 'roles':
        return hasPermission(Permission.ROLES_VIEW);
      case 'platform-users':
        return hasPermission(Permission.PLATFORM_USERS_VIEW);
      default:
        return false;
    }
  };

  const canCreate = (module: string): boolean => {
    switch (module) {
      case 'content':
        return hasPermission(Permission.CONTENT_CREATE);
      case 'plans':
        return hasPermission(Permission.PLANS_CREATE);
      case 'genres':
        return hasPermission(Permission.GENRES_CREATE);
      case 'providers':
        return hasPermission(Permission.PROVIDERS_CREATE);
      case 'users':
        return hasPermission(Permission.USERS_CREATE);
      case 'roles':
        return hasPermission(Permission.ROLES_CREATE);
      case 'platform-users':
        return hasPermission(Permission.PLATFORM_USERS_CREATE);
      default:
        return false;
    }
  };

  const canEdit = (module: string): boolean => {
    switch (module) {
      case 'content':
        return hasPermission(Permission.CONTENT_EDIT);
      case 'plans':
        return hasPermission(Permission.PLANS_EDIT);
      case 'genres':
        return hasPermission(Permission.GENRES_EDIT);
      case 'providers':
        return hasPermission(Permission.PROVIDERS_EDIT);
      case 'users':
        return hasPermission(Permission.USERS_EDIT);
      case 'roles':
        return hasPermission(Permission.ROLES_EDIT);
      case 'platform-users':
        return hasPermission(Permission.PLATFORM_USERS_EDIT);
      default:
        return false;
    }
  };

  const canDelete = (module: string): boolean => {
    switch (module) {
      case 'content':
        return hasPermission(Permission.CONTENT_DELETE);
      case 'plans':
        return hasPermission(Permission.PLANS_DELETE);
      case 'genres':
        return hasPermission(Permission.GENRES_DELETE);
      case 'providers':
        return hasPermission(Permission.PROVIDERS_DELETE);
      case 'users':
        return hasPermission(Permission.USERS_DELETE);
      case 'roles':
        return hasPermission(Permission.ROLES_DELETE);
      case 'platform-users':
        return hasPermission(Permission.PLATFORM_USERS_DELETE);
      default:
        return false;
    }
  };

  return {
    currentUser,
    loading,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    canAccess,
    canCreate,
    canEdit,
    canDelete,
  };
};

// Permission-based component wrapper
export const PermissionWrapper: React.FC<{
  permission: Permission | Permission[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}> = ({ permission, children, fallback = null }) => {
  const { hasPermission, hasAnyPermission } = usePermissions();
  
  const hasAccess = Array.isArray(permission)
    ? hasAnyPermission(permission)
    : hasPermission(permission);
  
  return hasAccess ? children : fallback;
};

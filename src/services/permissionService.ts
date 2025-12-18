import { apiService } from './api';

export interface Permission {
    id: string;
    name: string;
    displayName: string;
    module: string;
    action: string;
}

export interface UserPermissions {
    userId: string;
    fullName: string;
    role: string;
    effectivePermissions: string[];
    rolePermissions: string[];
    grantedPermissions: string[];
    revokedPermissions: string[];
}

export interface RolePermissions {
    roleId: string;
    roleName: string;
    permissions: string[];
    userCount: number;
}


export const permissionService = {
    // Get all available system permissions
    getAllPermissions: async () => {
        return apiService.get('/permission-management/get-all-permissions');
    },

    // Get user's current permissions
    getUserPermissions: async (userId: string) => {
        return apiService.get(`/permission-management/users/${userId}`);
    },

    // Update user permissions (grant/revoke)
    updateUserPermissions: async (userId: string, grantPermissions: string[], revokePermissions: string[]) => {
        return apiService.put(`/permission-management/users/${userId}`, {
            userId,
            grantPermissions,
            revokePermissions
        });
    },

    // Grant single permission to user
    grantUserPermission: async (userId: string, permissionName: string) => {
        return apiService.post(`/permission-management/users/${userId}/grant`, { permissionName });
    },

    // Revoke single permission from user
    revokeUserPermission: async (userId: string, permissionName: string) => {
        return apiService.post(`/permission-management/users/${userId}/revoke`, { permissionName });
    },

    // Reset user permissions to role defaults
    resetUserPermissions: async (userId: string) => {
        return apiService.post(`/permission-management/users/${userId}/reset`);
    },

    // Get role's permissions
    getRolePermissions: async (roleId: string) => {
        return apiService.get(`/permission-management/roles/${roleId}`);
    },

    // Update role permissions
    updateRolePermissions: async (roleId: string, permissionNames: string[]) => {
        return apiService.put(`/permission-management/roles/${roleId}`, {
            roleId,
            permissionNames
        });
    }
};

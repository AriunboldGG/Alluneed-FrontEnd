import { useContext } from 'react';
import { AuthContext } from '@/context/auth/authContext';
import { Api } from '@/service/api';
import { USE_MOCK_BACKEND, ROLE_PERMISSIONS } from '@/config/auth';

export const useAuth = () => {
    const { authState, authFunc } = Api();
    const context = useContext(AuthContext);

    // Check if user is authenticated
    const isAuthenticated = () => {
        return authState.isLoggedIn && authState.userToken;
    };

    // Check if user has specific role
    const hasRole = (requiredRole) => {
        if (!isAuthenticated()) return false;
        
        const userRole = authState.user?.role;
        if (!userRole) return false;

        // Role mapping
        const roleMap = {
            'influencer': ['influencer'],
            'agency': ['agency'],
            'marketer': ['marketer'],
            'admin': ['admin', 'agency', 'marketer', 'influencer'],
            'any': ['influencer', 'agency', 'marketer', 'admin']
        };

        const allowedRoles = roleMap[requiredRole] || [requiredRole];
        return allowedRoles.includes(userRole);
    };

    // Check if user has any of the specified roles
    const hasAnyRole = (roles) => {
        if (!isAuthenticated()) return false;
        
        const userRole = authState.user?.role;
        if (!userRole) return false;

        return roles.includes(userRole);
    };

    // Get current user data
    const getCurrentUser = () => {
        return authState.user;
    };

    // Get user token
    const getToken = () => {
        return authState.userToken;
    };

    // Logout function
    const logout = () => {
        authFunc.logOut();
    };

    // Check if user can access a specific page/feature
    const canAccess = (permission) => {
        if (!isAuthenticated()) return false;

        const userRole = authState.user?.role;
        if (!userRole) return false;

        // Get permissions for user's role
        const userPermissions = ROLE_PERMISSIONS[userRole] || [];
        
        // Check if user has the required permission
        return userPermissions.includes(permission);
    };

    // Redirect if not authenticated
    const requireAuth = (redirectTo = '/auth/signIn') => {
        if (!isAuthenticated()) {
            if (typeof window !== 'undefined') {
                window.location.href = redirectTo;
            }
            return false;
        }
        return true;
    };

    // Redirect if not authorized
    const requireRole = (role, redirectTo = '/auth/signIn') => {
        if (!hasRole(role)) {
            if (typeof window !== 'undefined') {
                window.location.href = redirectTo;
            }
            return false;
        }
        return true;
    };

    // Redirect if not authorized for permission
    const requirePermission = (permission, redirectTo = '/auth/signIn') => {
        if (!canAccess(permission)) {
            if (typeof window !== 'undefined') {
                window.location.href = redirectTo;
            }
            return false;
        }
        return true;
    };

    return {
        // State
        isAuthenticated: isAuthenticated(),
        user: getCurrentUser(),
        token: getToken(),
        isLoading: authState.isLoading,

        // Functions
        login: authFunc.signIn,
        logout,
        getUserData: authFunc.getUserData,

        // Authorization checks
        hasRole,
        hasAnyRole,
        canAccess,

        // Guards
        requireAuth,
        requireRole,
        requirePermission,

        // Backend flag
        isMockBackend: USE_MOCK_BACKEND
    };
}; 
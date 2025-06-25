'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

const ProtectedRoute = ({ 
    children, 
    requireAuth = false, 
    requiredRole = null, 
    requiredPermission = null,
    redirectTo = '/auth/signIn',
    fallback = null 
}) => {
    const { isAuthenticated, hasRole, canAccess, isLoading } = useAuth();
    const router = useRouter();
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        // If still loading, don't render anything yet
        if (isLoading) {
            return;
        }

        // Check authentication requirements
        if (requireAuth && !isAuthenticated) {
            router.push(redirectTo);
            return;
        }

        // Check role requirements
        if (requiredRole && !hasRole(requiredRole)) {
            router.push(redirectTo);
            return;
        }

        // Check permission requirements
        if (requiredPermission && !canAccess(requiredPermission)) {
            router.push(redirectTo);
            return;
        }

        // All checks passed, render the component
        setShouldRender(true);
    }, [isAuthenticated, hasRole, canAccess, isLoading, requireAuth, requiredRole, requiredPermission, redirectTo, router]);

    // Show loading state
    if (isLoading) {
        return fallback || (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    // Show fallback if not authorized
    if (!shouldRender) {
        return fallback || (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Хандах эрх байхгүй</h2>
                    <p className="text-gray-600">Та энэ хуудсанд хандах эрхгүй байна.</p>
                </div>
            </div>
        );
    }

    return children;
};

export default ProtectedRoute; 
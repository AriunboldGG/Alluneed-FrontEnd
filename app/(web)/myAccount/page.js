'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Api } from '@/service/api';
import { toast } from 'react-toastify';

const MyAccount = () => {
    const { user, isAuthenticated, logout, isMockBackend } = useAuth();
    const { authFunc } = Api();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (isAuthenticated) {
                    // Get user data from auth state or API
                    if (user) {
                        setUserData(user);
                    } else {
                        // Fetch from API if not in state
                        const response = await authFunc.GET('users/me', true);
                        if (response?.response_code === 200) {
                            setUserData(response.data);
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                toast.error('Хэрэглэгчийн мэдээлэл ачаалж чадсангүй');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [isAuthenticated, user, authFunc]);

    const handleLogout = () => {
        logout();
        toast.success('Амжилттай гарлаа');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <ProtectedRoute requireAuth={true} requiredPermission="view_my_account">
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white shadow rounded-lg">
                        {/* Header */}
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h1 className="text-2xl font-bold text-gray-900">Миний бүртгэл</h1>
                            {isMockBackend && (
                                <p className="text-sm text-yellow-600 mt-1">
                                    Mock backend ашиглаж байна
                                </p>
                            )}
                        </div>

                        {/* User Info */}
                        <div className="px-6 py-6">
                            {userData ? (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Нэр
                                            </label>
                                            <p className="mt-1 text-sm text-gray-900">{userData.name}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Имэйл
                                            </label>
                                            <p className="mt-1 text-sm text-gray-900">{userData.email}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Төрөл
                                            </label>
                                            <p className="mt-1 text-sm text-gray-900">
                                                {userData.role === 'influencer' && 'Influencer'}
                                                {userData.role === 'agency' && 'Agency'}
                                                {userData.role === 'marketer' && 'Marketer'}
                                                {userData.role === 'admin' && 'Admin'}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Бүртгүүлсэн огноо
                                            </label>
                                            <p className="mt-1 text-sm text-gray-900">
                                                {new Date().toLocaleDateString('mn-MN')}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                                        <button
                                            onClick={() => {/* Edit profile functionality */}}
                                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Мэдээлэл засах
                                        </button>
                                        <button
                                            onClick={handleLogout}
                                            className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Гарах
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-gray-500">Хэрэглэгчийн мэдээлэл олдсонгүй</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default MyAccount;

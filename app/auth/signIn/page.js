'use client';
//react
import { useState, useContext } from 'react';
//next
import Link from 'next/link';
import { useRouter } from 'next/navigation';
//route
import route from '@/route';
import * as Yup from 'yup';
import axios from 'axios';
import { BASE_URL } from '@/service/path';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
//context
import { AuthContext } from '@/context/auth/authContext';
import { toast } from 'react-toastify';
import { Api } from '@/service/api';
import { mockAuth } from '@/service/mockAuth';
import Image from 'next/image';
import { USE_MOCK_BACKEND, MOCK_USERS } from '@/config/auth';

const roles = [
    { id: '1', name: 'Influencer' },
    { id: '2', name: 'Байгууллага' },
    { id: '3', name: 'Marketer' },
];

const SignIn = () => {
    const router = useRouter();
    const { authFunc } = Api();
    const [activeRole, setActiveRole] = useState('1');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const LoginSchema = Yup.object().shape({
        email: Yup.string().required('Нэвтрэх нэрээ оруулна уу!'),
        password: Yup.string().required('Нууц үгээ оруулна уу!'),
    });

    const defaultValues = { email: '', password: '' };

    const methods = useForm({ resolver: yupResolver(LoginSchema), defaultValues });
    const {
        reset,
        setError,
        handleSubmit,
        control,
        register,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = methods;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (USE_MOCK_BACKEND) {
                // Use mock authentication
                const response = await mockAuth.login(formData.email, formData.password);
                
                if (response.response_code === 200) {
                    authFunc.signIn(response.token);
                    toast.success('Амжилттай нэвтэрлээ!');
                    router.push('/home');
                } else {
                    toast.error(response.response_msg || 'Нэвтрэх нэр эсвэл нууц үг буруу байна');
                }
            } else {
                // Use real backend
                const response = await authFunc.POST('auth/login', false, formData);
                
                if (response?.response_code === 200) {
                    authFunc.signIn(response?.token);
                    toast.success('Амжилттай нэвтэрлээ!');
                    router.push('/home');
                } else {
                    toast.error(response?.response_msg || 'Нэвтрэх нэр эсвэл нууц үг буруу байна');
                }
            }
        } catch (error) {
            console.error('Login error:', error);
            toast.error('Нэвтрэх нэр эсвэл нууц үг буруу байна');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <div className="mx-auto h-12 w-12 flex items-center justify-center">
                        <Image
                            src="/assets/icons/mainLogo.svg"
                            alt="Logo"
                            width={48}
                            height={48}
                            className="h-12 w-auto"
                        />
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Нэвтрэх
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={onSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email" className="sr-only">
                                Имэйл
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Имэйл"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Нууц үг
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Нууц үг"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        >
                            {loading ? 'Нэвтэрч байна...' : 'Нэвтрэх'}
                        </button>
                    </div>

                    <div className="text-center">
                        <a
                            href="/signUp"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            Бүртгэл байхгүй юу? Бүртгүүлэх
                        </a>
                    </div>
                </form>

                {USE_MOCK_BACKEND && (
                    <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                        <h3 className="text-sm font-medium text-yellow-800">Mock Authentication Active</h3>
                        <p className="text-sm text-yellow-700 mt-1">
                            Using mock backend. Test accounts:
                        </p>
                        <ul className="text-xs text-yellow-600 mt-2 space-y-1">
                            <li>• {MOCK_USERS.INFLUENCER.email} / {MOCK_USERS.INFLUENCER.password} (Influencer)</li>
                            <li>• {MOCK_USERS.AGENCY.email} / {MOCK_USERS.AGENCY.password} (Agency)</li>
                            <li>• {MOCK_USERS.MARKETER.email} / {MOCK_USERS.MARKETER.password} (Marketer)</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SignIn;

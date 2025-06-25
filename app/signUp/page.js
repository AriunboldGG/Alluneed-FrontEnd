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
    { id: '2', name: 'Agency' },
    { id: '3', name: 'Marketer' },
];

const SignUp = () => {
    const router = useRouter();
    const { authFunc } = Api();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role_id: '1'
    });
    const [loading, setLoading] = useState(false);

    const SignUpSchema = Yup.object().shape({
        name: Yup.string().required('Нэрээ оруулна уу!'),
        email: Yup.string().email('Имэйл хаяг буруу байна!').required('Имэйл хаягаа оруулна уу!'),
        password: Yup.string().min(6, 'Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой!').required('Нууц үгээ оруулна уу!'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Нууц үгнүүд таарахгүй байна!')
            .required('Нууц үгээ давтаж оруулна уу!'),
    });

    const defaultValues = { name: '', email: '', password: '', confirmPassword: '' };

    const methods = useForm({ resolver: yupResolver(SignUpSchema), defaultValues });
    const {
        reset,
        setError,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
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

        // Validation
        if (formData.password !== formData.confirmPassword) {
            toast.error('Нууц үгнүүд таарахгүй байна');
            setLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            toast.error('Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой');
            setLoading(false);
            return;
        }

        try {
            if (USE_MOCK_BACKEND) {
                // Use mock authentication
                const response = await mockAuth.register(
                    formData.name,
                    formData.email,
                    formData.password,
                    parseInt(formData.role_id)
                );
                
                if (response.response_code === 200) {
                    authFunc.signIn(response.token);
                    toast.success('Амжилттай бүртгэгдлээ!');
                    router.push('/home');
                } else {
                    toast.error(response.response_msg || 'Бүртгэл үүсгэхэд алдаа гарлаа');
                }
            } else {
                // Use real backend
                const response = await authFunc.POST('auth/register', false, {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    role_id: parseInt(formData.role_id)
                });
                
                if (response?.response_code === 200) {
                    authFunc.signIn(response?.token);
                    toast.success('Амжилттай бүртгэгдлээ!');
                    router.push('/home');
                } else {
                    toast.error(response?.response_msg || 'Бүртгэл үүсгэхэд алдаа гарлаа');
                }
            }
        } catch (error) {
            console.error('Registration error:', error);
            toast.error('Бүртгэл үүсгэхэд алдаа гарлаа');
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
                        Бүртгүүлэх
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={onSubmit}>
                    <div className="space-y-4">
                        {/* Role Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Таны төрөл
                            </label>
                            <div className="flex gap-2">
                                {roles.map((role) => (
                                    <button
                                        key={role.id}
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, role_id: role.id }))}
                                        className={`flex-1 py-2 px-3 text-sm font-medium rounded-md border ${
                                            formData.role_id === role.id
                                                ? 'bg-indigo-600 text-white border-indigo-600'
                                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                        }`}
                                    >
                                        {role.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Нэр
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Нэрээ оруулна уу"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Имэйл
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Имэйл хаягаа оруулна уу"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Нууц үг
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Нууц үгээ оруулна уу"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                Нууц үг давтах
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Нууц үгээ дахин оруулна уу"
                                value={formData.confirmPassword}
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
                            {loading ? 'Бүртгэж байна...' : 'Бүртгүүлэх'}
                        </button>
                    </div>

                    <div className="text-center">
                        <a
                            href="/auth/signIn"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            Бүртгэлтэй юу? Нэвтрэх
                        </a>
                    </div>
                </form>

                {USE_MOCK_BACKEND && (
                    <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                        <h3 className="text-sm font-medium text-yellow-800">Mock Authentication Active</h3>
                        <p className="text-sm text-yellow-700 mt-1">
                            Using mock backend. You can create new accounts or use existing ones:
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

export default SignUp;

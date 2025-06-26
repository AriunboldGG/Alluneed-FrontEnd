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
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

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

    // Social login handler (placeholder)
    const handleSocialLogin = (provider) => {
        toast.info(`${provider} нэвтрэх удахгүй!`);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">
                <Card className="overflow-hidden">
                    <CardContent className="grid p-0 md:grid-cols-2">
                        <form className="p-6 md:p-8 flex flex-col gap-6 w-full" onSubmit={onSubmit}>
                            <div className="flex flex-col items-center text-center">
                                
                                <h2 className="mt-6 text-2xl font-bold">Нэвтрэх</h2>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Имэйл</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    placeholder="Имэйл"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Нууц үг</Label>
                                    {/* You can add a forgot password link here if needed */}
                                </div>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    placeholder="Нууц үг"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? 'Нэвтэрч байна...' : 'Нэвтрэх'}
                            </Button>
                            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                                    Сошиал хаягаар нэвтрэх
                                </span>
                            </div>
                            <div className="grid grid-cols-1 gap-3">
                                <Button variant="outline" className="w-full flex items-center gap-2 justify-center" onClick={() => handleSocialLogin('Google')}> 
                                    {/* Google SVG */}
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="#4285F4" d="M21.805 10.023h-9.765v3.977h5.617c-.242 1.242-1.469 3.648-5.617 3.648-3.375 0-6.125-2.789-6.125-6.148s2.75-6.148 6.125-6.148c1.922 0 3.211.82 3.953 1.523l2.703-2.633c-1.711-1.57-3.922-2.523-6.656-2.523-5.523 0-10 4.477-10 10s4.477 10 10 10c5.75 0 9.563-4.031 9.563-9.719 0-.656-.07-1.148-.156-1.629z"/><path fill="#34A853" d="M3.545 7.548l3.086 2.266c.844-1.609 2.391-2.773 4.164-2.773 1.133 0 2.148.391 2.953 1.031l2.211-2.148c-1.336-1.242-3.047-2.024-5.164-2.024-3.977 0-7.211 3.234-7.211 7.211 0 1.133.258 2.203.711 3.148z"/><path fill="#FBBC05" d="M12 22c2.484 0 4.57-.82 6.094-2.227l-2.812-2.297c-.789.531-1.797.844-3.281.844-2.523 0-4.664-1.703-5.43-4.008h-3.086v2.523c1.523 3.008 4.672 5.165 8.515 5.165z"/><path fill="#EA4335" d="M21.805 10.023h-9.765v3.977h5.617c-.242 1.242-1.469 3.648-5.617 3.648-3.375 0-6.125-2.789-6.125-6.148s2.75-6.148 6.125-6.148c1.922 0 3.211.82 3.953 1.523l2.703-2.633c-1.711-1.57-3.922-2.523-6.656-2.523-5.523 0-10 4.477-10 10s4.477 10 10 10c5.75 0 9.563-4.031 9.563-9.719 0-.656-.07-1.148-.156-1.629z"/></svg>
                                    Google-р нэвтрэх
                                </Button>
                                <Button variant="outline" className="w-full flex items-center gap-2 justify-center" onClick={() => handleSocialLogin('Facebook')}>
                                    {/* Facebook SVG */}
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="#1877F3" d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 6.006 4.388 10.983 10.125 11.854v-8.385H7.078v-3.47h3.047V9.413c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.513c-1.491 0-1.953.926-1.953 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.056 24 18.079 24 12.073z"/></svg>
                                    Facebook-р нэвтрэх
                                </Button>
                            </div>
                            <div className="text-center text-sm">
                                Бүртгэл байхгүй юу?{' '}
                                <a href="/signUp" className="underline underline-offset-4">Бүртгүүлэх</a>
                            </div>
                        </form>
                        <div className="relative hidden bg-muted md:block">
                            <img
                                src="../../assets/photo/login.png"
                                alt="Image"
                                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
                        </div>
                    </CardContent>
                </Card>
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

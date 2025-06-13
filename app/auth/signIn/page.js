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

const roles = [
    { id: '1', name: 'Influencer' },
    { id: '2', name: 'Байгууллага' },
    { id: '3', name: 'Marketer' },
];

const Page = () => {
    const [activeRole, setActiveRole] = useState('1');
    const router = useRouter();
    const {
        authFunc: { signIn },
    } = useContext(AuthContext);

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
    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`${BASE_URL}/auth/login`, { email: data?.email, password: data?.password });
            if (response?.data?.token) {
                console.log('token' , response?.data?.token);
                signIn(response?.data?.token);
                router.push(route.home);
                toast('Амжилттай нэвтэрлээ', {
                    position: 'top-right',
                    autoClose: 1000,
                    type: 'success',
                });
            } else {
                reset();
                setError('afterSubmit', { message: response?.data?.response_msg });

                toast(response?.data?.response_msg, {
                    position: 'top-right',
                    autoClose: 1000,
                    type: 'warning',
                });
            }
        } catch (error) {
            reset();
            setError('afterSubmit', { ...error, message: error.response?.data?.response_msg || 'Алдаа гарлаа.Дахин оролдоно уу' });
            toast(response?.data?.response_msg || 'Алдаа гарлаа.Дахин оролдоно уу', {
                position: 'top-right',
                autoClose: 1000,
                type: 'warning',
            });
        }
    };

    return (
        <FormProvider {...methods}>
            <div className='flex max-md:flex-col-reverse max-md:overflow-hidden h-[100vh]'>
                <div className='w-[46%] flex relative items-center h-[100%] max-lg:w-[62%] max-md:w-[100%] max-md:flex-col'>
                    <div className={`top-[32px] left-[32px] absolute max-md:top-[0] max-md:left-[16px] max-md:relative max-md:self-stretch`}>
                        <img
                            src='/assets/icons/mainLogo.svg'
                            alt='logo'
                            width={154}
                            className='cursor-pointer'
                            onClick={() => {
                                router.push(route.home);
                            }}
                        />
                    </div>

                    <div className='flex w-[100%] items-center justify-center h-[100%] max-md:px-[16px] max-md:mt-[24px]  max-md:items-start'>
                        <div className='p-[20px] w-[70%] flex flex-col gap-[24px] border-[1px] border-[solid] border-[#EAECF0] rounded-[8px] max-md:p-[0px] max-md:border-[0px] max-md:w-[100%]'>
                            <div className='w-[100%]'>
                                <p className='text-[24px] mb-[12px] font-[600] leading-[28px] tracking-[-0.48px]'>Нэвтрэх</p>
                                <p className='text-[14px] font-[400] leading-[24px]'>Нэвтрэх мэдээллээ оруулна уу.</p>
                            </div>
                            <div className='flex flex-col gap-[24px]'>
                                <div className='h-[44px] p-[4px] flex gap-[8px] rounded-[8px] border-[1px]  border-[#F2F4F7] border-[solid] bg-[#F9FAFB] max-w-[100%]'>
                                    {roles.map((role) => (
                                        <div
                                            key={role.id}
                                            className={`flex items-center px-[8px] py-[8px] cursor-pointer hover:bg-[#FFF] ${
                                                activeRole === role.id && 'shadow-sm rounded-[6px] bg-[#FFF]'
                                            }`}
                                            onClick={() => {
                                                setActiveRole(role.id);
                                            }}
                                        >
                                            <p className='text-[14px] font-[600] leading-[20px]'>{role.name}</p>
                                        </div>
                                    ))}
                                </div>

                                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-[20px] w-[100%]'>
                                    <div>
                                        <p className='text-[#344054] font-[500] leading-[20px] mb-[6px]'>Имэйл</p>
                                        <Controller
                                            name='email'
                                            control={control}
                                            defaultValue=''
                                            render={({ field }) => (
                                                <>
                                                    <input
                                                        {...field}
                                                        placeholder='Имэйл хаягаа оруулна уу'
                                                        className='rounded-[8px] border-[#D0D5DD] border-[1px] border-[solid] w-[100%] h-[44px] pl-[14px] py-[10px]'
                                                    />
                                                    <p className='text-[14px] text-[red] mt-1'>{errors.email?.message}</p>
                                                </>
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <p className='text-[#344054] font-[500] leading-[20px] mb-[6px]' {...register('password')}>
                                            Нууц үг
                                        </p>
                                        <Controller
                                            name='password'
                                            control={control}
                                            defaultValue=''
                                            render={({ field }) => (
                                                <>
                                                    <input
                                                        {...field}
                                                        placeholder='Нууц үгээ оруулна уу'
                                                        className='rounded-[8px] border-[#D0D5DD] border-[1px] border-[solid] w-[100%] h-[44px] pl-[14px] py-[10px]'
                                                    />
                                                    <p className='text-[14px] text-[red] mt-1'>{errors.email?.message}</p>
                                                </>
                                            )}
                                        />
                                    </div>
                                    <div className='flex justify-between'>
                                        <div className='flex items-center justify-center gap-[8px]'>
                                            <input type='checkbox' />
                                            <p className='text-[#26003B] text-[14px] leading-[20px] font-[500] py-[2px]'>30 хоногийн турш сана</p>
                                        </div>

                                        <Link href={''} className='text-[#8557F4] text-[14px] leading-[20px] font-[600] py-[2px] hover:underline'>
                                            Нууц үг мартсан
                                        </Link>
                                    </div>
                                    <button
                                        className='py-[10px] px-[18px] bg-[#FD3D80] text-center shadow-sm text-[16px] font-[600] text-[#FFF] leading-[24px] hover:bg-[#f6f2f2] hover:text-[#FD3D80]'
                                        type='submit'
                                    >
                                        Нэвтрэх
                                    </button>
                                </form>
                            </div>
                            <div className='flex gap-[4px] justify-center'>
                                <p className='text-[#475467] text-[14px] font-[400] leading-[24px]'>Бүртгэлгүй юу?</p>
                                <Link href={route.signUp} className='text-[14px] font-[600] leading-[20px] text-[#8557F4]'>
                                    Бүртгүүлэх
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='bottom-[32px] left-[32px] absolute max-md:hidden'>
                        <p className='text-[14px] font-[400] leading-[20px]'>Бүх эрх хуулиар хамгаалагдсан © 2025.</p>
                    </div>
                </div>
                <div className='w-[54%] max-lg:w-[38%] max-md:w-[100%] max-md:pb-[40px] '>
                    <img
                        src={'/assets/photo/login.png'}
                        alt='Login'
                        style={{ objectFit: 'cover', height: '100%', width: '100%', objectPosition: '50% 0%' }}
                    />
                </div>
            </div>
        </FormProvider>
    );
};
export default Page;

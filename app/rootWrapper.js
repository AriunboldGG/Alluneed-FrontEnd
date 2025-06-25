'use client';
// context
import { AuthContext } from '@/context/auth/authContext';
import { Api } from '@/service/api';
import { NextUIProvider } from '@nextui-org/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingScreen from './Loading';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Chatbot from '@/components/Chatbot';

export default function ParentWrapper({ children }) {
    const { authFunc, authState, authDispatch } = Api();
    const [loading, setLoading] = useState(true);
    const path = usePathname();
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [path]);
    return (
        <NextUIProvider>
            <AuthContext.Provider value={{ authFunc, authState, authDispatch }}>
                {loading ? (
                    <LoadingScreen />
                ) : (
                    <>
                        {children}
                        <ToastContainer />
                        <Chatbot />
                    </>
                )}
            </AuthContext.Provider>
        </NextUIProvider>
    );
}

'use client';
// react
import { useEffect } from 'react';
// next
import { useRouter } from 'next/navigation';
import route from '@/route';

const Page = () => {
    const router = useRouter();
    useEffect(() => {
        router.push(route.home);
    }, []);
};
export default Page;

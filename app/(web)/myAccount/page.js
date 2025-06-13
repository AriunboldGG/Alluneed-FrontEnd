'use client';
import { useState } from 'react';
import MyAccountLayout from '@/module/myAccount/layout/main';
import Hero from '@/components/Hero';
import Tabs from '@/module/myAccount/template/Index';
import Dashboard from '@/module/myAccount/template/dashboard';

const TabsArray = [
    { title: 'Dashboard', content: <Dashboard /> },
    { title: 'Orders', content: <Hero /> },
    { title: 'Account details', content: <Hero /> },
    { title: 'My Event', content: <Hero /> },
    { title: 'Log out', content: <Hero /> },
];

const Page = () => {
    const [selected, setSelected] = useState({ title: 'Dashboard', content: <Dashboard /> });

    return (
        <>
            <div className='relative'>
                <Hero imageUrl={'/assets/photo/campaings.png'} />
                <div className='absolute top-[50%] left-[20%]'>
                    <p className='text-[36px] font-[700] leading-[40px] tracking-[-1.44px] text-[#FFF]'>My account</p>
                </div>
            </div>
            <MyAccountLayout>
                <div className='flex space-x-[10%]'>
                    <Tabs TabsArray={TabsArray} setSelected={setSelected} selected={selected} />
                    <div className='w-full'>{selected?.content}</div>
                </div>
            </MyAccountLayout>
        </>
    );
};
export default Page;

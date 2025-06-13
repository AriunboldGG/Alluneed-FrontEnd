'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import NewsLayout from '@/module/news/layout/main';
import Hero from '@/components/Hero';
import BlogBlock from '@/components/BlogBlock/Index';
import Dropdown from '@/components/Dropdown/index';
import route from '@/route';
import { Pagination } from '@nextui-org/react';

let filterArray = [
    { id: 1, value: '4', label: 'Бүгд' },
    { id: 2, value: '1', label: 'Маркетинг' },
    { id: 3, value: '2', label: 'Дизайн' },
    { id: 4, value: '3', label: 'Сошиал медиа' },
];

let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];

const Index = () => {
    const [activeRole, setActiveRole] = useState(1);
    const [selectedOption, setSelectedOption] = useState('');

    const handleDropdownChange = (event) => {
        setSelectedOption(event.target.value);
    };
    const router = useRouter();

    return (
        <>
            <div className='relative'>
                <Hero imageUrl={'/assets/photo/blogs.png'} />
                <div className='absolute top-[40%] left-[20%]'>
                    <p className='text-[12px] font-[500] leading-[18px] text-[#8557F4] mb-[12px]'>Marketers</p>
                    <p className='text-[36px] font-[500] leading-[40px] tracking-[-1.44px] text-[#050514] mb-[24px]'>
                        Hottest <span className='text-[36px] font-[700] leading-[40px] tracking-[-1.44px] text-[#050514]'>Marketers</span>
                    </p>
                    <p className='text-[16px] font-[400] leading-[28px] text-[#475467]'>
                        Хамгийн сүүлийн үеийн салбарын мэдээ, ярилцлага, технологи, нөөц.
                    </p>
                </div>
            </div>
            <NewsLayout>
                <div className='flex items-center justify-between'>
                    <div className='w-[100%]'>
                        <div className='flex justify-start gap-[16px]'>
                            {filterArray?.map((i) => {
                                return (
                                    <div
                                        key={i.id}
                                        className={`hover:text-[#FD3D80] cursor-pointer ${
                                            activeRole === i.id && 'border-[solid] border-b-[2px] border-[#FD3D80] text-[#FD3D80]'
                                        }`}
                                        onClick={() => {
                                            setActiveRole(i.id);
                                        }}
                                    >
                                        <p className='p-[4px] text-[16px] font-[500] leading-[24px]'>{i?.label}</p>
                                    </div>
                                );
                            })}
                        </div>
                        <div className='border-[#EAECF0] border-[0.5px] border-[solid] w-[80%]' />
                    </div>
                    <div className='flex items-end justify-start'>
                        <Dropdown selectedOption={selectedOption} handler={handleDropdownChange} />
                    </div>
                </div>
                <div className='flex flex-wrap w-[100%] gap-x-[32px] gap-y-[40px] mt-[40px] justify-center'>
                    {arr?.map((i) => {
                        return (
                            <div className='w-[31.42%] shadow-md hover:shadow-xl' key={i} onClick={() => router.push(`${route.marketers}/${1}`)}>
                                <BlogBlock />
                            </div>
                        );
                    })}
                    <Pagination isCompact showControls total={100} initialPage={1} variant='light' size='lg' color='primary' />
                </div>
            </NewsLayout>
        </>
    );
};
export default Index;

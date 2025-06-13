'use client';
import HomeLayout from '@/module/home/layout/main';
import Discount from '@/module/home/template/discount';
import TopAgency from '@/module/home/template/topAgency';
import Influencers from '@/module/home/template/influencers';
import Works from '@/module/home/template/works';
import Blogs from '@/module/home/template/blogs';
import Hottest from '@/module/home/template/hottest/index';
import Hero from '@/components/Hero';
import Chatbot from '@/components/Chatbot';

const Home = () => {
    return (
        <>
            <Hero />
            <HomeLayout>
                <h1 className='text-[34px] text-[#000] font-[400] text-center my-[40px] leading-[44px] tracking-[-0.64px]'>
                    Онцгой <span className='text-[34px] text-[#000] font-[700] text-center  leading-[44px] tracking-[-0.64px]'>урамшууллууд</span>
                </h1>
                <Discount />
                <TopAgency />
                <Influencers />
                <Works />
                <div className='relative w-[99vw] top-[-123px]'>
                    <Hottest />
                </div>
                <div className='mb-[100px]'>
                    <Blogs />
                </div>
                <Chatbot />
            </HomeLayout>
        </>
    );
};

export default Home;

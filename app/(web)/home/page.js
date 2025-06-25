'use client';
import HomeLayout from '@/module/home/layout/main';
import Discount from '@/module/home/template/discount';
import TopAgency from '@/module/home/template/topAgency';
import Influencers from '@/module/home/template/influencers';
import Works from '@/module/home/template/works';
import Blogs from '@/module/home/template/blogs';
import Hottest from '@/module/home/template/hottest';
import Hero from '@/components/Hero';
import Chatbot from '@/components/Chatbot';

const Home = () => {
    return (
        <>
            {/* Hero Section - now truly full width */}
            <Hero />

            <div className="w-full flex flex-col items-center bg-[#fafbfc]">
                {/* Discount/Featured Campaigns Section */}
                <section className="w-full max-w-screen-xl mx-auto px-4 md:px-8 mt-[-60px] z-10 relative">
                    <h2 className="text-[32px] md:text-[40px] font-bold text-center mb-8 leading-tight">
                        Онцлох <span className="font-extrabold">урамшууллууд</span>
                    </h2>
                    <Discount />
                </section>

                {/* Top Agencies Section */}
                <section className="w-full max-w-screen-xl mx-auto px-4 md:px-8 mt-12">
                    <TopAgency />
                </section>

                {/* Hottest Influencers Section */}
                <section className="w-full bg-[#0B0B23] py-16 mt-12">
                    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                        <Influencers />
                    </div>
                </section>

                {/* Hottest Campaigns Section */}
                <section className="w-full max-w-screen-xl mx-auto px-4 md:px-8 mt-12">
                    <Works />
                </section>

                {/* Hottest Channels & Marketers Section */}
                {/* <section className="w-full bg-[#0B0B23] py-16 mt-12">
                    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                        <Hottest />
                    </div>
                </section> */}

                {/* Hottest Blogs/Articles Section */}
                <section className="w-full max-w-screen-xl mx-auto px-4 md:px-8 mt-12 mb-16">
                    <Blogs />
                </section>

                {/* Chatbot (optional, can be moved or styled as needed) */}
                <Chatbot />
            </div>
        </>
    );
};

export default Home;

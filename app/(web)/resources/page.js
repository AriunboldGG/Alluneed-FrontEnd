'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import NewsLayout from '@/module/news/layout/main';
import BlogBlock from '@/components/BlogBlock/Index';
import Dropdown from '@/components/Dropdown/index';
import route from '@/route';
import { Pagination } from '@nextui-org/react';
import axios from 'axios';
import { BASE_URL } from '@/service/path';

const mockResources = [
  {
    id: 1,
    name: 'Маркетингийн Тренд 2024',
    description: '2024 оны Монголын маркетингийн гол чиг хандлага, шинэ технологи, хэрэглэгчийн зан төлөвийн өөрчлөлт.',
    image: '/assets/photo/Blog.png',
    type: { name: 'Тренд' },
  },
  {
    id: 2,
    name: 'Дижитал Маркетингийн Гарын авлага',
    description: 'Дижитал маркетингийн суурь ойлголт, хэрэгжүүлэх алхам, хэрэгтэй хэрэгслүүдийн жагсаалт.',
    image: '/assets/photo/download.png',
    type: { name: 'Гарын авлага' },
  },
  {
    id: 3,
    name: 'Контент Маркетингийн Жишээ',
    description: 'Монголын шилдэг контент маркетингийн кейс судалгаа, амжилтын түүхүүд.',
    image: '/assets/photo/hottest.png',
    type: { name: 'Кейс' },
  },
];

const Index = () => {
  return (
    <>
      {/* Full-width Resources Page Header */}
      <div className="relative w-full h-[260px] md:h-[340px] overflow-hidden flex items-center">
        <img
          src="/assets/photo/Blog.png"
          alt="Resources Header Background"
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        />
        <div className="relative z-10 pl-8 md:pl-32 flex-1">
          <p className="text-[#8557F4] text-sm font-medium mb-3">Resources</p>
          <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">Top Marketing Resources</h1>
          <p className="text-[#EAECF0] text-base md:text-lg">
            Монголын маркетингийн салбарын шилдэг 3 нөөц, гарын авлага, тренд.
          </p>
        </div>
      </div>
      <div className='grid grid-rows-2 grid-cols-4 gap-10 w-[100%] gap-x-[32px] gap-y-[40px] mt-[40px] justify-center ax-md:grid-rows-4 max-md:grid-cols-2 max-md:w-[98%] max-sm:grid-rows-8 max-sm:grid-cols-1 items-center'>
        {mockResources.map((i) => (
          <div
            className='shadow-md hover:shadow-xl'
            key={i.id}
          >
            <BlogBlock i={i} />
          </div>
        ))}
      </div>
    </>
  );
};
export default Index;

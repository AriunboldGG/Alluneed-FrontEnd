'use client';
//react
import { useEffect, useState } from 'react';
//components
import Dropdown from '@/components/Dropdown/index';
import Hero from '@/components/Hero';
import AgencyList from '@/module/agency/template/agency';
//layout
import AgencyLayout from '@/module/agency/layout/main';
import axios from 'axios';
import { BASE_URL } from '@/service/path';

const mockAgencies = {
  data: [
    {
      ID: 1,
      name: 'Болд Маркетинг',
      city: 'Улаанбаатар',
      description: 'Монголын тэргүүлэгч бүтээлч маркетингийн агентлаг. Брэнд хөгжүүлэлт, сурталчилгаа, стратеги, бүтээлч шийдэл.',
      image: { file_name: 'agency.png' },
    },
    {
      ID: 2,
      name: 'Идеа Воркшоп',
      city: 'Улаанбаатар',
      description: 'Шинэлэг санаа, бүтээлч шийдлээрээ алдартай маркетингийн агентлаг.',
      image: { file_name: 'agency2.PNG' },
    },
    {
      ID: 3,
      name: 'Эй Ай Тийм',
      city: 'Дархан',
      description: 'Дижитал маркетинг, сошиал медиа, контент бүтээлтээр мэргэшсэн агентлаг.',
      image: { file_name: 'aitheme1.png' },
    },
    {
      ID: 4,
      name: 'Сэйлс Хаус',
      city: 'Эрдэнэт',
      description: 'Борлуулалт, сурталчилгааны цогц үйлчилгээ үзүүлэгч агентлаг.',
      image: { file_name: 'sale1.png' },
    },
    {
      ID: 5,
      name: 'Трэйд Маркетинг',
      city: 'Улаанбаатар',
      description: 'Зах зээлийн судалгаа, стратеги төлөвлөлт, идэвхжүүлэлтийн агентлаг.',
      image: { file_name: 'trade1.png' },
    },
  ],
  pagination: { total_pages: 1 },
};

const Agency = () => {
  return (
    <>
      {/* Full-width Agency Page Header */}
      <div className="relative w-full h-[260px] md:h-[340px] overflow-hidden flex items-center">
        <img
          src="/assets/svg/Header section.svg"
          alt="Agency Header Background"
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        />
        <div className="relative z-10 pl-8 md:pl-32 flex-1">
          <p className="text-[#8557F4] text-sm font-medium mb-3">Agencies</p>
          <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">Top Marketing Agencies</h1>
          <p className="text-[#EAECF0] text-base md:text-lg">
            Монголын тэргүүлэгч маркетингийн агентлагуудын жагсаалт.
          </p>
        </div>
      </div>
      <AgencyLayout>
        <AgencyList data={mockAgencies} />
      </AgencyLayout>
    </>
  );
};

export default Agency;

'use client';
import { useEffect, useState } from 'react';
import CampaignsLayout from '@/module/campaigns/layout/main';
import Hero from '@/components/Hero';
import Works from '@/module/campaigns/template/campaign';
import axios from 'axios';
import { BASE_URL } from '@/service/path';

const mockCampaigns = {
  data: [
    {
      id: 1,
      title: 'MCS Coca-Cola Summer Campaign',
      created_at: '2024-06-01',
      image: { file_name: 'campaings.png' },
    },
    {
      id: 2,
      title: 'Unitel NextGen Digital Launch',
      created_at: '2024-05-15',
      image: { file_name: 'Blog.png' },
    },
    {
      id: 3,
      title: 'G-Mobile Brand Awareness',
      created_at: '2024-04-20',
      image: { file_name: 'hottest.png' },
    },
  ],
  pagination: { total_pages: 1 },
};

const Campaigns = () => {
  return (
    <>
      {/* Full-width Campaigns Page Header */}
      <div className="relative w-full h-[260px] md:h-[340px] overflow-hidden flex items-center">
        <img
          src="/assets/photo/campaings.png"
          alt="Campaigns Header Background"
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        />
        <div className="relative z-10 pl-8 md:pl-32 flex-1">
          <p className="text-[#8557F4] text-sm font-medium mb-3">Campaigns</p>
          <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">Top Marketing Campaigns</h1>
          <p className="text-[#EAECF0] text-base md:text-lg">
            Монголын шилдэг маркетингийн 3 кампанит ажлын жагсаалт.
          </p>
        </div>
      </div>
      <CampaignsLayout>
        <Works data={mockCampaigns} setPage={() => {}} page={1} />
      </CampaignsLayout>
    </>
  );
};
export default Campaigns;

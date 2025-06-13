'use client';
import { useEffect, useState } from 'react';
import CampaignsLayout from '@/module/campaigns/layout/main';
import Hero from '@/components/Hero';
import Works from '@/module/campaigns/template/campaign';
import axios from 'axios';
import { BASE_URL } from '@/service/path';

const Campaigns = () => {

  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [page, setPage] = useState(1);
  const [ref, setRef] = useState([]);


  let pagination = {
    default_param: [],
    filter: [],
    page_no: page,
    per_page: 8,
    sort: 'created_at desc',
  };

  useEffect(() => {
    setLoader(true);
    axios
      .post(`${BASE_URL}/company/list`, pagination)
      .then((result) => {
        setData(result?.data);
      })
      .catch((err) => {
        return;
      })
      .finally(() => {
        setLoader(false);
      });
  }, [page]);

  return (
    <>
      <div className='relative'>
        <Hero imageUrl={'/assets/photo/campaings.png'} />
        <div className='absolute top-[40%] left-[20%] z-[9999] max-lg:hidden'>
          <p className='text-[12px] font-[500] leading-[18px] text-[#8557F4] mb-[12px]'>
            Campaigns
          </p>
          <p className='text-[36px] font-[500] leading-[40px] tracking-[-1.44px] text-[#FFF] mb-[24px]'>
            Marketing{' '}
            <span className='text-[36px] font-[700] leading-[40px] tracking-[-1.44px] text-[#FFF]'>
              campaigns
            </span>
          </p>
          <p className='text-[16px] font-[400] leading-[28px] text-[#EAECF0]'>
            Хамгийн сүүлийн үеийн салбарын мэдээ, ярилцлага, технологи, нөөц.
          </p>
        </div>
      </div>
      <CampaignsLayout>
        <Works data={data} setPage={setPage} page={page} />
      </CampaignsLayout>
    </>
  );
};
export default Campaigns;

'use client';
import DetailCampaigns from '@/components/Detail/detailBlocks';
import DetailActivity from '@/components/Detail/detailActivity';
import DetailAds from '@/components/Detail/detailAds';
import { useContext, useEffect, useState } from 'react';
import { BASE_URL } from '@/service/path';
import { useParams } from 'next/navigation';
import { AuthContext } from '@/context/auth/authContext';

const Index = () => {
  const [data, setData] = useState([]);

  const { Id } = useParams();
  const {
    authFunc: { GET },
  } = useContext(AuthContext);

  useEffect(() => {
    GET(`${BASE_URL}/company/${Id}`, true)
      .then((result) => {
        setData(result?.data?.data);
      })
      .catch((err) => {
        return;
      });
  }, []);

  return (
    <div className='mt-[97px] w-[80%]'>
      <div className='flex gap-[30px]'>
        <div className='border-[1px] border-[solid] border-[#EAECF0] shadow-sm w-[70%] h-[80%]'>
          <div className='p-[20px]'>
            <p className='text-[40px] text-[#101828] font-[600] leading-[60px] tracking-[-0.8px] mb-[20px]'>
              {data?.name}
            </p>
            <p className='text-[16px] font-[400] leading-[24px] text-[#475467]'>
              {data?.description}
            </p>
          </div>
          <div className=' w-[100%]'>
            <iframe
              width='100%'
              height='432px'
              src={data?.youtube_link}
              frameBorder='0'
              allowFullScreen
              loading='lazy'
              referrerPolicy='no-referrer'
            ></iframe>
          </div>
          <DetailActivity data={data?.areas_of_activity} />
        </div>
        <div className='border-[1px] border-[solid] border-[#EAECF0] shadow-sm w-[30%] p-[20px] flex flex-col gap-[20px]'>
          <DetailAds />
        </div>
      </div>
      <div className='mt-[24px] w-[100%] py-[48px]'>
        <DetailCampaigns />
      </div>
    </div>
  );
};
export default Index;

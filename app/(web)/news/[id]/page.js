'use client';
import Blogs from '@/module/home/template/blogs';
import { useEffect, useState } from 'react';
import { BASE_URL } from '@/service/path';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { formatDate } from '@/utils/utils';
import { CardPlacehoderSkeleton } from '@/components/Loading';

const Index = () => {
  const [loader, setLoader] = useState(false);
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    setLoader(true);
    axios
      .get(`${BASE_URL}/news/${id}`)
      .then((result) => {
        setData(result?.data?.data);
      })
      .catch((err) => {
        return;
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);
  return (
    <>
      {loader ? (
        <CardPlacehoderSkeleton />
      ) : (
        <>
          <div className='mt-[113px] w-[80%]'>
            <div className='flex flex-col items-center justify-center'>
              <p className='text-[#8557F4] text-[12px] font-[500] leading-[18px] mb-[15px]'>
                {formatDate(data?.created_at)}-нд нийтлэгдсэн
              </p>
              <p className='text-[#101828] text-center text-[40px] font-[700] leading-[48px] mb-[24px] tracking-[-0.8px]'>
                {data?.title}
              </p>
              <div className='mb-[40px] w-[100%] flex justify-center items-center'>
                <img
                  src={`${BASE_URL}/file/${data?.image?.file_name}`}
                  alt='People'
                  className='w-full object-contain  max-h-[500px]'
                />
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html: data?.body,
                }}
              ></div>
            </div>
          </div>
          <div className='flex justify-center bg-[#F9FAFB]'>
            <div className='flex w-[80%] flex-col items-center justify-center mb-[64px]'>
              <Blogs fromDetail='fromDetail' />
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default Index;

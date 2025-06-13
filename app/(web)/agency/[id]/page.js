'use client';
import { useContext, useEffect, useState } from 'react';
import DetailActivity from '@/components/Detail/detailActivity';
import DetailInfo from '@/components/Detail/detailInfo';
import { AuthContext } from '@/context/auth/authContext';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { BASE_URL } from '@/service/path';
import DetailAdsAgency from '@/components/Detail/detailAdsAgency';
const Index = () => {
    const [data, setData] = useState({});
    const [loader, setLoader] = useState(false);
    const {id} = useParams();
    const {
        authFunc: { GET },
    } = useContext(AuthContext);
    useEffect(() => {
        GET(`${BASE_URL}/agent/${id}`, true)
            .then((result) => {
                setData(result?.data?.data);

            })
            .catch((err) => {
                return;
            });
    }, []);

    return (
        <div className='mt-[120px] mb-[24px] w-[80%]'>
            <div className='flex gap-[30px]'>
                <div className='w-[70%] shadow-sm h-[80%]'>
                    <div className='p-[20px]'>
                        <p className='text-[40px] text-[#101828] font-[600] leading-[60px] tracking-[-0.8px] mb-[20px]'>{data?.name}</p>
                        <p className='text-[16px] font-[400] leading-[24px] text-[#475467]'>{data?.description}</p>
                    </div>
                    <div className='p-[20px]'>
                        <p className='text-[16px] font-[400] leading-[24px] text-[#475467]'>{data?.body}</p>
                        <p className='text-[16px] font-[400] leading-[24px] text-[#475467]'>City: {data?.city}</p>
                        <p className='text-[16px] font-[400] leading-[24px] text-[#475467]'>Website: {data?.website}</p>
                        <p className='text-[16px] font-[400] leading-[24px] text-[#475467]'>Address: {data?.address}</p>
                        <p><a href="mailto:Melojigeq@gmail.com ">Send email</a></p>
                        <p className='text-[16px] font-[400] leading-[24px] text-[#475467]'><a href="tel:+97699441339">Call</a></p>
                    </div>
                    <div className=' w-[100%]'>
                        <iframe
                            width='100%'
                            height='432px'
                            src='https://www.youtube.com/watch?v=42Ekv1x_Qdo'
                            frameBorder='0'
                            allowFullScreen
                            loading='lazy'
                            referrerPolicy='no-referrer'
                        ></iframe>
                    </div>
                    <div className='p-[20px]'>
                        <DetailInfo data={data} />
                    </div>
                    <DetailActivity data={data?.brands} />
                </div>
                <div className='border-[1px] border-[solid] border-[#EAECF0] shadow-xs w-[30%] p-[20px] flex flex-col gap-[20px]'>
                    <DetailAdsAgency />
                </div>
            </div>
        </div>
    );
};
export default Index;

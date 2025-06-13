'use client';
import DetailActivity from '@/components/Detail/detailActivity';
import DetailAds from '@/components/Detail/detailAds';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { AuthContext } from '@/context/auth/authContext';
import DetailAdsResources from '@/components/Detail/detailAdsResources';

const Index = () => {
    const [data, setData] = useState({});
    const param = useParams();
    const {
        authFunc: { GET },
    } = useContext(AuthContext);

    useEffect(() => {
        GET(`agent/${param?.id}`, true)
            .then((result) => {
                setData(result?.data?.data);
            })
            .catch((err) => {
                return;
            });
    }, []);

    return (
        <div className=' mt-[97px] w-[80%]'>
            <div className='flex gap-[30px]'>
                <div className='border-[1px] border-[solid] border-[#EAECF0] shadow-xs w-[70%] h-[80%]'>
                <div className='p-[20px]'>
                        <p className='text-[40px] text-[#101828] font-[600] leading-[60px] tracking-[-0.8px] mb-[20px]'>{data?.name}</p>
                        <p className='text-[16px] font-[400] leading-[24px] text-[#475467]'>{data?.description}</p>
                    </div>
                    <div className='p-[20px]'>
                        <p className='text-[16px] font-[400] leading-[24px] text-[#475467]'>Daliy views: {data?.tv_daily_avg_views}</p>
                        <p className='text-[16px] font-[400] leading-[24px] text-[#475467]'>Univision number views: {data?.tv_univision_number}</p>
                        <p className='text-[16px] font-[400] leading-[24px] text-[#475467]'>Website: {data?.website}</p>
                        <p className='text-[16px] font-[400] leading-[24px] text-[#475467]'>Address: {data?.address}</p>
                        <p><a href="mailto:Melojigeq@gmail.com ">Send email</a></p>
                        <p className='text-[16px] font-[400] leading-[24px] text-[#475467]'><a href="tel:+97699441339">Call</a></p>
                    </div>
                    <div className=' w-[100%]'>
                        <iframe
                            width='100%'
                            height='432px'
                            src='https://www.youtube.com/embed/eCZ6pLZM42I?si=eogh-eDuf2B0eTLO'
                            frameBorder='0'
                            allowFullScreen
                            loading='lazy'
                            referrerPolicy='no-referrer'
                        ></iframe>
                    </div>
                    <DetailActivity data={data?.areas_of_activity} />
                </div>
                <div className='border-[1px] border-[solid] border-[#EAECF0] shadow-xs w-[30%] p-[20px] flex flex-col gap-[20px]'>
                    <DetailAdsResources />
                </div>
            </div>
            {/* <div className="mt-[24px] w-[100%] py-[48px]">
                <DetailCampaigns />
            </div> */}
        </div>
    );
};
export default Index;

'use client';
import AgencyBLock from '@/components/Block/index';
import { Pagination } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

const Index = ({ data }) => {
    const router = useRouter();
    return (
        <div className='w-[100%] flex flex-col gap-[24px] mb-[32px] items-center'>
            {data?.data?.map((item, i) => {
                return (
                    // <div className='shadow-sm hover:shadow-md w-[100%]' key={i} onClick={() => router.push(`${route.agency}/${item?.ID}`)}>
                    <div className='shadow-sm hover:shadow-md w-[100%]' key={i} >
                        <AgencyBLock item={item} />
                    </div>
                );
            })}
            <Pagination isCompact showControls total={data?.pagination?.total_pages} initialPage={1} variant='light' size='lg' color='primary' />
        </div>
    );
};

export default Index;

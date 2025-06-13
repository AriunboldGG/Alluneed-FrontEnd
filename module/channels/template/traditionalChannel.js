'use client';
import TraditionalChannelBlock from '@/components/Block/traditionalChannel';
import { Pagination } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

const TraditionalChannelList = ({ data, setPage, page }) => {
    const router = useRouter();
    return (
        <div className='w-[100%] flex flex-col gap-[24px] mb-[32px] items-center'>
            {data?.map((item, i) => {
                return (
                    // <div className='shadow-sm hover:shadow-md w-[100%]' key={i} onClick={() => router.push(`${route.agency}/${item?.ID}`)}>
                    <div className='shadow-sm hover:shadow-md w-[100%]' key={i} >
                       <TraditionalChannelBlock item={item}/>
                    </div>
                );
            })}
            <Pagination 
            isCompact 
            showControls 
            total={data?.pagination?.total_pages} 
            initialPage={page} 
            variant='light' 
            size='lg' 
            color='primary'
            onChange={(page) => setPage(page)}
            
            />
        </div>
    );
};

export default TraditionalChannelList;

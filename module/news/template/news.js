'use client';
import WorksBlock from '@/components/WorkBlock';
import route from '@/route';
import { Pagination } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

const Index = ({ loader, data, setPage, page }) => {
  const router = useRouter();

  return (
    <>
      <div className='my-[48px] grid grid-rows-2 grid-cols-4 gap-10 justify-center cursor-pointer w-full max-md:grid-rows-4 max-lg:grid-cols-2 max-md:w-[98%] max-sm:grid-rows-8 max-sm:grid-cols-1'>
        {data?.data?.map((el, i) => {
          return (
            <div
              key={i}
              className='shadow-sm'
              onClick={() => router.push(`${route.news}/${el?.ID}`)}
            >
              <WorksBlock campaigns='news' row={el} />
            </div>
          );
        })}
      </div>
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
    </>
  );
};

export default Index;

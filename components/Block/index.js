import route from '@/route';
import { useRouter } from 'next/navigation';
import { BASE_URL } from '@/service/path';
const Index = ({ item }) => {
  const router = useRouter();
  return (
    <div className='w-[100%] flex border-[#EAECF0] border-[1px] border-[solid]'>
      <div className='max-h-[300px] max-w-[420px] overflow-hidden'>
        <img src='/assets/photo/agency2.png' alt='agency' />
      </div>
      <div className='ml-[24px] flex justify-between items-center w-[100%] mr-[32px]'>
        <div className='flex flex-col gap-[12px]'>
          <p className='text-[#8557F4] text-[14px] font-[600] leading-[20px]'>
            {item?.city}
          </p>
          <p className='text-[#101828] text-[18px] font-[600] leading-[28px]'>
            {item?.name}
          </p>
          <p className='text-[#475467] text-[16px] font-[400] leading-[24px]'>
            {item?.description}
          </p>
        </div>
        <div className='w-[99px] h-[44px] bg-[#26003B] flex'>
          <button
            className='text-[14px] font-[600] text-[#FFF] leading-[20px] w-[100%] h-[100%] hover:bg-[#FD3D80]'
            onClick={() => router.push(`${route.agency}/${item?.ID}`)}
          >
            Танилцах
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;

import { BASE_URL } from '@/service/path';
import Link from 'next/link';

const DetailActivity = ({ data }) => {
    return (
        <div className='w-[100%] p-[20px] flex gap-[64px] justify-between'>
            <div className='flex flex-col'>
                <p className='text-[#050514] mb-[12px] text-[14px] font-[500] leading-[20px]'>Үйл ажиллагааны чиглэл</p>
                <div className='flex gap-[12px]'>
                    {data?.map((i, index) => {
                        return (
                            <div
                                key={index}
                                className='rounded-[16px] border-[#F5F6FF] border-[2px] w-[76px] h-[25px] flex py-[2px] px-[3px] gap-[6px] items-center justify-center'
                            >
                                <img src={`${BASE_URL}/${i?.image}`} alt='icon' width='16px' height='16px' />
                                <p className='text-[#8557F4] text-[12px] font-[500] leading-[18px]'>{i?.name}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className='flex justify-start w-[144px] h-[72px] flex-col'>
                <p className='text-[#050514] text-[14px] font-[600] leading-[20px] mb-[12px]'>Social сувгууд</p>
                <div className='flex items-end justify-between'>
                    <Link href={''} className='p-[10px] rounded-[8px] border-[1px] border-[solid] border-[#D0D5DD]'>
                        <img src='/assets/icons/twitter.svg' alt='twitter' />
                    </Link>
                    <Link href={''} className='p-[10px] rounded-[8px] border-[1px] border-[solid] border-[#D0D5DD]'>
                        <img src='/assets/icons/fb.svg' alt='fb' />
                    </Link>
                    <Link href={''} className='p-[10px] rounded-[8px] border-[1px] border-[solid] border-[#D0D5DD]'>
                        <img src='/assets/icons/linkedin.svg' alt='linkedin' />
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default DetailActivity;

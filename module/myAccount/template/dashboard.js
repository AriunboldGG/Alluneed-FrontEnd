import { AuthContext } from '@/context/auth/authContext';
import { BASE_URL } from '@/service/path';
import { formatDate, roundByeThousand } from '@/utils/utils';
import { Avatar, Image } from '@nextui-org/react';
import { useContext } from 'react';

const Dashboard = () => {
    const {
        authState: { user },
    } = useContext(AuthContext);
    return (
        <div className='flex justify-between w-full p-10 shadow-sm'>
            <div className='flex space-between space-x-[50px] w-[100%]'>
                <Avatar src={`${BASE_URL}/file/${user?.photo1?.file_name || user?.photo2?.file_name || ''}`} className='w-[26%] h-[200px]' />
                <div className='flex flex-col justify-center gap-4 w-[40%]'>
                    <h1 className='font-[800] text-[22px]'>{user?.name}</h1>
                    <div className='bg-[#F2F4F7] rounded-[20px] w-[30%] flex justify-center'>
                        <p className='text-[#344054] font-bold leading-[24px] text-[12px]'>{user?.role?.name}</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Image src='/assets/icons/calendar.svg' alt='icons' />
                        <p className='font-[600] leading-[20px] text-[14px]'>{formatDate(user?.created_at)}</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Image src='/assets/icons/marker.svg' alt='icons' />
                        <p className='font-[600] leading-[20px] text-[14px]'>{user?.location}</p>
                    </div>
                    <div className='flex items-center gap-4'>
                        <div className='flex items-center gap-2'>
                            <Image src='/assets/icons/youtube.svg' alt='fb' />
                            <p className='font-[600] leading-[20px] text-[14px] mt-1'>{roundByeThousand(user?.followers)} K</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Image src='/assets/icons/fbColor.svg' alt='fb' />
                            <p className='font-[600] leading-[20px] text-[14px] mt-1'>{roundByeThousand(user?.followers)} K</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Image src='/assets/icons/twitterColor.svg' alt='fb' />
                            <p className='font-[600] leading-[20px] text-[14px] mt-1'>{roundByeThousand(user?.followers)} K</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className='w-[20%] shadow-sm flex items-center justify-center'>
                <div className='flex items-center gap-2 text-center'>
                    <Image src='/assets/icons/globe.svg' alt='fb' />
                    <p className='font-[500] leading-[20px] text-[14px] mt-1'>{user?.website}</p>
                </div>
            </div> */}
        </div>
    );
};

export default Dashboard;

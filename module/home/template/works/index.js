import WorkBlock from '@/components/WorkBlock/index';
const Index = () => {
    let arr = [0, 1, 2, 3];
    return (
        <div className='w-[100%] z-[99]'>
            <p className='h-[16px] text-center text-[16px] font-[500] leading-[16px] text-[#8557F4] mt-[48px] mb-[8px]'>
                Hottest <span className='h-[16px] text-center text-[16px] font-[700] leading-[16px] text-[#8557F4]'>Campaign</span>
            </p>
            <div className='h-[44px] text-center mb-[32px]'>
                <p className='text-[32px] font-[400] leading-[44px] text-[#050514] tracking-[-0.64px]'>
                    Маркетингийн <span className='text-[32px] font-[700] leading-[44px] text-[#050514] tracking-[-0.64px]'>ажлууд</span>
                </p>
            </div>
            <div className='flex gap-[32px] max-lg:flex-wrap max-lg:justify-center '>
                {arr?.map((i) => {
                    return (
                        <div className='w-[25%] shadow-sm max-lg:w-[45%] max-sm:w-[100%] max-sm:px-[16px] bg-[#FFF]' key={i}>
                            <WorkBlock />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Index;

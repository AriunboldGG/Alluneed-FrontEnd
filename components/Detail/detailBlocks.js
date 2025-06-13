import CampaignBlock from '@/components/WorkBlock';
const DetailBlocks = () => {
    let arr1 = [0, 1, 2, 4];
    return (
        <>
            <p className='text-[#050514] text-[28px] font-[400] leading-[32px] tracking-[-0.56px] mb-[40px]'>
                Холбоотой <span className='text-[#050514] text-[32px] font-[800] leading-[24px] tracking-[-0.4px]'>Campaigns</span>
            </p>
            <div className='w-[100%] flex gap-[32px]'>
                {arr1?.map((i) => {
                    return (
                        <div className='w-[25%] shadow hover:shadow-md' key={i}>
                            <CampaignBlock />
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default DetailBlocks;

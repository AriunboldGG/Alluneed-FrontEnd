import DetailCampaigns from '@/components/Detail/detailBlocks';
import DetailActivity from '@/components/Detail/detailActivity';
import DetailAds from '@/components/Detail/detailAds';

const Index = () => {
    return (
        <div className=" mt-[97px] w-[80%]">
            <div className="flex gap-[30px]">
                <div className="border-[1px] border-[solid] border-[#EAECF0] shadow-xs w-[70%] h-[80%]">
                    <div className="p-[20px]">
                        <p className="text-[40px] text-[#101828] font-[600] leading-[60px] tracking-[-0.8px] mb-[20px]">UnAwkward</p>
                        <p className="text-[16px] font-[400] leading-[24px] text-[#475467]">
                            Хамтран ажиллагсдаа гайхшруулж, менежерүүдийнхээ сэтгэлийг хөдөлгөх сэтгэл татам илтгэлүүдийг хэрхэн бүтээх вэ?
                        </p>
                    </div>
                    <div className=" w-[100%]">
                        <iframe
                            width="100%"
                            height="432px"
                            src="https://www.youtube.com/embed/3yiHZWr6Izc?controls=0&rel=0"
                            frameBorder="0"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer"
                        ></iframe>
                    </div>
                    <DetailActivity />
                </div>
                <div className="border-[1px] border-[solid] border-[#EAECF0] shadow-xs w-[30%] p-[20px] flex flex-col gap-[20px]">
                    <DetailAds />
                </div>
            </div>
            {/* <div className="mt-[24px] w-[100%] py-[48px]">
                <DetailCampaigns />
            </div> */}
        </div>
    );
};
export default Index;

const DetailAdsChannel = () => {
    return (
        <>
            <p className="text-[#050514] text-[20px] font-[400] leading-[24px] tracking-[-0.4px]">
            Space for your ad <span className="text-[#050514] text-[20px] font-[800] leading-[24px] tracking-[-0.4px]">Channel</span>
            </p>
            <div className=" w-[100%]">
                <iframe
                    width="100%"
                    height="300px"
                    src="https://ikon.mn/"
                    frameBorder="0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer"
                ></iframe>
            </div>
            <div className=" w-[100%]">
                <iframe
                    width="100%"
                    height="300px"
                    src="http://tsag-agaar.gov.mn/"
                    frameBorder="0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer"
                ></iframe>
            </div>
            
        </>
    );
};

export default DetailAdsChannel;

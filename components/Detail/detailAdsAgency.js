const DetailAdsAgency = () => {
    return (
        <>
            <p className="text-[#050514] text-[20px] font-[400] leading-[24px] tracking-[-0.4px]">
                ADS <span className="text-[#050514] text-[20px] font-[800] leading-[24px] tracking-[-0.4px]">Agencies</span>
            </p>
            <div className=" w-[100%]">
                <iframe
                    width="100%"
                    height="300px"
                    src="https://www.youtube.com/watch?v=Cr0KdqZ954c"
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
                    src="https://www.facebook.com/procraft.agency"
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
                    src="https://www.instagram.com/procraft.agency/?hl=en"
                    frameBorder="0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer"
                ></iframe>
            </div>
        </>
    );
};

export default DetailAdsAgency;

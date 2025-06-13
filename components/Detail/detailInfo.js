const DetailInfo = ({ data }) => {
    return (
        <div className='w-[100%]'>
            <p className='text-[#050514] text-[14px] font-[500] leading-[20px] mb-[20px]'>Танилцуулга</p>
            <p className='text-[#475467] text-[14px] font-[400] leading-[24px]'>{data?.body}</p>
        </div>
    );
};
export default DetailInfo;

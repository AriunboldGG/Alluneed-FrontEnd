const Index = () => {
    return (
        <div className='w-[100%] bg-[#050514] h-[322px] z-10 flex flex-col justify-between items-center max-md:h-[100%] mt-[70px]'>
            <div className='my-[64px] flex flex-col gap-[32px] max-md:w-[100%]'>
                <div className='flex justify-center'>
                    <img src='/assets/photo/mainLogoWhite.png' alt='logo' />
                </div>
                <ul className='flex justify-evenly gap-[32px] max-lg:flex-wrap'>
                    <li className='text-[#EAECF0]'>Танилцуулга</li>
                    <li className='text-[#EAECF0]'>Боломжууд</li>
                    <li className='text-[#EAECF0]'>Үнийн санал</li>
                    <li className='text-[#EAECF0]'>Тусламж</li>
                </ul>
            </div>
            <div className='flex justify-around w-[100%] my-[32px] max-md:flex-col-reverse max-md:items-center'>
                <div className='text-[#EAECF0]'>Бүх эрх хуулиар хамгаалагдсан © 2025.</div>
                <ul className='flex  gap-[16px]'>
                    <li className='text-[#EAECF0]'>Журмууд</li>
                    <li className='text-[#EAECF0]'>Нууцлал</li>
                    <li className='text-[#EAECF0]'>Cookie</li>
                </ul>
            </div>
        </div>
    );
};
export default Index;

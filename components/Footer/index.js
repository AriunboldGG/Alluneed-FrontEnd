const Index = () => {
    return (
        <footer className='w-full bg-[#050514] z-10 flex flex-col justify-between items-center mt-[70px] px-4 py-8'>
            <div className='my-8 flex flex-col gap-8 w-full max-w-screen-xl'>
                <div className='flex justify-center'>
                    <img src='/assets/photo/mainLogoWhite.png' alt='logo' className='h-12 w-auto' />
                </div>
                <ul className='flex flex-wrap justify-center gap-6'>
                    <li className='text-[#EAECF0] whitespace-nowrap'>Танилцуулга</li>
                    <li className='text-[#EAECF0] whitespace-nowrap'>Боломжууд</li>
                    <li className='text-[#EAECF0] whitespace-nowrap'>Үнийн санал</li>
                    <li className='text-[#EAECF0] whitespace-nowrap'>Тусламж</li>
                </ul>
            </div>
            <div className='flex flex-col md:flex-row justify-between items-center w-full max-w-screen-xl gap-4 my-4'>
                <div className='text-[#EAECF0] text-center md:text-left'>Бүх эрх хуулиар хамгаалагдсан © 2025.</div>
                <ul className='flex flex-wrap justify-center gap-4'>
                    <li className='text-[#EAECF0]'>Журмууд</li>
                    <li className='text-[#EAECF0]'>Нууцлал</li>
                    <li className='text-[#EAECF0]'>Cookie</li>
                </ul>
            </div>
        </footer>
    );
};
export default Index;

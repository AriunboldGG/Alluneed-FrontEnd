'use client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Layout = ({ children }) => {
  return (
    <>
      <div className='flex flex-col items-center justify-between w-[100%] min-h-[100%]'>
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
};
export default Layout;

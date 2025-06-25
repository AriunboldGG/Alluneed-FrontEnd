'use client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Layout = ({ children }) => {
  return (
    <div className='flex flex-col min-h-screen w-full bg-white'>
      <Header />
      <main className='flex-1 w-full max-w-screen-2xl mx-auto px-2 sm:px-4 md:px-8'>{children}</main>
      <Footer />
    </div>
  );
};
export default Layout;

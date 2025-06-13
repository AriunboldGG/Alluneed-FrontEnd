import React from 'react';
import { Image } from '@nextui-org/react';

const LoadingScreen = () => {
    return (
        <div className='fixed top-0 left-0 flex items-center justify-center w-full h-full bg-white'>
            <div className='u-loading__symbol'>
                <Image src='/assets/icons/mainLogo.svg' className='logo' />
            </div>
        </div>
    );
};

export default LoadingScreen;

'use client';
import AgencyBLock from '@/components/Block/index';

const Index = () => {
    let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    return (
        <div className="w-[100%] flex flex-col gap-[24px] mb-[32px]">
            {arr?.map((i) => {
                return (
                    <div className="shadow-xs hover:shadow-md" key={i.id}>
                        <AgencyBLock />
                    </div>
                );
            })}
        </div>
    );
};

export default Index;

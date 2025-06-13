'use client';
import { Button } from '@nextui-org/react';

const Index = ({ TabsArray, setSelected, selected }) => {
    return (
        <div className="w-[20%]">
            {TabsArray.map((tab, index) => {
                return (
                    <div className={`mb-[10px] shadow-sm ${selected.title === tab?.title ? 'bg-black text-white' : 'bg-white'}`} key={index}>
                        <Button
                            radius="none"
                            className={`${selected?.title === tab?.title ? 'bg-black text-white' : 'bg-white'} w-[100%]`}
                            onClick={() => setSelected(tab)}
                        >
                            {tab?.title}
                        </Button>
                    </div>
                );
            })}
        </div>
    );
};
export default Index;

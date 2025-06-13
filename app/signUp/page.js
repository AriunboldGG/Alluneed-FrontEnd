'use client';
//react
import { useState, useEffect } from 'react';
//next
import Link from 'next/link';
import { useRouter } from 'next/navigation';
//route
import route from '@/route';
//

const roles = [
    { id: '1', name: 'Influencer' },
    { id: '2', name: 'Байгууллага' },
    { id: '3', name: 'Marketer' },
];

const Page = () => {
    const [activeRole, setActiveRole] = useState('1');
    const router = useRouter();

    return (
        <div className="flex max-h-[100vh] h-[100%] max-md:flex-col-reverse max-md:overflow-hidden">
            <div className="w-[46%] flex relative items-center h-[100%] max-lg:w-[62%] max-md:w-[100%] max-md:flex-col">
                <div className={`top-[10px] left-[32px] absolute max-md:top-[0] max-md:left-[16px] max-md:relative max-md:self-stretch`}>
                    <img
                        src="/assets/icons/mainLogo.svg"
                        alt="logo"
                        width={154}
                        className="cursor-pointer"
                        onClick={() => {
                            router.push(route.home);
                        }}
                    />
                </div>

                <div className="flex w-[100%] items-center justify-center h-[100vh] max-md:px-[16px] max-md:mt-[24px]  max-md:items-start">
                    <div className="p-[20px] w-[70%] flex flex-col gap-[24px] border-[1px] border-[solid] border-[#EAECF0] rounded-[8px] max-md:p-[0px] max-md:border-[0px] max-md:w-[100%]">
                        <div className="w-[100%]">
                            <p className="text-[24px] mb-[12px] font-[600] leading-[28px] tracking-[-0.48px]">Бүртгүүлэх</p>
                            <p className="text-[14px] font-[400] leading-[24px]">30 хоног үнэгүй туршилт хийгээрэй.</p>
                        </div>
                        <div className="flex flex-col gap-[24px]">
                            <div className="h-[44px] p-[4px] flex gap-[8px] rounded-[8px] border-[1px]  border-[#F2F4F7] border-[solid] bg-[#F9FAFB] max-w-[100%]">
                                {roles.map((role) => (
                                    <div
                                        key={role.id}
                                        className={`flex items-center px-[8px] py-[8px] cursor-pointer hover:bg-[#FFF] ${
                                            activeRole === role.id && 'shadow-sm rounded-[6px] bg-[#FFF]'
                                        }`}
                                        onClick={() => {
                                            setActiveRole(role.id);
                                        }}
                                    >
                                        <p className="text-[14px] font-[600] leading-[20px]">{role.name}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col gap-[20px] w-[100%]">
                                <div>
                                    <p className="text-[#344054] font-[500] leading-[20px] mb-[6px]">Нэр</p>
                                    <input
                                        placeholder="Нэрээ оруулна уу"
                                        className="rounded-[8px] border-[#D0D5DD] border-[1px] border-[solid] w-[100%] h-[44px] pl-[14px] py-[10px]"
                                    />
                                </div>
                                <div>
                                    <p className="text-[#344054] font-[500] leading-[20px] mb-[6px]">Имэйл</p>
                                    <input
                                        placeholder="Имэйлээ оруулна уу"
                                        className="rounded-[8px] border-[#D0D5DD] border-[1px] border-[solid] w-[100%] h-[44px] pl-[14px] py-[10px]"
                                    />
                                </div>
                                <div>
                                    <p className="text-[#344054] font-[500] leading-[20px] mb-[6px]">Нууц үг</p>
                                    <input
                                        placeholder="Нууц үгээ оруулна уу"
                                        className="rounded-[8px] border-[#D0D5DD] border-[1px] border-[solid] w-[100%] h-[44px] pl-[14px] py-[10px]"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <div className="flex items-center justify-center gap-[8px]">
                                    <input type="checkbox" />
                                    <p className="text-[#26003B] text-[14px] leading-[20px] font-[500] py-[2px]">30 хоногийн турш сана</p>
                                </div>

                                <Link href={''} className="text-[#8557F4] text-[14px] leading-[20px] font-[600] py-[2px] hover:underline">
                                    Нууц үг мартсан
                                </Link>
                            </div>
                            <button className="py-[10px] px-[18px] bg-[#FD3D80] text-center shadow-xs text-[16px] font-[600] text-[#FFF] leading-[24px] hover:bg-[#f6f2f2] hover:text-[#FD3D80]">
                                Нэвтрэх
                            </button>
                        </div>
                        <div className="flex gap-[4px] justify-center">
                            <p className="text-[#475467] text-[14px] font-[400] leading-[24px]">Бүртгэлтэй юу?</p>
                            <Link href={route.signIn} className="text-[14px] font-[600] leading-[20px] text-[#8557F4]">
                                Нэвтрэх
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="bottom-[10px] left-[32px] absolute max-md:hidden">
                    <p className="text-[14px] font-[400] leading-[20px]">Бүх эрх хуулиар хамгаалагдсан © 2025.</p>
                </div>
            </div>
            <div className="w-[54%] max-lg:w-[38%] max-md:w-[100%] max-md:pb-[40px]">
                <img
                    src={'/assets/photo/login.png'}
                    alt="Login"
                    style={{ objectFit: 'cover', height: '100%', width: '100%', objectPosition: '50% 0%' }}
                />
            </div>
        </div>
    );
};
export default Page;

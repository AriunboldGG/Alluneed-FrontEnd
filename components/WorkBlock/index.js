"use client";
import { motion } from "framer-motion";
import { Image } from "@nextui-org/react";
import { BASE_URL } from "@/service/path";
import { formatDate } from "@/utils/utils";

const Index = ({ campaigns, row }) => {
  return (
    <motion.div whileHover={{ scale: 1.01 }}>
      <div className="bg-white overflow-hidden  ">
        <img
          src="../assets/photo/Blog.png"
          alt="People"
          className="w-full object-cover h-32 sm:h-48 md:h-64"
        />

        <div className="p-4 md:p-6">
          <p className="text-blue-500 font-semibold text-xs mb-1 leading-none">
            News
          </p>
          <h3 className="font-semibold mb-2 text-sm leading-tight sm:leading-normal line-clamp-2">
            {row?.title}
          </h3>
          <div className="text-sm flex items-center">
            <svg
              className="opacity-75 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              id="Capa_1"
              x="0px"
              y="0px"
              width={12}
              height={12}
              viewBox="0 0 97.16 97.16"
              style={{ enableBackground: "new 0 0 97.16 97.16" }}
              xmlSpace="preserve">
              <path d="M48.58,0C21.793,0,0,21.793,0,48.58s21.793,48.58,48.58,48.58s48.58-21.793,48.58-48.58S75.367,0,48.58,0z M48.58,86.823    c-21.087,0-38.244-17.155-38.244-38.243S27.493,10.337,48.58,10.337S86.824,27.492,86.824,48.58S69.667,86.823,48.58,86.823z" />
              <path d="M73.898,47.08H52.066V20.83c0-2.209-1.791-4-4-4c-2.209,0-4,1.791-4,4v30.25c0,2.209,1.791,4,4,4h25.832    c2.209,0,4-1.791,4-4S76.107,47.08,73.898,47.08z" />
            </svg>
            <p className="leading-none">{formatDate(row?.created_at)}</p>
          </div>
        </div>
      </div>
      {/* <div className='h-[350px]'>
        <div className='h-[65%]'>
          <div
            style={{
              backgroundImage: `url(${BASE_URL}/file/${row?.image?.file_name})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',

              width: '100%',
              height: '100%',
            }}
          />
        </div>
        <div className='px-[16px] py-[16px] flex flex-col gap-8'>
          <div className='flex gap-2'>
            {row?.areas_of_activity?.map((el, i) => (
              <div className='p-[4px] rounded-[16px] bg-[#FFF] w-[73px]  gap-[8px] border-[4px] border-[#F5F6FF] flex justify-center items-center'>
                <p key={i} className='text-[12px] font-[500] leading-[8px]'>
                  {el?.title}
                </p>
              </div>
            ))}
          </div>
          <div className='h-[20px] flex justify-between'>
            <p className='text-[16px] font-[600] leading-[20px] tracking-[-0.32px] text-[#222]'>
              {row?.title}
            </p>
            {campaigns ? (
              ''
            ) : (
              <img src='/assets/icons/arrow-up-right.svg' alt='arrow' />
            )}
          </div>
        </div>
      </div> */}
    </motion.div>
  );
};

export default Index;

'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import NewsLayout from '@/module/news/layout/main';
import Hero from '@/components/Hero';
import BlogBlock from '@/components/BlogBlock/Index';
import Dropdown from '@/components/Dropdown/index';
import route from '@/route';
import { Pagination } from '@nextui-org/react';
import Works from '@/module/news/template/news';
import axios from 'axios';
import { BASE_URL } from '@/service/path';
import { CardPlacehoderSkeleton } from '@/components/Loading';

const Index = () => {
  const [activeRole, setActiveRole] = useState(null);
  const [loader, setLoader] = useState(false);
  const [selectedOption, setSelectedOption] = useState('created_at desc');
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [ref, setRef] = useState([]);

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const router = useRouter();

  let pagination = {
    default_param: [],
    filter: [
      {
        field_name: 'type.id',
        field_type: 'number',
        operation: '=',
        values: [String(activeRole)],
      },
    ],
    page_no: page,
    per_page: 8,
    sort: selectedOption,
  };

  useEffect(() => {
    setLoader(true);
    if (activeRole !== null) {
      axios
        .post(`${BASE_URL}/news/list`, pagination)
        .then((result) => {
          setData(result?.data);
          setLoader(false);
        })

        .catch((err) => {
          return;
        })
        .finally(() => {
          setLoader(false);
        });
    }
  }, [page, activeRole, selectedOption]);

  useEffect(() => {
    getRef();
  }, []);
  let FilterPagination = {
    default_param: [],
    filter: [
      {
        field_name: 'code',
        field_type: 'string',
        operation: '=',
        // value: 8,
        value: 'NEWS',
      },
    ],
    glob_operation: 'string',
    page_no: 0,
    per_page: 10000,
    sort: 'created_at asc',
  };

  const getRef = () => {
    setLoader(true);
    axios
      .post(`${BASE_URL}/reference/list`, FilterPagination)
      .then((result) => {
        setRef(result?.data?.data);
        setActiveRole(result?.data?.data?.[0]?.ID);
      })
      .catch((err) => {
        return;
      })
      .finally(() => {
        setLoader(false);
      });
  };

  return (
    <>
      <div className='relative'>
        <Hero imageUrl={'/assets/photo/blogs.png'} />
        <div className='absolute top-[40%] left-[20%] z-[11] max-lg:hidden'>
          <p className='text-[12px] font-[500] leading-[18px] text-[#8557F4] mb-[12px]'>
            News
          </p>
          <p className='text-[36px] font-[500] leading-[40px] tracking-[-1.44px] text-black mb-[24px]'>
            News{' '}
            <span className='text-[36px] font-[700] leading-[40px] tracking-[-1.44px] '>
              daily
            </span>
          </p>
          <p className='text-[16px] font-[400] leading-[28px] text-black'>
            Хамгийн сүүлийн үеийн салбарын мэдээ, ярилцлага, технологи, нөөц.
          </p>
        </div>
      </div>
      <NewsLayout>
        <div className='flex flex-row space-x-4 justify-between mt-5'>
          <div className='w-[100%]'>
            <div className='flex  gap-[16px]'>
              {ref?.map((i) => {
                return (
                  <div
                    key={i.ID}
                    className={`hover:text-[#FD3D80] cursor-pointer ${
                      activeRole === i.ID &&
                      'border-[solid] border-b-[2px] border-[#FD3D80] text-[#FD3D80]'
                    }`}
                    onClick={() => {
                      setActiveRole(i.ID);
                    }}
                  >
                    <p className='p-[4px] text-[16px] font-[500] leading-[24px]'>
                      {i?.name}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className='border-[#EAECF0] border-[0.5px] border-[solid] w-[80%]' />
          </div>
          <div className='flex '>
            <Dropdown
              selectedOption={selectedOption}
              handler={handleDropdownChange}
            />
          </div>
        </div>
        {loader ? (
          <div className='flex flex-row space-x-5'>
            {Array.from({ length: 3 }).map((_, index) => (
              <CardPlacehoderSkeleton key={index} />
            ))}
          </div>
        ) : (
          <Works data={data} setPage={setPage} page={page} />
        )}
      </NewsLayout>
    </>
  );
};
export default Index;

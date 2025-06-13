'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import NewsLayout from '@/module/news/layout/main';
import Hero from '@/components/Hero';
import BlogBlock from '@/components/BlogBlock/Index';
import Dropdown from '@/components/Dropdown/index';
import route from '@/route';
import { Pagination } from '@nextui-org/react';
import axios from 'axios';
import { BASE_URL } from '@/service/path';

const Index = () => {
  const [activeRole, setActiveRole] = useState(1);
  const [selectedOption, setSelectedOption] = useState('');
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [page, setPage] = useState(1);
  const [ref, setRef] = useState([]);

  let pagination = {
    default_param: [],
    filter: [
      {
        // field_name: 'type.id',
        // field_type: 'number',
        // operation: '=',
        // value: `${activeRole}`,
        // values: [activeRole],
      },
    ],
    glob_operation: 'string',
    page_no: 0,
    per_page: 0,
    sort: 'string',
  };

  let FilterPagination = {
    default_param: [],
    filter: [
      {
        field_name: 'code',
        field_type: 'string',
        operation: '=',
        // value: 8,
        value: 'Resources_type',
      },
    ],
    glob_operation: 'string',
    page_no: 0,
    per_page: 0,
    sort: 'string',
  };

  useEffect(() => {
    getList();
  }, [activeRole]);

  useEffect(() => {
    getRef();
  }, []);

  const getList = () => {
    setLoader(true);
    axios
      .post(BASE_URL + '/resources/list', pagination)
      .then((result) => {
        setData(result?.data?.data);
      })
      .catch((err) => {
        return;
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const getRef = () => {
    setLoader(true);
    axios
      .post(BASE_URL + '/reference/list', FilterPagination)
      .then((result) => {
        setRef(result?.data?.data);
      })
      .catch((err) => {
        return;
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const router = useRouter();

  return (
    <>
      <div className='relative'>
        <Hero imageUrl={'/assets/photo/blogs.png'} />
        <div className='absolute top-[40%] left-[20%] z-[11] max-lg:hidden'>
          <p className='text-[12px] font-[500] leading-[18px] text-[#8557F4] mb-[12px]'>
            Resources
          </p>
          <p className='text-[36px] font-[500] leading-[40px] tracking-[-1.44px] text-black mb-[24px]'>
            Hottest{' '}
            <span className='text-[36px] font-[700] leading-[40px] tracking-[-1.44px] '>
              Resources
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
        <div className='grid grid-rows-2 grid-cols-4 gap-10 w-[100%] gap-x-[32px] gap-y-[40px] mt-[40px] justify-center ax-md:grid-rows-4 max-md:grid-cols-2 max-md:w-[98%] max-sm:grid-rows-8 max-sm:grid-cols-1 items-center'>
          {data?.map((i) => {
            return (
              <div
                className='shadow-md hover:shadow-xl'
                key={i}
                onClick={() => router.push(`${route.resources}/${i.id}`)}
              >
                <BlogBlock i={i} />
              </div>
            );
          })}
        </div>
      </NewsLayout>
      <Pagination
        isCompact
        showControls
        total={data?.pagination?.total_pages}
        initialPage={page}
        variant='light'
        size='lg'
        color='primary'
        onChange={(page) => setPage(page)}
      />
    </>
  );
};
export default Index;

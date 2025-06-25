'use client';
//react
import { useEffect, useState } from 'react';
//components
import Dropdown from '@/components/Dropdown/index';
import Hero from '@/components/Hero';
import InfluencersList from '@/module/influncer/template/influncer';
//layout
import AgencyLayout from '@/module/agency/layout/main';
import axios from 'axios';
import { BASE_URL } from '@/service/path';

const Influencers = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [filter, setFilter] = useState();
  const [ref, setRef] = useState([]);
  console.log('inf data ====> ', data)

  let FilterPagination = {
    filter: [
      {
        field_name: 'role.id',
        field_type: 'number',
        operation: '=',
        values: ['2'],
      },
    ],
    page_no: 0,
    per_page: 10,
    sort: 'created_at desc',
  };

  let FilterPagination1 = {
    default_param: [],
    filter: [
      {
        field_name: 'code',
        field_type: 'string',
        operation: '=',
        // value: 8,
        value: 'DIGITAL_CHANNELS',
      },
    ],
    page_no: 0,
    per_page: 10000,
    sort: 'created_at asc',
  };

  useEffect(() => {
    setLoader(true);

    axios
      .post(`${BASE_URL}/users/list`, FilterPagination)
      .then((result) => {
        setData(result?.data);
      })
      .catch((err) => {
        console.error('Error fetching users:', err);
      })
      .finally(() => {
        setLoader(false);
      });
  }, [filter]);

  useEffect(() => {
    getRef();
  }, []);

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const getRef = () => {
    setLoader(true);
    axios
      .post(`${BASE_URL}/reference/list`, FilterPagination1)
      .then((result) => {
        setRef(result?.data?.data);
        setFilter(result?.data?.data?.[0]?.ID);
      })
      .catch((err) => {
        console.error('Error fetching references:', err);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  return (
    <>
      {/* Full-width Influencers Page Header */}
      <div className="relative w-full h-[260px] md:h-[340px] overflow-hidden flex items-center">
        {/* SVG Background */}
        <img
          src="/assets/svg/top-inf.svg"
          alt="Influencers Header Background"
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        />
        {/* Left text */}
        <div className="relative z-10 pl-8 md:pl-32 flex-1">
          <p className="text-[#8557F4] text-sm font-medium mb-3">Navigation Top Influencers</p>
          <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">Influencers</h1>
          <p className="text-[#EAECF0] text-base md:text-lg">
            Хамгийн сүүлийн үеийн салбарын мэдээ, ярилцлага, технологи, нөөц.
          </p>
        </div>
      </div>
      {/* Main content inside AgencyLayout */}
      <AgencyLayout>
        <div className='flex w-[100%] justify-between mb-[32px]'>
          <div className='h-[44px] p-[4px] flex gap-[8px] rounded-[8px] border-[1px]  border-[#F2F4F7] border-[solid] bg-[#F2F4F7] mt-[48px]'>
            {ref?.map((i) => (
              <div
                key={i.ID}
                className={`flex items-center px-[8px] py-[8px] cursor-pointer hover:bg-[#FFF] ${
                  filter === i.ID && 'shadow-md rounded-[6px] bg-[#FFF]'
                }`}
                onClick={() => {
                  setFilter(i.ID);
                }}
              >
                <p className='text-[14px] font-[600] leading-[20px]'>
                  {i.name}
                </p>
              </div>
            ))}
          </div>
          <div className='flex items-end justify-start test-agency'>
            <Dropdown
              selectedOption={selectedOption}
              handler={handleDropdownChange}
            />
          </div>
        </div>
        {filter == 26 && <InfluencersList data={data} />}
      </AgencyLayout>
    </>
  );
};
export default Influencers;

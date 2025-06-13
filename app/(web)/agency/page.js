'use client';
//react
import { useContext, useEffect, useState } from 'react';
//components
import Dropdown from '@/components/Dropdown/index';
import Hero from '@/components/Hero';
import AgencyList from '@/module/agency/template/agency';
//layout
import AgencyLayout from '@/module/agency/layout/main';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/auth/authContext';
//server
import axios from 'axios';
import { BASE_URL } from '@/service/path';

const Agency = () => {
  const [filter, setFilter] = useState();
  const [selectedOption, setSelectedOption] = useState('');
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [ref, setRef] = useState([]);

  let pagination = {
    default_param: [
      // {
      //     key: 'string',
      //     value: 'string',
      // },
    ],
    filter: [
      {
        field_name: 'type.id',
        field_type: 'number',
        operation: '=',
        values: [String(filter)],
      },
    ],
    // glob_operation: 'string',
    page_no: 0,
    per_page: 10,
    sort: 'created_at desc',
  };

  let FilterPagination = {
    default_param: [],
    filter: [
      {
        field_name: 'code',
        field_type: 'string',
        operation: '=',
        // value: 8,
        value: 'AGENCY_TYPE',
      },
    ],
    glob_operation: 'string',
    page_no: 0,
    per_page: 0,
    sort: 'string',
  };

  useEffect(() => {
    setLoader(true);

    axios
      .post(`${BASE_URL}/agent/list`, pagination)
      .then((result) => {
        setData(result?.data);
      })
      .catch((err) => {
        return;
      })
      .finally(() => {
        setLoader(false);
      });
  }, [filter]);

  useEffect(() => {
    getRef();
  }, []);

  const getRef = () => {
    setLoader(true);
    axios
      .post(`${BASE_URL}/reference/list`, FilterPagination)
      .then((result) => {
        setRef(result?.data?.data);
        setFilter(result?.data?.data?.[0]?.ID);
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

  return (
    <>
      <div className='relative'>
        <Hero imageUrl={'/assets/photo/campaings.png'} />
     
      </div>
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
        <AgencyList data={data} />
      </AgencyLayout>
    </>
  );
};
export default Agency;

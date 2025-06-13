'use client';
//react
import { useContext, useEffect, useState } from 'react';
//components
import Dropdown from '@/components/Dropdown/index';
import Hero from '@/components/Hero';
import InfluencersList from '@/module/influncer/template/influncer';
//layout
import AgencyLayout from '@/module/agency/layout/main';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/auth/authContext';
//server
import axios from 'axios';
import { BASE_URL } from '@/service/path';
import { getcookie } from '@/service/utils';
import route from '@/route';
import { enqueueSnackbar } from 'notistack';

const Influencers = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const router = useRouter();
  const [filter, setFilter] = useState();
  const [ref, setRef] = useState([]);
  const {
    authFunc: { POST },
  } = useContext(AuthContext);
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
    const tk = getcookie('token');

    if (!tk) {
      enqueueSnackbar('Та эхлээд нэвтрэн үү', 'warning');
      router.push(route.signIn);
    }
    setLoader(true);

    axios
      .post(`${BASE_URL}/users/list`, FilterPagination)
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
        return;
      })
      .finally(() => {
        setLoader(false);
      });
  };

  return (
    <>
      <div className='relative'>
        <Hero imageUrl={'/assets/photo/campaings.png'} />
        <div className='absolute top-[40%] left-[20%] z-[10]'>
          <p className='text-[12px] font-[500] leading-[18px] text-[#8557F4] mb-[12px]'>
            Digital
          </p>
          <p className='text-[36px] font-[500] leading-[40px] tracking-[-1.44px] text-[#FFF] mb-[24px]'>
            Digital{' '}
            <span className='text-[36px] font-[700] leading-[40px] tracking-[-1.44px] text-[#FFF]'>
              Channels
            </span>
          </p>
          <p className='text-[16px] font-[400] leading-[28px] text-[#EAECF0]'>
            Хамгийн сүүлийн үеийн салбарын мэдээ, ярилцлага, технологи, нөөц.
          </p>
        </div>
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
        {filter == 26 && <InfluencersList data={data} />}
      </AgencyLayout>
    </>
  );
};
export default Influencers;

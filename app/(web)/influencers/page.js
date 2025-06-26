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
import Image from 'next/image';

const mockInfluencers = [
  {
    id: 1,
    name: '👽',
    username: '@maukiss__',
    country: 'Mongolia',
    avatar: '/assets/photo/inf1.png',
    followers: '438.3k',
    engagementRate: '2.51%',
    fakeFollowers: '14.07%',
    avgReelPlays: '276.3k',
    audienceLocation: [
      { country: 'Mongolia', percent: 81.77 },
      { country: 'South Korea', percent: 4.58 },
    ],
    audienceGender: { male: 20.64, female: 79.36 },
    hashtags: ['#huaweifreebuds4i', '#choreography', '#gasstationnightmarez'],
  },
  {
    id: 2,
    name: 'U J I N',
    username: '@ujin_buya',
    country: 'Mongolia',
    avatar: '/assets/influencers/inf2.png',
    followers: '293k',
    engagementRate: '3.72%',
    fakeFollowers: '24.60%',
    avgReelPlays: '679k',
    audienceLocation: [
      { country: 'Mongolia', percent: 83.84 },
      { country: 'South Korea', percent: 3.93 },
    ],
    audienceGender: { male: 20.22, female: 79.79 },
    hashtags: ['#website', '#choosepeace', '#захиалга'],
  },
  {
    id: 3,
    name: 'Ulzii-Orshikh Enkhmandakh',
    username: '@abyrav',
    country: 'Mongolia',
    avatar: '/assets/influencers/inf3.png',
    followers: '250.1k',
    engagementRate: '9.75%',
    fakeFollowers: '17.77%',
    avgReelPlays: '1m',
    audienceLocation: [
      { country: 'Mongolia', percent: 88.41 },
      { country: 'South Korea', percent: 2.44 },
    ],
    audienceGender: { male: 24.27, female: 75.73 },
    hashtags: ['#sosaootd', '#messege', '#blackс'],
  },
  {
    id: 4,
    name: 'Mongolian Actress',
    username: '@munkhsoyol.actress',
    country: 'Mongolia',
    avatar: '/assets/influencers/inf4.png',
    followers: '193.7k',
    engagementRate: '3.41%',
    fakeFollowers: '15.96%',
    avgReelPlays: '61.6k',
    audienceLocation: [
      { country: 'Mongolia', percent: 78.54 },
      { country: 'South Korea', percent: 5.17 },
    ],
    audienceGender: { male: 22.23, female: 77.77 },
    hashtags: ['#turkey', '#happynaadam', '#makeup'],
  },
  {
    id: 5,
    name: 'Ruby',
    username: '@rubyslvtr',
    country: 'Mongolia',
    avatar: '/assets/influencers/inf5.png',
    followers: '189.8k',
    engagementRate: '5.77%',
    fakeFollowers: '20.33%',
    avgReelPlays: '283.9k',
    audienceLocation: [
      { country: 'Mongolia', percent: 86.01 },
      { country: 'South Korea', percent: 3.36 },
    ],
    audienceGender: { male: 21.05, female: 78.95 },
    hashtags: ['#grwm', '#эерэгбүхнээхуваалцая', '#aigoogoy'],
  },
];

const Influencers = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [filter, setFilter] = useState();

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
      <div className="relative w-full h-[260px] md:h-[340px] overflow-hidden flex items-center mb-8">
        <img
          src="/assets/svg/top-inf.svg"
          alt="Influencers Header Background"
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        />
        <div className="relative z-10 pl-8 md:pl-32 flex-1">
          <p className="text-[#8557F4] text-sm font-medium mb-3">Top Influencers</p>
          <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">Mongolian Influencers</h1>
          <p className="text-[#EAECF0] text-base md:text-lg">
            Монголын хамгийн алдартай 5 инфлюенсерийн жагсаалт.
          </p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto py-10 space-y-8">
        {mockInfluencers.map((inf, idx) => (
          <div key={inf.id} className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row gap-6 border border-gray-100">
            {/* Profile and main info */}
            <div className="flex flex-col items-center md:w-1/4 min-w-[160px]">
              <Image
                src={inf.avatar}
                alt={inf.name}
                width={128}
                height={128}
                className="rounded-full object-cover mb-2 border border-gray-200 shadow-md"
                style={{ width: 128, height: 128 }}
                unoptimized
              />
              <div className="text-xl font-bold mt-2">{idx + 1}. {inf.name}</div>
              <div className="text-gray-500 text-sm">{inf.country}</div>
              <div className="text-blue-600 text-sm">{inf.username}</div>
              <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded font-semibold text-sm hover:bg-blue-700 transition">FULL PROFILE DATA</button>
            </div>
            {/* Stats and analytics */}
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div>
                <div className="font-medium text-xs text-gray-500">Followers</div>
                <div className="text-lg font-bold">{inf.followers}</div>
              </div>
              <div>
                <div className="font-medium text-xs text-gray-500">Engagement rate</div>
                <div className="text-lg font-bold">{inf.engagementRate}</div>
              </div>
              <div>
                <div className="font-medium text-xs text-gray-500">Fake Followers</div>
                <div className="text-lg font-bold">{inf.fakeFollowers}</div>
              </div>
              <div>
                <div className="font-medium text-xs text-gray-500">Average Reel plays</div>
                <div className="text-lg font-bold">{inf.avgReelPlays}</div>
              </div>
              <div className="col-span-2 mt-2">
                <div className="font-medium text-xs text-gray-500 mb-1">Audience location by country</div>
                <ul className="text-sm">
                  {inf.audienceLocation.map(loc => (
                    <li key={loc.country}>{loc.country}: <span className="font-semibold">{loc.percent}%</span></li>
                  ))}
                </ul>
              </div>
              <div className="col-span-2 mt-2">
                <div className="font-medium text-xs text-gray-500 mb-1">Audience gender</div>
                <div className="text-sm">Эрэгтэй: <span className="font-semibold">{inf.audienceGender.male}%</span> | Эмэгтэй: <span className="font-semibold">{inf.audienceGender.female}%</span></div>
              </div>
              <div className="col-span-2 mt-2">
                <div className="font-medium text-xs text-gray-500 mb-1">Most used #hashtags</div>
                <div className="flex flex-wrap gap-2">
                  {inf.hashtags.map(tag => (
                    <span key={tag} className="bg-gray-100 px-2 py-1 rounded text-xs">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Influencers;

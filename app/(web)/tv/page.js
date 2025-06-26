"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/auth/authContext";
import { getcookie } from "@/service/utils";
import { enqueueSnackbar } from "notistack";
import ChannelsList from "@/module/influncer/template/channels";
import AgencyLayout from "@/module/agency/layout/main";

const mockTVChannels = [
  {
    id: 1,
    name: 'TV 5',
    address: 'Улаанбаатар',
    tv_daily_avg_views: '2.5M',
    tv_univision_number: '101',
    social_links: {
      instagram: 'https://instagram.com/tv5',
      facebook: 'https://facebook.com/tv5',
    },
  },
  {
    id: 2,
    name: 'UBS',
    address: 'Дархан',
    tv_daily_avg_views: '1.8M',
    tv_univision_number: '102',
    social_links: {
      instagram: 'https://instagram.com/ubs',
    },
  },
  {
    id: 3,
    name: 'MNB',
    address: 'Эрдэнэт',
    tv_daily_avg_views: '1.2M',
    tv_univision_number: '103',
    social_links: {
      facebook: 'https://facebook.com/mnb',
    },
  },
];

const Index = () => {
  const [filter, setFilter] = useState(null);
  const [activeRole, setActiveRole] = useState(8);
  const [selectedOption, setSelectedOption] = useState("0");
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [page, setPage] = useState(1);
  const [ref, setRef] = useState([]);
  const [catName, setCatName] = useState('TV');
  const {
    authFunc: { POST },
  } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    getList();
  }, [activeRole, filter]);

  useEffect(() => {
    getRef();
  }, []);

  const getList = () => {
    setLoader(true);
    let pagination = {
      default_param: [{}],
      filter: filter
        ? [
            {
              field_name: "type.id",
              field_type: "number",
              operation: "=",
              values: [String(filter)],
            },
          ]
        : [],
      page_no: page - 1,
      per_page: 10,
      sort: "created_at desc",
    };
    POST("channel/list", true, pagination)
      .then((result) => {
        setData(result?.data);
      })
      .catch(() => {})
      .finally(() => {
        setLoader(false);
      });
  };

  const getRef = () => {
    const tk = getcookie("token");
    if (!tk) {
      enqueueSnackbar("Та эхлээд нэвтрэн үү", "warning");
    }
    setLoader(true);
    let FilterPagination = {
      default_param: [],
      filter: [
        {
          field_name: "code",
          field_type: "string",
          operation: "=",
          value: "CHANNEL_TYPE",
        },
      ],
      glob_operation: "string",
      page_no: 0,
      per_page: 10,
      sort: "created_at desc",
    };
    POST("reference/list", true, FilterPagination)
      .then((result) => {
        const tvCategory = result?.data.find((item) => item.name === "TV");
        setRef(tvCategory ? [tvCategory] : []);
        if (tvCategory) {
          setFilter(tvCategory.ID);
          setCatName(tvCategory.name);
        }
      })
      .catch(() => {})
      .finally(() => {
        setLoader(false);
      });
  };

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleFilterChange = (id, name) => {
    setFilter(id);
    setCatName(name);
  };

  return (
    <>
      {/* Full-width TV Page Header */}
      <div className="relative w-full h-[260px] md:h-[340px] overflow-hidden flex items-center">
        {/* SVG Background */}
        <img
          src="/assets/svg/tv-top.svg"
          alt="TV Header Background"
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        />
        {/* Left text */}
        <div className="relative z-10 pl-8 md:pl-32 flex-1">
          <p className="text-[#8557F4] text-sm font-medium mb-3">Campaigns</p>
          <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">Marketing campaigns</h1>
          <p className="text-[#EAECF0] text-base md:text-lg">
            Хамгийн сүүлийн үеийн салбарын мэдээ, ярилцлага, технологи, нөөц.
          </p>
        </div>
      </div>
      {/* Main content inside AgencyLayout */}
      <AgencyLayout>
        <div className="flex w-[100%] justify-between mb-[32px]">
          <div className="h-[44px] p-[4px] flex gap-[8px] rounded-[8px] border-[1px] border-[#F2F4F7] border-[solid] bg-[#F2F4F7] mt-[48px]">
            {ref?.map((i) => (
              <div
                key={i.ID}
                className={`flex items-center px-[8px] py-[8px] cursor-pointer rounded-[6px] ${
                  filter === i.ID
                    ? "bg-[#FFF] shadow-md"
                    : "hover:bg-[#FFF]"
                }`}
                onClick={() => handleFilterChange(i.ID, i.name)}
              >
                <p
                  className={`text-[14px] font-[600] leading-[20px] ${
                    filter === i.ID ? "text-[#000]" : "text-[#333]"
                  }`}
                >
                  {i.name}
                </p>
              </div>
            ))}
          </div>
        </div>
        <ChannelsList data={mockTVChannels} catName={catName} />
      </AgencyLayout>
    </>
  );
};

export default Index;

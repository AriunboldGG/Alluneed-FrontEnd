"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Hero from "@/components/Hero";
import Dropdown from "@/components/Dropdown/index";
import { AuthContext } from "@/context/auth/authContext";
import { getcookie } from "@/service/utils";
import { enqueueSnackbar } from "notistack";
import ChannelsList from "@/module/influncer/template/channels";
import AgencyLayout from "@/module/agency/layout/main";

const mockFMChannels = [
  {
    id: 1,
    name: 'FM1',
    address: 'Улаанбаатар',
    fm_daily_avg_listeners: '1.2M',
    fm_frequency: '98.5',
    social_links: {
      instagram: 'https://instagram.com/fm1',
      facebook: 'https://facebook.com/fm1',
    },
  },
  {
    id: 2,
    name: 'FM2',
    address: 'Дархан',
    fm_daily_avg_listeners: '800K',
    fm_frequency: '101.1',
    social_links: {
      instagram: 'https://instagram.com/fm2',
    },
  },
  {
    id: 3,
    name: 'FM3',
    address: 'Эрдэнэт',
    fm_daily_avg_listeners: '500K',
    fm_frequency: '104.3',
    social_links: {
      facebook: 'https://facebook.com/fm3',
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
  const [catName, setCatName] = useState('FM');

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
        console.log('result?.data=>', result?.data);
        
        setData(result?.data);
      })
      .catch((err) => {
        return;
      })
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
        const fmCategory = result?.data.find((item) => item.name === "FM");
        setRef(fmCategory ? [fmCategory] : []);  // Only keep the TV category
        if (fmCategory) {
          // setFilter(fmCategory.ID);  // Set the filter ID to TV category ID
          setCatName(fmCategory.name);
        }
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
      {/* FM Page Header - similar to TV */}
      <div className="relative w-full h-[260px] md:h-[340px] overflow-hidden flex items-center">
        {/* SVG or image background */}
        <img
          src="/assets/svg/tv-top.svg"
          alt="FM Header Background"
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        />
        {/* Left text */}
        <div className="relative z-10 pl-8 md:pl-32 flex-1">
          <p className="text-[#8557F4] text-sm font-medium mb-3">FM Channels</p>
          <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">FM</h1>
          <p className="text-[#EAECF0] text-base md:text-lg">
            Хамгийн сүүлийн үеийн FM мэдээ, статистик
          </p>
        </div>
      </div>
      <AgencyLayout>
        <ChannelsList data={mockFMChannels} catName={catName} />
      </AgencyLayout>
    </>
  );
};

export default Index;

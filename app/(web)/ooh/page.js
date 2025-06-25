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

const Index = () => {
  const [filter, setFilter] = useState(null);
  const [activeRole, setActiveRole] = useState(8);
  const [selectedOption, setSelectedOption] = useState("0");
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [page, setPage] = useState(1);
  const [ref, setRef] = useState([]);
  const [catName, setCatName] = useState("");

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
        // Filter to get only TV category, assuming "TV" is a known category name or ID
        const oohCategory = result?.data.find((item) => item.name === "ooh");
        setRef(oohCategory ? [oohCategory] : []); 
        if (oohCategory) {
          setFilter(oohCategory.ID);  
          setCatName(oohCategory.name);
        }
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

  const handleFilterChange = (id, name) => {
    setFilter(id);
    setCatName(name);
  };

  return (
    <>
      <div className="relative">
        <div className="absolute top-[40%] left-[20%]">
          <p className="text-[12px] font-[500] leading-[18px] text-[#8557F4] mb-[12px]">
            OOH
          </p>
          <p className="text-[36px] font-[500] leading-[40px] tracking-[-1.44px] text-[#050514] mb-[24px]">
            Hottest{" "}
            <span className="text-[36px] font-[700] leading-[40px] tracking-[-1.44px] text-[#050514]">
              Channels
            </span>
          </p>
          <p className="text-[16px] font-[400] leading-[28px] text-[#475467]">
            Хамгийн сүүлийн үеийн салбарын мэдээ, ярилцлага, технологи, нөөц.
          </p>
        </div>
      </div>
      <AgencyLayout>
        <div className="flex w-[100%] justify-between mb-[32px]">
          <div className="h-[44px] p-[4px] flex gap-[8px] rounded-[8px] border-[1px] border-[#F2F4F7] border-[solid] bg-[#F2F4F7] mt-[48px]">
            here is tabs
          </div>
        </div>

        <ChannelsList data={data} catName={catName} />
      </AgencyLayout>
    </>
  );
};

export default Index;

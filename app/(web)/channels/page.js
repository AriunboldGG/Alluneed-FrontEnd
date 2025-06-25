"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Dropdown from "@/components/Dropdown/index";
import ChannelsList from "@/module/influncer/template/channels";
import AgencyLayout from "@/module/agency/layout/main";
import axios from "axios";
import { BASE_URL } from "@/service/path";

const Index = () => {
  const [filter, setFilter] = useState(null);
  const [activeRole, setActiveRole] = useState(8);
  const [selectedOption, setSelectedOption] = useState("0");
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [page, setPage] = useState(1);
  const [ref, setRef] = useState([]);
  const [catName, setCatName] = useState('');

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

    axios
      .post(`${BASE_URL}/channel/list`, pagination)
      .then((result) => {
        setData(result?.data);
      })
      .catch((err) => {
        console.error('Error fetching channels:', err);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const getRef = () => {
    setLoader(true);

    let FilterPagination = {
      default_param: [
        // {
        //     key: 'string',
        //     value: 'string',
        // },
      ],
      filter: [
        {
          field_name: "code",
          field_type: "string",
          operation: "=",
          // value: 8,
          value: "CHANNEL_TYPE",
        },
      ],
      glob_operation: "string",
      page_no: 0,
      per_page: 10,
      sort: "created_at desc",
    };

    axios
      .post(`${BASE_URL}/reference/list`, FilterPagination)
      .then((result) => {
        setRef(result?.data);
      })
      .catch((err) => {
        console.error('Error fetching references:', err);
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
      <AgencyLayout>
        <div className="flex w-[100%] justify-between mb-[32px]">
        <div className="h-[44px] p-[4px] flex gap-[8px] rounded-[8px] border-[1px] border-[#F2F4F7] border-[solid] bg-[#F2F4F7] mt-[48px]">
  {ref?.map((i) => (
    <div
      key={i.ID}
      className={`flex items-center px-[8px] py-[8px] cursor-pointer rounded-[6px] ${
        filter === i.ID
          ? 'bg-[#FFF] shadow-md'  // Styles for active tab
          : 'hover:bg-[#FFF]'      // Styles for inactive tabs
      }`}
      onClick={() => handleFilterChange(i.ID, i.name)}
    >
      <p className={`text-[14px] font-[600] leading-[20px] ${
        filter === i.ID ? 'text-[#000]' : 'text-[#333]'
      }`}>
        {i.name}
      </p>
    </div>
  ))}
</div>

          <div className="flex items-end justify-start test-agency">
            <Dropdown
              selectedOption={selectedOption}
              handler={handleDropdownChange}
            />
          </div>
        </div>

        <ChannelsList data={data} catName={catName} />
      </AgencyLayout>
    </>
  );
};

export default Index;

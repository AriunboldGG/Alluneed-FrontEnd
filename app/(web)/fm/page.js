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
      <div className="relative">
        <Hero imageUrl={"/assets/photo/blogs.png"} />
        <div className="absolute top-[40%] left-[20%]">
          <p className="text-[12px] font-[500] leading-[18px] text-[#8557F4] mb-[12px]">
            FM
          </p>
          <p className="text-[36px] font-[500] leading-[40px] tracking-[-1.44px] text-[#050514] mb-[24px]">
            Hottest{" "}
            <span className="text-[36px] font-[700] leading-[40px] tracking-[-1.44px] text-[#050514]">
              Channels List
            </span>
          </p>
          <p className="text-[16px] font-[400] leading-[28px] text-[#475467]">
            Хамгийн сүүлийн үеийн FM мэдээ, статистик
          </p>
        </div>
      </div>
      <AgencyLayout>

        <ChannelsList data={data} catName={catName} />
      </AgencyLayout>
    </>
  );
};

export default Index;

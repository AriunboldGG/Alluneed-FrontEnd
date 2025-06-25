"use client";
import { useState } from "react";
import ChannelsBlock from "@/components/Block/traditionalChannel/channels";
import LedsBlock from "@/components/Block/traditionalChannel/OOH/leds";
import Decaux from "@/components/Block/traditionalChannel/OOH/decauxChannel"
import Liftboard from '@/components/Block/traditionalChannel/OOH/Liftboard'
import Ccts from '@/components/Block/traditionalChannel/OOH/Liftboard'
import Newspaper from '@/components/Block/traditionalChannel/Prints/newspaper'
import { Pagination } from "@nextui-org/react";

const Index = ({ data, catName }) => {
  // const [ref, setRef] = useState([]);
  console.log("refff=>", catName);

  return (
    <div className="w-[100%] flex flex-col gap-[24px] mb-[32px] items-center">
      {data?.map((item, i) => {
        return (
          <div className="shadow-sm hover:shadow-md w-[100%]" key={i}>
            {(() => {
              switch (catName) {
                case "TV":
                  return <ChannelsBlock item={item} index={i} catName={catName} />;
                case "FM":
                  return <ChannelsBlock item={item} index={i} catName={catName} />;
                case "OOH":
                  return <LedsBlock item={item} index={i} />;
                case "decaux":
                  return <Decaux  item={item} index={i} />
                case "ccts":
                  return <Ccts item={item} index={i} />
                case "Liftboards":
                  return <Liftboard item={item} index = {'0'}/>
                case "Newspaper":
                  return <Newspaper />
                case "Print":
                  return <Newspaper />
                case "Address":
                  return <Newspaper />
                case "Magazine":
                  return <Newspaper />

                default:
                  return <ChannelsBlock item={item} index={i} catName={catName} />; // or some default component
              }
            })()}
          </div>
        );
      })}
      <Pagination
        isCompact
        showControls
        total={data?.pagination?.total_pages}
        initialPage={1}
        variant="light"
        size="lg"
        color="primary"
      />
    </div>
  );
};

export default Index;

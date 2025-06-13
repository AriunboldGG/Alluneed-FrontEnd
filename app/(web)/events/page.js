"use client";
//react
import { useState } from "react";
//components
import Hero from "@/components/Hero";
//layout

import { Chrono } from "react-chrono";

const tabItem = [
  { id: "1", name: "Бүгд" },
  { id: "2", name: "Контент бүтээгч" },
  { id: "3", name: "Сошиал медиа" },
];

const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];

const Events = () => {
  const [filter, setFilter] = useState("1");
  const [selectedOption, setSelectedOption] = useState("");

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const items = [
    {
      title: "Рэппэр “BIG GEE” THE LEGACY BIG CONCERT.",
      cardTitle: "Wireframing гэж юу вэ?",
      url: "https://shoppy.mn/products/the-legacy",
      cardSubtitle:
        "Рэппэр “BIG GEE”-ийн 4 дэх тоглолт болох THE LEGACY BIG CONCERT.",
      cardDetailedText:
        "Men of the British Expeditionary Force (BEF) wade out to..",
      media: {
        type: "IMAGE",
        source: {
          url: "https://photo-cdn2.icons8.com/Zbto5A04c6fWW8nMdfxir_LVDJtna39iNn4FJDnugjk/rs:fit:1608:1072/czM6Ly9pY29uczgu/bW9vc2UtcHJvZC5l/eHRlcm5hbC9hMmE0/Mi9hYmY2YWFkYjE2/MWU0OWRiOWUzN2Iz/MDJkY2UyYmQzZC5q/cGc.jpg",
        },
      },
    },
    {
      title: "Улаанбаатар - Аюуд Тауэр",
      cardTitle: "Wireframing гэж юу вэ?",
      url: "https://shoppy.mn/products/the-legacy",
      cardSubtitle:
        "Рэппэр “BIG GEE”-ийн 4 дэх тоглолт болох THE LEGACY BIG CONCERT.",
      cardDetailedText:
        "Men of the British Expeditionary Force (BEF) wade out to..",
      media: {
        type: "IMAGE",
        source: {
          url: "https://photo-cdn2.icons8.com/u9sgMWbNpy0WZQ65jrouJF86Zg7fn8MBKwU7vh2lAB4/rs:fit:1608:1072/czM6Ly9pY29uczgu/bW9vc2UtcHJvZC5l/eHRlcm5hbC9hMmE0/Mi8yNzk1MGM3ODQw/YWU0N2QyODA5MzEz/MTg4YTFjOTdmYy5q/cGc.jpg",
        },
      },
    },
    {
      title: "May 1940",
      cardTitle: "Wireframing гэж юу вэ?",
      url: "https://shoppy.mn/products/the-legacy",
      cardSubtitle:
        "Рэппэр “BIG GEE”-ийн 4 дэх тоглолт болох THE LEGACY BIG CONCERT.",
      cardDetailedText:
        "Men of the British Expeditionary Force (BEF) wade out to..",
      media: {
        type: "IMAGE",
        source: {
          url: "https://photo-cdn2.icons8.com/_I7_0GIyNf1l7Skf2-aiUC6eASqE0VvvdfCV8MlykVw/rs:fit:1608:1072/czM6Ly9pY29uczgu/bW9vc2UtcHJvZC5l/eHRlcm5hbC9hMmE0/Mi8wZTNhNDI4NDYw/NWM0ZTllOWQ2YzFi/YTlhOGYwYzU5NS5q/cGc.jpg",
        },
      },
    },
    {
      title: "Summer Flash",
      cardTitle: "Wireframing гэж юу вэ?",
      url: "https://shoppy.mn/products/the-legacy",
      cardSubtitle:
        "Рэппэр “BIG GEE”-ийн 4 дэх тоглолт болох THE LEGACY BIG CONCERT.",
      cardDetailedText:
        "Men of the British Expeditionary Force (BEF) wade out to..",
      media: {
        type: "IMAGE",
        source: {
          url: "https://photo-cdn2.icons8.com/_I7_0GIyNf1l7Skf2-aiUC6eASqE0VvvdfCV8MlykVw/rs:fit:1608:1072/czM6Ly9pY29uczgu/bW9vc2UtcHJvZC5l/eHRlcm5hbC9hMmE0/Mi8wZTNhNDI4NDYw/NWM0ZTllOWQ2YzFi/YTlhOGYwYzU5NS5q/cGc.jpg",
        },
      },
    },
    {
      title: "Playtime 2024",
      cardTitle: "Wireframing гэж юу вэ?",
      url: "https://shoppy.mn/products/the-legacy",
      cardSubtitle:
        "Рэппэр “BIG GEE”-ийн 4 дэх тоглолт болох THE LEGACY BIG CONCERT.",
      cardDetailedText:
        "Men of the British Expeditionary Force (BEF) wade out to..",
      media: {
        type: "IMAGE",
        source: {
          url: "https://photo-cdn2.icons8.com/_I7_0GIyNf1l7Skf2-aiUC6eASqE0VvvdfCV8MlykVw/rs:fit:1608:1072/czM6Ly9pY29uczgu/bW9vc2UtcHJvZC5l/eHRlcm5hbC9hMmE0/Mi8wZTNhNDI4NDYw/NWM0ZTllOWQ2YzFi/YTlhOGYwYzU5NS5q/cGc.jpg",
        },
      },
    },
    {
      title: "May 1940",
      cardTitle: "Wireframing гэж юу вэ?",
      url: "https://shoppy.mn/products/the-legacy",
      cardSubtitle:
        "Рэппэр “BIG GEE”-ийн 4 дэх тоглолт болох THE LEGACY BIG CONCERT.",
      cardDetailedText:
        "Men of the British Expeditionary Force (BEF) wade out to..",
      media: {
        type: "IMAGE",
        source: {
          url: "https://photo-cdn2.icons8.com/_I7_0GIyNf1l7Skf2-aiUC6eASqE0VvvdfCV8MlykVw/rs:fit:1608:1072/czM6Ly9pY29uczgu/bW9vc2UtcHJvZC5l/eHRlcm5hbC9hMmE0/Mi8wZTNhNDI4NDYw/NWM0ZTllOWQ2YzFi/YTlhOGYwYzU5NS5q/cGc.jpg",
        },
      },
    },
    {
      title: "Rapper TSETSE concert",
      cardTitle: "Wireframing гэж юу вэ?",
      url: "https://shoppy.mn/products/the-legacy",
      cardSubtitle:
        "Рэппэр “BIG GEE”-ийн 4 дэх тоглолт болох THE LEGACY BIG CONCERT.",
      cardDetailedText:
        "Men of the British Expeditionary Force (BEF) wade out to..",
      media: {
        type: "IMAGE",
        source: {
          url: "https://photo-cdn2.icons8.com/_I7_0GIyNf1l7Skf2-aiUC6eASqE0VvvdfCV8MlykVw/rs:fit:1608:1072/czM6Ly9pY29uczgu/bW9vc2UtcHJvZC5l/eHRlcm5hbC9hMmE0/Mi8wZTNhNDI4NDYw/NWM0ZTllOWQ2YzFi/YTlhOGYwYzU5NS5q/cGc.jpg",
        },
      },
    },
    {
      title: "ARA Event",
      cardTitle: "Wireframing гэж юу вэ?",
      url: "https://shoppy.mn/products/the-legacy",
      cardSubtitle:
        "Рэппэр “BIG GEE”-ийн 4 дэх тоглолт болох THE LEGACY BIG CONCERT.",
      cardDetailedText:
        "Men of the British Expeditionary Force (BEF) wade out to..",
      media: {
        type: "IMAGE",
        source: {
          url: "https://photo-cdn2.icons8.com/_I7_0GIyNf1l7Skf2-aiUC6eASqE0VvvdfCV8MlykVw/rs:fit:1608:1072/czM6Ly9pY29uczgu/bW9vc2UtcHJvZC5l/eHRlcm5hbC9hMmE0/Mi8wZTNhNDI4NDYw/NWM0ZTllOWQ2YzFi/YTlhOGYwYzU5NS5q/cGc.jpg",
        },
      },
    },
  ];
  return (
    <>
      <div className="relative">
        <Hero imageUrl={"/assets/photo/campaings.png"} />
        <div className="absolute top-[40%] left-[20%] z-[9999]">
          <p className="text-[12px] font-[500] leading-[18px] text-[#8557F4] mb-[12px]">
            Marketing Events
          </p>
          <p className="text-[36px] font-[500] leading-[40px] tracking-[-1.44px] text-[#FFF] mb-[24px]">
            Events{" "}
          </p>
          <p className="text-[16px] font-[400] leading-[28px] text-[#EAECF0]">
            Хамгийн сүүлийн үеийн салбарын мэдээ, ярилцлага, технологи, нөөц.
          </p>
        </div>
      </div>
      {/* <EventsLayout>
        <div className="flex w-[100%] justify-between mb-[32px]">
          <div className="flex w-[100%] justify-between mt-[48px] mb-[40px]">
            <Dropdown
              selectedOption={selectedOption}
              handler={handleDropdownChange}
            />
            <Dropdown
              selectedOption={selectedOption}
              handler={handleDropdownChange}
            />
            <Dropdown
              selectedOption={selectedOption}
              handler={handleDropdownChange}
            />
            <Dropdown
              selectedOption={selectedOption}
              handler={handleDropdownChange}
            />
          </div>
        </div>
      </EventsLayout> */}
      <Chrono items={items} mode="HORIZONTAL"></Chrono>
    </>
  );
};
export default Events;

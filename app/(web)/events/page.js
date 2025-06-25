"use client";
//react
import { useState } from "react";
//components
//layout

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
      title: 'Рэппэр "BIG GEE" THE LEGACY BIG CONCERT.',
      cardTitle: 'Wireframing гэж юу вэ?',
      url: 'https://shoppy.mn/products/the-legacy',
      cardSubtitle: 'Рэппэр "BIG GEE"-ийн 4 дэх тоглолт болох THE LEGACY BIG CONCERT.',
      cardDetailedText: 'Men of the British Expeditionary Force (BEF) wade out to..',
      media: {
        type: 'IMAGE',
        source: {
          url: 'https://photo-cdn2.icons8.com/Zbto5A04c6fWW8nMdfxir_LVDJtna39iNn4FJDnugjk/rs:fit:1608:1072/czM6Ly9pY29uczgu/bW9vc2UtcHJvZC5l/eHRlcm5hbC9hMmE0/Mi9hYmY2YWFkYjE2/MWU0OWRiOWUzN2Iz/MDJkY2UyYmQzZC5q/cGc.jpg',
        },
      },
    },
    {
      title: 'Улаанбаатар - Аюуд Тауэр',
      cardTitle: 'Wireframing гэж юу вэ?',
      url: 'https://shoppy.mn/products/the-legacy',
      cardSubtitle: 'Рэппэр "BIG GEE"-ийн 4 дэх тоглолт болох THE LEGACY BIG CONCERT.',
      cardDetailedText: 'Men of the British Expeditionary Force (BEF) wade out to..',
      media: {
        type: 'IMAGE',
        source: {
          url: 'https://photo-cdn2.icons8.com/u9sgMWbNpy0WZQ65jrouJF86Zg7fn8MBKwU7vh2lAB4/rs:fit:1608:1072/czM6Ly9pY29uczgu/bW9vc2UtcHJvZC5l/eHRlcm5hbC9hMmE0/Mi8yNzk1MGM3ODQw/YWU0N2QyODA5MzEz/MTg4YTFjOTdmYy5q/cGc.jpg',
        },
      },
    },
    {
      title: 'May 1940',
      cardTitle: 'Wireframing гэж юу вэ?',
      url: 'https://shoppy.mn/products/the-legacy',
      cardSubtitle: 'Рэппэр "BIG GEE"-ийн 4 дэх тоглолт болох THE LEGACY BIG CONCERT.',
      cardDetailedText: 'Men of the British Expeditionary Force (BEF) wade out to..',
      media: {
        type: 'IMAGE',
        source: {
          url: 'https://photo-cdn2.icons8.com/_I7_0GIyNf1l7Skf2-aiUC6eASqE0VvvdfCV8MlykVw/rs:fit:1608:1072/czM6Ly9pY29uczgu/bW9vc2UtcHJvZC5l/eHRlcm5hbC9hMmE0/Mi8wZTNhNDI4NDYw/NWM0ZTllOWQ2YzFi/YTlhOGYwYzU5NS5q/cGc.jpg',
        },
      },
    },
    {
      title: 'Summer Flash',
      cardTitle: 'Wireframing гэж юу вэ?',
      url: 'https://shoppy.mn/products/the-legacy',
      cardSubtitle: 'Рэппэр "BIG GEE"-ийн 4 дэх тоглолт болох THE LEGACY BIG CONCERT.',
      cardDetailedText: 'Men of the British Expeditionary Force (BEF) wade out to..',
      media: {
        type: 'IMAGE',
        source: {
          url: 'https://photo-cdn2.icons8.com/_I7_0GIyNf1l7Skf2-aiUC6eASqE0VvvdfCV8MlykVw/rs:fit:1608:1072/czM6Ly9pY29uczgu/bW9vc2UtcHJvZC5l/eHRlcm5hbC9hMmE0/Mi8wZTNhNDI4NDYw/NWM0ZTllOWQ2YzFi/YTlhOGYwYzU5NS5q/cGc.jpg',
        },
      },
    },
    {
      title: 'Playtime 2024',
      cardTitle: 'Wireframing гэж юу вэ?',
      url: 'https://shoppy.mn/products/the-legacy',
      cardSubtitle: 'Рэппэр "BIG GEE"-ийн 4 дэх тоглолт болох THE LEGACY BIG CONCERT.',
      cardDetailedText: 'Men of the British Expeditionary Force (BEF) wade out to..',
      media: {
        type: 'IMAGE',
        source: {
          url: 'https://photo-cdn2.icons8.com/_I7_0GIyNf1l7Skf2-aiUC6eASqE0VvvdfCV8MlykVw/rs:fit:1608:1072/czM6Ly9pY29uczgu/bW9vc2UtcHJvZC5l/eHRlcm5hbC9hMmE0/Mi8wZTNhNDI4NDYw/NWM0ZTllOWQ2YzFi/YTlhOGYwYzU5NS5q/cGc.jpg',
        },
      },
    },
    {
      title: 'May 1940',
      cardTitle: 'Wireframing гэж юу вэ?',
      url: 'https://shoppy.mn/products/the-legacy',
      cardSubtitle: 'Рэппэр "BIG GEE"-ийн 4 дэх тоглолт болох THE LEGACY BIG CONCERT.',
      cardDetailedText: 'Men of the British Expeditionary Force (BEF) wade out to..',
      media: {
        type: 'IMAGE',
        source: {
          url: 'https://photo-cdn2.icons8.com/_I7_0GIyNf1l7Skf2-aiUC6eASqE0VvvdfCV8MlykVw/rs:fit:1608:1072/czM6Ly9pY29uczgu/bW9vc2UtcHJvZC5l/eHRlcm5hbC9hMmE0/Mi8wZTNhNDI4NDYw/NWM0ZTllOWQ2YzFi/YTlhOGYwYzU5NS5q/cGc.jpg',
        },
      },
    },
    {
      title: 'Rapper TSETSE concert',
      cardTitle: 'Wireframing гэж юу вэ?',
      url: 'https://shoppy.mn/products/the-legacy',
      cardSubtitle: 'Рэппэр "BIG GEE"-ийн 4 дэх тоглолт болох THE LEGACY BIG CONCERT.',
      cardDetailedText: 'Men of the British Expeditionary Force (BEF) wade out to..',
      media: {
        type: 'IMAGE',
        source: {
          url: 'https://photo-cdn2.icons8.com/_I7_0GIyNf1l7Skf2-aiUC6eASqE0VvvdfCV8MlykVw/rs:fit:1608:1072/czM6Ly9pY29uczgu/bW9vc2UtcHJvZC5l/eHRlcm5hbC9hMmE0/Mi8wZTNhNDI4NDYw/NWM0ZTllOWQ2YzFi/YTlhOGYwYzU5NS5q/cGc.jpg',
        },
      },
    },
    {
      title: 'ARA Event',
      cardTitle: 'Wireframing гэж юу вэ?',
      url: 'https://shoppy.mn/products/the-legacy',
      cardSubtitle: 'Рэппэр "BIG GEE"-ийн 4 дэх тоглолт болох THE LEGACY BIG CONCERT.',
      cardDetailedText: 'Men of the British Expeditionary Force (BEF) wade out to..',
      media: {
        type: 'IMAGE',
        source: {
          url: 'https://photo-cdn2.icons8.com/_I7_0GIyNf1l7Skf2-aiUC6eASqE0VvvdfCV8MlykVw/rs:fit:1608:1072/czM6Ly9pY29uczgu/bW9vc2UtcHJvZC5l/eHRlcm5hbC9hMmE0/Mi8wZTNhNDI4NDYw/NWM0ZTllOWQ2YzFi/YTlhOGYwYzU5NS5q/cGc.jpg',
        },
      },
    },
  ];
  return (
    <>
      {/* Modern Event Page Header */}
      <div className="relative w-full h-[260px] md:h-[340px] bg-[#0A0914] overflow-hidden flex items-center">
        {/* Grid background */}
        <div className="absolute inset-0 z-0">
          <svg width="100%" height="100%" className="w-full h-full" style={{ opacity: 0.12 }}>
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#fff" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        {/* Left text */}
        <div className="relative z-10 pl-8 md:pl-32 flex-1">
          <p className="text-[#8557F4] text-sm font-medium mb-3">Marketing Events</p>
          <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">Events</h1>
          <p className="text-[#EAECF0] text-base md:text-lg">
            Хамгийн сүүлийн үеийн салбарын мэдээ, ярилцлага, технологи, нөөц.
          </p>
        </div>
        {/* Right cubes */}
        <div className="hidden md:flex relative z-10 pr-16 gap-6">
          <img src="/assets/cube.png" alt="cube" className="w-20 h-20" style={{ filter: 'hue-rotate(0deg)' }} />
          <img src="/assets/cube.png" alt="cube" className="w-20 h-20" style={{ filter: 'hue-rotate(60deg)' }} />
          <img src="/assets/cube.png" alt="cube" className="w-20 h-20" style={{ filter: 'hue-rotate(120deg)' }} />
          <img src="/assets/cube.png" alt="cube" className="w-20 h-20" style={{ filter: 'hue-rotate(180deg)' }} />
          <img src="/assets/cube.png" alt="cube" className="w-20 h-20" style={{ filter: 'hue-rotate(240deg)' }} />
        </div>
      </div>
      {/* Modern Timeline */}
      <div className="relative w-full max-w-3xl mx-auto py-16">
        <div className="border-l-4 border-[#8557F4] absolute h-full left-6 top-0 z-0" />
        <div className="flex flex-col gap-12 relative z-10">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-start gap-6 relative">
              {/* Timeline dot */}
              <div className="w-6 flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-[#8557F4] border-4 border-white shadow-lg z-10" />
                {idx !== items.length - 1 && (
                  <div className="flex-1 w-1 bg-[#8557F4] mx-auto" />
                )}
              </div>
              {/* Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 flex-1">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {item.media?.source?.url && (
                    <img
                      src={item.media.source.url}
                      alt={item.title}
                      className="w-32 h-20 object-cover rounded-lg"
                    />
                  )}
                  <div>
                    <h3 className="text-lg font-bold text-[#8557F4] mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-700 mb-2">{item.cardSubtitle}</p>
                    <p className="text-xs text-gray-500">{item.cardDetailedText}</p>
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-2 text-[#8557F4] font-semibold underline"
                      >
                        Дэлгэрэнгүй
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Events;

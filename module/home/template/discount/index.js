'use client';

import { Image } from '@nextui-org/react';

const data = [
  {
    label: "Maker's Mark",
    title: "Make Your Mark",
    author: "By Leo Burnett",
    img: 'assets/photo/image3.png',
    showPlay: true,
  },
  {
    label: "Symetra",
    title: "Breathe",
    author: "By Copacino Fujikado",
    img: 'assets/photo/sale1.png',
    showPlay: false,
  },
  {
    label: "Virgin Plus",
    title: "Obviously",
    author: "By Zulu Alpha Kilo",
    img: 'assets/photo/sale2.png',
    showPlay: false,
  },
];

const Index = () => {
  return (
    <div className="flex w-full justify-center gap-8 max-md:flex-col py-8 bg-[#fafbfc]">
      {data.map((item, i) => (
        <div
          key={i}
          className="relative rounded-xl overflow-hidden shadow-lg min-w-[320px] max-w-[360px] w-full h-[240px] flex-shrink-0 bg-black"
        >
          {/* Image */}
          <Image
            src={item.img}
            alt={item.title}
            className="object-cover w-full h-full"
            removeWrapper
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          {/* Label pill */}
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-[#8557F4CC] text-white text-xs font-semibold px-4 py-1 rounded-full">
              {item.label}
            </span>
          </div>
          {/* Play icon for first card */}
          {item.showPlay && (
            <div className="absolute top-4 right-4 z-10 flex items-center justify-center w-8 h-8 bg-white/80 rounded-full">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="#8557F4">
                <polygon points="6,4 16,10 6,16" />
              </svg>
            </div>
          )}
          {/* Title and author */}
          <div className="absolute left-4 bottom-6 z-10">
            <div className="text-white text-lg font-semibold drop-shadow mb-1">{item.title}</div>
            <div className="text-white text-xs font-normal opacity-80">{item.author}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Index;
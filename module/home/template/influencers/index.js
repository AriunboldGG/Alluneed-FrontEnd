import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useRef } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';

const influencers = [
  { img: '/assets/influencers/1.svg', color: 'bg-[#FFD600]' },
  { img: '/assets/influencers/2.svg', color: 'bg-[#FF4F8B]' },
  { img: '/assets/influencers/3.svg', color: 'bg-[#7B61FF]' },
  { img: '/assets/influencers/4.svg', color: 'bg-[#FF4F8B]' },
  { img: '/assets/influencers/5.svg', color: 'bg-[#FFD600]' },
  { img: '/assets/influencers/6.svg', color: 'bg-[#7B61FF]' },
  { img: '/assets/influencers/7.svg', color: 'bg-[#FF4F8B]' },
  { img: '/assets/influencers/8.svg', color: 'bg-[#FFD600]' },
  { img: '/assets/influencers/9.svg', color: 'bg-[#7B61FF]' },
  { img: '/assets/influencers/10.svg', color: 'bg-[#FF4F8B]' },
  { img: '/assets/influencers/11.svg', color: 'bg-[#FFD600]' },
  { img: '/assets/influencers/12.svg', color: 'bg-[#7B61FF]' },
  { img: '/assets/influencers/13.svg', color: 'bg-[#FF4F8B]' },
  { img: '/assets/influencers/14.svg', color: 'bg-[#FFD600]' },
  { img: '/assets/influencers/15.svg', color: 'bg-[#7B61FF]' },
  { img: '/assets/influencers/16.svg', color: 'bg-[#FF4F8B]' },
];

// Helper to chunk influencers into groups of 16
function chunkInfluencers(arr, size = 16) {
  const res = [];
  for (let i = 0; i < arr.length; i += size) {
    res.push(arr.slice(i, i + size));
  }
  return res;
}

const Influencers = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const influencerChunks = chunkInfluencers(influencers, 16);

  return (
    <div className="relative flex flex-col items-center justify-center py-16 w-full bg-[#0B0B23] rounded-2xl">
      <p className="text-[#FFF] text-[32px] md:text-[40px] font-[400] leading-[40px] tracking-[-0.64px] mb-8 text-center">
        Hottest <span className="font-bold">Influencers</span>
      </p>
      {/* Slider navigation buttons */}
      <button
        ref={prevRef}
        className="swiper-prev absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-[#22223B]/80 hover:bg-[#FF4F8B] transition-colors"
      >
        <Image src="/assets/icons/leftSlider.svg" alt="prev" width={24} height={24} />
      </button>
      <button
        ref={nextRef}
        className="swiper-next absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-[#22223B]/80 hover:bg-[#FF4F8B] transition-colors"
      >
        <Image src="/assets/icons/rightSlider.svg" alt="next" width={24} height={24} />
      </button>
      <Swiper
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        modules={[Navigation]}
        className="w-full max-w-5xl"
      >
        {influencerChunks.map((chunk, idx) => {
          const row1 = chunk.slice(0, 8);
          const row2 = chunk.slice(8, 16);
          return (
            <SwiperSlide key={idx}>
              <div className="flex flex-col gap-8">
                <div className="flex flex-row gap-8 justify-center flex-wrap">
                  {row1.map((item, i) => (
                    <div key={i} className="flex items-center justify-center">
                      <div className={`w-[70px] h-[70px] md:w-[80px] md:h-[80px] rounded-full flex items-center justify-center ${item.color}`}>
                        <Image
                          src={item.img}
                          alt={`influencer-${i}`}
                          width={64}
                          height={64}
                          className="rounded-full object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-row gap-8 justify-center flex-wrap">
                  {row2.map((item, i) => (
                    <div key={i} className="flex items-center justify-center">
                      <div className={`w-[70px] h-[70px] md:w-[80px] md:h-[80px] rounded-full flex items-center justify-center ${item.color}`}>
                        <Image
                          src={item.img}
                          alt={`influencer-${i + 8}`}
                          width={64}
                          height={64}
                          className="rounded-full object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Link href="/influencers" className="mt-10">
        <div className="w-[160px] h-[44px] py-[10px] px-[16px] flex justify-center items-center bg-[#8557F4] rounded-[8px] hover:bg-[#6C3EE7] transition-colors">
          <span className="text-[#FFF] text-[16px] font-[600] leading-[20px]">Бүх Influencers</span>
        </div>
      </Link>
    </div>
  );
};

export default Influencers;
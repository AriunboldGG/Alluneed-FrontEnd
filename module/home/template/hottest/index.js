import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/navigation';

const channels = [
  { img: '/assets/channels/1.png', color: 'bg-[#FFD600]' },
  { img: '/assets/channels/2.png', color: 'bg-[#7B61FF]' },
  { img: '/assets/channels/3.png', color: 'bg-[#FF4F8B]' },
  { img: '/assets/channels/4.png', color: 'bg-[#FF4F8B]' },
  { img: '/assets/channels/5.png', color: 'bg-[#FFD600]' },
  { img: '/assets/channels/6.png', color: 'bg-[#7B61FF]' },
  { img: '/assets/channels/7.png', color: 'bg-[#FF4F8B]' },
  { img: '/assets/channels/8.png', color: 'bg-[#FFD600]' },
];

const marketers = [
  { img: '/assets/marketers/1.png', color: 'bg-[#FFD600]' },
  { img: '/assets/marketers/2.png', color: 'bg-[#FF4F8B]' },
  { img: '/assets/marketers/3.png', color: 'bg-[#7B61FF]' },
  { img: '/assets/marketers/4.png', color: 'bg-[#FF4F8B]' },
  { img: '/assets/marketers/5.png', color: 'bg-[#FFD600]' },
  { img: '/assets/marketers/6.png', color: 'bg-[#7B61FF]' },
  { img: '/assets/marketers/7.png', color: 'bg-[#FF4F8B]' },
  { img: '/assets/marketers/8.png', color: 'bg-[#FFD600]' },
];

const Index = () => {
  return (
    <div className="w-full flex justify-center items-center min-h-[500px] relative"
      style={{ background: 'linear-gradient(90deg, #050514 50%, #2B0A3D 50%)' }}
    >
      {/* Left: Channels */}
      <div className="flex-1 flex flex-col items-center justify-center py-12 relative z-10"
        style={{ background: "url('/icons/slider-home.svg') left center / cover no-repeat" }}
      >
        <div className="mb-4 flex items-center gap-2">
          <span className="text-[#FFD600] text-xl font-bold">Hottest</span>
          <span className="text-white text-xl font-bold">Channels</span>
          <div className="flex gap-1 ml-4">
            <button className="group w-7 h-7 flex items-center justify-center rounded bg-[#22223B]/80 hover:bg-[#FF4F8B] transition-colors">
              <Image src="assets/icons/leftSmall.svg" alt="prev" width={16} height={16} />
            </button>
            <button className="group w-7 h-7 flex items-center justify-center rounded bg-[#22223B]/80 hover:bg-[#FF4F8B] transition-colors">
              <Image src="assets/icons/rightSmall.svg" alt="next" width={16} height={16} />
            </button>
          </div>
        </div>
        <Swiper
          slidesPerView={4}
          spaceBetween={24}
          modules={[Navigation]}
          navigation={{
            prevEl: '.channels-prev',
            nextEl: '.channels-next',
          }}
          className="w-full max-w-[350px] mb-4"
        >
          {channels.map((item, i) => (
            <SwiperSlide key={i}>
              <div className={`w-[70px] h-[70px] rounded-full flex items-center justify-center ${item.color}`}>
                <Image src={item.img} alt={`channel-${i}`} width={50} height={50} className="rounded-full object-cover" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Dots grid for extra icons */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="w-8 h-8 rounded-full bg-[#FF4F8B]" />
          <div className="w-8 h-8 rounded-full bg-[#FFD600]" />
          <div className="w-8 h-8 rounded-full bg-[#7B61FF]" />
          <div className="w-8 h-8 rounded-full bg-[#FFD600]" />
          <div className="w-8 h-8 rounded-full bg-[#7B61FF]" />
          <div className="w-8 h-8 rounded-full bg-[#FF4F8B]" />
        </div>
      </div>

      {/* Center Cube */}
      <div className="flex flex-col items-center justify-center z-20 px-8">
        <Image src="/assets/cube.png" alt="cube" width={120} height={120} />
        <div className="flex gap-2 mt-6">
          <Link href="/youtube-money">
            <div className="flex flex-col items-center justify-center bg-[#2B0A3D] rounded-[8px] px-4 py-2 cursor-pointer hover:bg-[#8557F4] transition-colors">
              <Image src="/assets/youtube.png" alt="YouTube" width={32} height={32} />
              <span className="text-white text-xs mt-1">YouTube Money Calculator</span>
            </div>
          </Link>
          <Link href="/instagram-hash">
            <div className="flex flex-col items-center justify-center bg-[#2B0A3D] rounded-[8px] px-4 py-2 cursor-pointer hover:bg-[#FF4F8B] transition-colors">
              <Image src="/assets/instagram.png" alt="Instagram" width={32} height={32} />
              <span className="text-white text-xs mt-1">Instagram Hash Generator</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Right: Marketers */}
      <div className="flex-1 flex flex-col items-center justify-center py-12 relative z-10"
        style={{ background: "url('/icons/slider-home.svg') right center / cover no-repeat" }}
      >
        <div className="mb-4 flex items-center gap-2">
          <span className="text-[#FFD600] text-xl font-bold">Hottest</span>
          <span className="text-white text-xl font-bold">Marketers</span>
          <div className="flex gap-1 ml-4">
            <button className="group w-7 h-7 flex items-center justify-center rounded bg-[#22223B]/80 hover:bg-[#FF4F8B] transition-colors">
              <Image src="assets/icons/leftSmall.svg" alt="prev" width={16} height={16} />
            </button>
            <button className="group w-7 h-7 flex items-center justify-center rounded bg-[#22223B]/80 hover:bg-[#FF4F8B] transition-colors">
              <Image src="assets/icons/rightSmall.svg" alt="next" width={16} height={16} />
            </button>
          </div>
        </div>
        <Swiper
          slidesPerView={4}
          spaceBetween={24}
          modules={[Navigation]}
          navigation={{
            prevEl: '.marketers-prev',
            nextEl: '.marketers-next',
          }}
          className="w-full max-w-[350px] mb-4"
        >
          {marketers.map((item, i) => (
            <SwiperSlide key={i}>
              <div className={`w-[70px] h-[70px] rounded-full flex items-center justify-center ${item.color}`}>
                <Image src={item.img} alt={`marketer-${i}`} width={50} height={50} className="rounded-full object-cover" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Index;
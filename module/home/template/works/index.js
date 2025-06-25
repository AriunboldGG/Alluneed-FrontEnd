import Image from 'next/image';
import Link from 'next/link';

const campaigns = [
  {
    label: 'SQ Enable',
    title: 'UnAwkward',
    author: 'By Leo Burnett',
    img: '/assets/photo/image3.png',
    href: '/campaigns/unawkward',
  },
  {
    label: 'Singapore Airlines',
    title: 'Cocktail Conversations',
    author: 'By Copacino Fujikado',
    img: '/assets/photo/sale1.png',
    href: '/campaigns/cocktail-conversations',
  },
  {
    label: 'Singapore Airlines',
    title: 'Welcome to World Class',
    author: 'By Copacino Fujikado',
    img: '/assets/photo/sale2.png',
    href: '/campaigns/welcome-to-world-class',
  },
  {
    label: 'Liquid Death',
    title: 'Better Than Back Sweat?',
    author: 'By Zulu Alpha Kilo',
    img: '/assets/photo/Blog.png',
    href: '/campaigns/better-than-back-sweat',
  },
];

const Works = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <p className="text-[#8557F4] text-center text-[16px] font-[500] leading-[16px] mt-12 mb-2">
        Hottest <span className="font-bold">Campaign</span>
      </p>
      <h2 className="text-[32px] md:text-[40px] font-bold text-center mb-8 leading-tight text-[#050514]">
        Маркетингийн <span className="font-extrabold">ажлууд</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-6xl">
        {campaigns.map((item, i) => (
          <div
            key={i}
            className="rounded-xl overflow-hidden shadow-lg bg-white group transition-transform hover:scale-105 flex flex-col h-full"
          >
            {/* Image with label pill */}
            <div className="relative w-full h-[180px]">
              <Image
                src={item.img}
                alt={item.title}
                fill
                className="object-cover w-full h-full"
                sizes="(max-width: 768px) 100vw, 320px"
              />
              <span className="absolute top-4 left-4 bg-[#8557F4CC] text-white text-xs font-semibold px-4 py-1 rounded-full z-10">
                {item.label}
              </span>
            </div>
            {/* Title, author, arrow */}
            <div className="flex flex-col gap-2 p-4 flex-1 justify-between">
              <div className="flex items-center justify-between">
                <Link href={item.href} className="text-[#050514] text-lg font-semibold hover:underline cursor-pointer">
                  {item.title}
                </Link>
                <Image src="/assets/icons/arrow-up-right.svg" alt="arrow" width={20} height={20} />
              </div>
              <div className="text-[#475467] text-xs font-normal opacity-80">
                {item.author}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Works;

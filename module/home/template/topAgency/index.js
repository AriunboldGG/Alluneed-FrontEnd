import Image from 'next/image';

const agencies = [
  { src: '/assets/photo/agency/itheme1.png', alt: 'itheme' },
  { src: '/assets/photo/agency/itheme1.png', alt: 'itheme' },
  { src: '/assets/photo/agency/trade1.png', alt: 'trade' },
  { src: '/assets/photo/agency/dedu1.png', alt: 'digital edu management' },
  { src: '/assets/photo/agency/qpay1.png', alt: 'QPay' },
  { src: '/assets/photo/agency/aitech1.png', alt: 'A.I. TECH' },
  { src: '/assets/photo/agency/learn1.png', alt: 'melearn' },
];

const TopAgency = () => {
  return (
    <div className="w-full flex flex-col items-center my-12">
      <h4 className="text-[22px] md:text-[28px] text-[#050514] font-normal mb-8 text-center leading-[32px]">
        Онцлох маркетингийн <span className="font-bold">агентлагууд</span>
      </h4>
      <div className="w-full flex flex-wrap justify-center gap-8 md:gap-12">
        {agencies.map((agency, i) => (
          <div key={i} className="flex items-center justify-center min-w-[80px] max-w-[140px] h-[40px]">
            <Image
              src={agency.src}
              alt={agency.alt}
              width={120}
              height={40}
              style={{ objectFit: 'contain', width: 'auto', height: '40px' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopAgency;
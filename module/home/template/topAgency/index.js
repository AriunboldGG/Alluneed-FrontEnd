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

const Index = () => {
  return (
    <div className="my-12 w-full">
      <h4 className="text-[22px] text-[#050514] font-normal mb-8 text-center leading-[24px]">
        Онцлох маркетингийн <span className="font-bold">агентлагууд</span>
      </h4>
      <div className="w-full flex justify-center gap-8 flex-wrap">
        {agencies.map((agency, i) => (
          <div key={i} className="flex items-center justify-center min-w-[100px] max-w-[140px] h-[40px]">
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

export default Index;
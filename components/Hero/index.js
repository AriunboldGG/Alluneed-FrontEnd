import { useState } from "react";

const slides = [
  {
    imageUrl: "/assets/photo/Hero.png",
    title: (
      <>
        Маркетингид шаардлагатай <br />
        бүгдийг <b className="font-bold">нэг дороос</b>
      </>
    ),
    description:
      "Танд төсөөлөх, урьдчилан таамаглах, хэмжихэд туслах хүчирхэг, өөртөө үйлчлэх бүтээгдэхүүн, өсөлтийн аналитик.",
    buttons: [
      { text: "Демо", variant: "outline" },
      { text: "Бүртгүүлэх", variant: "filled" },
    ],
  },
  {
    imageUrl: "/assets/photo/Hero.png",
    title: (
      <>
        Хамгийн сүүлийн үеийн <br />
        <b className="font-bold">маркетинг шийдэл</b>
      </>
    ),
    description:
      "Өсөлтийн шинэ боломжуудыг нээж, бизнесээ дараагийн түвшинд хүргээрэй.",
    buttons: [
      { text: "Дэлгэрэнгүй", variant: "outline" },
      { text: "Эхлэх", variant: "filled" },
    ],
  },
];

const Hero = () => {
  return (
    <div className="w-full min-h-[520px] bg-[#0B0B23] flex flex-col md:flex-row items-center justify-center relative overflow-hidden">
      {/* SVG Background */}
      <img
        src="/assets/svg/Header section.svg"
        alt="Header SVG"
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ pointerEvents: 'none' }}
      />
      {/* Left: Text Content */}
      <div className="flex-1 flex flex-col justify-center items-start px-4 md:px-24 py-16 z-10">
        <h1 className="text-white text-[32px] md:text-[48px] font-[400] leading-tight mb-4">
          Маркетингид шаардлагатай <br />
          <span className="font-bold">бүгдийг нэг дороос</span>
        </h1>
        <p className="text-white text-lg md:text-xl mb-8 max-w-[480px]">
          Танд төсөөлөх, урьдчилан таамаглах, хэмжихэд туслах хүчирхэг, өөртөө үйлчлэх бүтээгдэхүүн, өсөлтийн аналитик.
        </p>
        <div className="flex gap-4">
          <button className="px-6 py-2 border border-white rounded bg-transparent text-white hover:bg-white hover:text-[#FD3D80] transition">
            Демо
          </button>
          <button className="px-6 py-2 rounded bg-[#FD3D80] text-white font-bold hover:bg-pink-600 transition">
            Бүртгүүлэх
          </button>
        </div>
      </div>
      {/* Remove right image, SVG is now the background */}
      {/* Overlay for better text contrast on mobile */}
      <div className="absolute inset-0 bg-[#0B0B23]/70 md:bg-transparent z-0" />
    </div>
  );
};

export default Hero;

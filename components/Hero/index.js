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
  // Add more slides here if needed
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="slider relative w-full mt-[73px] overflow-hidden bg-[#0B0B23]">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}vw)` }}>
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className="w-[100vw] h-[500px] flex items-center justify-start px-12 relative"
            style={{
              backgroundImage: `url(${slide.imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "24px",
              boxShadow: "0 8px 32px 0 rgba(0,0,0,0.25)",
              backgroundColor: "#0B0B23",
            }}>
            {/* Overlay (optional, for better text contrast) */}
            <div className="absolute inset-0 bg-[#0B0B23]/70 rounded-[24px]" />
            {/* Text Area */}
            <div className="relative z-10 max-w-[500px] text-white">
              <h1 className="text-[40px] font-[400] leading-tight mb-4">
                {slide.title}
              </h1>
              <p className="mb-8 text-lg">{slide.description}</p>
              <div className="flex gap-4">
                {slide.buttons.map((btn, i) =>
                  btn.variant === "outline" ? (
                    <button
                      key={i}
                      className="px-6 py-2 border border-white rounded bg-transparent text-white hover:bg-white hover:text-[#FD3D80] transition">
                      {btn.text}
                    </button>
                  ) : (
                    <button
                      key={i}
                      className="px-6 py-2 rounded bg-[#FD3D80] text-white font-bold hover:bg-pink-600 transition">
                      {btn.text}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Slider Controls */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#222] bg-opacity-40 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-[#FD3D80] transition"
            aria-label="Previous">
            &#8592;
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#222] bg-opacity-40 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-[#FD3D80] transition"
            aria-label="Next">
            &#8594;
          </button>
        </>
      )}
      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full ${
              current === idx ? "bg-[#FD3D80]" : "bg-white bg-opacity-30"
            } transition`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;

import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[600px] bg-[#0B0B23] flex flex-col lg:flex-row items-center justify-between overflow-hidden py-16 px-4 md:px-12 xl:px-24">
      {/* Background pattern (SVG or CSS) */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <img
          src="/assets/svg/slider-home.svg"
          alt="Hero background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Left: Text Content */}
      <div className="relative z-10 flex-1 flex flex-col items-start justify-center max-w-2xl py-12">
        <span className="inline-block mb-6 px-4 py-1 rounded-full bg-[#181A2A] text-blue-200 text-sm font-semibold tracking-wide shadow">
          Монголын #1 маркетинг платформ
        </span>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 text-white">
          Маркетингид шаардлагатай <br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
            бүгдийг нэг дороос
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-xl">
          Танд төсөөлөх, урьдчилан таамаглах, хэмжихэд туслах хүчирхэг, өөртөө үйлчлэх бүтээгдэхүүн, өсөлтийн аналитик.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 px-8 py-4 text-lg font-semibold flex items-center gap-2">
            <Play className="w-5 h-5 mr-2" />
            Демо
          </Button>
          <Button size="lg" className="bg-[#FD3D80] hover:bg-pink-600 text-white px-8 py-4 text-lg font-bold">
            Бүртгүүлэх
          </Button>
        </div>
      </div>

     
    </section>
  );
} 
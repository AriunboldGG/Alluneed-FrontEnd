import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Play, Star, Users, TrendingUp } from "lucide-react";

const Hero = () => {
  return (
    <div className="w-full min-h-screen bg-[#050514] relative overflow-hidden flex items-center justify-center">
      {/* Background SVG Pattern */}
      <div className="absolute inset-0 opacity-40 pointer-events-none select-none">
        <img
          src="/assets/svg/slider-home.svg"
          alt="Background Pattern"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Wrapper - full width, responsive padding */}
      <div className="relative z-10 w-full flex flex-col lg:flex-row items-center justify-between px-4 md:px-12 xl:px-32 py-20 min-h-screen">
        {/* Left Content */}
        <div className="flex-1 flex flex-col items-start justify-center text-left max-w-2xl">
          {/* Badge */}
          <Badge variant="secondary" className="mb-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/30">
            <Star className="w-3 h-3 mr-2" />
            Монголын #1 маркетинг платформ
          </Badge>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
            Маркетингид шаардлагатай <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              бүгдийг нэг дороос
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-xl leading-relaxed">
            Танд төсөөлөх, урьдчилан таамаглах, хэмжихэд туслах хүчирхэг, өөртөө үйлчлэх бүтээгдэхүүн, өсөлтийн аналитик.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-lg shadow-blue-500/25">
              Үнэгүй эхлэх
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-blue-500/30 text-blue-300 hover:bg-blue-500/10 px-8 py-4 text-lg backdrop-blur-sm">
              <Play className="mr-2 w-5 h-5" />
              Демо үзэх
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 text-white">
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
              <Users className="w-5 h-5 text-blue-400" />
              <span className="text-2xl font-bold">10,000+</span>
              <span className="text-gray-400">хэрэглэгч</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              <span className="text-2xl font-bold">500+</span>
              <span className="text-gray-400">амжилттай төсөл</span>
            </div>
          </div>
        </div>

        {/* Right Content - Hero Image/Card */}
        <div className="flex-1 flex items-center justify-center w-full mt-12 lg:mt-0 lg:justify-end min-w-[340px]">
          <Card className="w-full max-w-md bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-lg border-blue-500/20 shadow-2xl shadow-blue-500/25">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/25">
                  <Play className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Хурдан демо
                </h3>
                <p className="text-gray-300 mb-6">
                  2 минутын дотор таны маркетинг төлөвлөгөөг хэрхэн боловсруулахыг үзээрэй
                </p>
                <Button variant="outline" className="border-blue-500/30 text-blue-300 hover:bg-blue-500/10 w-full backdrop-blur-sm">
                  Демо эхлэх
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-blue-500/30 rounded-full flex justify-center backdrop-blur-sm">
          <div className="w-1 h-3 bg-blue-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      {/* Additional Geometric Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
    </div>
  );
};

export default Hero;

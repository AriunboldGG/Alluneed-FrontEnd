'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

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

const Discount = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item, i) => (
          <Card
            key={i}
            className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            <CardContent className="p-0">
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                
                {/* Label badge */}
                <div className="absolute top-4 left-4 z-10">
                  <Badge className="bg-purple-600/90 text-white border-0 hover:bg-purple-600">
                    {item.label}
                  </Badge>
                </div>
                
                {/* Play button for first card */}
                {item.showPlay && (
                  <div className="absolute top-4 right-4 z-10">
                    <Button
                      size="sm"
                      className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-purple-600 p-0"
                    >
                      <Play className="w-4 h-4 ml-0.5" />
                    </Button>
                  </div>
                )}
                
                {/* Content */}
                <div className="absolute left-4 bottom-4 z-10">
                  <h3 className="text-white text-lg font-semibold drop-shadow mb-1 group-hover:text-purple-200 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {item.author}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Discount;
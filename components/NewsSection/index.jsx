import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const newsItems = [
  {
    id: 1,
    title: "Маркетингийн шинэ чиг хандлага 2024",
    summary: "2024 онд маркетингийн салбарт ямар шинэ трендүүд давамгайлах вэ? Бидний судалгаа, шинжээчдийн дүгнэлтийг уншаарай.",
    date: "2024-06-01",
    tag: "Тренд",
    image: "/assets/photo/blogs.png",
  },
  {
    id: 2,
    title: "AI ба автоматжуулалт маркетингт",
    summary: "Хиймэл оюун ухаан болон автоматжуулалт хэрхэн маркетингийн үр дүнг өсгөж байна вэ?",
    date: "2024-05-28",
    tag: "AI",
    image: "/assets/photo/ai4.png",
  },
  {
    id: 3,
    title: "Контент маркетингийн шилдэг жишээ",
    summary: "Монголын болон дэлхийн контент маркетингийн амжилттай кейсүүдийг танилцуулж байна.",
    date: "2024-05-20",
    tag: "Контент",
    image: "/assets/photo/Content.png",
  },
];

export default function NewsSection() {
  return (
    <section className="w-full bg-gray-50 py-16">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-700">
            Мэдээ
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Сүүлийн <span className="text-blue-600">мэдээ</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Маркетингийн салбарын хамгийн сүүлийн үеийн мэдээ, зөвлөгөө, трендүүд
          </p>
        </div>
        {/* News Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <Card key={item.id} className="overflow-hidden flex flex-col h-full">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              <CardContent className="flex-1 flex flex-col p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-blue-500/10 text-blue-700 font-medium">{item.tag}</Badge>
                  <span className="text-xs text-gray-400">{item.date}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-3">{item.summary}</p>
                <Button variant="link" className="text-blue-600 px-0 mt-auto w-fit">
                  Дэлгэрэнгүй <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* View All Button */}
        <div className="text-center mt-10">
          <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100">
            Бүх мэдээг үзэх
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
} 
'use client';
import HomeLayout from '@/module/home/layout/main';
import Discount from '@/module/home/template/discount';
import TopAgency from '@/module/home/template/topAgency';
import Influencers from '@/module/home/template/influencers';
import Works from '@/module/home/template/works';
import Blogs from '@/module/home/template/blogs';
import Hottest from '@/module/home/template/hottest';
import Hero from '@/components/Hero';
import Chatbot from '@/components/Chatbot';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, Users, Award, Star } from 'lucide-react';
import NewsSection from '@/components/NewsSection';
import HeroSection from '@/components/HeroSection';

const Home = () => {
    return (
        <>
            <HeroSection />

            {/* Main Content */}
            <div className="w-full bg-gradient-to-b from-gray-50 to-white">
                {/* Stats Section */}
                <section className="w-full max-w-screen-xl mx-auto px-4 md:px-8 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card className="text-center border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
                            <CardContent className="p-6">
                                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Users className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">10,000+</h3>
                                <p className="text-gray-600">Идэвхтэй хэрэглэгч</p>
                            </CardContent>
                        </Card>
                        
                        <Card className="text-center border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
                            <CardContent className="p-6">
                                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <TrendingUp className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">500+</h3>
                                <p className="text-gray-600">Амжилттай төсөл</p>
                            </CardContent>
                        </Card>
                        
                        <Card className="text-center border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
                            <CardContent className="p-6">
                                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Award className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">98%</h3>
                                <p className="text-gray-600">Сэтгэл ханамж</p>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                <Separator className="max-w-screen-xl mx-auto" />

                {/* Featured Campaigns Section */}
                <section className="w-full max-w-screen-xl mx-auto px-4 md:px-8 py-16">
                    <div className="text-center mb-12">
                        <Badge variant="secondary" className="mb-4 bg-purple-100 text-purple-700">
                            <Star className="w-3 h-3 mr-2" />
                            Онцлох урамшуулал
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Хамгийн <span className="text-purple-600">популяр</span> кампаниуд
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Монголын шилдэг агентлагуудын амжилттай кампаниудыг судлаарай
                        </p>
                    </div>
                    <Discount />
                </section>

                <Separator className="max-w-screen-xl mx-auto" />

                {/* Top Agencies Section */}
                <section className="w-full max-w-screen-xl mx-auto px-4 md:px-8 py-16">
                   
                    <TopAgency />
                </section>

                {/* Hottest Influencers Section */}
                <section className="w-full bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-16">
                    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                        <div className="text-center mb-12">
                          
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                <span className="text-pink-400">Инфлюнсерүүд</span>
                            </h2>
                           
                        </div>
                        <Influencers />
                    </div>
                </section>

                {/* Works Section */}
                <section className="w-full max-w-screen-xl mx-auto px-4 md:px-8 py-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Бидний <span className="text-green-600">ажлууд</span>
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Амжилттай дуусгасан төслүүдийнхээ жишээг үзээрэй
                        </p>
                    </div>
                    <Works />
                </section>

                {/* News Section */}
                <NewsSection />

                {/* CTA Section */}
                <section className="w-full max-w-screen-xl mx-auto px-4 md:px-8 py-16">
                    <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 shadow-2xl">
                        <CardContent className="p-12 text-center">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Маркетингийн амжилтад бэлэн үү?
                            </h2>
                            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                                Одоо эхлээд үнэгүй демо үзэж, таны бизнест тохирсон маркетинг стратегийг олж авна уу
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                                    Үнэгүй эхлэх
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg">
                                    Дэлгэрэнгүй мэдэх
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </section>
            </div>

            <Chatbot />
        </>
    );
};

export default Home;

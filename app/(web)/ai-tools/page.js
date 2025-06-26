"use client";

import Image from "next/image";

const aiTools = [
  {
    title: "ChatGPT",
    cardTitle: "AI Copywriter",
    url: "https://chat.openai.com/",
    cardSubtitle: "Generate marketing copy, emails, and more using advanced AI.",
    cardDetailedText: "ChatGPT helps marketers quickly draft, edit, and brainstorm content ideas for campaigns, social media, and more.",
    media: {
      type: "IMAGE",
      source: {
        url: "/assets/photo/ai1.svg",
      },
    },
  },
  {
    title: "Midjourney",
    cardTitle: "AI Image Generator",
    url: "https://www.midjourney.com/",
    cardSubtitle: "Create stunning visuals and ad creatives with AI.",
    cardDetailedText: "Midjourney enables marketers to generate unique images for ads, blogs, and social posts in seconds.",
    media: {
      type: "IMAGE",
      source: {
        url: "/assets/photo/ai2.svg",
      },
    },
  },
  {
    title: "Copy.ai",
    cardTitle: "Content Automation",
    url: "https://www.copy.ai/",
    cardSubtitle: "Automate your content creation process.",
    cardDetailedText: "Copy.ai provides tools for generating blog posts, product descriptions, and more with just a few prompts.",
    media: {
      type: "IMAGE",
      source: {
        url: "/assets/photo/ai3.svg",
      },
    },
  },
  {
    title: "SurferSEO",
    cardTitle: "AI SEO Optimizer",
    url: "https://surferseo.com/",
    cardSubtitle: "Optimize your content for search engines using AI.",
    cardDetailedText: "SurferSEO analyzes your content and provides AI-driven recommendations to improve your search rankings.",
    media: {
      type: "IMAGE",
      source: {
        url: "/assets/photo/ai4.png",
      },
    },
  },
];

const AiTools = () => {
  return (
    <>
      {/* Header Section */}
      <div className="relative w-full h-[260px] md:h-[340px] bg-[#0A0914] overflow-hidden flex items-center">
        {/* Grid background */}
        <div className="absolute inset-0 z-0">
          <svg width="100%" height="100%" className="w-full h-full" style={{ opacity: 0.12 }}>
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#fff" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        {/* Left text */}
        <div className="relative z-10 pl-8 md:pl-32 flex-1">
          <p className="text-[#8557F4] text-sm font-medium mb-3">AI Marketer's Tools</p>
          <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">AI Tools</h1>
          <p className="text-[#EAECF0] text-base md:text-lg">
            Discover the latest AI-powered tools for marketers, content creators, and growth hackers.
          </p>
        </div>
        {/* Right cubes */}
        <div className="hidden md:flex relative z-10 pr-16 gap-6">
          <img src="/assets/cube.png" alt="cube" className="w-20 h-20" style={{ filter: 'hue-rotate(0deg)' }} />
          <img src="/assets/cube.png" alt="cube" className="w-20 h-20" style={{ filter: 'hue-rotate(60deg)' }} />
          <img src="/assets/cube.png" alt="cube" className="w-20 h-20" style={{ filter: 'hue-rotate(120deg)' }} />
          <img src="/assets/cube.png" alt="cube" className="w-20 h-20" style={{ filter: 'hue-rotate(180deg)' }} />
          <img src="/assets/cube.png" alt="cube" className="w-20 h-20" style={{ filter: 'hue-rotate(240deg)' }} />
        </div>
      </div>
      {/* Tools List */}
      <div className="relative w-full max-w-3xl mx-auto py-16">
        <div className="flex flex-col gap-12 relative z-10">
          {aiTools.map((item, idx) => (
            <div key={idx} className="flex items-start gap-6 relative">
              {/* Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 flex-1 flex flex-col md:flex-row md:items-center gap-4">
                {item.media?.source?.url && (
                  <Image
                    src={item.media.source.url}
                    alt={item.title}
                    width={128}
                    height={80}
                    style={{ objectFit: 'contain', width: '128px', height: '80px' }}
                    priority
                  />
                )}
                <div>
                  <h3 className="text-lg font-bold text-[#8557F4] mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-700 mb-2">{item.cardSubtitle}</p>
                  <p className="text-xs text-gray-500">{item.cardDetailedText}</p>
                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-[#8557F4] font-semibold underline"
                    >
                      Visit
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AiTools; 
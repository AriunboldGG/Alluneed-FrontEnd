'use client';

const Index = ({ shadow, i }) => {
  return (
    <div
      className={`bg-white rounded-2xl overflow-hidden flex flex-col h-[366px] w-full transition-shadow duration-300 ${shadow ? 'shadow-lg' : ''} hover:shadow-2xl`}
    >
      {/* Cover Image */}
      <div className="h-[180px] w-full">
        <img
          src='/assets/photo/Blog.png'
          alt={i?.name || 'Blog cover'}
          className="w-full h-full object-cover"
        />
      </div>
      {/* Content */}
      <div className="flex-1 flex flex-col justify-between p-5">
        <div>
          <div className="flex items-center gap-2 mb-3">
          
            <span className="text-[#8557F4] font-medium text-xs">{i?.type?.name}</span>
            <span className="text-[#8557F4] font-medium text-xs ml-auto">8 мин унш</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold text-[#222] truncate">{i?.name}</h3>
            <img src="/assets/icons/right-up.svg" alt="right" className="w-5 h-5" />
          </div>
          <p className="text-[15px] text-[#555] leading-[20px] line-clamp-2">{i?.description}</p>
        </div>
        {/* Read More Button */}
        <button
          className="mt-4 px-4 py-2 rounded bg-[#FD3D80] text-white font-semibold hover:bg-pink-600 transition"
        >
          Дэлгэрэнгүй
        </button>
      </div>
    </div>
  );
};

export default Index;
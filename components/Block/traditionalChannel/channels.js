import { BASE_URL } from "@/service/path";
import { useState } from "react";
import Modal from "./TV/modal";

const channelImages = [
  "/assets/channels/1.png",
  "/assets/channels/2.png",
  "/assets/channels/3.png",
  "/assets/channels/4.png",
  "/assets/channels/5.png",
  "/assets/channels/6.png",
];

const Index = ({ item, index, catName }) => {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState(null);

  // Use static image for TV list, fallback to item image otherwise
  const imageUrl = catName === "TV"
    ? channelImages[index % channelImages.length]
    : (item?.image?.file_name ? BASE_URL + "/file/" + item?.image?.file_name : channelImages[0]);

  return (
    <div className="flex flex-row items-center bg-white rounded-xl shadow-md p-6 mb-6 w-full min-h-[160px] hover:shadow-lg transition-shadow">
      {/* Image */}
      <div className="flex-shrink-0 w-28 h-28 rounded-lg overflow-hidden border border-gray-100 bg-gray-50 flex items-center justify-center">
        <img
          alt={item?.name || "TV Channel"}
          src={imageUrl}
          className="object-cover w-full h-full"
        />
      </div>
      {/* Details */}
      <div className="flex flex-col flex-1 px-6 gap-2">
        {/* TV Name */}
        <div className="text-xl font-bold text-gray-900 mb-1">{item?.name}</div>
        {/* Location */}
        <div className="text-sm text-gray-500 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          <span>{item?.address || "Байршил мэдээлэл байхгүй"}</span>
        </div>
        {/* Social Links */}
        <div className="flex items-center gap-4 mt-1">
          {item?.social_links?.instagram && (
            <a href={item.social_links.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-pink-500"><rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><circle cx="17.5" cy="6.5" r="1.5"/></svg>
            </a>
          )}
          {item?.social_links?.facebook && (
            <a href={item.social_links.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-blue-600"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
            </a>
          )}
          {item?.social_links?.youtube && (
            <a href={item.social_links.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-red-500"><path d="M21.8 8.001a2.75 2.75 0 00-1.94-1.94C18.07 6 12 6 12 6s-6.07 0-7.86.06a2.75 2.75 0 00-1.94 1.94A28.7 28.7 0 002 12a28.7 28.7 0 00.2 3.999 2.75 2.75 0 001.94 1.94C5.93 18 12 18 12 18s6.07 0 7.86-.06a2.75 2.75 0 001.94-1.94A28.7 28.7 0 0022 12a28.7 28.7 0 00-.2-3.999zM10 15V9l5 3-5 3z"/></svg>
            </a>
          )}
        </div>
        {/* Average Views & Univision Number */}
        <div className="flex gap-8 mt-2">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400">Өдрийн дундаж үзэлт</span>
            <span className="font-semibold text-base text-gray-800">{item?.tv_daily_avg_views || "-"}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-400">Univision дугаар</span>
            <span className="font-semibold text-base text-gray-800">{item?.tv_univision_number || "-"}</span>
          </div>
        </div>
      </div>
      {/* View Button */}
      <div className="flex flex-col items-end justify-center h-full">
        <button
          onClick={() => (setOpenModal(true), setData(item))}
          className="bg-gradient-to-r from-[#8557F4] to-[#3E2E92] text-white font-semibold rounded-lg px-6 py-2 shadow hover:from-[#6c3fd1] hover:to-[#2a1e6b] transition-colors"
        >
          Үзэх
        </button>
      </div>
      {/* Modal */}
      <Modal open={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
};

export default Index;

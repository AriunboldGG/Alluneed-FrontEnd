import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import StatisticsChart from "../Block/traditionalChannel/TV/chartStatistic";
import GenderPieChart from "../Block/traditionalChannel/TV/GenderPieChart";
import AgeRangeChart from "../Block/traditionalChannel/TV/ageRangeChart";

const ModalChatbot = ({ open, onClose }) => {
  if (!open) return null;

  const ageData = [
    { ageRange: "13-17", gender: "Male", value: 60 },
    { ageRange: "13-17", gender: "Female", value: 60 },
    { ageRange: "18-24", gender: "Male", value: 100 },
    { ageRange: "18-24", gender: "Female", value: 100 },
    { ageRange: "25-34", gender: "Male", value: 75 },
    { ageRange: "25-34", gender: "Female", value: 75 },
    { ageRange: "35-44", gender: "Male", value: 90 },
    { ageRange: "35-44", gender: "Female", value: 90 },
    { ageRange: "45-54", gender: "Male", value: 85 },
    { ageRange: "45-54", gender: "Female", value: 85 },
    { ageRange: "55-64", gender: "Male", value: 45 },
    { ageRange: "55-64", gender: "Female", value: 45 },
    { ageRange: "65+", gender: "Male", value: 30 },
    { ageRange: "65+", gender: "Female", value: 30 },
  ];
  const dataLocation = [
    { name: "UB", value: 65 },
    { name: "Erdenet", value: 18 },
    { name: "Darhan", value: 12 },
    { name: "Dornod", value: 5 },
  ];
  return (
    <div onClick={onClose} className="overlay">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modalContainer tv"
        style={{ maxWidth: 1100, width: "95%" }}>
        <div className="modalContent p-8 bg-white rounded-2xl overflow-auto">
          <p className="mb-4">
            Таны маркетинг төлөвлөгөөний зорилго брэндийн танигдалтыг
            нэмэгдүүлэх байгаa тул илүү өргөн цар хүрээтэй мэдээллийн
            хэрэгслүүдийг сонгох нь тохиромжтой ба чанартай контентоор дамжуулан
            үндсэн мессежийг түгээх нь чухал
          </p>
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-3 py-2 border">№</th>
                  <th className="px-3 py-2 border">Type</th>
                  <th className="px-3 py-2 border">Channel</th>
                  <th className="px-3 py-2 border">Price</th>
                  <th className="px-3 py-2 border">Total reach</th>
                  <th className="px-3 py-2 border">Cost per reach</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-2 py-1">1</td>
                  <td className="border px-2 py-1">TV channel</td>
                  <td className="border px-2 py-1">Movie box TVC</td>
                  <td className="border px-2 py-1">6,543,500</td>
                  <td className="border px-2 py-1">1,869,571</td>
                  <td className="border px-2 py-1">3.5₮</td>
                </tr>
                <tr>
                  <td className="border px-2 py-1">2</td>
                  <td className="border px-2 py-1">TV channel</td>
                  <td className="border px-2 py-1">Asian box TVC</td>
                  <td className="border px-2 py-1">5,895,500</td>
                  <td className="border px-2 py-1">1,789,515</td>
                  <td className="border px-2 py-1">3.3₮</td>
                </tr>
                <tr>
                  <td className="border px-2 py-1">3</td>
                  <td className="border px-2 py-1">OOH channel</td>
                  <td className="border px-2 py-1">Нийслэл дэлгэц</td>
                  <td className="border px-2 py-1">5,500,000</td>
                  <td className="border px-2 py-1">2,894,736</td>
                  <td className="border px-2 py-1">1,9₮</td>
                </tr>
                <tr>
                  <td className="border px-2 py-1">4</td>
                  <td className="border px-2 py-1">Boost</td>
                  <td className="border px-2 py-1">Own FB page</td>
                  <td className="border px-2 py-1">6,444,000</td>
                  <td className="border px-2 py-1">2,301,428</td>
                  <td className="border px-2 py-1">2.8₮</td>
                </tr>
                <tr>
                  <td className="border px-2 py-1">5</td>
                  <td className="border px-2 py-1">MF TV</td>
                  <td className="border px-2 py-1">MF TV</td>
                  <td className="border px-2 py-1">7,100,000</td>
                  <td className="border px-2 py-1">1,548,000</td>
                  <td className="border px-2 py-1">4.6₮</td>
                </tr>
                <tr>
                  <td className="border px-2 py-1">6</td>
                  <td className="border px-2 py-1">Content create</td>
                  <td className="border px-2 py-1">Spot agency</td>
                  <td className="border px-2 py-1">18,500,000</td>
                  <td className="border px-2 py-1">0</td>
                  <td className="border px-2 py-1">0</td>
                </tr>
                <tr className="font-bold">
                  <td className="border px-2 py-1">7</td>
                  <td className="border px-2 py-1">Total</td>
                  <td className="border px-2 py-1"></td>
                  <td className="border px-2 py-1">50,170,000</td>
                  <td className="border px-2 py-1">10,403,250</td>
                  <td className="border px-2 py-1">4,82₮</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Charts Section */}
          <div className="flex flex-wrap gap-8 justify-center mt-8">
            <div className="flex flex-col items-center">
              <span className="font-semibold mb-2">Age</span>
              <AgeRangeChart
                ageData={[
                  { name: "18-25", value: 30 },
                  { name: "26-35", value: 40 },
                  { name: "36-45", value: 20 },
                  { name: "46-65", value: 10 },
                ]}
              />
            </div>
            <div className="flex flex-col items-center">
              <span className="font-semibold mb-2">Gender</span>
              <GenderPieChart data={ageData} />
            </div>
            <div className="flex flex-col items-center min-w-[300px]">
              <span className="font-semibold mb-2">Location</span>
              <StatisticsChart data={dataLocation} />
            </div>
          </div>
        </div>
        <button className="absolute top-4 right-4 text-xl" onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
};

export default ModalChatbot;

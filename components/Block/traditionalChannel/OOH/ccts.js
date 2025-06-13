import { useState } from "react";
import Modal from "./modalDecaux";

const Index = ({ item, index }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null); // For storing data specific to the row

  // Sample data for table rows. Replace this with actual data.
  const tableData = [
    { collectionName: "Стронг", busStationCount: 22, objects: "14" },
    { collectionName: "Мини", busStationCount: 17, objects: "9" },
    { collectionName: "Ландмарк", busStationCount: 14, objects: "6" },
    { collectionName: "Пөтит", busStationCount: 11, objects: "4" },
    { collectionName: "Тугт", busStationCount: 5, objects: "2" },
  ];

  return (
    <div className="flex flex-row min-h-[400px] w-full p-3 justify-around space-x-3">
      
      <div className="flex flex-col space-y-3 text-center align-middle justify-center">
        <div className="flex flex-row text-2xl">
          {/* <div>{index + 1 + "."}</div> */}
          <div>&nbsp;</div>
          {/* <div>{item?.name}</div> */}
          <div>CCTS үнийн санал</div>
        </div>

        {/* Table */}
        <table className="min-w-full bg-white border border-gray-300 rounded-md">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Багц</th>
              <th className="py-2 px-4 border-b">Автобусны зогсоол</th>
              <th className="py-2 px-4 border-b">Мэдээллийн байгууламж</th>
              <th className="py-2 px-4 border-b">Байршил</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, idx) => (
              <tr key={idx} className="text-left">
                <td className="py-2 px-4 border-b">{row.collectionName}</td>
                <td className="py-2 px-4 border-b">{row.busStationCount}</td>
                <td className="py-2 px-4 border-b">{row.objects}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => {
                      setSelectedData(row); // Set the selected data for the modal
                      setOpenModal(true); // Open the modal
                    }}
                    className="inline-block rounded border border-indigo-600 bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring"
                  >
                    Байршил харах
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal */}
        <Modal open={openModal} onClose={() => setOpenModal(false)} data={selectedData} />
      </div>
    </div>
  );
};

export default Index;

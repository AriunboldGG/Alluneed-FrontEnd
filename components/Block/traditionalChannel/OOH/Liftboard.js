import React, { useState } from "react";
import Modal from "./modalLiftboard";

const Index = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedStreet, setSelectedStreet] = useState(null);

  const screens = ["Хотхон 1", "Хотхон 2", "Хотхон 3"];
  const boards = ["Хотхон A", "Хотхон B", "Хотхон C"];

  const handleOpenModal = (street) => {
    setSelectedStreet(street);
    setOpenModal(true);
  };

  return (
    <div className="flex flex-col w-full p-3 space-y-3 ">
      <div className="flex flex-row text-2xl screenTop">
        <div>Дэлгэц</div>
        <div>Самбар</div>
      </div>
      <div className="flex flex-row w-full justify-between ">
        <div className="flex flex-col space-y-2 w-1/2 screen">
          {screens.map((screen, index) => (
            <div key={index} className="flex justify-between items-center p-2 border-b">
              <div>{screen}</div>
              <button
                onClick={() => handleOpenModal(screen)}
                className="rounded border border-indigo-600 bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring"
              >
                Харах
              </button>
            </div>
          ))}
        </div>
        <div className="flex flex-col space-y-2 w-1/2">
          {boards.map((board, index) => (
            <div key={index} className="flex justify-between items-center p-2 border-b">
              <div>{board}</div>
              <button
                onClick={() => handleOpenModal(board)}
                className="rounded border border-indigo-600 bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring"
              >
                Харах
              </button>
            </div>
          ))}
        </div>
      </div>
      {openModal && (
        <Modal open={openModal} onClose={() => setOpenModal(false)} street={selectedStreet} />
      )}
    </div>
  );
};

export default Index;

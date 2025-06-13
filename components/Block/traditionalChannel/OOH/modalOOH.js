import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import GoogleMapComponent from "./GoogleMapComponent";

const Modal = ({ open, onClose }) => {
  if (!open) return null;

  // Handle close button click and clicking outside the modal
  const handleClose = () => {
    onClose();
  };

  return (
    <div
      onClick={handleClose} // Close modal when clicking outside
      className="overlay"
    >
      <div
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
        className="modalContainer"
      >
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 bg-gray-200 rounded-full p-2 text-gray-700 hover:bg-gray-300"
        >
          X
        </button>
        <div className="modalLeft">
          <div className="content">
            <div className="reclamTime googlemap">
              <span className="reclamTitle">LED дэлгэцүүдийн байршил </span>
              <GoogleMapComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

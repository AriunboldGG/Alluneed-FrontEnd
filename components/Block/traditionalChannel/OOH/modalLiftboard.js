import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import StatisticsChart from "./../TV/chartStatistic";
import GenderPieChart from "./../TV/GenderPieChart";

const Modal = ({ open, onClose }) => {
  if (!open) return null;



  //Country chart
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  // Example data
  const data = [
    { label: "London", country: "England", city: "London", value: 30 },
    { label: "Madrid", country: "Espane", city: "Madrid", value: 20 },
    {
      label: "Ulaanbaatar",
      country: "Mongolia",
      city: "Ulaanbaatar",
      value: 50,
    },
    { label: "Manchester", country: "England", city: "Manchester", value: 50 },
    { label: "Dublin", country: "Ireland", city: "Dublin", value: 50 },
    // Add more data as needed
  ];

  //age Example data
  const [selectedGender, setSelectedGender] = useState("");
  console.log("selectedGender=>>>>>>>", selectedGender);

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
  console.log("ageDataaa=>>>>>>>>>>>>>>", ageData);

  return (
    <div onClick={onClose} className="overlay">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modalContainer">
       
        <div className="modalRight">
          <div className="content">
            <div className="reclamTime statisticChart">
              <span className="reclamTitle">Top locations:</span>
              <StatisticsChart
                data={data}
                selectedCountry={selectedCountry}
                selectedCity={selectedCity}
                setSelectedCountry={setSelectedCountry}
                setSelectedCity={setSelectedCity}
              />
            </div>
          </div>
        </div>
        <div className="modalRight">
          <p className="closeBtn" onClick={onClose}>
            X
          </p>
          <div className="content">
            <div className="reclamTime">
              <span className="reclamTitle">Age Range: </span>

              <div>Age Range will be here</div>
              {/* <AgeRangeChart data={ageData} /> */}
            </div>
            <div className="reclamTime">
              <span className="reclamTitle">Хүйсийн харьцаа: </span>

              <GenderPieChart data={ageData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

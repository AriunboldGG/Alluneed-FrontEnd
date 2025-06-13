import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DateRangePicker from "./dateRangePicker";
import StatisticsChart from "./chartStatistic";
import GenderPieChart from "./GenderPieChart";
import AgeRangeChart from "./ageRangeChart";
import ModalChatbot from "@/components/Chatbot/modalChatbot";

const Modal = ({ open, onClose }) => {
  if (!open) return null;
  //Time select
  const [selectedChoice, setSelectedChoice] = useState(null);
  const handleChoiceClick = (choice) => {
    setSelectedChoice(choice);
  };

  //Second select
  const [selectedDuration, setSelectedDuration] = useState(1); // Default to 1 second
  const handleDurationChange = (event) => {
    setSelectedDuration(event.target.value);
  };

  //Udriin davtamj
  const [selectedTime, setSelectedTime] = useState(1); // Default to 1 second
  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };
  //Date picker
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
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
  //age chart Example data
  const [gender, setGender] = useState("man");
  //age Example data
  const dataAge = {
    man: [10, 20, 30, 40, 50, 60],
    woman: [15, 25, 35, 45, 55, 65],
  };

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

  return (
    <div onClick={onClose} className="overlay">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modalContainer tv">
        <div className="modalLeft">
          <div className="content">
            {/* // reclam tsatsah */}
            <div className="reclamTime">
              <span className="reclamTitle">Реклам цацах цаг</span>
              <p
                onClick={() => handleChoiceClick("17:00 - 00:00")}
                className={`choice ${
                  selectedChoice === "17:00 - 00:00" ? "selected" : ""
                }`}>
                17:00 - 00:00
              </p>
              <p
                onClick={() => handleChoiceClick("Бусад")}
                className={`choice ${
                  selectedChoice === "Бусад" ? "selected" : ""
                }`}>
                Бусад
              </p>
            </div>
            {/* Vregljleh hugatsaa select */}
            <div className="reclamTime">
              <span className="reclamTitle">Рекламны үргэлжлэх хугацаа</span>
              <select value={selectedDuration} onChange={handleDurationChange}>
                {[...Array(240).keys()].map((i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} секунд
                  </option>
                ))}
              </select>
            </div>
            <div className="reclamTime">
              <span className="reclamTitle">Өдөрт гарах давтамж</span>
              <select value={selectedTime} onChange={handleTimeChange}>
                {[...Array(30).keys()].map((i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} удаа
                  </option>
                ))}
              </select>
            </div>

           
          </div>
        </div>
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
             {/* //Date Picker */}
             <div className="reclamTime">
              <span className="reclamTitle">Цацах хоногийн тоо</span>
              <DateRangePicker
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
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
              <span className="reclamTitle">Насны ангилал: </span>
              <AgeRangeChart data={dataAge}/>
              <div>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="man"
                    checked={gender === "man"}
                    onChange={() => setGender("man")}
                  />
                  Эрэгтэй
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="woman"
                    checked={gender === "woman"}
                    onChange={() => setGender("woman")}
                  />
                  Эмэгтэй
                </label>
              </div>
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

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

  // Insights placeholder data
  const insights = {
    reach: 120000,
    costPerPerson: 35_000,
    totalCost: 4_200_000,
    compareAvg: "2x илүү үзэлттэй",
  };

  const locationOptions = [
    { name: "Орхон", value: 30 },
    { name: "Төв", value: 20 },
    { name: "Улаанбаатар", value: 50 },
    { name: "Дархан", value: 40 },
    { name: "Сэлэнгэ", value: 25 },
  ];
  const [selectedLocation, setSelectedLocation] = useState('Бүх байршил');

  // Chart data: all locations or just the selected one
  const chartData = selectedLocation === 'Бүх байршил'
    ? locationOptions
    : locationOptions.filter(loc => loc.name === selectedLocation);

  const [calculatedInsights, setCalculatedInsights] = useState(insights);

  function calculateInsights() {
    // Example calculation logic (replace with real logic as needed)
    let base = 100000;
    let loc = locationOptions.find(l => l.name === selectedLocation);
    let reach = selectedLocation === 'Бүх байршил' ? 120000 : (loc ? loc.value * 2000 : base);
    let costPerPerson = 35000 + Number(selectedDuration) * 10 + Number(selectedTime) * 5;
    let totalCost = reach * costPerPerson / 1000;
    let compareAvg = selectedLocation === 'Улаанбаатар' ? '2x илүү үзэлттэй' : '1x';
    setCalculatedInsights({
      reach,
      costPerPerson,
      totalCost,
      compareAvg,
    });
  }

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl shadow-lg w-full max-w-5xl p-8 relative flex flex-col"
      >
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
          onClick={onClose}
        >
          ×
        </button>
        {/* 2 columns */}
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          {/* Left column */}
          <div className="flex-1 space-y-6">
            {/* // реклам цацах */}
            <div>
              <span className="font-semibold text-gray-700 block mb-2">Реклам цацах цаг</span>
              <div className="flex gap-3">
                <button
                  onClick={() => handleChoiceClick("17:00 - 00:00")}
                  className={`px-4 py-2 rounded-lg border ${selectedChoice === "17:00 - 00:00" ? "bg-indigo-100 border-indigo-500" : "bg-gray-50 border-gray-200"}`}
                >
                  17:00 - 00:00
                </button>
                <button
                  onClick={() => handleChoiceClick("Бусад")}
                  className={`px-4 py-2 rounded-lg border ${selectedChoice === "Бусад" ? "bg-indigo-100 border-indigo-500" : "bg-gray-50 border-gray-200"}`}
                >
                  Бусад
                </button>
              </div>
            </div>
            {/* Үргэлжлэх хугацаа select */}
            <div>
              <span className="font-semibold text-gray-700 block mb-2">Рекламны үргэлжлэх хугацаа</span>
              <select value={selectedDuration} onChange={handleDurationChange} className="w-full border rounded-lg px-3 py-2">
                {[...Array(240).keys()].map((i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} секунд
                  </option>
                ))}
              </select>
            </div>
            {/* Өдөрт гарах давтамж */}
            <div>
              <span className="font-semibold text-gray-700 block mb-2">Өдөрт гарах давтамж</span>
              <select value={selectedTime} onChange={handleTimeChange} className="w-full border rounded-lg px-3 py-2">
                {[...Array(30).keys()].map((i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} удаа
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Right column */}
          <div className="flex-1 space-y-6">
            <div>
              <span className="font-semibold text-gray-700 block mb-2">Их үзэлттэй байршил</span>
              <select
                className="mb-4 border rounded-lg px-3 py-2"
                value={selectedLocation}
                onChange={e => setSelectedLocation(e.target.value)}
              >
                <option value="Бүх байршил">Бүх байршил</option>
                {locationOptions.map(loc => (
                  <option key={loc.name} value={loc.name}>{loc.name}</option>
                ))}
              </select>
              <StatisticsChart
                data={chartData}
              />
            </div>
            <div>
              <span className="font-semibold text-gray-700 block mb-2">Цацах хоногийн тоо</span>
              <DateRangePicker
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
              />
            </div>
            <button
              className="mt-2 bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
              onClick={calculateInsights}
            >
              Тооцоолох
            </button>
          </div>
        </div>
        {/* Bottom section: Insights */}
        <div className="mt-6 border-t pt-6 grid grid-cols-1 md:grid-cols-4 gap-6 bg-gray-50 rounded-lg p-6">
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-500 mb-1">Нийт хүртээмж</span>
            <span className="text-lg font-bold text-indigo-700">{calculatedInsights.reach.toLocaleString()}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-500 mb-1">Нэг хүнд хүрч буй зардал</span>
            <span className="text-lg font-bold text-indigo-700">{calculatedInsights.costPerPerson.toLocaleString()} ₮</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-500 mb-1">Нийт зардал</span>
            <span className="text-lg font-bold text-indigo-700">{calculatedInsights.totalCost.toLocaleString()} ₮</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-500 mb-1">ТВ үзэлтийн дундажтай харьцуулахад</span>
            <span className="text-lg font-bold text-indigo-700">{calculatedInsights.compareAvg}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

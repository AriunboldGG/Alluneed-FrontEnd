// DateRangePicker.js
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateRangePicker = ({ startDate, setStartDate, endDate, setEndDate }) => {
  return (
    <div className="dateRangePicker">
      <div>
        <label>Эхлэх хугацаа:</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          minDate={new Date()}
          maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
          dateFormat="yyyy/MM/dd"
          placeholderText="Эхлэх хугацааг сонгоно уу!"
        />
      </div>
      <div>
        <label>Дуусах хугацаа:</label>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
          dateFormat="yyyy/MM/dd"
          placeholderText="Дуусах хугацааг сонгоно уу!"
        />
      </div>
    </div>
  );
};

export default DateRangePicker;

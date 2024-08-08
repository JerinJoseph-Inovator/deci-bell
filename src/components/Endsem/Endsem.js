import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import style from './Endsem.module.css';

function Endsem() {
  const [selectedDates, setSelectedDates] = useState([]);
  const [commonTime, setCommonTime] = useState(null);

  const handleDateChange = (date) => {
    // Ensure 'date' is a valid date object
    if (date && date instanceof Date && !selectedDates.includes(date)) {
      setSelectedDates([...selectedDates, date]);
    }
  };

  const handleDateRemove = (index) => {
    const updatedDates = [...selectedDates];
    updatedDates.splice(index, 1);
    setSelectedDates(updatedDates);
  };

  const handleTimeChange = (time) => {
    setCommonTime(time);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Selected Dates:', selectedDates);
    console.log('Common Time:', commonTime);
  };

  return (
    <div className={style.endsemForm}>
      <form onSubmit={handleSubmit}>
        <div className={style.datePickerContainer}>
          <div className={style.datePicker}>
            <label>Select Dates:</label>
            <DatePicker
              selected={null}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              inline
              isClearable
              placeholderText="Select Date"
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={15}
              scrollableMonthYearDropdown
            />
            
          </div>
          <div className={style.selectedDates}>
            <h3>Selected Dates:</h3>
            <ul>
              {selectedDates.map((date, index) => (
                <li key={index}>
                  {date.toDateString()} 
                  <button type="button" onClick={() => handleDateRemove(index)}>Remove</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={style.timePicker}>
          <label>Common Time:</label>
          <DatePicker
            selected={commonTime}
            onChange={handleTimeChange}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            dateFormat="h:mm aa"
            placeholderText="Select Common Time"
          />
        </div>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Endsem;

import React, { useState } from 'react';
import style from './Holiday.module.css';

function DateSelector() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [selectedDates, setSelectedDates] = useState([]);
  const [inputDate, setInputDate] = useState('');

  const handleDateChange = (e) => {
    setInputDate(e.target.value);
  };

  const handleAddDate = () => {
    if (inputDate.trim() !== '') {
      setSelectedDates([...selectedDates, inputDate]);
      setInputDate('');
    }
  };

  const handleRemoveDate = (dateToRemove) => {
    setSelectedDates(selectedDates.filter(date => date !== dateToRemove));
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleAddRangeDates = () => {
    // Validation (optional): Ensure start date is before or equal to end date
    if (startDate && endDate && new Date(startDate) <= new Date(endDate)) {
      setSelectedDates([...selectedDates, { startDate, endDate }]); // Add range as an object
      setStartDate('');
      setEndDate('');
    } else {
      alert('Invalid Date Range: Start date must be before or equal to end date.');
    }
  };

  const handleSubmit = () => {
    // Handle submission logic here with startDate, endDate and selectedDates
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);
    console.log('Selected Dates:', selectedDates);
  };

  return (
    <div className={style.dateSelectorContainer}>
      <div className={style.dateSelector}> {/* Single Date Selection */}
        <div className={style.dateInputContainer}>
          <input
            type="date"
            value={inputDate}
            onChange={handleDateChange}
          />
          <button onClick={handleAddDate}>Add Date</button>
        </div>
        <div className={style.selectedDates}>
        {selectedDates.map((date, index) => (
  <div key={index} className={style.selectedDate}>
    {typeof date === 'object' ? (
      <span>{`${date.startDate} - ${date.endDate}`}</span>
    ) : (
      <span>{date}</span>
    )}
    <button onClick={() => handleRemoveDate(date)}>Remove</button>
  </div>
))}

          <button onClick={handleSubmit} className={style.submitButton}>Submit</button>
        </div>
      </div>

      <div className={style.dateSelector}> {/* Range Selection */}
        <div className={style.dateRangeInputContainer}> {/* Separate container for range inputs */}
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={handleStartDateChange}
          />
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={handleEndDateChange}
          />
        </div>
        <button onClick={handleAddRangeDates} className={style.submitButton}>Add Range</button>
        <button onClick={handleSubmit} className={style.submitButton}>Submit</button>
      </div>
      
    {/* Table to display selected dates */}
    <div className={style.selectedDatesTable}>
      <h2>Selected Dates</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {selectedDates.map((date, index) => (
            <tr key={index}>
              <td>
                {typeof date === 'object' ? (
                  `${date.startDate} - ${date.endDate}`
                ) : (
                  date
                )}
              </td>
              <td>
                <button onClick={() => handleRemoveDate(date)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>


    </div>

  );
}

export default DateSelector;

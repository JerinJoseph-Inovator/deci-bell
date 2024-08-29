import React, { useState } from 'react';
import style from './Holiday.module.css';

function Holiday() {
  const [selectedDates, setSelectedDates] = useState([]);
  const [singleDate, setSingleDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const addSingleDate = () => {
    if (singleDate) {
      setSelectedDates([...selectedDates, singleDate]);
      setSingleDate('');
    }
  };

  const addRangeDates = () => {
    if (startDate && endDate) {
      const range = `${startDate} to ${endDate}`;
      setSelectedDates([...selectedDates, range]);
      setStartDate('');
      setEndDate('');
    }
  };

  const removeDate = (indexToRemove) => {
    const updatedDates = selectedDates.filter((_, index) => index !== indexToRemove);
    setSelectedDates(updatedDates);
  };

  const submitDates = () => {
    console.log('Submitting Dates:', selectedDates);
    // Add your submission logic here
  };

  return (
    <div className={style.containerHoliday}>
      <div className={style.leftContainerHoliday}>
        {/* Select Single Date Section */}
        <div className={style.boxHoliday}>
          <h2>Select Single Date</h2>
          <input
            type="date"
            value={singleDate}
            onChange={(e) => setSingleDate(e.target.value)}
          />
          <div className={style.actionsHoliday}>
            <button onClick={addSingleDate}>Add Date</button>
          </div>
        </div>

        {/* Select Date Range Section */}
        <div className={style.boxHoliday}>
          <h2>Select Dates Range</h2>
          <div className={style.dateRange}>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              placeholder="Start Date"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              placeholder="End Date"
            />
          </div>
          <div className={style.actionsHoliday}>
            <button onClick={addRangeDates}>Add Dates</button>
          </div>
        </div>
      </div>

      <div className={style.rightContainerHoliday}>
        <div className={style.boxHoliday}>
          {/* Holiday Dates Section */}
          <h2>Holiday Dates</h2>
          <ul>
            {selectedDates.map((date, index) => (
              <li key={index}>
                {date}
                <button
                  className={style.removeButton}
                  onClick={() => removeDate(index)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button className={style.submitButton} onClick={submitDates}>Submit Dates</button>
        </div>
      </div>
    </div>
  );
}

export default Holiday;
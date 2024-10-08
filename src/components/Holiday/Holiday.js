import React, { useState } from 'react';
import style from './Holiday.module.css';
import axios from 'axios';

function Holiday() {
  const [selectedDates, setSelectedDates] = useState([]);
  const [singleDate, setSingleDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const addSingleDate = () => {
    if (singleDate) {
      setSelectedDates([...selectedDates, { type: 'single', date: singleDate }]);
      setSingleDate('');
    }
  };

  const addRangeDates = () => {
    if (startDate && endDate) {
      setSelectedDates([...selectedDates, { type: 'range', startDate, endDate }]);
      setStartDate('');
      setEndDate('');
    }
  };

  const removeDate = (indexToRemove) => {
    const updatedDates = selectedDates.filter((_, index) => index !== indexToRemove);
    setSelectedDates(updatedDates);
  };

  const submitDates = async () => {
    // Format the data as per the required event format
    const dataToSend = selectedDates.map((item) => {
      if (item.type === 'single') {
        return `0,${item.date}`;
      } else if (item.type === 'range') {
        return `0,${item.startDate},${item.endDate}`;
      }
      return null;
    });

    console.log('Submitting Dates:', dataToSend);

    try {
      const response = await axios.post('https://192.168.241.160:5000/holiday', dataToSend);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error submitting dates:', error);
    }
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
            {selectedDates.map((item, index) => (
              <li key={index}>
                {item.type === 'single' ? item.date : `${item.startDate} to ${item.endDate}`}
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

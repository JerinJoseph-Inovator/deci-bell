import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import style from './Midsem.module.css';
import axios from 'axios';

function Midsem() {
  const [slots, setSlots] = useState([
    { checked: false, startDate: null, endDate: null, time: null },
    { checked: false, startDate: null, endDate: null, time: null },
    { checked: false, startDate: null, endDate: null, time: null }
  ]);

  const handleSlotChange = (index) => {
    const updatedSlots = [...slots];
    updatedSlots[index].checked = !updatedSlots[index].checked;
    setSlots(updatedSlots);
  };

  const handleStartDateChange = (date, index) => {
    const updatedSlots = [...slots];
    updatedSlots[index].startDate = date;
    setSlots(updatedSlots);
  };

  const handleEndDateChange = (date, index) => {
    const updatedSlots = [...slots];
    updatedSlots[index].endDate = date;
    setSlots(updatedSlots);
  };

  const handleTimeChange = (time, index) => {
    const updatedSlots = [...slots];
    updatedSlots[index].time = time;
    setSlots(updatedSlots);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const dataToSend = slots
      .filter(slot => slot.checked)
      .map((slot, index) => ({
        mode: 1,
        slot: index + 1,
        start_date: slot.startDate ? slot.startDate.toLocaleDateString('en-GB') : null,
        end_date: slot.endDate ? slot.endDate.toLocaleDateString('en-GB') : null,
        time: slot.time ? slot.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null,
      }));

    try {
      const response = await axios.post('http://192.168.241.160:5000/emergency', dataToSend);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <div className={style.midsemForm}>
      <form onSubmit={handleSubmit}>
        {slots.map((slot, index) => (
          <div key={index} className={style.slotContainer}>
            <input
              type="checkbox"
              checked={slot.checked}
              onChange={() => handleSlotChange(index)}
            />
            <label htmlFor={`checkbox-${index}`}>Slot {index + 1}</label>
            <div className={style.Slot}>
              <DatePicker
                selected={slot.startDate}
                onChange={(date) => handleStartDateChange(date, index)}
                selectsStart
                startDate={slot.startDate}
                endDate={slot.endDate}
                dateFormat="dd-MM-yyyy"
                placeholderText="Start Date"
                disabled={!slot.checked}
              />
              <DatePicker
                selected={slot.endDate}
                onChange={(date) => handleEndDateChange(date, index)}
                selectsEnd
                startDate={slot.startDate}
                endDate={slot.endDate}
                minDate={slot.startDate}
                dateFormat="dd-MM-yyyy"
                placeholderText="End Date"
                disabled={!slot.checked}
              />
              <DatePicker
                selected={slot.time}
                onChange={(time) => handleTimeChange(time, index)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                dateFormat="h:mm aa"
                placeholderText="Select Time"
                disabled={!slot.checked}
              />
            </div>
          </div>
        ))}
        <br />
        <button className={style.ButtonMidsem} type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Midsem;

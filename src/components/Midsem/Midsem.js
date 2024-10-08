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

  const convertTo24HourFormat = (time) => {
    const [hour, minute, period] = time.toLocaleTimeString('en-US').split(/:| /);
    let hours24 = parseInt(hour);
    if (period === 'PM' && hours24 !== 12) hours24 += 12;
    if (period === 'AM' && hours24 === 12) hours24 = 0;
    return `${hours24}:${minute}`;
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
        time: slot.time ? convertTo24HourFormat(slot.time) : null, // Convert time to 24-hour format
      }));

    try {
      const response = await axios.post('http://192.168.241.160:443/midsem', dataToSend);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <div className={style.midsemForm}>
      <div className={style.header}>
        <h2 className={style.logoMidsem}>Midsem Exam Slot Selection</h2>
      </div>
      <form onSubmit={handleSubmit} className={style.formContainerMidsem}>
        {slots.map((slot, index) => (
          <div key={index} className={style.slotContainerMidsem}>
            <input
              type="checkbox"
              checked={slot.checked}
              onChange={() => handleSlotChange(index)}
              className={style.inputMidsem}
            />
            <label htmlFor={`checkbox-${index}`} className={style.labelMidsem}>Slot {index + 1}</label>
            <div className={style.SlotMidsem}>
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
                timeIntervals={15} // 15 minutes interval
                timeCaption="Time"
                dateFormat="h:mm aa" // am/pm format
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

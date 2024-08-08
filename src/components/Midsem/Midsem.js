import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import style from './Midsem.module.css';
import axios from 'axios';

function SendJson() {
  const [data, setData] = useState({
    key1: 'value1',
    key2: 'value2',
  });

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://<raspberry-pi-ip>:5000/receive-json', data);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error sending JSON:', error);
    }
  };

  return (
    <div>
      <button onClick={handleSubmit}>Send JSON</button>
    </div>
  );
}



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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Slots:', slots);
    // You can perform further actions with the slots here
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
              dateFormat="yyyy-MM-dd"
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
              dateFormat="yyyy-MM-dd"
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Midsem;

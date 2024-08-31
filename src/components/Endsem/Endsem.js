import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import style from './Endsem.module.css';

function Endsem() {
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selections, setSelections] = useState([]);

  const handleDateSelect = (date) => {
    if (date && !selectedDates.includes(date)) {
      setSelectedDates([...selectedDates, date]);
      setSelectedTime(''); // Reset time selection on new date
      setSelectedSlot(''); // Reset slot selection on new date
    }
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
    // You can handle the selected time here
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  function generateTimeOptions() {
    const times = [];
    const periods = ['AM', 'PM'];

    for (let period of periods) {
      for (let hour = 1; hour <= 12; hour++) { // Hour from 1 to 12
        for (let minute = 0; minute < 60; minute += 15) {
          const timeString = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')} ${period}`;
          times.push(timeString);
        }
      }
    }
    return times;
  }

  const handleAddSelection = () => {
    setSelections([
      ...selections,
      {
        date: selectedDates[selectedDates.length - 1].toDateString(),
        time: selectedTime,
        slot: selectedSlot,
      },
    ]);
    setSelectedDates([]);
    setSelectedTime('');
    setSelectedSlot('');
  };

  const handleRemoveSelection = (index) => {
    const updatedSelections = selections.filter((_, i) => i !== index);
    setSelections(updatedSelections);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the selections to the IP address
      await fetch('http://your-ip-address/endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          selections.map(selection => ({
            Mode: 2,
            Slot: selection.slot,
            Date: selection.date,
            Time: selection.time,
          }))
        ),
      });

      // Clear the selections after submission
      setSelections([]);
      alert('Submission successful!');
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Submission failed. Please try again.');
    }
  };

  return (
    <div className={style.ContainerEndsem}>
      <form onSubmit={handleSubmit} className={style.FormEndsem}>
        <div className={style.LeftContainerEndsem}>
          <div className={style.CalendarContainerEndsem}>
            <h2>Select Date</h2>
            <DatePicker
              selected={null}
              onChange={handleDateSelect}
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

          <div className={style.TimeSelectionContainerEndsem}>
            <h2>Select Time</h2>
            <select
              value={selectedTime}
              onChange={handleTimeChange}
              disabled={!selectedDates.length}
            >
              <option value="" disabled>Select a time</option>
              {generateTimeOptions().map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>

          <div className={style.TimeSlotContainerEndsem}>
            <h2>Select Slot</h2>
            <button
              type="button"
              onClick={() => handleSlotSelect('Slot 1')}
              disabled={!selectedTime} // Disable until time is selected
              className={selectedSlot === 'Slot 1' ? style.SelectedEndsem : ''}
            >
              Slot 1
            </button>
            <button
              type="button"
              onClick={() => handleSlotSelect('Slot 2')}
              disabled={!selectedTime} // Disable until time is selected
              className={selectedSlot === 'Slot 2' ? style.SelectedEndsem : ''}
            >
              Slot 2
            </button>
            <button
              type="button"
              onClick={() => handleSlotSelect('Slot 3')}
              disabled={!selectedTime} // Disable until time is selected
              className={selectedSlot === 'Slot 3' ? style.SelectedEndsem : ''}
            >
              Slot 3
            </button>
          </div>

          <div className={style.AddSelectionContainerEndsem}>
            <button
              type="button"
              onClick={handleAddSelection}
              disabled={!selectedDates.length || !selectedTime || !selectedSlot}
            >
              Add Selection
            </button>
          </div>
        </div>

        <div className={style.SelectedDatesContainerEndsem}>
          <h2>Selected Dates</h2>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Slot</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {selections.map((selection, index) => (
                <tr key={index}>
                  <td>{selection.date}</td>
                  <td>{selection.time}</td>
                  <td>{selection.slot}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleRemoveSelection(index)}
                      className={style.removeButton}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        <button className={style.buttonEndsem} type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Endsem;

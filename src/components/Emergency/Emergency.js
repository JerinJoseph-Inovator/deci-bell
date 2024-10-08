import React, { useState } from 'react';
import axios from 'axios'; // Ensure axios is installed

import styles from './Emergency.module.css';

function Emergency() {
  const [isSending, setIsSending] = useState(false);

  const handleClick = async () => {
    setIsSending(true); // Set loading state

    try {
      const data = { Mode: 5 }; // JSON data to send
      const response = await axios.post('https://192.168.241.160:443/emergency', data); // Replace with your Raspberry Pi details

      if (response.status === 200) {
        console.log('Emergency signal sent successfully!');
        alert('Emergency signal sent successfully!');
      } else {
        console.error('Error sending emergency signal:', response.statusText);
        alert('Error sending emergency signal. Please try again.');
      }
    } catch (error) {
      console.error('Error sending emergency signal:', error);
      alert('Error sending emergency signal. Please try again.');
    } finally {
      setIsSending(false); // Reset loading state
    }
  };

  return (
    <div className={styles.emergencyMain}>
      <span className={styles.buttonEmergency}> 
        <button disabled={isSending} onClick={handleClick} className={styles.buttonEmergencyIN}>
          {isSending ? 'Sending Emergency Signal...' : 'Emergency Bell'}
        </button>
      </span>
    </div>
  );
}

export default Emergency;

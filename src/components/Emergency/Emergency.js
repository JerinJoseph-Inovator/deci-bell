import React, { useState } from 'react';
import axios from 'axios'; // Install axios for making HTTP requests

import styles from "./Emergency.module.css";
function Emergency() {
  const [isSending, setIsSending] = useState(false);

  const handleClick = async () => {
    setIsSending(true); // Set loading state

    try {
      const data = { Mode: 5 }; // JSON data to send
      const response = await axios.post('http://192.168.241.160:5000/emergency', data); // Replace with your Raspberry Pi details

      if (response.status === 200) {
        console.log('Emergency signal sent successfully!');
      } else {
        console.error('Error sending emergency signal:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending emergency signal:', error);
    } finally {
      setIsSending(false); // Reset loading state
    }
  };

  return (
    <div className={styles.emergencyMain}>
      <span className={styles.buttton}> 
        <button disabled={isSending} onClick={handleClick}>
        {isSending ? 'Sending Emergency Signal...' : 'Emergency Bell'}
      </button>
      </span>
    </div>
  );
}

export default Emergency;

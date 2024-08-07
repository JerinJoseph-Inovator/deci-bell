import React from "react";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import img1 from "./logo.jpg";


import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Midsem from "../Midsem/Midsem";
import Endsem from "../Endsem/Endsem";
import Emergency from "../Emergency/Emergency";
import Regular from "../Regular/Regular";
import Holiday from "../Holiday/Holiday";

function Home(props) {
  const navigate = useNavigate();

  const handleSelectionChange = (event) => {
    const value = event.target.value;
    switch (value) {
      case "regular":
        navigate("/Home/Regular");
        break;
      case "midsem":
        navigate("/Home/Midsem");
        break;
      case "endsem":
        navigate("/Home/Endsem");
        break;
      case "emergency":
          navigate("/Home/Emergency");
          break;
      case "holiday":
            navigate("/Home/Holiday");
            break;
      default:
        // No navigation needed for other options
        break;
    }
  };

  const handleLogout = () => {
    // Perform logout action, e.g., clear authentication state
    auth.signOut().then(() => navigate('/Login'));
    // Here, we'll simulate logout by clearing local storage
    // localStorage.removeItem('userId');
    navigate('/Login');
  };

  return (
    <div>
    <div className={styles.container}>
      <span className={styles.mode}>
        {props.label && <label htmlFor="language">{props.label}</label>}
        <select
          name="language"
          id="language"
          onChange={handleSelectionChange}
          {...props}
        >
          <option value="regular">Regular</option>
          <option value="midsem">Mid-sem</option>
          <option value="endsem">End-sem</option>
          <option value="emergency">Emergency</option>
          <option value="holiday" >Holiday</option>
        </select>
      </span>
      <button className={styles.logout} onClick={handleLogout}>Logout</button>
    <span>
    <img src={img1} alt="Image 1" className={styles.logo} />
    </span>
    
    </div>



  {/*  ROUTE SETUP */}
  <Routes>
        <Route path="Midsem" element={<Midsem />} />
        <Route path="Endsem" element={<Endsem />} />
        <Route path="Emergency" element={<Emergency />} />
        <Route path="Holiday" element={<Holiday />} />
        <Route path="Regular" element={<Regular />} />
  </Routes>
  </div> 
  );
}

export default Home;

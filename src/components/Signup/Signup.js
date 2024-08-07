import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

import styles from "./Signup.module.css";
import InputControl from "../InputControl/InputControl";

function Signup() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    pass: "",
    confirmPass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if (!values.email || !values.pass || !values.confirmPass) {
      setErrorMsg("Fill all fields");
      return;
    }
    if (values.pass !== values.confirmPass) {
      setErrorMsg("Passwords do not match");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);

        navigate("/Home");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.headingBox}>
        <h2>Sign Up</h2>
        <div className={styles.headingBox2}>
          DeciBell Management <br /> System
        </div>
      </div>

      <div className={styles.signup}>
        <span className={"Secontainer"}>
          <InputControl
            label="Email"
            type="text"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, email: event.target.value }))
            }
            placeholder="Enter email address"
          />
          <InputControl
            label="Password"
            type="password"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, pass: event.target.value }))
            }
            placeholder="Enter Password"
          />
          <InputControl
            label="Confirm Password"
            type="password"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, confirmPass: event.target.value }))
            }
            placeholder="Confirm Password"
          />
        </span>

        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button disabled={submitButtonDisabled} onClick={handleSubmission}>
            Sign Up
          </button>
          <p style={{ color: "white" }}>
            Already have an account?
            <span>
              <Link to="/Login"> Login </Link>
            </span>
            Today!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;

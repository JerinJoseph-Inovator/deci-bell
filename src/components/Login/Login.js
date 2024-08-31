import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import styles from "./Login.module.css";
import InputControl from "../InputControl/InputControl";

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {  
    if (!values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);

        navigate("/Home/Regular");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.headingBox}>
        <h2>Login</h2>
        <div className={styles.headingBox2}>
          DeciBell Management <br /> System
        </div>
      </div>

      <div className={styles.login}>
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
        </span>

        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button disabled={submitButtonDisabled} onClick={handleSubmission}>
            Login
          </button>
          {/* <p style={{ color: "white" }}>
            Don't have an account?{" "}
            <span>
              <Link to="/Signup">Sign up</Link>
            </span>{" "}
            today!
          </p> */}
        </div>
      </div>
    </div>
  );
}

export default Login;

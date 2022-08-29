import React from "react";
import { useState } from "react";
import axios from "axios";
import styles from "../Components/styles/Signup.module.css";
import { useNavigate } from "react-router-dom";
import signup from "../Asset/signup.jpg";
const SignUpForm = (props) => {
  //State SignUp Input
  const [sUser, setSUser] = useState("");
  const [sPass, setSPass] = useState("");
  const [sRPass, setSRPass] = useState("");
  const [sEmail, setSEmail] = useState("");

  const [errUsername, setErrUsername] = useState(false);
  const [errPassword, setErrPassword] = useState(true);
  const [errEmail, setErrEmail] = useState(true);
  const [errRePassword, setErrRePassword] = useState(true);
  let navi = useNavigate();

  //State SignUp Handler
  const handleSUser = (e) => {
    setSUser(e.target.value);
    setErrUsername(false);
  };
  const handleSPass = (e) => {
    setSPass(e.target.value);
    setErrPassword(false);
  };
  const handleSRPass = (e) => {
    setSRPass(e.target.value);
    setErrRePassword(false);
  };
  const handleSEmail = (e) => {
    setSEmail(e.target.value);
    setErrEmail(false);
  };
  //State SignUp Button
  const handleSignUp = (e) => {
    axios
      .post("http://localhost:7000/auth/signup", {
        username: sUser,
        password: sPass,
        repass: sRPass,
        email: sEmail,
      })
      .then((res) => {
        if (res.data.success) {
          sessionStorage.setItem("username", sUser);
          navi("/verify");
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  const onClickLogin = () => {
    props.setLoginPop(true);
    props.setSignUpPop(false);
  };
  const onClose = () =>{
    props.setLoginPop(false);
    props.setSignUpPop(false)
  }
  return (
    <div className={styles["form-container"]}>
      <div className={styles["login-img-cont"]}>
        <img src={signup} className={styles["signup-img"]} alt="signup-img"></img>
        <a className={styles["login-img-attr"]} href="http://www.freepik.com">
          Designed by / Freepik
        </a>
      </div>
      <div>
        
        <div>
          <div className={styles["input-container"]}>
            <span className={styles["input-header"]}>Username: </span>
            <input
              className={styles["input-field"]}
              type="text"
              onChange={handleSUser}
              placeholder="Enter Your Username"
              defaultValue=""
            ></input>
            {errUsername ? (
              <p className={styles["err-msg"]}>Username in use</p>
            ) : (
              <></>
            )}
          </div>
          <div className={styles["input-container"]}>
            <span className={styles["input-header"]}>Email: </span>
            <input
              className={styles["input-field"]}
              type="email"
              onChange={handleSEmail}
              placeholder="Enter Your Email"
            ></input>
            {errEmail ? (
              <p className={styles["err-msg"]}>
                Please Enter a valid Email Address
              </p>
            ) : (
              <></>
            )}
          </div>
          <div className={styles["input-container"]}>
            <span className={styles["input-header"]}>Password: </span>
            <input
              className={styles["input-field"]}
              type="password"
              onChange={handleSPass}
              placeholder="Enter Your Password"
            ></input>
            {errPassword ? (
              <p className={styles["err-msg"]}>
                Password should contain at least 1 upper case, 1 lower case, 1
                number and 1 special character.
              </p>
            ) : (
              <></>
            )}
          </div>

          <div className={styles["input-container"]}>
            <span className={styles["input-header"]}>Re-enter Password: </span>
            <input
              className={styles["input-field"]}
              type="password"
              onChange={handleSRPass}
              placeholder="Re-enter Your Password"
            ></input>
            {errRePassword ? (
              <p className={styles["err-msg"]}>
                Please make sure your Password matches
              </p>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className={styles["sub-btn-container"]}>
          <button className={styles["sub-btn"]} onClick={handleSignUp}>
            Sign Up
          </button>
          <button onClick={onClose} className={styles["close-btn"]}>Close</button>
          <p onClick={onClickLogin} className={styles["conversion-text-spec"]}>
            Proceed to Login
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;

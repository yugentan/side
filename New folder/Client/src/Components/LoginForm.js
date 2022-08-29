import React from "react";
import { useState } from "react";
import axios from "axios";
import styles from "../Components/styles/Signup.module.css";
import { useNavigate } from "react-router-dom";
import login from "../Asset/login.jpg"
const LoginForm = (props) => {
  //State Login Input
  const [lUser, setLUser] = useState("");
  const [lPass, setLPass] = useState("");
  let navi = useNavigate();
  const handleLUser = (e) => {
    setLUser(e.target.value);
  };
  const handleLPass = (e) => {
    setLPass(e.target.value);
  };
  //State Login Button
  const handleLogin = () => {
    axios
      .post("http://localhost:7000/auth/login", {
        username: lUser,
        password: lPass,
      })
      .then((res) => {
        if (res.data.success) {
          sessionStorage.setItem("JWT", res.data.data.tkn);
          navi("/home");
        }
      })
      .catch((err) => {
        alert("Invalid loging credential");
      });
  };
  const onClickSignUp = () => {
    props.setLoginPop(false);
    props.setSignUpPop(true);
  };
    const onClose = () =>{
    props.setLoginPop(false);
    props.setSignUpPop(false)
  }
  return (
    <div className={styles["form-container"]}>
      <div className={styles['login-img-cont']}>
        <img src={login} className={styles['login-img']} alt="login-img"></img>
      <a className={styles['login-img-attr']} href="http://www.freepik.com">Designed by slidesgo / Freepik</a>
      </div>
      <div>
        
        <div>
          <div className={styles["input-container"]}>
            <span className={styles["input-header"]}>Username: </span>
            <input
              className={styles["input-field"]}
              type="text"
              onChange={handleLUser}
              placeholder="Enter Your Username"
            ></input>
          </div>
          <div className={styles["input-container"]}>
            <span className={styles["input-header"]}>Password: </span>
            <input
              className={styles["input-field"]}
              type="password"
              onChange={handleLPass}
              placeholder="Enter Your Password"
            ></input>
          </div>
        </div>
        <div className={styles["sub-btn-container"]}>
          <button className={styles["sub-btn"]} onClick={handleLogin}>
            Login
          </button>
          <button onClick={onClose} className={styles['close-btn']}>Close</button>
          <p className={styles['conversion-text']}>Don't have an account? <span className={styles['conversion-text-spec']} onClick={onClickSignUp}>Sign Up Here</span></p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

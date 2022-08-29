import React from "react";
import styles from "./styles/verify.module.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VerifyContent = () => {
  const [code, setCode] = useState("");
  let navi = useNavigate();

  const submitVerf = () => {
    axios
      .post("http://localhost:7000/auth/verify", {
        username: sessionStorage.getItem("username"),
        code: code,
      })
      .then((res) => {
        if(res.data.success || res.data.message === "already verified"){
            alert("You have been verified, Redirecting to login")
            sessionStorage.removeItem("username")
            navi("/")
        }else{
            alert("Invalid token, please check your email again");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };
  return (
    <div className={styles["backdrop"]}>
      <div className={styles["form-container"]}>
        <p className={styles["form-header"]}>
          Please input your 6 digit Verification Code <br></br>sent to your
          email
        </p>
        <input
          className={styles["input-field"]}
          placeholder="Verification Code"
          onChange={handleCodeChange}
        ></input>
        <button className={styles["sub-btn"]} onClick={submitVerf}>Verify</button>
      </div>
    </div>
  );
};

export default VerifyContent;

import React from "react";
import { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import styles from "../Components/styles/Signup.module.css"

const SignupLogin = () => {
  //State Management
  const [currState, setCurrState] = useState("login");

  return currState === "login" ? <div className={styles["backdrop"]}>
    <LoginForm setCurrState={setCurrState}/> 
    </div>: <div className={styles["backdrop"]}>
    <SignUpForm setCurrState={setCurrState}/>
      </div>;
};

export default SignupLogin;

import React from "react";
import styles from "./styles/Header.module.css";
import { UserOutlined, MenuOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import logo from "../Asset/logo.png";
import axios from "axios";
const Header = () => {
  let navi = useNavigate();
  const [pop, setPop] = useState(false);
  const [loginPop, setLoginPop] = useState(false);
  const [signupPop, setSignUpPop] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    axios
      .post("http://localhost:7000/auth/auth", {
        tkn: sessionStorage.getItem("JWT"),
      })
      .then((res) => {
        if (res.data.success) {
          setIsLogin(true);
          setPop(false);
          setSignUpPop(false);
          setLoginPop(false);
        }
      })
      .catch((err) => {
        console.log("You Have not Login yet");
      });
  }, []);
  const handleClick = () => {
    setPop(!pop);
  };
  const handleLoginClick = () => {
    setLoginPop(true);
    setPop(false);
    setSignUpPop(false);
  };
  const handleSignUpClick = () => {
    setSignUpPop(true);
    setPop(false);
    setLoginPop(false);
  };
  const handleProfile = () => {
    navi("/profile")
  }
  const handleSetting = () => {
    navi("/setting")
  }
  const handleLogout = () => {
    sessionStorage.removeItem("JWT")
    setIsLogin(false)
    setPop(false)
    alert("You have Logged Out")
    navi("/")
  }
  const handleEventClick = () => {
    navi("/events/all");
  };
  const handleAboutClick = () => {
    navi("/aboutus");
  };
  return (
    <div className={styles["header-container"]}>
      <div className={styles["logo-cont"]}>
        <img className={styles["logo"]} src={logo} alt="logo"></img>
      </div>
      <div className={styles["login-container"]}>
        <button className={styles["login-icon"]} onClick={handleClick}>
          <UserOutlined />
          <MenuOutlined />
        </button>
        {pop ? (
          isLogin ? (
            <div className={styles["loginPop"]}>
              <p className={styles["popItem"]} onClick={handleEventClick}>
                Events
              </p>
              <span className={styles["divider"]}></span>
              <p className={styles["popItem"]} onClick={handleProfile}>
                Profile
              </p>
              <span className={styles["divider"]}></span>
              <p className={styles["popItem"]} onClick={handleSetting}>
                Settings
              </p>
              <span className={styles["divider"]}></span>
              <p className={styles["popItem"]} onClick={handleLogout}>
                Logout
              </p>
            </div>
          ) : (
            <div className={styles["loginPop"]}>
              <p className={styles["popItem"]} onClick={handleLoginClick}>
                Login
              </p>
              <span className={styles["divider"]}></span>
              <p className={styles["popItem"]} onClick={handleSignUpClick}>
                SignUp
              </p>
              <span className={styles["divider"]}></span>
              <p className={styles["popItem"]} onClick={handleEventClick}>
                Events
              </p>
              <span className={styles["divider"]}></span>
              <p className={styles["popItem"]} onClick={handleAboutClick}>
                About
              </p>
            </div>
          )
        ) : (
          <></>
        )}
      </div>
      {loginPop ? (
        <LoginForm setSignUpPop={setSignUpPop} setLoginPop={setLoginPop} />
      ) : (
        <></>
      )}
      {signupPop ? (
        <SignUpForm setLoginPop={setLoginPop} setSignUpPop={setSignUpPop} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Header;

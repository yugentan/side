import React from "react";
import logo from "../Asset/logo.png";
import styles from "./styles/Footer.module.css";
import {
  InstagramOutlined,
  FacebookOutlined,
  TwitterOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  let navi = useNavigate();
  const handleTos = () => {
    navi("/tos");
  };
  const handleDp = () => {
    navi("/policy");
  };
  const handleBp = () => {
    navi("/policy");
  };
  const handleAu = ()=>{
    navi("/aboutus");
  }
  return (
    <div className={styles["footer-container"]}>
      <div className={styles["footer-top"]}>
        <div className={styles["footer-top-left"]}>
          <img src={logo} alt="logo"></img>
          <div className={styles["footer-top-left-bottom"]}>
            <a href="https://www.instagram.com/">
              <InstagramOutlined />
            </a>
            <a href="https://www.facebook.com/">
              <FacebookOutlined />
            </a>
            <a href="https://www.twitter.com/">
              <TwitterOutlined />
            </a>
            <a href="https://www.whatsapp.com/">
              <WhatsAppOutlined />
            </a>
          </div>
        </div>
        <div className={styles["footer-top-mid"]}>
          <p className={styles["footer-top-header"]}>Legal</p>
          <p className={styles["footer-top-item-1"]} onClick={handleTos}>
            Terms of Use
          </p>
          <p className={styles["footer-top-item-1"]} onClick={handleDp}>
            Data Policy
          </p>
          <p className={styles["footer-top-item-1"]} onClick={handleBp}>
            Event Booking Policy
          </p>
        </div>
        <div className={styles["footer-top-right"]}>
          <p className={styles["footer-top-header"]}>Contact Us</p>
          <p className={styles["footer-top-item-1"]} onClick={handleAu}>About Us</p>
          <p className={styles["footer-top-item"]}>
            Email:{" "}
            <a
              className={styles["footer-email"]}
              href="mailto:team83agiledevtest@outlook.com"
            >
              team83agiledevtest@outlook.com
            </a>
          </p>
          <p className={styles["footer-top-item"]}>Contact: (+65) 8434 3248</p>
        </div>
      </div>
      <div className={styles["footer-bottom"]}>
        <p>&copy; 2022 • Team 83 Agile Software Development Project •</p>
      </div>
    </div>
  );
};

export default Footer;

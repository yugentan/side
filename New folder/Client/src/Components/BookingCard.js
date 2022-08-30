import React, { useEffect, useState } from "react";
import styles from "./styles/BookingCard.module.css";
import axios from "axios";
const BookingCard = ({ data, setShowCard }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [pax, setPax] = useState("");
  const emailRegex = new RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/
  );
  useEffect(() => {
    axios
      .post("http://localhost:7000/auth/auth", {
        tkn: sessionStorage.getItem("JWT"),
      })
      .then((res) => {
        if (res.data.success) {
          console.log(1);
        }
      })
      .catch((err) => {
        alert("You have not Login yet \nLogin first to initiate booking");
        setShowCard(false);
      });
  });
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleContact = (e) => {
    setContact(e.target.value);
  };
  const handlePax = (e) => {
    setPax(e.target.value);
  };
  const handleClick = () => {
    if(name == "" || email == "" || contact == "" || pax == ""){
      alert("Please Fill In The Required Field")
    }else{
      if(!emailRegex.test(email)){
        alert("Please Enter A Valid Email")
      }else if(isNaN(contact)){
        alert("Please Enter A Valid Contact Number")
      }else{
        axios.post("http://localhost:7000/event/book",{
          token:sessionStorage.getItem("JWT"),
          bookedEvent:data[0].event_id,
          email:email,
          pax:pax
        })
        .then((res)=>{
          console.log(res)
        })
        .catch((err)=>{
          console.log(err)
        })
      }
    }
    console.log(email);
    console.log(contact);
    console.log(pax);
  };
  return (
    <div className={styles["booking-cont"]}>
      <div className={styles["booking-card"]}>
        <p>{data[0].event_name}</p>
        <p>
          {data[0].event_location}:{data[0].event_date.split("T")[0]} :{" "}
          {data[0].event_timing}
        </p>
        <p>{data[0].event_pax_remaining}</p>
        <div className={styles["input-div"]}>
          <span className={styles["input-header"]}>Name: </span>
          <input
            className={styles["input-field"]}
            type="text"
            placeholder="Enter Recipient's Name"
            onChange={handleName}
          ></input>
        </div>
        <div className={styles["input-div"]}>
          <span className={styles["input-header"]}>Email: </span>
          <input
            className={styles["input-field"]}
            type="email"
            placeholder="Enter Recipient's Email"
            onChange={handleEmail}
          ></input>
        </div>
        <div className={styles["input-div"]}>
          <span className={styles["input-header"]}>Contact: </span>
          <input
            className={styles["input-field"]}
            type="text"
            placeholder="Enter Recipient Contact Number"
            onChange={handleContact}
          ></input>
        </div>
        <div className={styles["input-div"]}>
          <span className={styles["input-header"]}>Amount: </span>
          <input
            className={styles["input-field"]}
            type="number"
            min={0}
            max={data[0].event_max_pax}
            placeholder="Select PAX"
            onChange={handlePax}
          ></input>
        </div>
        <div>
          <button className={styles["book-btn"]} onClick={handleClick}>
            Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;

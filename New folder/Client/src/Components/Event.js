import axios from "axios";
import React, { useState, useEffect } from "react";
import EventPartial from "./EventPartial";
import { useNavigate } from "react-router-dom";
import styles from "./styles/EventPartial.module.css";
import BookingCard from "./BookingCard";
const Event = ({ list }) => {
  let navi = useNavigate();
  const [event, setEvent] = useState([]);
  useEffect(() => {
    if (list === "all") {
      axios
        .get("http://localhost:7000/event/getAllEvent")
        .then((res) => {
          setEvent(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post("http://localhost:7000/event/searchByLocation", {
          location: list,
        })
        .then((res) => {
          if (res.data.success) {
            setEvent(res.data.data);
          } else {
            alert("No Location Found! \nRedirecting...");
            navi("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
  const handleBack = () => {
    navi("/");
  };
  const [showCard, setShowCard] = useState(false);
  const [cardSelected, setCardSelected] = useState();
  return (
    <div className={styles["e-container"]}>
      <button onClick={handleBack} className={styles["back-btn"]}>
        Back
      </button>
      {event.map((e) => (
        <div key={e.event_id}>
          <EventPartial
            detail={e}
            setShowCard={setShowCard}
            setCardSelected={setCardSelected}
          />
        </div>
      ))}
      {showCard ? <BookingCard id={cardSelected} /> : <></>}
    </div>
  );
};

export default Event;

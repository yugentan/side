import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import styles from "./styles/EventPartial.module.css";
import { ArrowRightOutlined } from "@ant-design/icons";
import eimg1 from "../Asset/eimg1.jpg";
import eimg2 from "../Asset/eimg2.jpg";
import eimg3 from "../Asset/eimg3.jpg";
import eimg4 from "../Asset/eimg4.jpg";
import axios from "axios";
const EventPartial = ({ detail, setShowCard, setCardSelected }) => {
  const handleBookPop = (id) => {
    axios
      .post("http://localhost:7000/auth/auth", {
        tkn: sessionStorage.getItem("JWT"),
      })
      .then((res) => {
        if (res.data.success) {
          setShowCard(true);
          setCardSelected(id);
        }
      })
      .catch((err) => {
        alert("You have not Login yet \nLogin first to initiate booking");
      });
  };

  return (
    <div className={styles["event-cont"]}>
      <div className={styles["event-left"]}>
        <Carousel
          showArrows={true}
          autoPlay={true}
          infiniteLoop={true}
          showThumbs={false}
          className={styles["carousel"]}
        >
          <div className={styles["cimg-c"]}>
            <img className={styles["cimg"]} src={eimg1} alt="carousel-img" />
            <p className="legend">http://www.freepik.com</p>
          </div>
          <div className={styles["cimg-c"]}>
            <img className={styles["cimg"]} src={eimg2} alt="carousel-img" />
            <p className="legend">http://www.freepik.com</p>
          </div>
          <div className={styles["cimg-c"]}>
            <img className={styles["cimg"]} src={eimg3} alt="carousel-img" />
            <p className="legend">http://www.freepik.com</p>
          </div>
          <div className={styles["cimg-c"]}>
            <img className={styles["cimg"]} src={eimg4} alt="carousel-img" />
            <p className="legend">http://www.freepik.com</p>
          </div>
        </Carousel>
      </div>
      <div className={styles["event-right"]}>
        <div className={styles["event-header"]}>
          <p className={styles["event-name"]}>{detail.event_name}</p>
          <p className={styles["event-organiser"]}>
            Organised By: {detail.event_organiser}
          </p>
        </div>
        <div className={styles["event-body"]}>
          <p className={styles["event-desc"]}>
            <b>Details: </b>
            {detail.event_desc}
          </p>
        </div>

        <div className={styles["event-date-cont"]}>
          <p className={styles["event-date"]}>
            Location: {detail.event_location}
          </p>
          <p className={styles["event-date"]}>
            Rating: {detail.event_rating}/5
          </p>
          <p className={styles["event-date"]}>
            Date: {detail.event_date.split("T")[0]}
          </p>
          <p className={styles["event-date"]}>Time: {detail.event_timing}</p>
        </div>
        <button
          className={styles["event-btn"]}
          onClick={() => handleBookPop(detail.event_id)}
        >
          Book Now
          <ArrowRightOutlined />
        </button>
      </div>
    </div>
  );
};

export default EventPartial;

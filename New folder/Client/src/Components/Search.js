import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import styles from "./styles/Search.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Search = () => {
  let navi = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:7000/event/getAllLocation")
      .then((res) => {
        let data = [];
        res.data.data.forEach((location) => {
          if(!data.includes(location.event_location)){
            data.push(location.event_location);
          }
        });
        setLocation(data);
      })
      .catch((err) => {
        alert("Internal Server Error")
      });
  }, []);
  const [squery, setSquery] = useState("");
  const [location, setLocation] = useState([]);
  const [avail, setShowAvail] = useState(false);
  const handleInput = (e) => {
    setSquery(e.target.value);
  };
  const handleShowAvail = () => {
    setShowAvail(true);
  };
  const handleSearch = (e) => {
    navi(`/events/${e.target.value}`);
    setShowAvail(false);
  };
  const handleInputSearch = () => {
    if (squery === "" || squery === undefined || squery === null) {
      navi("/events/all");
      setShowAvail(false);
    } else {
      navi(`/events/${squery}`);
      setShowAvail(false);
    }
  };
  const handleClose = () => {
    setShowAvail(false);
  };
  return (
    <div className={styles["searchParent"]}>
      <div className={styles["searchCont"]}>
        <input
          onClick={handleShowAvail}
          type="text"
          onChange={handleInput}
          placeholder="Enter a location"
          className={styles["searchInput"]}
        ></input>
        <button className={styles["searchButton"]} onClick={handleInputSearch}>
          <SearchOutlined />
        </button>
      </div>
      {avail ? (
        <div className={styles["location-pop"]}>
          <p className={styles["location-header"]}>
            List of available location:
          </p>
          <div className={styles["location-btn"]}>
            {location.map((location) => {
              return (
                <button
                  onClick={handleSearch}
                  value={location}
                  className={styles["location-items"]}
                >
                  {location}
                </button>
              );
            })}
            <button className={styles["location-close"]} onClick={handleClose}>
              close
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Search;

import React from "react";
import Header from "../Components/Header";
import Event from "../Components/Event";
import Footer from "../Components/Footer";
import { useParams } from "react-router-dom";
const EventPage = () => {
  const { location } = useParams();
  return (
    <div>
      <Header />
      <Event list={location} />
      <Footer />
    </div>
  );
};

export default EventPage;

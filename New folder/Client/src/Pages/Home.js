import React from "react";
import Header from "../Components/Header";
import Homepage from "../Components/Homepage";
import Footer from "../Components/Footer";
import Search from "../Components/Search";

const Home = () => {
  return (
    <div>
      <Header />
      <Search />
      <Homepage />
      <Footer />
    </div>
  );
};

export default Home;

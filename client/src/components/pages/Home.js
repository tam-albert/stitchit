import React, { useState, useEffect } from "react";

import "../../utilities.css";
import "./Home.css";
import title from "./stitchit_title.png";

const Home = () => {

  useEffect(() => {
    document.title = "STITCHIT";
  }, []);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (res) => {
    // 'res' contains the response from Google's authentication servers
    console.log(res);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    console.log("Logged out successfully!");
    setLoggedIn(false);
  };
  return (
    <>
        <img src={title} alt="Title" className="title"/>
        <h1 className="tag">a collaborative journal.</h1>
    </>
  );
};

export default Home;
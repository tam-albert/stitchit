import React, { useState, useEffect } from "react";

import "../../utilities.css";
import "./Home.css";
import title from "./stitchit_title.png";

const Home = () => {

  useEffect(() => {
    document.title = "STITCHIT";
  }, []);

  return (
    <>
        <img src={title} alt="Title" className="title"/>
        <h1 className="tag">a collaborative journal.</h1>
    </>
  );
};

export default Home;
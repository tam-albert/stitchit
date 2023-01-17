import React, { useState, useEffect } from "react";

import "../../utilities.css";
import "./Home.css";

const Home = () => {

  useEffect(() => {
    document.title = "Home Page";
  }, []);


  return (
    <>
        <h1 className="Home-name u-textCenter">STITCHIT: this be our seggsy home page</h1>
    </>

  );
};

export default Home;

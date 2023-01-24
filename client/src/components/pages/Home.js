import React, { useState, useEffect } from "react";

import "../../utilities.css";
import "./Home.css";

const Home = (props) => {
  const [text, setText] = useState("");

  return (
    <>
      <div className="px-4 h-full">
        <textarea
          className="w-full h-full p-4 resize-none rounded-md text-lg placeholder:italic placeholder:text-2xl"
          placeholder="Speak your mind, add an image, or answer our daily prompt."
          maxlength="20000"
        ></textarea>
      </div>
    </>
  );
};

export default Home;

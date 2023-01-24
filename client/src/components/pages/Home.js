import React, { useState, useEffect } from "react";

import "../../utilities.css";
import "./Home.css";

const Home = (props) => {
  const [text, setText] = useState("");

  return (
    <>
      <div className="px-4 h-full flex flex-col">
        <textarea
          className="w-full grow p-4 resize-none rounded-md text-lg placeholder:italic placeholder:text-2xl"
          placeholder="Speak your mind, add an image, or answer our daily prompt."
          maxlength="20000"
        ></textarea>
        <div className="bg-light-pink my-1 p-4 rounded-md flex">
          <div className="grow">HIIII</div>
          <div>I LOVE EVERYBODY UNTIL I LOVE YOU</div>
        </div>
      </div>
    </>
  );
};

export default Home;

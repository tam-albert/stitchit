import React, { useState, useEffect } from "react";
import PostDialog from "../modules/PostDialog";
import { post } from "../../utilities";
import { useNavigate } from "@reach/router";

import "../../utilities.css";
import "./Home.css";

const Home = (props) => {
  const [text, setText] = useState("");

  const navigate = useNavigate();

  const handleChange = (event) => {
    setText(event.target.value);
    console.log(text);
  };

  const publish = (journalIds) => {
    journalIds.forEach((id) => {
      const body = { content: text, journal_id: id };
      post("/api/entry", body).then(() => {
        console.log(`Published entry to journal with ID ${id}`);
      });
    });
  };

  const saveAsDraft = () => {
    const body = { content: text };
    post("/api/draft", body).then(() => {
      navigate(`/drafts`);
    });
  };

  return (
    <>
      <div className="px-16 py-12 h-full flex flex-col">
        <textarea
          className="w-full grow p-4 resize-none rounded-md text-lg placeholder:italic placeholder:text-2xl"
          placeholder="Speak your mind, add an image, or answer our daily prompt."
          maxLength="20000"
          onChange={handleChange}
        ></textarea>
        <div className="bg-tertiary my-1 p-4 rounded-md flex flex-row-reverse items-center">
          <PostDialog publish={publish} />
          <button
            className="border-2 border-slate-500 px-3 py-2 rounded-full mr-4 text-slate-700 duration-100
            hover:bg-gray-200"
            onClick={saveAsDraft}
          >
            Save As Draft
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;

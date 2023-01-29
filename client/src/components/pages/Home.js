import React, { useState, useEffect } from "react";
import PostDialog from "../modules/PostDialog";
import { post } from "../../utilities";
import { useNavigate } from "@reach/router";

import "../../utilities.css";
import "./Home.css";

const Home = (props) => {
  const [text, setText] = useState(
    props.location?.state?.content ? props.location?.state?.content : ""
  );

  const navigate = useNavigate();

  const handleChange = (event) => {
    setText(event.target.value);
    console.log(text);
  };

  const publish = async (journalIds) => {
    await Promise.all(
      journalIds.map(async (id) => {
        const body = { content: text, journal_id: id };
        await post("/api/entry", body);
        console.log(`Published entry to journal with ID ${id}`);
        if (props.location?.state?.draftId) {
          // Remove draft from existence once it's published
          await fetch(`/api/draft/?draftId=${props.location?.state?.draftId}`, {
            method: "DELETE",
            headers: { "Content-type": "application/json" },
          });
        }
      })
    );
  };

  const saveAsNewDraft = () => {
    const body = { content: text };
    post("/api/draft", body).then(() => {
      navigate("/drafts");
    });
  };

  const saveToDraft = () => {
    const body = { draftId: props.location?.state?.draftId, content: text };
    fetch("/api/draft", {
      method: "put",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(body),
    })
      .then(() => {
        navigate("/drafts");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="px-16 py-12 h-full flex flex-col">
        <textarea
          className="w-full grow p-4 resize-none rounded-md text-lg placeholder:italic placeholder:text-2xl"
          placeholder="Speak your mind, add an image, or answer our daily prompt."
          maxLength="20000"
          onChange={handleChange}
          defaultValue={text}
        ></textarea>
        <div className="bg-tertiary my-1 p-4 rounded-md flex flex-row-reverse items-center">
          <PostDialog publish={publish} />
          {props.location?.state?.draftId ? (
            <button
              className="border-2 border-slate-500 px-3 py-2 rounded-full mr-4 text-slate-700 duration-100
            hover:bg-gray-200"
              onClick={saveToDraft}
            >
              Save
            </button>
          ) : (
            <button
              className="border-2 border-slate-500 px-3 py-2 rounded-full mr-4 text-slate-700 duration-100
            hover:bg-gray-200"
              onClick={saveAsNewDraft}
            >
              Save As Draft
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;

import React, { useState, useEffect } from "react";
import PostDialog from "../modules/PostDialog";
import { get, post } from "../../utilities";
import { useNavigate } from "@reach/router";
import { XMarkIcon } from "@heroicons/react/24/outline";
import HelpTooltip from "../modules/HelpTooltip.js";
import { Link } from "@reach/router";

import "../../utilities.css";
import "./Home.css";

const Home = (props) => {
  const [text, setText] = useState(
    props.location?.state?.content ? props.location?.state?.content : ""
  );

  // default true so that dialog doesn't pop up lol
  const [hasJournals, setHasJournals] = useState(true);

  const [prompt, setPrompt] = useState(props.location?.state?.prompt);

  useEffect(() => {
    get("/api/journals").then((journals) => {
      setHasJournals(!!journals.length);
    });
  }, []);

  const navigate = useNavigate();

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const publish = async (journalIds) => {
    await Promise.all(
      Array.from(journalIds).map(async (id) => {
        const body = {
          content: text,
          journal_id: id,
          prompt_id: prompt?.id,
          prompt_content: prompt?.content,
        };
        await post("/api/entry", body);
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
      .catch();
  };

  const removePrompt = () => {
    setPrompt(null);
  };

  return (
    <>
      <div className="px-16 p-12 h-full flex flex-col">
        {hasJournals ? null : (
          <div className="flex flex-row-reverse p-3 rounded-md space-x-4 bg-neutral-50 space-x-reverse items-center -translate-y-4 -mb-2 z-50 drop-shadow-xl">
            <div className="pr-2 z-50">
              <HelpTooltip content="Here's where you can create a new Stitch, or a journal entry! Quickly post to multiple journals at once, or save a draft to keep working on a Stitch later." />
            </div>
            <div className="grow">
              Hey, it doesn't look like you have any journals yet. Why not{" "}
              <Link to="/myjournals" className="underline text-primary active:text-primary-dim">
                create one?
              </Link>
            </div>
          </div>
        )}
        {prompt ? (
          <div className="bg-gray-100 my-1 p-4 rounded-md flex items-center">
            <div className="grow text-lg">
              <span className="italic">Responding to prompt:</span> "{prompt.content}"
            </div>
            <button onClick={removePrompt}>
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
        ) : null}
        <textarea
          className="w-full grow p-4 z-0 resize-none rounded-md text-lg drop-shadow-lg placeholder:italic placeholder:text-2xl"
          placeholder="Speak your mind, or check out our Prompts tab for inspiration."
          maxLength="20000"
          onChange={handleChange}
          defaultValue={text}
        ></textarea>
        <div className="bg-tertiary my-2 p-4 rounded-md drop-shadow-lg flex flex-row-reverse items-center">
          <PostDialog publish={publish} disabled={!text} />
          <button
            className="border-2 border-slate-800 px-3 py-2 rounded-full mr-4 duration-100
              enabled:hover:bg-gray-200 disabled:text-neutral-500 disabled:border-2 disabled:border-neutral-500 disabled:opacity-75"
            onClick={props.location?.state?.draftId ? saveToDraft : saveAsNewDraft}
            disabled={!text}
          >
            {props.location?.state?.draftId ? "Save" : "Save As Draft"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;

import React, { useState, Fragment } from "react";
import { Transition } from "@headlessui/react";
import { post } from "../../utilities";
import { useNavigate } from "@reach/router";
import { PlusIcon, XMarkIcon } from "@heroicons/react/20/solid";

import "./NewJournal.css";

const NewJournal = () => {
  const [journalName, setJournalName] = useState("");
  const [boxVisible, setBoxVisible] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event) => {
    setJournalName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    post("/api/newjournal", { name: journalName }).then((journal) => {
      navigate(`/journal/${journal._id}`);
    });
    setJournalName("");
  };

  const openPrompt = () => {
    setBoxVisible(true);
  };

  const closePrompt = () => {
    setBoxVisible(false);
  };

  return (
    <div className="flex justify-center items-center">
      {boxVisible ? (
        <>
          <button onClick={closePrompt}>
            <XMarkIcon className="w-8 h-8 mr-3 text-secondary" />
          </button>
          <input
            type="text"
            value={journalName}
            onChange={handleChange}
            placeholder="Enter journal name..."
            maxLength="50"
            className={`${
              journalName.length ? "" : "italic"
            } text-lg w-96 h-full pl-2 py-2 NewJournal-textbox`}
          />
        </>
      ) : null}
      <button
        className="flex items-center ml-3 rounded-full px-4 py-2 border border-secondary text-secondary duration-100 hover:bg-secondary hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        onClick={boxVisible ? handleSubmit : openPrompt}
      >
        <PlusIcon className="w-6 h-6" />
        <span className="ml-3 text-lg whitespace-nowrap">New Journal</span>
      </button>
    </div>
  );
};

export default NewJournal;

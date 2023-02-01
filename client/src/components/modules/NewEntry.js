import React, { useState } from "react";

import "./NewInput.css";
import { post } from "../../utilities";

/**
 * New Entry is a New Post component for entries
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 */
const NewEntry = (props) => {
  const [value, setValue] = useState("");

  // called whenever the user types in the new post input box
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // called when the user hits "Submit" for a new post
  const handleSubmit = (event) => {
    event.preventDefault();
    addEntry(value);
    setValue("");
  };

  const addEntry = (value) => {
    const body = { content: value, journal_id: props.journalId };
    post("/api/entry", body).then((entry) => {
      // display this story on the screen
      props.addNewEntry(entry);
    });
  };

  return (
    <div className="w-full m-4">
      <textarea
        type="text"
        placeholder={"Speak your mind..."}
        value={value}
        onChange={handleChange}
        className="w-full p-4 border border-darkgrey min-h-[25rem] text-lg resize-none break-words rounded-lg
          placeholder:italic placeholder:text-xl"
      />
      <div className="flex flex-row-reverse py-3 px-4 bg-tertiary rounded-md items-center">
        <button
          type="submit"
          className="border-2 border-slate-800 py-1 px-2 rounded-lg duration-100
          enabled:hover:bg-gray-50 disabled:text-neutral-500 disabled:border-2 disabled:border-neutral-500 disabled:opacity-75"
          value="Submit"
          onClick={handleSubmit}
          disabled={!value}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export { NewEntry };

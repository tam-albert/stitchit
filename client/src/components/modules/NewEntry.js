import React, { useState } from "react";

import "./NewInput.css";
import { post } from "../../utilities";

/**
 * New Input is a parent component for all input components
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {string} entryId optional prop, used for comments
 * @param {({entryId, value}) => void} onSubmit: (function) triggered when this post is submitted, takes {storyId, value} as parameters
 */
const NewInput = (props) => {
  const [value, setValue] = useState("");

  // called whenever the user types in the new post input box
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // called when the user hits "Submit" for a new post
  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit && props.onSubmit(value);
    setValue("");
  };

  return (
    <div className="flex flex-col w-full m-4">
      <textarea
        type="text"
        placeholder={props.defaultText}
        value={value}
        onChange={handleChange}
        className="w-full p-4 border border-darkgrey min-h-[25rem] text-lg resize-none break-words rounded-md"
      />
      <button
        type="submit"
        className="border border-secondary text-secondary py-1 my-2 rounded-sm duration-100
          enabled:hover:bg-secondary enabled:hover:text-white
          disabled:text-neutral-500 disabled:border disabled:border-neutral-500 disabled:opacity-50"
        value="Submit"
        onClick={handleSubmit}
        disabled={!value}
      >
        Submit
      </button>
    </div>
  );
};

/**
 * New Entry is a New Post component for entries
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 */
const NewEntry = (props) => {
  const addEntry = (value) => {
    const body = { content: value, journal_id: props.journalId };
    post("/api/entry", body).then((entry) => {
      // display this story on the screen
      props.addNewEntry(entry);
    });
  };

  return <NewInput defaultText="Speak your mind... " onSubmit={addEntry} />;
};

export { NewEntry, NewInput };

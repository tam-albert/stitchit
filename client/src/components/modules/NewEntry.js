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
    <div className="u-flex">
      <textarea
        type="text"
        placeholder={props.defaultText}
        value={value}
        onChange={handleChange}
        className="NewInput-entry"
      />
      <button
        type="submit"
        className="NewInput-button u-pointer"
        value="Submit"
        onClick={handleSubmit}
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

  return (
    <div>
      <div>
        <NewInput defaultText="Speak your mind... " onSubmit={addEntry} />
      </div>
      
      
    </div>
  );
  
};

export { NewEntry, NewInput };

import React, { useState, useEffect } from "react";
import JournalPost from "../modules/JournalPost.js";
import { NewEntry } from "../modules/NewInput.js";

import { get } from "../../utilities";

const Journal = (props) => {
  const [entries, setEntries] = useState([]);

  // called when the "Journal" component "mounts", i.e.
  // when it shows up on screen
  useEffect(() => {
    document.title = "My Journal!";
    get("/api/entry").then((entryObjs) => {
      let reversedEntryObjs = entryObjs.reverse();
      setEntries(reversedEntryObjs);
    });
  }, []);

  // this gets called when the user pushes "Submit", so their
  // post gets added to the screen right away
  const addNewEntry = (entryObj) => {
    setEntries([entryObj].concat(entries));
  };

  let entriesList = null;
  const hasEntries = entries.length !== 0;
  if (hasEntries) {
    entriesList = entries.map((entryObj) => (
      <JournalPost
        key={`JournalPost${entryObj._id}`}
        _id={entryObj._id}
        creator_name={entryObj.creator_name}
        creator_id={entryObj.creator_id}
        userId={props.userId}
        content={entryObj.content}
      />
    ));
  } else {
    entriesList = <div>Create a new entry to start journaling!</div>;
  }
  return (
    <>
      {props.userId && <NewEntry addNewEntry={addNewEntry} />}
      {entriesList}
    </>
  );
};

export default Journal;

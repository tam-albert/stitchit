import React, { useState, useEffect } from "react";
import JournalPost from "../modules/JournalPost.js";
import { NewEntry } from "../modules/NewEntry.js";
import { NewComment } from "../modules/NewComment.js";
import InvitePrompt from "../modules/InvitePrompt.js";
import NotFound from "./NotFound";

import { Link } from "@reach/router";
import { PlusIcon } from "@heroicons/react/24/outline";

import { get } from "../../utilities";
import "./Journal.css";

const Journal = (props) => {
  const [journalExists, setJournalExists] = useState(true);
  const [entries, setEntries] = useState([]);

  // Check if the journal actually exists
  useEffect(() => {
    get("/api/journals", { journalId: props.journalId }).catch(() => {
      setJournalExists(false);
    });
  });

  // called when the "Journal" component "mounts", i.e.
  // when it shows up on screen
  useEffect(() => {
    document.title = "My Journal!";
    get("/api/journalEntries", { journalId: props.journalId }).then((entryObjs) => {
      console.log(entryObjs);
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
  return journalExists ? (
    <div className="flex flex-col items-center">
      <div>
        <InvitePrompt journalId={props.journalId} />
      </div>

      {props.userId && <NewEntry addNewEntry={addNewEntry} journalId={props.journalId} />}
      {entriesList}
    </div>
  ) : (
    <NotFound />
  );
};

export default Journal;

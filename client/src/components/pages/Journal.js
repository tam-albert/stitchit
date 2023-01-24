import React, { useState, useEffect } from "react";
import JournalPost from "../modules/JournalPost.js";
import { NewEntry } from "../modules/NewEntry.js";
import { NewComment } from "../modules/NewComment.js";
import NotFound from "./NotFound";

import { Link } from "@reach/router";
import {
  PlusIcon,
} from "@heroicons/react/24/outline";

import { get } from "../../utilities";
import "./Journal.css"

const Journal = (props) => {
  const [journalExists, setJournalExists] = useState(true);
  const [entries, setEntries] = useState([]);

  // Check if the journal actually exists
  useEffect(() => {
    get("/api/journals", { journalId: props.journalId}).catch(() => {
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
    <div>
    <div >
        <ul className="space-y-2 flex-grow overflow-x-hidden">
          <li className="Journal-container">
            <Link
              to="/"
              className="flex items-center p-2 text-lg font-normal text-gray-900 rounded-lg hover:bg-gray-200"
            >
              <PlusIcon className="w-6 h-6" />
              <span className="flex-1 ml-3 whitespace-nowrap">Invite Friends</span>
            </Link>
          </li>
        </ul>
    </div>
        <div className="flex flex-col items-center">
      {props.userId && <NewEntry addNewEntry={addNewEntry} journalId={props.journalId} />}
      {entriesList}
    </div>
    </div>
    
  ) : (
    <NotFound />
  );
};

export default Journal;

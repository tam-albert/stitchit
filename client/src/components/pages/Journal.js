import React, { useState, useEffect } from "react";
import JournalPost from "../modules/JournalPost.js";
import { NewEntry } from "../modules/NewEntry.js";
import InvitePrompt from "../modules/InvitePrompt.js";
import PeopleList from "../modules/PeopleList.js";
import NotFound from "./NotFound";
import ImageUpload from "../modules/ImageUpload.js";
import DeleteJournal from "../modules/DeleteJournal.js";
import { useNavigate } from "@reach/router";

import { PhotoIcon, TrashIcon } from "@heroicons/react/24/outline";

import { get, post } from "../../utilities";
import "./Journal.css";

const Journal = (props) => {
  const [journalExists, setJournalExists] = useState(true);
  const [entries, setEntries] = useState([]);
  const [names, setNames] = useState([]);
  const [ids, setIds] = useState([]);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [journalName, setJournalName] = useState("");
  const [journalId, setJournalId] = useState(null);

  const navigator = useNavigate();

  // Check if the journal actually exists
  useEffect(() => {
    get("/api/journals", { journalId: props.journalId })
      .then((journal) => {
        setIds(journal.collaborator_ids);
        setNames(journal.collaborator_names);
        setJournalName(journal.name);
        setJournalId(journal._id);
      })
      .catch(() => {
        setJournalExists(false);
      });
  }, []);

  // called when the "Journal" component "mounts", i.e.
  // when it shows up on screen
  useEffect(() => {
    document.title = "My Journal!";
    get("/api/journalEntries", { journalId: props.journalId }).then((entryObjs) => {
      let reversedEntryObjs = entryObjs.reverse();
      setEntries(reversedEntryObjs);
    });
  }, []);

  // this gets called when the user pushes "Submit", so their
  // post gets added to the screen right away
  const addNewEntry = (entryObj) => {
    setEntries([entryObj].concat(entries));
  };

  const addName = (name) => {
    // technically it will not show duplicate people if two ppl have the same name but that's giving edge case
    if (!names.includes(name)) {
      setNames([...names, name]);
    }
  };

  const openImageModal = () => {
    setImageModalOpen(true);
  };

  const closeImageModal = () => {
    setImageModalOpen(false);
  };

  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const updateCoverPhoto = (newUrl) => {
    post("/api/images/updatecoverphoto", { journalId: props.journalId, photoUrl: newUrl });
  };

  const deleteJournal = () => {
    fetch(`/api/journal?journalId=${props.journalId}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
    });
    navigator("/myjournals");
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
        prompt_content={entryObj.prompt_content}
      />
    ));
  } else {
    entriesList = <div>Create a new entry to start journaling!</div>;
  }
  return (
    <div className="p-12">
      {journalExists ? (
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-4">
            <PeopleList names={names} ids={ids} />
            <InvitePrompt journalId={props.journalId} addName={addName} />
            <button
              className="inline-flex items-center border-solid border-2 border-gray-500 rounded-full px-3 py-2 text-base duration-100 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              onClick={openImageModal}
            >
              <PhotoIcon className="w-5 h-5" />
              <span className="text-lg ml-2">Change Cover Photo</span>
            </button>
            <ImageUpload
              isOpen={imageModalOpen}
              closeModal={closeImageModal}
              handleImageUrl={updateCoverPhoto}
            />
            <button
              className="inline-flex items-center border-solid border-2 border-red-500 rounded-full px-3 py-2 text-base duration-100 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              onClick={openDeleteModal}
            >
              <TrashIcon className="w-5 h-5 text-red-500" />
              <span className="text-lg text-red-500 ml-2">Delete Journal</span>
            </button>
            <DeleteJournal
              isOpen={deleteModalOpen}
              closeModal={closeDeleteModal}
              journalName={journalName}
              deleteJournal={deleteJournal}
            />
          </div>

          {props.userId && <NewEntry addNewEntry={addNewEntry} journalId={props.journalId} />}
          {entriesList}
        </div>
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default Journal;

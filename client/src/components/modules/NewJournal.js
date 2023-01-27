import React, { useState } from "react";
import { post } from "../../utilities";
import { useNavigate } from "@reach/router";

const NewJournal = () => {
  const [journalName, setJournalName] = useState("");

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

  return (
    <div className="u-flex">
      <input
        type="text"
        placeholder="Journal name"
        value={journalName}
        className="pl-2"
        onChange={handleChange}
      />
      <button type="submit" className="NewInput-button" value="Submit" onClick={handleSubmit}>
        Create New Journal
      </button>
    </div>
  );
};

export default NewJournal;

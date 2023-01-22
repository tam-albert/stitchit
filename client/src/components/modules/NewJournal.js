import React, { useState } from "react";
import { post } from "../../utilities";

const NewJournal = () => {
  const [journalName, setJournalName] = useState("");

  const handleChange = (event) => {
    setJournalName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    post("/api/newjournal", { name: journalName }).then(() => {
      console.log("hi");
    });
    setJournalName("");
  };

  return (
    <div>
      <input type="text" placeholder="Journal name" value={journalName} onChange={handleChange} />
      <button type="submit" className="NewInput-button" value="Submit" onClick={handleSubmit}>
        Create New Journal
      </button>
    </div>
  );
};

export default NewJournal;

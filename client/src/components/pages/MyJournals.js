import React, { useEffect, useState } from "react";
import NewJournal from "../modules/NewJournal";
import { Link } from "@reach/router";

import "./MyJournals.css";
import { get } from "../../utilities";

const MyJournals = () => {
  const [journals, setJournals] = useState([]);

  useEffect(() => {
    get("/api/journals").then((journalObjs) => {
      console.log(journalObjs);
      setJournals(journalObjs);
    });
  }, []);

  const journalsList = journals.map((journal) => (
    <div className="test flex flex-col border-2 border-gray-400 rounded-md my-4">
      <div className="bg-gray-800 w-full h-48"></div>
      <div className="m-4">
        <Link to={`/journal/${journal._id}`} key={journal._id}>
          {journal.name} <span className="text-gray-500">by {journal.collaborator_names[0]}</span>
        </Link>
      </div>
    </div>
  ));

  console.log(journals);

  return (
    <>
      <NewJournal />
      <div className="inline-flex flex-wrap">{journalsList}</div>
    </>
  );
};

export default MyJournals;

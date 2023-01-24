import React, { useEffect, useState } from "react";
import NewJournal from "../modules/NewJournal";
import { Link } from "@reach/router";

import "./MyJournals.css"
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
    <div className="test border-top-width-200 inline-flex border-2 border-gray-400 rounded-md p-4 my-4">
      <Link to={`/journal/${journal._id}`} key={journal._id}>
        {journal.name} <span className="text-gray-500">by {journal.collaborator_names[0]}</span>
      </Link>
    </div>
  ));

  console.log(journals);

  return (
    <>
      <NewJournal />
      {journalsList}
    </>
  );
};

export default MyJournals;

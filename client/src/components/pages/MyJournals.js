import React, { useEffect, useState } from "react";
import NewJournal from "../modules/NewJournal";
import { Link } from "@reach/router";

import "./MyJournals.css";
import { get } from "../../utilities";

const MyJournals = (props) => {
  const [journals, setJournals] = useState([]);

  useEffect(() => {
    get("/api/journals", {userId: props.userId}).then((journalObjs) => {
      console.log(journalObjs);
      setJournals(journalObjs);
    });
  }, []);

  const journalsList = journals.map((journal) => (
    <div className="grid flex-col">
      <Link to={`/journal/${journal._id}`} key={journal._id}>
        <div className="w-full box"></div>
        <div className="m-4">
          {journal.name} <span className="text-gray-500">by {journal.collaborator_names[0]}</span>
        </div>
      </Link>
    </div>
  ));

  console.log(journals);

  return (
    <>
      <NewJournal/>
      <div className="inline-flex flex-wrap">{journalsList}</div>
    </>
  );
};

export default MyJournals;

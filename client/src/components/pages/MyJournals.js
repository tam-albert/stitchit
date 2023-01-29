import React, { useEffect, useState } from "react";
import NewJournal from "../modules/NewJournal";
import { Link } from "@reach/router";

import "./MyJournals.css";
import { get } from "../../utilities";

const MyJournals = (props) => {
  const [journals, setJournals] = useState([]);

  useEffect(() => {
    get("/api/journals").then((journalObjs) => {
      setJournals(journalObjs);
    });
  }, []);

  const journalsList = journals.map((journal) => (
    <div className="grid flex-col" key={journal._id}>
      <Link to={`/journal/${journal._id}`} className="drop-shadow-xl">
        {journal.cover_photo_url ? (
          <img src={journal.cover_photo_url} className="rounded-md object-cover w-full h-64" />
        ) : (
          <div className="w-full box"></div>
        )}
        <div className="m-3">
          <p className="text-lg">{journal.name}</p>{" "}
          <span className="text-gray-500 text-sm">by {journal.collaborator_names[0]}</span>
        </div>
      </Link>
    </div>
  ));

  return (
    <div className="p-12">
      <NewJournal />
      <div className="inline-flex flex-wrap justify-center mt-4">{journalsList}</div>
    </div>
  );
};

export default MyJournals;

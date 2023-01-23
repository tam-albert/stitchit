import React, { useEffect, useState } from "react";
import NewJournal from "../modules/NewJournal";
import { Link } from "@reach/router";

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
    <div>
      <Link to={`/journal/${journal._id}`} key={journal._id}>
        {journal.name}
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

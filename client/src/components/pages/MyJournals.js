import React, { useEffect } from "react";
import NewJournal from "../modules/NewJournal";

import { get } from "../../utilities";

const MyJournals = () => {
  useEffect(() => {
    get("/api/journals").then((journals) => {
      console.log(journals);
    });
  }, []);
  return (
    <>
      <NewJournal />
    </>
  );
};

export default MyJournals;

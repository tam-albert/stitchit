import React, { useEffect, useState } from "react";
import { get } from "../../utilities.js";

import SingleDraft from "../modules/SingleDraft.js";

const Drafts = (props) => {
  const [drafts, setDrafts] = useState([]);
  useEffect(() => {
    get("/api/draft").then((draftObjs) => setDrafts(draftObjs));
  }, []);

  return (
    <div className="p-12">
      <div className="flex flex-col space-y-4">
        {drafts.map((draft) => (
          <SingleDraft
            key={`draft-${draft._id}`}
            content={draft.content}
            creatorId={draft.creator_id}
          />
        ))}
      </div>
    </div>
  );
};

export default Drafts;

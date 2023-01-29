import React, { useEffect, useState } from "react";
import { get } from "../../utilities.js";

import SingleDraft from "../modules/SingleDraft.js";

const Drafts = (props) => {
  const [drafts, setDrafts] = useState([]);

  useEffect(() => {
    get("/api/draft").then((draftObjs) => setDrafts(draftObjs));
  }, []);

  const removeDraft = (idToRemove) => {
    setDrafts(drafts.filter((draft) => draft._id !== idToRemove));
  };

  return (
    <div className="p-12">
      <div className="flex flex-col-reverse space-y-4 space-y-reverse">
        {drafts.length ? (
          drafts.map((draft) => (
            <SingleDraft
              key={`draft-${draft._id}`}
              draftId={draft._id}
              content={draft.content}
              creatorId={draft.creator_id}
              timeCreated={draft.time_created}
              removeFromParent={removeDraft}
            />
          ))
        ) : (
          <span className="italic text-lg text-center">You don't have any drafts right now.</span>
        )}
      </div>
    </div>
  );
};

export default Drafts;

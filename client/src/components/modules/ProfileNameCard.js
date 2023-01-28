import React, { useEffect, useState } from "react";
import { get } from "../../utilities";
import ImageUpload from "./ImageUpload.js";

const ProfileNameCard = (props) => {
  const [commonJournals, setCommonJournals] = useState([]);
  const [imageModalOpen, setImageModalOpen] = useState(false);

  useEffect(() => {
    get("/api/journals").then((journalObjs) => {
      setCommonJournals(
        journalObjs.filter((journal) => journal.collaborator_ids.includes(props.profileId))
      );
    });
  }, [props.profileId]);

  const openImageModal = () => {
    setImageModalOpen(true);
  };

  const closeImageModal = () => {
    setImageModalOpen(false);
  };

  return (
    <div className="top-0 left-0 -z-10 bg-gradient-to-l from-cyan-300 to-blue-700 w-full h-64 flex flex-col">
      <div className="grow"></div>
      <div className="flex">
        <div className="w-36 h-36 rounded-full overflow-hidden relative top-10 ml-16">
          <button className="w-full h-full" onClick={openImageModal}>
            <img src={props.pfpUrl} />
          </button>
          <ImageUpload isOpen={imageModalOpen} closeModal={closeImageModal} />
        </div>
        <div className="p-4 ml-4 flex flex-col space-y-2">
          <div className="grow"></div>
          <p className="text-4xl text-white font-bold">{props.name}</p>
          {props.profileId !== props.userId ? (
            <p className="text-base text-white">
              <span className="italic">Journals in common:</span>{" "}
              {commonJournals.length > 3
                ? `${commonJournals
                    .map((journal) => journal.name)
                    .slice(0, 3)
                    .join(", ")} +${commonJournals.length - 3} more`
                : commonJournals.map((journal) => journal.name).join(", ")}
            </p>
          ) : (
            <p className="text-base text-white">That's you!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileNameCard;

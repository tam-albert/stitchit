import React, { useEffect, useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
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
        {props.profileId === props.userId ? (
          <div className="w-36 h-36 rounded-full overflow-hidden relative top-10 ml-16 group">
            <img
              src={props.pfpUrl}
              className="object-cover w-full h-full group-hover:brightness-75"
            />

            <PencilSquareIcon
              className="w-full h-full rounded-full p-12 absolute top-0 left-0 text-neutral-100 opacity-0 cursor-pointer group-hover:opacity-100"
              onClick={openImageModal}
            />

            <ImageUpload isOpen={imageModalOpen} closeModal={closeImageModal} />
          </div>
        ) : (
          <div className="w-36 h-36 rounded-full overflow-hidden relative top-10 ml-16">
            <img src={props.pfpUrl} className="w-full h-full object-cover" />
          </div>
        )}
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

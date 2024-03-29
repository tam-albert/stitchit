import React from "react";
import { Link } from "@reach/router";
import { formatRelative } from "date-fns";
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";

const SingleDraft = (props) => {
  const deleteDraft = () => {
    fetch(`/api/draft/?draftId=${props.draftId}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
    }).then(() => {
      props.removeFromParent(props.draftId);
    });
  };

  return (
    <div className="p-4 border-2 border-neutral-500 rounded-md flex space-x-2 items-center">
      <span className="grow">
        <span>
          "{props.content.length > 75 ? `${props.content.slice(0, 75)}...` : props.content}"
        </span>{" "}
        <span className="text-gray-500">
          created {formatRelative(new Date(props.timeCreated), new Date())}
        </span>
      </span>
      <Link to="/" state={{ content: props.content, draftId: props.draftId }}>
        <PencilIcon className="w-5 h-5" />
      </Link>
      <button onClick={deleteDraft}>
        <TrashIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default SingleDraft;

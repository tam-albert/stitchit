import React from "react";
import { formatRelative } from "date-fns";

const SingleDraft = (props) => {
  return (
    <div className="p-4 border-2 border-neutral-500 rounded-md">
      <span>
        "{props.content.length > 75 ? `${props.content.slice(0, 75)}...` : props.content}"
      </span>{" "}
      <span className="text-gray-500">
        created {formatRelative(new Date(props.timeCreated), new Date())}
      </span>
    </div>
  );
};

export default SingleDraft;

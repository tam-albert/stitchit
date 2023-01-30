import React from "react";
import { Link } from "@reach/router";
import { formatRelative } from "date-fns";
import { PencilIcon } from "@heroicons/react/20/solid";

const SinglePrompt = (props) => {

  return (
    <div className="p-4 border-2 border-neutral-500 rounded-md flex space-x-2 items-center">
      <span className="grow">
        <span>
          "{props.content.length > 75 ? `${props.content.slice(0, 75)}...` : props.content}"
        </span>{" "}
        <span className="text-gray-500">
          created {formatRelative(new Date(props.date), new Date())}
        </span>{" "}
        <span className="text-gray-500">
          likes {formatRelative(new Date(props.likes), new Date())}
        </span>
      </span>
      <Link to="/">
        <PencilIcon className="w-5 h-5" />
      </Link>

    </div>
  );
};

export default SinglePrompt;

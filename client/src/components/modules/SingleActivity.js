import React from "react";
import { formatRelative } from "date-fns";

const SingleActivity = (props) => {
  return (
    <div className="p-4 border-2 border-neutral-500 rounded-md flex space-x-2 items-center">
      {props.link ? (
        <Link to={props.link}>
          <span className="font-bold">{props.name}</span> {props.content}
        </Link>
      ) : (
        <p className="grow">
          <span className="font-bold">{props.name}</span> {props.content}
        </p>
      )}
      <p className="text-gray-500">{formatRelative(new Date(props.timestamp), new Date())}</p>
    </div>
  );
};

export default SingleActivity;

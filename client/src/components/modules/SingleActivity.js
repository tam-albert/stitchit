import React from "react";
import { Link } from "@reach/router";
import { formatRelative } from "date-fns";

const SingleActivity = (props) => {
  return (
    <Link to={props.link ? props.link : "#"}>
      <div className="p-4 border-2 border-neutral-500 rounded-md flex space-x-2 items-center">
        <div className="grow">
          <span className="font-bold">
            {props.selfId === props.activityId ? "You" : props.name}
          </span>{" "}
          {props.content}
        </div>
        <p className="text-gray-500">{formatRelative(new Date(props.timestamp), new Date())}</p>
      </div>
    </Link>
  );
};

export default SingleActivity;

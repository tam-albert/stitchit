import React from "react";
import { Link } from "@reach/router";

/**
 *
 *
 * Proptypes
 * @param {string} _id of the story
 * @param {string} creator_name
 * @param {string} creator_id
 * @param {string} content of the story
 */
const SingleEntry = (props) => {
  return (
    <div className="w-3/4 flex flex-col">
      {props.prompt_content ? (
        <div className="w-full bg-gray-100 bg-opacity-50 rounded-md my-2 p-4">
          Responding to prompt: "{props.prompt_content}"
        </div>
      ) : null}
      <p> 
        
        <span className="text-lg">{props.content}</span>{" | "}
        <Link to={`/profile/${props.creator_id}`} className="u-link u-bold inline text-lg">
          {props.creator_name}
        </Link>
      </p>
    </div>
  );
};

export default SingleEntry;

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
    <div className="w-3/4">
      <p>
        <Link to={`/profile/${props.creator_id}`} className="u-link u-bold inline text-lg">
          {props.creator_name}
        </Link>{" "}
        <span className="text-lg">{props.content}</span>
      </p>
    </div>
  );
};

export default SingleEntry;

import React, { useState } from "react";
import { Link } from "@reach/router";

/**
 * Component to render a single comment
 *
 * Proptypes
 * @param {string} _id of comment
 * @param {string} creator_name
 * @param {string} creator_id
 * @param {string} content of the comment
 */

const SingleComment = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <div className="mb-1 break-words">
      <Link to={`/profile/${props.creator_id}`} className="u-link u-bold">
        {props.creator_name}
      </Link>{" "}
      <span className="break-words">
        {props.content.length > 200 && collapsed
          ? `${props.content.slice(0, 197)}...`
          : props.content}
      </span>
      {props.content.length > 200 && collapsed ? (
        <button onClick={() => setCollapsed(false)} className="text-gray-500 italic">
          Show more
        </button>
      ) : null}
    </div>
  );
};

export default SingleComment;

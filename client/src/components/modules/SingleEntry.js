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
    <div className="JournalPost-story">
      <Link to={`/profile/${props.creator_id}`} className="u-link u-bold">
        {props.creator_name}
      </Link>
      <p className="Journal-storyContent">{props.content}</p>
    </div>
  );
};

export default SingleEntry;

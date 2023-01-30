import React, { useState, useEffect } from "react";
import SingleEntry from "./SingleEntry";
import CommentsBlock from "./CommentsBlock.js";
import { get } from "../../utilities";

import "./JournalPost.css";

/**
 * JournalPost is a component for displaying content like entries
 *
 * Proptypes
 * @param {string} _id
 * @param {string} creator_name
 * @param {string} creator_id
 * @param {string} content
 */
const JournalPost = (props) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    get("/api/comment", { parent: props._id }).then((comments) => {
      setComments(comments);
    });
  }, []);

  // this gets called when the user pushes "Submit", so their
  // post gets added to the screen right away
  const addNewComment = (commentObj) => {
    setComments(comments.concat([commentObj]));
  };

  return (
    <div className="flex space-x-2 w-full border-b border-secondary rounded-sm p-2 m-2">
      <SingleEntry
        _id={props._id}
        creator_name={props.creator_name}
        creator_id={props.creator_id}
        content={props.content}
      />
      <CommentsBlock
        entry={props}
        comments={comments}
        creator_id={props.creator_id}
        userId={props.userId}
        addNewComment={addNewComment}
      />
    </div>
  );
};

export default JournalPost;

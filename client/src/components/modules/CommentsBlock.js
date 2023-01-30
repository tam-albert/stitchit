import React from "react";
import SingleComment from "./SingleComment.js";
import { NewComment } from "./NewComment.js";

/**
 * @typedef ContentObject
 * @property {string} _id of entry/comment
 * @property {string} creator_name
 * @property {string} content of the entry/comment
 */

/**
 * Component that holds all the comments for an Entry
 *
 * Proptypes
 * @param {ContentObject[]} comments
 * @param {ContentObject} entry
 */
const CommentsBlock = (props) => {
  return (
    <div className="py-2 w-1/4">
      <div className="entry-comments">
        {props.comments.map((comment) => (
          <SingleComment
            key={`SingleComment_${comment._id}`}
            _id={comment._id}
            creator_name={comment.creator_name}
            creator_id={comment.creator_id}
            content={comment.content}
          />
        ))}
        {props.userId && (
          <NewComment entryId={props.entry._id} addNewComment={props.addNewComment} />
        )}
      </div>
    </div>
  );
};

export default CommentsBlock;

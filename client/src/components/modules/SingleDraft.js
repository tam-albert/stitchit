import React from "react";

const SingleDraft = (props) => {
  return <div>{`${props.content} created by ${props.creatorId}`}</div>;
};

export default SingleDraft;

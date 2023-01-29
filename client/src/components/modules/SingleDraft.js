import React from "react";

const SingleDraft = (props) => {
  return (
    <div className="p-4 border-2 border-neutral-500 rounded-md">
      "{props.content.length > 50 ? `${props.content.slice(0, 100)}...` : props.content}"
    </div>
  );
};

export default SingleDraft;

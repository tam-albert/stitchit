import React, { useState } from "react";

import "./NewInput.css";
import { post } from "../../utilities";

import { ChatBubbleBottomCenterIcon, PlusIcon } from "@heroicons/react/20/solid";

/**
 * New Comment is a New Post component for comments
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {string} entryId to add comment to
 */
const NewComment = (props) => {
  const [value, setValue] = useState("");
  const [inputVisible, setInputVisible] = useState(false);

  // called whenever the user types in the new post input box
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // called when the user hits "Submit" for a new post
  const handleSubmit = (event) => {
    event.preventDefault();
    addComment(value);
    setValue("");
  };

  const addComment = (value) => {
    const body = { parent: props.entryId, content: value };
    post("/api/comment", body).then((comment) => {
      // display this comment on the screen
      props.addNewComment(comment);
    });
  };

  // const whenHidden = (
  //   <div className="flex flex-col">
  //     <button
  //       className="border border-secondary text-secondary py-1 my-2 rounded-sm duration-100
  //       hover:bg-secondary hover:text-white"
  //       onClick={() => setInputVisible(true)}
  //     >
  //       <div className="flex items-center justify-center">
  //         <PlusIcon className="w-6 h-6" />
  //         <span className="ml-3">New Comment</span>
  //       </div>
  //     </button>
  //   </div>
  // );

  const whenHidden = (
    <div className="flex flex-row-reverse px-4">
      <button onClick={() => setInputVisible(true)}>
        <ChatBubbleBottomCenterIcon className="w-8 h-8" />
      </button>
    </div>
  );

  const whenVisible = (
    <div className="flex flex-col">
      <textarea
        type="text"
        placeholder="New Comment"
        value={value}
        onChange={handleChange}
        className="border border-darkgrey p-1 rounded-sm h-24 resize-none"
      />
      <button
        type="submit"
        className="border border-secondary text-secondary py-1 my-2 rounded-sm duration-100
          enabled:hover:bg-secondary enabled:hover:text-white
          disabled:text-neutral-500 disabled:border disabled:border-neutral-500 disabled:opacity-50"
        value="Submit"
        onClick={handleSubmit}
        disabled={!value}
      >
        Submit
      </button>
    </div>
  );

  return inputVisible ? whenVisible : whenHidden;
};

export { NewComment };

import React, { useState } from "react";
import { Link } from "@reach/router";
import { formatRelative } from "date-fns";
import { post } from "../../utilities";
import { PencilIcon } from "@heroicons/react/20/solid";
import { HeartIcon } from "@heroicons/react/24/outline";

const SinglePrompt = (props) => {
  const [likes, setLikes] = useState(props.likes);

  const incrementLikes = () => {
    const body = { promptId: props.promptId, likes: props.likes };
    setLikes(likes + 1);
    post("/api/promptLike", body);
  };

  return (
    <div className="p-4 bg-white rounded-md text-lg flex space-x-4 items-center">
      <span className="grow">
        <span>
          "{props.content.length > 75 ? `${props.content.slice(0, 75)}...` : props.content}"
        </span>{" "}
        <span className="text-gray-500">{formatRelative(new Date(props.date), new Date())}</span>
        {" | "}
        <span className="text-gray-500">likes: {likes}</span>
      </span>
      <Link to="/" state={{ prompt: { content: props.content, id: props.promptId } }}>
        <PencilIcon className="w-5 h-5" />
      </Link>
      <span>
        <HeartIcon
          className="w-6 h-6 cursor-pointer duration-500
            active:fill-darker-pink active:stroke-darker-pink active:duration-100"
          onClick={() => {
            incrementLikes();
          }}
        >
          {" "}
        </HeartIcon>
      </span>
    </div>
  );
};

export default SinglePrompt;

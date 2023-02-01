import React, { useEffect, useState } from "react";
import { get } from "../../utilities.js";

import SinglePrompt from "../modules/SinglePrompt.js";

const Prompts = () => {
  const [prompts, setPrompts] = useState([]);

  useEffect(() => {
    get("/api/prompt").then((promptObjs) => setPrompts(promptObjs));
  }, []);

  return (
    <div className="p-12">
      <div className="flex flex-col-reverse space-y-4 space-y-reverse">
        {prompts.length ? (
          prompts.map((prompt) => (
            <SinglePrompt
              key={`prompt-${prompt._id}`}
              promptId={prompt._id}
              content={prompt.content}
              date={prompt.date}
              likes={prompt.likes}
            />
          ))
        ) : (
          <span className="italic text-lg text-center">No prompts yet!</span>
        )}
        <div className="w-full text-center text-2xl">
          Prompts to help bring out those feelings bubbling in your mind.
        </div>
      </div>
    </div>
  );
};

export default Prompts;

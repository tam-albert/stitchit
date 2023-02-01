import React, { useEffect, useState } from "react";
import { get } from "../../utilities.js";

import SinglePrompt from "../modules/SinglePrompt.js";
import HelpTooltip from "../modules/HelpTooltip.js";

const Prompts = () => {
  const [prompts, setPrompts] = useState([]);

  useEffect(() => {
    get("/api/prompt").then((promptObjs) => setPrompts(promptObjs));
  }, []);

  return (
    <div className="p-12">
      <div className="flex flex-row-reverse px-8 mb-8">
        <HelpTooltip content="Choose one of these prompts to respond to! When you respond to a post in a journal and post that Stitch, others can see what prompt inspired you." />
      </div>
      <div className="flex flex-col-reverse space-y-6 space-y-reverse">
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

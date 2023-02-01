import React, { Fragment, useState } from "react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { post } from "../../utilities";
import HelpTooltip from "./HelpTooltip";

const InvitePrompt = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inviteId, setInviteId] = useState("");
  const [statusText, setStatusText] = useState("");
  const [statusSuccessful, setStatusSuccessful] = useState(false);

  const closePrompt = () => {
    setIsOpen(false);
    setStatusText("");
  };

  const openPrompt = () => {
    setIsOpen(true);
  };

  const handleChange = (event) => {
    setInviteId(event.target.value);
  };

  const invite = () => {
    post("/api/invite", { journalId: props.journalId, inviteId: inviteId })
      .then((res) => {
        setStatusText(`Invited ${res.userName}!`);
        setStatusSuccessful(true);
        props.addName(res.userName);
      })
      .catch(() => {
        setStatusText("Check your user ID and try again.");
        setStatusSuccessful(false);
      });
  };

  return (
    <>
      {isOpen ? (
        <>
          <div className="flex bg-neutral-100 items-center rounded-md space-x-4 px-2 py-[0.3rem]">
            <button onClick={closePrompt}>
              <XMarkIcon className="w-6 h-6" />
            </button>
            <input
              type="text"
              text={inviteId}
              onChange={handleChange}
              placeholder="Enter profile ID"
              className="text-lg p-1.5 rounded-md"
            />
            <button
              onClick={invite}
              className="inline-flex items-center border-solid border-2 border-gray-500 rounded-full px-3 py-1 text-lg hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              Invite
            </button>
            <HelpTooltip content="You can get a user's profile ID by going to their profile page and copying the 24-character identifier after https://stitch-it.herokuapp.com/profile/." />
          </div>
          <p className={statusSuccessful ? "text-lime-500" : "text-red-500"}>{statusText}</p>
        </>
      ) : (
        <button
          onClick={openPrompt}
          className="inline-flex items-center border-solid border-2 border-gray-500 rounded-full px-3 py-2 text-lg hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          <PlusIcon className="w-6 h-6" />
          <span className="ml-3 whitespace-nowrap">Invite Friends</span>
        </button>
      )}
    </>
  );
};

export default InvitePrompt;

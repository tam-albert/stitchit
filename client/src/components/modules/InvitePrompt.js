import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { post } from "../../utilities";
import { _ } from "core-js";

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
          <div className="flex items-center border-2 border-gray-500 rounded-md p-2">
            <button onClick={closePrompt}>
              <XMarkIcon className="w-6 h-6 mr-3" />
            </button>
            <input
              type="text"
              text={inviteId}
              onChange={handleChange}
              placeholder="Enter profile ID"
              className="text-lg pl-1"
            />
            <button
              onClick={invite}
              className="inline-flex items-center border-solid border-2 border-gray-500 rounded-full px-3 py-1 ml-3 text-base hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              Invite
            </button>
          </div>
          <p className={statusSuccessful ? "text-lime-500" : "text-red-500"}>{statusText}</p>
        </>
      ) : (
        <button
          onClick={openPrompt}
          className="inline-flex items-center border-solid border-2 border-gray-500 rounded-full px-3 py-2.5 text-base hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          <PlusIcon className="w-6 h-6" />
          <span className="ml-3 whitespace-nowrap">Invite Friends</span>
        </button>
      )}
    </>
  );
};

export default InvitePrompt;

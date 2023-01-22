import React, { useState } from "react";
import LogoutMenu from "./LogoutMenu";
import {
  PlusIcon,
  BookOpenIcon,
  ChatBubbleBottomCenterIcon,
  DocumentIcon,
  QueueListIcon,
  UserCircleIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";

import "./Sidebar.css";

const Sidebar = (props) => {
  const [minimized, setMinimized] = useState(0);
  return (
    <aside
      className="w-64 flex-none Sidebar-container drop-shadow-2xl"
      minimized={minimized}
      aria-label="Sidebar"
    >
      <div className="px-3 py-4 overflow-y-auto flex flex-col rounded bg-gray-100 dark:bg-gray-800 h-full min-h-screen">
        <ul className="space-y-2 flex-grow">
          <li>
            <a
              href="/"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <PlusIcon className="w-6 h-6" />
              <span className="flex-1 ml-3 whitespace-nowrap">New Stitch</span>
            </a>
          </li>
          <li>
            <a
              href="/myjournals"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <BookOpenIcon className="w-6 h-6" />
              <span className="flex-1 ml-3 whitespace-nowrap">My Journals</span>
            </a>
          </li>
          <li>
            <a
              href="/prompts"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <ChatBubbleBottomCenterIcon className="w-6 h-6" />
              <span className="flex-1 ml-3 whitespace-nowrap">Prompts</span>
            </a>
          </li>
          <li>
            <a
              href="/drafts"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <DocumentIcon className="w-6 h-6" />
              <span className="flex-1 ml-3 whitespace-nowrap">Drafts</span>
            </a>
          </li>
          <li>
            <a
              href="/feed"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <QueueListIcon className="w-6 h-6" />
              <span className="flex-1 ml-3 whitespace-nowrap">Feed</span>
            </a>
          </li>
        </ul>
        {props.userId ? (
          <div className="bottom-0 px-2 py-4 text-lg font-normal text-gray-900 rounded-lg flex">
            <a className="flex grow items-center" href={`/profile/${props.userId}`}>
              <UserCircleIcon className="w-6 h-6" />

              <span className="flex-1 ml-3 truncate">
                <span>{props.userName}</span>
              </span>
            </a>
            <LogoutMenu />
          </div>
        ) : null}
        <button
          className="Sidebar-toggle bg-gray-100"
          onClick={() => {
            console.log("clicked");
            setMinimized(1 - minimized);
          }}
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

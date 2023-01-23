import React, { useState } from "react";
import { Link } from "@reach/router";
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
      <div className="px-3 py-4 overflow-y-auto flex flex-col rounded bg-gray-100 h-full min-h-screen">
        <ul className="space-y-2 flex-grow">
          <li>
            <Link
              to="/"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-200"
            >
              <PlusIcon className="w-6 h-6" />
              <span className="flex-1 ml-3 whitespace-nowrap">New Stitch</span>
            </Link>
          </li>
          <li>
            <Link
              to="/myjournals"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-200"
            >
              <BookOpenIcon className="w-6 h-6" />
              <span className="flex-1 ml-3 whitespace-nowrap">My Journals</span>
            </Link>
          </li>
          <li>
            <Link
              to="/prompts"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-200"
            >
              <ChatBubbleBottomCenterIcon className="w-6 h-6" />
              <span className="flex-1 ml-3 whitespace-nowrap">Prompts</span>
            </Link>
          </li>
          <li>
            <Link
              to="/drafts"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-200"
            >
              <DocumentIcon className="w-6 h-6" />
              <span className="flex-1 ml-3 whitespace-nowrap">Drafts</span>
            </Link>
          </li>
          <li>
            <Link
              to="/feed"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-200"
            >
              <QueueListIcon className="w-6 h-6" />
              <span className="flex-1 ml-3 whitespace-nowrap">Feed</span>
            </Link>
          </li>
        </ul>
        {props.userId ? (
          <div className="bottom-0 px-2 py-4 text-lg font-normal text-gray-900 rounded-lg flex">
            <Link className="flex grow items-center" to={`/profile/${props.userId}`}>
              <UserCircleIcon className="w-6 h-6" />

              <span className="flex-1 ml-3 truncate">
                <span>{props.userName}</span>
              </span>
            </Link>
            <LogoutMenu handleLogout={props.handleLogout} />
          </div>
        ) : null}
        <button
          className="Sidebar-toggle bg-gray-100"
          onClick={() => {
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

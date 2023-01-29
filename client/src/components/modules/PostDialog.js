import React, { Fragment, useEffect, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "@reach/router";

import { get } from "../../utilities";

const PostDialog = (props) => {
  const [journals, setJournals] = useState([]);
  const [activeJournalIds, setActiveJournalIds] = useState(new Set());

  const navigate = useNavigate();

  useEffect(() => {
    get("/api/journals").then((journalObjs) => {
      setJournals(journalObjs);
    });
  }, []);

  const handleCheckbox = (event) => {
    if (event.target.checked) {
      setActiveJournalIds(activeJournalIds.add(event.target.id));
    } else {
      setActiveJournalIds(new Set([...activeJournalIds].filter((id) => id !== event.target.id)));
    }
  };

  const handleSubmit = () => {
    props.publish(activeJournalIds).then(() => {
      if (activeJournalIds.size === 1) {
        console.log("hi");
        navigate(`/journal/${[...activeJournalIds][0]}`);
      } else if (activeJournalIds.size > 1) {
        navigate("/myjournals");
      }
    });
  };

  return (
    <Popover className="relative">
      <Popover.Button className="inline-flex items-center border-solid border-2 border-slate-800 rounded-full px-3 py-2 text-base hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
        <span>Post</span>
        <ChevronUpIcon className="-mr-1 ml-1 h-5 w-5" />
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute right-0 bottom-14 shadow-2xl z-10 mt-3 w-screen max-w-sm overflow-auto">
          <div className="ring-1 ring-black ring-opacity-5 overflow-auto">
            <div className="relative rounded-lg flex flex-col bg-gray-100 p-7 overflow-auto">
              <span className="text-xl font-bold mb-3">Choose journals to publish to</span>
              {journals.length ? (
                journals.map((journal) => (
                  <div key={`div-${journal._id}`} className="flex items-center">
                    <input
                      type="checkbox"
                      key={`input-${journal._id}`}
                      id={journal._id}
                      className="text-blue-600 bg-gray-100 border-gray-300"
                      onChange={handleCheckbox}
                    />
                    <label className="ml-4" key={`label-${journal._id}`}>
                      <span className="text-sm font-medium text-gray-900">{journal.name}</span>{" "}
                      <span className="text-sm text-gray-500">
                        by {journal.collaborator_names[0]}
                      </span>
                    </label>
                  </div>
                ))
              ) : (
                <div>
                  You don't have any journals. Why not{" "}
                  <Link to="/myjournals" className="text-primary underline">
                    create one?
                  </Link>
                </div>
              )}
              <div className="mt-3">
                <button
                  className="border-solid border-2 border-slate-400 rounded-full px-3 py-2 hover:bg-white"
                  onClick={handleSubmit}
                  disabled={!journals}
                >
                  Publish!
                </button>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default PostDialog;

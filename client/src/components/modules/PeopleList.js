import React, { Fragment, useEffect, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Link } from "@reach/router";

const PeopleList = (props) => {
  return (
    <Popover className="relative">
      <Popover.Button className="inline-flex items-center border-solid border-2 border-gray-500 rounded-full px-3 py-2 text-base hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
        <span className="text-lg">People</span>
        <ChevronDownIcon className="-mr-1 ml-1 h-5 w-5" />
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
        <Popover.Panel className="absolute left-0 top-10 shadow-2xl z-10 mt-3 w-screen max-w-sm overflow-auto">
          <div className="ring-1 ring-black ring-opacity-5 overflow-auto">
            <div className="relative rounded-lg flex flex-col bg-gray-100 p-4 overflow-auto">
              {props.names.map((name, index) => (
                <Link
                  to={`/profile/${props.ids[index]}`}
                  key={`link-${name}`}
                  className="flex items-center p-2 cursor-pointer hover:bg-neutral-50"
                >
                  <UserCircleIcon className="w-6 h-6" />
                  <span className="text-base ml-2 text-right">{name}</span>
                </Link>
              ))}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default PeopleList;

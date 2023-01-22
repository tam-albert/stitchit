import React from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { googleLogout } from "@react-oauth/google";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const LogoutMenu = (props) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mb-32 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "w-full text-left block px-4 py-2 text-base"
                    )}
                    onClick={() => {
                      googleLogout();
                      props.handleLogout();
                    }}
                  >
                    <span>Logout</span>
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
        <Menu.Button className="inline-flex w-full justify-center rounded-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">
          <EllipsisHorizontalIcon className="h-6 w-6" aria-hidden="true" />
        </Menu.Button>
      </div>
    </Menu>
  );
};

export default LogoutMenu;

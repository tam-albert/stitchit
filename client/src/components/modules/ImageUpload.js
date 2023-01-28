import React, { Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

// Returns a modal photo dialog for user to upload photo
// Also takes a setImageUrl function in props so that it can pass the GCS URL to parent

const ImageUpload = (props) => {
  return (
    <Transition appear show={props.isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={props.closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-2xl font-medium leading-6 text-gray-900">
                  Upload an image
                </Dialog.Title>
                <button onClick={props.closeModal}>
                  <XMarkIcon className="w-6 h-6 absolute top-6 right-6 opacity-70" />
                </button>
                <div className="w-full h-20 flex items-center justify-center">
                  <input
                    type="file"
                    accept="image/*"
                    className="text-base bg-neutral-100 rounded-full
                        file:mr-2 file:cursor-pointer file:bg-gray-300 file:py-2 file:px-4
                        file:rounded-full file:border-none file:duration-100
                        file:hover:bg-primary file:hover:text-white"
                  />
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={props.closeModal}
                  >
                    Upload
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ImageUpload;

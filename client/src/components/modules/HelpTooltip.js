import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

const HelpTooltip = (props) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  return (
    <div>
      <QuestionMarkCircleIcon
        className="w-5 h-5 text-gray-500"
        onMouseEnter={() => setTooltipVisible(true)}
        onMouseLeave={() => setTooltipVisible(false)}
      />
      <Transition
        show={tooltipVisible}
        enter="transition ease-out duration-150"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <div
          className="bg-black text-white text-sm w-36 rounded-lg p-2 drop-shadow-2xl break-words
            absolute top-2 z-50 left-2.5 -translate-x-1/2"
        >
          {props.content}
        </div>
      </Transition>
    </div>
  );
};

export default HelpTooltip;

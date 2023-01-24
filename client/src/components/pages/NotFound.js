import React from "react";
import { Link } from "@reach/router";
import "./NotFound.css"
const NotFound = () => {
  return (
    <div className="flex grow h-full justify-center flex-col p-12 text-center align-middle">
      <div>
        <h1 className="text-4xl font-bold">The page you requested could not be found :((</h1>
        <Link
          to="/"
          className="inline-block w-48 justify-center rounded-full m-4 px-4 py-2 text-xl new-bg font-bold text-gray-700 hover:new-bg"
        >
          Take me home!
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

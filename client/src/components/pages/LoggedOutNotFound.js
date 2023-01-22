import React from "react";
import logo from "./stitchit_title.png";
import { Link } from "@reach/router";

const LoggedOutNotFound = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="p-8">
        <img src={logo} alt="Logo" className="h-16 mx-auto" />
      </div>
      <div className="flex grow justify-center flex-col p-12 text-center align-middle">
        <div>
          <h1 className="text-4xl font-bold">The page you requested could not be found :((</h1>
          <Link
            to="/"
            className="inline-block w-48 justify-center rounded-full m-4 px-4 py-2 text-xl bg-orange-200 font-bold text-gray-700 hover:bg-orange-300"
          >
            Take me home!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoggedOutNotFound;

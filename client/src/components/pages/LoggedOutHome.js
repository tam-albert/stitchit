import React, { useState, useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./LoggedOutHome.css";
import title from "./stitchit_title.png";
import hover_title from "./stitchit_title_hover.png";

// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "985251671309-tjcerql1bd9pdco3398e8srppbcvat4t.apps.googleusercontent.com";

const LoggedOutHome = (props) => {
  useEffect(() => {
    document.title = "STITCHIT";
  }, []);
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      <img
        src={title}
        alt="Title"
        className="title"
        onMouseOver={(e) => (e.currentTarget.src = hover_title)}
        onMouseOut={(e) => (e.currentTarget.src = title)}
      />
      <h1 className="tag">a collaborative journal.</h1>
      <div className="flex flex-col-reverse items-center">
        <textarea
          id="text"
          placeholder="Speak your mind..."
          className="emptyText rounded-lg p-2 mt-12 placeholder:italic placeholder:text-center placeholder:opacity-0 placeholder-shown:bg-[#faebd7] ease-out text-lg min-w-[33%] focus:outline-none resize-none placeholder-shown:caret-[#faebd7]"
        />
        <label for="text" className="italic text-gray-500 text-lg relative">
          Just start typing (no strings attached!)<span class="blinking-cursor">|</span>
        </label>
      </div>
      <div className="join">
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          {props.userId ? (
            <button
              onClick={() => {
                googleLogout();
                props.handleLogout();
              }}
            >
              Logout
            </button>
          ) : (
            <GoogleLogin onSuccess={props.handleLogin} />
          )}
        </GoogleOAuthProvider>
      </div>
    </>
  );
};

export default LoggedOutHome;

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
      <img src={title} alt="Title" className="title" onMouseOver={e => (e.currentTarget.src=hover_title)} onMouseOut={e => (e.currentTarget.src=title)}/>
      <h1 className="tag">&nbsp; a collaborative journal.  &nbsp;</h1>
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

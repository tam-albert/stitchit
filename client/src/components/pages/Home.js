import React, { useState, useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Home.css";
import title from "./stitchit_title.png";
// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "985251671309-tjcerql1bd9pdco3398e8srppbcvat4t.apps.googleusercontent.com";

const Home = (props) => {
  useEffect(() => {
    document.title = "STITCHIT";
  }, []);
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      <img src={title} alt="Title" className="title" />
      <h1 className="tag">a collaborative journal.</h1>
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
            <GoogleLogin onSuccess={props.handleLogin} onError={(err) => console.log(err)} />
          )}
        </GoogleOAuthProvider>
      </div>
      <p>You are signed in!</p>
    </>
  );
};

export default Home;

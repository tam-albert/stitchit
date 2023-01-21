import React, { useState } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "./NavBar.css";
import title from "./stitchit_title.png";

// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "985251671309-tjcerql1bd9pdco3398e8srppbcvat4t.apps.googleusercontent.com";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (res) => {
    // 'res' contains the response from Google's authentication servers
    console.log(res);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    console.log("Logged out successfully!");
    setLoggedIn(false);
  };

  return (
    <nav className="NavBar-container">
      <div className="NavBar-title u-inlineBlock">
        <Link to="/" className="NavBar-link">
          <img src={title} alt="Title" className="smallTitle"/>
        </Link>
      </div>
      <div className="NavBar-linkContainer u-inlineBlock">
        <Link to="/profile/" className="NavBar-link">
          Profile
        </Link>
        {loggedIn ? (
          <GoogleLogout
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={handleLogout}
            onFailure={(err) => console.log(err)}
            className="NavBar-link NavBar-login"
          />
        ) : (
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={handleLogin}
            onFailure={(err) => console.log(err)}
            className="NavBar-link NavBar-login"
          />
        )}
      </div>
    </nav>
  );
};

export default NavBar;

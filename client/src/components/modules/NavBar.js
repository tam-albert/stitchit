import React, { useEffect } from "react";
import { Link } from "@reach/router";

import "./NavBar.css";
import title from "./stitchit_title.png";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = (props) => {
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
      </div>
    </nav>
  );
};

export default NavBar;

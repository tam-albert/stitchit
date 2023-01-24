import React, { useState, useEffect } from "react";

import "../../utilities.css";
import "./Profile.css";

const Profile = (props) => {
  useEffect(() => {
    document.title = "Profile Page";
  }, []);

  return (
    <>
      <div className="Profile-avatarContainer">
        <div className="Profile-avatar" />
      </div>
      <h1 className="Profile-name u-textCenter">{props.Name}</h1>
      <hr className="Profile-line" />
      <div className="u-flex">
        <div className="Profile-subContainer u-textCenter">
          <h4 className="Profile-subTitle">About Me</h4>
          <div id="profile-description">insert bio</div>
        </div>
      </div>
    </>
  );
};


export default Profile;
